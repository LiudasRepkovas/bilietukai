import { MongoObservable } from "meteor-rxjs";
import { Show } from "../models/show.model";

export const ShowsMongo = new Mongo.Collection<Show>('shows');
export const Shows = new MongoObservable.Collection<Show>(ShowsMongo);
