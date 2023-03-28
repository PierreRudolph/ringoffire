import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-data-policy',
  templateUrl: './data-policy.component.html',
  styleUrls: ['./data-policy.component.scss']
})
export class DataPolicyComponent {
  constructor(private dialogRef: MatDialogRef<DataPolicyComponent>) { }

  onNoClick() {
    this.dialogRef.close();
  }
}
