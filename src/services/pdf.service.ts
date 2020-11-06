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

    const giftsSelf = selfAssessment.questionAnswers.filter(
      q => q.section === 'Short Answers' && q.questionOrder < 4);
    const hindrancesSelf = selfAssessment.questionAnswers.filter(
      q => q.section === 'Short Answers' && (q.questionOrder > 3 && q.questionOrder < 7 ));

    let giftsPeer = [];
    peerAssessments.forEach(p => {
      giftsPeer = giftsPeer.concat(p.questionAnswers.filter(
        q => q.section === 'Short Answers' && q.questionOrder < 4));
    });
    let hindrancesPeer = [];
    peerAssessments.forEach(p => {
      hindrancesPeer = hindrancesPeer.concat(p.questionAnswers.filter(
        q => q.section === 'Short Answers' && (q.questionOrder > 3 && q.questionOrder < 7)));
    });

    const gifts = giftsSelf.concat(giftsPeer);
    const hindrances = hindrancesSelf.concat(hindrancesPeer);

    const ratingAnswersSelf = selfAssessment.questionAnswers.filter(
      q => q.questionType === 'rating'
    );

    let ratingAnswersPeer = [];
    peerAssessments.forEach(p => {
      ratingAnswersPeer = ratingAnswersPeer.concat(p.questionAnswers.filter(
        q => q.questionType === 'rating'));
    });

    let strengths = [];
    let growths = [];
    let misreadplus = [];
    let misreadneg = [];

    ratingAnswersSelf.forEach(q => {
      // find corresponding questions in rating answers peer
      // calculate average between all peers
      // then?
      const selfRating = +q.answerValue;
      const peerRatings = [];
      const questionRatings = ratingAnswersPeer.filter(x => x.questionKey === q.questionKey);
      questionRatings.forEach(f => {
        peerRatings.push(f.answerValue);
      });
      // console.warn('peer ratings:' + peerRatings);

      const peerAverage = peerRatings.reduce((a, b) => (+a + +b)) / peerRatings.length;

      peerRatings.push(selfRating);
      const peerSelfAverage = peerRatings.reduce((a, b) => (+a + +b)) / peerRatings.length;

      console.warn(peerSelfAverage);
      if (peerSelfAverage >= 4) {
        strengths.push(q.questionLabel);
      }

      strengths = strengths.sort((a, b) => (b - a)).slice(0, 4);

      if (peerSelfAverage <= 3) {
        growths.push(q.questionLabel);
      }

      growths = growths.sort((a, b) => (b - a)).slice(0, 4);

      if (selfRating <= 3 && peerAverage >= 4.5) {
        misreadplus.push(q.questionLabel);
      }

      misreadplus = misreadplus.sort((a, b) => (b - a)).slice(0, 4);

      if (selfRating >= 4.5 && peerAverage < 3) {
        misreadneg.push(q.questionLabel);
      }

      misreadneg = misreadneg.sort((a, b) => (b - a)).slice(0, 4);
    });

    console.warn(misreadplus);
    console.warn(misreadneg);

    return {
      background: {
        image: AegleBase64,
        width: 200,
        opacity: 0.05,
        absolutePosition: { x: 150, y: 250 },
      },
      background: (currentPage, pageSize) {
        return `page ${currentPage} with size ${pageSize.width} x ${pageSize.height}`
      },
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
              ul: gifts.filter((value, index) => index % 3 === 0).map(s => s.answerValue)
            },
            {
              ul: gifts.filter((value, index) => index % 3 === 1).map(s => s.answerValue)
            },
            {
              ul: gifts.filter((value, index) => index % 3 === 2).map(s => s.answerValue)
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
        {
          text: 'Strengths',
          style: 'headerone'
        },
        {
          columns: [
            {
              ol: strengths.map(s => s)
            }
          ]
        },
        {
          text: 'Growths',
          style: 'headerone'
        },
        {
          columns: [
            {
              ol: growths.map(s => s)
            }
          ]
        },
        {
          text: 'Misread + (affirmation needed)',
          style: 'headerone'
        },
        {
          columns: [
            {
              ol: misreadplus.map(s => s)
            }
          ]
        },
        {
          text: 'Misread - (humility needed)',
          style: 'headerone'
        },
        {
          columns: [
            {
              ol: misreadneg.map(s => s)
            }
          ]
        }
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
