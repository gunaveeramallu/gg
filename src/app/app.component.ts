import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { TokenService } from './token.service';

import { CookieService } from 'ngx-cookie-service';

import { NgxSpinnerService } from 'ngx-spinner';


import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { SignupComponent } from './signup/signup.component';
import { DialogDetaisComponent } from './dialog-detais/dialog-detais.component';

import { HttpClient } from '@angular/common/http';


import { forkJoin, of, throwError } from 'rxjs';
import { delay, catchError } from 'rxjs/operators';



import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras
}                           from '@angular/router';

export interface DialogData {
  animal: string;
  name: string;
  data1: string;
  data2: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {

  // -------------------------------search ---------------------------
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  search_item : string[];
  i:number = 0
  a:string
  new_user: any;
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
      this.http.get("https://sleepy-savannah-56074.herokuapp.com/api/comp_infos")
      .subscribe(
        data => {
            console.log("POST Request is successful  for companies ", data);
            for(this.i = 0;this.i<(data['length']);this.i++){
              this.a = data[this.i]['comp_name'];
              // this.id = data[this.i]['comp_email'];
              this.options[this.i] = this.a;

            }
            
            
            
            
  
        },error => {
          console.log("Error", error);
         }
  );
    }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  // -------------------------------search ---------------------------

  title = 'Gitty-UI';
  animal: string;
  name: string;
  data1: string;
  data2: string;
  


  // -------------------------------------user confidentila data-------------------------------------------
  user_data: any;    // return array 
  id: string;
  access_token: string;
  email: string;
  username: string;
  role: string;
  auth: boolean;

  student: boolean;
  company:boolean;
  // -------------------------------------user confidentila data-------------------------------------------

  TokenExists: boolean = false;






  constructor(private http: HttpClient,private router: Router,private spinner: NgxSpinnerService, public dialog: MatDialog, public service: TokenService, private cookieService: CookieService) {

    
   this.TokenExists = cookieService.check('token');
   


   if(this.TokenExists == true )
   {
    
     console.log("hay token exist @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ spinneer on")
     
      // this.service.get_data_from_cookie();
      var token = this.cookieService.get("token");
      var id = this.cookieService.get( "user_id");
      var role = this.cookieService.get("role");

      
    if(role === "student"){this.student = true }
    if(role === "company"){ this.company = true }
    this.auth = true;
    this.email = this.cookieService.get("email")
    this.username = this.cookieService.get("name")
    
    this.id = id;
    this.access_token = token ;


     
      this.service.setids(token,id);

      // this.spinner.hide();

   }
  }
 

  openDialog(): void {

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '60%',
      data: { animal: this.animal, name: this.name, data1: this.data1, data2: this.data2}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
     
    });
  }


  openDialog_login(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '60%',
      // height: '75%',
      data: { animal: this.animal, name: this.name, data1: this.data1, data2: this.data2}
    });

    dialogRef.afterClosed().subscribe(result => {




      console.log(result);
      console.log(this.new_user);

      this.new_user = result ;
      if(this.new_user == "new user")
      {
        this.FillDeatils();
      }
      
      else{

      this.spinner.show();
      this.server();
      this.spinner.hide();
      }
      
     
      
    });
    
  }
  logout()
  {

    this.service.logout();
    
   
  //  this.router.navigate(['']);
    
   
    window.location.reload();


    this.router.navigate(['']);

    

  }
  AppComponent(): any {
    throw new Error("Method not implemented.");
  }

  server(){
    
    

    // id | access tokes | email | username | role | auth | 
    this.user_data = this.service.get_user_data();
    this.id = this.user_data[0];
    this.access_token = this.user_data[1];
    this.email = this.user_data[2];
    this.username = this.user_data[3];
    this.role = this.user_data[4];
    this.auth = this.user_data[5];

   
  
    if(this.role === "student"){this.student = true }
    if(this.role === "company"){ this.company = true }

    

  }

  FillDeatils():  void {
    const dialogRef = this.dialog.open(DialogDetaisComponent , {
      width: '70%',
      
    }); 

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
     
    });
  }

  my_profile()
  {
    
    let navigationExtras: NavigationExtras = {
      queryParams: { 'id': this.email }
     
    };
  this.router.navigate(['/myprofile'],navigationExtras );
  }

  my_profile_comp()
  {
    
    let navigationExtras: NavigationExtras = {
      queryParams: { 'id': this.email }
     
    };
  this.router.navigate(['/company-profile'],navigationExtras );
  }

  search(option)
  {
    
    // option ="sai12@gmail.com"

    console.log(option)
    console.log("at serching 00000000000000")
    var mail;

     var posturl =  "https://sleepy-savannah-56074.herokuapp.com/api/comp_infos?filter[where][comp_name]="+option
     
     this.http.get(posturl) .subscribe(
      data => {

        // this.load_spinner.hide();
        console.log(data);

        mail =data[0]['comp_email'];
        console.log(mail)
        console.log("auto complete fired.... !")
    let navigationExtras: NavigationExtras = {
      queryParams: { 'id': mail }
     
    };
  this.router.navigate(['/company-profile'],navigationExtras );
  


      },
      error => {
          console.log("Error", error);
          // this.load_spinner.hide();

         
          
       }
    );

      } 






}


