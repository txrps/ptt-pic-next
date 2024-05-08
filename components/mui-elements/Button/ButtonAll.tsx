import { Button, Fab, Tooltip } from "@mui/material";
import {
  Search,
  ArrowBackIos,
  DeleteForever,
  Add,
  PersonAdd,
  AppRegistration,
  Info,
  Cancel,
  Summarize,
  CloseRounded,
  Home,
  SaveAlt,
  RefreshRounded,
  Save,
  TaskAltRounded,
  Logout,
  List,
  Edit,
  RemoveRedEye,
  FileDownload,
  FileUpload,
  CheckCircle,
  Email,
  Undo,
  ContentCopy,
  Description,
  Check,
  HighlightOff,
  Remove
} from "@mui/icons-material";

import {
  MdRecycling,
  MdOutlineNavigateBefore,
  MdOutlineNavigateNext,
} from "react-icons/md";
import { HiOutlineSave } from "react-icons/hi";
import { AiOutlineComment } from "react-icons/ai";
import { FaSyncAlt } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { BiReset, BiCollapse, BiExpand } from "react-icons/bi";
import { BsFileEarmarkExcel } from "react-icons/bs";
import { blue } from "@mui/material/colors";
import { BtnProp, ButtonCustomProp } from "./Button";
import SkeletonRound from "../Skeleton/SkeletonRound";
import LockIcon from '@mui/icons-material/Lock';
import DownloadIcon from '@mui/icons-material/Download';
export const CheckIsBtnUpload = (isBtnUpload: boolean) => {
  return isBtnUpload ? "34px" : "40px";
}

export const BtnBaseButton = (props: ButtonCustomProp) => {
  const {
    id,
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    onMouseDown = () => { },
    startIcon,
    txt = "",
    IsCircleWithOutText = false,
    tooltipPlacement = "bottom",
    size = "medium",
    fontColor = "#fff",
    bgcolor = "#4b7902",
    bgcolorHover = "#4b7902",
    IsRadius = true,
    isFullwidth = false,
    className = "",
    sx,
    isBtnUpload = false,
    IsSkeleton = false
  } = props;

  const styleRectangle = txt
    ? {}
    : {
      width: "36.5px",
      minWidth: "20px",
      height: "36.5px",
      borderRadius: "50% !important",
    };
    if(IsSkeleton)
    {
        return (
          <SkeletonRound height={40} width={ IsCircleWithOutText || txt === "" ? 40 : 80}/>
        )
    }

  return (
    <Tooltip placement={tooltipPlacement} title={txt}>
      {!IsCircleWithOutText ? (
        <Button
          variant="contained"
          id={id}
          data-testid={id}
          size={size}
          startIcon={startIcon}
          disabled={IsDisabled}
          className={className}
          fullWidth={isFullwidth}
          hidden={IsHidden}
          onClick={onClick}
          onMouseDown={onMouseDown}
          sx={(theme) => ({
            ...sx,
            boxShadow: "none",
            textTransform: "none",
            border: "1px solid",
            lineHeight: 1.5,
            color: fontColor,
            backgroundColor: bgcolor,
            borderColor: bgcolor,
            borderRadius: IsRadius && txt ? "20px" : "8px",
            ...styleRectangle,
            ":hover": {
              bgcolor: bgcolorHover,
              borderColor: bgcolorHover,
            },
            ".Mui-disabled": {
              color: "rgba(0, 0, 0, 0.26)",
              boxShadow: "none",
              borderColor: "rgba(0, 0, 0, 0.12)",
            },
            ".MuiButton-startIcon": txt ? {} : { margin: "0" },
            [theme.breakpoints.down("sm")]: !isFullwidth
              ? {
                width: CheckIsBtnUpload(isBtnUpload),
                minWidth: CheckIsBtnUpload(isBtnUpload),
                height: CheckIsBtnUpload(isBtnUpload),
                fontSize: "0px",
                lineHeight: "0px",
                "& .MuiButton-startIcon": { margin: 0 },
              }
              : {},
          })}
        >
          {txt}
        </Button>
      ) : (
        <Fab
          id={id}
          data-testid={id}
          className={className}
          onClick={onClick}
          sx={{
            ...sx,
            width: CheckIsBtnUpload(isBtnUpload),
            height: CheckIsBtnUpload(isBtnUpload),
            minHeight: CheckIsBtnUpload(isBtnUpload),
            color: fontColor,
            backgroundColor: bgcolor,
            borderColor: bgcolor,
            borderRadius : "50%",
            fontSize: "0.8rem",
            ":hover": {
              bgcolor: bgcolorHover,
              borderColor: bgcolorHover,
            },
            ".MuiSvgIcon-root": {
              color: "#ffffff",
            },
            zIndex: 1,
          }}
        >
          {startIcon}
        </Fab>
      )}
    </Tooltip>
  );
};

export const BtnConfirm = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "", // I18n.SetText("Button.Confirm", I18NextNs.labelComponent),
    IsCircleWithOutText = false,
    IsRadius = true,
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={<Check />}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor="#1976d2"
      bgcolorHover="#1976d2"
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};

export const BtnDelete = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "", // I18n.SetText("Button.Delete", I18NextNs.labelComponent),
    IsCircleWithOutText = false,
    IsRadius = true,
    isBtnUpload = false,
    icon = <DeleteForever />,
    bgColor = "#ed3847",
    bgColorHover = "#ed3847",
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={icon}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor={bgColor}
      bgcolorHover={bgColorHover}
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
      isBtnUpload={isBtnUpload}
    />
  );
};

export const BtnCancelForm = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "", // I18n.SetText("Button.Cancel", I18NextNs.labelComponent),
    IsCircleWithOutText = false,
    IsRadius = true,
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={<CloseRounded />}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor="#ed3847"
      bgcolorHover="#ed3847"
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};

export const BtnPreview = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "", // I18n.SetText("Button.Preview", I18NextNs.labelComponent),
    IsCircleWithOutText = false,
    IsRadius = true,
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={<Info />}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor="#e39a2d"
      bgcolorHover="#e39a2d"
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};

export const BtnClose = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "Close", // I18n.SetText("Button.Close", I18NextNs.labelComponent),
    IsCircleWithOutText = false,
    IsRadius = true,
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={<Cancel />}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor="#8c98ac"
      bgcolorHover="#8c98ac"
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};

export const BtnCancel = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "Cancel", // I18n.SetText("Button.Cancel", I18NextNs.labelComponent),
    IsCircleWithOutText = false,
    IsRadius = true,
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={<CloseRounded />}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor="#a9a9a9"
      bgcolorHover="#a3a1a1"
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};

export const BtnAdd = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "Add", //I18n.SetText("Button.Add", I18NextNs.labelComponent),
    IsCircleWithOutText = false,
    IsRadius = true,
    bgColor = "#05a6e8",
    bgColorHover = "#05a6e8",
    icon = <Add />,
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={icon}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor={bgColor}
      bgcolorHover={bgColorHover}
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};

export const BtnRemove = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "Remove", //I18n.SetText("Button.Add", I18NextNs.labelComponent),
    IsCircleWithOutText = false,
    IsRadius = true,
    bgColor = "#ed3847",
    bgColorHover = "#ed3847",
    icon = <Remove />,
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={icon}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor={bgColor}
      bgcolorHover={bgColorHover}
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};
export const BtnAddMember = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "Add Team Member", //I18n.SetText("Button.Add", I18NextNs.labelComponent),
    IsCircleWithOutText = false,
    IsRadius = true,
    bgColor = "",
    bgColorHover = "",
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={<PersonAdd />}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor={bgColor || "#05a6e8"}
      bgcolorHover={bgColorHover || "#05a6e8"}
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};

export const BtnSearch = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "", //I18n.SetText("Button.Search", I18NextNs.labelComponent),
    IsCircleWithOutText = false,
    IsRadius = true,
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={<Search />}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor="#0070ff"
      bgcolorHover="#0b5ec9"
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};

export const BtnClear = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "Clear", // I18n.SetText("Button.Clear", I18NextNs.labelComponent),
    IsCircleWithOutText = false,
    IsRadius = true,
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={<RefreshRounded />}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor="#dcdbdb"
      bgcolorHover="#b7b7b7"
      fontColor="#000000"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};

export const BtnHome = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "", // I18n.SetText("Button.Home", I18NextNs.labelComponent),
    IsCircleWithOutText = false,
    IsRadius = true,
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={<Home />}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor="#dcdcdc"
      bgcolorHover="#dcdcdc"
      fontColor="#000000"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};

export const BtnEdit = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "", // I18n.SetText("Button.Edit", I18NextNs.labelComponent),
    IsCircleWithOutText = false,
    IsRadius = true,
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={<Edit />}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor="#F6C000"
      bgcolorHover="#F6C000"
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};

export const BtnExportExcel = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "", // I18n.SetText("Button.Excel", I18NextNs.labelComponent),
    IsCircleWithOutText = false,
    IsRadius = true,
    icon = <BsFileEarmarkExcel />,
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={icon}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor="#34956d"
      bgcolorHover="#1e855b"
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};

export const BtnDownload = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "", //I18n.SetText("Button.Download", I18NextNs.labelComponent),
    IsCircleWithOutText = false,
    IsRadius = true,
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={<SaveAlt />}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor="#369ab1"
      bgcolorHover="#369ab1"
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};

export const BtnAdditionnel = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "", // I18n.SetText("Button.Additionnel", I18NextNs.labelComponent),
    IsCircleWithOutText = false,
    IsRadius = true,
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={<List />}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor="#43619D"
      bgcolorHover="#496397"
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};

export const BtnRecycle = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "Recycle",
    IsCircleWithOutText = false,
    IsRadius = true,
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={<MdRecycling />}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor="#f59a23"
      bgcolorHover="#e6880c"
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};

export const BtnNote = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "Note",
    IsCircleWithOutText = false,
    IsRadius = true,
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={<Summarize />}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor="#f59a23"
      bgcolorHover="#e6880c"
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};

export const BtnSend = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "Send",
    IsCircleWithOutText = false,
    IsRadius = true,
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={<FiSend />}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor="#00aeef"
      bgcolorHover="#0799d0"
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};

export const BtnSendMail = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "SendMail",
    IsCircleWithOutText = false,
    IsRadius = true,
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={<Email />}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor="#655191"
      bgcolorHover="#41335d"
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};

export const BtnRecall = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "Recall",
    IsCircleWithOutText = false,
    IsRadius = true,
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={<BiReset />}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor="#f59b26"
      bgcolorHover="#d98c28"
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};

export const BtnComment = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "Comment",
    IsCircleWithOutText = false,
    IsRadius = true,
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={<AiOutlineComment />}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor="#f7f7ff"
      bgcolorHover="#dfdfea"
      fontColor="#000000"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};

export const BtnNext = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "Next",
    IsCircleWithOutText = false,
    IsRadius = true,
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={<MdOutlineNavigateNext />}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor="#05a6e8"
      bgcolorHover="#0c93cb"
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};

export const BtnPrevious = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "Previous",
    IsCircleWithOutText = false,
    IsRadius = true,
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={<MdOutlineNavigateBefore />}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor="#05a6e8"
      bgcolorHover="#0c93cb"
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};

export const BtnCollapse = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "Collapse",
    IsCircleWithOutText = false,
    IsRadius = true,
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={<BiCollapse />}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor="#4caf50"
      bgcolorHover="#3d9840"
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};

export const BtnExpand = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "Expand",
    IsCircleWithOutText = false,
    IsRadius = true,
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={<BiExpand />}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor="#668ecf"
      bgcolorHover="#5379b7"
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};

export const BtnLoadSync = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "LoadSync",
    IsCircleWithOutText = false,
    IsRadius = true,
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={<FaSyncAlt />}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor="#e3b43f"
      bgcolorHover="#d3a83b"
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};

export const BtnDescription = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "Description",
    IsCircleWithOutText = false,
    IsRadius = true,
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={<Description />}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor="#5197ff"
      bgcolorHover="#0f80d7"
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};

export const BtnExportExcelTemplate = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "Excel",
    IsCircleWithOutText = false,
    IsRadius = true,
    icon = <Description />,
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={icon}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor={blue[500]}
      bgcolorHover={blue[700]}
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};

export const BtnLogout = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "Logout",
    IsCircleWithOutText = true,
    IsRadius = true,
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={<Logout />}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor={"#ed3847"}
      bgcolorHover={"#ed1325"}
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};

export const BtnDuplicate = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "Duplicate",
    IsCircleWithOutText = false,
    IsRadius = true,
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={<ContentCopy />}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor={"#e7672c"}
      bgcolorHover={"#D15E28"}
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};


export const BtnEditData = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "Edit",
    IsCircleWithOutText = false,
    IsRadius = true,
    sSize = "medium",
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={sSize}
      startIcon={<Edit />}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor="#d45a27"
      bgcolorHover="#a64218"
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};

export const BtnPreviewForm = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "Preview",
    IsCircleWithOutText = false,
    IsRadius = true,
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={<RemoveRedEye />}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor="#e39a2d"
      bgcolorHover="#e39a2d"
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};

export const BtnExportFile = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "ExportFile",
    IsCircleWithOutText = false,
    IsRadius = true,
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={<FileDownload />}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor="#0098f7"
      bgcolorHover="#1976d2"
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};

export const BtnImportFile = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "Preview",
    IsCircleWithOutText = false,
    IsRadius = true,
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={<FileUpload />}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor="#33a64c"
      bgcolorHover="#328f47"
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};

export const BtnBack = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "Back",
    IsCircleWithOutText = false,
    IsRadius = true,
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={<ArrowBackIos />}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor="#888888"
      bgcolorHover="#888888"
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};
export const BtnDraft = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    onMouseDown = () => { },
    txt = "Draft",
    IsCircleWithOutText = false,
    IsRadius = true,
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={<HiOutlineSave />}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      onMouseDown={onMouseDown}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor="#3cc1ac"
      bgcolorHover="#239b88"
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};
export const BtnSubmit = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    onMouseDown = () => { },
    txt = "Submit",
    IsCircleWithOutText = false,
    IsRadius = true,
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={<Save />}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      onMouseDown={onMouseDown}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor="#33a64c"
      bgcolorHover="#33a64c"
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};
export const BtnApprove = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "Approve",
    IsCircleWithOutText = false,
    IsRadius = true,
    sSize = "medium",
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={sSize}
      startIcon={<TaskAltRounded />}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor="#33a64c"
      bgcolorHover="#33a64c"
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};
export const BtnRegister = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "Register",
    IsCircleWithOutText = false,
    IsRadius = true,
    sSize = "medium",
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={sSize}
      startIcon={<AppRegistration />}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor="#33a64c"
      bgcolorHover="#33a64c"
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};

export const BtnRevert = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "Revert",
    IsCircleWithOutText = false,
    IsRadius = true,
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={<Undo />}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor="#eacb43"
      bgcolorHover="#9b862a"
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};
export const BtnReject = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "Reject",
    IsCircleWithOutText = false,
    IsRadius = true,
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={<HighlightOff />}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor="#ed3847"
      bgcolorHover="#ed3847"
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};

export const BtnRemaindMail = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "Reminder",
    IsCircleWithOutText = false,
    IsRadius = true,
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={<Email />}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor="#655191"
      bgcolorHover="#41335d"
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};
export const BtnComplete = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "Complete",
    IsCircleWithOutText = false,
    IsRadius = true,
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={<CheckCircle />}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor="#027db4"
      bgcolorHover="#027db4"
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};
export const BtnSave = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    onMouseDown = () => { },
    txt = "Save",
    IsCircleWithOutText = false,
    IsRadius = true,
    icon = <Save />,
    bgColor ="#33a64c",
    bgColorHover ="#33a64c",
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={icon}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      onMouseDown={onMouseDown}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor={bgColor}
      bgcolorHover={bgColorHover}
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};

export const BtnLogkey = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "Logkey",
    IsCircleWithOutText = false,
    IsRadius = true,
    bgColor = "#fc3434",
    bgColorHover =""
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={<LockIcon />}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor={bgColor}
      bgcolorHover="#fc3434"
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};

export const BtnThemplate = (props: BtnProp) => {
  const {
    IsDisabled = false,
    IsHidden = false,
    onClick = () => { },
    txt = "ดาวน์โหลดเทมเพลต",
    IsCircleWithOutText = false,
    IsRadius = true,
  } = props;

  return (
    <BtnBaseButton
      {...props}
      txt={txt}
      size={"medium"}
      startIcon={<DownloadIcon />}
      IsRadius={IsRadius}
      IsDisabled={IsDisabled}
      IsHidden={IsHidden}
      onClick={onClick}
      IsCircleWithOutText={IsCircleWithOutText}
      bgcolor="#33a64c"
      bgcolorHover="#328f47"
      fontColor="#ffffff"
      tooltipPlacement="bottom"
      className={props.className}
      id={props.id}
    />
  );
};


