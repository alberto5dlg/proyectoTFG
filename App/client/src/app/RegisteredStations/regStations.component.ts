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
  stationToEdit: any = {};
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
        this.allStations.push(st);
        this.apiMessage = "Añadido Correctamente";
      })
  }

  editStation(pstation: any): void {
    if(!pstation) {return; }

    this.registerStations.editStation(pstation, this.station.id)
      .then(st => {
        var index = this.allStations.indexOf(this.station);
        this.allStations[index] = st;
        this.apiMessage = "Modificado correctamente";
      })
      .catch(st => {
        this.apiMessage = st;
      })
  }
}
