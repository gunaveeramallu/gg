import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-apply-job-window',
  templateUrl: './apply-job-window.component.html',
  styleUrls: ['./apply-job-window.component.css']
})
export class ApplyJobWindowComponent implements OnInit {

  company_coverpic:string;
  jd:string;
  location:string;
  Department:string;
  siklls:string;
  remoteWork:string;id: any;
  company_name: any;
  job_role: any;
  errormsg: string;
  today: string;
  access_token: any;
  candidate_name: any;
  candidate_id: any;
  can_email: any;
  drive_id: any;
  comp_email: any;
  err: any;
  post_url: string;

  profile_img_url: string ="";
  resume_link:  string = "";
  Years_of_Experience: string= "";
  resume_not_uploded: boolean;
  error: boolean;
  form: boolean;
  success: boolean;
;
  visaSponsorship:string;
  maxsalary:string;
  minsalary:string;
  MinEquity:string;
  yearlyBonus:string;
  

  //application

  gender:string = "";
  Latino:string = "";
  Veteran:string = "";
  Disability:string = " ";
  //application


  constructor(private http:HttpClient,private route: ActivatedRoute,private spinner: NgxSpinnerService,public tokenservice:TokenService) { 

    this.route.queryParams.subscribe(params => {
      console.log(params);
      // this.para = params
      this.id = params['id'];   // emal of company stored in id variable
    })
  }

  ngOnInit() {


       // id | access tokes | email | username | role | auth | 


   var user_data_array = [];
   user_data_array =  this.tokenservice.get_user_data();

   this.access_token = user_data_array[1];
   this.candidate_id = user_data_array[0];
   this.candidate_name = user_data_array[3];
   this.can_email = user_data_array[2];


  //  -------------------------------------------------------------------------


  this.post_url  = "https://sleepy-savannah-56074.herokuapp.com/api/candidates?filter[where][can_email]="+this.can_email;

  console.log(this.post_url)

  this.spinner.show();
  this.http.get(this.post_url) .subscribe(
    data => {

      console.log(data)
      
      console.log("sucribed successflly")
      this.spinner.hide();
     

      this.profile_img_url = data[0]['can_profile_pic'];
      
      this.Years_of_Experience = data[0]['can_year_of_experience']

      this.resume_link = data[0]['can_resume_link']
      
      console.log(this.Years_of_Experience.length)
      console.log(this.resume_link.length)
       
        if(this.Years_of_Experience.length != 0 && this.resume_link.length != 0)
        {

            this.form = true;

        }else
        {
          this.resume_not_uploded = true;

        }
    },
    error => {
        console.log("Error", error);
        this.spinner.hide();
        this.error = true;

     }
  );

 




  // ----------------------------------------------------------------------



    this.http.get("https://sleepy-savannah-56074.herokuapp.com/api/drives?filter[where][id]="+this.id)
    .subscribe(
      data => {
        console.log("data");
        
          console.log("get Request is successful ", data);
          this.company_coverpic = data[0]['post_job_img'];
          this.company_name = data[0]['companyname'];
          this.job_role = data[0]['job_role']
          this.jd = data[0]['jd'];
          this.location = data[0]['location']
          this.Department = data[0]['Department']
          this.siklls = data[0]['siklls'];
          this.remoteWork = data[0]['remoteWork']
          this.visaSponsorship = data[0]['visaSponsorship']
          this.maxsalary = data[0]['maxsalary']
          this.minsalary = data[0]['minsalary']
          this.MinEquity = data[0]['MinEquity']
          this.yearlyBonus = data[0]['yearlyBonus']
          this.drive_id = data[0]['id']
          this.comp_email = data[0]['comp_email']


        //   this.display = data;

        // this.run = Array(data['length']).fill(4);
        

      },error => {
        console.log("Error", error);
       }
); 
  }
  submitIt(){
   
    this.errormsg = ""

    console.log("i am working");
    console.log(this.gender,this.Latino,this.Veteran,this.Disability);

    if(this.gender.length !=0 && this.Latino.length != 0 && this.Veteran.length !=0 && this.Disability.length !=0 )
    {
      this.apply_for_job();

    }else{

      console.log("empty fields ")

      this.errormsg = "please fill all required details"

    } 
  }

    apply_for_job()
    {
      


      
    









  var date = new Date();

     var today_date = date.getDate().toString();
     var today_month = date.getUTCMonth() + 1;
     var today_year = date.getUTCFullYear().toString();
    
     this.today =  today_date+"/"+today_month+"/"+today_year;


  if(confirm("Are you sure to Apply for company ")) {

    console.log("yes  ");
    this.spinner.show();
    this.http.post("https://sleepy-savannah-56074.herokuapp.com/api/application-forms?access_token="+this.access_token,
        {
          
          

          "candidate_id": this.candidate_id,

          "company_id": "static comp id ",

          "comp_name": this.company_name,
          "status": "waiting",
          "location": this.location,
          "resume_link": this.resume_link,
          "drive_id": this.drive_id,
          "candidate_name": this.candidate_name,
          "applied_date": this.today,
          "companny_email": this.comp_email ,
          "candidate_email": this.can_email,
          "candidate_gender": this.gender,
          "candidate_hispanic_lation": this.Latino,
          "candidate_veteras_status": this.Veteran,
          "candidate_disbility_status": this.Disability,
          "candidate_image": this.profile_img_url,
          "candidate_exp": this.Years_of_Experience,
          


        })
        .subscribe(
            data => {

              console.log(data)

              this.spinner.hide()
                console.log("POST Request is successful ", data);
                this.form = false;
                this.success = true;
                
             

             
                
            },
            error => {
              this.spinner.hide()
              this.err = error;
                console.log("refused to apply", error);
          

            }
        );  
     }
    }

}
