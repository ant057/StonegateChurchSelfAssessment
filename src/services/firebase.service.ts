// angular
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../environments/environment';
import { v4 as uuidv4 } from 'uuid';

// rxjs
import { Observable, from } from 'rxjs';
import { map, tap, take, switchMap, mergeMap, expand, takeWhile } from 'rxjs/operators';

// Models
// import { Payment } from '../models/payment/payment';
import { Section } from '../models/section';
import { Question } from 'src/models/question';
import { PeerAssessment } from 'src/models/peerassessment';
import { SelfAssessment } from 'src/models/selfassessment';

@Injectable()
export class FirebaseService {

  constructor(private afs: AngularFirestore,
              private afstorage: AngularFireStorage) {
  }

  getSelfAssessmentQuestions(): Observable<Question[]> {
    return this.afs.collection('/questions', ref => ref.where('type', '==', 'self').orderBy('orderBy')).snapshotChanges().pipe(
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
    return this.afs.collection('/questions', ref => ref.where('type', '==', 'peer').orderBy('orderBy')).snapshotChanges().pipe(
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

  createQuestions(): void {

    this.afs.collection('/questions').add({
      key: 'greatestStrengthOne',
      label: `What would you say are this person's three greatest strengths?`,
      showLabel: false,
      type: 'short answer',
      required: true,
      placeholder: 'Greatest Strength #1',
      sectionId: 'FNYHM5633tzZ0jH9GenO',
      orderBy: 1,
      assessmentType: 'peer'
    });

    this.afs.collection('/questions').add({
      key: 'greatestStrengthTwo',
      label: '',
      showLabel: false,
      type: 'short answer',
      required: true,
      placeholder: 'Greatest Strength #2',
      sectionId: 'FNYHM5633tzZ0jH9GenO',
      orderBy: 2,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'greatestStrengthThree',
      label: '',
      showLabel: false,
      type: 'short answer',
      required: true,
      placeholder: 'Greatest Strength #3',
      sectionId: 'FNYHM5633tzZ0jH9GenO',
      orderBy: 3,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'greatestWeaknessOne',
      label: `What would you say are this person's three greatest weaknesses?`,
      showLabel: true,
      type: 'short answer',
      required: true,
      placeholder: 'Greatest Weakness #1',
      sectionId: 'FNYHM5633tzZ0jH9GenO',
      orderBy: 4,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'greatestWeaknessTwo',
      label: '',
      showLabel: false,
      type: 'short answer',
      required: true,
      placeholder: 'Greatest Weakness #2',
      sectionId: 'FNYHM5633tzZ0jH9GenO',
      orderBy: 5,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'greatestWeaknessThree',
      label: '',
      showLabel: false,
      type: 'short answer',
      required: true,
      placeholder: 'Greatest Weakness #3',
      sectionId: 'FNYHM5633tzZ0jH9GenO',
      orderBy: 6,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'firstImpression',
      label: 'What first impression does this person normally leave with people?',
      showLabel: true,
      type: 'short answer',
      required: true,
      placeholder: '',
      sectionId: 'FNYHM5633tzZ0jH9GenO',
      orderBy: 7,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'wrongWay',
      label: 'Over time, what about them most rubs people the wrong the way?',
      showLabel: true,
      type: 'short answer',
      required: true,
      placeholder: '',
      sectionId: 'FNYHM5633tzZ0jH9GenO',
      orderBy: 8,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'blindSpots',
      label: `What would you consider to be potential or real blind spots in this person's life?`,
      showLabel: true,
      type: 'short answer',
      required: true,
      placeholder: '',
      sectionId: 'FNYHM5633tzZ0jH9GenO',
      orderBy: 9,
      assessmentType: 'peer'
    });




    this.afs.collection('/questions').add({
      key: 'gospelCentered',
      label: 'Gospel-Centered (Are they proficient in applying the good news of Jesus to their life and others?)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'CCPSVi8SVn8gEmMojM65',
      orderBy: 1,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'gospelCenteredExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'CCPSVi8SVn8gEmMojM65',
      orderBy: 2,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'spiritualLeadership',
      label: 'Spiritual Leadership (Do they lead people closer to Jesus?)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'CCPSVi8SVn8gEmMojM65',
      orderBy: 3,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'spiritualLeadershipExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'CCPSVi8SVn8gEmMojM65',
      orderBy: 4,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'humility',
      label: 'Humility (Do they typically think of themselves as "needy" before God?)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'CCPSVi8SVn8gEmMojM65',
      orderBy: 5,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'humilityExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'CCPSVi8SVn8gEmMojM65',
      orderBy: 6,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'fear',
      label: 'Fear of God (Do they have a fear of God that tends to release them from a fear of man?)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'CCPSVi8SVn8gEmMojM65',
      orderBy: 7,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'fearExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'CCPSVi8SVn8gEmMojM65',
      orderBy: 8,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'faith',
      label: 'Faith (Do they find joy in risk-taking or are they risk-averse?)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'CCPSVi8SVn8gEmMojM65',
      orderBy: 9,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'faithExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'CCPSVi8SVn8gEmMojM65',
      orderBy: 10,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'missional',
      label: 'Missional (Do they often share the good news of Jesus with others?)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'CCPSVi8SVn8gEmMojM65',
      orderBy: 11,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'missionalExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'CCPSVi8SVn8gEmMojM65',
      orderBy: 12,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'calling',
      label: `Calling (Do they feel called to serve in their current role or the role they're pursing?)`,
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'CCPSVi8SVn8gEmMojM65',
      orderBy: 13,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'callingExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'CCPSVi8SVn8gEmMojM65',
      orderBy: 14,
      assessmentType: 'peer'
    });



    this.afs.collection('/questions').add({
      key: 'joy',
      label: 'Joy (Do people consider them to be a joyful person? Do they celebrate things well?)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'bfnghv3Fatepr1u8Rkgl',
      orderBy: 1,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'joyExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'bfnghv3Fatepr1u8Rkgl',
      orderBy: 2,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'teachable',
      label: 'Teachable (Do they listen to and heed the advice and wisdom of others?)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'bfnghv3Fatepr1u8Rkgl',
      orderBy: 3,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'teachableExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'bfnghv3Fatepr1u8Rkgl',
      orderBy: 4,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'faithful',
      label: 'Faithful (Do they find themselves rarely giving up?)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'bfnghv3Fatepr1u8Rkgl',
      orderBy: 5,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'failthfulExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'bfnghv3Fatepr1u8Rkgl',
      orderBy: 6,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'submissive',
      label: 'Submissive (Do they find it easy to submit to others in authority?)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'bfnghv3Fatepr1u8Rkgl',
      orderBy: 7,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'submissiveExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'bfnghv3Fatepr1u8Rkgl',
      orderBy: 8,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'authentic',
      label: 'Authentic (Is it easy for them to open up?)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'bfnghv3Fatepr1u8Rkgl',
      orderBy: 9,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'authenticExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'bfnghv3Fatepr1u8Rkgl',
      orderBy: 10,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'optomistic',
      label: 'Optimistic (Does the bright side tend to be easy for them to see?)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'bfnghv3Fatepr1u8Rkgl',
      orderBy: 11,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'optomisticExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'bfnghv3Fatepr1u8Rkgl',
      orderBy: 12,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'prophet',
      label: 'Prophet (Are they a truth-telling, objective leader)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'tvur4J8XkrJHxmtjRKzx',
      orderBy: 1,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'prophetExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'tvur4J8XkrJHxmtjRKzx',
      orderBy: 2,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'priest',
      label: 'Priest (Are they a pastoral, listening leader)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'tvur4J8XkrJHxmtjRKzx',
      orderBy: 3,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'priestExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'tvur4J8XkrJHxmtjRKzx',
      orderBy: 4,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'king',
      label: 'King (Are they a strategic, visionary leader)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'tvur4J8XkrJHxmtjRKzx',
      orderBy: 5,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'kingExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'tvur4J8XkrJHxmtjRKzx',
      orderBy: 6,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'influence',
      label: 'Influence (Do people look to this person for input on decisions?)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'tvur4J8XkrJHxmtjRKzx',
      orderBy: 7,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'influenceExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'tvur4J8XkrJHxmtjRKzx',
      orderBy: 8,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'developing',
      label: 'Developing (How well do they develop new leaders or duplicate themselves?)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'tvur4J8XkrJHxmtjRKzx',
      orderBy: 9,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'developingExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'tvur4J8XkrJHxmtjRKzx',
      orderBy: 10,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'delegating',
      label: 'Delegation (Do they find it easy to often give up control and responsibility for the sake of efficiency and developing others?)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'tvur4J8XkrJHxmtjRKzx',
      orderBy: 11,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'delegatingExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'tvur4J8XkrJHxmtjRKzx',
      orderBy: 12,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'intuitive',
      label: 'Intuitive (Do they tend to have the ability to understand or know something without any direct instruction?)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'tvur4J8XkrJHxmtjRKzx',
      orderBy: 13,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'intuitiveExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'tvur4J8XkrJHxmtjRKzx',
      orderBy: 14,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'wisdom',
      label: 'Wisdom (Do they have the ability to see good solutions to life’s problems?)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'tvur4J8XkrJHxmtjRKzx',
      orderBy: 15,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'wisdomExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'tvur4J8XkrJHxmtjRKzx',
      orderBy: 16,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'teaching',
      label: 'Teaching (Do they possess the ability to explain things in ways people can understand?)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'tvur4J8XkrJHxmtjRKzx',
      orderBy: 17,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'teachingExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'tvur4J8XkrJHxmtjRKzx',
      orderBy: 18,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'selfAware',
      label: `Self-Awareness / Emotional Intelligence (Do they have a good sense of what you're internally experiencing, and how others are experiencing them?)`,
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'tvur4J8XkrJHxmtjRKzx',
      orderBy: 19,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'selfAwareexplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'tvur4J8XkrJHxmtjRKzx',
      orderBy: 20,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'relational',
      label: 'Relational (Over time, are they easy or hard to get along with?)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'kyL2LlgrRXyAMg4EAEuo',
      orderBy: 1,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'relationalExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'kyL2LlgrRXyAMg4EAEuo',
      orderBy: 2,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'servant',
      label: 'Servant-Hearted (Do they tend to think of how others are doing before they consider how they are doing personally?)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'kyL2LlgrRXyAMg4EAEuo',
      orderBy: 3,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'servantExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'kyL2LlgrRXyAMg4EAEuo',
      orderBy: 4,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'peacemaker',
      label: 'Peacemaker (Do they tend to extend grace to others in the midst of conflict?)',
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'kyL2LlgrRXyAMg4EAEuo',
      orderBy: 5,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'peacemakerExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'kyL2LlgrRXyAMg4EAEuo',
      orderBy: 6,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'listen',
      label: `Listening (Do people tend to feel like they've been heard and their voice is valued when they talk to this person?)`,
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'kyL2LlgrRXyAMg4EAEuo',
      orderBy: 7,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'listenExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'kyL2LlgrRXyAMg4EAEuo',
      orderBy: 8,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'connection',
      label: `Connection (Is relational connection natural for this person? Do they get along well with others?)`,
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'kyL2LlgrRXyAMg4EAEuo',
      orderBy: 9,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'connectionExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'kyL2LlgrRXyAMg4EAEuo',
      orderBy: 10,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'encourage',
      label: `Encouraging (Are they gifted in building others up?)`,
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'kyL2LlgrRXyAMg4EAEuo',
      orderBy: 11,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'encourageExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'kyL2LlgrRXyAMg4EAEuo',
      orderBy: 12,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'hospitality',
      label: `Hospitality (Are people often invited to their house? Do people feel cared for and welcomed when they're there?)`,
      showLabel: true,
      type: 'rating',
      required: true,
      placeholder: '',
      sectionId: 'kyL2LlgrRXyAMg4EAEuo',
      orderBy: 13,
      assessmentType: 'peer'
    });
    this.afs.collection('/questions').add({
      key: 'hospitalityExplain',
      label: 'Explain, if necessary.',
      showLabel: true,
      type: 'long answer',
      required: false,
      placeholder: '',
      sectionId: 'kyL2LlgrRXyAMg4EAEuo',
      orderBy: 14,
      assessmentType: 'peer'
    });

  }

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
          linkToAssessment: this.getPeerAssessmentUrlBase() + peerAssessmentId
        });
      }
    });

    return from(batch.commit());
  }

  getPeerAssessmentUrlBase(): string {
    return !environment.production ? 'localhost:4200/peerassessment/' : 'selfassessment.firebaseapp/peerassessment/';
  }

  /*
    getPlants() {
      return this.afs.collection('/plants').snapshotChanges();
    }

    getMyPlants(uid: string) {
      return this.afs.collection('/plants', ref => ref.where('uid' , '==', uid)).valueChanges();
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
