import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {

  id : string;
  name:string;
  // para: import("e:/sp team prj files/Gitty/Gitty-UI/node_modules/@angular/router/src/shared").Params;

  company_name:string;
  company_coverpic:string;
  company_image:string;

  location:string;
  
  employes:string;
  engineers:string;
  market:string;
  homeUrl:string;
  company_year:string;
  compDes:string;
  compMission:string;
  compValues:string;
  compCulture:string;
  compMkAd:string;
  compfounderscount:number;
  compFounderNames:string[];
  compFounderTitles:string[];
  compFounderUrls:string[];
  compFounderDes:string[];
  compFounderImg:string[]
  BoradNumber;
  compBoardNames:string[];
  compBoardTitles:string[];
  compBoardUrls:string[];
  compBoardImg:string[];
  notableNumber;
  compNotableTitles:string[];
  compNotableUrls:string;
  compNotableDes:string[];
  comp_notable_image_list:string[];


  testimonies;
  compTestNames:string[];
  compTestTitles:string[];
  compTestUrls:string[];
  compTestTestimonies:string[];
  comp_test_image_list:string[]

  data;
  numbers;
  FundingStatus= ['Seed','Series A','Series B','Series C','Series D+','Publicly Traded','Other','ICO']
  Benefits2 = ['Flexible Spending Account (FSA)','Health Savings Account (HSA)','Mental Health Care','Retiree Health & Medical','Health Care On-Site','Pension Plan','Retirement Plan','401(K) Plan','Equity Incentive Plan','Employee Stock Purchase Plan','Stock Options','Performance Bonus','Paid Sick Leave','Paid Vacation Time','Competitive Salaries','Health Insurance','Life Insurance','Dental Insurance','Vision Insurance','Disability Insurance']  
  Perks2 = ['Ping-Pong','Beer On Tap','Arcade','Yoga','City Views','Free Parking','Spa Passes','Childcare','Auto Care','Casual Dress','Remote Work Days','Company Swag','Company Phone','Company Car','Company Laptop','Apple Equipment','Gym Membership','Fitness Center On-Site','Catered Food','Company Events']
  Benefits:boolean[]

  Funding_Status:Boolean[];

  perks:boolean[];

  color:string
  posturl:string;
  userdata: any;

  profile_exist:boolean;
  // profile_not_exist : boolean = false;
  error: boolean;
  changeGrid: string = "Funding_Status";
  not_loggedin: boolean;
  profile_not_exist: boolean;

  constructor(private router: Router, private cookieService: CookieService,private spinner: NgxSpinnerService,private route: ActivatedRoute, private http:HttpClient) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      console.log(params);
      // this.para = params
      this.id = params['id'];   // emal of company stored in id variable
      // this.name = params['name']






      this.spinner.show();
   this.homeUrl= "https://pandorabots.com/botmaster/en/mostactive"
   this.posturl = "https://sleepy-savannah-56074.herokuapp.com/api/companies?filter[where][comp_email]="+this.id;

   console.log(this.posturl)
   this.http.get(this.posturl) .subscribe(
   data => {

    


     this.spinner.hide();
     this.userdata  =data ;

     
     const cookieExists: boolean = this.cookieService.check('email');

     console.log("cookes exist",cookieExists)

     if(cookieExists == false)
     {

      console.log("use not logged in 99999999999999")

       this.not_loggedin = true;

     }
     else{

     
       
     if(this.id == data[0]['comp_email'])
     {
       this.profile_exist = true;
       console.log("data found ")
      
     }else
     {
       this.profile_not_exist = false;
       console.log("data not found ")
       

     }
    }

       console.log("User details ", data[0]);
       this.company_name = data[0]['comp_name'].toUpperCase( );
       this.company_coverpic = data[0]['comp_coverpic']
       this.company_image = data[0]['comp_logo']
       this.company_year = data[0]['comp_year']
       this.employes = data[0]["comp_no_emp"]
       this.engineers = data[0]['comp_no_engg']
       this.market = data[0]['comp_market']
       this.homeUrl = data[0]['comp_url']
       this.compDes = data[0]['comp_des']
       this.compMission = data[0]['comp_mission']
       this.compValues = data[0]['comp_values']
       this.compCulture = data[0]['comp_culture']
       this.compMkAd = data[0]['comp_mk_ad']
       this.location = data[0]['comp_loc'].toUpperCase();
       //  this.compfounderscount= data[0]['comp-founders-count'].number()
       this.compFounderNames = data[0]['comp_founder_names']
       if(this.compFounderNames.length>0){
        this.numbers = Array(this.compFounderNames.length).fill(4);
       }
       
       this.compFounderTitles = data[0]['comp_founder_titles']
       this.compFounderUrls = data[0]['comp_founder_urls']
       this.compFounderDes = data[0]['comp_founder_des']
       this.compFounderImg = data[0]['comp_founder_image_list']

       this.Funding_Status  = data[0]['comp_funding_status']
       this.Benefits  = data[0]['comp_benefits']
       this.perks = data[0]['comp_perks']
       console.log("this  is the funding status",this.Funding_Status )
      
       this.compBoardNames = data[0]['comp_board_names']

       if((this.compBoardNames.length)>0){
        this.BoradNumber =  Array(this.compBoardNames.length).fill(4);
       }
       this.compBoardTitles = data[0]['comp_board_titles']
       this.compBoardUrls = data[0]['comp_board_urls']
       this.compBoardImg = data[0]['comp_board_image_list']


       
 
       this.compNotableTitles = data[0]['comp_notable_titles']
       if((this.compNotableTitles.length)>0){
        this.notableNumber = Array(this.compNotableTitles.length).fill(4);

       }
       this.compNotableUrls =  data[0]['comp_notable_urls']
       this.compNotableDes = data[0]['comp_notable_des']
       this.comp_notable_image_list = data[0]['comp_notable_image_list']
       
 
       
       this.compTestNames = data[0]['comp_test_names']
       if(this.compTestNames.length>0){
        this.testimonies =  Array(this.compTestNames.length).fill(4);

       }
       
       this.compTestTitles = data[0]["comp_test_titles"]
       this.compTestTestimonies = data[0]['comp_test_testimonies']
       this.comp_test_image_list = data[0]['comp_test_image_list'];
       
   

        
       
        
 
       
 
                          
   },
   error => {
       console.log("Error", error);
       this.error= true;
       this.spinner.hide();
      
       
    }
 );  
 
 
 // this.http.get("https://sleepy-savannah-56074.herokuapp.com/api/Users")
 //             .subscribe(
 //                 data => {
 //                     console.log("User created ", data);
                    
 
                                        
 //                 },
 //                 error => {
 //                     console.log("Error", error);
                    
                     
 //                  }
 //             );  
 //             }
 
 

  })
}





Funding_Status1(){
  this.changeGrid = "Funding_Status";
  
  // this.Funding_Status = [this.Seed,this.Series_A,this.Series_B,this.Series_C,this.Series_D,this.Publicly_Traded,this.Other,this.ICO]

  
  }

  Benefits1(){
    this.changeGrid = "Benefits";
    // this.Benefits = [
    //   this.Flexible_Spending_Account,
    //   this.HealthSavingsAccount,
    //   this.MentalHealthCare,
    //   this.RetireeHealthMedical,
    //   this.HealthCareOnSite,
    //   this.PensionPlan,
    //   this.RetirementPlan,
    //   this.Plan,
    //   this.EquityIncentivePlan,
    //   this.EmployeeStockPurchasePlan,
    //   this.StockOptions,
    //   this.PerformanceBonus,
    //   this.PaidSickLeave,
    //   this.PaidVacationTime,
    //   this.CompetitiveSalaries,
    //   this.HealthInsurance,
    //   this.LifeInsurance,
    //   this.DentalInsurance,
    //   this.VisionInsurance,
    //   this.DisabilityInsurance
    // ]
  

  }
  Perks1(){
    this.changeGrid = "Perks";
//     this.perks = [
//       this.PingPong,
// this.BeerOnTap,
// this.Arcade,
// this.Yoga,
// this.CityViews,
// this.FreeParking,
// this.SpaPasses,
// this.Childcare,
// this.AutoCare,
// this.CasualDress,
// this.RemoteWorkDays,
// this.CompanySwag,
// this.CompanyPhone,
// this.CompanyCar,
// this.CompanyLaptop,
// this.AppleEquipment,
// this.GymMembership,
// this.FitnessCenterOnSite,
// this.CateredFood,
// this.CompanyEvents
//     ]
  


  }
  login()
  {
    this.router.navigate(['/'] );

  }


}
