import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegStationComponent } from '../RegisteredStations/regStations.component';

const regStationsRoutes: Routes = [
  { path:'register', component:RegStationComponent }
]

@NgModule({
  imports: [
    RouterModule.forChild(regStationsRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})

export class regStationsRoutingModule { }
