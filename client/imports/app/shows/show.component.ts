import { MongoCursorObserver } from 'angular2-meteor/dist/main';
import { Shows } from '../../../../both/collections/shows.collection';
import { ActivatedRoute } from '@angular/router'
import { MeteorObservable } from 'meteor-rxjs';
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { SubsService } from "../services/subscriptions.service";
import { Show } from "../../../../both/models/show.model";
import template from "./show.component.html";
import style from "./show.component.scss";

@Component({
  selector: "show",
  template,
  styles: [ style ]
})
export class ShowComponent implements OnInit {

  show: Show;
  status: String = 'idle';

  constructor(private subs: SubsService, public route: ActivatedRoute) {
  }

  ngOnInit() {


    MeteorObservable.subscribe('show', this.route.params['id']).subscribe((value)=>{
      console.log('value', value);
      this.show = Shows.findOne({});
    })
    // this.shows = this.subs.subs['shows'].subscribe(()=>{
    //   this.shows = Shows.find({});
    // });
    
    // MeteorObservable.subscribe('shows').subscribe(()=>{
    //   this.shows = Shows.find({});
    //   console.log("this.shows", this.shows);
    // })
    // this.shows = this.showsService.getAllShows().zone();
    // console.log(this.showsService.getAllShows().fetch());
  }


  changeListener($event) : void {
    this.readThis($event.target);
  }

  readThis(inputValue: any) : void {
    this.status = 'reading';
    let file:File = inputValue.files[0]; 
    let myReader:FileReader = new FileReader();

    myReader.onloadend = (e)=>{
      this.status = "uploading"
      // you can perform an action with readed data here
      Meteor.call('uploadTickets', this.show._id, myReader.result);
      this.status = "idle";
    }

    myReader.readAsText(file);
  }
}
