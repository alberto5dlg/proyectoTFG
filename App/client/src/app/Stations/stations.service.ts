import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class StationsService {

  private apiUrl = 'http://localhost:5000/api/data/';
  private apiWeather = 'http://localhost:5000/api/weather/';

  constructor(private http: Http) {}

  getDataStation(id: string): Promise<any> {
    return this.http.get(this.apiUrl + id)
      .toPromise()
      .then(this.handleData)
      .catch(this.handleError)
  }

  getHistoricoStation(id: string): Promise<any> {
    return this.http.get(this.apiUrl + 'historial/' + id)
      .toPromise()
      .then(this.handleData)
      .catch(this.handleError)
  }

  getLocalWeather(zone: string): Promise<any>{
    return this.http.get(this.apiWeather + zone)
      .toPromise()
      .then(this.handleData)
      .catch(this.handleError)
  }

  //trabajaremos con los datos obtenidos
  private handleData(res: any) {
    let body = res.json();
    console.log(body);
    return body || {};
  }

  //En caso de error en la peticion
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for development purposes only
    return Promise.reject(error.message || error);
  }
}
