import { Meteor } from 'meteor/meteor';

export interface Show {
    _id?: string;
    owner: string;
    created_at: string;
    name: string;
    description: string;
}