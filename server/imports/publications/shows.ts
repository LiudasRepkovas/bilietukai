import { Meteor } from 'meteor/meteor';
import { Shows } from '../../../both/collections/shows.collection';

Meteor.publish('shows', function(){
    if(this.userId){
        console.log(Shows.find({}).fetch());
        return Shows.find({
            owner: this.userId
        });
    }
    
});


Meteor.publish('show', function(id){
    if(this.userId){
        console.log(Shows.find({_id:id}).fetch());
        return Shows.find({
            owner: this.userId
        });
    }
    
});