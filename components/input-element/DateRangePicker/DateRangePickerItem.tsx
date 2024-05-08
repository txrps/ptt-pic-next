"use client";
import React from "react";

// import { SelectItem } from "../Select";

export interface DateRangePickerItemProps extends React.HTMLAttributes<HTMLLIElement> {
  value: string;
  from: Date;
  to?: Date;
}

const DateRangePickerItem = React.forwardRef<HTMLLIElement, DateRangePickerItemProps>(
  (props, ref) => {
    const { value, className, children, ...other } = props;

    return (
      <>
        {children ?? value}
      </>
      // <SelectItem ref={ref} className={className} value={value} {...other}>
      //   {children ?? value}
      // </SelectItem>
    );
  },
);

DateRangePickerItem.displayName = "DateRangePickerItem";

export default DateRangePickerItem;
