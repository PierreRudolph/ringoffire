import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent {
  allProfilePictures = ['player_male.png', 'player_female.png'];
  constructor(public dialogRef: MatDialogRef<EditPlayerComponent>) { }
  onNoClick() {
    this.dialogRef.close();
  }
}
