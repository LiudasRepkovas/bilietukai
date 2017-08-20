import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//modules
import { MaterialModule } from '@angular/material';

//components
import { AppComponent } from "./app.component";
import { DemoComponent } from "./demo/demo.component";
import { LoginComponent } from "./auth/login.component";
import { NotfoundComponent } from "./notfound/notfound.component";
import { ShowsListComponent } from './shows/shows.component';
import { ShowComponent } from './shows/show.component';


//services
import { DemoDataService } from "./demo/demo-data.service";
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
    ShowComponent
  ],
  // Entry Components
  entryComponents: [
    AppComponent
  ],
  // Providers
  providers: [
    DemoDataService,
    UserService,
    SubsService,
    AuthGuard
  ],
  // Modules
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    MaterialModule.forRoot()
  ],
  // Main Component
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor() {

  }
}
