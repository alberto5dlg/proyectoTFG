// ./angular-client/src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { AppComponent } from './app.component';
import { HomePageComponent } from '../Home/home.component';

import { AppRoutingModule } from '../Routing/app-routing.module';
import { regStationsRoutingModule} from '../Routing/regStations-routing.module';

import { AppService } from './app.service';
import { RegisteredStationsService } from '../RegisteredStations/registeredstations.service';
import { StationsService } from "../Stations/stations.service";
import { chartVariables } from "../Stations/chartVariables.component";
import { RegStationComponent } from '../RegisteredStations/regStations.component';
import { StationsComponent } from "../Stations/stations.component";
import { AdminHouseComponent } from "../AdminHouse/adminHouse.component";
import { AdminHomeService } from "../AdminHouse/adminHouse.service";
import { HistorialComponent } from "../Historial/historial.component";
import { HistorialService } from "../Historial/historial.service";
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    RegStationComponent,
    StationsComponent,
    chartVariables,
    AdminHouseComponent,
    FileSelectDirective,
    FileDropDirective,
    HistorialComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    regStationsRoutingModule,
    HttpModule,
    FormsModule,
    ChartsModule
  ],

  providers: [
    AppService,
    RegisteredStationsService,
    StationsService,
    chartVariables,
    AdminHomeService,
    HistorialService
  ],

  bootstrap: [AppComponent]
})

export class AppModule { }
