import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegStationComponent } from './regStations.component';

describe('RegStationComponent', () => {
  let component: RegStationComponent;
  let fixture: ComponentFixture<RegStationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegStationComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
