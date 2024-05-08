"use client";

import React, { useState } from "react";
import { Grid } from "@mui/material";
import DatePickerItem from "./DatePickerItem";
import { IDatePicker } from "@/lib";


const STDatePicker = (props: IDatePicker) => {
    const {
        name,
        name2,
        label,
        label2,
        required = false,
        fullWidth = false,
        disabled = false,
        IsSkeleton = false,
        IsShowMessageError = true,
        disableMode = "text"
    } = props;

    const [StartDate, setStartDate] = useState(null);
    const [EndDate, setEndDate] = useState(null);
    return (
        <Grid container direction="row"
            justifyContent="start"
            alignItems="center"
            gap="2rem">
            <Grid item xs={5}>
                <DatePickerItem
                    label={label}
                    name={name}
                    IsSkeleton={IsSkeleton}
                    required={required}
                    disabled={disabled}
                    disableMode={disableMode}
                    IsShowMessageError={IsShowMessageError}
                    onChange={(value) => {
                        let dDate = null;
                        if (value) {
                            let arrDate = value.split('/');
                            dDate = new Date(+(arrDate[2]), (+(arrDate[1]) - 1), +(arrDate[0]))
                        }
                        setStartDate(dDate);
                    }}
                    maxDate={EndDate}
                />
            </Grid>
            <Grid item xs={5}>
                <DatePickerItem
                    label={label2}
                    name={name2}
                    IsSkeleton={IsSkeleton}
                    required={required}
                    disabled={disabled}
                    disableMode={disableMode}
                    IsShowMessageError={IsShowMessageError}
                    minDate={StartDate}
                    onChange={(value) => {
                        let dDate = null;
                        if (value) {
                            let arrDate = value.split('/');
                            dDate = new Date(+(arrDate[2]), (+(arrDate[1]) - 1), +(arrDate[0]))
                        }
                        setEndDate(dDate);
                    }}
                />
            </Grid>


        </Grid>


    );
}

export default STDatePicker;
