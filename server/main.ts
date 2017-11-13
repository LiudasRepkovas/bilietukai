import { Main } from "./imports/server-main/main";
import './imports/publications/users';
import './imports/publications/shows';
import './imports/publications/tickets';


const mainInstance = new Main();
mainInstance.start();
