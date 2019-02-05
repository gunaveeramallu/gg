import { Component, OnInit } from '@angular/core';
import { empty } from 'rxjs';
import { TokenService } from '../token.service';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

import { delay, catchError } from 'rxjs/operators';
import { forkJoin, of, throwError } from 'rxjs';

@Component({
  selector: 'app-edit-company-profile',
  templateUrl: './edit-company-profile.component.html',
  styleUrls: ['./edit-company-profile.component.css']
})
export class EditCompanyProfileComponent implements OnInit {

  
  form = true;
  userid : string;
  user_data: any;
  industries = ['3d printing', '3d technology', 'ad server', 'ad targeting', 'advanced materials', 'advertising', 'advertising platforms', 'aerospace', 'affiliate marketing', 'agtech', 'analytics', 'android', 'angel investment', 'animation', 'app discovery', 'application performance management', 'app marketing', 'apps', 'architecture', 'artificial intelligence', 'assistive technology', 'audiobooks', 'augmented reality', 'autonomous vehicles', 'b2b', 'b2c', 'banking', 'big data', 'bioinformatics', 'biopharma', 'biotechnology', 'bitcoin', 'blogging platforms', 'brand marketing', 'business development', 'business information systems', 'business intelligence', 'car sharing', 'clean energy', 'cleantech', 'cloud computing', 'cloud data services', 'cloud infrastructure', 'cloud management', 'cloud security', 'cloud storage', 'college recruiting', 'communication hardware', 'communications infrastructure', 'computer vision', 'consulting', 'consumer applications', 'consumer electronics', 'consumer goods', 'consumer research', 'consumer software', 'content', 'content marketing', 'crm', 'crowdfunding', 'crowdsourcing', 'cryptocurrency', 'customer service', 'cyber security', 'database', 'data center', 'data center automation', 'data integration', 'data mining', 'data storage', 'data visualization', 'developer apis', 'developer platform', 'developer tools', 'digital marketing', 'digital media', 'drone management', 'drones', 'e-commerce platforms', 'edtech', 'e-learning', 'email marketing', 'embedded software', 'embedded systems', 'emergency medicine', 'emerging markets', 'employee benefits', 'energy management', 'enterprise software', 'facial recognition', 'fashion', 'financial services', 'fintech', 'food delivery', 'fraud detection', 'gaming', 'genetics', 'graphic design', 'hardware', 'health care', 'health diagnostics', 'health insurance', 'hedge funds', 'home automation', 'homeland security', 'human computer interaction', 'human resources', 'iaas', 'information services', 'information technology', 'infrastructure', 'innovation management', 'insurance', 'intellectual property', 'intelligent systems', 'internet of things', 'ios', 'it infrastructure', 'lead generation', 'linux', 'location based services', 'logistics', 'machine learning', 'management consulting', 'management information systems', 'manufacturing', 'mapping services', 'marijuana', 'marketing automation', 'marketplace', 'market research', 'media and entertainment', 'medical device', 'meeting software', 'messaging', 'micro lending', 'mining technology', 'mobile advertising', 'mobile apps', 'mobile payments', 'nanotechnology', 'natural language processing', 'network hardware', 'network security', 'neuroscience', 'non profit', 'nuclear', 'oil and gas', 'online games', 'open source', 'operating systems', 'paas', 'payments', 'peer to peer', 'pharmaceutical', 'predictive analytics', 'privacy', 'private cloud', 'private social networking', 'product design', 'productivity tools', 'product management', 'product research', 'recruiting', 'renewable energy', 'retail technology', 'ride sharing', 'robotics', 'saas', 'sales', 'search engine', 'security', 'semantic search', 'semantic web', 'service industry', 'skill assessment', 'social crm', 'social innovation', 'social media', 'social media advertising', 'social media management', 'social media marketing', 'social network', 'social recruiting', 'social shopping', 'software engineering', 'solar', 'space travel', 'staffing agency', 'stock exchanges', 'supply chain management', 'telecommunications', 'trading platform', 'transportation', 'ux design', 'venture capital', 'video advertising', 'video games', 'video on demand', 'video streaming', 'virtual currency', 'virtualization', 'virtual reality', 'wearables', 'web apps', 'web browsers', 'web design', 'web development', 'web hosting', 'wireless'];
  weeks = ['1-2 Weeks','3-4 Weeks',' 5 Weeks+'];
  rounds = ['HR Review','phone interview','Coding Challenge','Video interview','Onsite interview'];
  step = -1;
  public imagePath;
  public imagePath1;
  logo_url: string;
  
  cover_url: string;
  


  companyname:string;  
  // companyname = "usha rama";    
  message: string;
  

  Company_url:string;
  hq_location:string;
  market:string;
  // market = "market";
  year:number;
  // year = "2018"
  location:string;
  // location = "vja"
  no_emp:number;
  no_engg: number;



  company_des:string;
  company_mission:string;
  company_value:string;
  company_culture:string;
  Advantage:string;
  youtube:string;
  
  
  founder_name:string[] =[""];
  founder_title:string[] = [""];
  founder_memb_url:string[]= [""];
  founder_des:string[] = [""];
  founder_img_url:string[] = [""];

 
 
 



  Board_member:string[] =[""];
  Board_member_title:string[] =[""];
  Board_member_url:string[] =[""];

  board_img_url :string[] =[""];


  emp_name :string[] =[""];
  emp_title :string[] =[""];
  emp_url:string[] =[""];
  emp_des :string[] =[""];
  notable_emp_img_url:string[] =[""];


  t_name:string[] =[""];
  t_title:string[] =[""];
  t_url :string[] =[""];
  t_Testimony:string[] =[""];
  testimoniale_img_url :string[] =[""];


  InterView_duration:string;
  no_rounds_of_interview: number;

  round_type=[""];
  round_type_des=[""];

  
  count:number=0;
  count1:number=0;
  count2:number=0;
  count3:number=0;
  count4:number=0;
  numbers:number[];

  one = 0;
  two = 0; 
  three =0;
  four = 0;

  message_cover: string;


  founders_count: number;
  board_membest_count: number;
  employees_count : number; 
  testimonials_count : number;
  interview_count:number;


  selectedfile_logo: File  = null;
  selectedfile_cover: File  = null;
  selected_founder_img_url = [];
  selected_borad_member =[];
  selected_notable_emp = [];
  selected_testimoniale = [];

  // company_id:string;

  // status
  founder_status = [""]
  board_status =[""]
  notable_status = [""]
  test_staus = [""]


  result:any;
  logo_urli:string;
  cover_urli:string;
  success: string;
  usermail: string;
  accesstoken: string;
  error: any;
  uploadcover_state : any
  uploadlogo_state :any
  errormsg: string;


  // jash added 


  // Funding Status
  Seed:boolean = false;
  Series_A:boolean = false;
  Series_B:boolean = false;
  Series_C:boolean = false;
  Series_D:boolean = false;
  Publicly_Traded:boolean = false;
  Other:boolean = false;
  ICO:boolean = false;
  Funding_Status:boolean[]
  //FundingStatus= ['Seed','Series A','Series B','Series C','Series D+','Publicly Traded','Other','ICO']

// Funding Status

// Benefits
  Flexible_Spending_Account:boolean = false;
  HealthSavingsAccount:boolean = false;
  MentalHealthCare:boolean = false;
  RetireeHealthMedical:boolean = false;
  HealthCareOnSite:boolean = false;
  PensionPlan:boolean = false;
  RetirementPlan:boolean = false;
  Plan:boolean = false;
  EquityIncentivePlan:boolean = false;
  EmployeeStockPurchasePlan:boolean = false;
  StockOptions:boolean = false;
  PerformanceBonus:boolean = false;
  PaidSickLeave:boolean = false;
  PaidVacationTime:boolean = false;
  CompetitiveSalaries:boolean = false;
  HealthInsurance:boolean = false;
  LifeInsurance:boolean = false;
  DentalInsurance:boolean = false;
  VisionInsurance:boolean = false;
  DisabilityInsurance:boolean = false;
  Benefits:boolean[]
 // Benefits2 = ['Flexible Spending Account (FSA)','Health Savings Account (HSA)','Mental Health Care','Retiree Health & Medical','Health Care On-Site','Pension Plan','Retirement Plan','401(K) Plan','Equity Incentive Plan','Employee Stock Purchase Plan','Stock Options','Performance Bonus','Paid Sick Leave','Paid Vacation Time','Competitive Salaries','Health Insurance','Life Insurance','Dental Insurance','Vision Insurance','Disability Insurance']  
// Benefits

// Perks
  PingPong:boolean = false;
  BeerOnTap:boolean = false;
  Arcade:boolean = false;
  Yoga:boolean = false;
  CityViews:boolean = false;
  FreeParking:boolean = false;
  SpaPasses:boolean = false;
  Childcare:boolean = false;
  AutoCare:boolean = false;
  CasualDress:boolean = false;
  RemoteWorkDays:boolean = false;
  CompanySwag:boolean = false;
  CompanyPhone:boolean = false;
  CompanyCar:boolean = false;
  CompanyLaptop:boolean = false;
  AppleEquipment:boolean = false;
  GymMembership:boolean = false;
  FitnessCenterOnSite:boolean = false;
  CateredFood:boolean = false;
  CompanyEvents:boolean = false;
  perks:boolean[];
  mongo_user_id = "";
  check_cover_url: string;
  check_logo_url: string;
  logo_status: string;
  cover_status: string;
  info_id: any;
 

  // jash added





  add(){
    this.count++;
    
    this.one ++;
    console.log("count value :",this.count)
    this.numbers = Array(this.count).fill(4)
  }
  sub(){
    this.count--;
    this.one--;
    console.log("count value :",this.count)

    
  }
  arrayOne(elements: number): any[] {
    return Array(this.count);
  }

  add1(){
    this.count1++;
  }
  sub1(){
    this.count1--;
  }
  arrayOne1(elements: number): any[] {
    return Array(this.count1);
  }
  
  add2(){
    this.count2++;
  }
  sub2(){
    this.count2--;
  }
  arrayOne2(elements: number): any[] {
    return Array(this.count2);
  }
  add3(){
    this.count3++;
  }
  sub3(){
    this.count3--;
  }
  arrayOne3(elements: number): any[] {
    return Array(this.count3);
  }

  add4(){
    this.count4++;
  }
  sub4(){
    this.count4--;
  }
  arrayOne4(elements: number): any[] {
    return Array(this.count4);
  }

  constructor(private load_spinner: NgxSpinnerService,public service:TokenService, public HTTP:HttpClient) {

   }

  ngOnInit() {
  
    

     this.user_data = this.service.get_user_data();
     this.userid = this.user_data[0];
     this.usermail = this.user_data[2];
     this.accesstoken = this.user_data[1];
     console.log(this.usermail)

     this.get_prev_info();
     this.get_prev_info_search();
     this.load_spinner.show();


     
  
  }

  get_prev_info_search()
  {
    this.HTTP.get("https://sleepy-savannah-56074.herokuapp.com/api/comp_infos?filter[where][comp_email]="+this.usermail,
    {
        
      
    })
    .subscribe(
      data => {

        this.info_id = data[0]["id"]
    },
    error => {
      console.log("Error", error);
    }); 
  }

  get_prev_info()
  {
    var post_url  = "https://sleepy-savannah-56074.herokuapp.com/api/companies?filter[where][comp_email]="+this.usermail;

    this.HTTP.get(post_url) .subscribe(
      data => {

        this.load_spinner.hide();
        console.log(data)
        
        console.log("sucribed successflly")
        // this.spinner.hide();
        // this.userdata = data;
        // ------------------ img id 

        this.mongo_user_id = data[0]['id'];

        console.log("mongo id ",this.mongo_user_id)

        // ------------------ img id 

       // this.profile_img_url = data[0]['can_profile_pic'];
        
        this.userid =data[0]['userid']
        this.usermail =data[0]['comp_email']
        this.companyname = data[0]['comp_name']

        this.logo_urli  =  data[0]['comp_logo']
        this.logo_url  =  data[0]['comp_logo']

        this.cover_url = data[0]['comp_coverpic']
        this.cover_urli = data[0]['comp_coverpic']

        this.Company_url = data[0]['comp_url']
        this.hq_location = data[0]['comp_hqloc']
        this.market = data[0]['comp_market']
        this.year = data[0]['comp_year']
        this.location = data[0]['comp_loc']
        this.no_emp = data[0]['comp_no_emp']
        this.no_engg = data[0]['comp_no_engg']
        this.company_des = data[0]['comp_des']
        this.company_mission = data[0]['comp_mission']
        this.company_value = data[0]['comp_values']
        this.company_culture = data[0]['comp_culture']
        this.Advantage = data[0]['comp_mk_ad']
        this.youtube = data[0]['comp_video']

        // issue zone 
        // this.founders_count = data[0]['comp_founders_count']
        //                   this.count = this.founders_count; 
        // if(this.founders_count >0 )
        // {

        
        // this.founder_name = data[0]['comp_founders_names']
        // this.founder_title = data[0]['comp_founders_titles']
        // this.founder_memb_url = data[0]['comp_founders_urls']
        // this.founder_des = data[0]['comp_founders_des']
        // }

        
        //  this.board_membest_count = data[0]['comp_board_members_count']
        //                   this.count1 = this.board_membest_count;
        //  if(this.board_membest_count >= 1)
        //  {

         
        //  this.Board_member = data[0]['comp_board_names']
        //  this.Board_member_title = data[0]['comp_board_members_titles']
        //  this.Board_member_url = data[0]['comp_board_urls']
        //  }

        //  this.employees_count = data[0]['notable_emp_count']
        //  if(this.employees_count >=1)
        //  {

         
        //  this.emp_name  = data[0]['comp_notable_names']
        //  this.emp_title = data[0]['comp_notable_titles']
        //  this.emp_url = data[0]['comp_notable_urls']
        //  this.emp_des = data[0]['comp_notable_des']
        //  }

        //  this.testimonials_count = data[0]['comp_testimonials_count']
        //  if(this.testimonials_count)
        //  {

         
        //  this.t_name = data[0]['comp_test_names']
        //  this.t_title = data[0]['comp_test_titles']
        //  this.t_url = data[0]['comp_test_urls']
        //  this.t_Testimony = data[0]['comp_test_testimonies']
        //  }

        //  issue zone 
         this.interview_count = data[0]['comp_interview_duration']
         if(this.interview_count>0)
         {

         
         this.interview_count = data[0]['comp_interview_count']
         this.round_type = data[0]['comp_interview_round_type']
         this.round_type_des = data[0]['comp_interview_des']
         }

        this.Funding_Status = data[0]['comp_funding_status']
        this.Benefits =  data[0]['comp_benefits']
        this.perks =  data[0]['comp_perks']


        // ---------------------------------------------------


        
   
    

    this.Seed = this.Funding_Status[0];
    this.Series_A = this.Funding_Status[1];
    this.Series_B = this.Funding_Status[2];
    this.Series_C = this.Funding_Status[3];
    this.Series_D = this.Funding_Status[4];
    this.Publicly_Traded = this.Funding_Status[5];
    this.Other= this.Funding_Status[6];
    this.ICO = this.Funding_Status[7];
    
    this.Flexible_Spending_Account = this.Benefits[0];
    this.HealthSavingsAccount = this.Benefits[1];
    this.MentalHealthCare = this.Benefits[2];
    this.RetireeHealthMedical = this.Benefits[3];
    this.HealthCareOnSite = this.Benefits[4];
    this.PensionPlan = this.Benefits[5];
    this.RetirementPlan = this.Benefits[6];
    this.Plan = this.Benefits[7];
    this.EquityIncentivePlan = this.Benefits[8];
    this.EmployeeStockPurchasePlan = this.Benefits[9];
    this.StockOptions = this.Benefits[10];
    this.PerformanceBonus = this.Benefits[11];
    this.PaidSickLeave = this.Benefits[12];
    this.PaidVacationTime = this.Benefits[13];
    this.CompetitiveSalaries = this.Benefits[14];
    this.HealthInsurance = this.Benefits[15];
    this.LifeInsurance  = this.Benefits[16];
    this.DentalInsurance = this.Benefits[17];
    this.VisionInsurance = this.Benefits[18];
    this.DisabilityInsurance = this.Benefits[19];


    this.PingPong  = this.perks[0];
    this.BeerOnTap = this.perks[1];
    this.Arcade = this.perks[2];
    this.Yoga = this.perks[3];
    this.CityViews = this.perks[4];
    this.FreeParking = this.perks[5];
    this.SpaPasses = this.perks[6];
    this.Childcare = this.perks[7];
    this.AutoCare = this.perks[8];
    this.CasualDress = this.perks[9];
    this.RemoteWorkDays = this.perks[10];
    this.CompanySwag = this.perks[11];
    this.CompanyPhone = this.perks[12];
    this.CompanyCar = this.perks[13];
    this.CompanyLaptop = this.perks[14];
    this.AppleEquipment = this.perks[15]; 
    this.GymMembership = this.perks[16];
    this.FitnessCenterOnSite = this.perks[17];
    this.CateredFood = this.perks[18];
    this.CompanyEvents  = this.perks[19];





        // -----------------------------------------------------

         this.check_cover_url = this.cover_url;
         this.check_logo_url = this.logo_url;

      },
      error => {
          console.log("Error", error);
          this.load_spinner.hide();

         
          
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

  
// the code to preview the logo in html
  onSelectFile_logo(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.selectedfile_logo = <File> event.target.files[0];

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.logo_url = event.target['result'];
      }
    }
  }
//  the code to preview the cover image in html
  onSelectFile_cover(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.selectedfile_cover = <File> event.target.files[0];

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.cover_url = event.target['result'];
      }
    }
  }

  onSelectFile_founder(event,i) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.selected_founder_img_url[i] = <File> event.target.files[0];

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.founder_img_url[i] = event.target['result'];
      }
    }
  }

  onSelectFile_board_mem(event,i) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.selected_borad_member[i] = <File> event.target.files[0];

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.board_img_url[i] = event.target['result'];
      }
    }
  }

  onSelectFile_notable_emp(event,i) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.selected_notable_emp[i] = <File> event.target.files[0];

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.notable_emp_img_url[i] = event.target['result'];
      }
    }
  }
 
  onSelectFile_testimoniale(event,i) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.selected_testimoniale[i] = <File> event.target.files[0];

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.testimoniale_img_url[i] = event.target['result'];
      }
    }
  }







// **************************************************************************************************************************************


  //  function to upload the logo 

   uploadlogo(){

    const fd  = new FormData();
    fd.append('image',this.selectedfile_logo,this.selectedfile_logo.name);
    this.HTTP.post("https://sleepy-savannah-56074.herokuapp.com/api/containers/"+this.userid+"|logo" +"/upload",
    fd)
    .subscribe(
        data => {
          this.logo_status =" image uploaded successfully"

          this.result = data;
          console.log("logo upload success ", data)
          var loc = this.result.result[0].metadata.filename;
          this.logo_url = "https://sleepy-savannah-56074.herokuapp.com/api/containers/"+this.userid+"|logo"+"/download/"+loc;
          this.logo_urli = this.logo_url
          this.uploadlogo_state = true;
          return true;
         
        },
        error => {
            console.log("Error", error);
            this.logo_status =" error while uploading image"
            return false;
        });
        
      // var done = "ok";
      //   return of(`Complete: ${done}`)

  }

  //  function to upload the cover photo
  uploadcover(){

    console.log("uploaing cover..... ")
    const fd1  = new FormData();
    fd1.append('image',this.selectedfile_cover,this.selectedfile_cover.name);
    this.HTTP.post("https://sleepy-savannah-56074.herokuapp.com/api/containers/"+this.userid +"|cover"+"/upload",
    fd1)
    .subscribe(
        data => {
          this.result = data;
          this.cover_status= "image uploded successfullu"
          console.log("cover upload success ", data)
          var loc = this.result.result[0].metadata.filename;
          this.cover_url = "https://sleepy-savannah-56074.herokuapp.com/api/containers/"+this.userid+"|cover"+"/download/"+loc;

          this.cover_urli = this.cover_url
          this.uploadcover_state = true;
          // return true;

          if(this.uploadcover_state == true && this.uploadlogo_state == true ) {

            console.log("images uploaded successfull")
    
            // this.post_data();
          }

         
        },
        error => {
            console.log("Error", error);
            this.cover_status= "error while  uplodeding image"

        });
        // var done = "ok";
        // return of(`Complete: ${done}`)

  }

// upload founer i

uploadfounder(i){

  const fd  = new FormData();
  fd.append('image',this.selected_founder_img_url[i],this.selected_founder_img_url[i].name);
  this.HTTP.post("https://sleepy-savannah-56074.herokuapp.com/api/containers/"+this.userid+"|founder" +"/upload",
  fd)
  .subscribe(
      data => {
        this.founder_status[i] =" image uploaded successfully"

        this.result = data;
        console.log("logo upload success ", data)
        var loc = this.result.result[0].metadata.filename;
        this.founder_img_url[i] = "https://sleepy-savannah-56074.herokuapp.com/api/containers/"+this.userid+"|founder"+"/download/"+loc;
        // this.logo_urli = this.logo_url
        this.uploadlogo_state = true;
        return true;
       
      },
      error => {
          console.log("Error", error);
          this.founder_status[i] =" error while uploading image"
          return false;
      });
      
    // var done = "ok";
    //   return of(`Complete: ${done}`)

}

// upload upload boardmember

uploadboardmem(x)
{
  const fd  = new FormData();
  fd.append('image',this.selected_borad_member[x],this.selected_borad_member[x].name);
  this.HTTP.post("https://sleepy-savannah-56074.herokuapp.com/api/containers/"+this.userid+"|board" +"/upload",
  fd)
  .subscribe(
      data => {
        this.board_status[x] =" image uploaded successfully"

        this.result = data;
        console.log("logo upload success ", data)
        var loc = this.result.result[0].metadata.filename;
        this.board_img_url[x] = "https://sleepy-savannah-56074.herokuapp.com/api/containers/"+this.userid+"|board"+"/download/"+loc;
        // this.logo_urli = this.logo_url
        this.uploadlogo_state = true;
        return true;
       
      },
      error => {
          console.log("Error", error);
          this.founder_status[x] =" error while uploading image"
          return false;
      });
}

// upload upload boardmember

uploadnotable(y)
{
  const fd  = new FormData();
  fd.append('image',this.selected_notable_emp[y],this.selected_notable_emp[y].name);
  this.HTTP.post("https://sleepy-savannah-56074.herokuapp.com/api/containers/"+this.userid+"|notable" +"/upload",
  fd)
  .subscribe(
      data => {
        this.notable_status[y] =" image uploaded successfully"

        this.result = data;
        console.log("logo upload success ", data)
        var loc = this.result.result[0].metadata.filename;
        this.notable_emp_img_url[y] = "https://sleepy-savannah-56074.herokuapp.com/api/containers/"+this.userid+"|notable"+"/download/"+loc;
        // this.logo_urli = this.logo_url
        this.uploadlogo_state = true;
        return true;
       
      },
      error => {
          console.log("Error", error);
          this.founder_status[y] =" error while uploading image"
          return false;
      });
}

uploadtest(z)
{
  const fd  = new FormData();
  fd.append('image',this.selected_testimoniale[z],this.selected_testimoniale[z].name);
  this.HTTP.post("https://sleepy-savannah-56074.herokuapp.com/api/containers/"+this.userid+"|test" +"/upload",
  fd)
  .subscribe(
      data => {
        this.test_staus[z] =" image uploaded successfully"

        this.result = data;
        console.log("logo upload success ", data)
        var loc = this.result.result[0].metadata.filename;
        this.testimoniale_img_url[z] = "https://sleepy-savannah-56074.herokuapp.com/api/containers/"+this.userid+"|test"+"/download/"+loc;
        // this.logo_urli = this.logo_url
        this.uploadlogo_state = true;
        return true;
       
      },
      error => {
          console.log("Error", error);
          this.test_staus[z] =" error while uploading image"
          return false;
      });
}
  
  submit()
  {



    this.load_spinner.show();
    this.success = "";
    console.log(this.market)

    console.log("submitt button clicked ")
    // console.log("data:",this.companyname,this.logo_url,this.cover_url,this.Company_url,this.hq_location,this.market,this.year,this.location,this.no_emp,this.no_engg,this.company_des,this.company_mission,this.company_value,this.company_culture,this.Advantage,this.youtube)
        // // ---------------------------- + button values
    this.founders_count = this.count;
    this.board_membest_count = this.count1;
    this.employees_count = this.count2;
    this.testimonials_count = this.count3;
    this.interview_count = this.count4;
    // //
    // console.log(this.founders_count,this.board_membest_count,this.employees_count,this.testimonials_count)
    // console.log(this.founder,this.founder_title,this.founder_memb_url,this.founder_des)
    // console.log(this.Board_member,this.Board_member_title,this.Board_member_url)
    // console.log(this.emp_name,this.emp_title,this.emp_url,this.emp_des)
    // console.log(this.t_name,this.t_position,this.t_url)

    // this.uploadcover_state = this.uploadlogo();
    // this.uploadlogo_state =  this.uploadcover();
    

    // console.log("check url",this.check_cover_url," and ",this.cover_url)

    // if(this.check_cover_url === this.cover_url)
    // {
    // }
    // else{
    //   this.uploadlogo();
    // }

    // if(this.check_logo_url === this.logo_url)
    // {  
    // }
    // else
    // {
    //   this.uploadcover();
    // }


    // forkJoin(

    //   this.uploadlogo(),
    //   this.uploadcover(),
    // ).subscribe(([res1, res2]) => {
    //   // this.spinner.hide();
    //   console.log("images done ")
       this.post_data();

    // });

   
 
      
  
  }
  post_data()
  {

    // console.log("444444444444444 post data lo unnam ra and len of id is == ")

    this.Funding_Status = [this.Seed,this.Series_A,this.Series_B,this.Series_C,this.Series_D,this.Publicly_Traded,this.Other,this.ICO]
    this.Benefits = [this.Flexible_Spending_Account,this.HealthSavingsAccount,this.MentalHealthCare,this.RetireeHealthMedical,this.HealthCareOnSite,this.PensionPlan,this.RetirementPlan,this.Plan,this.EquityIncentivePlan,this.EmployeeStockPurchasePlan,this.StockOptions,this.PerformanceBonus,this.PaidSickLeave,this.PaidVacationTime,this.CompetitiveSalaries,this.HealthInsurance,this.LifeInsurance,this.DentalInsurance,this.VisionInsurance,this.DisabilityInsurance    ] 
    this.perks = [ this.PingPong,this.BeerOnTap,this.Arcade,this.Yoga,this.CityViews,this.FreeParking,this.SpaPasses,this.Childcare,this.AutoCare,this.CasualDress,this.RemoteWorkDays,this.CompanySwag,this.CompanyPhone,this.CompanyCar,this.CompanyLaptop,this.AppleEquipment,this.GymMembership,this.FitnessCenterOnSite,this.CateredFood,this.CompanyEvents    ]

    this.errormsg = ""
    this.success = ""

    console.log("funding status : ")
    console.log(this.Funding_Status)

    console.log(this.mongo_user_id.length)

    

    if(this.mongo_user_id.length != 0)
    {
      this.comp_full_data();
      console.log("!!!!!!!!!!!!!!!!!!")
    }
    else
    {
    forkJoin(
      // this._myService.makeRequest('Request One', 2000),
      // this._myService.makeRequest('Request Two', 1000),
      // this._myService.makeRequest('Request Three', 3000)
    
      this.comp_info(),
      this.comp_full_data(),
    )
    .subscribe(([res1, res2]) => {
      this.load_spinner.hide();
      console.log("all right .... :)")
      // this.propOne = res1;
      // this.propTwo = res2;
      // this.propThree = res3;
    });
  }
  }
  comp_full_data()
  {
    var done="ok";
    if(this.mongo_user_id.length == 0)
    {
      this.HTTP.post("https://sleepy-savannah-56074.herokuapp.com/api/companies?access_token="+this.accesstoken,
      {
  
      
        "userid": this.userid,
        "comp_email": this.usermail,
        "comp_name": this.companyname,
        "comp_logo": this.logo_urli,
        "comp_coverpic": this.cover_urli,
        "comp_url": this.Company_url,
        "comp_hqloc": this.hq_location,
        "comp_market": this.market,
        "comp_year": this.year,
        "comp_loc": this.location,
        "comp_no_emp": this.no_emp,
        "comp_no_engg": this.no_engg,
        "comp_des": this.company_des,
        "comp_mission": this.company_mission,
        "comp_values":this.company_value,
        "comp_culture": this.company_culture,
        "comp_mk_ad": this.Advantage,
        "comp_video": this.youtube,
  
        "comp_founders_count": this.founders_count ,
        "comp_founder_names": this.founder_name,
        "comp_founder_titles": this.founder_title,
        "comp_founder_urls": this.founder_memb_url,
        "comp_founder_des": this.founder_des,
  
        "comp_board_members_count": this.board_membest_count,
        "comp_board_names": this.Board_member,
        "comp_board_titles": this.Board_member_title,
        "comp_board_urls": this.Board_member_url,
  
        "notable_emp_count": this.employees_count,
        "comp_notable_names":this.emp_name,
        "comp_notable_titles": this.emp_title,
        "comp_notable_urls": this.emp_url,
        "comp_notable_des": this.emp_des,
  
        "comp_testimonials_count": this.testimonials_count,
        "comp_test_names": this.t_name,
        "comp_test_titles": this.t_title,
        "comp_test_urls": this.t_url,
        "comp_test_testimonies": this.t_Testimony,
  
        "comp_interview_duration": this.interview_count ,
        "comp_interview_count": this.interview_count,
        "comp_interview_round_type": this.round_type,
        "comp_interview_des": this.round_type_des,
  
        "comp_funding_status" : this.Funding_Status ,
        "comp_benefits": this.Benefits,
        "comp_perks" : this.perks,


        "comp_founder_image_list" : this.founder_img_url,
        "comp_board_image_list": this.board_img_url,

        "comp_notable_image_list": this.notable_emp_img_url,

        "comp_test_image_list": this.testimoniale_img_url

  
  
  
        
      })
      .subscribe(
          data => {
  
            this.load_spinner.hide();
            this.form = false;
            this.success = "Your company information is updated successfully"
          
        },
        error => {
          console.log("Error", error);
  
          this.error = error
          this.load_spinner.hide();
          this.form = false;
          this.errormsg = "error  occured  try again later ... :( "
        }
        );
    }
    
    else{
    this.HTTP.put("https://sleepy-savannah-56074.herokuapp.com/api/companies?access_token="+this.accesstoken,
    {

      "id": this.mongo_user_id,
      "userid": this.userid,
      "comp_email": this.usermail,
      "comp_name": this.companyname,
      "comp_logo": this.logo_urli,
      "comp_coverpic": this.cover_urli,
      "comp_url": this.Company_url,
      "comp_hqloc": this.hq_location,
      "comp_market": this.market,
      "comp_year": this.year,
      "comp_loc": this.location,
      "comp_no_emp": this.no_emp,
      "comp_no_engg": this.no_engg,
      "comp_des": this.company_des,
      "comp_mission": this.company_mission,
      "comp_values":this.company_value,
      "comp_culture": this.company_culture,
      "comp_mk_ad": this.Advantage,
      "comp_video": this.youtube,

      "comp_founders_count": this.founders_count ,
      "comp_founder_names": this.founder_name,
      "comp_founder_titles": this.founder_title,
      "comp_founder_urls": this.founder_memb_url,
      "comp_founder_des": this.founder_des,

      

      "comp_board_members_count": this.board_membest_count,
      "comp_board_names": this.Board_member,
      "comp_board_titles": this.Board_member_title,
      "comp_board_urls": this.Board_member_url,

      "notable_emp_count": this.employees_count,
      "comp_notable_names":this.emp_name,
      "comp_notable_titles": this.emp_title,
      "comp_notable_urls": this.emp_url,
      "comp_notable_des": this.emp_des,

      "comp_testimonials_count": this.testimonials_count,
      "comp_test_names": this.t_name,
      "comp_test_titles": this.t_title,
      "comp_test_urls": this.t_url,
      "comp_test_testimonies": this.t_Testimony,

      "comp_interview_duration": this.interview_count ,
      "comp_interview_count": this.interview_count,
      "comp_interview_round_type": this.round_type,
      "comp_interview_des": this.round_type_des,

      "comp_funding_status" : this.Funding_Status ,
      "comp_benefits": this.Benefits,
      "comp_perks" : this.perks,



      
      "comp_founder_image_list" : this.founder_img_url,
      "comp_board_image_list": this.board_img_url,

      "comp_notable_image_list": this.notable_emp_img_url,

      "comp_test_image_list": this.testimoniale_img_url


      
    })
    .subscribe(
        data => {

          this.load_spinner.hide();
          this.form = false;
          this.success = "Your full  data is update successfully"
        
      },
      error => {
        console.log("Error", error);

        this.error = error
        this.load_spinner.hide();
        this.form = false;
        this.errormsg = "error  occured on main post.."
      }
      ); 

    }

    return of(`Complete: ${done}`)
  }
  comp_info()
  {
    var done="ok";

    this.HTTP.put("https://sleepy-savannah-56074.herokuapp.com/api/comp_infos?access_token="+this.accesstoken,
    {
        "id" : this.info_id,
        "comp_name": this.companyname,
        "comp_email": this.usermail,
      
    })
    .subscribe(
      data => {

        // this.spinner.hide();
        this.form = false;
        // this.success = "Your comp info  data is update successfully"
      
    },
    error => {
      console.log("Error", error);

      this.error = error
      this.load_spinner.hide();
      this.form = false;
      this.errormsg = "error info post  occured.."
    }
    ); 
    return of(`Complete: ${done}`)
  }
  
  
}
