import { Component, OnInit } from '@angular/core';
import { RegisteredStationsService} from "../RegisteredStations/registeredstations.service";

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls:[ './home.component.css' ]
})

export class HomePageComponent implements OnInit {
  regStations:any[] = [];

  constructor(private regStationsService: RegisteredStationsService) { }

  ngOnInit(): void {
    this.regStationsService.getRegStations()
      .then(stations => this.regStations = stations)
  }
}
