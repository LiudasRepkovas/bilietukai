import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {UserService} from './services/user.service'
import {Subscription} from 'rxjs'
import template from './app.component.html';
import style from './app.component.scss';

@Component({
  selector: "app",
  template: template,
  styles: [style]
})
export class AppComponent implements OnInit {

  loggedInSubscription:Subscription;

  constructor(public userService:UserService, public router:Router) {
  }

  ngOnInit(){
    this.loggedInSubscription = this.userService.loggedIn.subscribe((value)=>{
      console.log('logged in  = ', value);
      this.router.navigate(['/login']);
    })
  }

}
