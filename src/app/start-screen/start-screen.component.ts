import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { inject } from '@angular/core';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {
  firestore: Firestore = inject(Firestore);

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  async newGame() {
    const newGame = await this.addGameData();
    this.router.navigateByUrl('/game/' + newGame.id);
    console.log("game isch jetzt:", newGame);
  }

  addGameData() {
    return addDoc(collection(this.firestore, 'games'), new Game().toJson());
  }
}
