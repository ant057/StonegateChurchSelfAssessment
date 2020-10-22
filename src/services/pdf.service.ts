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

  async loadPdfMaker() {
    if (!this.pdfMake) {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
      this.pdfMake = pdfMakeModule.default;
      this.pdfMake.vfs = pdfFontsModule.default.pdfMake.vfs;
    }
  }

  async generatePdf(selfAssessment: SelfAssessment, peerAssessments: PeerAssessment[]) {
    await this.loadPdfMaker();
    const def = { content: 'A sample PDF document generated using Angular and PDFMake' };
    this.pdfMake.createPdf(getDocumentDefinition(selfAssessment, peerAssessments)).open();
  }

  getDocumentDefinition(selfAssessment: SelfAssessment, peerAssessments: PeerAssessment[]) {

    return {
      content: [
        {
          text: selfAssessment.selfUserFullName,
          style: 'header',
          bold: true,
          fontSize: 20
        },

        {
          text: 'SELF-AWARENESS ASSESSMENT',
          style: 'name',
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
          style: 'name'
        },

        {
          columns: [
            // get the Gifts array
            {
              ul: [
                ...this.resume.skills.filter((value, index) => index % 3 === 0).map(s => s.value)
              ]
            },
            {
              ul: [
                ...this.resume.skills.filter((value, index) => index % 3 === 1).map(s => s.value)
              ]
            },
            {
              ul: [
                ...this.resume.skills.filter((value, index) => index % 3 === 2).map(s => s.value)
              ]
            }
          ]
        },

        {
          text: 'Hindrances',
          style: 'name'
        },

        // {
        //   columns: [
        //     // get the Hindrances array
        //     {
        //       ul: [
        //         ...this.resume.skills.filter((value, index) => index % 3 === 0).map(s => s.value)
        //       ]
        //     },
        //     {
        //       ul: [
        //         ...this.resume.skills.filter((value, index) => index % 3 === 1).map(s => s.value)
        //       ]
        //     },
        //     {
        //       ul: [
        //         ...this.resume.skills.filter((value, index) => index % 3 === 2).map(s => s.value)
        //       ]
        //     }
        //   ]
        // },

        {
          text: 'Education',
          style: 'header'
        },

        this.getEducationObject(this.resume.educations),
        {
          text: 'Other Details',
          style: 'header'
        },
        {
          text: this.resume.otherDetails
        },
        {
          text: 'Signature',
          style: 'sign'
        },
        {
          columns: [
            { qr: this.resume.name + ', Contact No : ' + this.resume.contactNo, fit: 100 },
            {
              text: `(${this.resume.name})`,
              alignment: 'right',
            }
          ]
        }
      ],
      info: {
        title: selfAssessment.selfUserFullName + '_SELF-AWAREENESS ASSESSMENT',
        author: 'Tony Robinson',
        subject: 'SELF-AWARENESS ASSESSMENT',
        keywords: 'SELF-AWARENESS ASSESSMENT',
      },
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10]
        },
        name: {
          fontSize: 16,
          bold: true
        },
        jobTitle: {
          fontSize: 14,
          bold: true,
          italics: true
        },
        sign: {
          margin: [0, 50, 0, 10],
          alignment: 'right',
          italics: true
        },
        tableHeader: {
          bold: true,
        }
      }
    };
  }
