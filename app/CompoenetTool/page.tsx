"use client";

import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import "@/styles/daypicker.css";
import "@/styles/custominput.css";
import "@/styles/customtailwind.css";
import Identifacation from "@/components/Project/PIC/Components/Identifacation";
import { Button, Grid, Typography } from "@mui/material";
import { AutocompleteItem, CheckBoxListItem, CheckboxItem, InputNumberFormat, MultiSelectItem, RadioListItem, SelectItem, TextAreaItem, TextBoxItem } from "@/components/input-element";
import { Text } from "@/components";
import { BtnAdd, BtnApprove, BtnComplete, BtnLoadSync,BtnAddMember,BtnRegister} from "@/components/mui-elements/Button/ButtonAll";

import MultiTreeSelectItem from "@/components/input-element/Select/MultiTreeSelectItem";
import {DatePickerItem,DatePickerMonthItem,DateRangPickerItem,MonthPickerItem,YearPickerItem} from "@/components/input-element/STDatePicker";
// import StepperCustom from "@/components/Project/PIC/Components/Stepper";
import SwitchFormItem from "@/components/input-element/Switch";
import { SwitchForm } from "@/components/input-element/Switch/SwitchForm";
import dynamic from "next/dynamic";
export default function App() {

  const [isRequire, setIsRequire] = useState(false)
  const [isDisable, setIsDisable] = useState(false)
  const [isSkeleton, setIsSkeleton] = useState(false)
  const [disableMode, setDisableMode] = useState("text")

  const StepperCustom: React.ComponentType<any> = dynamic(
    () => {
      return new Promise((resolve) =>
        import("@/components/Project/PIC/Components/Stepper").then(resolve)
      );
    },
    {
      loading: () => null,
      ssr: false,
    }
  );

  const form = useForm({
    shouldFocusError: true,
    shouldUnregister: false,
    mode: "all",
    defaultValues: {
      "style1": null,
      "style2": null,
      "style3": null,
      "styleInputNumber1": null,
      "styleInputNumber2": null,
      "select1": null,
      "multiselect1": null,
      "AutocompleteItem": null,
      "datepickerTH": null,
      "datepickerEN": null,

    }
  });

  const handleSetValue = () => {
    form.setValue("style1", "style1style1style1style1style1style1style1style1style1sle1style1style1style1style1style1style1style1style1style1style1style1");
    form.setValue("style2", "style2");
    form.setValue("style3", "style1style1style1style1style1style1style1style1style1sle1style1style1style1style1style1style1style1style1style1style1style1style1style1style1style1style1style1style1style1style1sle1style1style1style1style1style1style1style1style1style1style1style1");
    form.setValue("styleInputNumber1", 10000.01);
    form.setValue("styleInputNumber2", 10.01);
    // form.setValue("select1", "3");
    form.setValue("multiselect1", ["1","3"]);
    form.setValue("datepickerTH", new Date());
    form.setValue("datepickerEN", new Date());
    form.setValue("AutocompleteItem",{ label: "value 1", value: "1", color: "#009900", disable: false })

  }


  const handleClear = () => {
    Object.keys(form.getValues()).forEach(((key: any) => {
      form.setValue(key, null);
      form.clearErrors(key);
    }))
  }

  return (
    <FormProvider {...form}>
      <Grid container spacing={4} alignItems={"flex-start"} justifyContent={"center"} style={{ padding: '4rem' }}>
        <Grid item >
          <Button color="primary" variant="contained" onClick={form.handleSubmit((e) => { console.log("success", e) }, (e) => { console.log("error", e) })}>
            Submit
          </Button>
        </Grid>
        <Grid item >
          <Button color="warning" variant="contained" onClick={handleClear}>
            Clear
          </Button>
        </Grid>
        <Grid item >
          <Button color="error" variant="contained" onClick={handleSetValue}>
            Set Value
          </Button>
        </Grid>
        <Grid item >
          <Button color="secondary" variant="contained" onClick={() => setIsRequire(e => !e)}>
            {isRequire ? "unrequire" : "require"}
          </Button>
        </Grid>
        <Grid item >
          <Button color="success" variant="contained" onClick={() => setIsDisable(e => !e)}>
            {isDisable ? "undisable" : "disable"}
          </Button>
        </Grid>
        <Grid item >
          <Button color="info" variant="contained" onClick={() => setDisableMode(e => e == "input" ? "text" : "input")}>
            {disableMode === "input" ? "disableMode : input" : "disableMode : text"}
          </Button>
        </Grid>
        <Grid item >
          <Button color="warning" variant="contained" onClick={() => setIsSkeleton(e => !e)}>
            {isSkeleton ? "Skeleton : True" : "Skeleton : fasle"}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <CompoenetSkeleton isSkeleton={isSkeleton} disableMode={disableMode} isDisable={isDisable} isRequire={isRequire} />
        </Grid>     
        <Grid item xs={12}>
          <CompoenetSTDatePicker isSkeleton={isSkeleton} disableMode={disableMode} isDisable={isDisable} isRequire={isRequire} />
        </Grid>        
        <Grid item xs={12}>
          <CompoenetSelect isSkeleton={isSkeleton} disableMode={disableMode} isDisable={isDisable} isRequire={isRequire} />
        </Grid>
        <Grid item xs={12}>
          <CompoenetInputString isSkeleton={isSkeleton} disableMode={disableMode} isDisable={isDisable} isRequire={isRequire} />
        </Grid>
        <Grid item xs={12}>
          <CompoenetInputNumber isSkeleton={isSkeleton} disableMode={disableMode} isDisable={isDisable} isRequire={isRequire} />
        </Grid>
        <Grid item xs={12}>
          <CompoenetCheckBox isSkeleton={isSkeleton} disableMode={disableMode} isDisable={isDisable} isRequire={isRequire} />
        </Grid>
        <Grid item xs={12}>
          <CompoenetRadio isSkeleton={isSkeleton} disableMode={disableMode} isDisable={isDisable} isRequire={isRequire} />
        </Grid>
        <Grid item xs={12}>
          <StepperCustom />
        </Grid>
        <Grid item xs={12}>
          {/* <Identifacation /> */}
        </Grid>
        <Grid item xs={12}>        
          <CompoenetSwitch isSkeleton={isSkeleton} disableMode={disableMode} isDisable={isDisable} isRequire={isRequire} />
        </Grid>
      </Grid>
    </FormProvider>
  );
}

const CompoenetInputString = ({ isRequire, isDisable, isSkeleton, disableMode }) => {
  return (
    <Grid container spacing={2} style={{ border: '1px solid', borderStyle: "dotted", borderRadius: '12px', padding: '2em', }}>
      <Grid item xs={12}>
        <Typography fontWeight={700}>Input TextBox</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2} >
          <Grid item xs={4}>
            <TextBoxItem
              maxLength={100}
              label="style1"
              name="style1"
              required={isRequire}
              IsSkeleton={isSkeleton}
              IsCharacterCount
              disabled={isDisable}
              disableMode={disableMode}
            />
          </Grid>
          <Grid item xs={4}>
            <TextBoxItem
              maxLength={100}
              label="style2"
              name="style2"
              IsSkeleton={isSkeleton}
              required={isRequire}
              IsCharacterCount
              disabled={isDisable}
              disableMode={disableMode}
            />
          </Grid>
          <Grid item xs={4}>
            <TextAreaItem
              maxLength={100}
              row={3}
              label="style3"
              name="style3"
              IsSkeleton={isSkeleton}
              required={isRequire}
              IsCharacterCount
              disabled={isDisable}
              disableMode={disableMode}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const CompoenetInputNumber = ({ isRequire, isDisable, isSkeleton, disableMode }) => {
  return (
    <Grid container spacing={2} style={{ border: '1px solid', borderStyle: "dotted", borderRadius: '12px', padding: '2em', }}>
      <Grid item xs={12}>
        <Typography fontWeight={700}>Input Number Format</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2} >
          <Grid item xs={4}>
            <InputNumberFormat
              label="style1"
              name="styleInputNumber1"
              maxDigits={2}
              valueType="number"
              IsSkeleton={isSkeleton}
              required={isRequire}
              disabled={isDisable}
              disableMode={disableMode}
            />
          </Grid>
          <Grid item xs={4}>
            <InputNumberFormat
              label="style2"
              name="styleInputNumber2"
              IsAllowMinus={false}
              IsSkeleton={isSkeleton}
              IsThousandSeparator={false}
              maxLength={10}
              min={10}
              max={100}
              valueType="string"
              required={isRequire}
              disabled={isDisable}
              disableMode={disableMode}
            />
          </Grid>
          <Grid item xs={4}>

          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const CompoenetSelect = ({ isRequire, isDisable, isSkeleton, disableMode }) => {
  return (
    <Grid container spacing={2} style={{ border: '1px solid', borderStyle: "dotted", borderRadius: '12px', padding: '2em', }}>
      <Grid item xs={12}>
        <Typography fontWeight={700}>Input select</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2} >
          <Grid item xs={4}>
            <SelectItem
              label="select1"
              name="select1"
              IsSkeleton={isSkeleton}
              required={isRequire}
              disabled={isDisable}
              disableMode={disableMode}
              options={[
                { label: "value 1", value: "1", color: "#009900", disable: false },
                { label: "value 2", value: "2", color: "#dc3545", disable: true },
                { label: "value 3", value: "3", color: "#29bba6", disable: false }
              ]}
            />
          </Grid>
          <Grid item xs={4}>
            <MultiSelectItem
              label="multiselect1"
              name="multiselect1"
              IsSkeleton={isSkeleton}
              required={isRequire}
              disabled={isDisable}
              disableMode={disableMode}
              options={[
                { label: "value 1", value: "1", color: "#009900", disable: false },
                { label: "value 2", value: "2", color: "#dc3545", disable: true },
                { label: "value 3", value: "3", color: "#29bba6", disable: false }
              ]}
            />
          </Grid>
          <Grid item xs={4}>
            <AutocompleteItem
              name="AutocompleteItem"
              label="AutocompleteItem"
              IsSkeleton={isSkeleton}
              required={isRequire}
              disabled={isDisable}
              disableMode={disableMode}
              sParam={""}
              sUrlAPI={""}
            />
          </Grid>
          <Grid item xs={12}>
            <MultiTreeSelectItem
              label="Multi Tree Select"
              name="MultiTreeSelect2"
              IsSkeleton={isSkeleton}
              required={isRequire}
              disabled={isDisable}
              disableMode={disableMode}
              limitTag={4}
              options={[
                {
                  nLevel: 1,
                  IsParent: true,
                  sParentID: null,
                  value: "10",
                  label: "กรุงเทพมหานคร",
                  // color: "#29bba6",
                  // bgcolor: "#e6e6e6",
                  disable: false,        
                  sParentCode: "101-1011-10111-102-1012",
                },
                {
                  nLevel: 2,
                  IsParent: true,
                  sParentID: "10",
                  value: "101",
                  label: "nLevel 2.1",
                  // color: "#009900",
                  // bgcolor: "#f5efff",
                  disable: false,
                  sParentCode: "1011-10111-1012",
                },
                {
                  nLevel: 3,
                  IsParent: true,
                  sParentID: "101",
                  value: "1011",
                  label: "nLevel 3.1",
                  // color: "#009900",
                  // bgcolor: "#f5efff",
                  disable: false,
                  sParentCode: "10111",
                },
                {
                  nLevel: 4,
                  IsParent: false,
                  sParentID: "1011",
                  value: "10111",
                  label: "nLevel 4.1",
                  // color: "#dc3545",
                  // bgcolor: "#d0d0d0",
                  disable: false,
                  sParentCode: null,
                },
                {
                  nLevel: 3,
                  IsParent: true,
                  sParentID: "101",
                  value: "1012",
                  label: "nLevel 3.2",
                  // color: "#dc3545",
                  // bgcolor: "#f5efff",
                  disable: false,
                  sParentCode: null,
                }, 
                {
                  nLevel: 2,
                  IsParent: true,
                  sParentID: "10",
                  value: "102",
                  label: "nLevel 2.2",
                  // color: "#009900",
                  // bgcolor: "#f5efff",
                  disable: false,
                  sParentCode: null,
                },             
                {
                  nLevel: 1,
                  IsParent: true,
                  sParentID: null,
                  value: "11",
                  label: "นนทบุรี",
                  // color: "#dc3545",
                  // bgcolor: "#ffeded",
                  disable: true,
                  sParentCode: null,
                },
                {
                  nLevel: 1,
                  IsParent: true,
                  sParentID: null,
                  value: "12",
                  label: "ชัยนาท",
                  // color: "#e6e6e6",
                  // bgcolor: "#d0d0d0",
                  disable: false,                  
                  sParentCode: null,
                },
                {
                  nLevel: 2,
                  IsParent: false,
                  sParentID: "12",
                  value: "201",
                  label: "วัดสิงห์",
                  // color: "#009900",
                  // bgcolor: "#d0d0d0",
                  disable: false,
                  sParentCode: null,
                },
                {
                  nLevel: 2,
                  IsParent: false,
                  sParentID: "12",
                  value: "202",
                  label: "มะขามเฒ่า",
                  // color: "#009900",
                  // bgcolor: "#d0d0d0",
                  disable: false,
                  sParentCode: null,
                },
              ]}
              onChange={(e)=> {
                let lstData = e;
              }}
            />
          </Grid>        
        </Grid>
      </Grid>
    </Grid>
  );
}

const CompoenetSTDatePicker = ({ isRequire, isDisable, isSkeleton, disableMode }) => {
  return (
    <Grid container spacing={2} style={{ border: '1px solid', borderStyle: "dotted", borderRadius: '12px', padding: '2em', }}>
      <Grid item xs={12}>
        <Typography fontWeight={700}>Input DatePicker</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2} >
          <Grid item xs={4}>
            <DatePickerItem
              label="DatePicker"
              name="DatePicker"
              IsSkeleton={isSkeleton}
              required={isRequire}
              disabled={isDisable}
              disableMode={disableMode}
            />
          </Grid>
          <Grid item xs={4}>
            <DateRangPickerItem
              label="DatePicker2"
              name="DatePicker2"
              label2="DatePicker3"
              name2="DatePicker3"
              IsSkeleton={isSkeleton}
              required={isRequire}
              disabled={isDisable}
              disableMode={disableMode}
            />
          </Grid>
          <Grid item xs={4}>
          <MonthPickerItem
              label="MonthPicker"
              name="MonthPicker"
              IsSkeleton={isSkeleton}
              required={isRequire}
              disabled={isDisable}
              disableMode={disableMode}
            />
          </Grid>
          
          <Grid item xs={4}>
          <YearPickerItem
              label="YearPicker"
              name="YearPicker"
              IsSkeleton={isSkeleton}
              required={isRequire}
              disabled={isDisable}
              disableMode={disableMode}
              localeDate="en"
            />
          </Grid>
          
          
          <Grid item xs={4}>
            <DatePickerMonthItem
              label="DatePickerMonth"
              name="DatePickerMonth"
              IsSkeleton={isSkeleton}
              required={isRequire}
              disabled={isDisable}
              disableMode={disableMode}
              localeDate="en"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const CompoenetCheckBox = ({ isRequire, isDisable, isSkeleton, disableMode }) => {
  return (
    <Grid container spacing={2} style={{ border: '1px solid', borderStyle: "dotted", borderRadius: '12px', padding: '2em', }}>
      <Grid item xs={12}>
        <Typography fontWeight={700}>Input CheckBox</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2} >
          <Grid item xs={4}>
            <CheckboxItem
              label="checkBox item"
              name="checkBox1"
              IsSkeleton={isSkeleton}
              required={isRequire}
              disabled={isDisable}
              disableMode={disableMode}
              options={[
                { label: "value 1", value: "1", color: "#009900", disable: false },
              ]}
            />
          </Grid>
          <Grid item xs={4}>
            <CheckBoxListItem
              label="checkBox list"
              name="checkBox2"
              IsSkeleton={isSkeleton}
              required={isRequire}
              disabled={isDisable}
              disableMode={disableMode}
              options={[
                { label: "value 1", value: "1", color: "#009900", disable: false },
                { label: "value 2", value: "2", color: "#dc3545", disable: true },
                { label: "value 3", value: "3", color: "#29bba6", disable: false }
              ]}
            />
          </Grid>
          <Grid item xs={4}>
            <CheckBoxListItem
              label="checkBox All"
              name="checkBox3"
              IsSelectAllOption
              IsSkeleton={isSkeleton}
              required={isRequire}
              disabled={isDisable}
              disableMode={disableMode}
              options={[
                { label: "value 1", value: "1", color: "#009900", disable: false },
                { label: "value 2", value: "2", color: "#dc3545", disable: true },
                { label: "value 3", value: "3", color: "#29bba6", disable: false }
              ]}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const CompoenetRadio = ({ isRequire, isDisable, isSkeleton, disableMode }) => {
  return (
    <Grid container spacing={2} style={{ border: '1px solid', borderStyle: "dotted", borderRadius: '12px', padding: '2em', }}>
      <Grid item xs={12}>
        <Typography fontWeight={700}>Input Radio</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2} >
          <Grid item xs={4}>
            <RadioListItem
              label="radio1"
              name="radio1"
              IsSkeleton={isSkeleton}
              required={isRequire}
              disabled={isDisable}
              disableMode={disableMode}
              options={[
                { label: "value 1", value: "1", color: "#009900", disable: false },
                { label: "value 2", value: "2", color: "#dc3545", disable: true },
                { label: "value 3", value: "3", color: "#29bba6", disable: false }
              ]}
            />
          </Grid>
          <Grid item xs={4}>
            <RadioListItem
              label="radio2"
              name="radio2"
              IsSkeleton={isSkeleton}
              required={isRequire}
              disabled={isDisable}
              disableMode={disableMode}
              IsDisplayLabel={false}
              options={[
                { label: "value 1", value: "1", color: "#009900", disable: false },
                { label: "value 2", value: "2", color: "#dc3545", disable: true },
                { label: "value 3", value: "3", color: "#29bba6", disable: false }
              ]}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const CompoenetSkeleton = ({ isRequire, isDisable, isSkeleton, disableMode }) => {

  return (
    <Grid container spacing={2} style={{ border: '1px solid', borderStyle: "dotted", borderRadius: '12px', padding: '2em', }}>
      <Grid item xs={12}>
        <Text IsSkeleton={isSkeleton} variant="body1" align="center">body1 : All Tool Set Up</Text>
        <Text IsSkeleton={isSkeleton} variant="h6" align="center">h6 : All Tool Set Up</Text>
      </Grid>
      <Grid item >
        <BtnAdd id="add" IsSkeleton={isSkeleton} onClick={() => { }} />
      </Grid>
      <Grid item >
        <BtnLoadSync id="sync" IsCircleWithOutText IsSkeleton={isSkeleton} onClick={() => { }} />
      </Grid>
      <Grid item >
        <BtnApprove id="approve" IsSkeleton={isSkeleton} onClick={() => { }} />
      </Grid>
      <Grid item >
        <BtnAddMember id="addmember" IsSkeleton={isSkeleton} onClick={() => { }} />
      </Grid>
      <Grid item >
        <BtnRegister id="register" IsSkeleton={isSkeleton} onClick={() => { }} />
      </Grid>
      <Grid item >
        <BtnComplete id="complete" IsSkeleton={isSkeleton} onClick={() => { }} />
      </Grid>
    </Grid>
  )

}

const CompoenetSwitch = ({ isRequire, isDisable, isSkeleton, disableMode }) => {
  return (
    <Grid container spacing={2} style={{ border: '1px solid', borderStyle: "dotted", borderRadius: '12px', padding: '2em', }}>
      <Grid item xs={12}>
        <Typography fontWeight={700}>Input Switch</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2} >
          <Grid item xs={4}>
            <SwitchFormItem
              label={"Switch Form Item"}
              name={"isActive"}
              disabled={isDisable}
              required={isRequire}
              IsDisplayLabel={false}
              IsSkeleton={isSkeleton}
              disableMode={disableMode}
            />
          </Grid>
          <Grid item xs={4}>
            <SwitchForm
              label={"Switch Form"}
              name={"isActive1"}
              required={isRequire}
              disabled={isDisable}
              IsSkeleton={isSkeleton}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}