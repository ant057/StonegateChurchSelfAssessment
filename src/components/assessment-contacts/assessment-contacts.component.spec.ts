import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentContactsComponent } from './assessment-contacts.component';

describe('AssessmentContactsComponent', () => {
  let component: AssessmentContactsComponent;
  let fixture: ComponentFixture<AssessmentContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentContactsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
