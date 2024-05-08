import { STFilterField, STTableColumnDetail } from '../STTableProps';
import TextBoxItem from "../../input-element/TextBox/TextBox";
import SelectItem from "../../input-element/Select/SelectItem";
import MultipleSelectItem from "../../input-element/Select/MultiSelectItem";
import DateRangePickerItem from "../../input-element/DateRangePicker/DateRangePickerItem";
import DatePickerItem from "../../input-element/DatePicker/DatePickerItem";
import  CheckBoxListItem  from "../../input-element/Checkbox/CheckBoxListItem";
import { Box } from '@mui/material';
const ControlFilter = (
  item: STFilterField,
  colums: STTableColumnDetail[],
  isLoading,
  sTableID
) => {
  let sLabelFilter = item.sLabel;
  if (!item.sLabel) {
    const objColumns = colums.find((f) => f.field === item.sFieldName);
    if (objColumns) {
      sLabelFilter = objColumns.headerName;
    }
  }
  let sFieldName = item.fieldSearch ? item.fieldSearch : item.sFieldName;
  let sIDFilter = `filter_${sTableID}_${sFieldName}`;
  let arrOption = item.optionSelect ? item.optionSelect : [];

  switch (item.sTypeFilterMode) {
    case "input": {
      return (
        <TextBoxItem
          id={sIDFilter}
          label={sLabelFilter}
          name={sIDFilter}
          type={"text"}
          maxLength={200}
          required={false}
        // style={{ margin: "0" }}
        />
      );
    }
    case "select": {
      return (
        <SelectItem
          required={false}
          label={sLabelFilter}
          id={sIDFilter}
          name={sIDFilter}
          options={arrOption}
        />
      );
    }
    case "checkbox": {
      return (
        <CheckBoxListItem
          key={sIDFilter}
          id={sIDFilter}
          name={sIDFilter}
          label={sLabelFilter}
          IsSelectAllOption={false}
          options={arrOption}
          required={false}
          row={false}
          // style={{ marginLeft: "20px" }}
        />
      )
    }
    case "multiselect": {
      return (
        <MultipleSelectItem
          required={false}
          label={sLabelFilter}
          id={sIDFilter}
          name={sIDFilter}
          options={arrOption}
          limitTag={1}
          IsPopperCustom={false}
        />
      );
    }
    case "daterange": {
      return (<></>
        // <DateRangePickerItem
        //   name={sIDFilter}
        //   id={sIDFilter}
        //   label={sLabelFilter}
        //   labelStart={`${item.sLabel} ${I18n.SetText("start")}`}
        //   labelEnd={`${item.sLabel} ${I18n.SetText("end")}`}
        // />
      );
    }
    case "date": {
      return (<></>
        // <DatePickerItem
        //   name={sIDFilter}
        //   id={sIDFilter}
        //   label={sLabelFilter}
        //   fullWidth
        // />
      );
    }
  }
};

export default ControlFilter;