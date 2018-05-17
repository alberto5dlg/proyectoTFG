import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'admin-house',
  templateUrl: './adminHouse.component.html',
  //styleUrls:[ './adminHouse.component.css' ]
})

export class AdminHouseComponent implements OnInit {

  existePlanos:boolean = false;
  totalPlantas:any;

  ngOnInit(): void {

  }

  public setPlantas(nPlantas: String){
    this.totalPlantas = Array(Number(nPlantas));
  }
}
