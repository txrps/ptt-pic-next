export const enum ApiAuthentication {
    Login = "Authentication/onLogin",
    LoginAzureAD = "Authentication/onLoginAzureAD",
    GetPermission = "Authentication/GetMenuPermission",
}

export const enum ApiCommon {
    GetBreadcrumbs = "Common/GetBreadCrumb",
    DownloadFile = "Common/DownloadFile",
    GetMenuAll = "Common/GetMenuAll",
};

export const enum ApiSuggestionScoring {
    GetDateTable = "SuggestionScoring/onGetDateTable",
}

export const enum ApiAssessmentInnovation {
    GetDateTable = "AssessmentInnovation/onGetDateTable",
}

export const enum ApiPicForm {
    GetInitial = "Pic/GetInitialForm",
    GetPicForm = "Pic/GetPicForm",
    GetTable= "Pic/GetPicList",
    GetInitialTable = "Pic/GetInitial"
};

export const enum ApiManageAssessmentInnovation {
    GetDateStage1 = "ManageAssessmentInnovation/onGetDateStage1",
    SaveDateStage1 = "ManageAssessmentInnovation/onSaveDateStage1",
    GetDateStage2 = "ManageAssessmentInnovation/onGetDateStage2",
    SaveDateStage2 = "ManageAssessmentInnovation/onSaveDateStage2",
    SaveDateStageAll = "ManageAssessmentInnovation/SaveDateStageAll",
};

export const enum ApiAdditionalQuestions {
    GetInitialOption = "AdditionalQuestions/GetInitialOption",
};

export const enum ApiHome {
    GetMenuCard = "Home/GetMenuCard",
};