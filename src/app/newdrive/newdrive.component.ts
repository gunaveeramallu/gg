// import { Component, OnInit } from '@angular/core';
// import { FormsModule} from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
// import { TokenService } from '../token.service';
// import { NgxSpinnerService } from 'ngx-spinner';

import { Component, OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../token.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';



@Component({
  selector: 'app-newdrive',
  templateUrl: './newdrive.component.html',
  styleUrls: ['./newdrive.component.css']
})
export class NewdriveComponent implements OnInit {
  minYeEx:string;
  jobType:string;
  visaSponsorship:string;
  minsalary:string;
  maxsalary:string;
  MinEquity:string;
  MaxEquity:string;
  yearlyBonus:string;
  Department:string;
  JobOwner:string;
  numbers;
  count:number = 0;
  favoriteSeason:string[];
  remoteWork:string;
  seasons: string[] = ['Yes', 'No'];
  selected1= 0;
  hovered = 0;
  readonly = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = [];
  images: string[] = ['/assets/tech-appveyor.png', '/assets/tech-adroll.png', '/assets/tech-aws.psworks.png', '/assets/tech-apiary.png', '/assets/tech-airtable.png', '/assets/tech-archlinux.png', '/assets/tech-horizon.png', '/assets/tech-clusterhq.png', '/assets/tech-aws.qs.png', '/assets/tech-ampersand.png', '/assets/tech-aws.odedeploy.png', '/assets/tech-braze.png', '/assets/tech-disqus.png', '/assets/tech-auth0.png', '/assets/tech-azure.png', '/assets/tech-apigee.png', '/assets/tech-brandfolder.png', '/assets/tech-brave.png', '/assets/tech-appmaker.png', '/assets/skills.py', '/assets/tech-android.png', '/assets/tech-appium.png', '/assets/tech-groovehq.png', '/assets/tech-react.png', '/assets/tech-appbase.png', '/assets/tech-aerospike.png', '/assets/tech-apache.png', '/assets/tech-box.png', '/assets/tech-chevereto.png', '/assets/tech-awesome.png', '/assets/tech-algolia.png', '/assets/tech-airbnb.png', '/assets/tech-jquery.obile.png', '/assets/tech-css.png', '/assets/tech-angular.png', '/assets/tech-jquery.png', '/assets/tech-aws.am.png', '/assets/tech-dropzone.png', '/assets/tech-aws.loudformation.png', '/assets/tech-akamai.png', '/assets/tech-aws.c2.png', '/assets/tech-amazon.hime.png', '/assets/tech-apphub.png', '/assets/tech-6px.png', '/assets/tech-autoprefixer.png', '/assets/tech-aws.loudfront.png', '/assets/tech-angular.con.png', '/assets/tech-apache_cloudstack.png', '/assets/tech-angellist.png', '/assets/tech-airbrake.png', '/assets/tech-aws.af.png', '/assets/tech-android.con.png', '/assets/tech-createjs.png', '/assets/tech-amex.png', '/assets/tech-javascript.png', '/assets/tech-apptentive.png', '/assets/tech-appfog.png', '/assets/tech-500px.png', '/assets/tech-aws.ambda.png', '/assets/tech-amazonwebservices.png', '/assets/tech-appdynamics.png', '/assets/tech-graphql.png', '/assets/tech-amazon.onnect.png', '/assets/tech-apollostack.png', '/assets/tech-canjs.png', '/assets/tech-backbonejs.png', '/assets/tech-html.png', '/assets/tech-aws.pi.ateway.png', '/assets/tech-authy.png', '/assets/tech-appcode.png', '/assets/tech-bluemix.png', '/assets/tech-cljs.png', '/assets/tech-angularjs.png', '/assets/tech-aws.3.png', '/assets/tech-alfresco.png', '/assets/tech-clojure.png', '/assets/tech-altair.png', '/assets/tech-armory.png', '/assets/tech-ansible.png']
  allFruits: string[] =['appveyor', 'adroll', 'aws', 'apiary', 'airtable', 'archlinux', 'horizon', 'clusterhq', 'aws', 'ampersand', 'aws', 'braze', 'disqus', 'auth0', 'azure', 'apigee', 'brandfolder', 'brave', 'appmaker', 'skills', 'android', 'appium', 'groovehq', 'react', 'appbase', 'aerospike', 'apache', 'box', 'chevereto', 'awesome', 'algolia', 'airbnb', 'jquery', 'css', 'angular', 'jquery', 'aws', 'dropzone', 'aws', 'akamai', 'aws', 'amazon', 'apphub', '6px', 'autoprefixer', 'aws', 'angular', 'apache_cloudstack', 'angellist', 'airbrake', 'aws', 'android', 'createjs', 'amex', 'javascript', 'apptentive', 'appfog', '500px', 'aws', 'amazonwebservices', 'appdynamics', 'graphql', 'amazon', 'apollostack', 'canjs', 'backbonejs', 'html', 'aws', 'authy', 'appcode', 'bluemix', 'cljs', 'angularjs', 'aws', 'alfresco', 'clojure', 'altair', 'armory', 'ansible'];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  job_role:string= "";
  njobs:number = 10;
  startdate:string= "";
  enddate:string= "";
  prerequest:string= "";
  postrequest: string= "";
  jobsalary:string= "";
  jd:string= "";
  location: string= "";

  
  role: any= "";
  display :  boolean;
  success: boolean = false;
  apply = "Apply for Drive";
  user_data: any ;

  company_id:string;
  imgeurl = "https://dc-cdn.s3-ap-southeast-1.amazonaws.com/dc-Cover-252etsvks7o0jr481l9vofbeh2-20160317015130.Medi.jpeg";

  selectedfile: File  = null;
  uploader: Object;
  username: string;
  message: string;
  result: any;

  QUESTIONS = [""];
  usermail: any;
  error_message: string;
  
  constructor(private spinner: NgxSpinnerService,private HTTP:HttpClient,private service: TokenService) { 
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
   
    this.role = this.service.get_user_type();
    if(this.role === "company")
    {
      this.display =  true;
    }else{

      this.display =  false;

    } 
    this.user_data = this.service.get_user_data();
    this.company_id = this.user_data[0];
    this.username = this.user_data[3];
    this.usermail = this.user_data[2];

  }

  ngOnInit() {
  }

  onFileSelected(event)
  {
    // console.log(event);
     

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.selectedfile = <File> event.target.files[0];

      // this.selected_testimoniale[i] = <File> event.target.files[0];

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.imgeurl = event.target['result'];
      }
    }


  }
  uploadImage()
  {

    const fd  = new FormData();
    fd.append('image',this.selectedfile,this.selectedfile.name);
    this.HTTP.post("https://sleepy-savannah-56074.herokuapp.com/api/containers/"+this.company_id +"/upload",
    fd)
    .subscribe(
        data => {
          this.result = data;
          console.log("image upload success ", data)
          var loc = this.result.result[0].metadata.filename;
          this.imgeurl = "https://sleepy-savannah-56074.herokuapp.com/api/containers/"+this.company_id+"/download/"+loc;

          this.uploader   = data;
          
        },
        error => {
            console.log("Error", error);
        });
  }
 
  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      

      // Add our fruit
      if ((value || '').trim()) {
        this.fruits.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.fruitCtrl.setValue(null);
    }
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }
  increase(){
    this.count = this.count +1
    this.numbers = Array(this.count).fill(4)
    console.log(this.numbers);
  }
  less(){
    this.count = this.count -1
    this.numbers = Array(this.count).fill(4)
    console.log(this.numbers);
  }
  checking(){

    this.error_message = " "

    this.uploadImage();
    console.log(this.job_role,this.jd,this.fruits,this.minYeEx,this.jobType,this.visaSponsorship,this.remoteWork,this.startdate,this.enddate,this.minsalary,this.maxsalary,this.MaxEquity,this.yearlyBonus,this.location,this.Department,this.JobOwner,this.QUESTIONS);
    
    // if(this.job_role.length !=0 && this.jd.length != 0&& this.fruits.length !=0 && this.minYeEx.length !+ 0&& this.jobType.length !=0 && this.visaSponsorship.length !=0 && this.remoteWork.length!=0 && this.startdate.length !=0 && this.enddate.length!=0 && this.minsalary.length != 0 &&this.MaxEquity.length !=0 && this.yearlyBonus.length != 0 && this.location.length !=0 && this.Department.length!=0 && this.JobOwner.length !=0 )
    // {

    //   this.error_message = "Please fill all fields completely "

    // }else{

      this.spinner.show();


    this.HTTP.post("https://sleepy-savannah-56074.herokuapp.com/api/drives",
    {
      "companyname": this.username,
      'job_role' : this.job_role,
      "jd": this.jd,
      "siklls": this.fruits,
      "visaSponsorship": this.visaSponsorship,
      "remoteWork": this.remoteWork,
      "startdate": this.startdate,
      "enddate": this.enddate,
      "minsalary": this.minsalary,
      "maxsalary": this.maxsalary,
      "MinEquity": this.MinEquity,
      "MaxEquity": this.MaxEquity,
      "yearlyBonus": this.yearlyBonus,
      "location": this.location,
      "Department": this.Department,
      "JobOwner": this.JobOwner,
      "QUESTIONS": this.QUESTIONS,
      "post_job_img": this.imgeurl,
      "comp_email": this.usermail
    })
        .subscribe(
            data => {

              
                
                console.log("POST drive  is successful ", data);

                //  updata company drives count 
                this.success = true;
                this.spinner.hide();
                               

            },
            error => {
                console.log("Error", error);
                this.spinner.hide();
                this.message = "An error ouucurd while processing your request"


                
            }
        );
  // }
}

}

// image and commpany email should be updated 
// what to change the link of post 
// changed the display auth