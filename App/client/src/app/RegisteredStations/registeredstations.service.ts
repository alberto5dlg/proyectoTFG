import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class RegisteredStationsService {

  private apiUrl = 'http://localhost:5000/api/register/';

  constructor(private http: Http){ }

  getRegStations(): Promise<any>{
    return this.http.get(this.apiUrl)
      .toPromise()
      .then(this.handleData)
      .catch(this.handleError)
  }

  getStation(id: string): Promise<any>{
    return this.http.get(this.apiUrl + id)
      .toPromise()
      .then(this.handleData)
      .catch(this.handleError)
  }

  addStation(station: any): Promise<any>{
    return this.http.post(this.apiUrl, station)
      .toPromise()
      .then(this.handleData)
      .catch(this.handleError)
  }

  //trabajaremos con los datos obtenidos
  private handleData(res: any) {
    let body = res.json();
    return body || {};
  }

  //En caso de error en la peticion
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for development purposes only
    return Promise.reject(error.message || error);
  }
}
