import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
// import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { TokenService } from '../token.service';


import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild} from '@angular/core';
import {MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete} from '@angular/material';
import {Observable} from 'rxjs';



@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  // filteredOptions: Observable<string[]>;

  step = -1;

  works = ['US Citizen', 'Greencard holder', 'Work Visa'];
  fundingStatus = ['Seed', 'Series A', 'Series B', 'Series C', 'Series D', 'Publicly traded', 'Other'];
  conditins = ['Yes','no'];
  year_exp = ['0 Years', ' 1-3 Years', '4-6 Years','7-10 Years' , '11-15 Years', '15+ Years'];

  job_types_list = ['Full Time', 'Contract', 'Part Time'];
  job_titles_list= ['API Developer', 'Backend Engineer', 'CTO', 'Data Analyst', 'Data Scientist', 'Database Developer', 'DevOps Engineer', 'Engineering Manager', 'Frontend Engineer', 'Full Stack Developer', 'Java Developer', 'Machine Learning Engineer', 'Network Engineer', 'Opensource Developer', 'Platforms Engineer', 'Product Manager', 'Site Reliability Engineer', 'Software Architect', 'Software Engineer', 'Systems Admin', 'Systems Engineer', 'Technical Lead', 'UI Developer', 'UI UX Designer'];
  market_options_list =  ['3d printing', '3d technology', 'ad server', 'ad targeting', 'advanced materials', 'advertising', 'advertising platforms', 'aerospace', 'affiliate marketing', 'agtech', 'analytics', 'android', 'angel investment', 'animation', 'app discovery', 'application performance management', 'app marketing', 'apps', 'architecture', 'artificial intelligence', 'assistive technology', 'audiobooks', 'augmented reality', 'autonomous vehicles', 'b2b', 'b2c', 'banking', 'big data', 'bioinformatics', 'biopharma', 'biotechnology', 'bitcoin', 'blogging platforms', 'brand marketing', 'business development', 'business information systems', 'business intelligence', 'car sharing', 'clean energy', 'cleantech', 'cloud computing', 'cloud data services', 'cloud infrastructure', 'cloud management', 'cloud security', 'cloud storage', 'college recruiting', 'communication hardware', 'communications infrastructure', 'computer vision', 'consulting', 'consumer applications', 'consumer electronics', 'consumer goods', 'consumer research', 'consumer software', 'content', 'content marketing', 'crm', 'crowdfunding', 'crowdsourcing', 'cryptocurrency', 'customer service', 'cyber security', 'database', 'data center', 'data center automation', 'data integration', 'data mining', 'data storage', 'data visualization', 'developer apis', 'developer platform', 'developer tools', 'digital marketing', 'digital media', 'drone management', 'drones', 'e-commerce platforms', 'edtech', 'e-learning', 'email marketing', 'embedded software', 'embedded systems', 'emergency medicine', 'emerging markets', 'employee benefits', 'energy management', 'enterprise software', 'facial recognition', 'fashion', 'financial services', 'fintech', 'food delivery', 'fraud detection', 'gaming', 'genetics', 'graphic design', 'hardware', 'health care', 'health diagnostics', 'health insurance', 'hedge funds', 'home automation', 'homeland security', 'human computer interaction', 'human resources', 'iaas', 'information services', 'information technology', 'infrastructure', 'innovation management', 'insurance', 'intellectual property', 'intelligent systems', 'internet of things', 'ios', 'it infrastructure', 'lead generation', 'linux', 'location based services', 'logistics', 'machine learning', 'management consulting', 'management information systems', 'manufacturing', 'mapping services', 'marijuana', 'marketing automation', 'marketplace', 'market research', 'media and entertainment', 'medical device', 'meeting software', 'messaging', 'micro lending', 'mining technology', 'mobile advertising', 'mobile apps', 'mobile payments', 'nanotechnology', 'natural language processing', 'network hardware', 'network security', 'neuroscience', 'non profit', 'nuclear', 'oil and gas', 'online games', 'open source', 'operating systems', 'paas', 'payments', 'peer to peer', 'pharmaceutical', 'predictive analytics', 'privacy', 'private cloud', 'private social networking', 'product design', 'productivity tools', 'product management', 'product research', 'recruiting', 'renewable energy', 'retail technology', 'ride sharing', 'robotics', 'saas', 'sales', 'search engine', 'security', 'semantic search', 'semantic web', 'service industry', 'skill assessment', 'social crm', 'social innovation', 'social media', 'social media advertising', 'social media management', 'social media marketing', 'social network', 'social recruiting', 'social shopping', 'software engineering', 'solar', 'space travel', 'staffing agency', 'stock exchanges', 'supply chain management', 'telecommunications', 'trading platform', 'transportation', 'ux design', 'venture capital', 'video advertising', 'video games', 'video on demand', 'video streaming', 'virtual currency', 'virtualization', 'virtual reality', 'wearables', 'web apps', 'web browsers', 'web design', 'web development', 'web hosting', 'wireless'];
  
  headline:string;
  summery:string;

  can_name:string;
  can_loc:string;


  comp_name:string;
  job_title:string;
  start_date_job:string;
  end_date_job:string;
  experience_des:string;

  // description:string;

  inst_name:string;
  degree:string;
  field:string;
  start_date_edu:string;
  end_date_edu:string;
  des_edu:string;

  work:string;
  USDOD:string;
  sal_exp:number;
  interviewing:string;
  Need_of_Sponsorship: string;
  Management_Experience: string;
  Start_Up_Experience:string;
  Years_of_Experience:string;


  // funding:string;
  funding_Status:string;
  job_title_selected:string;
  job_type_selected:string;
  market_option_selected:string;

  selectedfile: File  = null;

  form = true;
  success = "" ;




  // profile_url:string;
  profile_img_url: string;
  result:any;
  user_data: any;
  userid: string;
  accesstoken:string;
  errormsg: string;
  usermail: any;
  post_url: string;
  
  userdata: Object;
  mongo_user_id:string;
  copy_img: string;


  // jash added

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
  fruits: string[] = ['angularjs'];
  images: string[] = ['/assets/tech-appveyor.png', '/assets/tech-adroll.png', '/assets/tech-aws.psworks.png', '/assets/tech-apiary.png', '/assets/tech-airtable.png', '/assets/tech-archlinux.png', '/assets/tech-horizon.png', '/assets/tech-clusterhq.png', '/assets/tech-aws.qs.png', '/assets/tech-ampersand.png', '/assets/tech-aws.odedeploy.png', '/assets/tech-braze.png', '/assets/tech-disqus.png', '/assets/tech-auth0.png', '/assets/tech-azure.png', '/assets/tech-apigee.png', '/assets/tech-brandfolder.png', '/assets/tech-brave.png', '/assets/tech-appmaker.png', '/assets/skills.py', '/assets/tech-android.png', '/assets/tech-appium.png', '/assets/tech-groovehq.png', '/assets/tech-react.png', '/assets/tech-appbase.png', '/assets/tech-aerospike.png', '/assets/tech-apache.png', '/assets/tech-box.png', '/assets/tech-chevereto.png', '/assets/tech-awesome.png', '/assets/tech-algolia.png', '/assets/tech-airbnb.png', '/assets/tech-jquery.obile.png', '/assets/tech-css.png', '/assets/tech-angular.png', '/assets/tech-jquery.png', '/assets/tech-aws.am.png', '/assets/tech-dropzone.png', '/assets/tech-aws.loudformation.png', '/assets/tech-akamai.png', '/assets/tech-aws.c2.png', '/assets/tech-amazon.hime.png', '/assets/tech-apphub.png', '/assets/tech-6px.png', '/assets/tech-autoprefixer.png', '/assets/tech-aws.loudfront.png', '/assets/tech-angular.con.png', '/assets/tech-apache_cloudstack.png', '/assets/tech-angellist.png', '/assets/tech-airbrake.png', '/assets/tech-aws.af.png', '/assets/tech-android.con.png', '/assets/tech-createjs.png', '/assets/tech-amex.png', '/assets/tech-javascript.png', '/assets/tech-apptentive.png', '/assets/tech-appfog.png', '/assets/tech-500px.png', '/assets/tech-aws.ambda.png', '/assets/tech-amazonwebservices.png', '/assets/tech-appdynamics.png', '/assets/tech-graphql.png', '/assets/tech-amazon.onnect.png', '/assets/tech-apollostack.png', '/assets/tech-canjs.png', '/assets/tech-backbonejs.png', '/assets/tech-html.png', '/assets/tech-aws.pi.ateway.png', '/assets/tech-authy.png', '/assets/tech-appcode.png', '/assets/tech-bluemix.png', '/assets/tech-cljs.png', '/assets/tech-angularjs.png', '/assets/tech-aws.3.png', '/assets/tech-alfresco.png', '/assets/tech-clojure.png', '/assets/tech-altair.png', '/assets/tech-armory.png', '/assets/tech-ansible.png']
  allFruits: string[] =['appveyor', 'adroll', 'aws', 'apiary', 'airtable', 'archlinux', 'horizon', 'clusterhq', 'aws', 'ampersand', 'aws', 'braze', 'disqus', 'auth0', 'azure', 'apigee', 'brandfolder', 'brave', 'appmaker', 'skills', 'android', 'appium', 'groovehq', 'react', 'appbase', 'aerospike', 'apache', 'box', 'chevereto', 'awesome', 'algolia', 'airbnb', 'jquery', 'css', 'angular', 'jquery', 'aws', 'dropzone', 'aws', 'akamai', 'aws', 'amazon', 'apphub', '6px', 'autoprefixer', 'aws', 'angular', 'apache_cloudstack', 'angellist', 'airbrake', 'aws', 'android', 'createjs', 'amex', 'javascript', 'apptentive', 'appfog', '500px', 'aws', 'amazonwebservices', 'appdynamics', 'graphql', 'amazon', 'apollostack', 'canjs', 'backbonejs', 'html', 'aws', 'authy', 'appcode', 'bluemix', 'cljs', 'angularjs', 'aws', 'alfresco', 'clojure', 'altair', 'armory', 'ansible'];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  resume_link: any;
  resume_status: string;



  // jash added 
  constructor(private spinner: NgxSpinnerService,public service:TokenService, private HTTP:HttpClient) {

    // jash added

    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));

    // jash added

   }

// jash added chips 


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




// jash added chips 


  ngOnInit() {
   
    this.user_data = this.service.get_user_data();
    this.userid = this.user_data[0];
    this.usermail = this.user_data[2];
    this.accesstoken = this.user_data[1];


    //this.usermail  = "jayakrishnaswamy.g@gmail.com"
    console.log(this.usermail )

    // ------------------------- get previous info 

    this.get_prev_info();

    //   -------------------------- get previoud info
    
  }
 
  get_prev_info()
  {

    this.post_url  = "https://sleepy-savannah-56074.herokuapp.com/api/candidates?filter[where][can_email]="+this.usermail;

    console.log(this.post_url)

    this.spinner.show();
    this.HTTP.get(this.post_url) .subscribe(
      data => {

        console.log(data)
        
        console.log("sucribed successflly")
        this.spinner.hide();
        this.userdata = data;
        // ------------------ img id 

        this.mongo_user_id = data[0]['id'];

        // ------------------ img id 

        this.profile_img_url = data[0]['can_profile_pic'];
        this.copy_img = this.profile_img_url;  // img logic 
        this.can_name = data[0]['can_name'];
        this.can_loc = data[0]['can_loc'];
        this.usermail = data[0]['can_email'];
        this.headline = data[0]['can_headline']
        this.summery = data[0]['can_summery']

        this.work = data[0]['can_work_status']
        this.sal_exp = data[0]['can_sal_expection']
        this.interviewing = data[0]['can_currently_interviewing']
        this.Start_Up_Experience = data[0]['can_startup_exp']
        this.USDOD = data[0]['can_usdod']
        this.Need_of_Sponsorship = data[0]['can_need_of_sponsorship']
        this.Management_Experience = data[0]['can_management_experiece']
        this.Years_of_Experience = data[0]['can_year_of_experience']

        // this.can_skills = data[0]['can_skills']

        this.comp_name = data[0]['can_ex_comp_name']
        this.job_type_selected= data[0]['can_job_types']
        this.market_option_selected = data[0]['can_market_options']
        this.job_title_selected = data[0]['can_job_title']

        this.degree = data[0]['can_edu_degree']
        this.field = data[0]['can_edu_field_of_study']
        this.start_date_edu = data[0]['can_edu_start_date']
        this.end_date_edu = data[0]['can_edu_end_date']

        // jk added 
        this.job_title = data[0]['can_ex_comp_job_title']
        this.start_date_job = data[0]['can_ex_comp_start_date']
        this.end_date_job = data[0]['can_ex_comp_end_date']
        this.experience_des = data[0]['can_ex_comp_des']

        this.des_edu = data[0]['can_edu_des']

        this.funding_Status = data[0]['can_funding_status']

        this.resume_link = data[0]['can_resume_link']
        
        // console.log(this.can_year_of_experience)

        this.fruits = data[0]['can_skills']
      },
      error => {
          console.log("Error", error);
          this.spinner.hide();

         
          
       }
    );
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  
  onSelectFile_profile(event)
  {

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.selectedfile= <File> event.target.files[0];

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.profile_img_url = event.target['result'];
      }
    }
  }


  onSelectFile_resume(event)
  {

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.selectedfile= <File> event.target.files[0];

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.resume_link = event.target['result'];
      }
    }
  }


  uploadimage(){

    
    const fd  = new FormData();
    fd.append('image',this.selectedfile,this.selectedfile.name);
    this.HTTP.post("https://sleepy-savannah-56074.herokuapp.com/api/containers/"+this.userid+"|logo" +"/upload",
    fd)
    .subscribe(
        data => {
          this.result = data;
          console.log("logo upload success ", data)
          var loc = this.result.result[0].metadata.filename;
          this.profile_img_url = "https://sleepy-savannah-56074.herokuapp.com/api/containers/"+this.userid+"|logo"+"/download/"+loc;
          this.postData()
          
         
         
        },
        error => {
            console.log("Error", error);
        });
      

  }

  upload_resume(){

    
    const fd  = new FormData();
    fd.append('image',this.selectedfile,this.selectedfile.name);
    this.HTTP.post("https://sleepy-savannah-56074.herokuapp.com/api/containers/"+this.userid+"|resume" +"/upload",
    fd)
    .subscribe(
        data => {
          this.result = data;
          console.log("logo upload success ", data)
          var loc = this.result.result[0].metadata.filename;
          this.resume_link = "https://sleepy-savannah-56074.herokuapp.com/api/containers/"+this.userid+"|resume"+"/download/"+loc;
          
          
          this.resume_status = "Resume uploded successfully"
         
         
        },
        error => {
            console.log("Error", error);
            this.resume_status = "Error while uploading resume"

        });
      

  }
  submit()
  {

    this.spinner.show();
    console.log("submit btn ")
    // console.log("data is :", this.headline, this.summery, this.comp_name, this.job_title, this.start_date_job, this.end_date_job, this.experience_des, this.inst_name, this.degree, this.field, this.start_date_edu, this.end_date_edu, this.des_edu, this.work,this.USDOD,this.sal_exp, this.interviewing, this.Need_of_Sponsorship, this.Management_Experience, this.Start_Up_Experience, this.Years_of_Experience, this.fundingStatus , this.job_title_selected, this.job_type_selected,this.market_option_selected );
  
    console.log(this.selectedfile)

    if(this.profile_img_url === this.copy_img)
    {

      
      this.postData();
      


    }else{

      this.uploadimage();
      // this.postData();    // automatic 

    }

    // this.uploadimage()


  }

  postData()
  {
    this.errormsg = ""
    this.success = ""
    console.log("------------------------------ posting data ------------------")
    
    this.HTTP.put("https://sleepy-savannah-56074.herokuapp.com/api/candidates?access_token="+this.accesstoken,
        {
          "id": this.mongo_user_id,
          "can_profile_pic":this.profile_img_url,
          "can_headline": this.headline,
          "can_summery": this.summery,
          "can_name": this.can_name,
          "can_loc" : this.can_loc,
          "can_email" : this.usermail,

          "can_ex_comp_name": this.comp_name,
          "can_ex_comp_job_title": this.job_title,
          "can_ex_comp_start_date": this.start_date_job,
          "can_ex_comp_end_date": this.end_date_job,
          "can_ex_comp_des": this.experience_des,

          "can_edu_inst_name": this.inst_name,
          "can_edu_degree": this.degree,
          "can_edu_field_of_study": this.field,
          "can_edu_start_date": this.start_date_edu,
          "can_edu_end_date": this.end_date_edu,
          "can_edu_des": this.des_edu,

          "can_work_status": this.work,
          "can_usdod": this.USDOD,
          "can_sal_expection": this.sal_exp,
          "can_currently_interviewing": this.interviewing,
          "can_need_of_sponsorship": this.Need_of_Sponsorship,
          "can_management_experiece": this.Management_Experience,
          "can_startup_exp": this.Start_Up_Experience,
          "can_year_of_experience": this.Years_of_Experience,

          "can_funding_status": this.funding_Status,
          "can_job_title": this.job_title_selected,
          "can_job_types": this.job_type_selected,
          "can_market_options": this.market_option_selected,

          "can_resume_link" : this.resume_link ,

          
          "can_skills": this.fruits
        })
        .subscribe(
            data => {
 
              this.spinner.hide();
              this.form = false;
              this.success = "Your data is update successfully"
            
          },
          error => {
            console.log("Error", error);
            this.spinner.hide();

            // this.error = error
            this.spinner.hide();
            this.form = false;
            this.errormsg = "error occured.."
          }
    ); 

  }

}


