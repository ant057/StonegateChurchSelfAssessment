export interface Question {
    questionId: string;
    text: string;
    type: string;
    required: boolean;
    sectionId: string;
    orderBy: number;
    multiField: boolean;
    numberFields: number;
    assessmentType: string;
}
