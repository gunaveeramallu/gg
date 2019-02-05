import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  role:string= "company"

  show:Boolean;
  
  image:string;
  name:string;
  location:string;

  constructor() { }

  ngOnInit() {
    if(this.role == "company"){
      this.show = true;
    }
    this.image = "https://angular.io/assets/images/logos/angular/logo-nav@2x.png"
    this.name = "jaswanth"
    this.location = "gudivada"
  }



}
