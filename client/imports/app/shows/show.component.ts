import { MongoCursorObserver } from 'angular2-meteor/dist/main';
import { Shows } from '../../../../both/collections/shows.collection';
import { Tickets } from '../../../../both/collections/ticket.collection';
import { ActivatedRoute } from '@angular/router'
import { MeteorObservable } from 'meteor-rxjs';
import { Component, OnInit, ViewChild, ApplicationRef } from "@angular/core";
import { Observable } from "rxjs";
import { SubsService } from "../services/subscriptions.service";
import { Show } from "../../../../both/models/show.model";
import template from "./show.component.html";
import style from "./show.component.scss";
import { NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import {Ticket} from '../../../../both/models/ticket.model';

import * as _ from 'lodash'


@Component({
  selector: "show",
  template,
  styles: [ style ]
})
export class ShowComponent implements OnInit {

  show: Show;
  show_id: string;
  status: String = 'idle';

  fileLoaded: Boolean = false;
  fileData: any;
  
  totalTickets: number;
  usedTickets: number;
  tickets: any;

  dataSource: MatTableDataSource<Ticket>;
  displayedColumns = ['code', 'used_at', 'actions'];  
  @ViewChild(MatSort) sort: MatSort;

  constructor(private subs: SubsService, public route: ActivatedRoute, public zone: NgZone, public snack: MatSnackBar, public ref:ApplicationRef) {
    
  }

  ngOnInit() {
    this.dataSource =  new MatTableDataSource<Ticket>();
    this.route.params.subscribe((params: any)=>{
      this.show_id = params.id;
      MeteorObservable.subscribe('show', params.id).subscribe((value)=>{
        this.show = Shows.findOne({_id:params.id});
      });
      MeteorObservable.subscribe('showTickets', params.id).subscribe(()=>{
        Tickets.find({show_id: params.id})
        .debounce(() => Observable.interval(100))
        .subscribe((value)=>{
          console.log(value);
          this.dataSource.data = value;   
          this.ref.tick();       
        });
      });

    });
    Tracker.autorun(()=>{
      let tickets = Tickets.find({}).fetch();
      MeteorObservable.call('usedTicketCount', this.show_id).subscribe((response: any) => {
        this.usedTickets = response;
        this.ref.tick();
      });
      console.log('call');
      MeteorObservable.call('totalTicketCount', this.show_id).subscribe((response: any) => {
        console.log(response);
        this.totalTickets = response;
        this.ref.tick();        
      });
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
      this.status = 'idle';
      this.fileLoaded = true;
      this.fileData = myReader.result;
    }

    myReader.readAsText(file);
  }

  uploadFile(){
    this.status = "uploading"
    Meteor.call('uploadTickets', this.show._id, this.fileData, (error, response)=>{
    
      this.zone.run(()=>{
        this.status = "idle";              
        this.snack.open("Tickets uploaded!", null, {duration: 1500});
      })
    });
  }

  deleteAllTickets(){
    let response = confirm("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  THIS WILL DELETE ALL THE TICKETS OF THIS EVENT! DO YOU REALLY WANT THAT ???????????????????????????????????????????????");
    if(response){
      Meteor.call('removeAllTickets', this.show._id);
    }
  }
  
  makeAllTicketsNotUsed(){
    let response = confirm("This will reset all tickets by making them not used. Do you want to do that?");
    if(response){
      Meteor.call('resetAllTickets', this.show._id);
    }
  }

  toggleTicket(code){
    Meteor.call('toggleTicket', this.show._id, code);
  }
}
