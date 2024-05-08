import { TextBoxItem, CheckboxItem } from "@/components";
import { Grid } from "@mui/material";
import { optionsNote, optionsRequired } from "../hooks/useAdQuesion";

function ComponentChoice({ state, choice, handleChange, form }) {
  form.setValue("sMainChoice" + (choice.nID ?? ""), choice.sChoice);
  form.setValue("sMainNote" + (choice.nID ?? ""), choice.sNote);
  return (
    <Grid item xs={10}>
      <TextBoxItem
        maxLength={500}
        label="ตัวเลือก"
        name={"sMainChoice" + (choice.nID ?? "")}
        required={true}
        IsSkeleton={state.isSkeleton}
        IsCharacterCount
        disabled={false}
        defaultValue={choice.sChoice}
        onChange={(e) => handleChange(choice.nID, "sChoice", e.target.value)}
      />
      <Grid container spacing={2} mt={1}>
        <Grid item xs={2}>
          <CheckboxItem
            label=""
            name={"IsNote" + (choice.nID ?? "")}
            IsSkeleton={state.isSkeleton}
            required={false}
            disabled={false}
            options={optionsNote}
            defaultValue={choice.IsNote}
            onChange={() => {
              handleChange(choice.nID, "IsNote", !choice.IsNote);
              form.setValue("sMainNote" + (choice.nID ?? ""), "");
            }}
          />
        </Grid>
        <Grid item xs={8}>
          <TextBoxItem
            maxLength={500}
            label="หมายเหตุ"
            name={"sMainNote" + (choice.nID ?? "")}
            required={false}
            IsSkeleton={state.isSkeleton}
            IsCharacterCount
            disabled={!choice.IsNote}
            defaultValue={choice.sNote}
            onChange={(e) => handleChange(choice.nID, "sNote", e.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
          <CheckboxItem
            label=""
            name={"IsRequired" + (choice.nID ?? "")}
            IsSkeleton={state.isSkeleton}
            required={false}
            disabled={false}
            options={optionsRequired}
            defaultValue={choice.IsRequired}
            onChange={() =>
              handleChange(choice.nID, "IsRequired", !choice.IsRequired)
            }
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ComponentChoice;
