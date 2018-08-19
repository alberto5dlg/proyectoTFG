import {Component, Inject, OnInit} from '@angular/core';
import { AdminHomeService } from "./adminHouse.service";
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import {DOCUMENT} from "@angular/platform-browser";
import { RegisteredStationsService } from "../RegisteredStations/registeredstations.service";

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'admin-house',
  templateUrl: './adminHouse.component.html',
  styleUrls:[ './adminHouse.component.css' ]
})

export class AdminHouseComponent implements OnInit {

  existePlanos:any;
  nameHome:String;
  home:any = {
    id:'',
    nPlantas:'',
    plantas:[]
  };
  allStations:any[] = [];
  split1:any[] = [];
  split2:any[] = [];

  public uploader:FileUploader = new FileUploader({url:'http://'+ this.document.location.hostname +':5000/api/home/images'});

  constructor(private adminHomeService:AdminHomeService, @Inject(DOCUMENT) private document: any, private registerStations:RegisteredStationsService){}

  ngOnInit(): void {
    this.adminHomeService.getHome()
      .then(home => {
        this.existePlanos = home[0];
      });

    this.registerStations.getRegStations()
      .then(st => {
        this.allStations = st;
        this.splitStations();
      });

    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);

    this.uploader.onCompleteAll = () => {
      console.log('complete');
      console.log(this.home);
      this.saveDataHome2();
    };
  }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    let data = JSON.parse(response); //success server response
    this.home.plantas.push('assets/'+data.name);
  }

  ngAfterViewInit() {
    this.uploader.onAfterAddingFile = (item => {
      item.withCredentials = false;
    });
  }

  public setNameHome(name: String) {
    this.nameHome = name;
  }

  public saveDataHome(){
    this.uploader.uploadAll();
  }

  public saveDataHome2(){
    this.home.id = this.nameHome;
    this.home.nPlantas = this.uploader.queue.length;
    this.adminHomeService.saveData(this.home);
    console.log(this.home);
    window.location.reload();
  }

  public deleteHome() {
    this.adminHomeService.delete();
    window.location.reload();
  }

  private splitStations():void{
    if(this.allStations.length <=1)
      this.split1 = this.allStations;
    else{
      var tam = this.allStations.length;

      for(var i = 0; i < tam/2; i++)
        this.split1.push(this.allStations[i]);

      for(var i = tam-1; i >= tam/2; i--)
        this.split2.push(this.allStations[i]);
    }
  }

}
