import { _do } from 'rxjs/operator/do';
import { Show } from '../../../both/models/show.model';
import { Shows } from "../../../both/collections/shows.collection";
import { Tickets } from "../../../both/collections/ticket.collection";
import * as _ from 'lodash';
import * as PapaParse from 'papaparse';


import '../publications/users';
import '../publications/shows';

declare var Picker;


export class Main {
  start(): void {
  }
}


Picker.route('/scan/:code', function(params, req, res, next) {
  let ticket = Tickets.findOne({code:params.code});

  let response_text;
  if(ticket.used_at){
    response_text = "USED"
  } else {
    response_text = "OK";
    Tickets.update({code: params.code}, {$set:{used_at: _.now()}});
  }
  res.end(response_text);
});


Meteor.methods({
  uploadTickets(show_id: string, csv : string){
    if(this.userId && Shows.findOne(show_id).owner == this.userId){

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
  }
})