import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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

  tituloGrafica = 'Últimos datos recogidos';
  idStation: string;
  dataStation:any;
  historialStation:any[];
  historial:any[];
  localWheather:any[];
  notesStation:any[] = [];
  currentNote: any;
  editNote:any = {};
  apiMessage:string;
  apiError: string;

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

    this.stationServ.getNotesStation(this.idStation)
      .then(nt => {
        this.notesStation = nt;
        this.notesStation.reverse();
        this.notesStation = this.notesStation.slice(0,3);
      });

    this.stationServ.getLocalWeather('Benidorm')
      .then(wt => { this.localWheather = wt});

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
  }

  public changeVisibility():void {
    this.ocultar = this.ocultar === true ? false : true;
  }

  public setDataChart(dateSearch: any){
    this.chartVariables = new chartVariables();
    this.setNotes(dateSearch);
    if(dateSearch == ""){
      this.tituloGrafica = 'Últimos datos recogidos';
      this.stationServ.getHistoricoStation(this.idStation)
        .then(hst =>{
          this.setData(hst, false);
          this.charts.forEach((child) => {
            child.chart.chart.config.data.labels = this.chartVariables.lineChartLabels;
          });
        });
    } else {
      this.tituloGrafica = 'Datos día: ' + dateSearch;
      this.stationServ.getHistoricoByDay(dateSearch, this.idStation)
        .then(hst => {
          this.setData(hst, true);
          this.charts.forEach((child) => {
            child.chart.chart.config.data.labels = this.chartVariables.lineChartLabels;
          });
        })
    }
  }

  public setNotes(dateSearch: any): void {
    this.notesStation = [];
    if(dateSearch == "") {
      this.stationServ.getNotesStation(this.idStation)
        .then(nt => this.notesStation = nt);
    } else {
      this.stationServ.getNotesByDate(this.idStation, dateSearch)
        .then(nt => this.notesStation = nt);

    }
  }

  public getNote(p_note: any): void {
    this.currentNote = p_note;
    this.editNote = p_note;
  }

  public deleteNote(note: any): void {
    if(!note) { return; }
    this.stationServ.deleteNotes(note._id)
      .then(nt => {
        var index = this.notesStation.indexOf(note);
        this.notesStation.splice(index,1);
        this.apiMessage = "Borrado correctamente";

      })
      .catch( nt => this.apiMessage = nt._body);
  }

  public updateNote(p_note: any): void {
    if(!p_note) {return;}
    console.log(p_note);
    this.stationServ.updateNotes(this.currentNote._id, p_note)
      .then(nt => {
        var index = this.notesStation.indexOf(p_note);
        this.notesStation[index] = nt;
        this.apiMessage = "Nota editada correctamente";
      })
      .catch(nt => this.apiError = nt._body)
  }

  private cleanApiMessage(): void {
    this.apiMessage = null;
  }
}
