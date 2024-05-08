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
  

const MonthPicker = (props: IDatePicker) => {

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


    const arrMonth = React.useMemo(() => {
        let arr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        if (localeDate === "th") {
            arr = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]
        }
        return arr;
    }, [localeDate])

    const arrYear = React.useMemo(() => {
        let arr : IOptionsSelect[] = []
        let isThai = localeDate === "th"
        for (let index = minYear; index <= maxYear; index++) {
            arr.push({ value: index + "", label: (index + (isThai ? 543 : 0)) + "" })
        }
        return arr;
    }, [localeDate])


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


    const handleSelect = (value, nMonth, nYear, onChangeController) => {
        value = value ?? new Date();
        nMonth = nMonth ?? new Date().getMonth() + 1;
        nYear = nYear ?? value.getFullYear();
        let monthselect = nMonth < 10 ? `0${nMonth}` : nMonth;
        let result = new Date(`${nYear}-${monthselect}-01`)
        // console.log("handleSelect ~ value:", value)
        // console.log("handleSelect ~ nMonth:", monthselect, nMonth)
        // console.log("handleSelect ~ nYear:", nYear)
        // console.log("handleSelect ~ result:", result)
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
                let valueFormat = value ? format(addYears(new Date(value), nYearAdd), formatDate, { locale: isLocaleThai ? th : enUS }) : "";
                // console.log("MonthPicker ~ value:", value)
                let selectYear = value ? new Date(value).getFullYear() + "" : new Date().getFullYear() + "";
                

                return (
                    <Fragment>
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
                                            <Select
                                                id="select-year"
                                                value={selectYear}
                                                size="small"
                                                variant="standard"
                                                disableUnderline 
                                                fullWidth
                                                displayEmpty
                                                IconComponent={null}
                                                inputProps={{
                                                    disableUnderline: true
                                                }}
                                                label=""
                                                onChange={(eValue: SelectChangeEvent) => handleSelect(value, null, eValue.target.value, onChange)}
                                                MenuProps={{
                                                    PaperProps: {
                                                      style: {
                                                        textAlign: 'center',
                                                        maxHeight: 200,
                                                      },
                                                    },
                                                  }}
                                                sx={{
                                                    paddingRight:'0px',
                                                    textAlign:'center'
                                                }}
                                            >
                                                {arrYear.map((item) => {
                                                    return (
                                                        <MenuItem value={item.value} style={{ textAlign: 'center' }}>{item.label}</MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        </Grid>
                                        <Grid item>
                                            <IconButton aria-label="arrow-right" size="small" onClick={()=>handleClickYear(value,"right",onChange)}>
                                                <KeyboardArrowRightRoundedIcon fontSize="inherit" />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {arrMonth.map((monthName, index) => {
                                    return (
                                        <Grid item xs={4}>
                                            <Button
                                                fullWidth
                                                onClick={() => handleSelect(value, index + 1, null, onChange)}
                                                sx={() => ({
                                                    boxShadow: "none",
                                                    textTransform: "none",
                                                    lineHeight: 1.5,
                                                    color: "#000000",
                                                    backgroundColor: index === getMonth(new Date(value)) ? "#8c98ac" : "#d4d4d4",
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

export default MonthPicker;
