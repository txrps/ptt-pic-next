import { describe, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { DatePickerItem } from "@/components/input-element/DatePicker";
import {
  ConvertDateToUnixOrNull,
  ConvertUnixToDateOrNull,
} from "@/components/input-element/DatePicker/DatePickerItem";
import DateMonthPicker from "@/components/input-element/DatePicker/DateMonthPicker";
import MonthPicker from "@/components/input-element/DatePicker/MonthPicker";
import TimePicker, {
  handleHourChange,
  handleClickActionArrow,
  InputTimeValue,
} from "@/components/input-element/DatePicker/TimePicker";
import YearPicker from "@/components/input-element/DatePicker/YearPicker";
import { IDatePicker } from "@/lib";

const sampleProps: IDatePicker = {
  label: "date",
  name: "date",
  required: true,
  defaultMonth: new Date(),
  localeDate: "en",
  minMonth: 1,
  maxMonth: 12,
  maxDate: new Date(),
  minDate: new Date(),
  onFocus: (event: any) => () => {},
  arrDisable: [],
};

const sampleProps2: IDatePicker = {
  label: "date2",
  name: "date2",
  required: true,
  IsSkeleton: false,
  disabled: false,
  disableMode: "text",
};

describe("Component Date Picker", () => {
  it("Render DatePickerItem", () => {
    render(<DatePickerItem {...sampleProps}></DatePickerItem>);

    ConvertDateToUnixOrNull(new Date());
    ConvertUnixToDateOrNull(new Date());
  });

  it("Render DateMonthPicker", () => {
    render(<DateMonthPicker {...sampleProps2}></DateMonthPicker>);
  });

  it("Render MonthPicker", () => {
    render(<MonthPicker {...sampleProps2}></MonthPicker>);
  });

  it("Render TimePicker", () => {
    const event = {
      preventDefault() {},
      target: { value: "the-value" },
    };
    render(<TimePicker {...sampleProps2}></TimePicker>);
    handleHourChange(event, "hour", new Date(), vi.fn());
    handleClickActionArrow("hour", "up", new Date(), vi.fn());
    handleClickActionArrow("hour", "down", new Date(), vi.fn());
    handleClickActionArrow("minute", "up", new Date(), vi.fn());
    handleClickActionArrow("minute", "down", new Date(), vi.fn());
    InputTimeValue(vi.fn());
  });

  it("Render TimePicker false", () => {
    render(<TimePicker {...sampleProps2}></TimePicker>);
  });

  it("Render YearPicker", () => {
    render(<YearPicker {...sampleProps}></YearPicker>);
  });
});
