import { useState } from "react";
import No_BG from "@/public/assets/images/no-image-available.png";
import { ApiCommon } from "@/enum/api";
import { Extension } from "@/enum/enum";
import { AxiosFn } from '@/lib/useAxios';

export const useUploadFile = () => {
  const [isOpenPopUpDetail, setIsOpenPopUpDetail] = useState<boolean>(false);
  const [indexActive, setIndexActive] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const DownloadFile = async (item) => {
    console.log(item)
    let param = {
      sPath: item.sPath ?? item.sFolderName,
      sFileName: item.sFileName,
      sSysFileName: item.sSysFileName,
      sFolderName: item.sFolderName
    };
    AxiosFn.DowloadFile(ApiCommon.DownloadFile, param, "");
  }

  const OpenPopUp = (props) => {
    let lstSrc = [] as any;
    console.log(props)
    if (props.arrFile) {
      props.arrFile.forEach(element => {
        if (Extension.Image.indexOf(element.sFileType) > -1 && element.sFileLink) {
          let sSrc = element.sFileLink;
          lstSrc.push({ src: sSrc, sFileName: element.sFileName, sSysFileName: element.sSysFileName })
        }
      });
      let nIdexFile = lstSrc.findIndex(f => f.sSysFileName === props.sSysFileName);
      setIndexActive(nIdexFile > -1 ? nIdexFile : 0)
    }
    else {
      lstSrc.push({ src: props.sFileLink, sFileName: props.sFileName, sSysFileName: props.sSysFileName })
    }

    if (props.onOpenFile) {
      props.onOpenFile(props.sSysFileName);
    }
    setIsOpenPopUpDetail(true);
  };

  const ClosePopUp = () => {
    setIsOpenPopUpDetail(false);
  };

  const handleClickFile = (props) => {
    if (props.onOpenFile) {
      props.onOpenFile(props.sSysFileName);
    }
    let isCheck = Extension.Image.indexOf(props.sFileType.toLowerCase()) > -1 || Extension.Video.indexOf(props.sFileType.toLowerCase()) > -1;
    isCheck ? OpenPopUp(props) : DownloadFile(props);
  };

  const handleOpenModalAddDescription = () => {
    setIsOpen(true)
  };

  const onImageError = (e) => {
    e.target.src = No_BG;
  }

  return {
    DownloadFile,
    ClosePopUp,
    OpenPopUp,
    onImageError,
    handleClickFile,
    handleOpenModalAddDescription,
    indexActive, setIndexActive,
    isOpen, setIsOpen,
    isOpenPopUpDetail, setIsOpenPopUpDetail
  }
}
