export interface ManageAssessmentInnovationStage1Props {
    nAssessmentInnovationID: number,
    setNAssessmentInnovationID: (value) => void;
    setLstDataStage1: (value) => void;
    setNMinScore: (value) => void;
    setNMaxScore: (value) => void;
}

export interface IDetailStage1Props {
    nStageID: number,
    sQuestion: string,
    nWeight: number,
    nAssessmentInnovationStage1ID?: number,
    lstDataAnswerStage1: IDetailAnswerStage1Props[],
}
export interface IDetailAnswerStage1Props {
    sID: string,
    nAnswerID: number,
    nOrder: number,
    sAnswer?: string,
    nScore: number,
    isActive: boolean,
    nStageID: number,
    nAssessmentInnovationStage1AnswerID?: number,
    nAssessmentInnovationStage1ID?: number,
}

export interface ITableAnswerStage1Props {
    formStage1Answer: any;
    isDisable: boolean,
    isSkeleton?: boolean,
    disableMode?: string,
    nStageID: number,
    lstDataAnswerStage1: IDetailAnswerStage1Props[],
    setLstDataAnswerStage1: (value) => void;
}

export interface ManageAssessmentInnovationStage2Props {
    nAssessmentInnovationID: number,
    setNAssessmentInnovationID: (value) => void;
    setLstDataStage2: (value) => void;
}

export interface IDetailStage2Props {
    sID: string,
    nStageID: number,
    nAssessmentInnovationStage2ID?: number,
    sQuestion: string,
    nChoiceType: number,
    sChoiceType: string, //nChoiceType == 0 ? "ตัวเลือกเดียว" : "หลายตัวเลือก";
    nOrder: number,
    isRequire: boolean,
    isActive: boolean,
    sStatus: string, //isActive ? "Active" : "Inactive";
    lstDataAnswerStage2: IDetailAnswerStage2Props[], 
}
export interface IDetailAnswerStage2Props {
    nAnswerID: number,
    sAnswer: string,
    nStageID: number,
    nAssessmentInnovationStage2AnswerID?: number,
    nAssessmentInnovationStage2ID?: number,
}