import {Inject, Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {DOCUMENT} from "@angular/platform-browser";

@Injectable()
export class StationsService {

  private apiUrl = 'http://'+ this.document.location.hostname +':5000/api/data/';
  private apiWeather = 'http://'+ this.document.location.hostname +':5000/api/weather/';
  private apiNotes = 'http://'+ this.document.location.hostname +':5000/api/notes/';

  constructor(private http: Http, @Inject(DOCUMENT) private document: any){ }

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

  getNotesStation(id: string): Promise<any>{
    return this.http.get(this.apiNotes + id)
      .toPromise()
      .then(this.handleData)
      .catch(this.handleError)
  }

  getNotesByDate(id: string, date: string): Promise<any> {
    return this.http.get(this.apiNotes + date + '/' + id)
      .toPromise()
      .then(this.handleData)
      .catch(this.handleError)
  }

  deleteNotes(idNote: string): Promise<any> {
    return this.http.delete(this.apiNotes + idNote)
      .toPromise()
      .then(this.handleData)
      .catch(this.handleError)
  }

  updateNotes(idNote: string, note: any): Promise<any> {
    return this.http.put(this.apiNotes + idNote, note)
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

  getHistoricoByDay(date: string, id: string):Promise<any>{
    return this.http.get(this.apiUrl + id + '/' + date)
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
