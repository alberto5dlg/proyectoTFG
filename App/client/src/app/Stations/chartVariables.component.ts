import { Component } from '@angular/core';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  //styleUrls: ['./regStations.component.css']
})
export class chartVariables {

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
}
