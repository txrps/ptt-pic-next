import React, { useCallback, useMemo, useState, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
    Autocomplete,
    TextField,
    IconButton,
    Chip,
    FormHelperText,
    ListItem,
} from "@mui/material";
import axios from "axios";
import { IAutocomplete, IOptionsSelect, customParamsSerializer, hasValue, hasValueDisableInput , SecureStorage } from "@/lib";
import { PopperCustom } from ".";
import { FormLabelInput, SearchIcon, SkeletonRound, Text } from "@/components";


const AutoCompleteItem = (props: IAutocomplete) => {

    const {
        name,
        disableClearable = true,
        disabled = false,
        disableMode = "input",
        fullWidth = true,
        sUrlAPI,
        sParam,
        ParamUrl,
        sMethodAxios = "GET",
        IsShowMessageError = true,
        IsPopperCustom = true,
        id,
        defaultValue = null,
        placeholder,
        limitTag = 1,
        label,
        size,
        required = false,
        IsSkeleton = false,
        variant = "outlined"
    } = props;

    const { control, register } = useFormContext();

    const [inputValue, setInputValue] = useState<string>("");
    const [optionsValueAuto, setOptionsValueAuto] = useState<IOptionsSelect[]>([]);
    const [txtOption, setTxtOption] = useState<string>("Fill for Search");

    const GetParamSearch = () => {
        if (sParam) {
            return { strSearch: inputValue, sParam: sParam };
        } else {
            return { strSearch: inputValue };
        }
    };

    const SetOptionsValue = (data) => {
        const lstData = data ?? [];
        setOptionsValueAuto(lstData);
        if (lstData.length == 0) {
            setTxtOption("ไม่มีข้อมูล");
        }
    };

    useEffect(() => {
        if (!inputValue) {
            setOptionsValueAuto([]);
        } else {
            const source = axios.CancelToken.source();
            const paramSearch = GetParamSearch();
            const paramObj = { ...ParamUrl, ...paramSearch };
            const authToken =SecureStorage.Get(`${process.env.NEXT_PUBLIC_APP_JWT_KEY}`);
            const ConfigJwt = {
                Authorization: hasValue(authToken) ? `Bearer ${authToken}` : "",
                Accept: "application/json",
                "Content-Type": "application/json",
            };

            const newParam = sUrlAPI;
            const baseUrl = process.env.NEXT_PUBLIC_APP_API_URL;
            const sPathApi = `${baseUrl}api/${newParam}`;
            const url = new URL(sPathApi, window.location.href);
            const sNewPath = url.origin + url.pathname + url.search;

            setTxtOption("searching"); //กำลังค้นหา
            if (sMethodAxios === "POST") {
                axios
                    .post(sNewPath, paramObj, {
                        headers: ConfigJwt,
                        cancelToken: source.token,
                        paramsSerializer: customParamsSerializer,
                    })
                    .then((response) => {
                        SetOptionsValue(response.data);
                    })
                    .catch((error) => {
                        if (axios.isCancel(error)) return;
                    });
            } else {
                axios
                    .get(sNewPath, {
                        headers: ConfigJwt,
                        params: paramObj,
                        cancelToken: source.token,
                        paramsSerializer: customParamsSerializer,
                    })
                    .then((response) => {
                        ////console.log("AutoComplate", response);
                        SetOptionsValue(response.data);
                    })
                    .catch((error) => {
                        if (axios.isCancel(error)) return;
                    });
            }
            return () => source.cancel();
        }
    }, [inputValue]);

    const onRenderOption = useCallback((props: React.HTMLAttributes<HTMLLIElement>, option: IOptionsSelect) => {
        return (
            <ListItem
                {...props}
                key={option.value}
                sx={{ color: option.color ?? "black", }}
            >
                {option.label}
            </ListItem>
        );
    }, []);

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
                field: { onChange, value },
                fieldState: { invalid, error }
            }) => {

                if (disabled && disableMode === "text") {
                    return (
                        <FormLabelInput label={label}>
                            <Text className="text-value text-gray-500">
                                {hasValueDisableInput(value?.label)}
                            </Text>
                        </FormLabelInput>
                    )
                }
                return (
                    <React.Fragment>
                        <Autocomplete
                            //// {...register(name)}
                            getOptionLabel={(itemOption: any) => {
                                console.log("itemOption",itemOption.label)
                                return `${itemOption.label}`;
                            }}
                            filterOptions={(x) => x}
                            options={optionsValueAuto}
                            autoComplete
                            PopperComponent={IsPopperCustom ? PopperCustom : undefined}
                            size={size}
                            noOptionsText={txtOption}
                            blurOnSelect
                            includeInputInList
                            filterSelectedOptions
                            disabled={disabled}
                            disableClearable={disableClearable}
                            limitTags={limitTag}
                            value={value ?? null}
                            renderOption={onRenderOption}
                            onChange={(_event: any, newValue: any) => {
                                const sValue = newValue?.value;
                                if (sValue) {
                                    onChange(newValue);
                                    setOptionsValueAuto([]);
                                } else {
                                    onChange(null);
                                }
                                if (props.onChange) {
                                    props.onChange(newValue);
                                }
                            }}
                            onInputChange={async (_event: any, newInputValue: string) => {
                                setTxtOption("fill for search");
                                setInputValue(newInputValue);
                                setOptionsValueAuto([]);
                                if (!newInputValue) {
                                    return undefined;
                                }
                            }}
                            sx={{
                                ".MuiOutlinedInput-root": {
                                    paddingRight: "10px !important",
                                },
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    id={id}
                                    size={"small"}
                                    className="auto-input"
                                    label={label}
                                    placeholder={placeholder}
                                    error={invalid}
                                    fullWidth={fullWidth}
                                    variant={disabled ? "standard" : variant}
                                    required={required}
                                    style={{ width: "100%" }}
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <React.Fragment>
                                                <IconButton
                                                    style={{ padding: "0px" }}
                                                    disabled={disabled}
                                                >
                                                    <SearchIcon />
                                                </IconButton>
                                                {params.InputProps.endAdornment}
                                            </React.Fragment>
                                        ),
                                    }}
                                    InputLabelProps={{
                                        disabled: disabled,
                                        shrink: true,
                                    }}
                                    sx={{
                                        "label.MuiInputLabel-shrink": {
                                            top: "0px",
                                        },
                                        ".MuiInputLabel-outlined": {
                                            top: "0px",
                                        },
                                    }}
                                />
                            )}
                            renderTags={(tagValue, getTagProps) => {
                                return (
                                    <React.Fragment>
                                        {tagValue
                                            .slice(0, limitTag | 1)
                                            .map((option: any, index) => (
                                                <Chip
                                                    {...getTagProps({ index })}
                                                    label={option.label}
                                                    disabled={disabled}
                                                />
                                            ))}
                                    </React.Fragment>
                                );
                            }}
                        />
                        {IsShowMessageError && error && (
                            <FormHelperText>{error.message}</FormHelperText>
                        )}
                    </React.Fragment>
                );
            }}
        />
    );
};

export default AutoCompleteItem;