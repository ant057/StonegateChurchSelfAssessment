import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'assessment-contacts',
  templateUrl: './assessment-contacts.component.html',
  styleUrls: ['./assessment-contacts.component.scss']
})
export class AssessmentContactsComponent implements OnInit {

  showAdditionalContacts = false;

  contactListForm: FormGroup = new FormGroup({
    familyOneName: new FormControl(''),
    familyOneEmail: new FormControl('', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,6}$')]),
    familyTwoName: new FormControl(''),
    familyTwoEmail: new FormControl('', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,6}$')]),
    familyThreeName: new FormControl(''),
    familyThreeEmail: new FormControl('', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,6}$')]),
    spiritualOneName: new FormControl(''),
    spiritualOneEmail: new FormControl('', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,6}$')]),
    spiritualTwoName: new FormControl(''),
    spiritualTwoEmail: new FormControl('', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,6}$')]),
    spiritualThreeName: new FormControl(''),
    spiritualThreeEmail: new FormControl('', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,6}$')]),
    friendOneName: new FormControl(''),
    friendOneEmail: new FormControl('', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,6}$')]),
    friendTwoName: new FormControl(''),
    friendTwoEmail: new FormControl('', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,6}$')]),
    friendThreeName: new FormControl(''),
    friendThreeEmail: new FormControl('', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,6}$')]),
    });

  constructor() { }

  ngOnInit(): void {
  }

}
