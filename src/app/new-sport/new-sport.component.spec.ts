import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSportComponent } from './new-sport.component';

describe('NewSportComponent', () => {
  let component: NewSportComponent;
  let fixture: ComponentFixture<NewSportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
