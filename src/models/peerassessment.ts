import { Answer } from './answer';
import { Contact } from './contact';

export interface PeerAssessment {
    peerAssessmentId: string;
    selfAssessmentId: string;
    createdAt: Date;
    completedYN: boolean;
    completedDate: Date;
    questionAnswers: Array<Answer>;
    selfUserId: string;
    contacts: Array<Contact>;
    linkToAssessment: string;
}
