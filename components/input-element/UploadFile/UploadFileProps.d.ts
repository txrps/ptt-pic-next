export interface cFile {
  sFile_ID: number;
  webkitRelativePath: string;
  sMsg: string;
  sFolderName: string;
  sFileName: string;
  name: string;
  sSysFileName: string;
  sDescription: string;
  nFileType_ID: number;
  size: number;
  nSize: number;
  sSizeName: string;
  type: string;
  dUploadBy: number;
  dUploadDate: Date;
  sFileLink: string;
  sPath: string;
  sCropFileLink: string;
  sCropPath: string;
  IsCompleted: boolean;
  IsProgress: boolean;
  lastModified: Date;
  lastModifiedDate: Date;
  IsNew: boolean;
  IsNewTab: boolean;
}

export interface UploadProps {
  required: boolean;
  modeDisplay: "list" | "gallery";
  modeUpload?: "server" | "sharepath";
  id?: string;
  name: string;
  // keyID: string | number;
  label?: string;
  sSubTitle?: string;
  IsCheckRecommendSize?: boolean;
  nRecommendWidth?: number,
  nRecommendHeight?: number,
  sRemark?: string;
  arrFile: any[];
  setarrFile: any;
  Extension: any;
  nCountLimitFile?: number,
  nLimitFile: number;
  sLimitFile: "MB" | "GB";
  IsFolder: boolean;
  onClearFile: any; //UseRef for Clear File
  isFileChange?: boolean;
  IsMultiple: boolean;
  IsHiddenUploadBox?: boolean;
  disabled?: boolean;
  IsCanDel?: boolean;
  IsDrag?: boolean;
  IsAddDescription?: boolean;
  dataID?: string;
  apiPath?: string;
  sFileName?: string;
  sFolderTemp?: string;
  //For video
  onOpenFile?: any;
  setStartVideoOn?: any;
  nStartVideoOn?: any;
  setarrFile?: any;
  CannotSkipForward?: any;
  onVideoEnd?: any;
  //For Resize Image Only
  IsResize?: boolean;
  WidthResize?: number;
  HeigthResize?: number;
  //Reload For Upload Fail
  IsDragDrop?: boolean;
  nRowperpageTable?: number;
  IsShowIcon?: boolean;
  IsMultiDelete?: boolean;
  sPositionText?: "bottom" | "button" | "right" | "icon";
  IsSumSizeAll?: boolean;
  sPopup?: "fullscreen" | "newtab" | "modal";
  //crop
  IsCrop?: boolean;
  cropShape?: "retangle" | "circle";
  cropRatio?: number;
  cropResize?: boolean;
  cropMovable?: boolean;
  IsHide?: boolean;
  icon?: any;
  className?: string;
  labelButton?: string;
}

export interface ProfileUploadProps {
  required: boolean,
  modeDisplay?: "ProfileCircle" | "ProfileRectangle";
  id?: string,
  name: string;
  width: any,
  height: any,
  label?: string,
  sSubTitle?: string,
  sRemark?: string,
  arrFile: any[],
  setarrFile: any,
  Extension: any,
  nLimitFile: number,
  sLimitFile: "MB" | "GB",
  onClearFile: any,   //UseRef for Clear File
  IsHiddenUploadBox?: boolean,
  disabled?: boolean,
  IsCanDel?: boolean,
  dataID?: string,
  apiPath?: string,
  sFileName?: string,
  sFolderTemp?: string,
  //Reload For Upload Fail
  IsDragDrop?: boolean,
  IsCrop: boolean,
  cropShape?: "retangle" | "circle";
  cropRatio?: number;
  cropResize?: boolean;
  cropMovable?: boolean;
  sPositionText?: "bottom" | "button" | "right";
  nRecommendWidth?: number;   //https://tiny-img.com/blog/best-image-size-for-website/
  nRecommendHeight?: number;
}

export interface DisplayGalleryProps {
  IsopenPopUp,
  setIsopenPopUp,
  sPopup, arrFile,
  SetarrFile,
  disabled,
  onDelete,
  onOpenFile
}