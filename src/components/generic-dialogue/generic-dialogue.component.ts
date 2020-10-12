import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  message: string;
  title: string;
  showConfirm: boolean;
}

@Component({
  selector: 'assessment-generic-dialogue',
  templateUrl: './generic-dialogue.component.html',
  styleUrls: ['./generic-dialogue.component.scss']
})
export class GenericDialogueComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<GenericDialogueComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  okClick(): void {
    this.dialogRef.close();
  }

  confirmClick(): void {
    this.dialogRef.close(true);
  }
}
