import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLieuComponent } from './new-lieu.component';

describe('NewLieuComponent', () => {
  let component: NewLieuComponent;
  let fixture: ComponentFixture<NewLieuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewLieuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
