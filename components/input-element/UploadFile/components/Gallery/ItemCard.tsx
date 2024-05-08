import { Fragment, useCallback } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FilePopup from "../PopUp/FilePopup";
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { CircularProgressWithLabelTable } from "../StyleCpnExport";

// import mp4file from "src/assets/images/TypeFile/mp4-file.png";
// import pptfile from "src/assets/images/TypeFile/ppt-file.png";
// import pdffile from "src/assets/images/TypeFile/pdf-file.png";
// import docfile from "src/assets/images/TypeFile/doc-file.png";
// import xlsfile from "src/assets/images/TypeFile/xls-file.png";
// import txtfile from "src/assets/images/TypeFile/txt-file.png";

import { I18NextNs, Extension } from "../../../../../enum/enum";

import ModalAddDescription from "../PopUp/ModalAddDescription";
import { useUploadFile } from "../../useUploadFile";
import { I18n } from "@/lib";

const ItemCard = (props) => {
    const { sPopup } = props;
    const matches440 = useMediaQuery('(min-width:440px)');

    const {
        handleClickFile,
        onImageError,
        isOpen, setIsOpen,
        isOpenPopUpDetail,
        indexActive,
        ClosePopUp
    } = useUploadFile();

    const TooltipDescription = useCallback(() => {
        return (
            <Tooltip title={props.sDescription}>
                <Typography variant="body2" color="text.secondary" className="div-gallery-title">
                    {props.sFileName}
                </Typography>
            </Tooltip>
        )
    }, [props.sDescription, props.sFileName])

    return (
        <Fragment>
            <Card sx={{ maxWidth: matches440 ? 200 : 400, height: 187 }} >
                <CardActionArea style={{ position: 'relative', width: '100%' }}>
                    {
                        props.sProgress !== "100" && !props.IsCompleted &&
                        <Box display="flex" alignItems="center" className="div-gallery-icon">
                            <Box width="100%" p={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <CircularProgressWithLabelTable
                                    value={parseInt(props.sProgress) || 0}
                                    style={{
                                        width: '60px',
                                        height: '60px',
                                    }}
                                />
                            </Box>
                        </Box>
                    }
                    {Extension.Image.indexOf(props.sFileType.toLowerCase()) > -1 ?
                        <CardMedia
                            component="img"
                            image={props.sCropFileLink || ""
                            }
                            alt="Image"
                            className="div-gallery-img"
                            onClick={() => handleClickFile(props.dtRow)}
                            onError={onImageError}
                        />
                        : null}
                    {Extension.Video.indexOf(props.sFileType.toLowerCase()) > -1 ?
                        <CardMedia
                            component="img"
                            ///image={mp4file}
                            alt="MP4"
                            className="div-gallery-typeFile"
                            onClick={() => handleClickFile(props.dtRow)}
                        />
                        : null}

                    {Extension.PDF.indexOf(props.sFileType.toLowerCase()) > -1 ?
                        <CardMedia
                            component="img"
                            ///image={pdffile}
                            alt="PDF"
                            className="div-gallery-typeFile"
                            onClick={() => handleClickFile(props.dtRow)}
                        />
                        : null}
                    {Extension.Word.indexOf(props.sFileType.toLowerCase()) > -1 ?
                        <CardMedia
                            component="img"
                            ///image={docfile}
                            alt="DOC"
                            className="div-gallery-typeFile"
                            onClick={() => handleClickFile(props.dtRow)}
                        />
                        : null}
                    {Extension.Excel.indexOf(props.sFileType.toLowerCase()) > -1 ?
                        <CardMedia
                            component="img"
                            ///image={xlsfile}
                            alt="XLS"
                            className="div-gallery-typeFile"
                            onClick={() => handleClickFile(props.dtRow)}
                        />
                        : null}
                    {Extension.PowerPoint.indexOf(props.sFileType.toLowerCase()) > -1 ?
                        <CardMedia
                            component="img"
                            ///image={pptfile}
                            alt="PPT"
                            className="div-gallery-typeFile"
                            onClick={() => handleClickFile(props.dtRow)}
                        />
                        : null}
                    {Extension.Text.indexOf(props.sFileType.toLowerCase()) > -1 ?
                        <CardMedia
                            component="img"
                            ///image={txtfile}
                            alt="txt"
                            className="div-gallery-typeFile"
                            onClick={() => handleClickFile(props.dtRow)}
                        />
                        : null}
                    {Extension.Email.indexOf(props.sFileType.toLowerCase()) > -1 ?
                        <CardMedia
                            component="img"
                            ///image={txtfile}
                            alt="msg"
                            className="div-gallery-typeFile"
                            onClick={() => handleClickFile(props.dtRow)}
                        />
                        : null}
                    {Extension.Other.indexOf(props.sFileType.toLowerCase()) > -1 ?
                        <CardMedia
                            component="img"
                            ///image={txtfile}
                            alt="msg"
                            className="div-gallery-typeFile"
                            onClick={() => handleClickFile(props.dtRow)}
                        />
                        : null}
                    <div style={{ position: "absolute", right: 4, top: 4 }}>
                        {props.IsCompleted && !props.disabled ? (
                            <Tooltip title={I18n.SetText("UploadFile.Delete", I18NextNs.labelComponent)}>
                                <IconButton
                                    size="small"
                                    style={{ marginLeft: '4px' }}
                                    onClick={() => {
                                        props.onDelete(props.sSysFileName);
                                    }}
                                    className={"mui-style-DangerColor"}
                                >
                                    <DeleteForeverIcon />
                                </IconButton>
                            </Tooltip>
                        ) : null}
                    </div>
                </CardActionArea>
                <CardContent style={{ padding: '8px', background: '#f5f5f5' }}>
                    {TooltipDescription()}
                </CardContent>
            </Card>
            <ModalAddDescription
                IsOpen={isOpen}
                setIsOpen={setIsOpen}
                sDescription={props.sDescription}
                sFileName={props.sFileName}
                dtRow={props.dtRow}
            />
            <FilePopup
                file={props}
                IsopenPopUp={isOpenPopUpDetail}
                ClosePopUp={ClosePopUp}
                sCropFileLink={props.sCropFileLink}
                sFileName={props.sFileName}
                IsCrop={false}
                sSysFileName={props.sSysFileName}
                isGallery={Extension.Image.indexOf(props.sFileType.toLowerCase()) > -1}
                arrFile={props.arrFile}
                setStartVideoOn={props.setStartVideoOn}
                nStartVideoOn={props.nStartVideoOn}
                CannotSkipForward={props.CannotSkipForward}
                onVideoEnd={props.onVideoEnd}
                onDelete={props.onDelete}
                indexActive={indexActive}
                sPopup={sPopup}
            />

        </Fragment>
    );
};

export default ItemCard;

