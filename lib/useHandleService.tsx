import axios from "axios";
import {
  GetAntiforgeryToken,
  GetUrlApi,
  IsNullOrUndefined,
  ResultAPI,
  SecureStorage,
} from "./utils";
import { useDialog } from "./useDialog";

type SuccessCallback = (response) => void;
type ErrorCallback = (errorResponse) => void;

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

export const useHandleService = () => {
  const { Warning, Errors } = useDialog();

  const Get = async (
    sWebMethodName: string,
    ParamJSON: any,
    fnSuccess?: SuccessCallback,
    fnError?: ErrorCallback
  ) => {
    const authToken = SecureStorage.Get(
      process.env.NEXT_PUBLIC_APP_JWT_KEY || ""
    );
    const ConfigHeader = {
      Authorization: IsNullOrUndefined(authToken) ? "" : `Bearer ${authToken}`,
    };

    const baseUrl = GetUrlApi();
    const sPathApi = `${baseUrl}api/${sWebMethodName}`;
    const url = new URL(sPathApi);
    const PathAPI = url.toString();

    try {
      const response = await axios.get(PathAPI, {
        headers: ConfigHeader,
        params: ParamJSON,
      });
      ResultAPI(response, fnSuccess, Warning, Errors);
      fnSuccess(response.data);
    } catch (error) {
      ResultAPI(error.response, fnError, Warning, Errors);
      const message = error.response ? error.response.data : error.message;
      if (fnError) {
        fnError(message);
      }
    }
  };

  const Post = async (
    sWebMethodName: string,
    ParamJSON: any,
    fnSuccess?: SuccessCallback,
    fnError?: ErrorCallback
  ) => {
    const objAntiforgeryToken = (await GetAntiforgeryToken()) as any;
    if (objAntiforgeryToken.isPass) {
      const source = axios.CancelToken.source();
      const authToken = SecureStorage.Get(
        process.env.NEXT_PUBLIC_APP_JWT_KEY || ""
      );
      const baseUrl = GetUrlApi();
      const sPathApi = `${baseUrl}api/${sWebMethodName}`;
      const url = new URL(sPathApi);
      const PathAPI = url.toString();

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

      try {
        const response = await axios.post(PathAPI, ParamJSON, {
          headers: ConfigHeader,
          cancelToken: source.token,
        });
        ResultAPI(response, fnSuccess, Warning, Errors);
        fnSuccess(response.data);
      } catch (error) {
        ResultAPI(error.response, fnError, Warning, Errors);
      }
    }
  };

  const DownloadFile = async (
    sWebMethodName: string,
    ParamJSON: any,
    fileName: string,
    fnSuccess?,
    fnError?,
    BlockUI?: any,
    UnBlockUI?: any
  ) => {
    if (BlockUI) BlockUI();

    const authToken = SecureStorage.Get(
      `${process.env.NEXT_PUBLIC_APP_JWT_KEY}`
    );
    const baseUrl = GetUrlApi();
    const sPathApi = `${baseUrl}api/${sWebMethodName}`;
    const url = new URL(sPathApi);
    const PathAPI = url.toString();

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
          ResultAPI(errors.response, fnError, Warning, Errors);
        } else if (fnError) {
          fnError();
        }
      })
      .then(() => {
        if (UnBlockUI) UnBlockUI();
      });
  };

  return { Get, Post, DownloadFile };
};
