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
  game: Game;
  name = PlayerComponent.name;
  firestore: Firestore = inject(Firestore);
  gamesCollection: any;
  actualGame: any;
  gameId: string;

  constructor(private dialog: MatDialog, private route: ActivatedRoute) { }

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  someMethod() {
    this.trigger.openMenu();
  }

  async ngOnInit() {
    this.newGame();
    this.route.params.subscribe((params) => {
      this.gameId = params["id"];
      this.subscribeGameData(params["id"]);
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


  setNextPlayer() {
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
  }


  openAddPlayerDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.setGameData()
      }
    });
  }


  updateGameAfterTimeout() {
    setTimeout(() => {
      this.game.playedCards.push(this.game.currentCard);
      this.game.pickCardAnimation = false;
      this.setGameData();
    }, 1000);
  }


  setGameData() {
    let gameRef = doc(this.firestore, "games", this.gameId);
    setDoc(gameRef, this.game.toJson(), { merge: false });
  }


  getGameData() {
    const gameDocumentRef = doc(this.firestore, 'game', this.gameId);
    return docData(gameDocumentRef, { idField: this.gameId });
  }


  subscribeGameData(joinGameId) {
    if (joinGameId) {
      onSnapshot(doc(this.firestore, "games", joinGameId), (doc) => {
        const game: any = doc.data();
        this.syncGameData(game)
      });
    }
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
