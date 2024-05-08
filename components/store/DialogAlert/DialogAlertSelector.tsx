import { createSelector } from 'reselect';

const selectRaw = (state) => state.DialogReducer;

const selectWarningOpen = createSelector(
    [selectRaw],
    (DialogReducer) => DialogReducer.WarningOpen,
);

const selectWarningMsg = createSelector(
    [selectRaw],
    (DialogReducer) => DialogReducer.WarningMsg,
);
const selectErrorOpen = createSelector(
    [selectRaw],
    (DialogReducer) => DialogReducer.ErrorOpen,
);

const selectErrorMsg = createSelector(
    [selectRaw],
    (DialogReducer) => DialogReducer.ErrorMsg,
);
const selectSubmitOpen = createSelector(
    [selectRaw],
    (DialogReducer) => DialogReducer.SubmitOpen,
);

const selectSubmitMsg = createSelector(
    [selectRaw],
    (DialogReducer) => DialogReducer.SubmitMsg,
);
const selectSubmitFn = createSelector(
    [selectRaw],
    (DialogReducer) => DialogReducer.SubmitFn,
);
const selectSubmitCancelFn = createSelector(
    [selectRaw],
    (DialogReducer) => DialogReducer.SubmitCancelFn,
);
const selectSubmitIsload = createSelector(
    [selectRaw],
    (DialogReducer) => DialogReducer.SubmitIsload,
);

const selectSubmit_WARNNING_Open = createSelector(
    [selectRaw],
    (DialogReducer) => DialogReducer.Submit_WARNNING_Open,
);
const selectSubmit_WARNNING_MsgTitle = createSelector(
    [selectRaw],
    (DialogReducer) => DialogReducer.Submit_WARNNING_MsgTitle,
);
const selectSubmit_WARNNING_Msg = createSelector(
    [selectRaw],
    (DialogReducer) => DialogReducer.Submit_WARNNING_Msg,
);
const selectSubmit_WARNNING_Fn = createSelector(
    [selectRaw],
    (DialogReducer) => DialogReducer.Submit_WARNNING_Fn,
);

const selectSubmit_WARNNING_FnCancel = createSelector(
    [selectRaw],
    (DialogReducer) => DialogReducer.Submit_WARNNING_FnCancel,
);


const selectSubmit_SUCCESS_Fn = createSelector(
    [selectRaw],
    (DialogReducer) => DialogReducer.Submit_SUCCESS_Fn,
);
const selectSubmit_WARNNING_Isload = createSelector(
    [selectRaw],
    (DialogReducer) => DialogReducer.Submit_WARNNING_Isload,
);

const selectSuccessOpen = createSelector(
    [selectRaw],
    (DialogReducer) => DialogReducer.SuccessOpen,
);
const selectSuccessMsg = createSelector(
    [selectRaw],
    (DialogReducer) => DialogReducer.SuccessMsg,
);
const selectIsFullScreen = createSelector(
    [selectRaw],
    (DialogReducer) => DialogReducer.IsFullScreen,
);
const selectIsMsgNoSpace = createSelector(
    [selectRaw],
    (DialogReducer) => DialogReducer.IsMsgNoSpace,
);

const selectSubmit_WithCondition_Open = createSelector([selectRaw], (DialogReducer) => DialogReducer.Submit_WithCondition_Open);
const selectSubmit_WithCondition_Msg = createSelector([selectRaw], (DialogReducer) => DialogReducer.Submit_WithCondition_Msg);
const selectSubmit_WithCondition_Fn1 = createSelector([selectRaw], (DialogReducer) => DialogReducer.Submit_WithCondition_Fn);
const selectSubmit_WithCondition_Fn2 = createSelector([selectRaw], (DialogReducer) => DialogReducer.Submit_WithCondition_Fn2);
const selectSubmit_WithCondition_FnCancel = createSelector([selectRaw], (DialogReducer) => DialogReducer.Submit_WithCondition_FnCancel);
const selectSubmit_WithCondition_Isload = createSelector( [selectRaw],(DialogReducer) => DialogReducer.Submit_WithCondition_Isload);

const AuthenSelectors = {
    selectRaw,
    selectSuccessOpen,
    selectSuccessMsg,
    selectWarningOpen,
    selectWarningMsg,
    selectErrorOpen,
    selectErrorMsg,
    selectSubmitOpen,
    selectSubmitFn,
    selectSubmitCancelFn,
    selectSubmitMsg,
    selectSubmitIsload,
    selectSubmit_WARNNING_Open,
    selectSubmit_SUCCESS_Fn,
    selectSubmit_WARNNING_Fn,
    selectSubmit_WARNNING_FnCancel,
    selectSubmit_WARNNING_MsgTitle,
    selectSubmit_WARNNING_Msg,
    selectSubmit_WARNNING_Isload,
    selectIsFullScreen,
    selectIsMsgNoSpace,
    selectSubmit_WithCondition_Open,
    selectSubmit_WithCondition_Msg,
    selectSubmit_WithCondition_Fn1,
    selectSubmit_WithCondition_Fn2,
    selectSubmit_WithCondition_FnCancel,
    selectSubmit_WithCondition_Isload
}
export default AuthenSelectors;