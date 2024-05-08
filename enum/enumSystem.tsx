export const enum EnumStepWorkflow {
  Submitter = 1,
  Manager = 2,
  VP = 3,
  ReviewSubmissionAdmin = 4,
  ReviewSubmissionFocalPointReview = 5,
  PreScreeningScorePreScreeningCommittees = 6,
  PreScreeningScoreFocalPointReview = 7,
  PreScreeningScoreAdmin = 8,
  ScreeningScoreScreeningCommittees = 9,
  ScreeningScoreAdmin = 10,
  JudgingScoreJudgingCommittees = 11,
  JudgingScoreAdmin = 12,
}

export const enum EnumGroupUser {  
  Administrator = 1,
  QSHE_BA = 2,
  QSHE_Corp = 3,
  InnovationCommittee = 4,
}

export const enum EnumChoiceType {
  /**
   * 0 = ตัวเลือกเดียว
   */
  OneOption = 0,
  /**
   * 1 = หลายตัวเลือก
   */
  ManyOption = 1,  
}

export const OptionsChoiceType = [
  { label: "ตัวเลือกเดียว", value: "0", disable: false },
  { label: "หลายตัวเลือก", value: "1", disable: false }
];

export const OptionsRequire = [{ label: "Required Field", value: "Y", disable: false },];

export const enum ApiNavigationType {
  FrontEndTop = "1",
  FrontEndLeft = "2",
  BackEnd = "3"
};