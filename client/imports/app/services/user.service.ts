import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MeteorObservable } from 'meteor-rxjs';
import { Subscription, Subject, BehaviorSubject } from 'rxjs';
import { Users } from '../../../../both/collections/users.collection';
import { User } from '../../../../both/models/user.model';


@Injectable()

export class UserService{

    userSubscription: MeteorObservable;
    user:User = null;
    loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(Meteor.userId() != undefined);

    constructor(private router:Router) {

        this.loggedIn.subscribe(()=>{
            this.userSubscription = MeteorObservable.autorun().subscribe(()=>{
                MeteorObservable.subscribe("currentUser").subscribe(()=>{
                    this.user = Users.findOne();
                })
            });
        })

        

        if(Meteor.userId()){
            this.loggedIn.next(true);
        }
    }


    logout(){
        Meteor.logout(()=>{
            this.loggedIn.next(false);            
        });
    }

    login(username:string, password:string){
        return new Promise((resolve, reject)=>{
            Meteor.loginWithPassword(username, password, (error)=>{
                if(!error){
                    this.loggedIn.next(true);
                    resolve(true);
                } else {
                    reject(error);
                }
            })
        })
    }
    
}
