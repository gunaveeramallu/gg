import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogData } from '../app.component';

export interface UserType {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  items: UserType[] = [
    {value: 'Student_user', viewValue: 'Student'},
    {value: 'Company_user', viewValue: 'Company'},
    {value: 'Guest_user', viewValue: 'Guest'}
  ];

  Usertype: string;
  step = -1;
  student: string = "Student_user";
  company: string = "Company_user";
  guest: string = "Guest_user";




  firstname: string;
  age: number;
  ssc: string;
  inte: string;





  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  onNoClick(): void {

    this.dialogRef.close();

    
  }
  
 

}
