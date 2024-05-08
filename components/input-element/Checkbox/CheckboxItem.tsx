import { FormLabelInput, SkeletonRound, Text } from "@/components";
import { TypeComponent } from "@/enum/enum";
import { FnComponents, ICheckbox, IOptionsSelect } from "@/lib";
import {
    Checkbox,
    FormControl,
    FormHelperText,
    FormLabel,
    Typography,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import _ from "lodash";
import { useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";

const CheckBoxItem = (props: ICheckbox) => {
    const {
        label,
        IsDisplayLabel = true,
        name,
        disabled = false,
        required = false,
        options,
        disableMode = "input",
        IsShowMessageError = true,
        defaultValue = false,
        size = "small",
        row = true,
        IsSkeleton = false

    } = props;
    const { control, register, setValue } = useFormContext();

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
                field: { value, ref },
                fieldState: { invalid, error }
            }) => {

                if (disabled && disableMode === "text") {
                    return (
                        <FormLabelInput label={label}>
                            <Text className="text-value text-gray-500">
                                - {options[0].label}
                            </Text>
                        </FormLabelInput>
                    )
                }
                return (
                    <FormControl required={required} error={invalid} >
                        {/* {IsDisplayLabel && label && <FormLabel component="legend" focused={false}>{label}</FormLabel>} */}
                        {IsDisplayLabel && label && <FormLabel component="legend" sx={{ color: '#121212'}} focused={false} >{label}</FormLabel>}
                        <FormGroup row={row} {...register(`${name}`)}>
                            {options.map((item: IOptionsSelect, index: number) => {
                                let label = item.label;
                                let sValue = item.value + "";
                                let sKeyItem = name + "-" + index;
                                let sID = FnComponents.GetId(TypeComponent.checkBox, sValue, name);
                                let sKey = FnComponents.GetKey(TypeComponent.checkBox, sKeyItem);
                                let IsDisabled = disabled || (item.disable ?? false);
                                return (
                                    <FormControlLabel
                                        key={sKey}
                                        control={
                                            <Checkbox
                                                id={sID}
                                                disabled={IsDisabled}
                                                checked={value}
                                                value={item.value}
                                                ref={ref}
                                                onChange={(e) => {
                                                    setValue(name, e.target.checked, {
                                                        shouldValidate: true,
                                                        shouldDirty: true,
                                                        shouldTouch: true,
                                                    });
                                                    if (props.onChange) {
                                                        props.onChange(e.target.checked);
                                                    }
                                                }}
                                                size={size}
                                            />
                                        }
                                        label={<Typography color={item.color}>{label}</Typography>}
                                    />
                                );
                            })}
                        </FormGroup>
                        {IsShowMessageError && error && (
                            <FormHelperText>{error.message}</FormHelperText>
                        )}
                    </FormControl>
                );
            }}
        />
    );
};

export default CheckBoxItem;