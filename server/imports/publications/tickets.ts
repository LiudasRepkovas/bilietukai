import { Meteor } from 'meteor/meteor';
import { Tickets } from '../../../both/collections/ticket.collection';
import { Shows } from '../../../both/collections/shows.collection';

Meteor.publish('showTickets', function(show_id, page, perpage){
    if(this.userId){
        return Tickets.find({
            show_id: show_id
        });
    } 
});

// Meteor.publish('showTicketCount', function() {

// });


// Meteor.publish('showUsedTicketCount', function(show_id) {
//     return new Counter('showUsedTicketsCount', Tickets.find({show_id, used_at:{$ne: null}}), 1000);
// });


