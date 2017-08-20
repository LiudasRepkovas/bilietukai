import { MongoObservable } from "meteor-rxjs";
import { Ticket } from "../models/ticket.model";

export const Tickets = new MongoObservable.Collection<Ticket>("tickets");
