"use client";

import React, { Fragment, useEffect, useMemo, useState } from "react";
import {
    Button, Typography, FormHelperText, Grid, IconButton, InputAdornment, MenuItem, Paper, Popover, Select, SelectChangeEvent
    , TextField, Table, TableBody, TableRow, TableCell, TableContainer, TableHead
} from "@mui/material";
import { addYears, format, fromUnixTime, getMonth, getTime, getUnixTime, isValid } from 'date-fns';
import { th, enUS } from 'date-fns/locale';
import { Controller, useFormContext } from "react-hook-form";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { IDatePicker, IOptionsSelect, hasValueDisableInput } from "@/lib";
import { FormLabelInput, SkeletonRound, Text } from "@/components";
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import moment from "moment";
interface IOptions {
    value: string;
    label: string;
    valueDate: Date;
}

interface IValue {
    sSun: string;
    nSunValue : string;
    sMon: string;
    nMonValue : string;
    sTue: string;
    nTueValue : string;
    sWed: string;
    nWebValue : string;
    sThu: string;
    nThuValue : string;
    sFri: string;
    nFriValue : string;
    sSat: string;
    nSatValue : string;
    nMonth : number;
    nYear : number;
}

const STDatePicker = (props: IDatePicker) => {
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
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    let arrAbbrMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let arrMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const arrDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const [arrValue, setArrValue] = useState([] as IValue[]);
    const [arrYear, setArrYear] = useState([]);

    const [sDate, setsDate] = useState(new Date().getDate());
    const [Year, setYear] = useState(new Date().getFullYear());

    const [MonthIndex, setMonthIndex] = useState(new Date().getMonth());
    const [MonthName, setMonthName] = useState(arrMonth[new Date().getMonth()] + " " + new Date().getFullYear());
    const [Mode, setMode] = useState("D");



    const isLocaleThai =
        useMemo(() => {
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
        onChangeController(result);
        if(props.onChange)
        {
            props.onChange(result);
        }
        setAnchorEl(null);
    }

 
    const handleClickYear = (value) => {
        let nYearTemp = Year + (value*10);
        if (nYearTemp < 0) {
            nYearTemp = 9999;
        }
        setYear(nYearTemp);
        nYearTemp = nYearTemp - (nYearTemp % 10);
        let nMin = nYearTemp - 1;
        let nMax = nYearTemp + 10;
        setMonthName(nMin + " - " + nMax);

    }



    const SetValueCalendar = () => {
        var nYearTemp = Year - (Year % 10);
        let nMin = nYearTemp - 1;
        let nMax = nYearTemp + 10;
        let arrYearTemp = [];
        for (var i = nMin; i <= nMax; i++) {
            arrYearTemp.push(i);
        }
        setArrYear(arrYearTemp);

    }
    const ChangeMode = () => {
            var nYearTemp = Year - (Year % 10);
            let nMin = nYearTemp - 1;
            let nMax = nYearTemp + 10;
        setMonthName(nMin + " - " + nMax);
    }
 
    useEffect(() => {
        ChangeMode();
        SetValueCalendar();
    }, [])
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
                 let valueFormat = value || "";
                 if (disabled && disableMode === "text") {
                    return (
                      <FormLabelInput label={label}>
                        <Text className="text-value text-gray-500">
                          {hasValueDisableInput(valueFormat+"")}
                        </Text>
                      </FormLabelInput>
                    )
                  }
                return (
                    <Fragment>
                        <TextField
                           // {...register(name)}
                            id={name}
                            name={name}
                            label={label}
                            inputRef={ref}
                            placeholder={"YYYY"}
                            defaultValue={defaultValue}
                            size={size}
                            value={valueFormat}
                            fullWidth={fullWidth}
                            disabled={disabled}
                            required={required}
                            error={invalid}
                            variant={disabled ? "standard" : variant}
                            autoComplete="off"
                            onChange={(e) => {
                                if (props.onChange) {
                                    props.onChange(e);
                                }
                                onChange(e);
                            }}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end" sx={{ marginLeft: '0' }}>
                                        {value && !disabled ? <IconButton
                                            aria-label="clear-date"
                                            onClick={() => { 
                                                if(!disabled)
                                                {
                                                    onChange(null) 
                                                }
                                            
                                            }}
                                            edge="end"
                                        >
                                            <ClearRoundedIcon />
                                        </IconButton>
                                            : null}
                                        <IconButton
                                            aria-label="select-date"
                                            onClick={(event) => {
                                                if(!disabled)
                                                {
                                                    SetValueCalendar();
                                                    setAnchorEl(event.currentTarget) 
                                                }
                                        
                                                
                                                }}
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
                            onClose={() => {
                                setArrValue([]);
                                setAnchorEl(null)
                                setMode("D");
                                setMonthName(arrMonth[MonthIndex] + " " + Year);
                                setYear(new Date().getFullYear());
                                setMonthIndex(new Date().getMonth());
                                setMonthName(arrMonth[new Date().getMonth()] + " " + new Date().getFullYear());
                            }}
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            slotProps={{
                                paper: {
                                    sx: {
                                        width: '280px',
                                        padding: '16px',
                                        borderRadius: "20px"
                                    }

                                }
                            }}
                        >
                            <Grid container spacing={1} alignItems={"center"} justifyContent={"center"}>
                                <Grid item>
                                    <Grid container
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center" xs={12}>
                                        <Grid item>
                                            <IconButton aria-label="arrow-left" size="small" onClick={() => handleClickYear(-1)}>
                                                <KeyboardArrowLeftRoundedIcon fontSize="inherit" />
                                            </IconButton>
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                fullWidth
                                                onClick={() => { ChangeMode() }}
                                                sx={() => ({
                                                    boxShadow: "none",
                                                    textTransform: "none",
                                                    lineHeight: 1.5,
                                                    color: "#000000",
                                                    backgroundColor: "#ffffff",
                                                    ":hover": {
                                                        bgcolor: "#dcdcdc",
                                                    }
                                                })}
                                            >
                                                {<Typography fontWeight={"bold"}>{MonthName}</Typography>}
                                            </Button>

                                        </Grid>
                                        <Grid item>
                                            <IconButton aria-label="arrow-right" size="small" onClick={() => handleClickYear(1)}>
                                                <KeyboardArrowRightRoundedIcon fontSize="inherit" />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid style={{ paddingLeft: "5px" }}>
                                    {
                                        <Grid container
                                                    direction="row"
                                                    justifyContent="center"
                                                    alignItems="center" xs={12}>
                                                    {
                                                        arrYear.map((item) => {
                                                            return <Grid item style={{ width: "70px", height: "40px" }}> <Button
                                                                fullWidth
                                                                onClick={()=>{handleSelect(item,onChange)}}
                                                                sx={() => ({
                                                                    boxShadow: "none",
                                                                    textTransform: "none",
                                                                    minWidth: "unset",
                                                                    color: "#000000",
                                                                    fontSize: "14px",
                                                                    fontWeight: "bold",
                                                                    backgroundColor: value === item ? "#cbcbcbba" : "#ffffff",
                                                                    ":hover": {
                                                                        bgcolor: "#cbcbcbba",
                                                                    }

                                                                })}
                                                            >
                                                                {item}
                                                            </Button>
                                                            </Grid>
                                                        })
                                                    }
                                                </Grid>
                                    }


                                </Grid>

                            </Grid>

                        </Popover>
                    </Fragment>
                );
            }}
        />

    );
}

export default STDatePicker;
