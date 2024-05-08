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
    sSunValue: string;
    dSunValue: Date;
    isSunDisable: boolean;
    sMon: string;
    sMonValue: string;
    dMonValue: Date;
    isMonDisable: boolean;
    sTue: string;
    sTueValue: string;
    dTueValue: Date;
    isTueDisable: boolean;
    sWed: string;
    sWebValue: string;
    dWebValue: Date;
    isWebDisable: boolean;
    sThu: string;
    sThuValue: string;
    dThuValue: Date;
    isThuDisable: boolean;
    sFri: string;
    sFriValue: string;
    dFriValue: Date;
    iFriDisable: boolean;
    sSat: string;
    sSatValue: string;
    dSatValue: Date;
    isSatDisable: boolean;
    nMonth: number;
    nYear: number;
}

const STDatePicker = (props: IDatePicker) => {
    const {
        defaultValue = null,
        localeDate,
        name,
        label,
        maxDate = null,
        minDate = null,
        size = "small",
        variant = "outlined",
        required = false,
        fullWidth = false,
        disabled = false,
        IsSkeleton = false,
        IsShowMessageError = true,
        disableMode = "input",
        arrDisable = [],
        formatDate = "DD/MM/YYYY"
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
        onChangeController(result)
        if (props.onChange) {
            props.onChange(result);
        }

        setAnchorEl(null);
    }


    const handleClickYear = (value) => {
        if (Mode === "D") {
            let nMonthTemp = MonthIndex + value;
            if (nMonthTemp < 0) {
                nMonthTemp = 11;
            }
            setMonthIndex(nMonthTemp);
            setMonthName(arrMonth[nMonthTemp] + " " + Year);
        }
        else if (Mode === "M") {
            let nYearTemp = Year + value;
            if (nYearTemp < 0) {
                nYearTemp = 9999;
            }
            setYear(nYearTemp);
            setMonthName(nYearTemp + "");
        }
        else if (Mode === "Y") {

            let nYearTemp = Year + (value * 10);
            if (nYearTemp < 0) {
                nYearTemp = 9999;
            }
            setYear(nYearTemp);
            nYearTemp = nYearTemp - (nYearTemp % 10);
            let nMin = nYearTemp - 1;
            let nMax = nYearTemp + 10;
            setMonthName(nMin + " - " + nMax);
        }

    }



    const SetValueCalendar = () => {
        let arrData = [] as IValue[];
        if (Mode === "D") {
            let nFirstDate = (new Date(Year, MonthIndex, 1).getDate());
            let nLastDate = (new Date(Year, MonthIndex, 0).getDate());
            let objValue = {} as IValue;
            console.log("minDate", minDate)
            let dMinDate = minDate != null ? new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate()) : null;
            let dMaxDate = maxDate != null ? new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate()) : null;
            for (var i = nFirstDate; i <= nLastDate; i++) {
                let dValue = new Date(Year, MonthIndex, i);
                let nIndex = dValue.getDay();
                let sValue = moment(new Date(Year, MonthIndex, i)).format("DD/MM/YYYY");
                let nValue = dValue.valueOf();
                objValue.nMonth = MonthIndex;
                objValue.nYear = Year;

                let isDisable = ((dMinDate != null ? dValue < dMinDate : false) || (dMaxDate != null ? dValue > dMaxDate : false) || (arrDisable.length > 0 ? arrDisable.filter((f) => f === nValue).length > 0 : false));
                if (nIndex == 0) {
                    objValue.sSun = i + "";
                    objValue.sSunValue = sValue;
                    objValue.dSunValue = dValue;
                    objValue.isSunDisable = isDisable;
                }
                else if (nIndex == 1) {
                    objValue.sMon = i + "";
                    objValue.sMonValue = sValue
                    objValue.dMonValue = dValue;
                    objValue.isMonDisable = isDisable;
                }
                else if (nIndex == 2) {
                    objValue.sTue = i + "";
                    objValue.sTueValue = sValue
                    objValue.dTueValue = dValue;
                    objValue.isTueDisable = isDisable;
                }
                else if (nIndex == 3) {
                    objValue.sWed = i + "";
                    objValue.sWebValue = sValue
                    objValue.dWebValue = dValue;
                    objValue.isWebDisable = isDisable;
                }
                else if (nIndex == 4) {
                    objValue.sThu = i + "";
                    objValue.sThuValue = sValue;
                    objValue.dThuValue = dValue;
                    objValue.isThuDisable = isDisable;
                }
                else if (nIndex == 5) {
                    objValue.sFri = i + "";
                    objValue.sFriValue = sValue;
                    objValue.dFriValue = dValue;
                    objValue.iFriDisable = isDisable;
                }
                else if (nIndex == 6) {
                    objValue.sSat = i + "";
                    objValue.sSatValue = sValue;
                    objValue.dSatValue = dValue;
                    objValue.isSatDisable = isDisable;
                    if (nLastDate != i) {
                        arrData.push(objValue);
                        objValue = {} as IValue;
                    }
                }

                if (nLastDate == i && nIndex != 6) {
                    arrData.push(objValue);
                }








            }


        }
        else if (Mode === "Y") {
            var nYearTemp = Year - (Year % 10);
            let nMin = nYearTemp - 1;
            let nMax = nYearTemp + 10;
            let arrYearTemp = [];
            for (var i = nMin; i <= nMax; i++) {
                arrYearTemp.push(i);
            }
            setArrYear(arrYearTemp);
        }

        setArrValue(arrData);
    }
    const ChangeMode = () => {
        if (Mode === "D") {
            setMode("M");
            setMonthName(Year + "");
        }
        else if (Mode === "M") {
            setMode("Y");
            var nYearTemp = Year - (Year % 10);
            let nMin = nYearTemp - 1;
            let nMax = nYearTemp + 10;
            setMonthName(nMin + " - " + nMax);
        }
        else {
            setMode("D");
            setMonthName(arrMonth[MonthIndex] + " " + Year);
        }
    }
    const onSelectMonth = (nIndex) => {
        setMonthIndex(nIndex);
        setMode("D");
        setMonthName(arrMonth[nIndex] + " " + Year);
    }

    const onSelectYear = (nIndex) => {
        setYear(nIndex);
        setMode("M");
        setMonthName(nIndex + "");
    }
    useEffect(() => {
        SetValueCalendar();
    }, [Mode, MonthIndex, Year, minDate, maxDate])


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
                let valueFormat = value || "";

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
                            variant={disabled ? variant: "outlined"}
                            autoComplete="off"
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
                            onChange={(e) => {
                                if (props.onChange) {
                                    props.onChange(e);
                                }
                                onChange(e);
                            }}
                            onBlur={() => {
                                if (value) {

                                    let arrDate = moment(value).format(formatDate).split('/');
                                    let IsValidate = false;
                                    if (arrDate.length != 3) {
                                        IsValidate = true;
                                    }
                                    else {
                                        IsValidate = moment(arrDate[2] + "-" + arrDate[1] + "-" + arrDate[0]).isValid();
                                    }
                                    if (IsValidate) {
                                        onChange("");
                                    }

                                }
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
                                        Mode === "D" ?
                                            <Table
                                                aria-labelledby="tableTitle"
                                            >
                                                <TableHead>
                                                    <TableRow>
                                                        {
                                                            arrDay.map((item) => {
                                                                return <TableCell style={{ padding: "3px" }} align="center">
                                                                    <Typography fontWeight={"bold"} fontSize={"14px"}

                                                                    >{item}</Typography>
                                                                </TableCell>
                                                            })
                                                        }

                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {
                                                        arrValue.map((item) => {
                                                            return <TableRow>
                                                                <TableCell style={{ padding: "3px" }} align="center">

                                                                    {item.sSun != null ?

                                                                        item.isSunDisable ? <Typography color={"#aaaaaa"} fontSize={"14px"} padding={"6px"}>{item.sSun}</Typography>
                                                                            : <Button
                                                                                fullWidth
                                                                                onClick={() => { handleSelect(item.sSunValue, onChange) }}
                                                                                sx={() => ({

                                                                                    boxShadow: "none",
                                                                                    textTransform: "none",
                                                                                    minWidth: "unset",
                                                                                    color: item.isSunDisable ? "#aaaaaa" : "#000000",
                                                                                    fontSize: "14px",
                                                                                    backgroundColor: value == item.sSunValue ? "#cbcbcbba" : "#ffffff",
                                                                                    ":hover": {
                                                                                        bgcolor: "#cbcbcbba",
                                                                                    }
                                                                                })}
                                                                            >
                                                                                {item.sSun}
                                                                            </Button>
                                                                        : null}
                                                                </TableCell>
                                                                <TableCell style={{ padding: "3px" }} align="center">

                                                                    {item.sMon != null ?
                                                                        item.isMonDisable ? <Typography color={"#aaaaaa"} fontSize={"14px"} padding={"6px"}>{item.sMon}</Typography>
                                                                            :
                                                                            <Button
                                                                                fullWidth
                                                                                onClick={() => { handleSelect(item.sMonValue, onChange) }}
                                                                                sx={() => ({
                                                                                    boxShadow: "none",
                                                                                    textTransform: "none",
                                                                                    minWidth: "unset",
                                                                                    color: item.isMonDisable ? "#aaaaaa" : "#000000",
                                                                                    fontSize: "14px",
                                                                                    backgroundColor: value == item.sMonValue ? "#cbcbcbba" : "#ffffff",
                                                                                    ":hover": {
                                                                                        bgcolor: "#cbcbcbba",
                                                                                    }
                                                                                })}
                                                                            >
                                                                                {item.sMon}
                                                                            </Button>
                                                                        : null}
                                                                </TableCell>
                                                                <TableCell style={{ padding: "3px" }} align="center">


                                                                    {item.sTue != null ?
                                                                        item.isTueDisable ? <Typography color={"#aaaaaa"} fontSize={"14px"} padding={"6px"}>{item.sTue}</Typography>
                                                                            :
                                                                            <Button
                                                                                fullWidth
                                                                                onClick={() => { handleSelect(item.sTueValue, onChange) }}
                                                                                sx={() => ({
                                                                                    boxShadow: "none",
                                                                                    textTransform: "none",
                                                                                    minWidth: "unset",
                                                                                    color: item.isTueDisable ? "#aaaaaa" : "#000000",
                                                                                    fontSize: "14px",
                                                                                    backgroundColor: value == item.sTueValue ? "#cbcbcbba" : "#ffffff",
                                                                                    ":hover": {
                                                                                        bgcolor: "#cbcbcbba",
                                                                                    }
                                                                                })}
                                                                            >
                                                                                {item.sTue}
                                                                            </Button>
                                                                        : null}
                                                                </TableCell>
                                                                <TableCell style={{ padding: "3px" }} align="center">


                                                                    {item.sWed != null ?
                                                                        item.isWebDisable ? <Typography color={"#aaaaaa"} fontSize={"14px"} padding={"6px"}>{item.sWed}</Typography>
                                                                            :
                                                                            <Button
                                                                                fullWidth
                                                                                onClick={() => { handleSelect(item.sWebValue, onChange) }}
                                                                                sx={() => ({
                                                                                    boxShadow: "none",
                                                                                    textTransform: "none",
                                                                                    minWidth: "unset",
                                                                                    color: item.isWebDisable ? "#aaaaaa" : "#000000",
                                                                                    fontSize: "14px",
                                                                                    backgroundColor: value == item.sWebValue ? "#cbcbcbba" : "#ffffff",
                                                                                    ":hover": {
                                                                                        bgcolor: "#cbcbcbba",
                                                                                    }
                                                                                })}
                                                                            >
                                                                                {item.sWed}
                                                                            </Button>
                                                                        : null}
                                                                </TableCell>
                                                                <TableCell style={{ padding: "3px" }} align="center">

                                                                    {item.sThu != null ?
                                                                        item.isThuDisable ? <Typography color={"#aaaaaa"} fontSize={"14px"} padding={"6px"}>{item.sThu}</Typography>
                                                                            :
                                                                            <Button
                                                                                fullWidth
                                                                                onClick={() => { handleSelect(item.sThuValue, onChange) }}
                                                                                sx={() => ({
                                                                                    boxShadow: "none",
                                                                                    textTransform: "none",
                                                                                    minWidth: "unset",
                                                                                    color: item.isThuDisable ? "#aaaaaa" : "#000000",
                                                                                    fontSize: "14px",
                                                                                    backgroundColor: value == item.sThuValue ? "#cbcbcbba" : "#ffffff",
                                                                                    ":hover": {
                                                                                        bgcolor: "#cbcbcbba",
                                                                                    }
                                                                                })}
                                                                            >
                                                                                {item.sThu}
                                                                            </Button>
                                                                        : null}
                                                                </TableCell>
                                                                <TableCell style={{ padding: "3px" }} align="center">

                                                                    {item.sFri != null ?
                                                                        item.iFriDisable ? <Typography color={"#aaaaaa"} fontSize={"14px"} padding={"6px"}>{item.sFri}</Typography>
                                                                            :
                                                                            <Button
                                                                                fullWidth
                                                                                onClick={() => { handleSelect(item.sFriValue, onChange) }}
                                                                                sx={() => ({
                                                                                    boxShadow: "none",
                                                                                    textTransform: "none",
                                                                                    minWidth: "unset",
                                                                                    color: item.iFriDisable ? "#aaaaaa" : "#000000",
                                                                                    fontSize: "14px",
                                                                                    backgroundColor: value == item.sFriValue ? "#cbcbcbba" : "#ffffff",
                                                                                    ":hover": {
                                                                                        bgcolor: "#cbcbcbba",
                                                                                    }
                                                                                })}
                                                                            >
                                                                                {item.sFri}
                                                                            </Button>
                                                                        : null}
                                                                </TableCell>
                                                                <TableCell style={{ padding: "3px" }} align="center">


                                                                    {item.sSat != null ?
                                                                        item.isSatDisable ? <Typography color={"#aaaaaa"} fontSize={"14px"} padding={"6px"}>{item.sSat}</Typography>
                                                                            :
                                                                            <Button
                                                                                fullWidth
                                                                                onClick={() => { handleSelect(item.sSatValue, onChange) }}
                                                                                sx={() => ({
                                                                                    boxShadow: "none",
                                                                                    textTransform: "none",
                                                                                    minWidth: "unset",
                                                                                    color: item.isSatDisable ? "#aaaaaa" : "#000000",
                                                                                    fontSize: "14px",
                                                                                    backgroundColor: value == item.sSatValue ? "#cbcbcbba" : "#ffffff",
                                                                                    ":hover": {
                                                                                        bgcolor: "#cbcbcbba",
                                                                                    }
                                                                                })}
                                                                            >
                                                                                {item.sSat}
                                                                            </Button>
                                                                        : null}
                                                                </TableCell>
                                                            </TableRow>
                                                        })
                                                    }
                                                </TableBody>
                                            </Table>

                                            :
                                            Mode === "M" ?
                                                <Grid container
                                                    direction="row"
                                                    justifyContent="center"
                                                    alignItems="center" xs={12}>
                                                    {
                                                        arrAbbrMonth.map((item, i) => {
                                                            return <Grid item style={{ width: "70px", height: "40px" }}> <Button
                                                                fullWidth
                                                                onClick={() => { onSelectMonth(i) }}
                                                                sx={() => ({
                                                                    boxShadow: "none",
                                                                    textTransform: "none",
                                                                    minWidth: "unset",
                                                                    color: "#000000",
                                                                    fontSize: "14px",
                                                                    fontWeight: "bold",
                                                                    backgroundColor: "#ffffff",
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

                                                : <Grid container
                                                    direction="row"
                                                    justifyContent="center"
                                                    alignItems="center" xs={12}>
                                                    {
                                                        arrYear.map((item) => {
                                                            return <Grid item style={{ width: "70px", height: "40px" }}> <Button
                                                                fullWidth
                                                                onClick={() => { onSelectYear(item) }}
                                                                sx={() => ({
                                                                    boxShadow: "none",
                                                                    textTransform: "none",
                                                                    minWidth: "unset",
                                                                    color: "#000000",
                                                                    fontSize: "14px",
                                                                    fontWeight: "bold",
                                                                    backgroundColor: "#ffffff",
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
