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
      key: 'gospelCentered',
      label: 'Gospel-Centered (Are you proficient in applying the good news of Jesus to your life and others?)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'd5GZxKbEvq5wdcEdmECR',
      orderBy: 1,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'gospelCenteredExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'd5GZxKbEvq5wdcEdmECR',
      orderBy: 2,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'spiritualLeadership',
      label: 'Spiritual Leadership (Do you lead people closer to Jesus?)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'd5GZxKbEvq5wdcEdmECR',
      orderBy: 3,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'spiritualLeadershipExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'd5GZxKbEvq5wdcEdmECR',
      orderBy: 4,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'humility',
      label: 'Humility (Do you typically think of yourself as "needy" before God?)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'd5GZxKbEvq5wdcEdmECR',
      orderBy: 5,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'humilityExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'd5GZxKbEvq5wdcEdmECR',
      orderBy: 6,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'fear',
      label: 'Fear of God (Do you have a fear of God that tends to release yourself from a fear of man?)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'd5GZxKbEvq5wdcEdmECR',
      orderBy: 7,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'fearExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'd5GZxKbEvq5wdcEdmECR',
      orderBy: 8,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'faith',
      label: 'Faith (Do you find joy in risk-taking or are you risk-averse?)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'd5GZxKbEvq5wdcEdmECR',
      orderBy: 9,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'faithExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'd5GZxKbEvq5wdcEdmECR',
      orderBy: 10,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'missional',
      label: 'Missional (Do you often share the good news of Jesus with others?)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'd5GZxKbEvq5wdcEdmECR',
      orderBy: 11,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'missionalExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'd5GZxKbEvq5wdcEdmECR',
      orderBy: 12,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'calling',
      label: `Calling (Do you feel called to serve in your current role or the role you're pursing?)`,
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'd5GZxKbEvq5wdcEdmECR',
      orderBy: 13,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'callingExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'd5GZxKbEvq5wdcEdmECR',
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
