"use client";

import React, { useMemo, useCallback } from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
    Autocomplete,
    TextField,
    FormHelperText,
    InputAdornment,
    Chip,
    ListItem,
    Typography,
    Checkbox
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { FnComponents, IMultiSelect, IOptionsSelect } from "@/lib";
import { TypeComponent } from "@/enum/enum";
import { FormLabelInput, SkeletonRound, Text } from "@/components";
import { PopperCustom } from ".";
import _ from "lodash";

const MultipleSelectItem = (props: IMultiSelect) => {
    const {
        id,
        name,
        label,
        fullWidth = true,
        limitTag = 5,
        defaultValue = [],
        disableMode = "input",
        disableClearable = false,
        disabled,
        IsSelectAllOption = true,
        IsShowMessageError = true,
        IsPopperCustom = true,
        IsShowCountSelected = false,
        options,
        notOptionsText = "ไม่พบข้อมูล",
        required = false,
        size = "small",
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
    }, [required, label]);

    const GetValueOption = (value) => {
        let arrValue: IOptionsSelect[] = [];
        if (value) {
            const arrStrValue: string[] = _.map(value, itemvalue => itemvalue + "");
            arrValue = _.filter(options, function (o) { return arrStrValue.includes(o.value) && !o.disable; });
        }
        return arrValue;
    };

    const onHandleRenderOption = useCallback(
        (props_, option, value, selected) => {
            if (props.options && props.options.length > 0) {
                return (
                    <ListItem
                        {...props_}
                        key={option.value}
                        sx={{ backgroundColor: option.bgcolor ?? "white", color: option.color ?? "black", }}
                    >
                        <Checkbox
                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                            style={{ marginRight: 8 }}
                            checked={
                                option.value === "SelectAll"
                                    ? (value || []).length === (props.options || []).length
                                    : selected
                            }
                        />
                        {option.label}
                    </ListItem>
                );
            } else {
                return (
                    <Typography sx={{ display: "flex", justifyContent: "center" }}>
                        {notOptionsText}
                    </Typography>
                );
            }
        },
        [props.options]
    );

    const onFilterOption = useCallback(
        (options, params) => {
            const filtered = params.inputValue
                ? options.filter((f: any) =>
                    f.label.toLowerCase().includes(params.inputValue.toLowerCase())
                )
                : options;
            if (props.limits != null) {
                const filtered_ = filtered.slice(0, props.limits);
                return IsSelectAllOption
                    ? [{ label: "เลือกทั้งหมด", value: "SelectAll" }, ...filtered_]
                    : filtered_;
            } else {
                let obj = {}
                if ("เลือกทั้งหมด".includes(params.inputValue.toLowerCase())) {
                    obj = { label: "เลือกทั้งหมด", value: "SelectAll" }
                }

                return IsSelectAllOption && filtered.length > 0
                    ? [
                        obj,
                        ...filtered,
                    ]
                    : filtered;
            }
        },
        [IsSelectAllOption, props.limits]
    );

    const onRenderTags = useCallback(
        (tagValue, getTagProps) => {
            return (
                <>
                    {tagValue.slice(0, limitTag).map((option: any, index) => (
                        <Chip
                            key={option?.value}
                            size={"small"}
                            {...getTagProps({ index })}
                            label={option?.label}
                            disabled={disabled || false}
                        />
                    ))}
                    {tagValue.length > limitTag ? (
                        <Chip
                            size={"small"}
                            label={"+" + (tagValue.length - limitTag)}
                            disabled={disabled || false}
                        />
                    ) : (
                        <></>
                    )}
                </>
            );
        },
        [disabled, limitTag]
    );

    const onHandleOnchange = useCallback(
        (event, selectedOptions, reason, value, onChangeController) => {
            const valueOnchange = GetValueOnChange(
                reason,
                selectedOptions,
                props,
                value,
                onChangeController
            )

            if (props.onChange) {
                props.onChange(valueOnchange, event);
            }
        },
        [props]
    );

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

                if (disabled && disableMode === "text") {
                    const arrStrValue: string[] = _.map(value, itemvalue => itemvalue + "");
                    const arrValue: string[] = _.map(_.filter(options, function (o) { return arrStrValue.includes(o.value); }), item => item.label);
                    return (
                        <FormLabelInput label={label}>
                            <Text className="text-value text-gray-500">
                                {arrValue.length === 0 ? "-" : null}
                                {arrValue.map(itemLabel => {
                                    return (
                                        <>
                                            - {itemLabel}
                                            <br />
                                        </>
                                    )
                                })}
                            </Text>
                        </FormLabelInput>
                    )
                }

                return (
                    <>
                        <Autocomplete
                            //// {...register(name)}
                            multiple
                            disableCloseOnSelect
                            ref={ref}
                            id={FnComponents.GetId(TypeComponent.select, id, name)}
                            data-testid={name}
                            disabled={disabled}
                            fullWidth={fullWidth}
                            size={size}
                            options={options}
                            value={GetValueOption(value)}
                            noOptionsText={notOptionsText}
                            getOptionDisabled={(option: IOptionsSelect) => option.disable === true}
                            disableClearable={disableClearable}
                            PopperComponent={IsPopperCustom ? PopperCustom : undefined}
                            renderTags={onRenderTags}
                            renderOption={(props_, option, { selected }) => {
                                return onHandleRenderOption(props_, option, value, selected);
                            }}
                            getOptionLabel={(itemOption: IOptionsSelect) => {
                                return `${itemOption?.label}`;
                            }}
                            filterOptions={onFilterOption}
                            onChange={(event, selectedOptions, reason) => {
                                onHandleOnchange(
                                    event,
                                    selectedOptions,
                                    reason,
                                    value,
                                    onChange
                                );
                            }}
                            onBlur={(event) => {
                                if (props.onBlur) {
                                    props.onBlur(event);
                                }
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    id={FnComponents.GetId(TypeComponent.input, id, name)}
                                    name={name}
                                    error={invalid}
                                    required={required}
                                    disabled={disabled}
                                    label={label}
                                    placeholder={
                                        checkValue(value, props, GetValueOption)
                                    }
                                    variant={disabled ? "standard" : variant}
                                    size={size}
                                    fullWidth={fullWidth}
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: props.startAdornment ? (
                                            <InputAdornment position="start">
                                                {props.startAdornment}
                                            </InputAdornment>
                                        ) : (
                                            params.InputProps.startAdornment
                                        ),
                                        endAdornment: (
                                            <>
                                                {IsShowCountSelected
                                                    ? value.length + " เลือกแล้ว"
                                                    : params.InputProps.endAdornment}
                                                {params.InputProps.endAdornment}
                                            </>
                                        ),
                                    }}
                                />
                            )}
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

export const checkValue = (value, props, GetValueOption) => {
    const opObjValueLength = GetValueOption(value).length;
    return opObjValueLength === 0 ? props.placeholder : null;
};

export const GetValueOnChange = (
    reason,
    selectedOptions,
    props,
    value,
    onChangeController
) => {
    let valueOnchange = [];
    if (reason === "selectOption" || reason === "removeOption") {
        selectedOptions = selectedOptions.filter(
            (f) => f !== undefined && f != null
        );
        //Select All
        if (selectedOptions.find((option) => option.value === "SelectAll")) {
            const IsAllSelected = props.options.length === (value || []).length;
            if (!IsAllSelected) {
                onChangeController(
                    props.options
                        .filter((f) => f.value !== "SelectAll")
                        .map((m) => m.value)
                );
                valueOnchange = props.options
                    .filter((f) => f.value !== "SelectAll")
                    .map((m) => m.value);
            } else {
                onChangeController([]);
                valueOnchange = [];
            }
        } else {
            const arr = (selectedOptions || [])
                .filter((f) => f.value !== "SelectAll")
                .map((m) => m["value"]);

            onChangeController(arr);
            valueOnchange = arr;
        }
    } else if (reason === "clear") {
        onChangeController([]);
        valueOnchange = [];
    }
    return valueOnchange;
};


export default MultipleSelectItem;
