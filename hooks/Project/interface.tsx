import { EnumGroupUser } from "@/enum/enumSystem";
import { IOptionsSelect } from "@/lib/inputTypes";

import { STTableColumnDetail, STTableRow } from '@/components/STTable/STTableProps';
export interface AssessmentInnovationProps {
    nGroupID: EnumGroupUser;
    nScore: number;
    isRequire: boolean;
    isDisable: boolean;
    disableMode?: string;
    isSkeleton: boolean;
    nPicAssessmentInnovationID?: number;
    setObjData: (value: AssessmentInnovationItemProps) => void;
}

export interface AssessmentInnovationItemProps {
    nAssessmentInnovationID: number;
    nVersionID: number;
    lstDataStage1: AssessmentInnovationDetailStage1[];
    sCommentStage1?: string;
    lstDataStage2: AssessmentInnovationDetailStage2[];
    sCommentStage2?: string;
}

export interface AssessmentInnovationDetailStage1 {
    nAssessmentInnovationStage1ID: number; // หัวข้อประเมิน ID
    sQuestion?: string; // หัวข้อประเมิน ชื่อ
    nWeight: number; // หัวข้อประเมิน Weight
    sWeightScore_Self?: number; // Weight Score >> Self-Assessment < Administrator
    sWeightScore_QSHE_BA?: number; // Weight Score >> QSHE BA 
    sWeightScore_Innovation?: number; // Weight Score >> Innovation Committee
    nPicAssessmentInnovationStage1AnswerID?: number;
    nPicAssessmentInnovationID?: number;

    //สิ่งที่ต้องเอาไปบันทึก Group ที่มีการเปลี่ยนแปลกล่าสุด
    nAssessmentInnovationStage1AnswerID: number; // รายละอียดการพิจารณา Select ID >> Group นั้นๆ ที่ทำอยู่
    nWeightScore: number; // Weight Score >> Group นั้นๆ ที่ทำอยู่
}

export interface AssessmentInnovationDetailStage2 {
    nPicAssessmentInnovationStage2AnswerID: number;
    nAssessmentInnovationStage2ID: number; // หัวข้อประเมิน ID
    sQuestion?: string; // หัวข้อประเมิน ชื่อ
    nChoiceType: number; // nChoiceType >> 0 = ตัวเลือกเดียว, 1 = หลายตัวเลือก
    nAssessmentInnovationStage2AnswerID_Self?: number; // Answer ID >> Self-Assessment < Administrator
    lstDataStage2AnswerID_Self: []; //nAssessmentInnovationStage2AnswerID
    nAssessmentInnovationStage2AnswerID_QSHE_BA?: number; // Answer ID >> QSHE BA 
    lstDataStage2AnswerID_QSHE_BA: []; //nAssessmentInnovationStage2AnswerID
    nAssessmentInnovationStage2AnswerID_Innovation?: number; // Answer ID >> Innovation Committee
    lstDataStage2AnswerID_Innovation: []; //nAssessmentInnovationStage2AnswerID
    nPicAssessmentInnovationID?: number;
    lstDataPicStage2AnswerID: []; //nPicAssessmentInnovationStage2AnswerID

    //สิ่งที่ต้องเอาไปบันทึก Group ที่มีการเปลี่ยนแปลกล่าสุด
    nAssessmentInnovationStage2AnswerID?: number; // Group นั้นๆ ที่ทำอยู่ > Answer ID
    lstDataStage2AnswerID: []; //Group นั้นๆ ที่ทำอยู่ > nAssessmentInnovationStage2AnswerID
}

export interface SuggestionScoringProps {
    nPicQuestionID?: number;
    nQtoolID: number;
    // nPicID?: number;
    // nGroupID?: number;
    // sUserID?: string;
    // nQuestionID?: number;
    // nTotalScore?: number;
    setnTotalScore: (value: number) => void;
    // arrData: SuggestionScoringItemProps[];
    setArrData: (value: SuggestionScoringItemProps[]) => void;
    // isRequire: boolean;
    isDisable: boolean;
    disableMode?: string;
    isSkeleton: boolean;
}

export interface SuggestionScoringItemProps {
    nPicQuestionCategoryID: number;
    nPicQuestionID: number;
    nQuestionCategoryID: number;
    nScore?: number;
    nWeigthScore?: number;
    nToatalWeigthScore?: number;
    nChoiceTypeDataID?: number;
}

export interface StepperProps
{
    isComplete : boolean,
    isActive : boolean,
    isDisable : boolean,
    sStep : string
}

export interface IPanelPIC
{
    isSkeleton : boolean,
    Header : string,
    SubHeader : string,
    isDisable : boolean,
    isShow : boolean,
    isShow2 : boolean,
    arrSource : IOptionsSelect[],
    arrLossGain : IOptionsSelect[],
    arrCategoryType : IOptionsSelect[],
    arrQtool : IOptionsSelect[],
    arrTeamPosition : IOptionsSelect[],
    form? : any,
    onSaveData? : (value: any) => void,
    CreateBy?: string,
    isDisableUnit : boolean,
    sUnit? : string,
    onCategoryTypeChange? : any
    dataColumn? : STTableColumnDetail[],
    dataRow? : {},
    loadding? : boolean,
   getTable? : any
}
