import BlockUIActionCreators from "@/components/store/BlockUI/BlockUIAction";
import DialogActionCreators from "@/components/store/DialogAlert/DialogAlertAction";
import { useDispatch } from "react-redux";

export const useDialog = () => {
  const Dispatch: any = useDispatch();
  const BlockUI = () => Dispatch(BlockUIActionCreators.BlockUI());
  const UnBlockUI = () => Dispatch(BlockUIActionCreators.UnBlockUI());
  const LoadSubmit = (Isload?) =>
    Dispatch(DialogActionCreators.LoadSubmit(Isload));

  const Submit = (msg, fn?) => {
    Dispatch(DialogActionCreators.CloseDialogSuccess());
    Dispatch(DialogActionCreators.CloseDialogError());
    Dispatch(DialogActionCreators.CloseDialogWarning());
    return Dispatch(DialogActionCreators.OpenDialogSubmit(msg, fn));
  };
  const SubmitWarning = (msgTitle, msg, fn?, fnC?) => {
    Dispatch(DialogActionCreators.CloseDialogSuccess());
    Dispatch(DialogActionCreators.CloseDialogError());
    Dispatch(DialogActionCreators.CloseDialogWarning());
    return Dispatch(
      DialogActionCreators.OpenDialogSubmitWarning(msgTitle, msg, fn, fnC)
    );
  };
  const SubmitWithCondition = (msg, fnConfirm1?, fnConfirm2?, fnCancel?) => {
    Dispatch(DialogActionCreators.CloseDialogSuccess());
    Dispatch(DialogActionCreators.CloseDialogError());
    Dispatch(DialogActionCreators.CloseDialogWarning());
    Dispatch(DialogActionCreators.CloseDialogSubmitWarning());
    return Dispatch(
      DialogActionCreators.OpenDialogSubmitWithCondition(
        msg,
        fnConfirm1,
        fnConfirm2,
        fnCancel
      )
    );
  };

  const CloseSubmit = () => Dispatch(DialogActionCreators.CloseDialogSubmit());
  const CloseSubmitWarning = () =>
    Dispatch(DialogActionCreators.CloseDialogSubmitWarning());
  const CloseSubmitWithCondition = () =>
    Dispatch(DialogActionCreators.CloseDialogConfirmWithCondition());

  const Warning = (msg?, fn?, fnC?) => {
    Dispatch(DialogActionCreators.CloseDialogSuccess());
    Dispatch(DialogActionCreators.CloseDialogError());
    Dispatch(DialogActionCreators.CloseDialogWarning());
    return Dispatch(DialogActionCreators.OpenDialogWarning(msg, fn, fnC));
  };

  const Errors = (msg?, fn?, fnC?) => {
    Dispatch(DialogActionCreators.CloseDialogSuccess());
    Dispatch(DialogActionCreators.CloseDialogError());
    Dispatch(DialogActionCreators.CloseDialogWarning());
    return Dispatch(DialogActionCreators.OpenDialogError(msg, fn, fnC));
  };

  const Success = (msg?, fn?, fnC?) => {
    Dispatch(DialogActionCreators.CloseDialogSuccess());
    Dispatch(DialogActionCreators.CloseDialogError());
    Dispatch(DialogActionCreators.CloseDialogWarning());
    return Dispatch(DialogActionCreators.OpenDialogSuccess(msg, fn, fnC));
  };

  return {
    LoadSubmit,
    Success,
    Warning,
    Errors,
    Submit,
    SubmitWarning,
    SubmitWithCondition,
    CloseSubmitWithCondition,
    CloseSubmit,
    CloseSubmitWarning,
    BlockUI,
    UnBlockUI,
  };
};
