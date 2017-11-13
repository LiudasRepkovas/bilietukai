import { Component, OnInit, ApplicationRef, NgZone } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar';

import template from "./showCreate.component.html";
import style from "./showCreate.component.scss";

@Component({
  selector: "showCreate",
  template,
  styles: [ style ]
})
export class ShowCreateComponent implements OnInit {

  newEventForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private snackBar:MatSnackBar, private router:Router, public zone:NgZone, public ref:ApplicationRef) {
    this.newEventForm = formBuilder.group({
      name:['', Validators.required],
      description:['', Validators.required],      
      password:[''],            
      id:['', Validators.required]
    })
  }

  ngOnInit() {

  }

  createEvent(){
    
      Meteor.call('createEvent', this.newEventForm.value, (error, response)=>{
        if(error){
          this.zone.run(()=>{
            this.snackBar.open(error.reason, null, {duration: 1500});
          });
        } else {
          this.zone.run(()=>{
            this.snackBar.open("Event created!");
          });
          console.log(response);
          this.router.navigate(['show/' + response]);
        }

    });
  }
}
