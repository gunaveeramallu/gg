import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {


  profile_exist:boolean;

  can_profile_pic:string;
  can_name:string;
  can_loc:string;
  can_email:string;
  can_headline:string;
  can_summery:string;
  can_work_status:string;
  can_sal_expection:String;
  can_currently_interviewing:string;
  can_usdod:string
  can_startup_exp:string;
  can_need_of_sponsorship:string;
  can_management_experiece:String;
  can_year_of_experience:string;
  can_skills:string[]
  can_ex_comp_name:string;
  can_job_types:string;
  can_market_options:string;
  can_job_title:String;
  can_edu_degree:string;
  can_edu_field_of_study:string;
  can_edu_start_date:string;
  can_edu_end_date:string;
  
  post_url: string;
  id: any;
  userdata: Object;
  constructor(private spinner: NgxSpinnerService,private http:HttpClient,private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      console.log(params);
      // this.para = params
      this.id = params['id'];  // emal of company stored in id variable
       
      


    this.post_url  = "https://sleepy-savannah-56074.herokuapp.com/api/candidates?filter[where][can_email]="+this.id

      this.spinner.show();
    this.http.get(this.post_url) .subscribe(
      data => {

        this.spinner.hide();
        this.userdata = data;

        // this.id = "gunaveeramallu97@gmail.com";
        
        console.log(data)
        if(this.id == data[0]['can_email'])
        {
          this.profile_exist = true;
          console.log("data found ")
        }else
        {
          this.profile_exist = false;
          console.log("data not found ")

        }

        this.can_profile_pic = data[0]['can_profile_pic'];
        this.can_name = data[0]['can_name'];
        this.can_loc = data[0]['can_loc'];
        this.can_email = data[0]['can_email'];
        this.can_headline = data[0]['can_headline']
        this.can_summery = data[0]['can_summery']
        this.can_work_status = data[0]['can_work_status']
        this.can_sal_expection = data[0]['can_sal_expection']
        this.can_currently_interviewing = data[0]['can_currently_interviewing']
        this.can_startup_exp = data[0]['can_startup_exp']
        this.can_usdod = data[0]['can_usdod']
        this.can_need_of_sponsorship = data[0]['can_need_of_sponsorship']
        this.can_management_experiece = data[0]['can_management_experiece']
        this.can_year_of_experience = data[0]['can_year_of_experience']
        this.can_skills = data[0]['can_skills']
        console.log( this.can_skills);
        
        this.can_ex_comp_name = data[0]['can_ex_comp_name']
        this.can_job_types = data[0]['can_job_types']
        this.can_market_options = data[0]['can_market_options']
        this.can_job_title = data[0]['can_job_title']
        this.can_edu_degree = data[0]['can_edu_degree']
        this.can_edu_field_of_study = data[0]['can_edu_field_of_study']
        this.can_edu_start_date = data[0]['can_edu_start_date']
        this.can_edu_end_date = data[0]['can_edu_end_date']
        

        // jk added 
        // this.can_ex_comp_title = data[0]['can_ex_comp_job_title']
        // this.can_ex_comp_s_date = data[0]['can_ex_comp_start_date']
        // this.can_ex_comp_e_date = data[0]['can_ex_comp_end_date']
        // this.can_ex_comp_des = data[0]['can_ex_comp_des']

        // this.can_edu_des = data[0]['can_edu_des']

        // this.can_funding_status = data[0]['can_funding_status']

        


        console.log(this.can_year_of_experience)
      },
      error => {
          console.log("Error", error);
         
          
       }
    );

  })  // close the parsm subscribe 
  }
  

}
