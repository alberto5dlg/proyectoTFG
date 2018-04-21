import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { StationsService } from "./stations.service";

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  //styleUrls: ['./regStations.component.css']
})

export class StationsComponent implements OnInit {

  idStation: string;
  dataStation:any = {
    id: 'sensor_cocina',
    nombre:'Cocina',
    temperatura: 23.0,
    humedad: 66.0,
    fecha: Date.now()
  };
  historialStation:any[];
  historial:any[];
  localWheather:any[];


  //Variables Grafico
  public lineChartLabels: Array<any>;
  public lineChartData: Array<any>;
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartOptions: any = {
    responsive: true,
    title: {
      display:true,
      text: 'Últimas 24H'
    }
  };

  //tabla oculta
  public ocultar:boolean = true;

  constructor(
    private stationServ:StationsService,
    private route:ActivatedRoute,
    private location:Location
  ){ }

  ngOnInit(): void {
    this.stationServ.getHistoricoStation('sensor_cocina')
      .then(st => {
        this.historialStation = st;
        this.historial = this.historialStation;
        this.setData(this.historial);
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
      fecha.push(date.toLocaleTimeString());
    }
    this.lineChartLabels = fecha;
    this.lineChartData= [
      {data: temperatura, label: 'Temperatura'},
      {data: humedad, label: 'Humedad'}
    ];
  }

  public randomizeType():void {
    this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
  }

  public changeVisibility():void {
    this.ocultar = this.ocultar === true ? false : true;
  }
}
