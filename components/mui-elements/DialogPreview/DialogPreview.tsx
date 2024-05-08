import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
} from "@mui/material";
import { DialogTitleProps, PropPopUpCustom } from "./DialogPreviewClass";

// icon x
import CloseIcon from "@mui/icons-material/Close";
import { BtnBack, BtnSave } from "../Button/ButtonAll";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-paper": {
    borderRadius: "10px",
  },
}));


function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, color, colorbg, CloseColor, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 1, backgroundColor: colorbg, color: color, paddingRight: '10%', }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          id='close-dialog'
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            padding: "4px",
            // color:"#ffffff"
            color: CloseColor ?? "#ffffff",
            fontSize: "1rem",
            ":hover": { backgroundColor: CloseColor ? "#e0e0e0" : "#001946f5", color: "#ffffff" }
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const DialogPreview: React.FC<PropPopUpCustom> = ({
  IsOpen,
  setIsOpen,
  onClose,
  sMaxWidth = "md",
  Title,
  children,
  JsxDialogAction,
  onClick,
  Close = false,
  CloseSave = false,
  hiddenTitle = true,
  IsBackdropClick,
  startAdornment,
  styles,
  required = false,
  onCustomButton,
  CloseColor,
  fullScreen = false,
  isDialogTitle = false,
  bgColor = "#001946f5",
  sTitleBtnSave,
}) => {
  const handleClose = (event, reason) => {
    if (!IsBackdropClick) {
      if (reason !== "backdropClick") {
        onClose();
      }
    } else {
      onClose();
    }
  };
  const styleTopFull = !fullScreen ? "5%" : "1%";
  return (
    <BootstrapDialog
      open={IsOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      disableEscapeKeyDown
      maxWidth={sMaxWidth}
      style={{
        // zIndex:1600,
        top: (isDialogTitle ? "0%" : styleTopFull),
      }}
      fullScreen={fullScreen}
    >
      {!isDialogTitle &&
        <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose} color={"#fff"} colorbg={bgColor} CloseColor={CloseColor}>
          &nbsp; &nbsp; {Title}
        </BootstrapDialogTitle>
      }
      <DialogContent sx={{ pt: '16px !important', backgroundColor: "#ffffff" }} style={styles}>{children}</DialogContent>
      {JsxDialogAction
        &&
        <DialogActions sx={{ justifyContent: "center", gap: 2 }}>
          {Close &&
            <BtnBack id={"BtnBack"} onClick={onClose} />}
          {CloseSave &&
            <BtnSave txt={sTitleBtnSave} id={"BtnSave"} onClick={onClick} />}
          {onCustomButton}
        </DialogActions>
      }
    </BootstrapDialog>
  );
};

export default DialogPreview;