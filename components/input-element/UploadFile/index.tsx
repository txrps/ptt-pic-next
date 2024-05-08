import { Fragment, useState, useEffect, createContext, useMemo, useCallback } from "react";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import { Button, Popover, Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import axios from "axios";
import DisplayListRow from "./components/List/DisplayListRow";
import { UploadProps } from "./UploadFileProps";
import DisplayGallery from "./components/Gallery/DisplayGallery";
import ModalError from "./components/PopUp/ModalError";
import InfoIcon from "@mui/icons-material/Info";
import { FnComponents, GetUrlApi, I18n, IsNullOrUndefined, ParseHtml, SecureStorage } from "@/lib";

import { I18NextNs, TypeComponent } from "../../../enum/enum";
import "./StyleUploadFile.css";
import { FnDialog } from "@/lib/useAxios";

const checkPosition = (sPositionText) => {
  return sPositionText === "bottom" || sPositionText === "right"
}
export const ProviderUploadFile = createContext(null);
const UploadFileItem = (props: UploadProps) => {
  const {
    id,
    name,
    nCountLimitFile,
    nLimitFile,
    sLimitFile,
    IsFolder,
    IsMultiDelete,
    sPositionText,
    IsSumSizeAll,
    sPopup,
    IsCrop,
    cropShape,
    cropRatio,
    cropResize,
    cropMovable,
    IsHide = false
  } = props;

  const DialogFn = FnDialog();

  const Id = FnComponents.GetId(TypeComponent.Upload, id, name)

  const [arrFileUpload, setarrFileUpload] = useState(
    props.arrFile as any
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [arrExtension, setarrExtension] = useState(
    props.Extension
  );
  const [sAccept, setsAccept] = useState("");
  const [isOpenError, setisOpenError] = useState(false);
  const [arrMessageError, setarrMessageError] = useState([] as any);
  const [IsopenPopUp, setIsopenPopUp] = useState(false);

  //#region useMemo
  const objProvider = useMemo(() => {
    return (
      {
        IsAddDescription: props.IsAddDescription,
        modeUpload: props.modeUpload
      }
    )
  }, [props.IsAddDescription, props.modeUpload])
  //#endregion

  //#region Function

  const SendCropImage = async (sUrl: string, base64: string, sSysFileName: number) => {
    const authToken = SecureStorage.Get(`${process.env.NEXT_PUBLIC_APP_JWT_KEY}`);
    const newParam = "UploadFile/CropImageUploadFile";
    const baseUrl = GetUrlApi();
    const sPathApi = `${baseUrl}api/${newParam}`;
    const url = new URL(sPathApi, window.location.href);
    const PathAPI = url.origin + url.pathname + url.search;

    await axios({
      url: PathAPI,
      method: "post",
      data: {
        sOldPath: sUrl,
        sBase64: base64,
      },
      headers: {
        "Content-Type": "application/json",
        "Authorization": IsNullOrUndefined(authToken) ? "" : `Bearer ${authToken}`,
      },
    })
      .then(function (response) {
        setIsopenPopUp(false);
        let nIdexFile = arrFileUpload.findIndex(f => f.sSysFileName === sSysFileName);

        if (nIdexFile > -1) {
          arrFileUpload[nIdexFile].sCropFileLink = response.data.sCropFileLink;
          arrFileUpload[nIdexFile].sCropPath = response.data.sCropPath;
          setarrFileUpload((e) => [...e]);
        }
      })
      .catch(function (error) {
        console.log("error Crop : ", error);
      });
  };

  const OnThenSendAPI = useCallback((response, itemFile) => {
    if (response.data.IsCompleted) {
      itemFile.IsProgress = false;
      itemFile.sFileLink = response.data.sFileLink;
      itemFile.sCropFileLink = response.data.sCropFileLink;
      itemFile.sCropPath = response.data.sCropPath;
      itemFile.sRootURL = GetUrlApi();
      itemFile.sFolderName = "";
      itemFile.sFileName = response.data.sFileName;
      itemFile.sSysFileName = response.data.sSaveToFileName;
      itemFile.sDescription = "";
      itemFile.IsNewTab = false;
      itemFile.sPath = response.data.sPath;
      itemFile.sSaveToPath = response.data.sSaveToPath;
      itemFile.sCrop = response.data.sUrl;
      itemFile.sUrl = response.data.sUrl;
      itemFile.nID = response.data.nID;
      props.setarrFile((e) => [...e]);
    }
    else if ((response.data.IsCompleted && !response.data.sMsg) || (!response.data.IsCompleted && response.data.sMsg)) {
      let oItemError = {
        ...itemFile,
        sFileName: itemFile.sFileName,
        Cause: itemFile.sMsg,
      };
      setarrMessageError((value) => [
        ...value,
        ...[oItemError],
      ]);
    }
  }, [props]);

  const SendAPIFile = useCallback(async (itemFile, index = 1) => {
    if (!itemFile.IsCompleted) {
      const formPayload = new FormData();
      itemFile.IsProgress = true;
      itemFile.sProgress = "0";
      formPayload.append("file", itemFile);
      if (props.dataID) {
        formPayload.append("dataID", props.dataID);
      }
      try {

        let nWidthResize = props.WidthResize;
        if (props.IsCheckRecommendSize) {
          nWidthResize = props.nRecommendWidth;
        }

        let nHeigthResize = props.HeigthResize;
        if (props.IsCheckRecommendSize) {
          nHeigthResize = props.nRecommendHeight;
        }

        DialogFn.BlockUI();
        const authToken = SecureStorage.Get(`${process.env.NEXT_PUBLIC_APP_JWT_KEY}`);
        let defaultAPIUpload = "Common/UploadFileToTemp";
        let newParam = props.apiPath ? props.apiPath : defaultAPIUpload;
        const baseUrl = GetUrlApi();
        const sPathApi = `${baseUrl}api/${newParam}`;
        const url = new URL(sPathApi, window.location.href);
        const PathAPI = url.origin + url.pathname + url.search;

        await axios({
          url: PathAPI,
          method: "post",
          data: formPayload,
          params: {
            modeUpload: props.modeUpload,
            sFolderTemp: props.sFolderTemp,
            isResize: props.IsResize ?? false, //Image Only
            nWidthResize: nWidthResize,
            nHeigthResize: nHeigthResize,
            nIndex: index,
            IsCheckRecommendSize: props.IsCheckRecommendSize,
          },
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": IsNullOrUndefined(authToken) ? "" : `Bearer ${authToken}`,
          },
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percentageProgress = Math.floor((loaded / total) * 100);
            itemFile.sProgress = percentageProgress + "";
            itemFile.IsCompleted = false;
            props.setarrFile((e) => [...e]);
          },
        })
          .then(function (response) {
            DialogFn.UnBlockUI();
            itemFile.sMsg = response.data.sMsg;
            itemFile.IsCompleted = response.data.IsCompleted;

            OnThenSendAPI(response, itemFile)
          })
          .catch(function (error) {
            itemFile.IsProgress = false;
            itemFile.IsCompleted = false;
            let oItemError = {
              sFileName: itemFile.sFileName,
              Cause: error.message,
            };
            setarrMessageError((value) => [
              ...value,
              ...[oItemError],
            ]);
          });
      }
      catch (error) {
        itemFile.IsProgress = false;
        itemFile.IsCompleted = false;
        let oItemError = {
          sFileName: itemFile.sFileName,
          Cause: "Error",
        };
        setarrMessageError((value) => [...value, ...[oItemError]]);
      }
    }
    return itemFile;
  }, [DialogFn, OnThenSendAPI, props]);

  const onDeleteFileInLocation = useCallback(async (sSysFileName: string) => {
    let oFileID = arrFileUpload.filter((f) => f.sSysFileName === sSysFileName);
    if (oFileID.length > 0) {
      let sPath = oFileID[0].sPath + oFileID[0].sSysFileName;
      let Param = {
        sPath: sPath,
        sMode: props.modeUpload
      };
      const authToken = SecureStorage.Get(`${process.env.NEXT_PUBLIC_APP_JWT_KEY}`);
      const baseUrl = GetUrlApi();
      const sPathApi = `${baseUrl}api/Common/DeleteInTemp`;
      const url = new URL(sPathApi, window.location.href);
      const PathAPI = url.origin + url.pathname + url.search;

      axios({
        url: PathAPI,
        method: "post",
        params: Param,
        headers: {
          Authorization: IsNullOrUndefined(authToken) ? "" : `Bearer ${authToken}`,
        },
      });
    }
  }, [arrFileUpload, props.modeUpload])

  const clearNotUploadFile = useCallback(() => {
    //Delete arrFile
    let arrTemp = arrFileUpload.filter((f) => f.IsCompleted === true);
    setarrFileUpload(arrTemp);
  }, [arrFileUpload]);

  const onCheckCountFile = useCallback((lstFileforAdd = []) => {
    let IsPass = true;
    let arrOld = [...arrFileUpload]
    let nAllFile = arrOld.length + lstFileforAdd.length;
    if (nCountLimitFile && nCountLimitFile < nAllFile) {
      IsPass = false;
    }
    return IsPass;
  }, [arrFileUpload, nCountLimitFile])

  const handleClickFile = async (arrFileItem) => {
    let arrTemp = [];
    arrFileUpload.forEach((val) => arrTemp.push({ ...val }));
    arrTemp = [...arrTemp, ...arrFileItem];

    let IsPass = true;
    await Promise.all(
      arrFileItem.map(async (itemFile, ind: number) => {
        if (!itemFile.IsCompleted && itemFile.IsNew) {
          await SendAPIFile(itemFile, ind);
          let isCheckCon =
            ((itemFile.IsCompleted === false && itemFile.sMsg !== "") ||
              (itemFile.IsCompleted === false &&
                itemFile.IsProgress === false)) &&
            IsPass === true;

          if (isCheckCon) {
            IsPass = false;
          }
        }
      })
    );

    let dataComplete = arrFileItem.filter(
      (f) => f.IsCompleted === true
    );
    setarrFileUpload(dataComplete);
    props.setarrFile(dataComplete);
    if (!IsPass) {
      setisOpenError(true);
    }
  };

  const handleClickDeleteFile = useCallback((sSysFileName: string, isPopUp = true) => {
    if (isPopUp) {
      DialogFn.Submit(I18n.SetText("Message.ConfirmDelete", I18NextNs.labelComponent), () => {
        DialogFn.Success(I18n.SetText("Message.DeleteComplete", I18NextNs.labelComponent));
        DialogFn.CloseSubmit();
        DialogFn.UnBlockUI();
        let arrNew = arrFileUpload.filter((w) => w.sSysFileName !== sSysFileName);
        setarrFileUpload(arrNew);
        // Axios Delete File
        onDeleteFileInLocation(sSysFileName);
        props.setarrFile(arrNew);
      });
    } else {
      let arrNew = arrFileUpload.filter((w) => w.sSysFileName !== sSysFileName);
      setarrFileUpload(arrNew);
      // Axios Delete File
      onDeleteFileInLocation(sSysFileName);
      props.setarrFile(arrNew);
    }
  }, [DialogFn, arrFileUpload, onDeleteFileInLocation, props]);

  const handleClickDeleteAllFile = useCallback(() => {
    setarrFileUpload([]);
    props.setarrFile([]);
  }, [props]);

  const _addDirectory = (node) => {
    if (node) {
      node.webkitdirectory = true;
      node.directory = true;
    }
  };

  const onHandleUploadFolder = async (e) => {
    setAnchorEl(null);
    setarrMessageError([]);

    let isPassCount = onCheckCountFile(e.target.files)
    if (!isPassCount) {
      //Not pass
      DialogFn.Warning(`${I18n.SetText("Message.MinUploadFile", I18NextNs.labelComponent)} ${nCountLimitFile} ${I18n.SetText("Message.FileOnly", I18NextNs.labelComponent)}`);
    }
    else {

      let arrTemp = [];
      arrFileUpload.forEach((val) => arrTemp.push({ ...val }));
      GetCheckFileFromFolder(e, arrTemp);
      e.target.files = null;

      let IsPass = true;

      arrTemp.forEach((item) => {
        let sFileType = item.sFileType.toLowerCase();
        let IsMapTypeError = arrExtension.indexOf(sFileType) === -1;
        if (IsMapTypeError) {
          IsPass = false;
        }
      });
      if (!IsPass) {
        clearNotUploadFile();
        e.preventDefault();
        DialogFn.Warning(I18n.SetText("UploadFile.OnlyFile", I18NextNs.labelComponent) + sAccept + " !");
      } else {
        setarrFileUpload(arrTemp);
        await handleClickFile(arrTemp);
      }
    }
  }

  const GetCheckFileFromFolder = (e, arrTemp: any[]) => {
    for (const element of e.target.files) {
      let nSizeFile = parseInt(
        (element.size / 1000000).toFixed(1)
      );
      if (nSizeFile > nLimitFile) {
        e.preventDefault();
        DialogFn.Warning(`${I18n.SetText("UploadFile.MaximumSize", I18NextNs.labelComponent)} ${nLimitFile} ${sLimitFile}.`);
        return false;
      }
    }

    for (let i = 0; i < e.target.files.length; i++) {
      const d = new Date();
      let genID = d.getMinutes() + d.getSeconds() + d.getMilliseconds() + "";

      let objFile = e.target.files[i];
      let nSizeFile = parseInt((objFile.size / 1000000).toFixed(1));

      objFile.sFileName = e.target.files[i].name;
      objFile.sSysFileName = i + "_" + genID;
      objFile.IsCompleted = false;
      objFile.IsProgress = true;
      objFile.sSizeName = nSizeFile + "MB";
      objFile.nSizeName = objFile.size;
      objFile.sFolderName = objFile.webkitRelativePath !== "" ? objFile.webkitRelativePath.replace("/" + objFile.sFileName, "")
        : "";
      objFile.sProgress = "0";
      let arrfilename = (objFile.sFileName + "").split(".");
      objFile.sFileType =
        arrfilename[arrfilename.length - 1].toLowerCase();
      objFile.IsNew = true;
      objFile.sCropFileLink = "";
      objFile.sCropPath = "";
      arrTemp.push(objFile);
    }

  }

  const onHandleUploadFile = async (e) => {
    setAnchorEl(null);
    setarrMessageError([]);
    let nSizeFileType = 1000000;
    if (sLimitFile === "GB") {
      nSizeFileType = 1000000000;
    }
    let arrTemp = [];
    let nSizeFileAll = 0;

    let isPassCount = onCheckCountFile(e.target.files)
    if (!isPassCount) {
      // `${I18n.SetText("Message.MinUploadFile", I18NextNs.labelComponent)} ${nCountLimitFile} ${I18n.SetText("Message.FileOnly", I18NextNs.labelComponent)}`
      DialogFn.Warning(`${I18n.SetText("Message.MinUploadFile", I18NextNs.labelComponent)} ${nCountLimitFile} ${I18n.SetText("Message.FileOnly", I18NextNs.labelComponent)}`);
    }
    else {
      arrFileUpload.forEach((val) => {
        let size = val.size ?? val.nSizeName; //nSizeName for set new state size hidden
        nSizeFileAll += parseFloat((size / nSizeFileType).toFixed(1));
        arrTemp.push({ ...val });
      });


      let isPassSize = GetCheckSizeFileHandle(e, nSizeFileType, nSizeFileAll);
      if (!isPassSize) {
        return false;
      }
      GetCheckFileInputHandle(e.target.files, arrTemp, nSizeFileType);

      e.target.files = null;


      let { IsPass, IsPassName, IsPassNameOthre } = CheckStatusFile(arrTemp);

      if (!IsPass) {
        clearNotUploadFile();
        e.preventDefault();
        // I18n.SetText("UploadFile.OnlyFile", I18NextNs.labelComponent) + sAccept + " !"
        DialogFn.Warning(I18n.SetText("UploadFile.OnlyFile", I18NextNs.labelComponent) + sAccept + " !");
      } else if (!IsPassName && !IsNullOrUndefined(props.sFileName)) {
        clearNotUploadFile();
        e.preventDefault();
        DialogFn.Warning(`${I18n.SetText("UploadFile.UploadFile", I18NextNs.labelComponent)}"` + props.sFileName + `" ${I18n.SetText("UploadFile.Only", I18NextNs.labelComponent)}`);
      } else if (IsNullOrUndefined(props.sFileName)) {
        CheckIsPassNameOther(e, IsPassNameOthre, arrTemp)
      } else {
        setarrFileUpload(arrTemp);
        await handleClickFile(arrTemp);
      }
    }
  };

  const CheckIsPassNameOther = async (e, IsPassNameOthre, arrTemp) => {
    if (!IsPassNameOthre) {
      clearNotUploadFile();
      e.preventDefault();
      DialogFn.Warning(`${I18n.SetText("UploadFile.FilenameSession", I18NextNs.labelComponent)}`);
    } else {
      setarrFileUpload(arrTemp);
      await handleClickFile(arrTemp);
    }
  }

  /** check size File Extract from method onHandleUploadFile */
  const GetCheckSizeFileHandle = (e, nSizeFileType: number, nSizeFileAll: number) => {
    for (const element of e.target.files) {
      let nSizeFile = parseFloat(
        (element.size / nSizeFileType).toFixed(1)
      );
      nSizeFileAll += nSizeFile;
      if (IsSumSizeAll && nSizeFileAll > nLimitFile) {
        e.preventDefault();
        DialogFn.Warning(`${I18n.SetText("UploadFile.TotalSize", I18NextNs.labelComponent)} ${nLimitFile} ${sLimitFile}.`);
        return false;
      } else if (nSizeFile > nLimitFile) {
        e.preventDefault();
        DialogFn.Warning(`${I18n.SetText("UploadFile.MaximumSize", I18NextNs.labelComponent)} ${nLimitFile} ${sLimitFile}.`);
        return false;
      }
    }
    return true;
  }
  /** Get file and Prepare for uploadFile Extract from method onHandleUploadFile */
  const GetCheckFileInputHandle = (eValue, arrTemp: any[], nSizeFileType: number) => {
    for (let i = 0; i < eValue.length; i++) {
      const dNow = new Date();
      let genID = dNow.getMinutes() + dNow.getSeconds() + dNow.getMilliseconds() + "";
      let objFile = eValue[i];
      let sSizeFile = (objFile.size / nSizeFileType).toFixed(1);

      let sFolder = "";
      if (objFile.webkitRelativePath) {
        sFolder = objFile.webkitRelativePath.replace("/" + objFile.sFileName, "");
      }

      objFile.sFileName = eValue[i].name;
      objFile.sSysFileName = i + "_" + genID;
      objFile.IsCompleted = false;
      objFile.IsProgress = true;
      objFile.sSizeName = sSizeFile + "MB";
      objFile.nSizeName = objFile.size;
      objFile.sFolderName = sFolder;
      objFile.sProgress = "0";

      let arrfilename = (objFile.sFileName + "").split(".");
      objFile.sFileType =
        arrfilename[arrfilename.length - 1].toLowerCase();
      objFile.IsNew = true;
      arrTemp.push(objFile);
    }
  }

  const CheckStatusFile = (arrTemp: any[]) => {
    let IsPass = true, IsPassName = true, IsPassNameOthre = true;

    arrTemp.forEach((item) => {
      let sFileType = item.sFileType.toLowerCase();
      let IsMapTypeError = arrExtension.indexOf(sFileType) === -1;
      if (IsMapTypeError) {
        IsPass = false;
      }
      let arrFileName = item.sFileName.split("_");
      if (!IsNullOrUndefined(props.sFileName)) {
        if (arrFileName.length > 2) {
          if (!IsNullOrUndefined(props.sFileName) && arrFileName[0].toLowerCase() !== props.sFileName.toLowerCase()) {
            IsPassName = false;
          }
          else if (arrFileName[0].toLowerCase() === "sessions") {
            IsPassNameOthre = false;
          }
        } else {
          IsPassName = false;
        }
      } else if (arrFileName[0].toLowerCase() === "sessions") {
        IsPassNameOthre = false;
      }
    });
    return { IsPass, IsPassName, IsPassNameOthre };
  }

  const handleClick = useCallback((event) => {
    if (
      (!props.IsFolder && props.IsMultiple) ||
      (!props.IsFolder && !props.IsMultiple)
    ) {
      let DOMfile = document.getElementById(
        "contained-button-file" + Id
      );
      if (DOMfile) {
        DOMfile.click();
      }
    } else if (props.IsFolder && !props.IsMultiple) {
      let DOMfolder = document.getElementById(
        "contained-button-file-folder" + Id
      );
      if (DOMfolder) {
        DOMfolder.click();
      }
    } else {
      setAnchorEl(event.currentTarget);
    }
  }, [props.IsFolder, props.IsMultiple, Id]);

  //#endregion

  //#region
  const JsxButtonUpload = useCallback(() => {
    return (
      <Grid
        container
        direction={props.IsDragDrop ? "column" : "row"}
        justifyContent="flex-start"
        alignItems="center"
        style={
          props.IsHiddenUploadBox
            ? { display: "none" }
            : {
              paddingTop: "0px",
              textAlign: "left",
            }
        }
      >
        <Grid item xs={12} sm={"auto"} sx={{ paddingRight: "20px" }}>
          <Grid container direction="row" spacing={1} alignItems="center">
            <Grid
              item
              sx={{
                paddingLeft: props.IsDragDrop ? "35% !important" : "",
              }}
            >
              <Button
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                size="small"
                onClick={handleClick}
                startIcon={props.icon ?? <CloudUploadIcon />}
                disabled={
                  (props.IsMultiple !== true && arrFileUpload.length > 0) ||
                  props.disabled
                }
                className={"btn-uploadfile " + props.className}
                title={
                  sPositionText === "button"
                    ? I18n.SetText("UploadFile.AllowFile", I18NextNs.labelComponent) +
                    sAccept +
                    I18n.SetText("UploadFile.limitFileUpto", I18NextNs.labelComponent) +
                    nLimitFile +
                    " " +
                    sLimitFile
                    : ""
                }
              >
                {props.labelButton ?? I18n.SetText("UploadFile.UploadFile", I18NextNs.labelComponent)}
              </Button>
            </Grid>
            {checkPosition(sPositionText) && (
              <Grid item xs={12} sm={sPositionText === "right" ? "auto" : 12}>
                <Typography variant="caption">
                  ไฟล์ : {`${sAccept}`}
                  {/* {`${I18n.SetText("UploadFile.AllowedType", I18NextNs.labelComponent)}: ${sAccept}`} */}
                </Typography>
                <br />
                <Typography variant="caption">
                  ขนาด : {`${nLimitFile} ${sLimitFile}`}
                  {/* {`${I18n.SetText("UploadFile.LimitSize", I18NextNs.labelComponent)} ${nLimitFile} ${sLimitFile}`} */}
                </Typography>
                {props.nRecommendWidth && props.nRecommendHeight ? (
                  <>
                    <br />
                    <Typography variant="caption">
                      {`${I18n.SetText("UploadFile.RecommendedImage", I18NextNs.labelComponent)} 
											${props.nRecommendWidth} x ${props.nRecommendHeight}  pixels`}
                    </Typography>
                  </>
                ) : null}
                {props.sRemark ? (
                  <>
                    <br />
                    <Typography variant="caption">{props.sRemark}</Typography>
                  </>
                ) : null}
              </Grid>
            )}

            {sPositionText === "icon" && (
              <Grid item>
                <Tooltip
                  title={ParseHtml(
                    `${I18n.SetText("UploadFile.AllowedType", I18NextNs.labelComponent)} ${sAccept} <br/>  ${I18n.SetText("UploadFile.LimitSize", I18NextNs.labelComponent)} ${nLimitFile} ${sLimitFile}`
                  )}
                >
                  <InfoIcon
                    style={{
                      color: "#000000",
                      fontSize: "30px",
                    }}
                  />
                </Tooltip>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  }, [arrFileUpload.length, handleClick, nLimitFile, props.IsDragDrop, props.IsHiddenUploadBox, props.IsMultiple, props.disabled, props.nRecommendHeight, props.nRecommendWidth, props.sRemark, sAccept, sLimitFile, sPositionText]);
  //#endregion

  //#region useEffect

  useEffect(() => {
    let arrTemp = [];
    if (arrExtension) {
      arrTemp = arrExtension;
      setarrExtension(arrTemp);
    }

    let sAcceptTemp = "";
    arrTemp.forEach((f) => {
      if (sAcceptTemp !== "") {
        sAcceptTemp += ", ";
      }
      sAcceptTemp += "." + f;
    });
    setsAccept(sAcceptTemp);

  }, [arrExtension]);

  useEffect(() => {
    if (props.onClearFile) {
      props.onClearFile.current = () => {
        handleClickDeleteAllFile();
      };
    }
  }, [handleClickDeleteAllFile, props.onClearFile]);


  useEffect(() => {
    if (props.isFileChange || (arrFileUpload.length === 0 && props.arrFile.length > 0)) {
      setarrFileUpload(props.arrFile);
    }
  }, [arrFileUpload.length, props.arrFile, props.isFileChange]);

  //#endregion

  return (
    <Fragment>
      {props.label && (
        <Typography>
          <span
            style={{
              fontWeight: 400,
              fontSize: "1em",
              color: "rgba(0, 0, 0, 0.6)",
            }}
          >
            {props.label}
          </span>
          {props.required && (
            <span style={{ color: "red" }}> *</span>
          )}
          {props.sSubTitle && (
            <span style={{ fontSize: "13px", color: "#B3B3B3" }}>
              {props.sSubTitle}
            </span>
          )}
        </Typography>
      )}
      {!IsHide && (
        <Grid
          container
          justifyContent="flex-start"
          alignItems="center"
          style={
            props.IsHiddenUploadBox
              ? { display: "none" }
              : { paddingTop: "0px" }
          }
        >
          <Grid item xs={12}>
            {JsxButtonUpload()}
          </Grid>
        </Grid>
      )}

      <ProviderUploadFile.Provider
        value={objProvider}
      >
        <Grid container spacing={2}>


          {props.modeDisplay === "gallery" && arrFileUpload.length > 0 &&
            <Grid item xs={12} style={{ marginTop: "8px" }}>
              <DisplayGallery
                arrFile={arrFileUpload}
                onDelete={handleClickDeleteFile}
                disabled={props.disabled}
                onOpenFile={props.onOpenFile}
                IsCrop={IsCrop}
                cropShape={cropShape}
                cropRatio={cropRatio}
                cropResize={cropResize}
                cropMovable={cropMovable}
                IsHiddenUploadBox={props.IsHiddenUploadBox}
                setStartVideoOn={props.setStartVideoOn}
                nStartVideoOn={props.nStartVideoOn}
                CannotSkipForward={props.CannotSkipForward}
                onVideoEnd={props.onVideoEnd}
                IsopenPopUp={IsopenPopUp}
                setIsopenPopUp={setIsopenPopUp}
                SendCropImage={SendCropImage}
                IsMultiDelete={IsMultiDelete}
                sPopup={sPopup}
              />
            </Grid>
          }
          {/* {props.modeDisplay === "list" && arrFileUpload.length > 0 &&
            <Grid item xs={12}>
              <DisplayListRow
                arrFile={arrFileUpload}
                SetarrFile={setarrFileUpload}
                onDelete={handleClickDeleteFile}
                IsCanDel={props.IsCanDel ? props.IsCanDel : true}
                IsDrag={props.IsDrag || false}
                disabled={props.disabled}
                onOpenFile={props.onOpenFile}
                IsCrop={IsCrop}
                cropShape={cropShape}
                cropRatio={cropRatio}
                cropResize={cropResize}
                cropMovable={cropMovable}
                IsHiddenUploadBox={props.IsHiddenUploadBox}
                setStartVideoOn={props.setStartVideoOn}
                nStartVideoOn={props.nStartVideoOn}
                CannotSkipForward={props.CannotSkipForward}
                onVideoEnd={props.onVideoEnd}
                IsopenPopUp={IsopenPopUp}
                SendCropImage={SendCropImage}
                setIsopenPopUp={setIsopenPopUp}
                onDeleteFileInLocation={onDeleteFileInLocation}
                IsMultiDelete={IsMultiDelete}
                sPopup={sPopup}
                IsHide={IsHide}
              />
            </Grid>
          } */}
        </Grid>
      </ProviderUploadFile.Provider>

      <Popover
        open={Boolean(anchorEl)}
        onClose={() => {
          setAnchorEl(null);
        }}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {IsFolder ? (
          <MenuItem style={{ padding: " 8px 16px" }}>
            <label
              htmlFor={"contained-button-file-folder" + Id}
              style={{
                width: "100%",
                display: "contents",
                cursor: "pointer",
              }}
            >
              <ListItemIcon style={{ cursor: "pointer" }}>
                <DriveFolderUploadIcon
                  className={"mui-style-IConColor"}
                />
              </ListItemIcon>
              <ListItemText
                primary="Folder Upload"
                style={{ cursor: "pointer" }}
              />
            </label>
          </MenuItem>
        ) : null}
        {props.IsMultiple ||
          (props.IsMultiple !== true && arrFileUpload.length === 0) ? (
          <MenuItem style={{ padding: " 8px 16px" }}>
            <label
              htmlFor={"contained-button-file" + Id}
              style={{
                width: "100%",
                display: "contents",
                cursor: "pointer",
              }}
            >
              <ListItemIcon style={{ cursor: "pointer" }}>
                <UploadFileIcon className={"mui-style-IConColor"} />
              </ListItemIcon>
              <ListItemText
                primary="File Upload"
                style={{ cursor: "pointer" }}
              />
            </label>
          </MenuItem>
        ) : null}
      </Popover>
      <input
        id={"contained-button-file-folder" + Id}
        name={"contained-button-file-folder" + Id}
        onChange={async (e) => {
          onHandleUploadFolder(e);
        }}
        onClick={(e: any) => {
          e.target.value = "";
        }}
        ref={(node) => _addDirectory(node)}
        multiple
        type="file"
        hidden
        accept={sAccept}
      />
      <input
        id={"contained-button-file" + Id}
        name={"contained-button-file" + Id}
        multiple={props.IsMultiple}
        type="file"
        hidden
        onChange={async (e) => {
          onHandleUploadFile(e);
        }}
        onClick={(e: any) => {
          e.target.value = "";
        }}
        accept={sAccept}
      />
      <ModalError
        open={isOpenError}
        setOpen={setisOpenError}
        arrDataError={arrMessageError}
        nRowperpageTable={props.nRowperpageTable}
      />
    </Fragment>
  );
};
export default UploadFileItem;