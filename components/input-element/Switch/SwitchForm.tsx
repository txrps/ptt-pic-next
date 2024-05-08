import React, { useEffect, useRef } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { SwitchFromProps } from "./SwitchProps";
import Switch from "react-switch";
import { FormHelperText, Grid, Typography } from '@mui/material';

import './Switch.css';
import { FnComponents } from "@/lib";
import { TypeComponent } from "@/enum/enum";
import { SkeletonRound } from "@/components/mui-elements";

export const SwitchForm = (props: SwitchFromProps) => {
    const {
        id,
        name,
        disabled,
        width = 80,
        IsSkeleton = false,
    } = props;
    const elementRef = useRef(null);
    const { control, register } = useFormContext();

    useEffect(() => {
    }, [elementRef.current?.offsetWidth]);

    
    if (IsSkeleton)
    {
       return (
          <SkeletonRound height={40} width={300}/>
       )
    }  
    
    return (
        <Controller name={name} control={control} shouldUnregister={true} defaultValue={true}
            render={({
                field: { onChange, value },
                fieldState: { error } }) => {
                return (
                    <React.Fragment>
                        <Typography component="div">
                            <Grid item
                                component="label"
                                container
                                alignItems="center"
                                alignContent="space-between"
                                xs={12}
                                spacing={3}
                            >
                                <Grid item>
                                    <label htmlFor="small-radius-switch" style={{ color: "#ffffff" }}>
                                        <Switch
                                            id={FnComponents.GetId(TypeComponent.switch, id, name)}
                                            {...props}
                                           // {...register(name)}
                                            key={name}
                                            name={name}
                                            checked={value || false}
                                            value={value || true}
                                            onChange={(e) => {
                                                onChange(e);
                                                if (props.onChange) {
                                                    props.onChange(e);
                                                }
                                            }}
                                            handleDiameter={20}
                                            offColor={props.offColor ? props.offColor : "#d9534f"}
                                            onColor={props.onColor ? props.onColor : "#5cb85c"}
                                            activeBoxShadow="0px 0px 1px 2px #fff"
                                            height={28}
                                            width={width}
                                            disabled={disabled}
                                            className={"react-switch"}
                                        />
                                    </label>
                                </Grid>
                            </Grid>
                        </Typography>
                        {error ? (
                            <FormHelperText sx={{ color: "red" }}>
                                {error.message}
                            </FormHelperText>
                        ) : null}
                    </React.Fragment >
                )
            }}
        />
    );
};


