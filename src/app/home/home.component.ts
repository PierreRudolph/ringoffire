
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataPolicyComponent } from '../data-policy/data-policy.component';
import { ImprintComponent } from '../imprint/imprint.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {


  constructor(private dialog: MatDialog) { }

  openDataPolicyDialog(): void {
    this.dialog.open(DataPolicyComponent);
  }

  openImprintDialog(): void {
    this.dialog.open(ImprintComponent);
  }
}
