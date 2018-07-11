import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { chartVariables } from "../Stations/chartVariables.component";
import { RegisteredStationsService } from "../RegisteredStations/registeredstations.service";
import { HistorialService } from "./historial.service";

@Component({
  selector: 'app-stations',
  templateUrl: './historial.component.html',
})

export class HistorialComponent implements OnInit {

  @ViewChildren(BaseChartDirective) charts: QueryList<BaseChartDirective>;

  allStations: any[] = [];
  allDataStations: any[] = [];
  allData:any[] = [];
  arrayCharts:any[]=[];
  tituloPagina:String="Últimos datos recogidos";

  constructor(
    public chartVar:chartVariables,
    private route:ActivatedRoute,
    private location:Location,
    private regStationsService: RegisteredStationsService,
    private historialService: HistorialService
  ){ }

  ngOnInit(): void {
    this.regStationsService.getRegStations()
      .then(st =>{
        this.allStations = st;
        this.getDataStations();
      });
  }

  public getDataStations(): void {
    for(let st of this.allStations){
      this.historialService.getHistoricoStation(st.id)
        .then(hst => {
          this.allDataStations.push(hst);
          this.allData = this.allDataStations;
          this.setData(this.allData);
        });
    }
  }

  public setData(allHist:any[]): void {
    console.log(allHist);
    for(let historial of allHist) {
      var stationCharts: any = {
        nameSensor: "",
        charts: ""
      };
      var stChart = new chartVariables();
      var fecha: any[] = [];
      var humedad: any[] = [];
      var temperatura: any[] = [];
      var tamanyo = historial.length - 1;
      var tamGrafica = 24;

      for (let i = tamanyo, count = 0; i > 0 && count <= tamGrafica; i--, count++) {
        temperatura.push(historial[i].temperatura);
        humedad.push(historial[i].humedad);
        fecha.push(historial[i].hora);
      }

      stChart.lineChartLabels = fecha;
      stChart.lineChartDataTemperature = [
        {data: temperatura, label: 'Temperatura ºC'}
      ];
      stChart.lineChartDataHumidity = [
        {data: humedad, label: 'Humedad %'}
      ];
      stationCharts.nameSensor = historial[0].nombre;
      stationCharts.charts = stChart;
      if(!this.containsChart(this.arrayCharts, stationCharts.nameSensor))
        this.arrayCharts.push(stationCharts);
    }
  }

  public setDataChart(dateSearch: any){
    this.allData = [];
    this.allDataStations = [];
    this.arrayCharts = [];

    if(dateSearch == ""){
      this.tituloPagina = "Últimos datos recogidos";
      for(let st of this.allStations) {
        this.historialService.getHistoricoStation(st.id)
          .then(hst => {
            this.allDataStations.push(hst);
            this.allData = this.allDataStations;
            this.setData(this.allData);
          })
      }
      this.charts.forEach((child) => {
        //child.chart.chart.config.data.labels = this.arrayCharts.charts.lineChartLabels;
      });
    } else {
      this.tituloPagina = "Datos día: " + dateSearch;
      for(let st of this.allStations) {
        this.historialService.getHistoricoByDay(dateSearch,st.id)
          .then(hst =>{
            this.allDataStations.push(hst);
            this.allData = this.allDataStations;
            this.setData(this.allData);
          })
      }
      this.charts.forEach((child) => {
        //child.chart.chart.config.data.labels = this.arrayCharts.charts.lineChartLabels;
      });
    }
  }

  private containsChart(charts:any, name:String):boolean {
    for(let ch of charts){
      if(ch.nameSensor === name)
        return true;
    }
    return false;
  }

}
