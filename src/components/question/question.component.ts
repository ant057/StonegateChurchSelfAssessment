// angular
import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

// models
import { Question } from '../../models/question';

@Component({
  selector: 'assessment-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input() question: Question;
  @Input() form: FormGroup;
  defaultElevation = 0;

  constructor() { }

  ngOnInit(): void {
    // console.log(this.form);
    // this.form.statusChanges.subscribe(
    //   result => console.log(result)
    // );
  }

  get isValid(): boolean { return this.form.controls[this.question.key].valid; }

}
