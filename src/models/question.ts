export interface Question {
    questionId: string;
    key: string;
    label: string;
    showLabel: boolean;
    type: string;
    required: boolean;
    placeholder: string;
    sectionId: string;
    orderBy: number;
    assessmentType: string;
}
