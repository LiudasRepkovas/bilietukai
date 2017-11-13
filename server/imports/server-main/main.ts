import { _do } from 'rxjs/operator/do';
import { Show } from '../../../both/models/show.model';
import { ShowsMongo } from "../../../both/collections/shows.collection";
import { Tickets } from "../../../both/collections/ticket.collection";
import { Shows } from "../../../both/collections/shows.collection";
import * as _ from 'lodash';
import * as PapaParse from 'papaparse';


import '../publications/users';
import '../publications/shows';

declare var Picker;


export class Main {
  start(): void {
  }
  
}


Accounts.config({
  forbidClientAccountCreation : true
});

Picker.route('/scan/:event/:code', function(params, req, res, next) {
  let show = Shows.findOne({id:params.event});
  let ticket = Tickets.findOne({code:params.code, show_id: show._id});

  let response_text;
  if(!ticket || ticket.used_at){
    response_text = "USED"
  } else {

    response_text = "OK";
    Tickets.update({code: params.code, show_id: show._id}, {$set:{used_at: _.now()}});
  }
  res.end(response_text);
});


Meteor.methods({
  uploadTickets(show_id: string, csv : string){
    if(this.userId && ShowsMongo.findOne(show_id).owner == this.userId){

      let parsed = PapaParse.parse(csv);
      console.log(parsed.data);
      _.each(parsed.data, (item: any)=>{
        console.log('item =>', item);

        Tickets.insert({
          show_id,
          code: item[0],
          created_at: _.now(),
          used_at: null
        })

    })
    }
    return 'done';
  },
  createEvent(event){
    if(this.userId){
      //todo: validation
      event['created_at'] = _.now();
      event['owner'] = this.userId;

      let id = ShowsMongo.insert(event);
      return id;
    }
  },

  totalTicketCount(show_id){
    return Tickets.collection.find({show_id}).count();
  },
  
  usedTicketCount(show_id){
    return Tickets.collection.find({show_id, used_at: {$ne:null}}).count();
  },

  resetAllTickets(show_id){
    if(this.userId){
      let show = ShowsMongo.findOne({_id:show_id});
      if(show.owner == this.userId){
        Tickets.update({show_id}, {$set:{used_at: null}}, {multi: true});
      }
    }
  },

  removeAllTickets(show_id){
    if(this.userId){
      let show = ShowsMongo.findOne({_id:show_id});
      if(show.owner == this.userId){
        Tickets.remove({show_id});
      }
    }
  },

  toggleTicket(show_id, code){
    if(this.userId){
      let show = ShowsMongo.findOne({_id:show_id});
      if(show.owner == this.userId){
        let ticket = Tickets.findOne({show_id, code});
        let used_at = ticket.used_at ? null : _.now();        
        Tickets.update({show_id, code}, {$set: {used_at}});
      }
    }
  }
});