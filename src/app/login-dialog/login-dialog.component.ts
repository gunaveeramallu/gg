import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../token.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogData, AppComponent } from '../app.component';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

signupForm:FormGroup;  
// FirstName:string="";  
// LastName:string="";  
// Email:string="";  
// Password:string="";
// email1:string="";
// password1:string="";

form_display = false;  

login = "Login"
  prompt = "";
  success= "";
  id: string;
  userid:string;

  json_data: any;


  
  // public dialogRef: MatDialogRef<DialogOverviewExampleDialog>

  constructor(private spinner: NgxSpinnerService, private formbuilder:FormBuilder, private HTTP:HttpClient, private service: TokenService, 
    private router: Router, private route: ActivatedRoute,
    public dialogRef: MatDialogRef<AppComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData  ) {
    this.signupForm= formbuilder.group({  
      fname:['',Validators.compose([Validators.required,Validators.maxLength(15),Validators.minLength(1)])],  
      lname:['',[Validators.required,Validators.maxLength(19)]],  
      Emailid:['',[Validators.required,Validators.email]],  
      userpassword:['',Validators.required]  
    });  

   }

  ngOnInit() {

    this.data.animal = "new user";


    
  }


 
  PostData(signupForm:NgForm,email,password)  
  {  
    this.login = "connecting...";
    this.spinner.show();


    
    // email = "jkc@gmail.com";
    // password = "1234567890";
    

    console.log("post request to heroku server")

    this.HTTP.post("https://sleepy-savannah-56074.herokuapp.com/api/Users/login",
        {
          "email": email,
          "password": password
        })
        .subscribe(
            data => {
                console.log("POST Request is successful ", data);
                this.success = "Login successfully";
                this.login = "Done";
                this.prompt = ""
                
                this.json_data = data ;
                this.id = this.json_data.id;
                this.userid = this.json_data.userId;

                this.service.setids(this.id,this.userid);
                // close dialog 

                this.form_display  = true ;
                this.spinner.hide();

                this.delay(2000).then(any=>{
                  //your task after delay.
                  this.dialogRef.close(); 
             }) 

             
                

                 
                

            },
            error => {
                console.log("Error", error);
                this.success = "";
                // this.dialogRef.close(); 

                this.spinner.hide();

                this.prompt = "Login failed ";
                this.login = "Login";



            }
        );  
        this.login = "Please wait....";

               
  } 

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
}
  

// new_to_gitty()
// {
//   this.data.animal = "new user";
//   this.data.data1 = "new user ";
//   this.dialogRef.close(); 

// }

}
