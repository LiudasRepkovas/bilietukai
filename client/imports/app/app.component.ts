import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {UserService} from './services/user.service'
import {Subscription} from 'rxjs'

@Component({
  selector: "app",
  template: 'app.component.html',
  styles: ['app.component.scss']
})
export class AppComponent implements OnInit {

  loggedInSubscription:Subscription;

  constructor(public userService:UserService, public router:Router) {
  }

  ngOnInit(){
    this.loggedInSubscription = this.userService.loggedIn.subscribe((value)=>{
      this.router.navigate(['/login']);
    })
  }

}
