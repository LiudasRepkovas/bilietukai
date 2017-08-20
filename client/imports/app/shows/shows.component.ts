import { UserService } from '../services/user.service';
import { Shows } from '../../../../both/collections/shows.collection';
import { MeteorObservable } from 'meteor-rxjs';
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { SubsService } from "../services/subscriptions.service";
import { Show } from "../../../../both/models/show.model";
import template from "./shows.component.html";
import style from "./shows.component.scss";

@Component({
  selector: "shows",
  template,
  styles: [ style ]
})
export class ShowsListComponent implements OnInit {

  shows: Observable<Show[]>;

  constructor(private subs: SubsService, private user: UserService) {
  }

  ngOnInit() {
    MeteorObservable.subscribe('shows').subscribe((value)=>{
      this.shows = Shows.find();
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
}
