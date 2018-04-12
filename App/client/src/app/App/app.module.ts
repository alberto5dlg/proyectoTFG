// ./angular-client/src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";

import { AppComponent } from './app.component';
import { HomePageComponent } from '../Home/home.component';

import { AppRoutingModule } from '../Routing/app-routing.module';
import { regStationsRoutingModule} from '../Routing/regStations-routing.module';

import { RegisteredStationsService } from '../RegisteredStations/registeredstations.service';
import { RegStationComponent } from '../RegisteredStations/regStations.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    RegStationComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    regStationsRoutingModule,
    HttpModule
  ],

  providers: [RegisteredStationsService],

  bootstrap: [AppComponent]
})

export class AppModule { }
