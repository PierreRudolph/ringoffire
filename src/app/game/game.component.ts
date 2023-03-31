import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { PlayerComponent } from '../player/player.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatMenuTrigger, _MatMenuTriggerBase } from '@angular/material/menu';
import { Firestore, docData } from '@angular/fire/firestore';
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  game: Game;
  gameRef: any;

  constructor(private dialog: MatDialog, private route: ActivatedRoute) { }

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;


  async ngOnInit() {
    this.newGame();
    this.route.params.subscribe((params) => {
      const gameId = params["id"];
      this.gameRef = doc(this.firestore, "games", gameId);
      this.subscribeGameData();
    });
  }


  newGame() {
    this.game = new Game();
  }


  takeCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;
      this.setNextPlayer();
      this.setGameData();
      this.updateGameAfterTimeout();
    }
  }


  setGameData() {
    setDoc(this.gameRef, this.game.toJson(), { merge: false });
  }


  setNextPlayer() {
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
  }


  updateGameAfterTimeout() {
    setTimeout(() => {
      this.game.playedCards.push(this.game.currentCard);
      this.game.pickCardAnimation = false;
      this.setGameData();
    }, 1000);
  }


  openAddPlayerDialog(): void {
    const dialogRef = this.getDialog();
    dialogRef.afterClosed().subscribe((name: string) => {
      if (!name)
        return;
      this.game.players.push(name);
      this.setGameData();
    });
  }


  getDialog() {
    return this.dialog.open(DialogAddPlayerComponent)
  }


  subscribeGameData() {
    onSnapshot(this.gameRef, (doc: { data: () => any; }) => {
      const game: any = doc.data();
      this.syncGameData(game)
    });
  }


  syncGameData(game: { currentPlayer: number; playedCards: string[]; players: string[]; stack: string[]; currentCard: string; pickCardAnimation: boolean; }) {
    this.game.currentPlayer = game.currentPlayer;
    this.game.playedCards = game.playedCards;
    this.game.players = game.players;
    this.game.stack = game.stack;
    this.game.currentCard = game.currentCard;
    this.game.pickCardAnimation = game.pickCardAnimation;
  }
}
