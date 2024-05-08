"use client";

import React, { Fragment, useEffect, useId, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { Button, Grid } from "@mui/material";
import { BtnDelete, BtnExpand, BtnSubmit } from "@/components/mui-elements/Button/ButtonAll";
import { MultiSelectItem, SelectItem, Text, TextBoxItem } from "@/components";

export default function Homapage() {



  const [isRequire, setIsRequire] = useState(false)
  const [isDisable, setIsDisable] = useState(false)
  const [isSkeleton, setIsSkeleton] = useState(true)
  const [disableMode, setDisableMode] = useState<"input" | "text">("text")

  const form = useForm({
    shouldFocusError: true,
    shouldUnregister: false,
    mode: "all",
    defaultValues: {
      arrmock: new Array(100).fill(
        { valueTextBox: "", valueSelect: "",valueMulti: [], label: "" }
      )
    }
  });
  const { control, reset, watch } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "arrmock"
  });

  const onSubmit = (data) => console.log("data", data);
  const onAdd = () => {
    append({ valueTextBox: "Add Text Box", valueSelect: "", valueMulti: [], label: "Add" })
  };

  const onRemove = (index) => {
    remove(index)
    reset({
      ...watch(),
    });
  };

  const id1 = useId();
  console.log("id", id1);

  useEffect(() => {
    setTimeout(() => {
      setIsSkeleton(false)
    }, 1000)
    
  }, [])
  


  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>

        <Grid container spacing={2} alignItems={"flex-start"} justifyContent={"center"} style={{ padding: '4rem' }}>
          <Grid item xs={12}>
            <h1>Page : Form</h1>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item >
                <BtnSubmit id="btnSubmit" onClick={form.handleSubmit(onSubmit)} />
              </Grid>
              <Grid item >
                <BtnExpand id="btnAdd" txt="Add" onClick={() => onAdd()} />
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
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              {fields.map((item, index) => {
                let genKey = `${id1}-${index}`;
                return (
                  <Fragment key={genKey}>
                    <Grid item xs={1}>
                      <Text IsSkeleton={isSkeleton}>row {index + 1}</Text>
                    </Grid>
                    <Grid item xs={3}>
                      <TextBoxItem
                        label={``}
                        maxLength={200}
                        name={`arrmock.${index}.valueTextBox`}
                        IsSkeleton={isSkeleton}
                        required={isRequire}
                        disabled={isDisable}
                        disableMode={disableMode}
                        IsCharacterCount={false}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <SelectItem
                        label=""
                        name={`arrmock.${index}.valueSelect`}
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
                    <Grid item xs={3}>
                      <MultiSelectItem
                        label=""
                        name={`arrmock.${index}.valueMulti`}
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

                    <Grid item xs={2}>
                      <BtnDelete id={`BtnDelete_${index}`} IsSkeleton={isSkeleton} onClick={() => onRemove(index)} />
                    </Grid>
                  </Fragment>
                )
              })}
            </Grid>
          </Grid>

        </Grid>
      </form>
    </FormProvider>
  )
};
