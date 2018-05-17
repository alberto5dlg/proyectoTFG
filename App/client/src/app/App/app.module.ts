// ./angular-client/src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import {FormsModule} from "@angular/forms";
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { AppComponent } from './app.component';
import { HomePageComponent } from '../Home/home.component';

import { AppRoutingModule } from '../Routing/app-routing.module';
import { regStationsRoutingModule} from '../Routing/regStations-routing.module';

import { RegisteredStationsService } from '../RegisteredStations/registeredstations.service';
import { StationsService } from "../Stations/stations.service";
import { chartVariables } from "../Stations/chartVariables.component";
import { RegStationComponent } from '../RegisteredStations/regStations.component';
import { StationsComponent } from "../Stations/stations.component";
import { AdminHouseComponent } from "../AdminHouse/adminHouse.component";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    RegStationComponent,
    StationsComponent,
    chartVariables,
    AdminHouseComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    regStationsRoutingModule,
    HttpModule,
    FormsModule,
    ChartsModule,

  ],

  providers: [RegisteredStationsService, StationsService, chartVariables],

  bootstrap: [AppComponent]
})

export class AppModule { }
