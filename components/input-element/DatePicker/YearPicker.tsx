"use client";

import React, { Fragment, useMemo } from "react";
import { DayPicker } from "react-day-picker";
import { Button, FormHelperText, Grid, IconButton, InputAdornment, MenuItem, Paper, Popover, Select, SelectChangeEvent, TextField } from "@mui/material";
import { addYears, format, fromUnixTime, getMonth, getTime, getUnixTime, isValid } from 'date-fns';
import { th, enUS } from 'date-fns/locale';
import { Controller, useFormContext } from "react-hook-form";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { IDatePicker, IOptionsSelect, hasValueDisableInput } from "@/lib";
import { FormLabelInput, SkeletonRound, Text } from "@/components";
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { ConvertStringDateToDate } from "./DatePickerItem";
interface IOptions {
    value: string;
    label: string;
    valueDate: Date;
  }
  

const YearPicker = (props: IDatePicker) => {
    const {
        defaultValue = null,
        defaultMonth = new Date(),
        localeDate,
        name,
        label,
        formatDate = "MMMM yyyy",
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


    const handleSelect = (result, onChangeController) => {
        console.log("value",result)
        onChangeController(result)
        setAnchorEl(null);
    }

    const handleClickYear = (value, mode,onChangeController) => {
        value = value ?? new Date();
        let nMonth = value.getMonth() + 1;
        let nYear = value.getFullYear();
        if(mode === "right"){
            nYear++;
        }
        else if(mode === "left"){
            nYear--;
        }
        if(nYear > maxYear || nYear < minYear)
        {
            return;
        }
        let monthselect = nMonth < 10 ? `0${nMonth}` : nMonth;
        let result = new Date(`${nYear}-${monthselect}-01`)

        onChangeController(result)
    }

    if (IsSkeleton) {
        return (
            <SkeletonRound height={40} width={"100%"} />
        )
    }
    let arrYearTemp = [];
    const YearNow = new Date().getFullYear();
    var nYearTemp = YearNow - (YearNow%10);
for(var i=-1;i<=10;i++)
{

    var nYearTemp2 = nYearTemp + i;
    arrYearTemp.push(nYearTemp2);
}
let nMin = nYearTemp-1;
let nMax = nYearTemp+10;
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            shouldUnregister={true}
            defaultValue={defaultValue}
            render={({
                field: { onChange, value, ref },
                fieldState: { invalid, error },
            }) => {
                let nYearAdd = isLocaleThai ? 543 : 0;
                let valueFormat = value || "";
                

                return (
                    <Fragment>
                        <TextField
                           // {...register(name)}
                            id={name}
                            name={name}
                            label={label}
                            inputRef={ref}
                            placeholder={"yyyy"}
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
                        {IsShowMessageError && error && !disabled && (
                            <FormHelperText>{error.message}</FormHelperText>
                        )}
                        <Popover
                            open={Boolean(anchorEl)}
                            onClose={() => { setAnchorEl(null) }}
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            slotProps={{
                                paper: {
                                    sx: {
                                        width: '350px',
                                        padding: '16px'
                                    }
                                }
                            }}
                        >
                            <Grid container spacing={1} alignItems={"center"} justifyContent={"center"}>
                                <Grid item xs={12}>
                                    <Grid container spacing={2} justifyContent={"center"}>
                                        <Grid item>
                                            <IconButton aria-label="arrow-left" size="small" onClick={()=>handleClickYear(value,"left",onChange)}>
                                                <KeyboardArrowLeftRoundedIcon fontSize="inherit" />
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs={5}>
                                           {nMin} - {nMax}
                                        </Grid>
                                        <Grid item>
                                            <IconButton aria-label="arrow-right" size="small" onClick={()=>handleClickYear(value,"right",onChange)}>
                                                <KeyboardArrowRightRoundedIcon fontSize="inherit" />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {arrYearTemp.map((monthName, index) => {
                                    return (
                                        <Grid item xs={4}>
                                            <Button
                                                fullWidth
                                                onClick={() => handleSelect(monthName, onChange)}
                                                sx={() => ({
                                                    boxShadow: "none",
                                                    textTransform: "none",
                                                    lineHeight: 1.5,
                                                    color: "#000000",
                                                    backgroundColor: monthName == (new Date).getFullYear() ? "#8c98ac" : "#d4d4d4",
                                                    ":hover": {
                                                      bgcolor: "#dcdcdc",
                                                    }
                                                  })}
                                            >
                                                {monthName}
                                            </Button>
                                        </Grid>
                                    );
                                })}
                            </Grid>

                        </Popover>
                    </Fragment>
                );
            }}
        />

    );
}

export default YearPicker;
