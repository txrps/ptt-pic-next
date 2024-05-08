import { DialogActions, DialogInitialState } from "./DialogAlertAction";

export const DialogReducer = (state, { type, payload }) => {
    if (state === undefined) {
        return DialogInitialState;
    }
    switch (type) {
        case DialogActions.DIALOG_SUBMIT_OPEN:
            return {
                ...state,
                SubmitOpen: payload.IsOpen,
                SubmitFn: payload.Fn,
                SubmitCancelFn: payload.FnCancel,
                SubmitMsg: payload.msg,
                SubmitIsload: false,
                IsFullScreen: payload.IsFullScreen,
                IsMsgNoSpace: payload.IsMsgNoSpace
            };
        case DialogActions.DIALOG_SUBMIT_CLOSE:
            return {
                ...state,
                SubmitOpen: payload.IsOpen,
                SubmitFn: payload.Fn,
                SubmitMsg: " ",
                SubmitIsload: false
            };
        case DialogActions.DIALOG_SUBMIT_ISLOAD:
            return {
                ...state,
                SubmitIsload: payload.SubmitIsload,
            };
        case DialogActions.DIALOG_SUBMIT_WARNNING_OPEN:
            return {
                ...state,
                Submit_WARNNING_Open: payload.IsOpen,
                Submit_WARNNING_Fn: payload.Fn,
                Submit_WARNNING_FnCancel: payload.FnCancel,
                Submit_WARNNING_MsgTitle: payload.msgTitle,
                Submit_WARNNING_Msg: payload.msg,
                Submit_WARNNING_Isload: false
            };
        case DialogActions.DIALOG_SUBMIT_WARNNING_CLOSE:
            return {
                ...state,
                Submit_WARNNING_Open: payload.IsOpen,
                Submit_WARNNING_Fn: payload.Fn,
                Submit_WARNNING_Msg: " ",
                Submit_WARNNING_Isload: false
            };
        case DialogActions.DIALOG_SUBMIT_WARNNING_ISLOAD:
            return {
                ...state,
                Submit_WARNNING_Isload: payload.SubmitIsload,
            };
        case DialogActions.DIALOG_WARNNING_OPEN:
            return {
                ...state,
                WarningOpen: payload.IsOpen,
                WarningMsg: payload.msg,
                SubmitIsload: false,
                SubmitOpen: false,
                Submit_SUCCESS_Fn: payload.Fn,
                IsFullScreen: payload.IsFullScreen,
                IsMsgNoSpace: payload.IsMsgNoSpace
            };
        case DialogActions.DIALOG_WARNNING_CLOSE:
            return {
                ...state,
                WarningOpen: payload.IsOpen,
                WarningMsg: " ",
                SubmitIsload: false,
                SubmitOpen: false
            };
        case DialogActions.DIALOG_ERROR_OPEN:
            return {
                ...state,
                ErrorOpen: payload.IsOpen,
                ErrorMsg: payload.msg,
                SubmitIsload: false,
                SubmitOpen: false,
                Submit_SUCCESS_Fn: payload.Fn,
                IsFullScreen: payload.IsFullScreen,
                IsMsgNoSpace: payload.IsMsgNoSpace
            };
        case DialogActions.DIALOG_ERROR_CLOSE:
            return {
                ...state,
                ErrorOpen: payload.IsOpen,
                ErrorMsg: " ",
                SubmitIsload: false,
                SubmitOpen: false
            };
        case DialogActions.DIALOG_SUCCESS_OPEN:
            return {
                ...state,
                SuccessOpen: payload.IsOpen,
                SuccessMsg: payload.msg,
                SubmitIsload: false,
                SubmitOpen: false,
                Submit_SUCCESS_Fn: payload.Fn,
                SubmitFn: payload.Fn,
                IsFullScreen: payload.IsFullScreen,
                IsMsgNoSpace: payload.IsMsgNoSpace
            };
        case DialogActions.DIALOG_SUCCESS_CLOSE:
            return {
                ...state,
                SuccessOpen: payload.IsOpen,
                SuccessMsg: " ",
                SubmitIsload: false,
                SubmitOpen: false,
                SubmitFn: payload.Fn,
            };
        case DialogActions.DIALOG_SUBMIT_WITHCONDITION_OPEN:
            return {
                ...state,
                Submit_WithCondition_Open: payload.IsOpen,
                Submit_WithCondition_Fn: payload.Fn,
                Submit_WithCondition_Fn2: payload.Fn2,
                Submit_WithCondition_FnCancel: payload.FnCancel,
                Submit_WithCondition_Msg: payload.msg,
                Submit_WithCondition_Isload: false
            };
        case DialogActions.DIALOG_SUBMIT_WITHCONDITION_CLOSE:
            return {
                ...state,
                Submit_WithCondition_Open: payload.IsOpen,
                Submit_WithCondition_Fn: payload.Fn,
                Submit_WithCondition_Fn2: payload.Fn2,
                Submit_WithCondition_Msg: " ",
                Submit_WithCondition_Isload: false
            };
        case DialogActions.DIALOG_SUBMIT_WITHCONDITION_ISLOAD:
            return {
                ...state,
                Submit_WithCondition_Isload: payload.SubmitIsload,
            };
        default:
            return {
                ...state,
            };
    }
}