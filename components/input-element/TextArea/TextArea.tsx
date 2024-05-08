import { useMemo } from "react";
import { FormHelperText, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import "./TextArea.css"
import { TypeComponent } from "@/enum/enum";
import { FnComponents, ITextarea, hasValueDisableInput } from "@/lib";
import { TypeParamProps, generateRules, getMessageValidate } from "../TextBox/textBoxUtils";
import { FormLabelInput, SkeletonRound, Text } from "@/components";

const TextArea = (props: ITextarea) => {
    const {
        id,
        name,
        label = "",
        placeholder,
        defaultValue = null,
        disableMode = "input",
        maxLength,
        variant = "outlined",
        size = "small",
        margin = "normal",
        required = false,
        IsShowMessageError = true,
        disabled = false,
        fullWidth = true,
        startAdornment,
        endAdornment,
        row = 3,
        maxRows = 5,
        autoComplete = "off",
        IsShrink,
        IsDisplayLabel = true,
        IsCharacterCount = true,
        IsSkeleton = false,
        pattern
    } = props;

    const { control, register } = useFormContext();

    const rules = useMemo(() => generateRules(props), [required]);

    if (IsSkeleton) {
        return (
            <SkeletonRound height={row * 40} width={"100%"} />
        )
    }

    return (
        <Controller
            key={FnComponents.GetKey(TypeComponent.textArea, name)}
            name={name}
            control={control}
            rules={rules}
            shouldUnregister={true}
            defaultValue={defaultValue}
            render={({
                field: { onChange, ref, value },
                fieldState: { invalid, error },
            }) => {
                let paramProps: TypeParamProps = {
                    pattern: pattern,
                    type: "text",
                    IsShowMessageError,
                    isPatternPassword: false,
                    label,
                    min: null,
                    max: null,
                }
                const helperText = getMessageValidate(error, paramProps);
                const IsValid = invalid && !disabled;
                const InputLabelProps = {};
                const sValue = value ? value.trim() + "" : "";
                if (IsShrink || sValue.length > 0) {
                    InputLabelProps["shrink"] = true;
                }

                
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
                    <div className="div-textarea-area">
                        <TextField
                           // {...register(name)}
                            required={required}
                            id={FnComponents.GetId(TypeComponent.textArea, id, name)}
                            name={name}
                            value={value ?? ""}
                            inputRef={ref}
                            label={FnComponents.GetLabel(label, IsDisplayLabel)}
                            placeholder={placeholder}
                            variant={disabled ? "standard" : variant}
                            type={"text"}
                            error={IsValid}
                            size={size}
                            fullWidth={fullWidth}
                            margin={margin}
                            multiline={true}
                            inputProps={{
                                maxLength: maxLength,
                                'data-testid': name
                            }}
                            InputProps={{
                                startAdornment: startAdornment,
                                endAdornment: endAdornment,
                            }}
                            InputLabelProps={InputLabelProps}
                            onBlur={(e) => {
                                if (props.onBlur) {
                                    props.onBlur(e);
                                }
                            }}
                            onChange={(e) => {
                                if (props.onChange) {
                                    props.onChange(e);
                                }
                                onChange(e);
                            }}
                            minRows={row}
                            maxRows={maxRows}
                            autoComplete={autoComplete}
                            sx={{
                                marginTop:'0px',
                            }}
                        />
                        {IsCharacterCount && <FormHelperText className="textarea-character-count">{`${sValue.length}/${maxLength}`}</FormHelperText>}
                        {(IsShowMessageError && invalid) && <FormHelperText>{helperText}</FormHelperText>}
                    </div>
                )
            }}
        />
    );
};
export default TextArea;

