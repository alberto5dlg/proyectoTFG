import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegStationComponent } from '../RegisteredStations/regStations.component';
import { StationsComponent } from '../Stations/stations.component';

const StationsRoutes: Routes = [
  { path:'register', component:RegStationComponent },
  { path:'station/:id', component:StationsComponent }
]

@NgModule({
  imports: [
    RouterModule.forChild(StationsRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})

export class regStationsRoutingModule { }
