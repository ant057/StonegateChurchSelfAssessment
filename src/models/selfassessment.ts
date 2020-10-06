import { Answer } from './answer';
import { Contact } from './contact';

export interface SelfAssessment {
    selfAssessmentId: string;
    questionAnswers: Array<Answer>;
    createdAt: Date;
    selfUserId: string;
    contacts: Array<Contact>;
}
