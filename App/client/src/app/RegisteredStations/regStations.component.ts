import { Component, OnInit } from '@angular/core';
import { RegisteredStationsService} from "./registeredstations.service";

@Component({
  selector: 'app-registered-stations',
  templateUrl: './regStations.component.html',
  styleUrls: ['./regStations.component.css']
})

export class RegStationComponent implements OnInit {

  stations:any[] = [];
  station:any = {};

  constructor(private registerStations:RegisteredStationsService) { }

  ngOnInit(): void {
    this.registerStations.getRegStations()
      .then(st => this.stations = st )
  }

  viewStation(p_station:any): void{
    this.station = p_station;
  }
}
