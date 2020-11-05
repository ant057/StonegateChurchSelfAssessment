// angular
import { Injectable } from '@angular/core';

// models
import { SelfAssessment } from '../models/selfassessment';
import { PeerAssessment } from '../models/peerassessment';

@Injectable({
  providedIn: 'root'
})
export class PDFService {
  pdfMake: any;

  constructor() { }

  async loadPdfMaker(): Promise<void> {
    if (!this.pdfMake) {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
      this.pdfMake = pdfMakeModule.default;
      this.pdfMake.vfs = pdfFontsModule.default.pdfMake.vfs;
    }
  }

  async generatePdf(selfAssessment: SelfAssessment, peerAssessments: PeerAssessment[]): Promise<void> {
    await this.loadPdfMaker();
    const def = { content: 'A sample PDF document generated using Angular and PDFMake' };
    this.pdfMake.createPdf(this.getDocumentDefinition(selfAssessment, peerAssessments)).open();
  }

  getDocumentDefinition(selfAssessment: SelfAssessment, peerAssessments: PeerAssessment[]): object {
    console.warn(peerAssessments);
    const strengthsSelf = selfAssessment.questionAnswers.filter(
      q => q.section === 'Short Answers' && q.questionOrder < 4);
    const hindrancesSelf = selfAssessment.questionAnswers.filter(
      q => q.section === 'Short Answers' && (q.questionOrder > 3 && q.questionOrder < 7 ));

    let strengthsPeer = [];
    peerAssessments.forEach(p => {
      strengthsPeer = p.questionAnswers.filter(
        q => q.section === 'Short Answers' && q.questionOrder < 4);
    });
    let hindrancesPeer = [];
    peerAssessments.forEach(p => {
      hindrancesPeer = p.questionAnswers.filter(
        q => q.section === 'Short Answers' && (q.questionOrder > 3 && q.questionOrder < 7));
    });

    const strengths = strengthsSelf.concat(strengthsPeer);
    const hindrances = hindrancesSelf.concat(hindrancesPeer);

    return {
      content: [
        {
          text: selfAssessment.selfUserFullName,
          style: 'title',
          bold: true,
          fontSize: 20
        },

        {
          text: 'SELF-AWARENESS ASSESSMENT',
          style: 'headerone',
          bold: false,
        },

        {
          text: 'Alright! Here are your results. Enjoy!'
        },

        {
          text: `Quick note: With misread + and -, those are areas where you either rated yourself lower
          than your peers (too low view of self) or higher than your peers (too high view of self).`
        },

        {
          text: 'Gifts',
          style: 'headerone'
        },

        {
          columns: [
            {
              ul: strengths.filter((value, index) => index % 3 === 0).map(s => s.answerValue)
            },
            {
              ul: strengths.filter((value, index) => index % 3 === 1).map(s => s.answerValue)
            },
            {
              ul: strengths.filter((value, index) => index % 3 === 2).map(s => s.answerValue)
            }
          ]
        },

        {
          text: 'Hindrances',
          style: 'headerone'
        },

        {
          columns: [
            // get the Hindrances array
            {
              ul: hindrances.filter((value, index) => index % 3 === 0).map(s => s.answerValue)
            },
            {
              ul: hindrances.filter((value, index) => index % 3 === 1).map(s => s.answerValue)
            },
            {
              ul: hindrances.filter((value, index) => index % 3 === 2).map(s => s.answerValue)
            }
          ]
        },

        // {
        //   text: 'Education',
        //   style: 'header'
        // },

        // this.getEducationObject(this.resume.educations),
        // {
        //   text: 'Other Details',
        //   style: 'header'
        // },
        // {
        //   text: this.resume.otherDetails
        // },
        // {
        //   text: 'Signature',
        //   style: 'sign'
        // },
        // {
        //   columns: [
        //     { qr: this.resume.name + ', Contact No : ' + this.resume.contactNo, fit: 100 },
        //     {
        //       text: `(${this.resume.name})`,
        //       alignment: 'right',
        //     }
        //   ]
        // }
      ],
      info: {
        title: selfAssessment.selfUserFullName + '_SELF-AWAREENESS ASSESSMENT',
        author: 'Tony Robinson',
        subject: 'SELF-AWARENESS ASSESSMENT',
        keywords: 'SELF-AWARENESS ASSESSMENT',
      },
      styles: {
        title: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10]
        },
        headerone: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 10]
        }
      }
    };
  }
}
