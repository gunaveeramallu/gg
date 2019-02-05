




// noooooooooooooooooooooooooooooo
















import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user_type = "";
  username: string;
  password1: string;
  password2: string;
  email: string;
  error: string;
  ok: string="Create account ";
  form_display = true;
  phone_number:string;


  success: string= "";
  notsuccess: string;
  
  seasons: string[] = ['I am a Candidate', 'I am a Company looking to Hire'];

  // ---------------------------- email validatro
  // emailFormControl = new FormControl('', [
  //   Validators.required,
  //   Validators.email,
  // ]);
  // matcher = new MyErrorStateMatcher();
  // success: string= "";
  // notsuccess: string;
  // ---------------------------- email validatro
  constructor(private spinner: NgxSpinnerService,private HTTP:HttpClient) { }
  ngOnInit() {
  }

  ok_button()
  {

     
      this.error= "";
      this.ok = "processing..."
      if(this.user_type=== "I am a Company looking to Hire")
      {
        this.user_type = "company";

      }else {
        this.user_type = "student";
      }
      if(this.password1 == undefined  )
      {
        if(this.password2 == undefined  ){this.error = " password not empty ";}
         this.error = " password not empty ";
      }else if(this.password1 == this.password2)
      {
        console.log(" data is going to post to heroku")
        this.error = "";
        // if(this.emailFormControl.hasError('email') && !this.emailFormControl.hasError('required'))
        // {
        //   console.log(" email error ")
        // }
        // else 
        if(this.password1.length < 8)
        {
          this.error = "Password must have min 8 charactes";
        }
        else{

          console.log(this.user_type,this.username,this.password1,this.email)


          this.spinner.show();
          this.HTTP.post("https://sleepy-savannah-56074.herokuapp.com/api/Users",
            {
              "realm": this.user_type,
              "username": this.username,
              "email": this.email,
              "password":this.password1
            })
            .subscribe(
                data => {
                    console.log("User created ", data);
                    this.success = " your account created successfully"
                    this.spinner.hide();

                                       
                },
                error => {
                    console.log("Error", error);
                    this.notsuccess = "Error while creating account try again"
                    this.spinner.hide();
                    
                 }
            );  
            }
        }
        this.ok = "Create account"

        this.form_display = false;
      }

}
