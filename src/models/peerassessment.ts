import { Answer } from './answer';
import { Contact } from './contact';

export interface PeerAssessment {
    peerAssessmentId: string;
    selfAssessmentId: string;
    fullname: string;
    emailAddress: string;
    createdAt: Date;
    completed: boolean;
    completedDate: Date;
    questionAnswers: Array<Answer>;
    selfUserId: string;
    linkToAssessment: string;
}
