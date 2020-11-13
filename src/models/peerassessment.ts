import { Answer } from './answer';
import { Contact } from './contact';

export interface PeerAssessment {
    peerAssessmentId: string;
    selfAssessmentId: string;
    fullName: string;
    emailAddress: string;
    createdAt: Date;
    completed: boolean;
    completedDate: Date;
    questionAnswers: Answer[];
    selfUserId: string;
    selfUserFullName: string;
    linkToAssessment: string;
    lastMailError: string;
    lastMailDate: Date;
}
