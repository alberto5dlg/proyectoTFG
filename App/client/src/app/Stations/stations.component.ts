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
  dataStation:any;
  historialStation:any[];
  historial:any[];
  localWheather:any[];
  fecha:string = new Date().toLocaleString();



  //Variables Grafico
  public lineChartLabels: Array<any>;
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartOptions: any = {
    responsive: true,
    title: {
      display:true,
      text: 'Últimos datos'
    }
  };

  public lineChartDataHumidity: Array<any>;
  public lineChartOptionsHumidity: any = {
    responsive: true,
    title: {
      display:true,
      text: 'Últimos datos'
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 100
        }
      }]
    }
  };
  public lineChartColorsHumidity:Array<any> = [
    { // grey
      backgroundColor: 'rgba(255, 51, 0,0.2)',
      borderColor: 'rgba(255, 51, 0,1)',
      pointBackgroundColor: 'rgba(255, 51, 0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255, 51, 0,0.8)'
    }];


  public lineChartDataTemperature: Array<any>;
  public lineChartOptionsTemperature: any = {
    responsive: true,
    title: {
      display:true,
      text: 'Últimos datos'
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 50
        }
      }]
    }
  };
  public lineChartColorsTemperature:Array<any> = [
    { // grey
      backgroundColor: 'rgba(0, 153, 255,0.2)',
      borderColor: 'rgba(0, 153, 255,1)',
      pointBackgroundColor: 'rgba(0, 153, 255,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0, 153, 255,0.8)'
    }];

  //tabla oculta
  public ocultar:boolean = true;

  constructor(
    private stationServ:StationsService,
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
    this.lineChartLabels = fecha;
    this.lineChartDataTemperature= [
      {data: temperatura, label: 'Temperatura ºC'}
    ];
    this.lineChartDataHumidity= [
      {data: humedad, label: 'Humedad %'}
    ];
  }

  public changeVisibility():void {
    this.ocultar = this.ocultar === true ? false : true;
  }
}
