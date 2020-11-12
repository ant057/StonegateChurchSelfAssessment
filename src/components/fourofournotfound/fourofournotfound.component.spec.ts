import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourofournotfoundComponent } from './fourofournotfound.component';

describe('FourofournotfoundComponent', () => {
  let component: FourofournotfoundComponent;
  let fixture: ComponentFixture<FourofournotfoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FourofournotfoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FourofournotfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
