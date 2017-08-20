import { Meteor } from 'meteor/meteor';

Meteor.publish('currentUser', ()=>{
    if(this.userId){
        return Meteor.users.find({
            _id: this.userId
        });
    }
    
});