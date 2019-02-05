import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import {ErrorStateMatcher} from '@angular/material/core';

// ---------------------------- email validatro

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
  // ---------------------------- email validatro
}



@Component({
  selector: 'app-dialog-detais',
  templateUrl: './dialog-detais.component.html',
  styleUrls: ['./dialog-detais.component.css']
})
export class DialogDetaisComponent implements OnInit {

  // ---------------------------- email validatro
  // emailFormControl = new FormControl('', [
  //   Validators.required,
  //   Validators.email,
  // ]);

  // matcher = new MyErrorStateMatcher();
  // ---------------------------- email validatro

  user_type = "";
  username: string;
  password1: string;
  password2: string;
  email: string;
  error: string;
  ok: string="Create account ";
  form_display = true;
  phone_number:string;


  activate_submit = true;
  
  seasons: string[] = ['I am a Candidate', 'I am a Company looking to Hire'];

  // ---------------------------- email validatro
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();
  success: string= "";
  notsuccess: string;
  not_full: string;
  // ---------------------------- email validatro
  constructor(private spinner: NgxSpinnerService,private HTTP:HttpClient) { }
  ngOnInit() {
  }

  ok_button()
  {

    // if(!(this.user_type.length != 0 && this.user_type.length < 8 && this.username.length != 0 && this.email.length != 0 && this.password1.length != 0 && this.password2.length != 0 && this.phone_number.length != 0))
    // {
    //   this.not_full = "Please fill all details "

    // }
    // else
    // {

    
      this.error= "";
      // this.ok = "processing..."
      if(this.user_type === "I am a Company looking to Hire")
      {
        this.user_type = "company";

      }else if ( this.user_type == "I am a Candidate") {
        this.user_type = "student";
      }

      if(this.password1 == undefined  )
      {
        if(this.password2 == undefined  ){this.error = " password is not empty ";}
         this.error = " password not empty ";
      }else if(this.password1 == this.password2)
      {
        console.log(" data is going to post to heroku")
        this.error = "";
        if(this.emailFormControl.hasError('email') && !this.emailFormControl.hasError('required'))
        {
          console.log(" email error ")
        }
        else 
        if(this.password1.length < 8)
        {
          this.error = "Password must have min 8 charactes";
        }
        else{

          console.log(this.user_type,this.username,this.password1,this.email)


           if(this.user_type.length != 0 && this.user_type.length < 8 && this.username.length != 0 && this.email.length != 0 && this.password1.length != 0 && this.password2.length != 0 && this.phone_number.length != 0)
          {
                      this.spinner.show();
                      this.HTTP.post("https://sleepy-savannah-56074.herokuapp.com/api/Users",
                      {
                        "realm": this.user_type,
                        "username": this.username+"/"+this.phone_number,
                        "email": this.email,
                        "password":this.password1
                      })
                      .subscribe(
                          data => {
                              console.log("User created ", data);
                              this.success = " your account created successfully"
                              this.spinner.hide();
                              this.form_display = false;

                                                  
                          },
                          error => {
                              console.log("Error", error);
                              
                              this.notsuccess = "Error while creating account try again"
                              this.spinner.hide();
                              
                            }
                      );  
          }
          else
          {
              this.not_full = "Please fill all details "
          }

          
            }
        }
        // this.ok = "Create account"

      }
      // }

    }
