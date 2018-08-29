import { Injectable, Inject } from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import { DOCUMENT } from '@angular/platform-browser';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppService {

  constructor(private http: Http, @Inject(DOCUMENT) private document: any) {
  }

  private apiUrl = 'http://' + this.document.location.hostname + ':5000/api/notes/';

  addNote(note: any): Promise<any>{
    return this.http.post(this.apiUrl, note)
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
    //console.error('An error occurred', error); // for development purposes only
    return Promise.reject(error.message || error);
  }
}
