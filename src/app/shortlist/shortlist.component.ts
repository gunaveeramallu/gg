import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {  HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';




@Component({
  selector: 'app-shortlist',
  templateUrl: './shortlist.component.html',
  styleUrls: ['./shortlist.component.css']
})
export class ShortlistComponent implements OnInit {

  displayedColumns: string[] = ['Company name'];

  Filter_items = ['show all','Applied','Rejected','HR Review','phone interview','coding challenge','onsite interview','video interview','offer Extended']

  
  title:string;
  data1: any;


  user_id:string;
  access_token:string;


  num1 : number; 
  one: any;
  result_data: Object;
  // comp: any;
  // loc: any;
  // resumelink: any;
  // coid: any;
  // dstatus: any;
  arrayOne(n: number): any[] {
    return Array(n);
  }

  selected_item :string;
  constructor(private service:TokenService,private spinner: NgxSpinnerService, private HTTP:HttpClient,private router: Router) { }

  ngOnInit() {

        // id | access tokes | email | username | role | auth | 

    var user_data = []
     user_data = this.service.get_user_data();
     this.user_id = user_data[0];
     this.access_token= user_data[1];

     this.spinner.show();

     this.HTTP.get("https://sleepy-savannah-56074.herokuapp.com/api/application-forms?access_token="+this.access_token,
     {  })
     .subscribe(
         data => {

           this.spinner.hide();

           this.result_data = data;
           console.log(data[0]['comp_name'])
           


         
       },
       error => {
         console.log("Error", error);

       }
 ); 
}



  search_filter()
  {
    console.log("selected item:",this.selected_item);
  }
  
  delete(id)
  {
    this.spinner.show();
    https://sleepy-savannah-56074.herokuapp.com/api/application-forms/
    
    this.HTTP.delete("https://sleepy-savannah-56074.herokuapp.com/api/application-forms/"+id,
    {  })
    .subscribe(
        data => {

          this.spinner.hide();

          this.result_data = data;
          // console.log(data[0]['comp_name'])
        //  ---------------------------------------------------------------------------------------

        this.spinner.show();

        this.HTTP.get("https://sleepy-savannah-56074.herokuapp.com/api/application-forms?access_token="+this.access_token,
        {  })
        .subscribe(
            data => {
   
              this.spinner.hide();
   
              this.result_data = data;
              console.log(data[0]['comp_name'])
              
   
   
            
          },
          error => {
            this.spinner.hide();
            console.log("Error", error);
   
          }
    ); 
   



        // ---------------------------------------------------------------------------------------

        
      },
      error => {
        console.log("Error", error);
        this.spinner.hide();

      }
); 
  }

}
