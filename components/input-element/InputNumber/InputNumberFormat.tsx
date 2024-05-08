import { Controller, useFormContext } from "react-hook-form";
import { FormHelperText, InputAdornment, TextField } from "@mui/material";
import { useMemo, useState } from "react";
import { FnComponents, IInputNumber, hasValue, hasValueDisableInput } from "@/lib";
import { TypeComponent } from "@/enum/enum";
import { NumericFormat } from "react-number-format";
import { TypeParamProps, getMessageValidate } from "../TextBox/textBoxUtils";
import { FormLabelInput, SkeletonRound, Text } from "@/components";


const InputNumberFormat = (props: IInputNumber) => {
    const {
        disabled = false,
        defaultValue = null,
        id,
        IsShowMessageError = true,
        IsThousandSeparator = true,
        IsAllowMinus,
        placeholder,
        textAlign = "right",
        variant = "outlined",
        label,
        max = null,
        maxDigits = 2,
        maxLength,
        min = null,
        name,
        required = false,
        size = "small",
        disableMode = "input",
        valueType,
        IsSkeleton = false
    } = props;

    const [isShrink, setIsShrink] = useState(false);
    const { control, register } = useFormContext();

    const rules = useMemo(() => {

        if (disabled) { return {} }
        let objvalidate = {};
        objvalidate["required"] = { value: required };
        objvalidate["validate"] = {
            value: (value) => {
                if (!value) { return true; }
                if (min && max) {
                    return value >= min && value <= max;
                }
                else if (min) {
                    return value >= min;
                }
                else if (max) {
                    return value <= max;
                }
            }
        };
        return objvalidate;
    }, [required]);


    if (IsSkeleton) {
        return (
            <SkeletonRound height={40} width={"100%"} />
        )
    }

    return (
        <Controller
            key={FnComponents.GetKey(TypeComponent.inputNumber, name)}
            name={name}
            control={control}
            rules={rules}
            shouldUnregister={true}
            defaultValue={defaultValue}
            render={({
                field: { onChange, value, ref },
                fieldState: { invalid, error },
            }) => {

                const isValid = invalid && !disabled;
                let paramProps: TypeParamProps = {
                    pattern: null,
                    type: "text",
                    IsShowMessageError,
                    isPatternPassword: false,
                    label,
                    min,
                    max
                }
                const helperText = getMessageValidate(error, paramProps);
                const shrink = !!value || value === 0 || isShrink || !!props.startAdornment || !!props.endAdornment;
                value = hasValue(value) ? value : ""

                if (disabled && disableMode === "text") {
                    return (
                        <FormLabelInput label={label}>
                            <Text className="text-value text-gray-500">
                                {hasValueDisableInput(value)}
                            </Text>
                        </FormLabelInput>
                    )
                }

                return (
                    <>
                        <TextField
                           // {...register(name)}
                            required={required}
                            inputRef={ref}
                            type={"text"}
                            id={FnComponents.GetId(TypeComponent.inputNumber, id, name)}
                            value={value ?? ""}
                            error={isValid}
                            variant={disabled ? "standard" : variant}
                            size={size}
                            placeholder={placeholder}
                            label={label}
                            disabled={disabled}
                            autoComplete="off"
                            inputProps={{
                                style: {
                                    textAlign: textAlign,
                                },
                                config: {
                                    disabled: disabled,
                                    decimalScale: maxDigits,
                                    IsThousandSeparator: IsThousandSeparator,
                                    IsAllowMinus: IsAllowMinus,
                                    valueType: valueType,
                                },
                                maxLength: maxLength,
                                'data-testid': name
                            }}
                            InputProps={{
                                // min: min, 
                                // max: max,
                                inputComponent: NumberFormatCustom,
                                startAdornment: props.startAdornment ? (
                                    <InputAdornment position="start">
                                        {props.startAdornment}
                                    </InputAdornment>
                                ) : null,
                                endAdornment: props.endAdornment ? (
                                    <InputAdornment position="end">
                                        {props.endAdornment}
                                    </InputAdornment>
                                ) : null,
                            }}
                            InputLabelProps={{
                                shrink: shrink,
                            }}
                            onChange={(e) => {
                                if (props.onChange) {
                                    props.onChange(e);
                                }
                                onChange(e.target.value);
                            }}
                            onBlur={(e) => {
                                setIsShrink(false);
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
                            onFocus={() => {
                                setIsShrink(true);
                            }}
                        />
                        {IsShowMessageError && isValid && (
                            <FormHelperText>{helperText}</FormHelperText>
                        )}
                    </>
                )
            }}
        />
    );
};

export default InputNumberFormat

function NumberFormatCustom(props) {
    const { inputRef, onChange, disabled, config, ...other } = props;
    return (
        <NumericFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        value: config.valueType === "number" ? values.floatValue : values.value,
                    },
                });
            }}
            disabled={config.disabled}
            
            fixedDecimalScale
            decimalScale={config.decimalScale}
            allowNegative={config.IsAllowMinus}
            thousandSeparator={config.IsThousandSeparator}
        />
    );
}
