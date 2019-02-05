import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { TokenService } from '../token.service';
import { HttpClient } from '@angular/common/http';

import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras
}                           from '@angular/router';

import {Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ShortlistDialogComponent } from '../shortlist-dialog/shortlist-dialog.component';

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-shortlist-company',
  templateUrl: './shortlist-company.component.html',
  styleUrls: ['./shortlist-company.component.css']
})
export class ShortlistCompanyComponent implements OnInit {

  displayedColumns: string[] = ['Company name'];

  
  title:string;
  data1: any;


  user_id:string;
  access_token:string;


  num1 : number; 
  one: any;
  result_data: Object;

  today = ""
  comp_email: any;
  name: any;
  animal: any;
  cand_id: any;
  comp_name: any;
  comp_id: any;
  status: any;
  resume_link: any;
  driveid: any;
  cand_name: any;
  date: any;
  cand_email: any;
  cand_gender: any;
  chl: any;
  cvs: any;
  cds: any;
  location: any;
  image: any;



  
  waiting_list: boolean;
  approved_list: boolean;
  rej_list: boolean;



  arrayOne(n: number): any[] {
    return Array(n);
  }

  selected_item :string;
  constructor(private service:TokenService,public dialog: MatDialog,
    private spinner: NgxSpinnerService, private HTTP:HttpClient,private router: Router) { }

  ngOnInit() {
    


    

    var user_data = []
     user_data = this.service.get_user_data();
     this.user_id = user_data[0];
     this.access_token= user_data[1];
     this.comp_email = user_data[2];

     this.spinner.show();

     this.HTTP.get("https://sleepy-savannah-56074.herokuapp.com/api/application-forms?filter[where][companny_email]="+this.comp_email,
     {  })
     .subscribe(
         data => {

           this.spinner.hide();

           
           this.result_data = data;

           console.log(this.result_data)



          //  console.log(data[0]['candidate_name'])
           


         
       },
       error => {
        this.spinner.hide();

         console.log("Error", error);

       }
 ); 

  }

  // search_filter()
  // {
  //   console.log("selected item:",this.selected_item);
  // }

  open_profile(mail)
  {
    
  let navigationExtras: NavigationExtras = {
    queryParams: { 'id': mail }
   
  };
this.router.navigate(['/myprofile'],navigationExtras );
  }

  Reject(id)
  {
    

      this.HTTP.get("https://sleepy-savannah-56074.herokuapp.com/api/application-forms?filter[where][id]="+id,
      { 

       })
      .subscribe(
          data => {
 
            this.spinner.hide();
 
            
            // this.result_data = data;

            this.cand_id = data[0]['candidate_id'];
            this.comp_id = data[0]['company_id'];
            this.comp_name = data[0]['comp_name'];
            // this.status = 
            this.location = data[0]['location'];;
            this.resume_link = data[0]['resume_link'];
            this.driveid = data[0]['drive_id'];
            this.cand_name = data[0]['candidate_name']
            this.date = data[0]['applied_date']

            this.comp_email = data[0]['companny_email']
            this.cand_email = data[0]['candidate_email']
            this.cand_gender = data[0]['candidate_gender']
            this.chl = data[0]['candidate_hispanic_lation']
            this.cvs = data[0]['candidate_veteras_status']
            this.cds = data[0]['candidate_disbility_status']
            this.image = data[0]['candidate_image']

            
 
            console.log(this.cand_name)

            this.animal = "Rejected";
            this.update_info(id);


          
        },
        error => {
         this.spinner.hide();
 
          console.log("Error", error);
 
        }); 

   
  

  }

  Accpect(id): void {
    const dialogRef = this.dialog.open(ShortlistDialogComponent, {
      width: '350px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
      
      console.log(this.animal)
      this.spinner.show()
      
      console.log(id)

      this.HTTP.get("https://sleepy-savannah-56074.herokuapp.com/api/application-forms?filter[where][id]="+id,
      { 

       })
      .subscribe(
          data => {
 
            this.spinner.hide();
 
            
            // this.result_data = data;

            this.cand_id = data[0]['candidate_id'];
            this.comp_id = data[0]['company_id'];
            this.comp_name = data[0]['comp_name'];
            // this.status = 
            this.location = data[0]['location'];;
            this.resume_link = data[0]['resume_link'];
            this.driveid = data[0]['drive_id'];
            this.cand_name = data[0]['candidate_name']
            this.date = data[0]['applied_date']

            this.comp_email = data[0]['companny_email']
            this.cand_email = data[0]['candidate_email']
            this.cand_gender = data[0]['candidate_gender']
            this.chl = data[0]['candidate_hispanic_lation']
            this.cvs = data[0]['candidate_veteras_status']
            this.cds = data[0]['candidate_disbility_status']
            this.image = data[0]['candidate_image']

            
 
            console.log(this.cand_name)
            this.update_info(id);
          
        },
        error => {
         this.spinner.hide();
 
          console.log("Error", error);
 
        }
  ); 

    });
  }



  update_info(id)
  {

    this.HTTP.put("https://sleepy-savannah-56074.herokuapp.com/api/application-forms",
    { 

      "id":id,
      "candidate_image": this.image,
      "candidate_id": this.cand_id,
      "company_id": this.comp_id,
      "comp_name": this.comp_name,
      "status": this.animal,
      "location": this.location,
      "resume_link":  this.resume_link ,
      "drive_id": this.driveid,
      "candidate_name":   this.cand_name,
      "applied_date": this.date,
      "companny_email":  this.comp_email,
      "candidate_email":  this.cand_email,
      "candidate_gender": this.cand_gender,
      "candidate_hispanic_lation":   this.chl,
      "candidate_veteras_status": this.cvs,
      "candidate_disbility_status":this.cds

     })
    .subscribe(
        data => {
          this.spinner.hide();
          
          // ---------------------------------------------------------------------------



          this.spinner.show();

          this.HTTP.get("https://sleepy-savannah-56074.herokuapp.com/api/application-forms?filter[where][companny_email]="+this.comp_email,
          {  })
          .subscribe(
              data => {
     
                this.spinner.hide();
                this.result_data = data;
                console.log(this.result_data)
            },
            error => {
             this.spinner.hide();
              console.log("Error", error);
            }
         ); 


          // --------------------------------------------------------------------------------



        },
        error => {
         this.spinner.hide();
 
          console.log("Error", error);
 
        }
  ); 
  }


  list_type(val)
  {
    this.waiting_list = false;
    this.approved_list = false;
    this.rej_list = false;

    


    if(val==1)
    {
      this.waiting_list = true;

    }else if(val==2)
    {

      this.approved_list = true;


    }else if(val ==3)
    {
        this.rej_list = true;
    }

  }


}
