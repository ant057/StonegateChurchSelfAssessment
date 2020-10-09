// angular
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../environments/environment';

// rxjs
import { Observable, from } from 'rxjs';
import { map, tap, take, switchMap, mergeMap, expand, takeWhile } from 'rxjs/operators';

// Models
// import { Payment } from '../models/payment/payment';
import { Section } from '../models/section';

@Injectable()
export class FirebaseService {

  constructor(private afs: AngularFirestore,
    private afstorage: AngularFireStorage) {
  }

  getSelfAssessmentQuestions(): Observable<any[]> {
    return this.afs.collection('/questions', ref => ref.orderBy('orderBy')).valueChanges();
  }

  getSelfAssessmentSections(): Observable<Section[]> {
    return this.afs.collection('/sections', ref => ref.orderBy('orderBy')).snapshotChanges().pipe(
      map(q => {
        const data: Section[] = [];
        q.forEach(x => {
          const item = x.payload.doc.data() as Section;
          item.sectionId = x.payload.doc.id;
          data.push(item);
        });
        return data;
      })
    );
  }

  createQuestions(): void {

    this.afs.collection('/questions').add({
      key: 'joy',
      label: 'Joy (Do people consider you to be a joyful person? Do you celebrate things well?)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'xjm9Wh1uaxsVqumnyuN7',
      orderBy: 1,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'joyExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'xjm9Wh1uaxsVqumnyuN7',
      orderBy: 2,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'teachable',
      label: 'Teachable (Do you listen to and heed the advice and wisdom of others?)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'xjm9Wh1uaxsVqumnyuN7',
      orderBy: 3,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'teachableExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'xjm9Wh1uaxsVqumnyuN7',
      orderBy: 4,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'faithful',
      label: 'Faithful (Do you find yourself rarely giving up?)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'xjm9Wh1uaxsVqumnyuN7',
      orderBy: 5,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'failthfulExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'xjm9Wh1uaxsVqumnyuN7',
      orderBy: 6,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'submissive',
      label: 'Submissive (Do you find it easy to submit to others in authority?)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'xjm9Wh1uaxsVqumnyuN7',
      orderBy: 7,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'submissiveExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'xjm9Wh1uaxsVqumnyuN7',
      orderBy: 8,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'authentic',
      label: 'Authentic (Is it easy for you to open up?)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'xjm9Wh1uaxsVqumnyuN7',
      orderBy: 9,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'authenticExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'xjm9Wh1uaxsVqumnyuN7',
      orderBy: 10,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'optomistic',
      label: 'Optimistic (Does the bright side tend to be easy for you to see?)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'xjm9Wh1uaxsVqumnyuN7',
      orderBy: 11,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'optomisticExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'xjm9Wh1uaxsVqumnyuN7',
      orderBy: 12,
      assessmentType: 'self'
    });


    this.afs.collection('/questions').add({
      key: 'prophet',
      label: 'Prophet (A truth-telling, objective leader)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'NqfIYrdYi2GDnvuiRDtV',
      orderBy: 1,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'prophetExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'NqfIYrdYi2GDnvuiRDtV',
      orderBy: 2,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'priest',
      label: 'Priest (A pastoral, listening leader)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'NqfIYrdYi2GDnvuiRDtV',
      orderBy: 3,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'priestExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'NqfIYrdYi2GDnvuiRDtV',
      orderBy: 4,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'king',
      label: 'King (A strategic, visionary leader)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'NqfIYrdYi2GDnvuiRDtV',
      orderBy: 5,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'kingExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'NqfIYrdYi2GDnvuiRDtV',
      orderBy: 6,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'influence',
      label: 'Influence (Do people look to you for input on decisions?)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'NqfIYrdYi2GDnvuiRDtV',
      orderBy: 7,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'influenceExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'NqfIYrdYi2GDnvuiRDtV',
      orderBy: 8,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'developing',
      label: 'Developing (How well do you develop new leaders or duplicate yourself?)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'NqfIYrdYi2GDnvuiRDtV',
      orderBy: 9,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'developingExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'NqfIYrdYi2GDnvuiRDtV',
      orderBy: 10,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'delegating',
      label: 'Delegation (Do you find it easy to often give up control and responsibility for the sake of efficiency and developing others?)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'NqfIYrdYi2GDnvuiRDtV',
      orderBy: 11,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'delegatingExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'NqfIYrdYi2GDnvuiRDtV',
      orderBy: 12,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'intuitive',
      label: 'Intuitive (Do you tend to have the ability to understand or know something without any direct instruction?)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'NqfIYrdYi2GDnvuiRDtV',
      orderBy: 13,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'intuitiveExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'NqfIYrdYi2GDnvuiRDtV',
      orderBy: 14,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'wisdom',
      label: 'Wisdom (Do you have the ability to see good solutions to life’s problems?)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'NqfIYrdYi2GDnvuiRDtV',
      orderBy: 15,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'wisdomExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'NqfIYrdYi2GDnvuiRDtV',
      orderBy: 16,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'teaching',
      label: 'Teaching (Do you possess the ability to explain things in ways people can understand)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'NqfIYrdYi2GDnvuiRDtV',
      orderBy: 17,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'teachingExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'NqfIYrdYi2GDnvuiRDtV',
      orderBy: 18,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'selfAware',
      label: `Self-Awareness / Emotional Intelligence (Do you have a good sense of what you're internally experiencing, and how others are experiencing you?)`,
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'NqfIYrdYi2GDnvuiRDtV',
      orderBy: 19,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'selfAwareexplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'NqfIYrdYi2GDnvuiRDtV',
      orderBy: 20,
      assessmentType: 'self'
    });


    this.afs.collection('/questions').add({
      key: 'relational',
      label: 'Relational (Over time, are you easy or hard to get along with?)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'OME7VCNivMh38COXFb5x',
      orderBy: 1,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'relationalExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'OME7VCNivMh38COXFb5x',
      orderBy: 2,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'servant',
      label: 'Servant-Hearted (Do you tend to think of how others are doing before they consider how you are doing personally?)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'OME7VCNivMh38COXFb5x',
      orderBy: 3,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'servantExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'OME7VCNivMh38COXFb5x',
      orderBy: 4,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'peacemaker',
      label: 'Peacemaker (Do you tend to extend grace to others in the midst of conflict?)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'OME7VCNivMh38COXFb5x',
      orderBy: 5,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'peacemakerExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'OME7VCNivMh38COXFb5x',
      orderBy: 6,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'listen',
      label: `Listening (Do people tend to feel like they've been heard and their voice is valued when they talk to you?)`,
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'OME7VCNivMh38COXFb5x',
      orderBy: 7,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'listenExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'OME7VCNivMh38COXFb5x',
      orderBy: 8,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'connection',
      label: `Connection (Is relational connection natural for you? Do you get along well with others?)`,
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'OME7VCNivMh38COXFb5x',
      orderBy: 9,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'connectionExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'OME7VCNivMh38COXFb5x',
      orderBy: 10,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'encourage',
      label: `Encouraging (Are you gifted in building others up?)`,
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'OME7VCNivMh38COXFb5x',
      orderBy: 11,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'encourageExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'OME7VCNivMh38COXFb5x',
      orderBy: 12,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'hospitality',
      label: `Hospitality (Are people often invited to your house? Do people feel cared for and welcomed when they're there?)`,
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'OME7VCNivMh38COXFb5x',
      orderBy: 13,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'hospitalityExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'OME7VCNivMh38COXFb5x',
      orderBy: 14,
      assessmentType: 'self'
    });

  }

  /*
    getPlants() {
      return this.afs.collection('/plants').snapshotChanges();
    }
  
    getMyPlants(uid: string) {
      return this.afs.collection('/plants', ref => ref.where('uid' , '==', uid)).valueChanges();
    }
  
    createPlant(value, imageId) {
      return this.afs.collection('/plants').add({
        familyName: value.familyName,
        scientificName: value.scientificName,
        sunlightHoursDaily: value.sunlightHoursDaily,
        waterWeekly: value.waterWeekly,
        location: value.location,
        uid: '123',
        imageId: imageId ? imageId.toString() : '',
        waterFrequency: value.waterFrequency
      });
    }
  
    uploadImage(file, filename) {
      const storageRef = this.afstorage.ref(filename);
      const task = storageRef.put(file);
    }
  
    getImageURL(filename) {
      const storageRef = this.afstorage.ref(filename);
      const URL = storageRef.getDownloadURL();
      return URL;
    }
    */
}
