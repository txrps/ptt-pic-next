import axios from "axios";
import { GetAntiforgeryToken, GetUrlApi, IsNullOrUndefined, SecureStorage } from ".";
import { APIStatusCode, TypeFileBlob } from "@/enum/enum";
import { useDispatch } from "react-redux";
import BlockUIActionCreators from "@/components/store/BlockUI/BlockUIAction";
import DialogActionCreators from "@/components/store/DialogAlert/DialogAlertAction";

type SuccessCallback = (response) => void;
type ErrorCallback = (errorResponse) => void;
type CompleteCallback = () => void;

//#region Axios All
export const FnAxios = () => {
  // const DialogFn = FnDialog();

  const Post = async (
    sWebMethodName: string,
    ParamJSON: any,
    fnSuccess?: SuccessCallback,
    fnError?: ErrorCallback,
    fnComplete?: CompleteCallback
  ) => {
    const objAntiforgeryToken = (await GetAntiforgeryToken()) as any;
    if (objAntiforgeryToken.isPass) {
      const source = axios.CancelToken.source();
      const authToken = SecureStorage.Get(`${process.env.NEXT_PUBLIC_APP_JWT_KEY}`);
      const baseUrl = GetUrlApi();
      const sPathApi = `${baseUrl}api/${sWebMethodName}`;
      const url = new URL(sPathApi, window.location.href);
      const PathAPI = url.origin + url.pathname + url.search;

      const ConfigHeader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: IsNullOrUndefined(authToken)
          ? ""
          : `Bearer ${authToken}`,
      };
      axios.defaults.withCredentials = true;
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      axios.defaults.headers.post["X-CSRF-TOKEN"] =
        objAntiforgeryToken.xsrfToken;
      await axios
        .post(PathAPI, ParamJSON, {
          headers: ConfigHeader,
          cancelToken: source.token,
        })
        .then((res) => {
          ResultAPI(res, FnDialog, fnSuccess);
          // ResultAPI(res, null, fnSuccess);
        })
        .catch((errors) => {
          if (!errors.response) {
            errors.response = { Message: errors.message };
          }
          ResultAPI(errors.response, FnDialog, fnError);
          // ResultAPI(errors.response, null, fnError);
        })
        .finally(() => {
          if (fnComplete) fnComplete();
        });
    }
  };

  const Get = async (
    sWebMethodName: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ParamJSON: any,
    fnSuccess?: SuccessCallback,
    fnError?: ErrorCallback,
    fnComplete?: CompleteCallback
  ) => {
    const authToken = SecureStorage.Get(`${process.env.NEXT_PUBLIC_APP_JWT_KEY}`);
    const ConfigHeader = {
      Authorization: IsNullOrUndefined(authToken) ? "" : `Bearer ${authToken}`,
    };
    const baseUrl = GetUrlApi();
    const sPathApi = `${baseUrl}api/${sWebMethodName}`;
    const url = new URL(sPathApi, window.location.href);
    const PathAPI = url.origin + url.pathname + url.search;

    await axios
      .get(PathAPI, {
        headers: ConfigHeader,
        params: ParamJSON,
      })
      .then((res) => {
        ResultAPI(res, FnDialog, fnSuccess);
        // ResultAPI(res, null, fnSuccess);
      })
      .catch((errors) => {
        if (!errors.response) {
          errors.response = { Message: errors.message };
        }
        ResultAPI(errors.response, FnDialog, fnError);
        // ResultAPI(errors.response, null, fnError);
      })
      .finally(() => {
        if (fnComplete) fnComplete();
      });
  };

  const DowloadFileSharePath = async (
    sPathFile: string,
    fileName: string,
    fnSuccess?,
    fnError?,
    BlockUI?: any,
    UnBlockUI?: any
  ) => {
    if (BlockUI) BlockUI();

    const authToken = SecureStorage.Get(`${process.env.NEXT_PUBLIC_APP_JWT_KEY}`);
    const baseUrl = GetUrlApi();
    const sPathApi = `${baseUrl}api/${"UploadFile/DownloadFileInSharePath"}`;
    const url = new URL(sPathApi, window.location.href);
    const PathAPI = url.origin + url.pathname + url.search;
    //// const PathAPI = GetPathLocationAPI("UploadFile/DownloadFileInSharePath");

    await axios({
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: IsNullOrUndefined(authToken)
          ? ""
          : `Bearer ${authToken}`,
      },
      method: "post",
      url: PathAPI,
      data: { sPathFile: sPathFile },
      responseType: "blob",
    })
      .then((res) => {
        const blob = new Blob([res.data], {
          type: TypeFileBlob.sharepath,
        });
        const link = document.createElement("a");
        link.target = "_blank";
        const objectUrl = URL.createObjectURL(blob);
        link.href = objectUrl;
        link.setAttribute("download", fileName);
        link.setAttribute("visibility", "hidden");
        link.click();
        link.remove();
        if (fnSuccess) fnSuccess(res);
      })
      .catch((errors) => {
        if (errors.response) {
          if (!errors.response) {
            errors.response = { Message: errors.message };
          }
          ResultAPI(errors.response, FnDialog, fnError);
          // ResultAPI(errors.response, null, fnError);
        } else if (fnError) {
          fnError();
        }
      })
      .then(() => {
        if (UnBlockUI) UnBlockUI();
      });
  };

  const DowloadFileBlob = async (
    sWebMethodName: string,
    ParamJSON: unknown,
    fileName: string,
    fnSuccess?,
    fnError?,
    BlockUI?: any,
    UnBlockUI?: any
  ) => {
    if (BlockUI) BlockUI();

    const authToken = SecureStorage.Get(`${process.env.NEXT_PUBLIC_APP_JWT_KEY}`);
    const baseUrl = GetUrlApi();
    const sPathApi = `${baseUrl}api/${sWebMethodName}`;
    const url = new URL(sPathApi, window.location.href);
    const PathAPI = url.origin + url.pathname + url.search;

    await axios({
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: IsNullOrUndefined(authToken)
          ? ""
          : `Bearer ${authToken}`,
      },
      method: "post",
      url: PathAPI,
      data: ParamJSON,
      responseType: "blob",
    })
      .then((res) => {
        // const fileNameHeader = "content-disposition";
        const sFileName = "";
        // const sFileName = ContentDispositionFileName(
        //   res.headers[fileNameHeader],
        //   fileName
        // );
        const blob = new Blob([res.data], {
          type: res.data.type,
        });
        const link = document.createElement("a");
        link.target = "_blank";
        const objectUrl = URL.createObjectURL(blob);
        link.href = objectUrl;
        link.setAttribute("download", sFileName);
        link.setAttribute("visibility", "hidden");
        link.click();
        link.remove();

        if (fnSuccess) fnSuccess(res);
      })
      .catch((errors) => {
        if (errors.response) {
          if (!errors.response) {
            errors.response = { Message: errors.message };
          }
          ResultAPI(errors.response, FnDialog, fnError);
          // ResultAPI(errors.response, null, fnError);
        } else if (fnError) {
          fnError();
        }
      })
      .then(() => {
        if (UnBlockUI) UnBlockUI();
      });
  };

  const DowloadFile = async (
    sWebMethodName: string,
    ParamJSON: any,
    fileName: string,
    fnSuccess?,
    fnError?,
    BlockUI?: any,
    UnBlockUI?: any
  ) => {
    if (BlockUI) BlockUI();
   
    const authToken = SecureStorage.Get(`${process.env.NEXT_PUBLIC_APP_JWT_KEY}`);
    const baseUrl = GetUrlApi();
    const sPathApi = `${baseUrl}api/${sWebMethodName}`;
    const url = new URL(sPathApi, window.location.href);
    const PathAPI = url.origin + url.pathname + url.search;

    await axios({
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: IsNullOrUndefined(authToken)
          ? ""
          : `Bearer ${authToken}`,
      },
      method: "post",
      url: PathAPI,
      data: ParamJSON,
    })
      .then((res) => {

        const blob = base64toBlob(res.data.objData, res.data.sType);
        const link = document.createElement("a");
        link.target = "_blank";
        const objectUrl = URL.createObjectURL(blob);
        link.href = objectUrl;
        if (fileName) {
          link.setAttribute("download", fileName);
        } else {
          link.setAttribute("download", res.data.sName);
        }

        link.setAttribute("visibility", "hidden");
        link.click();
        link.remove();

        if (fnSuccess) fnSuccess(res);
      })
      .catch((errors) => {
        if (errors.response) {
          if (!errors.response) {
            errors.response = { Message: errors.message };
          }
          ResultAPI(errors.response, FnDialog, fnError);
          // ResultAPI(errors.response, null, fnError);
        } else if (fnError) {
          fnError();
        }
      })
      .then(() => {
        if (UnBlockUI) UnBlockUI();
      });
  };

  return { Post, Get, DowloadFileBlob, DowloadFileSharePath, DowloadFile };
};

const _AxiosFn = FnAxios();
export const AxiosFn = {
  Post: _AxiosFn.Post,
  Get: _AxiosFn.Get,
  PoDowloadFileBlobst: _AxiosFn.DowloadFileBlob,
  DowloadFileSharePath: _AxiosFn.DowloadFileSharePath,
  DowloadFile: _AxiosFn.DowloadFile,
};
//#endregion

export const FnDialog = () => {
  const Dispatch: any = useDispatch();
  const BlockUI = () => Dispatch(BlockUIActionCreators.BlockUI());
  const UnBlockUI = () => Dispatch(BlockUIActionCreators.UnBlockUI());
  const LoadSubmit = (Isload?) => Dispatch(DialogActionCreators.LoadSubmit(Isload));

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
    return Dispatch(DialogActionCreators.OpenDialogSubmitWarning(msgTitle, msg, fn, fnC));
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
  const CloseSubmitWarning = () => Dispatch(DialogActionCreators.CloseDialogSubmitWarning());
  const CloseSubmitWithCondition = () => Dispatch(DialogActionCreators.CloseDialogConfirmWithCondition());

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

function base64toBlob(base64Data, contentType) {
  contentType = contentType || "";
  const sliceSize = 1024;
  const byteCharacters = atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);
  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}

export const ResultAPI = (response: any, DialogFn: any, onFunction: any) => {
  if (!response) {
    if (onFunction) onFunction(null, null);
    return;
  }
  switch (response.status) {
    case APIStatusCode.OK:
    case APIStatusCode.Warning:
    case APIStatusCode.NonAuthoritativeInformation:
      handleFunctionResponeData(onFunction, response);
      break;
    case APIStatusCode.Duplication:
      handleFunctionResponeData(onFunction, response);
      APIResponDuplicate(response, DialogFn);
      break;
    case APIStatusCode.Unauthorized:
      Unauthorize(DialogFn);
      break;
    case APIStatusCode.BadRequest:
    case APIStatusCode.NotFound:
    case APIStatusCode.InternalServerError:
      handleFunctionResponeStatus(onFunction, response);
      APIResponFail(response, DialogFn);
      break;
    case APIStatusCode.MethodNotAllowed:
      handleFunctionResponeStatus(onFunction, response);
      APIMethodFail(DialogFn);
      break;
    default:
      if (!response.data) response.data = response;
      handleFunctionResponeStatus(onFunction, response);
      break;
  }
};

const handleFunctionResponeStatus = (onFunction, response) => {
  if (onFunction) onFunction(response.data, response.status);
};

const handleFunctionResponeData = (onFunction, response) => {
  if (onFunction) onFunction(response.data);
};

export const APIResponFail = (response, DialogFn: any,) => {
  const sMessageRequire = response.data?.sMessage;
  const sMessageTitle = response.data?.title ?? "";
  const sMessage = sMessageRequire ?? sMessageTitle;
  DialogFn.Warning(sMessage);
};

export const APIMethodFail = (DialogFn: any,) => {
  const sMessage = "405 Method Not Allowed";
  DialogFn.Warning(sMessage);
};

export const Unauthorize = (DialogFn: any,) => {
	DialogFn.Errors('Please log in again.', () => { //I18n.SetText(`Message.SessionTimeOut`, I18NextNs.labelComponent)
		// SecureStorage.Clear();
		SecureStorage.Remove(process.env.NEXT_PUBLIC_APP_JWT_KEY);
		setTimeout(() => {
			window.location.pathname = `${process.env.NEXT_PUBLIC_APP_URL}/`;
		}, 500);
	});
};

export const APIResponDuplicate = (response, DialogFn: any,) => {
  const sMessageDup = 'Duplicate'; //I18n.SetText(`Message.Duplicate`, I18NextNs.labelComponent);
  const sMessage = response.data?.sMessage ?? sMessageDup;
  DialogFn.Warning(sMessage);
};

// Define usefnFail function
export const usefnFail = ({ DialogFn }) => (err) => {
  if (err != undefined && !err.response) {
    DialogFn.Warning(err.Message);
    DialogFn.UnBlockUI();
  }
  return { error: err, };
};

// export const usefnSuccessDelete = ({DialogFn: any, getTable, dataRow,}) => () => {
//   getTable(dataRow);
//   DialogFn.Success(I18n.SetText("deletesuccess", I18NextNs.translation));
//   DialogFn.UnBlockUI();
//   return {}
// };