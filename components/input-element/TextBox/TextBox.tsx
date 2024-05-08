import { useMemo } from "react";
import { FormHelperText, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { TypeComponent } from "@/enum/enum";
import { FnComponents, ITextbox, hasValueDisableInput } from "@/lib";
import { TypeParamProps, generateRules, getMessageValidate } from "./textBoxUtils";
import { FormLabelInput, SkeletonRound, Text } from "@/components";
import "./TextBox.css"

const TextBoxItem = (props: ITextbox) => {
  const {
    id,
    name,
    label,
    placeholder,
    defaultValue = null,
    disableMode = "input",
    maxLength,
    type = "text",
    variant = "outlined",
    size = "small",
    required = false,
    disabled = false,
    fullWidth = true,
    startAdornment,
    endAdornment,
    autoComplete = "off",
    IsShrink,
    IsDisplayLabel = true,
    IsShowMessageError = true,
    IsCharacterCount = true,
    IsSkeleton = false,
    pattern,
  } = props;

  const { control, register } = useFormContext();
  const rules = useMemo(() => generateRules(props), [required]);

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
      render={({ field: { onChange, ref, value }, fieldState: { invalid, error } }) => {
        let paramProps: TypeParamProps = {
          pattern: pattern,
          type: type,
          IsShowMessageError,
          isPatternPassword: props.isPatternPassword,
          label,
          min: null,
          max: null,
        }

        const helperText = getMessageValidate(error, paramProps);
        const IsValid = invalid && !disabled;
        const InputLabelProps = {};
        const sValue = value ? value + "".trim() : "";
        if (IsShrink || sValue.length != 0) {
          InputLabelProps["shrink"] = true;
        }

        if (disabled && disableMode === "text") {
          return (
            <FormLabelInput label={label}>
              <Text className="text-value text-gray-500" >
                {hasValueDisableInput(value)}
              </Text>
            </FormLabelInput>
          )
        }

        return (
          <div className="div-textbox">
            <TextField
              // {...register(name)}
              required={required}
              value={value}
              id={FnComponents.GetId(TypeComponent.input, id, name)}
              name={name}
              inputRef={ref}
              label={FnComponents.GetLabel(label, IsDisplayLabel)}
              placeholder={placeholder}
              ////variant={disabled ? "outlined" : "standard"}
              variant={"outlined"}
              type={type}
              error={IsValid}
              size={size}
              fullWidth={fullWidth}
              autoComplete={autoComplete}
              disabled={disabled}
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
                onChange(e);
                if (props.onChange) {
                  props.onChange(e);
                }
              }}
              onKeyPress={(event) => {
                props.onKeyPress && props.onKeyPress(event);
              }}
            />
              {IsCharacterCount && <FormHelperText className="textbox-character-count">{`${sValue.length}/${maxLength}`}</FormHelperText>}
            {IsShowMessageError && IsValid && (
              <FormHelperText>{helperText}</FormHelperText>
            )}
          </div>
        );
      }}
    />
  );
};

export default TextBoxItem;