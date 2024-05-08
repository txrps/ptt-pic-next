"use client";

import { AutocompleteItem, CheckBoxListItem, MultiSelectItem, SelectItem, TextBoxItem } from "@/components";
import { DateRangPickerItem } from "@/components/input-element/STDatePicker";
import SwitchFormItem from "@/components/input-element/Switch";
import { AxiosFn, FnDialog } from "@/lib/useAxios";
import { FnAxios } from "@/lib/useAxios";
import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { BtnSubmit, BtnBack } from "@/components/mui-elements/Button/ButtonAll";

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { initRows } from "@/components/STTable/STTable";
import { STTableRow } from "@/components/STTable/STTableProps";
import moment from "moment";


export const useUserPermissionFormManagement = () => {

  const searchParams = useSearchParams();
  // const [sID, setSID] = useState("0");

  const DialogFn = FnDialog();
  const [isLoadding, setIsLoadding] = useState(false)
  const [isSkeleton, setIsSkeleton] = useState(false)

  const [dropDownUnit, setDropDownUnit] = useState([]);
  const [dropDownGroup, setDropDownGroup] = useState([]);

  const [isUnit, setIsUnit] = useState(false);
  const [isDate, setIsDate] = useState(false);
  const [isShowUnit, setIsShowUnit] = useState(false);
  const [isRequitDate, setIsRequitDate] = useState(true);

  const frontURL = process.env.NEXT_PUBLIC_APP_URL;

  const sID = searchParams.get("sID") || "0";
  ///console.log("sID", sID);


  const form = useForm({
    shouldUnregister: false,
    shouldFocusError: true,
    mode: "all",
  });

  const [dataRow, setDataRow] = useState({
    ...initRows,
  });


  useEffect(() => {
    ////form.setValue("username", "sdsdsdsd");
    onLoadData();
    onGetdData(dataRow);
  }, []);

  const onLoadData = () => {
    setIsSkeleton(true);

    AxiosFn.Get("User/GetInitialTable", "", (res) => {
      ////console.log("GetInitialTable", res);
      setDropDownUnit(res.arrUnit);
      setDropDownGroup(res.arrGroup);
      setIsSkeleton(false);
    })
  }


  const onGetdData = (p: STTableRow) => {
    if (sID != "0") {
      let objParam = p || dataRow;
      const param = {
        sIDDnc: sID,
        ...objParam,
      }

      DialogFn.BlockUI();
      AxiosFn.Post("User/GetDataByID", param, (res) => {
        console.log("GetDataByID", res);

        if (res.lstData.length > 0) {

          for (const item of res.lstData) {
            const obj = {
              label: item.sFullName,
              value: item.sEmpCode,
              sName: item.sEmpName,
              sDepartmentCode: item.sUnitCode,
            }
            form.setValue("username", obj);

            ///const sGroupID = item.sGroupID;
            form.setValue("groupUser", item.sGroupID);


            if (item.isForever) {
              form.setValue("checkBoxActive", ['1']);
              setIsDate(true);
              setIsRequitDate(false);
            }
            else {
              form.setValue("dStartDate", moment(item.nStartDate).format("MM/DD/YYYY"));
              form.setValue("dEndDate", moment(item.nEndDate).format("MM/DD/YYYY"));
              setIsRequitDate(true);
            }
            form.setValue("isStatus", item.isActive);

            setIsShowUnit(item.isUnit);
            form.setValue("unitUser", item.lstsUnit);
          }

          DialogFn.UnBlockUI();
        }
      });
    }
  }

  const onSave = () => {
    const isForever = form.getValues("checkBoxActive").length >= 1;
    ////console.log("getValues groupUser", form.getValues("groupUser"));
    const param = {
      sIDDnc: sID,
      ///sID: sID,
      sEmpCode: form.getValues("username").value,
      sEmpName: form.getValues("username").sName,
      sEmail: form.getValues("username").sEmail,
      sDepartmentCode: form.getValues("username").sDepartmentCode,
      nGroupID: form.getValues("groupUser") || null,
      lstUnit: form.getValues("unitUser") || null,
      // dStartDate: form.getValues("dStartDate") || null,
      // dEndDate: form.getValues("dEndDate") || null,
      isForever: isForever,
      isActive: form.getValues("isStatus"),

      nStartDate: moment(form.getValues("dStartDate")).valueOf() || null,
      nEndDate: moment(form.getValues("dEndDate")).valueOf() || null,
    }
    console.log("onSave", param)
    DialogFn.Submit("คุณต้องการบันทึกข้อมูล ใช่หรือไม่", () => {
      DialogFn.BlockUI();
      AxiosFn.Post("User/Save", param, (res) => {
        DialogFn.Success("บันทึกข้อมูลเรียบร้อยแล้ว");

        ////window.location.reload();
        window.location.href = frontURL + "admin/permission/userPermission";
        DialogFn.UnBlockUI();
      });
    });
  }

  return {
    isLoadding,
    isSkeleton,
    dropDownUnit,
    dropDownGroup,
    onSave,
    form,
    setIsUnit,
    isUnit,
    setIsDate,
    isDate,
    isShowUnit,
    setIsShowUnit,
    isRequitDate,
    setIsRequitDate,
  }
}




const UserPermissionForm = () => {

  const {
    isLoadding,
    isSkeleton,
    dropDownUnit,
    dropDownGroup,
    onSave,
    form,
    setIsDate,
    isDate,
    isShowUnit,
    setIsShowUnit,
    isRequitDate,
    setIsRequitDate,
  } = useUserPermissionFormManagement();


  return (
    <FormProvider {...form}>
      <Grid container sx={{ mt: 2, gap: "1rem" }}>

        <Grid container sx={{ gap: "2rem" }}>
          <Grid item xs={4}>
            <AutocompleteItem
              name="username"
              label="UserName"
              IsSkeleton={isSkeleton}
              required={true}
              disabled={false}
              disableMode={"input"}
              sParam={""}
              sUrlAPI={"Pis/SearchEmp"}
            />
          </Grid>
          <Grid item xs={5}>
            <DateRangPickerItem
              label="วันที่เริ่มต้น"
              name="dStartDate"
              label2="วันที่สิ้นสุด"
              name2="dEndDate"
              IsSkeleton={false}
              required={isRequitDate}
              disabled={isDate}
              disableMode={"input"}
            />
          </Grid>
          <Grid item xs={2}>
            <CheckBoxListItem
              name="checkBoxActive"
              label=""
              IsSelectAllOption={false}
              IsSkeleton={isSkeleton}
              required={false}
              disabled={false}
              ///disableMode={disableMode}
              options={[
                { label: "ตลอดเวลา", value: "1", color: "#009900", disable: false },
              ]}
              onChange={(item) => {
                if (item.length > 0) {
                  form.resetField("dStartDate");
                  form.resetField("dEndDate");
                  setIsDate(true);
                  setIsRequitDate(false);
                }
                else {
                  setIsDate(false);
                  setIsRequitDate(true);
                }
              }}
            />
          </Grid>

        </Grid>


        <Grid container sx={{ gap: "2rem" }}>
          <Grid item xs={4}>
            <SelectItem
              label={"Group User"}
              id={"groupUser"}
              name="groupUser"
              IsSkeleton={isSkeleton}
              required={true}
              disabled={false}
              //// disableMode={false}
              options={dropDownGroup}
              onChange={(item) => {
                if (item) {
                  setIsShowUnit(item.isUnit);
                }
              }}
            />
          </Grid>

          {isShowUnit ?
            <Grid item xs={5}>
              <MultiSelectItem
                key={"1"}
                label={"Department"}
                id={"unitUser"}
                name="unitUser"
                IsSkeleton={false}
                required={true}
                disabled={false}
                disableMode={'input'}
                options={dropDownUnit}
              />
            </Grid>
            :
            <></>
          }

          <Grid item xs={4}></Grid>
        </Grid>


        <Grid container>
          <Grid item xs={12}>
            {/* <Box sx={{ display: "flex", gap: "6px" }}>
              <Box>สถานะ</Box>
              <Box key={"isActive"} style={{ color: "red" }}> * </Box>
            </Box> */}
            <SwitchFormItem
              id={"isStatus"}
              name={"isStatus"}
              label={"สถานะ"}
              disabled={false}
              required={true}
            />
          </Grid>
        </Grid>


        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
            <Link href={{ pathname: "/admin/permission/userPermission" }}>
              <BtnBack id={"back"} txt={"back"} />
            </Link>

            <BtnSubmit
              id={"save"}
              txt={"Save"}
              onClick={form.handleSubmit((e) => onSave(),
                (err) => console.log("err", err)
              )}
            />
          </Grid>
        </Grid>


      </Grid>
    </FormProvider>
  )
}

export default UserPermissionForm