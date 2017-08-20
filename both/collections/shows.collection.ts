import { MongoObservable } from "meteor-rxjs";
import { Show } from "../models/show.model";

export const Shows = new MongoObservable.Collection<Show>("shows");
