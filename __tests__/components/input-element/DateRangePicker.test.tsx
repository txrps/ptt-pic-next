import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import DateRangePickerItem, {
  DateRangePickerItemProps,
} from "@/components/input-element/DateRangePicker/DateRangePickerItem";
import {
  parseStartDate,
  parseEndDate,
  formatSelectedDates,
} from "@/components/input-element/DateRangePicker/dateRangePickerUtils";

const sampleProps: DateRangePickerItemProps = {
  value: "",
  from: new Date(),
  to: new Date(),
};

describe("Component Date Picker", () => {
  it("Render DateRangePickerItem", () => {
    render(<DateRangePickerItem {...sampleProps}></DateRangePickerItem>);
  });

  it("Render dateRangePickerUtils", () => {
    parseStartDate(new Date(), new Date(), undefined, null);
    parseEndDate(new Date(), new Date(), undefined, null);
    formatSelectedDates(new Date(), new Date(), null, null);

    let today = new Date();
    let tomorrow = new Date();
    let nextYear = new Date();
    tomorrow.setDate(today.getDate() + 1);
    nextYear.setDate(today.getDate() + 365);
    formatSelectedDates(today, null, null, "MM/yyyy");

    formatSelectedDates(today, tomorrow, null, "MM/yyyy");
    formatSelectedDates(today, nextYear, null, "MM/yyyy");

    formatSelectedDates(today, tomorrow, null, null);
    formatSelectedDates(today, nextYear, null, null);

    formatSelectedDates(today, null, null, null);
  });
});
