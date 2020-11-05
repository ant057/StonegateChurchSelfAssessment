import { Answer } from './answer';
import { Contact } from './contact';

export interface SelfAssessment {
    selfAssessmentId: string;
    questionAnswers: Answer[];
    createdAt: Date;
    selfUserId: string;
    selfUserFullName: string;
    contacts: Contact[];
}
