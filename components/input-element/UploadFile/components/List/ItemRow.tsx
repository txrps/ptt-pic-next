import { Fragment, useCallback, useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import FilePopup from "../PopUp/FilePopup";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { BsFillFileEarmarkWordFill } from "react-icons/bs";
import { SiMicrosoftexcel, SiMicrosoftpowerpoint } from "react-icons/si";
import { Checkbox } from "@mui/material";
import No_BG from "@/public/assets/images/no-image-available.png";

import { BtnDelete } from "@/components/mui-elements/Button/ButtonAll";
// import { BtnDelete } from "src/components/Button/ButtonAll";
import { Extension } from "@/enum/enum";

import { useUploadFile } from "../../useUploadFile";

const ItemRow = (props) => {
  const {
    IsCrop,
    cropShape,
    cropRatio,
    cropResize,
    cropMovable,
    IsHide = false,
  } = props;

  const {
    IsMultiDelete,
    disabled,
    IsHiddenUploadBox,
    SendCropImage,
    handleClick,
    isSelected,
    sPopup,
  } = props;

  const { handleClickFile, isOpen, ClosePopUp } = useUploadFile();

  const sProgress = useMemo(() => {
    let sTextprogress = "";
    if (props.sProgress) {
      sTextprogress = props.sProgress + "%";
    } else {
      sTextprogress = props.IsCompleted ? "100%" : "";
    }
    return sTextprogress;
  }, [props.IsCompleted, props.sProgress]);

  return (
    <Fragment>
      <Grid
        container
        justifyContent="flex-start"
        alignItems="center"
        // spacing={0.5}
        className={"mui-style-FileItem"}
        sx={{ position: "relative", paddingBottom: "0" }}
      >
        {!IsHide && (
          <>
            {IsMultiDelete ? (
              <Grid item>
                {props.IsCompleted && !disabled && !IsHiddenUploadBox ? (
                  <Checkbox
                    color="primary"
                    checked={isSelected(props.sSysFileName)}
                    onClick={(event) => {
                      handleClick(props.sSysFileName);
                    }}
                  />
                ) : null}
              </Grid>
            ) : (
              <Grid item>
                {props.IsCompleted &&
                !props.disabled &&
                !props.IsHiddenUploadBox ? (
                  <BtnDelete
                    id={`delete-ontable-${props.sSysFileName}`}
                    IsCircleWithOutText
                    onClick={() => {
                      props.onDelete(props.sSysFileName);
                    }}
                    isBtnUpload={true}
                  />
                ) : (
                  <></>
                )}
              </Grid>
            )}
          </>
        )}
        <Grid item className={"mui-style-ColumnThumbnail"}>
          {DisplaySubFile(props, handleClickFile)}
        </Grid>
        <Grid
          item
          xs
          className={"mui-style-ColumnTitle"}
          onClick={() => handleClickFile(props)}
        >
          <Typography className={"mui-style-Title"}>
            {props.sFileName}
          </Typography>
        </Grid>
        {!IsHide && (
          <>
            {props.sProgress === "100" ? (
              <Grid item>
                {/* <CheckCircleIcon className="icon-pass" /> */}
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Box
                  display="flex"
                  alignItems="center"
                  style={{
                    display:
                      props.IsHiddenUploadBox &&
                      (props.sProgress === "100" ||
                        props.sProgress === undefined)
                        ? "none"
                        : "block",
                  }}
                >
                  <Box width="100%" mr={1}>
                    <LinearProgress
                      variant="determinate"
                      value={parseInt(props.sProgress) || 100}
                    />
                  </Box>
                  <Box minWidth={40}>
                    <Typography variant="body2" color="textSecondary">
                      {sProgress}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            )}
          </>
        )}
      </Grid>
      <FilePopup
        file={props}
        IsopenPopUp={isOpen}
        ClosePopUp={ClosePopUp}
        IsCrop={IsCrop}
        cropShape={cropShape}
        cropRatio={cropRatio}
        cropResize={cropResize}
        cropMovable={cropMovable}
        SendCropImage={SendCropImage}
        setStartVideoOn={props.setStartVideoOn}
        nStartVideoOn={props.nStartVideoOn}
        CannotSkipForward={props.CannotSkipForward}
        onVideoEnd={props.onVideoEnd}
        onDelete={props.onDelete}
        sPopup={sPopup}
      />
    </Fragment>
  );
};

export default ItemRow;

function DisplaySubFile(props: any, onClickFile: any) {
  const onImageError = (e) => {
    e.target.src = No_BG;
  };

  return (
    <>
      {Extension.Image.indexOf(props.sFileType.toLowerCase()) > -1 ? (
        <img
          title={"image-error"}
          src={props.sCropFileLink}
          alt=""
          width={34}
          height={34}
          className="img-shadow"
          onError={onImageError}
          style={{ borderRadius: "50%", margin: "8px" }}
        />
      ) : null}

      {Extension.Video.indexOf(props.sFileType.toLowerCase()) > -1 ? (
        <Tooltip title="">
          <IconButton
            className={"mui-style-WordColor"}
            size="small"
            onClick={() => {
              onClickFile(props);
            }}
          >
            <VideoLibraryIcon className={"mui-style-IConColor"} />
          </IconButton>
        </Tooltip>
      ) : null}

      {Extension.PDF.indexOf(props.sFileType.toLowerCase()) > -1 ? (
        <Tooltip title="">
          <IconButton
            className={"mui-style-PDFColor"}
            size="small"
            onClick={() => {
              onClickFile(props);
            }}
          >
            <PictureAsPdfIcon className={"mui-style-IConColor"} />
          </IconButton>
        </Tooltip>
      ) : null}

      {Extension.Word.indexOf(props.sFileType.toLowerCase()) > -1 ? (
        <Tooltip title="">
          <IconButton
            className={"mui-style-WordColor"}
            size="small"
            onClick={() => {
              onClickFile(props);
            }}
          >
            <BsFillFileEarmarkWordFill className={"mui-style-IConColor"} />
          </IconButton>
        </Tooltip>
      ) : null}

      {Extension.Excel.indexOf(props.sFileType.toLowerCase()) > -1 ? (
        <Tooltip title="">
          <IconButton
            className={"mui-style-ExcelColor"}
            size="small"
            onClick={() => {
              onClickFile(props);
            }}
          >
            <SiMicrosoftexcel className={"mui-style-IConColor"} />
          </IconButton>
        </Tooltip>
      ) : null}

      {Extension.PowerPoint.indexOf(props.sFileType.toLowerCase()) > -1 ? (
        <Tooltip title="">
          <IconButton
            className={"mui-style-PowerPointColor"}
            size="small"
            onClick={() => {
              onClickFile(props);
            }}
          >
            <SiMicrosoftpowerpoint className={"mui-style-IConColor"} />
          </IconButton>
        </Tooltip>
      ) : null}
      {Extension.Text.indexOf(props.sFileType.toLowerCase()) > -1 ? (
        <Tooltip title="">
          <IconButton
            className={"mui-style-TextColor"}
            size="small"
            onClick={() => {
              onClickFile(props);
            }}
          >
            <SiMicrosoftpowerpoint className={"mui-style-IConColor"} />
          </IconButton>
        </Tooltip>
      ) : null}
      {Extension.Email.indexOf(props.sFileType.toLowerCase()) > -1 ? (
        <Tooltip title="">
          <IconButton
            className={"mui-style-MsgColor"}
            size="small"
            onClick={() => {
              onClickFile(props);
            }}
          >
            <SiMicrosoftpowerpoint className={"mui-style-IConColor"} />
          </IconButton>
        </Tooltip>
      ) : null}
      {Extension.Other.indexOf(props.sFileType.toLowerCase()) > -1 ? (
        <Tooltip title="">
          <IconButton
            className={"mui-style-ZipColor"}
            size="small"
            onClick={() => {
              onClickFile(props);
            }}
          >
            <SiMicrosoftpowerpoint className={"mui-style-IConColor"} />
          </IconButton>
        </Tooltip>
      ) : null}
    </>
  );
}
