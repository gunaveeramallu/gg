import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule, MatNativeDateModule, MatMenuModule} from '@angular/material'
import {MatInputModule} from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import {MatRadioModule} from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTableModule} from '@angular/material/table';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';







import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';

import { CookieService } from 'ngx-cookie-service';
// ----------------- ngx spinner 
import { NgxSpinnerModule } from 'ngx-spinner';


// ---------------------- image slider 
import 'hammerjs';
import { NgxHmCarouselModule } from 'ngx-hm-carousel';
import { FooterComponent } from './footer/footer.component';
import { NewdriveComponent } from './newdrive/newdrive.component';
import { ApplyForJobComponent } from './apply-for-job/apply-for-job.component';
import { HomeComponent } from './home/home.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { EditCompanyProfileComponent } from './edit-company-profile/edit-company-profile.component';
import { TechnologyStackComponent } from './technology-stack/technology-stack.component';
import { TrailComponent } from './trail/trail.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { SignupComponent } from './signup/signup.component';
import { DialogDetaisComponent } from './dialog-detais/dialog-detais.component';
import { ShortlistComponent } from './shortlist/shortlist.component';
import { ShortlistCompanyComponent } from './shortlist-company/shortlist-company.component';
import { ApplyJobWindowComponent } from './apply-job-window/apply-job-window.component';
import { ShortlistDialogComponent } from './shortlist-dialog/shortlist-dialog.component';





@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    LoginDialogComponent,
    DialogDetaisComponent,
    FooterComponent,
    NewdriveComponent,
    ApplyForJobComponent,
    HomeComponent,
    MyprofileComponent,
    EditProfileComponent,
    CompanyProfileComponent,
    EditCompanyProfileComponent,
    TechnologyStackComponent,
    TrailComponent,
    ViewProfileComponent,
    SignupComponent,
    ShortlistComponent,
    ShortlistCompanyComponent,
    ApplyJobWindowComponent,
    ShortlistDialogComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatExpansionModule,
    MatIconModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatCardModule,
    MatAutocompleteModule,
    MatTableModule,
    MatGridListModule,
    MatCheckboxModule,
    MatChipsModule,
    // ------------http
    HttpClientModule,
    PasswordStrengthMeterModule,

    //  ---------- image slider
    NgxHmCarouselModule,
    NgxSpinnerModule,
    

  ],
  entryComponents: [
    DialogComponent,
    LoginDialogComponent,
    SignupComponent,
    DialogDetaisComponent,
    ShortlistDialogComponent
],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
