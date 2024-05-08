"use client";

import React, { Fragment, useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import { FormHelperText, IconButton, InputAdornment, Popover, TextField } from "@mui/material";
// import { addYears, format, fromUnixTime, getTime, getUnixTime, isValid, parse } from 'date-fns';
import { th, enUS } from 'date-fns/locale';
import { Controller, useFormContext } from "react-hook-form";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { IDatePicker, hasValueDisableInput, Convert } from "@/lib";
import { FormLabelInput, SkeletonRound, Text } from "@/components";
import moment from "moment";
export const ConvertDateToUnixOrNull = (date) => {
	let result = null;
    if (moment(date).isValid()) {
        result = moment(date).valueOf();
      }
	return result;
};
export const ConvertDateToString = (date) => {
	let result = null;
    if (moment(date).isValid()) {
        result = moment(date).valueOf();
      }
	return result;
};

const DatePickerItem = (props: IDatePicker) => {
    const {
        defaultValue = null,
        defaultMonth = new Date(),
        localeDate,
        name,
        label,
        formatDate = "DD/MM",
        minYear = new Date().getFullYear() - 10,
        maxYear = new Date().getFullYear() + 10,
        maxDate = null,
        minDate = null,
        size = "small",
        variant = "outlined",
        required = false,
        fullWidth = false,
        disabled = false,
        IsSkeleton = false,
        IsShowMessageError = true,
        disableMode = "text"
    } = props;

    const { control, register } = useFormContext();
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
const [sValue,setsValue] = useState("");
    const isLocaleThai = React.useMemo(() => {
        return localeDate === "th";
    }, [localeDate])

    const rules = useMemo(() => {
        return {
            required: {
                value: required,
                message: `กรุณาระบุ ${label}`,
            },
        };
    }, [required]);


    if (IsSkeleton) {
        return (
            <SkeletonRound height={40} width={"100%"} />
        )
    }

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            shouldUnregister={true}
            defaultValue={defaultValue}
            render={({
                field: { onChange, value, ref },
                fieldState: { invalid },
            }) => {
                let isValid = invalid && !disabled;
                let helperText = IsShowMessageError ? `กรุณาระบุ ${label}` : "";
                let nYearAdd = isLocaleThai ? 543 : 0;
                console.log("value",value)
                let valueFormat = moment(value).isValid() ? moment(value).format("DD/MM") : "";
 console.log("valueFormat",valueFormat)
                if (disabled && disableMode === "text") {
                    return (
                        <FormLabelInput label={label}>
                            <Text className="text-value text-gray-500">
                                {hasValueDisableInput(valueFormat)}
                            </Text>
                        </FormLabelInput>
                    )
                }

                return (
                    <Fragment>
                        {/* {valueFormat} */}
                        <TextField
                           // {...register(name)}
                            id={name}
                            name={name}
                            label={label}
                            inputRef={ref}
                            placeholder={formatDate}
                            defaultValue={defaultValue}
                            size={size}
                            value={valueFormat}
                            fullWidth={fullWidth}
                            disabled={disabled}
                            required={required}
                            error={invalid}
                            variant={disabled ? "standard" : variant}
                            autoComplete="off"
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end" sx={{ marginLeft: '0' }}>
                                        {value ? <IconButton
                                            aria-label="clear-date"
                                            onClick={() => { onChange(null) }}
                                            edge="end"
                                        >
                                            <ClearRoundedIcon />
                                        </IconButton>
                                            : null}
                                        <IconButton
                                            aria-label="select-date"
                                            onClick={(event) => { setAnchorEl(event.currentTarget) }}
                                            edge="end"
                                        >
                                            <CalendarMonthIcon />
                                        </IconButton>
                                    </InputAdornment>
                            }}
                        />
                        {IsShowMessageError && isValid && (
                            <FormHelperText>{helperText}</FormHelperText>
                        )}
                        <Popover
                            open={Boolean(anchorEl)}
                            onClose={() => { 
                                console.log("value close",value)
                                console.log("valueFormat close",valueFormat)
                                setAnchorEl(null) }}
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            
                        >
                            <DayPicker
                                mode={"single"}
                                locale={isLocaleThai ? th : enUS}
                                showOutsideDays={false}
                                pagedNavigation
                                selected={value}
                                onSelect={(dDate) => {
                                     onChange(dDate);
                                    setAnchorEl(null);
                                    if (props.onChange) {
                                        props.onChange(dDate);
                                    }
                                    console.log("value selected",value)
                                    console.log("valueFormat selected",valueFormat)
                                    let valueFormat2 = moment(dDate).isValid() ? moment(dDate).format("DD/MM") : "";
 console.log("valueFormat",valueFormat2)
 setsValue(valueFormat2);
                                }}
                                // formatters={{
                                //     formatCaption : (date)=>{
                                //         console.log("date",date)
                                //     }
                                //     // formatYearCaption: (year) => isLocaleThai ? format(addYears(year, 543), "yyyy") : format(year, "yyyy"),
                                // }}
                                captionLayout="dropdown-buttons"
                                defaultMonth={defaultMonth}
                                fromYear={minYear}
                                toYear={maxYear}
                                fromDate={minDate}
                                toDate={maxDate}
                                disabled={disabled}
                                className="border-0"
                                classNames={{
                                    caption: "flex justify-center py-2 mb-4 relative items-center",
                                    caption_label: "text-md font-medium text-gray-900",
                                    nav: "flex items-center",
                                    nav_button:
                                        "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                                    nav_button_previous: "absolute left-1.5",
                                    nav_button_next: "absolute right-1.5",
                                    table: "w-full border-collapse",
                                    head_row: "flex font-medium text-gray-900",
                                    head_cell: "m-0.5 w-9 font-normal text-sm",
                                    row: "flex w-full",
                                    cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                                    day: "h-9 w-9 p-0 font-normal ",
                                    day_selected:
                                        "rounded-md bg-gray-900 text-white focus:bg-gray-900 focus:text-white",
                                    day_today: "rounded-md bg-gray-200 text-gray-900",
                                    day_outside:
                                        "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10 hover:rounded-md",
                                    day_disabled: "text-gray-500 opacity-50",
                                    day_hidden: "invisible",
                                    // dropdown: "",
                                    dropdown_icon: "text-sm",
                                    // dropdown_year : "",
                                }}
                            />
                        </Popover>
                    </Fragment>
                );
            }}
        />

    );
}

export default DatePickerItem;
