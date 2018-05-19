import {Inject, Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {DOCUMENT} from "@angular/platform-browser";

@Injectable()
export class AdminHomeService {

  public apiUrl = 'http://'+ this.document.location.hostname +':5000/api/home/';

  constructor(private http: Http, @Inject(DOCUMENT) private document: any){ }

  getHome(): Promise<any> {
    return this.http.get(this.apiUrl)
      .toPromise()
      .then(this.handleData)
      .catch(this.handleError)
  }

  saveData(home:any): Promise<any> {
    return this.http.post(this.apiUrl + 'register',home)
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
