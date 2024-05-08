import { ParseHtml } from "@/lib";

export interface DialogState {
    SuccessOpen: boolean,
    SuccessMsg: string
    WarningOpen: boolean,
    WarningMsg: string,
    ErrorOpen: boolean,
    ErrorMsg: string,
    SubmitOpen: boolean,
    SubmitFn: any,
    SubmitMsg: string,
    SubmitIsload: boolean,
    IsFullScreen: boolean,
    IsMsgNoSpace: boolean,
    Submit_WITHCONDITION_Open: boolean,
}

export const DialogInitialState: DialogState = {
    SuccessOpen: false,
    SuccessMsg: "",
    WarningOpen: false,
    WarningMsg: "",
    ErrorOpen: false,
    ErrorMsg: "",
    SubmitOpen: false,
    SubmitFn: () => { },
    SubmitMsg: "",
    SubmitIsload: false,
    IsFullScreen: false,
    IsMsgNoSpace: false,
    Submit_WITHCONDITION_Open: false
}

const prefix = 'DIALOG';
export const DialogActions = {
    DIALOG_SUCCESS_OPEN: `${prefix}_SUCCESS_OPEN`,
    DIALOG_SUCCESS_CLOSE: `${prefix}_SUCCESS_CLOSE`,
    DIALOG_WARNNING_OPEN: `${prefix}_WARNNING_OPEN`,
    DIALOG_WARNNING_CLOSE: `${prefix}_WARNNING_CLOSE`,
    DIALOG_ERROR_OPEN: `${prefix}_ERROR_OPEN`,
    DIALOG_ERROR_CLOSE: `${prefix}_ERROR_CLOSE`,
    DIALOG_SUBMIT_OPEN: `${prefix}_SUBMIT_OPEN`,
    DIALOG_SUBMIT_CLOSE: `${prefix}_SUBMIT_CLOSE`,
    DIALOG_SUBMIT_ISLOAD: `${prefix}_SUBMIT_ISLOAD`,
    DIALOG_SUBMIT_WARNNING_OPEN: `${prefix}_SUBMIT_WARNNING_OPEN`,
    DIALOG_SUBMIT_WARNNING_CLOSE: `${prefix}_SUBMIT_WARNNING_CLOSE`,
    DIALOG_SUBMIT_WARNNING_ISLOAD: `${prefix}_SUBMIT_WARNNING_ISLOAD`,
    DIALOG_SUBMIT_WITHCONDITION_OPEN: `${prefix}_SUBMIT_WITHCONDITION_OPEN`,
    DIALOG_SUBMIT_WITHCONDITION_CLOSE: `${prefix}_SUBMIT_WITHCONDITION_CLOSE`,
    DIALOG_SUBMIT_WITHCONDITION_ISLOAD: `${prefix}_SUBMIT_WITHCONDITION_ISLOAD`,
}

export const DialogActionCreators = {
    OpenDialogSubmit: (msg, Fn, Fncancel = () => { }) => (dispatch) => {
        try {
            dispatch({
                type: DialogActions.DIALOG_SUBMIT_OPEN,
                payload: {
                    IsOpen: true,
                    msg: ParseHtml(msg),
                    Fn: Fn,
                    FnCancel: Fncancel,
                    IsFullScreen: true,
                    IsMsgNoSpace: false
                },
            });
        } catch (error) {
            dispatch({
                type: DialogActions.DIALOG_SUBMIT_OPEN,
                payload: {
                    IsOpen: false,
                    msg: "",
                    Fn: Fn
                },
            });
        }
    },
    CloseDialogSubmit: () => (dispatch) => {
        try {
            dispatch({
                type: DialogActions.DIALOG_SUBMIT_CLOSE,
                payload: {
                    IsOpen: false,
                    msg: "",
                    Fn: () => { }

                },
            });
        } catch (error) {
            dispatch({
                type: DialogActions.DIALOG_SUBMIT_CLOSE,
                payload: {
                    IsOpen: false,
                    msg: "",
                    Fn: () => { }

                },
            });
        }
    },
    LoadSubmit: (Isload) => (dispatch) => {
        try {
            dispatch({
                type: DialogActions.DIALOG_SUBMIT_ISLOAD,
                payload: {
                    SubmitIsload: Isload,
                },
            });

        } catch (error) {
            dispatch({
                type: DialogActions.DIALOG_SUBMIT_ISLOAD,
                payload: {
                    SubmitIsload: false,
                },
            });
        }
    },
    OpenDialogSubmitWarning: (msgTitle, msg, Fn, FnCancel) => (dispatch) => {
        try {
            dispatch({
                type: DialogActions.DIALOG_SUBMIT_WARNNING_OPEN,
                payload: {
                    IsOpen: true,
                    msgTitle: ParseHtml(msgTitle),
                    msg: ParseHtml(msg),
                    Fn: Fn,
                    FnCancel: FnCancel
                },
            });
        } catch (error) {
            dispatch({
                type: DialogActions.DIALOG_SUBMIT_WARNNING_OPEN,
                payload: {
                    IsOpen: false,
                    msgTitle: "",
                    msg: "",
                    Fn: () => { },
                    FnCancel: () => { }
                },
            });
        }
    },
    CloseDialogSubmitWarning: () => (dispatch) => {
        try {
            dispatch({
                type: DialogActions.DIALOG_SUBMIT_WARNNING_CLOSE,
                payload: {
                    IsOpen: false,
                    msgTitle: "",
                    msg: "",
                    Fn: () => { }
                },
            });
        } catch (error) {
            dispatch({
                type: DialogActions.DIALOG_SUBMIT_WARNNING_CLOSE,
                payload: {
                    IsOpen: false,
                    msgTitle: "",
                    msg: "",
                    Fn: () => { }
                },
            });
        }
    },
    OpenDialogSubmitWithCondition: (msg, fnConfirm1, fnConfirm2, FnCancel) => (dispatch) => {
        try {
            dispatch({
                type: DialogActions.DIALOG_SUBMIT_WITHCONDITION_OPEN,
                payload: {
                    IsOpen: true,
                    msg: ParseHtml(msg),
                    Fn: fnConfirm1,
                    Fn2: fnConfirm2,
                    FnCancel: FnCancel
                },
            });
        } catch (error) {
            dispatch({
                type: DialogActions.DIALOG_SUBMIT_WITHCONDITION_OPEN,
                payload: {
                    IsOpen: false,
                    msg: "",
                    Fn: () => { },
                    Fn2: () => { },
                    FnCancel: () => { }
                },
            });
        }
    },
    CloseDialogConfirmWithCondition: () => (dispatch) => {
        try {
            dispatch({
                type: DialogActions.DIALOG_SUBMIT_WITHCONDITION_CLOSE,
                payload: {
                    IsOpen: false,
                    msg: "",
                    Fn: () => { }

                },
            });
        } catch (error) {
            dispatch({
                type: DialogActions.DIALOG_SUBMIT_WITHCONDITION_CLOSE,
                payload: {
                    IsOpen: false,
                    msg: "",
                    Fn: () => { }
                }
            });
        }
    },
    LoadSubmitWarning: (Isload) => (dispatch) => {
        try {
            dispatch({
                type: DialogActions.DIALOG_SUBMIT_WARNNING_ISLOAD,
                payload: {
                    SubmitIsload: Isload,
                },
            });

        } catch (error) {
            dispatch({
                type: DialogActions.DIALOG_SUBMIT_WARNNING_ISLOAD,
                payload: {
                    SubmitIsload: false,
                },
            });
        }
    },

    OpenDialogWarning: (msg, Fn = () => { }, Fncancel = () => { }) => (dispatch) => {
        try {
            dispatch({
                type: DialogActions.DIALOG_WARNNING_OPEN,
                payload: {
                    IsOpen: true,
                    msg: ParseHtml(msg),
                    Fn: Fn,
                    FnCancel: Fncancel,
                    IsFullScreen: true,
                    IsMsgNoSpace: false
                },
            });

        } catch (error) {
            dispatch({
                type: DialogActions.DIALOG_WARNNING_CLOSE,
                payload: {
                    IsOpen: false,
                    msg: "",
                    Fn: () => { },
                },
            });
        }
    },
    CloseDialogWarning: () => (dispatch) => {
        try {
            dispatch({
                type: DialogActions.DIALOG_WARNNING_CLOSE,
                payload: {
                    IsOpen: false,
                    msg: "",
                    Fn: () => { },
                },
            });

        } catch (error) {
            dispatch({
                type: DialogActions.DIALOG_WARNNING_CLOSE,
                payload: {
                    IsOpen: false,
                    msg: "",
                    Fn: () => { },
                },
            });
        }
    },
    OpenDialogError: (msg, Fn = () => { }, Fncancel = () => { }) => (dispatch) => {
        try {
            dispatch({
                type: DialogActions.DIALOG_ERROR_OPEN,
                payload: {
                    IsOpen: true,
                    msg: ParseHtml(msg),
                    Fn: Fn,
                    FnCancel: Fncancel,
                    IsFullScreen: true,
                    IsMsgNoSpace: false
                },
            });

        } catch (error) {
            dispatch({
                type: DialogActions.DIALOG_ERROR_CLOSE,
                payload: {
                    IsOpen: false,
                    msg: "",
                    Fn: () => { }
                },
            });
        }
    },
    CloseDialogError: () => (dispatch) => {
        try {
            dispatch({
                type: DialogActions.DIALOG_ERROR_CLOSE,
                payload: {
                    IsOpen: false,
                    msg: "",
                    Fn: () => { },
                },
            });
        } catch (error) {
            dispatch({
                type: DialogActions.DIALOG_ERROR_CLOSE,
                payload: {
                    IsOpen: false,
                    msg: "",
                    Fn: () => { },
                },
            });
        }
    },
    OpenDialogSuccess: (msg, Fn, Fncancel) => (dispatch) => {
        try {
            dispatch({
                type: DialogActions.DIALOG_SUCCESS_OPEN,
                payload: {
                    IsOpen: true,
                    msg: ParseHtml(msg),
                    Fn: Fn,
                    FnCancel: Fncancel,
                    IsFullScreen: true,
                    IsMsgNoSpace: false
                },
            });
        } catch (error) {
            dispatch({
                type: DialogActions.DIALOG_SUCCESS_CLOSE,
                payload: {
                    IsOpen: false,
                    msg: "",
                    Fn: () => { },
                    FnCancel: () => { }
                },
            });
        }
    },
    CloseDialogSuccess: () => (dispatch) => {
        try {
            dispatch({
                type: DialogActions.DIALOG_SUCCESS_CLOSE,
                payload: {
                    IsOpen: false,
                    msg: "",
                    Fn: () => { },
                    FnCancel: () => { }
                },
            });

        } catch (error) {
            dispatch({
                type: DialogActions.DIALOG_SUCCESS_CLOSE,
                payload: {
                    IsOpen: false,
                    msg: "",
                    Fn: () => { },
                    FnCancel: () => { }
                },
            });
        }
    },
}

export default DialogActionCreators;