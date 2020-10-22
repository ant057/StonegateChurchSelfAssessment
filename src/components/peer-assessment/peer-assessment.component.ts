import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'assessment-peer-assessment',
  templateUrl: './peer-assessment.component.html',
  styleUrls: ['./peer-assessment.component.scss'],
  outlet: "sidebar"
})
export class PeerAssessmentComponent implements OnInit {

  peerAssessmentId: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('peerassessmentid');
  }

}
