import { Grid } from "@mui/material";
import React, { Fragment } from "react";
import { BtnAdd, BtnRemove } from "@/components/mui-elements/Button/ButtonAll";
import ComponentChoice from "./ComponentChoice";

function DynamicComponentChoice({ state, form, choices, setChoices }) {
  const addComponent = () => {
    const values = form.getValues();
    let nMaxData =
      choices.length > 0 ? Math.max(...choices.map((o) => o.nID)) + 1 : 1;
    const newChoice = {
      nID: nMaxData,
      sChoice: values.sMainChoice,
      sNote: values.sMainNote,
      IsNote: values.IsNote,
      IsRequired: values.IsRequired,
    };
    const updatedDataArray = [
      ...choices.map((item) => ({
        ...item,
        ...(item.nID === null && {
          sChoice: "",
          sNote: "",
          IsNote: false,
          IsRequired: false,
        }),
      })),
      newChoice,
    ];

    setChoices(updatedDataArray);
    form.reset();
  };

  const removeComponent = (id) => {
    setChoices(choices.filter((component) => component.nID !== id));
  };

  const handleChange = (id, field, value) => {
    setChoices(
      choices.map((component) => {
        if (component.nID === id) {
          return { ...component, [field]: value };
        }
        return component;
      })
    );
    form.setValue(field + (id ?? ""), value);
  };

  return (
    <Grid container spacing={2}>
      <ComponentChoice
        state={state}
        choice={choices.find((f) => f.nID == null)}
        handleChange={handleChange}
        form={form}
      />
      <Grid item xs={2}>
        <BtnAdd id={"btnAdd"} onClick={addComponent} IsCircleWithOutText />
      </Grid>

      {choices
        .filter((f) => f.nID != null)
        .map((c) => (
          <Fragment key={c.nID}>
            <ComponentChoice
              state={state}
              choice={c}
              handleChange={handleChange}
              key={c.nID}
              form={form}
            />
            <Grid item xs={2}>
              <BtnRemove
                id={"btnRemove"}
                onClick={() => removeComponent(c.nID)}
                IsCircleWithOutText
              />
            </Grid>
          </Fragment>
        ))}
    </Grid>
  );
}

export default DynamicComponentChoice;
