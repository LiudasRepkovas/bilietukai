import { Injectable, OnDestroy } from '@angular/core';
import { MeteorObservable } from 'meteor-rxjs';
import { UserService } from './user.service';
import { Subscription, Observable } from 'rxjs';
import { Shows } from '../../../../both/collections/shows.collection';
import { Show } from '../../../../both/models/show.model';


@Injectable()

export class SubsService {

    subs: Observable<{}>[] = [];

    constructor() {
        this.subs['shows'] = MeteorObservable.subscribe("shows");
    }
}
