// angular
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// models
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionControlService {

  constructor() { }

  toFormGroup(questions: Question[]): FormGroup {
    const group: any = {};

    questions.forEach(question => {
      group[question.key] = question.required ? new FormControl('', Validators.required)
                                              : new FormControl('');
    });
    return new FormGroup(group);
  }
}
