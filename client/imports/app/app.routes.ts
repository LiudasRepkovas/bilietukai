import { Route } from '@angular/router';
 
import { LoginComponent } from './auth/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { DemoComponent } from './demo/demo.component';
import { AuthGuard } from './services/guards/auth-guard.service';
import { ShowsListComponent } from './shows/shows.component';
import { ShowComponent } from './shows/show.component';
import { ShowCreateComponent } from './shows/showCreate.component';

 
export const routes: Route[] = [
  { 
    path: 'login', 
    component: LoginComponent
  },

  { 
    path: '', 
    redirectTo: 'shows', 
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },

  {
    path: 'shows', 
    component: ShowsListComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'show/:id', 
    component: ShowComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-show', 
    component: ShowCreateComponent,
    canActivate: [AuthGuard]
  },

  {
    path: '**', 
    component: NotfoundComponent,
    canActivate: [AuthGuard]
  },

];