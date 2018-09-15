import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from "./app.service";
import { RegisteredStationsService } from "../RegisteredStations/registeredstations.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'app';
  newNote: any = {};
  allStations: any = [];
  apiMessage: string = "";
  apiError: string = "";

  constructor(private appService:AppService, private regStations:RegisteredStationsService) {}

  ngOnInit(): void{
    this.regStations.getRegStations()
      .then(st => this.allStations = st)
  }

  addNewNote(note: any): void {
    if(!note) {return;}
    this.appService.addNote(note)
      .then(nt => {
        this.apiMessage = "Añadida la nota correctamente";
      })
    .catch(nt => {
      this.apiError = nt._body;
    })
  }

  cleanApiMessage(): void{
    this.apiError = "";
    this.apiMessage = "";
  }
}
