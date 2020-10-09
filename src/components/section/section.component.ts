import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Section } from '../../models/section';
import { Question } from '../../models/question';

@Component({
  selector: 'assessment-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  @Input() section: Section;
  @Input() questions: Question[];
  sectionQuestions: Question[] = [];
  @Input() form: FormGroup;


  constructor() { }

  ngOnInit(): void {
    this.sectionQuestions = this.questions.filter(q => {
      return q.sectionId === this.section.sectionId;
    });
  }

}
