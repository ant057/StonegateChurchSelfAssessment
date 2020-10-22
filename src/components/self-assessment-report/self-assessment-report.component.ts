import { Component, OnInit } from '@angular/core';

// ngrx store
import { Store, select } from '@ngrx/store';
import * as fromApp from '../../state/app.reducer';
import * as appActions from '../../state/app.actions';

// services
import { PDFService } from '../../services/pdf.service';


@Component({
  selector: 'assessment-self-assessment-report',
  templateUrl: './self-assessment-report.component.html',
  styleUrls: ['./self-assessment-report.component.scss']
})
export class SelfAssessmentReportComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>,
              private pdfService: PDFService) { }

  ngOnInit(): void {
  }

  generatePdf(): void{
    // this.pdfService.generatePdf('test');
  }

}
