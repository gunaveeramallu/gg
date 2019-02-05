import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service';
import { HttpClient } from '@angular/common/http';

import { AppRoutingModule } from '../app-routing.module';


import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras
}                           from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-technology-stack',
  templateUrl: './technology-stack.component.html',
  styleUrls: ['./technology-stack.component.css']
})
export class TechnologyStackComponent implements OnInit {
  // 
  
  companies:any;
  displayImage:string;
  show:boolean[] = []; 
  i:number; 
 
 

  constructor(private spinner: NgxSpinnerService,
    private http: HttpClient,public tokenservice:TokenService, private router: Router) { }

  ngOnInit() {

    this.spinner.show();
    this.http.get("https://sleepy-savannah-56074.herokuapp.com/api/companies")
    .subscribe(
      data => {
          console.log("POST Request is successful  for companies ", data);

          this.companies= data;
          console.log(data['length']);
          for(this.i = 1;this.i<=(data['length']);this.i++){
  this.show[this.i] = false;
 


          }
          
          this.delay(2000).then(any=>{
            //your task after delay.
            this.spinner.hide();
       }) 
          
          

      },error => {
        this.spinner.hide();

        console.log("Error", error);
       }
);  
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
}
  
  send_params(id){

    let navigationExtras: NavigationExtras = {
      queryParams: { 'id': id }
     
    };
  this.router.navigate(['/company-profile'],navigationExtras );

}
mouse(id){
  console.log("mouse enter",id);
  this.show[id] = true;
  

}
mouseLeave(id){
  console.log("mouse leve",id);
  this.show[id] = false;


}
}


   

  

