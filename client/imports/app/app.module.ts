import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule, MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';
import { MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import { MomentModule } from 'angular2-moment';







//components
import { AppComponent } from "./app.component";
import { DemoComponent } from "./demo/demo.component";
import { LoginComponent } from "./auth/login.component";
import { NotfoundComponent } from "./notfound/notfound.component";
import { ShowsListComponent } from './shows/shows.component';
import { ShowComponent } from './shows/show.component';
import { ShowCreateComponent } from './shows/showCreate.component';



//services
import { AuthGuard } from './services/guards/auth-guard.service';
import { UserService } from './services/user.service';
import { SubsService } from './services/subscriptions.service';

import { routes } from './app.routes';


@NgModule({
  // Components, Pipes, Directive
  declarations: [
    AppComponent,
    DemoComponent,
    LoginComponent,
    ShowsListComponent,
    NotfoundComponent,
    ShowComponent,
    ShowCreateComponent
  ],
  // Entry Components
  entryComponents: [
    AppComponent
  ],
  // Providers
  providers: [
    UserService,
    SubsService,
    AuthGuard
  ],
  // Modules
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatListModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MomentModule,
    RouterModule.forRoot(routes),
  ],
  // Main Component
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor() {

  }
}
