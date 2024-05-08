import { FormLabelInput, Text } from '@/components';
import SkeletonRound from '@/components/mui-elements/Skeleton/SkeletonRound';
import { TypeComponent } from '@/enum/enum';
import { FnComponents, IOptionsSelect, IRadio, hasValueDisableInput } from '@/lib';
import { Radio, FormControl, FormHelperText, FormLabel, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import _ from 'lodash';
import { useMemo } from 'react';
import { Controller, useFormContext } from "react-hook-form";

const RadioListItem = ((props: IRadio) => {
    const {
        label,
        id,
        IsDisplayLabel = true,
        name,
        disabled = false,
        required = false,
        disableMode = "input",
        options,
        IsShowMessageError = true,
        defaultValue = "",
        size = "small",
        row = true,
    IsSkeleton= false
} = props;

    const { control, register, setValue } = useFormContext();

    const GenerateId: string = FnComponents.GetId(TypeComponent.radio, id, name);

    const rules = useMemo(() => {
        return {
            required: {
                value: required,
                message: `กรุณาระบุ ${label}`,
            },
        };
    }, [required]);

    if(IsSkeleton)
    {
        return (
          <SkeletonRound height={40} width={300}/>
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
                fieldState: { invalid,error }
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
                    <FormControl required={required} error={invalid} ref={ref} className='rdo-background'>
                        {/* {IsDisplayLabel && label && <FormLabel sx={{ fontWeight: "bold" }} component="legend" className='color-black'>{label}</FormLabel>} */}
                        {IsDisplayLabel && label && <FormLabel component="legend" sx={{ color: '#121212'}} focused={false}>{label}</FormLabel>}
                        <FormGroup row={row} {...register(`${name}`)} >
                            {
                                options.map((item : IOptionsSelect, index : number) => {
                                    let label = item.label;
                                    let sID = GenerateId + "_" + item.value;
                                    let sKey = name + index;
                                    let IsDisabled = disabled || (item.disable ?? false);
                                    return (
                                        <FormControlLabel
                                            key={sKey}
                                            control={
                                                <Radio
                                                    id={sID}
                                                    disabled={IsDisabled}
                                                    checked={value == item.value} // === บัค
                                                    value={item.value}
                                                    onChange={(e) => {
                                                        setValue(name, e.target.value, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
                                                        if (props.onChange) props.onChange(e.target.value)
                                                    }}
                                                    size={size}
                                                />
                                            }
                                            label={<Typography color={item.color}>{label}</Typography>}
                                        />)
                                })
                            }
                        </FormGroup>
                        {IsShowMessageError && error && (
                            <FormHelperText>{error.message}</FormHelperText>
                        )}
                    </FormControl >
                )
            }}
        />
    );
});

export default RadioListItem;