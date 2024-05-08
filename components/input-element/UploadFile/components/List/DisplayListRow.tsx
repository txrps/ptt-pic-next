import React, { useMemo } from "react";
import Grid from "@mui/material/Grid";
import ItemRow from "./ItemRow";
import { Checkbox, FormControlLabel } from "@mui/material";
import _ from "lodash";

import { I18NextNs } from '@/enum/enum';
import { BtnDelete } from "@/components/mui-elements/Button/ButtonAll";
import { FnDialog } from "@/lib/useAxios";
import { I18n } from "@/lib";

export const handleClickSelect = (sSysFileName, selected, setSelected) => {
  const selectedIndex = selected.indexOf(sSysFileName);
  let newSelected = [];
  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selected, sSysFileName);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selected.slice(1));
  } else if (selectedIndex === selected.length - 1) {
    newSelected = newSelected.concat(selected.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      selected.slice(0, selectedIndex),
      selected.slice(selectedIndex + 1),
    );
  }
  setSelected(newSelected);
}

export const handleDelete = (newArrFile, selected, props) => {
  let arrNew = _.filter(newArrFile, (item) => {
    return !selected.includes(item.sSysFileName);
  });
  //Delete File un-used
  selected.forEach(sSysFileName => {
    props.onDeleteFileInLocation(sSysFileName)
  });
  props.SetarrFile(arrNew);
}

const DisplayListRow = (props: any) => {

  const {
    IsCrop,
    cropShape,
    cropRatio,
    cropResize,
    cropMovable,
    IsHide = false
  } = props;

  const DialogFn = FnDialog();
  const [selected, setSelected] = React.useState<readonly string[]>([]);

  const newArrFile = useMemo(() => {
    let arr = [] as any;
    if (props.arrFile) {
      arr = Array.from(props.arrFile);
    }
    return arr;
  }, [props.arrFile])

  const onHandleDelete = () => {
    DialogFn.Submit(
      I18n.SetText("Message.ConfirmSave", I18NextNs.labelComponent)
      , () => {
        DialogFn.Success(I18n.SetText("Message.SaveComplete", I18NextNs.labelComponent));
        DialogFn.CloseSubmit()
        DialogFn.UnBlockUI();
        handleDelete(newArrFile, selected, props)
      }
    )
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = newArrFile.map((n) => n.sSysFileName);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (sSysFileName: string) => {
    handleClickSelect(sSysFileName, selected, setSelected)
  };

  const isSelected = (sSysFileName: string) => selected.indexOf(sSysFileName) !== -1;

  return (
    <Grid
      container
      justifyContent="flex-start"
      alignItems="center"
    >
      {props.IsMultiDelete && !IsHide &&
        <Grid item xs={12}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item >
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    indeterminate={selected.length > 0 && selected.length < newArrFile.length}
                    checked={newArrFile.length > 0 && selected.length === newArrFile.length}
                    onChange={handleSelectAllClick}
                  />
                }
                label="Check All"
                style={{ marginLeft: '12px' }}
              />
            </Grid>
            <Grid item >
              {
                selected.length > 0 ?
                  <BtnDelete id={"delete-onTable"} txt="ลบ" onClick={onHandleDelete} />
                  : null
              }
            </Grid>
          </Grid>
        </Grid>
      }
      <Grid item xs={12}>
        <ul className={"mui-style-lstFile"} >
          {newArrFile.map((f, i) => {
            let sKey = f.sSysFileName + "";
            let sKeyItem = f.sSysFileName + i;
            return (
              <li style={{ padding: '4px 0px' }} key={sKey}  >
                <ItemRow
                  key={sKeyItem}
                  IsopenPopUp={props.IsopenPopUp}
                  setIsopenPopUp={props.setIsopenPopUp}
                  IsCrop={IsCrop}
                  cropShape={cropShape}
                  cropRatio={cropRatio}
                  cropResize={cropResize}
                  cropMovable={cropMovable}
                  arrObjFile={props.arrObjFile}
                  sFileType={f.sFileType}
                  sFileName={f.sFileName}
                  sPath={f.sPath}
                  sSize={f.sSizeName}
                  IsCompleted={f.IsCompleted}
                  IsProgress={f.IsProgress}
                  sProgress={f.sProgress}
                  sFolderName={f.sFolderName}
                  onDelete={props.onDelete}
                  sSysFileName={f.sSysFileName}
                  sUrl={f.sUrl}
                  sCropFileLink={f.sCropFileLink}
                  sFileLink={f.sFileLink}
                  disabled={props.disabled}
                  onOpenFile={props.onOpenFile}
                  IsHiddenUploadBox={props.IsHiddenUploadBox}
                  setStartVideoOn={props.setStartVideoOn}
                  nStartVideoOn={props.nStartVideoOn}
                  CannotSkipForward={props.CannotSkipForward}
                  onVideoEnd={props.onVideoEnd}
                  onDeleteFileInLocation={props.onDeleteFileInLocation}
                  SendCropImage={props.SendCropImage}
                  //Delete multi
                  IsMultiDelete={props.IsMultiDelete}
                  handleSelectAllClick={handleSelectAllClick}
                  handleClick={handleClick}
                  isSelected={isSelected}
                  onHandleDelete={onHandleDelete}
                  sPopup={props.sPopup}
                  IsHide={IsHide}
                />
                <hr style={{ marginTop: '8px', borderColor: '#ebeef1', opacity: 0.4 }} />
              </li>
            );
          })}
        </ul>
      </Grid>
    </Grid>
  );
};
export default DisplayListRow;