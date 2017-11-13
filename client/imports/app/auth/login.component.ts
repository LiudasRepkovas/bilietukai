import { Component, OnInit, ApplicationRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';

import template from "./login.component.html";
import style from "./login.component.scss";

@Component({
  selector: "login",
  template,
  styles: [ style ]
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private snackBar:MatSnackBar, private router:Router, public userService:UserService, public ref:ApplicationRef) {
    this.loginForm = formBuilder.group({
      username:['', Validators.required],
      password:['', Validators.required]
    })
  }

  ngOnInit() {
    if(Meteor.userId()){
      this.router.navigate(['']);
    }
  }

  login(){
    this.userService.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value).then((result)=>{
      this.snackBar.open("Success!", null, {duration: 1500});
      this.router.navigate(['']);
      this.ref.tick();
      

    }).catch((error)=>{
      this.snackBar.open("Access denied!", null, {duration: 1500});
      this.ref.tick();
      
    })
  }
}
