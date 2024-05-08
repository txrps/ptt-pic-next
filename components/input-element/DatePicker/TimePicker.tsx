"use client";

import React, { Fragment, useMemo } from "react";
import { FormHelperText, Grid, IconButton, InputAdornment, Popover, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { ITimePicker, hasValueDisableInput } from "@/lib";
import { FormLabelInput, SkeletonRound, Text } from "@/components";
import { NumericFormat } from "react-number-format";
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import { format, getHours, getMinutes, setHours, setMinutes } from "date-fns";


const TimePicker = (props: ITimePicker) => {
    const {
        defaultValue = null,
        name,
        label,
        formatDate = "dd/MM/yyyy",
        maxTime = null,
        minTime = null,
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
                fieldState: { invalid, error },
            }) => {
                let valueFormat = !value ? "" : format(new Date(value), 'HH:mm');
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
                                            <ScheduleRoundedIcon />
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
                                        width: '200px',
                                        padding: '16px'
                                    }
                                }
                            }}
                        >
                            <Grid container spacing={1} alignItems={"center"} justifyContent={"center"}>
                                <Grid item xs={5}>
                                    <Grid container flexDirection={"column"} alignItems={"center"}>
                                        <Grid item>
                                            <IconButton
                                                aria-label="up-hour"
                                                onClick={() => handleClickActionArrow("hour", "up", value, onChange)}
                                            >
                                                <KeyboardArrowUpRoundedIcon />
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                type={"text"}
                                                value={getHours(new Date(value))}
                                                variant={"outlined"}
                                                size={"small"}
                                                placeholder={"00"}
                                                autoComplete="off"
                                                inputProps={{
                                                    style: {
                                                        textAlign: "center",
                                                    },
                                                    config: {
                                                        max: 23,
                                                    },
                                                    maxLength: 2,
                                                }}
                                                InputProps={{
                                                    inputComponent: InputTimeValue,
                                                }}
                                                onChange={(e) => {
                                                    console.log("TimePicker ~ 1:", e)
                                                    handleHourChange(e, "hour", value, onChange)
                                                }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <IconButton
                                                aria-label="down-hour"
                                                onClick={() => handleClickActionArrow("hour", "down", value, onChange)}
                                            >
                                                <KeyboardArrowDownRoundedIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>

                                </Grid>
                                <Grid item>
                                    :
                                </Grid>
                                <Grid item xs={5}>
                                    <Grid container flexDirection={"column"} alignItems={"center"}>
                                        <Grid item>
                                            <IconButton
                                                aria-label="up-minute"
                                                onClick={() => handleClickActionArrow("minute", "up", value, onChange)}
                                            >
                                                <KeyboardArrowUpRoundedIcon />
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                type={"text"}
                                                value={getMinutes(new Date(value))}
                                                variant={"outlined"}
                                                size={"small"}
                                                placeholder={"00"}
                                                autoComplete="off"
                                                inputProps={{
                                                    style: {
                                                        textAlign: "center",
                                                    },
                                                    config: {
                                                        max: 59,
                                                    },
                                                    maxLength: 2,
                                                }}
                                                InputProps={{
                                                    inputComponent: InputTimeValue,
                                                }}
                                                onChange={(e) => {
                                                    console.log("TimePicker ~ 2:", e)
                                                    handleHourChange(e, "minute", value, onChange)
                                                }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <IconButton
                                                aria-label="down-minute"
                                                onClick={() => handleClickActionArrow("minute", "down", value, onChange)}
                                            >
                                                <KeyboardArrowDownRoundedIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Popover>
                    </Fragment>
                );
            }}
        />

    );
}

export default TimePicker;

export const handleHourChange = (e, type, valueOld, onChangeController) => {
    console.log("handleHourChange ~ valueOld:", valueOld)
    let today = valueOld ? new Date(valueOld) : new Date();
    console.log("handleHourChange ~ today:", today)
    const newValue = parseInt(e.target.value);
    console.log("handleHourChange ~ newValue:", newValue)
    if (!isNaN(newValue) && newValue >= 0 && newValue <= 23 && type === "hour") {
        const dateWithHour = setHours(today, newValue);
        console.log("handleHourChange ~ dateWithHour:", dateWithHour)
        onChangeController(dateWithHour)
    }
    else if (!isNaN(newValue) && newValue >= 0 && newValue <= 59 && type === "minute") {
        const dateWithMinute = setMinutes(today, newValue);
        console.log("handleHourChange ~ dateWithMinute:", dateWithMinute)
        onChangeController(dateWithMinute)
    }
};

export const handleClickActionArrow = (type, mode, valueOld, onChangeController) => {
    console.log("handleClickActionArrow ~ valueOld:", valueOld)
    let today = valueOld ? new Date(valueOld) : new Date();
    let nHour = getHours(today);
    let nMinute = getMinutes(today);
    if (type === "hour" && mode === "up") {
        nHour++;
    }
    else if (type === "hour" && mode === "down") {
        nHour--;
    }
    else if (type === "minute" && mode === "up") {
        nMinute++;
    }
    else if (type === "minute" && mode === "down") {
        nMinute--;
    }
    const dateValue = setHours(setMinutes(today, nMinute), nHour);
    console.log("handleClickActionArrow ~ dateValue:", dateValue)
    onChangeController(dateValue)
  
}

export const InputTimeValue = (props) => {
    const { inputRef, onChange, disabled, config, ...other } = props;
    return (
        <NumericFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        value: values.value,
                    },
                });
            }}
            isAllowed={(values) => {
                const { floatValue } = values;
                return floatValue >= 0 && floatValue <= config.max;
            }}
            allowNegative={false}
        />
    );
}
