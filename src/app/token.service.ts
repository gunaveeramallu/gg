import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  access_token: string;
  id: string;
  auth = false;
  username: string;
  email: string;
  role: string;




  url: string;
  user_data: any;
  access: any;
  loggedin: string;

  ready = false;
 

  constructor(private HTTP:HttpClient,  private cookieService: CookieService) { 


  }
  get_data_from_cookie()
  {
    this.access_token  = this.cookieService.get('token');
    this.id = this.cookieService.get('use_id');
    this.loggedin = this.cookieService.get('auth');
    if(this.loggedin === 'yes'){ this.auth = true }else this.auth = false 
    this.url = this.cookieService.get("url");
  }

  

  setids(id1,id2)
  {
    this.cookieService.set( 'token', id1 );
    
    this.access_token = id1;
    this.id = id2;
    this.auth = true;
    this.access = "yes";
    console.log()
    this.url = "https://sleepy-savannah-56074.herokuapp.com/api/Users/"+this.id+"?"+"access_token="+this.access_token;

    this.cookieService.set("token", this.access_token);
    this.cookieService.set( "user_id", this.id);
    this.cookieService.set( "auth", this.access );
    this.cookieService.set("url",this.url);





    // console.log(this.url)
    this.getuser_detais();
  
  }
  // gettid(){
  //   return(this.access_token);
  // }
  // getid()
  // {
  //   return(this.id);
  // }
  get_user_type(){
    return(this.role);
  }

  logout(){

  // this.access_token= ''
  this.id= ""
  this.auth = false;
  this.username= ""
  this.email= ""
  this.role= ""
  this.url= ""

  

  this.cookieService.deleteAll();

  this.HTTP.get("https://sleepy-savannah-56074.herokuapp.com/api/Users/logout?access_token="+this.access_token,
    { })
    .subscribe(
        data => {
            console.log("log out successful", data);
                      
        },
        error => {
          console.log("Error", error);
         
      }
  );  

 


  }


  get_user_data()
  {
    // id | access tokes | email | username | role | auth | 
    this.getuser_detais();
    return [this.id,this.access_token,this.email,this.username,this.role,this.auth]
  }

  getuser_detais()
  {

    this.HTTP.get(this.url,
    {
      // "email": email,
      // "password": password
    })
    .subscribe(
        data => {
            console.log("user detais ------------ @@@@@@@service@@@@@@@@ ", data);
                        
            this.user_data = data ;

            this.username = this.user_data.username;

            var index = this.username.indexOf( "/" ); 
            console.log(this.username)
            console.log(index)
            

            this.username = this.username.substring(0,index)


            this.email   = this.user_data.email;
            this.role =  this.user_data.realm;
            this.ready =true;

            this.cookieService.set("role",this.role);
            this.cookieService.set("name",this.username);
            this.cookieService.set("email",this.email)

            
           
        },
        error => {
            console.log("Error", error);
           
        }
    );  

  }
 
}
