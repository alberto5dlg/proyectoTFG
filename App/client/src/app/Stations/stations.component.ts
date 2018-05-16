import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { SimpleChanges } from "@angular/core";

import 'rxjs/add/operator/switchMap';

import { StationsService } from "./stations.service";
import { chartVariables } from "./chartVariables.component";
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  //styleUrls: ['./regStations.component.css']
})

export class StationsComponent implements OnInit {

  @ViewChildren(BaseChartDirective) charts: QueryList<BaseChartDirective>;

  tituloGrafica = 'Ultimas 24 Horas';
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
        this.setData(this.historial, false);
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

  public setData(historial:any[], tipo: boolean): void {
    var fecha:any[] = [];
    var humedad: any[] = [];
    var temperatura: any[]= [];
    var tamanyo = historial.length-1;
    var tamGrafica = 24;
    if(tipo == true)
      tamGrafica = historial.length;

    for (let i = tamanyo, count = 0; i > 0 && count <= tamGrafica; i--, count++) {
      temperatura.push(historial[i].temperatura);
      humedad.push(historial[i].humedad);
      fecha.push(historial[i].hora);
    }

    this.chartVariables.lineChartLabels = fecha;
    this.chartVariables.lineChartDataTemperature= [
      {data: temperatura, label: 'Temperatura ºC'}
    ];
    this.chartVariables.lineChartDataHumidity= [
      {data: humedad, label: 'Humedad %'}
    ];
    if(tipo == true)
      this.tituloGrafica = 'Datos día: ' + historial[0].dia;
    else
      this.tituloGrafica = 'Últimas 24 Horas';

  }

  public changeVisibility():void {
    this.ocultar = this.ocultar === true ? false : true;
  }

  public setDataChart(dateSearch: any){
    if(dateSearch == ""){
      this.stationServ.getHistoricoStation(this.idStation)
        .then(hst =>{
          this.setData(hst, false);
          this.charts.forEach((child) => {
            child.chart.chart.config.data.labels = this.chartVariables.lineChartLabels;
          });
        });
    }

    this.stationServ.getHistoricoByDay(dateSearch, this.idStation)
      .then(hst =>{
        this.setData(hst, true);
        this.charts.forEach((child) => {
            child.chart.chart.config.data.labels = this.chartVariables.lineChartLabels;
        });
      })
  }

}
