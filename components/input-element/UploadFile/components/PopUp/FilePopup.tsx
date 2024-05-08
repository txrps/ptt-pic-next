import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  ButtonGroup,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import ReactPlayer from "react-player";
import Carousel from "react-gallery-carousel";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import CropRoundedIcon from "@mui/icons-material/CropRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import Cropper from "react-cropper";
import { Transition } from "../StyleCpnExport";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

import { BtnBaseButton, BtnCancel, BtnConfirm } from "@/components/mui-elements/Button/ButtonAll";

import { Extension, I18NextNs } from '@/enum/enum';

import "react-gallery-carousel/dist/index.css";
import "cropperjs/dist/cropper.css";
import { I18n } from "@/lib";


export default function FilePopup(props) {
  const {
    SendCropImage,
    IsopenPopUp,
    sPopup,
    IsCrop,
    cropShape,
    cropRatio,
    cropResize,
    cropMovable,
  } = props;

  const cropperRef = useRef(null);

  const [lstDocumentFile, setlstDocumentFile] = useState([] as any);
  const [image, setImage] = useState<string>("");
  const [indexlstImage, setindexlstImage] = useState(0);
  const [isCrop, setisCrop] = useState(false);

  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef({} as any);
  const [nPlayedTime, setPlayedTime] = useState(props.nStartVideoOn || 0);
  const [isShowAlert, setIsShowAlert] = useState(false);

  const lstImage = useMemo(() => {
    let lstSrc = [] as any;
    if (props.arrFile && props.isGallery) {
      props.arrFile.forEach((element) => {
        if (
          Extension.Image.indexOf(element.sFileType) > -1 &&
          element.sFileLink
        ) {
          let sSrc = element.sFileLink;
          lstSrc.push({ src: sSrc, sFileName: element.sFileName });
        }
      });
    }
    return lstSrc;
  }, [props.arrFile, props.isGallery]);

  const DownloadOriginal = useCallback(() => {
    let IsVideo = Extension.Video.indexOf(props.file.sFileType) > -1;

    let sImage =
      props.isGallery && !IsVideo ? lstImage[indexlstImage]?.src : image;
    let sFileName =
      props.isGallery && !IsVideo
        ? lstImage[indexlstImage]?.sFileName
        : props.file.sFileName;

    console.log("sImage", sImage);
    console.log("sFileName", sFileName);
  }, [
    image,
    indexlstImage,
    lstImage,
    props.file.sFileName,
    props.file.sFileType,
    props.isGallery,
  ]);

  const onReady = useCallback(() => {
    if (!isReady) {
      if (props.nStartVideoOn) {
        const timeToStart = props.nStartVideoOn;
        playerRef.current.seekTo(timeToStart, "seconds");
      }
      setIsReady(true);
    }
  }, [isReady, props.nStartVideoOn]);

  const onClosePopup = useCallback(() => {
    if (props.setStartVideoOn) {
      props.setStartVideoOn(nPlayedTime);
    }
    props.ClosePopUp();
  }, [nPlayedTime, props]);

  const onCloseAlert = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setIsShowAlert(false);
  };

  const onActionAlert = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={onCloseAlert}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  const onSetCrop = useCallback(() => {
    let sPath = "";
    if (props.file?.sFileLink) {
      let sFileLink = props.file.sFileLink + "";
      sPath = sFileLink;
      setImage(sPath);
      setisCrop(true);
    }
  }, [props.file.sFileLink]);

  const onSubmitCrop = useCallback(async () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    if (cropper && props.file) {
      if (cropper.getCroppedCanvas()) {
        const base64 = cropper.getCroppedCanvas().toDataURL();
        SendCropImage(props.file.sUrl, base64, props.file.nFile_ID);
        setisCrop(false);
      }

    }
    onClosePopup();
  }, [SendCropImage, onClosePopup, props.file.sSysFileName, props.file.sUrl]);

  const rotate = useCallback(() => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    if (cropper) {
      cropper.rotate(90);
    }
  }, []);

  const deleteInDialog = useCallback(() => {
    props.onDelete(props.file.sSysFileName, false);
    onClosePopup();
  }, [onClosePopup, props]);

  const ContentTypeGallery = useCallback(() => {
    return (
      <Grid item xs={12}>
        <Carousel
          className="div-gallery"
          images={lstImage}
          key={"crs-image"}
          canAutoPlay={false}
          isAutoPlaying={true}
          autoPlayInterval={3000}
          index={props.indexActive}
          onIndexChange={({ curIndex, curIndexForDisplay }) => {
            setindexlstImage(curIndex);
          }}
          leftIcon={
            <span
              className="icon-text"
              role="img"
              aria-label="left"
              style={{
                fontSize: "min(50px, 5vw)",
              }}
            >
              ◀️
            </span>
          }
          rightIcon={
            <span
              className="icon-text"
              role="img"
              aria-label="right"
              style={{
                fontSize: "min(50px, 5vw)",
              }}
            >
              ▶️
            </span>
          }
        />
      </Grid>
    );
  }, [lstImage, props.indexActive]);

  const onProgressVideo = useCallback(
    (playedSeconds) => {
      let nProgress = playedSeconds.playedSeconds || 0;
      if (props.CannotSkipForward) {
        if (nProgress > nPlayedTime) {
          if (nProgress - nPlayedTime < 2) {
            setPlayedTime(nProgress);
          }
        }
      } else {
        setPlayedTime(nProgress);
      }
    },
    [nPlayedTime, props.CannotSkipForward]
  );

  const onSeekVideo = useCallback(
    (nSeekTo) => {
      if (props.CannotSkipForward) {
        if (nSeekTo > nPlayedTime) {
          playerRef.current.seekTo(nPlayedTime, "seconds");
          setIsShowAlert(true);
        }
      }
      if (props.onVideoEnd) {
        props.onVideoEnd(false);
      }
    },
    [nPlayedTime, props]
  );

  const ContentTypeFileVideo = useCallback(() => {
    return (
      <div className="player-wrapper">
        <ReactPlayer
          ref={playerRef}
          config={{
            file: {
              attributes: { controlsList: "nodownload" },
            },
          }}
          className="react-player"
          url={image}
          width="100%"
          height="100%"
          playing={true}
          controls={true}
          pip={true}
          stopOnUnmount={true}
          onProgress={(playedSeconds) => {
            onProgressVideo(playedSeconds);
          }}
          onReady={onReady}
          onSeek={(nSeekTo) => {
            onSeekVideo(nSeekTo);
          }}
          onEnded={() => {
            if (props.onVideoEnd) {
              props.onVideoEnd(true);
            }
          }}
        />
      </div>
    );
  }, [image, onProgressVideo, onReady, onSeekVideo, props]);

  const ContentTypeFile = useCallback(() => {
    return (
      <>
        {Extension.Image.indexOf(props.file.sFileType) > -1 && (
          <Grid item xs={12} style={{ display: "flex" }}>
            {isCrop ? (
              <Cropper
                src={image}
                id="images"
                zoomTo={0.1945}
                aspectRatio={cropRatio}
                minCropBoxHeight={200}
                minCropBoxWidth={200}
                viewMode={3}
                className={
                  cropShape === "retangle"
                    ? "image-modal"
                    : "image-modal circle-crop"
                }
                guides={true}
                highlight={true}
                zoomOnTouch={false}
                zoomOnWheel={false}
                cropBoxMovable={cropMovable}
                zoomable={true}
                cropBoxResizable={cropResize}
                responsive={true}
                ref={cropperRef}
              />
            ) : (
              <img src={image} alt="" className="image-modal" />
            )}
          </Grid>
        )}
        {Extension.Video.indexOf(props.file.sFileType) > -1 && (
          <Grid item xs={12}>
            {ContentTypeFileVideo()}
          </Grid>
        )}
        {Extension.PDF.indexOf(props.file.sFileType) > -1 && (
          <Grid item xs={12}>
            {/* <DocViewer
                documents={lstDocumentFile}
                pluginRenderers={DocViewerRenderers}
                config={{
                  header: {
                    disableHeader: false,
                    disableFileName: false,
                    retainURLParams: false,
                  },
                  pdfZoom: {
                    defaultZoom: 0.8,
                    zoomJump: 0.2,
                  },
                  pdfVerticalScrollByDefault: true, // false as default
                }}
                theme={{
                  primary: "#5296d8",
                  secondary: "#ffffff",
                  tertiary: "#5296d899",
                  textPrimary: "#ffffff",
                  textSecondary: "#5296d8",
                  textTertiary: "#00000099",
                  disableThemeScrollbar: false,
                }}
                style={{ width: "100%", height: "100%" }}
              /> */}
          </Grid>
        )}
      </>
    );
  }, [
    ContentTypeFileVideo,
    cropMovable,
    cropRatio,
    cropResize,
    cropShape,
    image,
    isCrop,
    lstDocumentFile,
    props.file.sFileType,
  ]);

  const ContentTypeDialogAndGallery = useCallback(() => {
    return (
      <>
        {props.isGallery ? (
          <>{ContentTypeGallery()}</>
        ) : (
          <> {ContentTypeFile()} </>
        )}
      </>
    );
  }, [ContentTypeFile, ContentTypeGallery, props.isGallery]);

  const jsxContentDialogFullScreen = useCallback(() => {
    return (
      <>
        <AppBar className={"appBar-uploadfile"}>
          <Toolbar>
            <Grid
              container
              spacing={2}
              justifyContent="space-between"
              alignItems={"center"}
            >
              <Grid item xs={7} md={"auto"}>
                <Grid container spacing={0}>
                  <Grid item xs={12} className={"HeadLable"}>
                    {I18n.SetText(
                      "UploadFile.FileName",
                      I18NextNs.labelComponent
                    )}{" "}
                    : <span className={"SubLable"}>{props.file.sFileName}</span>
                  </Grid>
                  <Grid item xs={12} className={"HeadLable"}>
                    {I18n.SetText(
                      "UploadFile.FileType",
                      I18NextNs.labelComponent
                    )}{" "}
                    : <span className={"SubLable"}>{props.file.sFileType}</span>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={5} md={"auto"}>
                <Grid container spacing={1} justifyContent={"end"}>
                  <Grid item xs={"auto"}>
                    {isCrop ? (
                      <Grid item xs={"auto"}>
                        <Grid container spacing={1} justifyContent={"end"}>
                          <Grid item xs={"auto"}>
                            <BtnConfirm
                              id="confirm-crop"
                              className="btn-download-modal"
                              onClick={() => {
                                onSubmitCrop();
                              }}
                            />
                          </Grid>
                          <Grid item xs={"auto"}>
                            <BtnCancel
                              id="cancel-crop"
                              className="btn-cancel-modal"
                              onClick={() => {
                                setisCrop(false);
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid item xs={"auto"}>
                        <BtnBaseButton
                          txt={I18n.SetText(
                            "UploadFile.Download",
                            I18NextNs.labelComponent
                          )}
                          size={"medium"}
                          startIcon={<CloudDownloadIcon />}
                          IsRadius={true}
                          IsDisabled={false}
                          IsHidden={false}
                          onClick={DownloadOriginal}
                          IsCircleWithOutText={false}
                          className="btn-download-modal"
                          id={"download-modal"}
                        />
                      </Grid>
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={"auto"}
                    style={{ display: isCrop ? "none" : "block" }}
                  >
                    <BtnBaseButton
                      txt={"Close"}
                      size={"medium"}
                      startIcon={<CloseIcon />}
                      IsRadius={true}
                      IsDisabled={false}
                      IsHidden={false}
                      onClick={onClosePopup}
                      IsCircleWithOutText={false}
                      className="btn-close-modal"
                      id={"close-modal"}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <DialogContent className={"body-uploadfile"} dividers>
          <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justifyContent="center"
            style={{
              height: "85vh",
              marginTop: "70px",
              position: "relative",
            }}
          >
            {ContentTypeDialogAndGallery()}
            <div
              style={{
                display:
                  IsCrop && Extension.Image.indexOf(props.file.sFileType) > -1
                    ? "block"
                    : "none",
              }}
            >
              <ButtonGroup
                disableElevation
                variant="text"
                aria-label="Disabled elevation buttons"
                style={{
                  borderColor: "#fff",
                }}
              >
                {!isCrop ? (
                  <Button
                    startIcon={<CropRoundedIcon style={{ color: "#fff" }} />}
                    onClick={() => {
                      onSetCrop();
                    }}
                    style={{ color: "#fff" }}
                  >
                    {I18n.SetText(
                      "UploadFile.Crop",
                      I18NextNs.labelComponent
                    )}
                  </Button>
                ) : (
                  <Button
                    startIcon={
                      <RefreshRoundedIcon style={{ color: "#fff" }} />
                    }
                    onClick={() => {
                      rotate();
                    }}
                    style={{ color: "#fff" }}
                  >
                    {I18n.SetText(
                      "UploadFile.Rotate",
                      I18NextNs.labelComponent
                    )}
                  </Button>
                )}
                <Button
                  startIcon={
                    <DeleteForeverRoundedIcon style={{ color: "#fff" }} />
                  }
                  onClick={deleteInDialog}
                  style={{ color: "#fff" }}
                >
                  {I18n.SetText(
                    "UploadFile.Delete",
                    I18NextNs.labelComponent
                  )}
                </Button>
              </ButtonGroup>
            </div>
          </Grid>
        </DialogContent>
      </>
    );
  }, [
    ContentTypeDialogAndGallery,
    DownloadOriginal,
    IsCrop,
    deleteInDialog,
    isCrop,
    onClosePopup,
    onSetCrop,
    onSubmitCrop,
    props.file.sFileName,
    props.file.sFileType,
    rotate,
  ]);

  const ContentDialogModalCrop = useCallback(() => {
    return (
      <Grid container justifyContent={"end"}>
        <Grid item xs={"auto"}>
          {isCrop ? (
            <Grid item xs={"auto"}>
              <Grid container spacing={1} justifyContent={"end"}>
                <Grid item xs={"auto"}>
                  <Button
                    variant="outlined"
                    className="btn-cancel-crop"
                    onClick={() => {
                      setisCrop(false);
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={"auto"}>
                  <Button
                    variant="outlined"
                    className="btn-download-modal"
                    onClick={() => {
                      onSubmitCrop();
                    }}
                  >
                    Confirm
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Grid item xs={"auto"}>
              <Button
                variant="outlined"
                className="btn-download-modal"
                onClick={() => {
                  DownloadOriginal();
                }}
              >
                Download
              </Button>
            </Grid>
          )}
        </Grid>
        <Grid item xs={"auto"} style={{ display: isCrop ? "none" : "block" }}>
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClosePopup}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>
    );
  }, [DownloadOriginal, isCrop, onClosePopup, onSubmitCrop]);

  const jsxContentDialogModal = useCallback(() => {
    return (
      <>
        <DialogTitle style={{ padding: "12px 24px" }}>
          <Grid container spacing={2} justifyContent="space-between">
            <Grid item xs={7} md={"auto"}>
              <Grid container spacing={2}>
                <Grid item xs={10} md={"auto"} className={"HeadLable2"}>
                  {I18n.SetText(
                    "UploadFile.FileName",
                    I18NextNs.labelComponent
                  )}{" "}
                  : <div className={"SubLable2"}>{props.file.sFileName}</div>
                </Grid>
                <Grid item xs={2} md={"auto"} className={"HeadLable2"}>
                  {I18n.SetText(
                    "UploadFile.FileType",
                    I18NextNs.labelComponent
                  )}{" "}
                  : <div className={"SubLable2"}>{props.file.sFileType}</div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={5} md={"auto"}>
              {ContentDialogModalCrop()}
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent dividers>
          <Grid
            container
            spacing={2}
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            {props.isGallery ? (
              <Grid item xs={12}>
                <Carousel
                  className="div-gallery"
                  images={lstImage}
                  key={"crs-image"}
                  canAutoPlay={false}
                  isAutoPlaying={true}
                  autoPlayInterval={3000}
                  index={props.indexActive}
                  onIndexChange={({ curIndex, curIndexForDisplay }) => {
                    setindexlstImage(curIndex);
                  }}
                  leftIcon={
                    <span
                      className="icon-text"
                      role="img"
                      aria-label="left"
                      style={{
                        fontSize: "min(50px, 5vw)",
                      }}
                    >
                      ◀️
                    </span>
                  }
                  rightIcon={
                    <span
                      className="icon-text"
                      role="img"
                      aria-label="right"
                      style={{
                        fontSize: "min(50px, 5vw)",
                      }}
                    >
                      ▶️
                    </span>
                  }
                />
              </Grid>
            ) : (
              <>
                {Extension.Image.indexOf(props.file.sFileType) > -1 && (
                  <Grid item xs={12} style={{ display: "flex" }}>
                    {isCrop ? (
                      <Cropper
                        src={image}
                        id="images"
                        zoomTo={0.1945}
                        aspectRatio={cropRatio}
                        minCropBoxHeight={200}
                        minCropBoxWidth={200}
                        viewMode={3}
                        className={
                          cropShape === "retangle"
                            ? "image-modal"
                            : "image-modal circle-crop"
                        }
                        guides={true}
                        highlight={true}
                        zoomOnTouch={false}
                        zoomOnWheel={false}
                        cropBoxMovable={cropMovable}
                        zoomable={true}
                        cropBoxResizable={cropResize}
                        responsive={true}
                        ref={cropperRef}
                      />
                    ) : (
                      <img src={image} alt="" className="image-modal" />
                    )}
                  </Grid>
                )}
                {Extension.Video.indexOf(props.file.sFileType) > -1 && (
                  <Grid item xs={12}>
                    {ContentTypeFileVideo()}
                  </Grid>
                )}
                {Extension.PDF.indexOf(props.file.sFileType) > -1 && (
                  <Grid item xs={12}>
                    {/* <DocViewer
                        documents={lstDocumentFile}
                        pluginRenderers={DocViewerRenderers}
                        config={{
                          header: {
                            disableHeader: false,
                            disableFileName: false,
                            retainURLParams: false,
                          },
                          pdfZoom: {
                            defaultZoom: 0.8,
                            zoomJump: 0.2,
                          },
                          pdfVerticalScrollByDefault: true,
                        }}
                        theme={{
                          primary: "#5296d8",
                          secondary: "#ffffff",
                          tertiary: "#5296d899",
                          textPrimary: "#ffffff",
                          textSecondary: "#5296d8",
                          textTertiary: "#00000099",
                          disableThemeScrollbar: false,
                        }}
                        style={{ width: "100%", height: "100%" }}
                      /> */}
                  </Grid>
                )}
              </>
            )}
            <Grid
              item
              style={{
                display:
                  props.IsCrop &&
                    Extension.Image.indexOf(props.file.sFileType) > -1
                    ? "block"
                    : "none",
              }}
            >
              <ButtonGroup
                disableElevation
                variant="text"
                aria-label="Disabled elevation buttons"
                style={{
                  borderColor: "#000000",
                }}
              >
                {!isCrop ? (
                  <Button
                    startIcon={<CropRoundedIcon style={{ color: "#000000" }} />}
                    onClick={() => {
                      onSetCrop();
                    }}
                    style={{ color: "#000000" }}
                  >
                    {I18n.SetText("UploadFile.Crop", I18NextNs.labelComponent)}
                  </Button>
                ) : (
                  <Button
                    startIcon={
                      <RefreshRoundedIcon style={{ color: "#000000" }} />
                    }
                    onClick={() => {
                      rotate();
                    }}
                    style={{ color: "#000000" }}
                  >
                    {I18n.SetText(
                      "UploadFile.Rotate",
                      I18NextNs.labelComponent
                    )}
                  </Button>
                )}
                <Button
                  startIcon={
                    <DeleteForeverRoundedIcon style={{ color: "#000000" }} />
                  }
                  onClick={deleteInDialog}
                  style={{ color: "#000000" }}
                >
                  {I18n.SetText("UploadFile.Delete", I18NextNs.labelComponent)}
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </DialogContent>
      </>
    );
  }, [
    ContentDialogModalCrop,
    ContentTypeFileVideo,
    cropMovable,
    cropRatio,
    cropResize,
    cropShape,
    deleteInDialog,
    image,
    isCrop,
    lstDocumentFile,
    lstImage,
    onSetCrop,
    props.IsCrop,
    props.file.sFileName,
    props.file.sFileType,
    props.indexActive,
    props.isGallery,
    rotate,
  ]);

  useEffect(() => {
    if (IsopenPopUp) {
      setisCrop(false);
    }
  }, [IsopenPopUp]);

  useEffect(() => {
    if (IsopenPopUp) {
      setisCrop(false);
    }
  }, [IsopenPopUp]);

  useEffect(() => {
    setlstDocumentFile([]);
    if (
      Extension.Document.indexOf(props.file.sCropFileLink) > -1 &&
      props.file.sFileLink
    ) {
      let sURI = props.file.sFileLink;

      setlstDocumentFile([{ uri: sURI }]);
    }
    if (props.file.sCropFileLink) {
      let sPathImage = props.file.sCropFileLink;

      setImage(sPathImage);
    }
  }, [props.file]);

  return (
    <div>
      {sPopup === "modal" ? (
        <Dialog
          TransitionComponent={Transition}
          maxWidth={"md"}
          disableEscapeKeyDown
          fullWidth
          open={IsopenPopUp}
          sx={{ zIndex: 200 }}
        >
          {jsxContentDialogModal()}
        </Dialog>
      ) : (
        <Dialog
          fullScreen={true}
          open={IsopenPopUp}
          className={"body-uploadfile"}
          disableEscapeKeyDown
          onClose={onClosePopup}
          sx={{ zIndex: 200 }}
        >
          {jsxContentDialogFullScreen()}
        </Dialog>
      )}

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={isShowAlert}
        autoHideDuration={3500}
        onClose={onCloseAlert}
      >
        <MuiAlert
          severity="warning"
          onClose={onCloseAlert}
          action={onActionAlert}
        >
          {I18n.SetText("UploadFile.NotSkip", I18NextNs.labelComponent)}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
