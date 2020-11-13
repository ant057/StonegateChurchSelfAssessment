import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { database } from 'firebase';

export interface DialogData {
  message: string;
  title: string;
  answersData: [];
  displayColumns: [];
}

@Component({
  selector: 'assessment-all-answers',
  templateUrl: './all-answers.component.html',
  styleUrls: ['./all-answers.component.scss']
})
export class AllAnswersComponent implements OnInit {

  columnsToDisplay: string[] = this.data.displayColumns.filter((x: string) => x.indexOf('peer') === -1);

  constructor(public dialogRef: MatDialogRef<AllAnswersComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {

  }

  okClick(): void {
    this.dialogRef.close();
  }

}
