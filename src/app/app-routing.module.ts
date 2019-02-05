import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewdriveComponent } from './newdrive/newdrive.component';
import { AppComponent } from './app.component';
import { ApplyForJobComponent } from './apply-for-job/apply-for-job.component';
import { HomeComponent } from './home/home.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditCompanyProfileComponent } from './edit-company-profile/edit-company-profile.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { TechnologyStackComponent } from './technology-stack/technology-stack.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { ShortlistComponent } from './shortlist/shortlist.component';
import { ShortlistCompanyComponent } from './shortlist-company/shortlist-company.component';
import { ApplyJobWindowComponent } from './apply-job-window/apply-job-window.component';

const routes: Routes = [
 { path: '', component: HomeComponent},
 { path: 'newdrive', component: NewdriveComponent},
 {path: 'Apply-for-company',component: ApplyForJobComponent},
 {path: "myprofile", component: MyprofileComponent},
 {path:"edit-profile", component:EditProfileComponent},
 {path:"company-profile", component:CompanyProfileComponent},

 {path:"edit-company-profile", component:EditCompanyProfileComponent},
 {path:"techno", component:TechnologyStackComponent},
 {path:"view",component:ViewProfileComponent},
 {path: "shortlist",component:ShortlistComponent},
 {path:"Explore",component:TechnologyStackComponent},

 {path:"shortlist-company",component:ShortlistCompanyComponent},

 {path:"apply-job-window",component:ApplyJobWindowComponent }








];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
