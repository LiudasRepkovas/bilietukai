import { Main } from "./imports/server-main/main";
import './imports/publications/users';
import './imports/publications/shows';

const mainInstance = new Main();
mainInstance.start();
