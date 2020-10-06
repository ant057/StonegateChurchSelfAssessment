import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeerAssessmentComponent } from './peer-assessment.component';

describe('PeerAssessmentComponent', () => {
  let component: PeerAssessmentComponent;
  let fixture: ComponentFixture<PeerAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeerAssessmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeerAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
