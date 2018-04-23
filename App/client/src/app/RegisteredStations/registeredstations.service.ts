import { Injectable, Inject } from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import { DOCUMENT } from '@angular/platform-browser';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class RegisteredStationsService {

  constructor(private http: Http, @Inject(DOCUMENT) private document: any){ }

  private apiUrl = 'http://'+ this.document.location.hostname +':5000/api/register/';

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

  editStation(station: any, idToEdit: string): Promise<any>{
    return this.http.put(this.apiUrl+idToEdit, station)
      .toPromise()
      .then(this.handleData)
      .catch(this.handleError)
  }

  deleteStation(station: any): Promise<any> {
    return this.http.delete(this.apiUrl + station.id )
      .toPromise()
      .then(this.handleData)
      .catch(this.handleData)
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
