import { describe, it, vi } from "vitest";
import { render } from "@testing-library/react";
import DatePickerItem from "@/components/input-element/STDatePicker/DatePickerItem";
import DatePickerMonthItem from "@/components/input-element/STDatePicker/DatePickerMonthItem";
import MonthPickerItem from "@/components/input-element/STDatePicker/MonthPickerItem";
import YearPickerItem from "@/components/input-element/STDatePicker/YearPickerItem";
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

describe("Component STDatePickerItem", () => {
  it("Render STDatePickerItem", () => {
    render(<DatePickerItem {...sampleProps}></DatePickerItem>);
  });

  it("Render STDatePickerMonthItem", () => {
    render(<DatePickerMonthItem {...sampleProps}></DatePickerMonthItem>);
  });

  it("Render STMonthPickerItem", () => {
    render(<MonthPickerItem {...sampleProps}></MonthPickerItem>);
  });

  it("Render STYearPickerItem", () => {
    render(<YearPickerItem {...sampleProps}></YearPickerItem>);
  });
});
