"use client";

import { useMemo, useCallback } from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
    Autocomplete,
    TextField,
    FormHelperText,
    InputAdornment,
    ListItem,
    FilterOptionsState,
} from "@mui/material";
import { FnComponents, IOptionsSelect, ISelect, hasValueDisableInput } from "@/lib";
import { TypeComponent } from "@/enum/enum";
import { PopperCustom } from ".";
import { FormLabelInput, SkeletonRound, Text } from "@/components";
import _ from "lodash";


const SelectItem = (props: ISelect) => {
    const {
        id,
        name,
        label,
        placeholder,
        fullWidth = true,
        defaultValue = null,
        disableMode = "input",
        IsShowMessageError = true,
        IsPopperCustom = true,
        disableClearable = false,
        disabled = false,
        notOptionsText = "ไม่พบข้อมูล",
        options,
        required = false,
        size = "small",
        startAdornment,
        textAlign = "left",
        IsSkeleton = false,
        variant = "outlined"
    } = props;

    const { control, register } = useFormContext();

    const rules = useMemo(() => {
        return {
            required: {
                value: required,
                message: `กรุณาระบุ ${label}`,
            },
        };
    }, [required]);

    const GetValueOption = (value: string) => {
        let oValue: IOptionsSelect = _.find(options, function (o) { return o.value === value + ""; });
        return oValue;
    };

    const onRenderOption = useCallback((props: React.HTMLAttributes<HTMLLIElement>, option: IOptionsSelect) => {
        return (
            <ListItem
                {...props}
                key={option.value}
                // disabled={option.disable}
                sx={{ color: option.color ?? "black" }}
            >
                {option.label}
            </ListItem>
        );
    }, []);

    const onFilterOptions = useCallback((options: IOptionsSelect[], params: FilterOptionsState<IOptionsSelect>) => {
        const filtered = params.inputValue
            ? options.filter((f: IOptionsSelect) =>
                f.label.toLowerCase().includes(params.inputValue.toLowerCase())
            )
            : options;
        return filtered;
    }, []);

    const onHandleOnchange = useCallback((event: React.SyntheticEvent, value: IOptionsSelect, onChangeController: (...event: any[]) => void) => {
        onChangeController(value != null ? value["value"] : null);
        if (props.onChange) {
            props.onChange(value, event);
        }
    }, [props]);

    const onRenderTags = useCallback((value, getTagProps) => {
        console.log("value",value)
        return (
            <>
                {value.label}
            </>
        );
    }, [disabled]);


    if (IsSkeleton) {
        return (
            <SkeletonRound height={40} width={"100%"} />
        )
    }

    return (
        <Controller
            key={FnComponents.GetKey(TypeComponent.input, name)}
            name={name}
            control={control}
            rules={rules}
            shouldUnregister={true}
            defaultValue={defaultValue}
            render={({
                field: { onChange, value, ref },
                fieldState: { invalid, error },
            }) => {

                if (disabled && disableMode === "text") {
                    let oValue: IOptionsSelect = _.find(options, function (o) { return o.value === value + ""; });
                    return (
                        <FormLabelInput label={label}>
                            <Text className="text-value text-gray-500">
                                {hasValueDisableInput(oValue?.label)}
                            </Text>
                        </FormLabelInput>
                    )
                }

                return (
                    <>
                        <Autocomplete
                            //// {...register(name)}
                            id={FnComponents.GetId(TypeComponent.select, id, name)}
                            data-testid={name}
                            disabled={disabled}
                            disablePortal={false}
                            fullWidth={fullWidth}
                            size={size}
                            options={options}
                            value={GetValueOption(value)}
                            noOptionsText={notOptionsText}
                            disableClearable={disableClearable}
                            PopperComponent={IsPopperCustom ? PopperCustom : undefined}
                            renderTags={onRenderTags}
                            renderOption={onRenderOption}
                            filterOptions={onFilterOptions}
                            getOptionDisabled={(option: IOptionsSelect) => option.disable === true}
                            getOptionLabel={(itemOption: IOptionsSelect) => {
                                return `${itemOption.label}`;
                            }}
                            onChange={(event: React.SyntheticEvent, value: IOptionsSelect) => {
                                onHandleOnchange(event, value, onChange);
                            }}
                            onBlur={(event) => {
                                if (props.onBlur) {
                                    props.onBlur(event);
                                }
                            }}
                            onKeyDown={(event) => {
                                if (props.onKeyDown) {
                                    props.onKeyDown(event);
                                }
                            }}
                            onKeyUp={(event) => {
                                if (props.onKeyUp) {
                                    props.onKeyUp(event);
                                }
                            }}
                            renderInput={(params) => {
                                return (
                                    <TextField
                                        {...params}
                                        name={name}
                                        inputRef={ref}
                                        id={FnComponents.GetId(TypeComponent.input, id, name)}
                                        error={invalid}
                                        required={required}
                                        label={label}
                                        value={GetValueOption(value)}
                                        placeholder={placeholder}
                                        disabled={disabled}
                                        variant={disabled ? "standard" : variant}
                                        size={size}
                                        fullWidth={fullWidth}
                                        InputProps={{
                                            ...params.InputProps,
                                            startAdornment: startAdornment ? (
                                                <InputAdornment position="start">
                                                    {startAdornment}
                                                </InputAdornment>
                                            ) : (
                                                params.InputProps.startAdornment
                                            ),
                                        }}
                                    />
                                );
                            }}
                            slotProps={{
                                popper: {
                                    sx: {
                                        zIndex: 1000  //value less app bar for nested
                                    }
                                }
                            }}
                            sx={{
                                ".MuiAutocomplete-input": {
                                    textAlign: textAlign
                                }
                            }}
                        />
                        {IsShowMessageError && !disabled && error && (
                            <FormHelperText>{error.message}</FormHelperText>
                        )}
                    </>
                );
            }}
        />
    );
};

export default SelectItem;
