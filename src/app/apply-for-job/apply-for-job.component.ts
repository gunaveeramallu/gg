import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';



import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras
}                           from '@angular/router';

@Component({
  selector: 'app-apply-for-job',
  templateUrl: './apply-for-job.component.html',
  styleUrls: ['./apply-for-job.component.css']
})
export class ApplyForJobComponent implements OnInit {
  run
display
 
  display_ui:boolean ;
  role:string;
  
  access_token:string;
  candidate_name:string;
  candidate_id:string
  company_id:string;
  drive_id:string;
  drive_name:string;


  posts: Object;
  today: string;
  can_email: any;


  

  constructor(private spinner: NgxSpinnerService,private router: Router,
     private http: HttpClient,public tokenservice:TokenService) { 

    this.role = this.tokenservice.get_user_type();
    if(this.role === "student")
    {
      this.display_ui =  true;
    }
    this.spinner.show();
    
    this.http.get("https://sleepy-savannah-56074.herokuapp.com/api/drives")
    .subscribe(
      data => {
        console.log("data");
        spinner.hide()
          console.log("get Request is successful ", data);
          this.display = data;

        this.run = Array(data['length']).fill(4);
        

      },error => {
        console.log("Error", error);
       }
); 



  }


  
  ngOnInit() {

        // id | access tokes | email | username | role | auth | 


   var user_data_array = [];
   user_data_array =  this.tokenservice.get_user_data();

   this.access_token = user_data_array[1];
   this.candidate_id = user_data_array[0];
   this.candidate_name = user_data_array[3];
   this.can_email = user_data_array[2];




  }

// public applyjob(drive_id,company_id,name,comp_location)
// {

//   var date = new Date();

//      var today_date = date.getDate().toString();
//      var today_month = date.getUTCMonth() + 1;
//      var today_year = date.getUTCFullYear().toString();
    
//      this.today =  today_date+"/"+today_month+"/"+today_year;


//   if(confirm("Are you sure to Apply for company :"+name)) {

//     console.log("yes  ");
//     this.spinner.show();
//     this.http.post("https://sleepy-savannah-56074.herokuapp.com/api/application-forms?access_token="+this.access_token,
//         {
//           "candidate_id": this.candidate_id,
//           "company_id": company_id,
//           "comp_name": name,
//           "status": "waiting...",
//           "location": comp_location,
//           "resume_link": "not updated yet .....",
//           "drive_id": drive_id,
//           "candidate_name": this.candidate_name,

//           // "applied_date": this.today,
//           // "companny_email": ,
//           // "candidate_email" :  this.can_email


//         })
//         .subscribe(
//             data => {

//               console.log(data)

//               this.spinner.hide()
//                 console.log("POST Request is successful ", data);
                
             

             
                
//             },
//             error => {
//               this.spinner.hide()
//                 console.log("refused to apply", error);
          

//             }
//         );  
//      }
// }

showCompany(email){
  console.log(email);
  let navigationExtras: NavigationExtras = {
    queryParams: { 'id': email }
   
  };
this.router.navigate(['/company-profile'],navigationExtras );
  
}

showJob(email,id){
  console.log(email,id);

  let navigationExtras: NavigationExtras = {
    queryParams: { 'id': id }
   
  };
this.router.navigate(['/apply-job-window'],navigationExtras );
  
}

}



// should want to get company name ;
// should want to get role
// showCompany will route to company deatils using the email
// showjob will route to company deatils using the email
//role should be addded to the showJob functio
// the url which is used https://sleepy-savannah-56074.herokuapp.com/api/drives?filter[where][comp_email]=company@gmail.com&filter[where][location]=HAYD