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

@Injectable()
export class FirebaseService {

  constructor(private afs: AngularFirestore,
              private afstorage: AngularFireStorage) {
  }

  getSelfAssessmentQuestions(): Observable<any[]> {
    return this.afs.collection('/questions', ref => ref.orderBy('orderBy')).valueChanges();
  }

  createQuestions(): void {

    this.afs.collection('/questions').add({
      key: 'greatestStrengthTwo',
      label: '',
      showLabel: false,
      type: 'short answer',
      required: true,
      placeholder: 'Greatest Strength #2',
      sectionId: 'TCcYNQJ1gwwA0CgVzOWF',
      orderBy: 2,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'greatestStrengthThree',
      label: '',
      showLabel: false,
      type: 'short answer',
      required: true,
      placeholder: 'Greatest Strength #3',
      sectionId: 'TCcYNQJ1gwwA0CgVzOWF',
      orderBy: 3,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'greatestWeaknessOne',
      label: 'What would you say are your three greatest weaknesses?',
      showLabel: true,
      type: 'short answer',
      required: true,
      placeholder: 'Greatest Weakness #1',
      sectionId: 'TCcYNQJ1gwwA0CgVzOWF',
      orderBy: 4,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'greatestWeaknessTwo',
      label: '',
      showLabel: false,
      type: 'short answer',
      required: true,
      placeholder: 'Greatest Weakness #2',
      sectionId: 'TCcYNQJ1gwwA0CgVzOWF',
      orderBy: 5,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'greatestWeaknessOne',
      label: '',
      showLabel: false,
      type: 'short answer',
      required: true,
      placeholder: 'Greatest Weakness #3',
      sectionId: 'TCcYNQJ1gwwA0CgVzOWF',
      orderBy: 6,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'firstImpression',
      label: 'What first impression do you normally leave with people?',
      showLabel: true,
      type: 'short answer',
      required: true,
      placeholder: '',
      sectionId: 'TCcYNQJ1gwwA0CgVzOWF',
      orderBy: 7,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'wrongWay',
      label: 'Over time, what about you most rubs people the wrong the way?',
      showLabel: true,
      type: 'short answer',
      required: true,
      placeholder: '',
      sectionId: 'TCcYNQJ1gwwA0CgVzOWF',
      orderBy: 8,
      assessmentType: 'self'
    });

    this.afs.collection('/questions').add({
      key: 'blindSpots',
      label: 'What would you consider to be potential or real blind spots in your life?',
      showLabel: true,
      type: 'short answer',
      required: true,
      placeholder: '',
      sectionId: 'TCcYNQJ1gwwA0CgVzOWF',
      orderBy: 9,
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
