import { Component, OnInit } from '@angular/core';

import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-shortlist-dialog',
  templateUrl: './shortlist-dialog.component.html',
  styleUrls: ['./shortlist-dialog.component.css']
})
export class ShortlistDialogComponent  {

  items = ['HR Review','phone interview','coding challenge','onsite interview','video interview']

  constructor(
    public dialogRef: MatDialogRef<ShortlistDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
