import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { StationsService } from "./stations.service";
import { chartVariables } from "./chartVariables.component";


@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  //styleUrls: ['./regStations.component.css']
})

export class StationsComponent implements OnInit {

  idStation: string;
  dataStation:any;
  historialStation:any[];
  historial:any[];
  localWheather:any[];
  fecha:string = new Date().toLocaleString();

  //tabla oculta
  public ocultar:boolean = true;

  constructor(
    private stationServ:StationsService,
    public chartVariables:chartVariables,
    private route:ActivatedRoute,
    private location:Location
  ){ }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idStation = params['id'];
    });

    this.stationServ.getHistoricoStation(this.idStation)
      .then(st => {
        this.historialStation = st;
        this.historial = this.historialStation;
        this.setData(this.historial);
      });

    this.stationServ.getDataStation(this.idStation)
      .then(st => {
        this.dataStation = st;
    });

    this.stationServ.getLocalWeather('Benidorm')
      .then(wt => { this.localWheather = wt})
  }

  goBack():void {
    this.location.back();
  }

  public setData(historial:any[]): void {
    var fecha:any[] = [];
    var humedad: any[] = [];
    var temperatura: any[]= [];
    var tamanyo = historial.length-1;

    for (let i = tamanyo, count = 0; i > 0 && count < 25; i--, count++) {
      temperatura.push(historial[i].temperatura);
      humedad.push(historial[i].humedad);
      var date = new Date(historial[i].fecha);
      date.setHours(date.getHours() - 2);
      fecha.push(date.toLocaleString());
    }

    this.chartVariables.lineChartLabels = fecha;
    this.chartVariables.lineChartDataTemperature= [
      {data: temperatura, label: 'Temperatura ºC'}
    ];
    this.chartVariables.lineChartDataHumidity= [
      {data: humedad, label: 'Humedad %'}
    ];
  }

  public changeVisibility():void {
    this.ocultar = this.ocultar === true ? false : true;
  }

}
