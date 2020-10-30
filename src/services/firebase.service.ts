// angular
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireFunctions } from '@angular/fire/functions';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../environments/environment';
import { v4 as uuidv4 } from 'uuid';

// rxjs
import { Observable, from } from 'rxjs';
import { map, tap, take, switchMap, mergeMap, expand, takeWhile, catchError } from 'rxjs/operators';

// Models
import { Section } from '../models/section';
import { Question } from 'src/models/question';
import { PeerAssessment } from 'src/models/peerassessment';
import { SelfAssessment } from 'src/models/selfassessment';

@Injectable()
export class FirebaseService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private afs: AngularFirestore,
              private afstorage: AngularFireStorage,
              private fns: AngularFireFunctions,
              private http: HttpClient) {
  }

  getSelfAssessmentQuestions(): Observable<Question[]> {
    return this.afs.collection('/questions', ref => ref.where('assessmentType', '==', 'self').orderBy('orderBy')).snapshotChanges().pipe(
      map(q => {
        const data: Question[] = [];
        q.forEach(x => {
          const item = x.payload.doc.data() as Question;
          item.questionId = x.payload.doc.id;
          data.push(item);
        });
        return data;
      })
    );
  }

  getSelfAssessmentSections(): Observable<Section[]> {
    return this.afs.collection('/sections', ref => ref.where('type', '==', 'self').orderBy('orderBy')).snapshotChanges().pipe(
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

  getPeerAssessmentQuestions(): Observable<Question[]> {
    return this.afs.collection('/questions', ref => ref.where('assessmentType', '==', 'peer').orderBy('orderBy')).snapshotChanges().pipe(
      map(q => {
        const data: Question[] = [];
        q.forEach(x => {
          const item = x.payload.doc.data() as Question;
          item.questionId = x.payload.doc.id;
          data.push(item);
        });
        return data;
      })
    );
  }

  getPeerAssessmentSections(): Observable<Section[]> {
    return this.afs.collection('/sections', ref => ref.where('type', '==', 'peer').orderBy('orderBy')).snapshotChanges().pipe(
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

  getSelfAssessments(): Observable<SelfAssessment[]> {
    return this.afs.collection('/self-assessments', ref => ref.orderBy('createdAt')).snapshotChanges().pipe(
      map(q => {
        const data: SelfAssessment[] = [];
        q.forEach(x => {
          const item = x.payload.doc.data() as SelfAssessment;
          item.selfAssessmentId = x.payload.doc.id;
          data.push(item);
        });
        return data;
      })
    );
  }

  getPeerAssessments(): Observable<PeerAssessment[]> {
    return this.afs.collection('/peer-assessments').snapshotChanges().pipe(
      map(q => {
        const data: PeerAssessment[] = [];
        q.forEach(x => {
          const item = x.payload.doc.data() as PeerAssessment;
          item.peerAssessmentId = x.payload.doc.id;
          data.push(item);
        });
        return data;
      })
    );
  }

  getPeerAssessment(peerAssessmentId: string): Observable<PeerAssessment> {
    return this.afs.doc(`/peer-assessments/${peerAssessmentId}`).valueChanges().pipe(
      map(p => {
        return p as PeerAssessment;
      })
    );
  }

  sendReminderEmails(reminders: PeerAssessment[]): Observable<any> {
    return this.http.post(environment.firebaseFunctionsUrl + 'emailPeerAssessmentContactsReminder',
    JSON.stringify(reminders), this.httpOptions);
  }

  // createQuestions(): void {

  // }

  createSelfAssessment(obj): any {
    // atomic transaction
    const selfAssessmentId = uuidv4();
    const batch = this.afs.firestore.batch();

    const saRef = this.afs.collection('/self-assessments').doc(selfAssessmentId).ref;
    batch.set(saRef, {
      createdAt: new Date().toLocaleDateString(),
      selfUserId: obj.userId,
      selfUserFullName: obj.fullName,
      questionAnswers: obj.questionAnswers,
      contacts: obj.contacts
    });

    obj.contacts.forEach(element => {
      if (element.emailAddress) {
        const peerAssessmentId = uuidv4();
        const peerRef = this.afs.collection('/peer-assessments').doc(peerAssessmentId).ref;
        batch.set(peerRef, {
          selfAssessmentId,
          fullName: element.fullName,
          emailAddress: element.emailAddress,
          createdAt: new Date().toLocaleDateString(),
          completed: false,
          selfUserId: obj.userId,
          selfUserFullName: obj.fullName,
          linkToAssessment: this.getPeerAssessmentUrlBase() + peerAssessmentId
        });
      }
    });

    return from(batch.commit());
  }

  completePeerAssessment(obj): any {
    const peerAssessmentRef = this.afs.collection('/peer-assessments').doc(obj.peerAssessmentId);
    return from(peerAssessmentRef.set({
      completed: obj.completed,
      completedDate: obj.completedDate,
      questionAnswers: obj.questionAnswers
    }, { merge: true }));
  }

  getPeerAssessmentUrlBase(): string {
    return !environment.production ? 'localhost:4200/peerassessment/' : 'selfassessment.firebaseapp/peerassessment/';
  }

}
