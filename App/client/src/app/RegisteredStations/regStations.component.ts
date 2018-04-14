import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { RegisteredStationsService} from "./registeredstations.service";

@Component({
  selector: 'app-registered-stations',
  templateUrl: './regStations.component.html',
  styleUrls: ['./regStations.component.css']
})

export class RegStationComponent implements OnInit {

  allStations:any[] = [];
  station:any = {};
  stationToAdd: any = {};
  apiMessage:string;

  constructor(private registerStations:RegisteredStationsService) { }

  ngOnInit(): void {
    this.registerStations.getRegStations()
      .then(st => this.allStations = st )
  }

  viewStation(p_station:any): void{
    this.station = p_station;
  }

  addNewStation(station: any): void {
    if(!station) {return; }
    this.registerStations.addStation(station)
      .then(st => {
        console.log(st);
        this.allStations.push(st);
        this.apiMessage = "Añadido Correctamente";
      })
  }

}
