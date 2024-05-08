import { useMemo, useRef } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { SwitchItemProps } from "./SwitchProps";
import Switch from "react-switch";
import { FormControl, FormHelperText, FormLabel, Grid, Stack, Typography } from '@mui/material';

import './Switch.css';
import { FormLabelInput, SkeletonRound, Text } from "@/components/mui-elements";
import { hasValueDisableInput } from "@/lib";

export const SwitchFormItem = (props: SwitchItemProps) => {
   const {
      label = "",
      id,
      name,
      checkText,
      uncheckText,
      disabled,
      fontColor = "#ffffff",
      onColor = "#8bc34a",
      offColor = "#ee3a0d",
      width = 105,
      height = 29,
      direction = "column",
      defaultValue = true,
      required = false,
      IsDisplayLabel = true,
      disableMode = "input",
      IsSkeleton= false,
      IsShowMessageError = true,
   } = props;
   const elementRef = useRef(null);
   const { control, register } = useFormContext();

   if (IsSkeleton)
   {
      return (
         <SkeletonRound height={40} width={300}/>
      )
   }  
      
   return (
      <Controller 
         name={name} 
         control={control}
         shouldUnregister={true}
         defaultValue={defaultValue}  
         render={({
            field: { onChange, value, ref },
            fieldState: { invalid, error }, }) => {
            let sCheckText = checkText ?? "Active";
            let sUncheckText = uncheckText ?? "Inactive";

            if (disabled && disableMode === "text") {
               return (
                  <FormLabelInput label={label}>
                     <Text className="text-value text-gray-500" >
                        {hasValueDisableInput(value ? sCheckText : sUncheckText)}
                     </Text>
                </FormLabelInput>
               )
             }

            return (
               <FormControl required={required} error={invalid} ref={ref} className='switch-background'>
                  {IsDisplayLabel && label && <FormLabel component="legend" sx={{ color: '#121212'}} >{label}</FormLabel>}
                  <Typography component="div">
                     <Grid item
                        component="label"
                        container
                        alignItems="center"
                        alignContent="space-between"
                        xs={12}
                        spacing={3}>
                        <Grid item>
                           <label htmlFor="small-radius-switch" style={{ color: "#ffffff" }}>
                              <Switch
                                 id={name}
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
                                 height={height}
                                 width={width}
                                 disabled={disabled}
                                 uncheckedIcon={<div className="react-switch-label-uncheck">{sUncheckText}</div>}
                                 checkedIcon={<div className="react-switch-label-check">{sCheckText}</div>}
                                 className={"react-switch"}
                              />
                           </label>
                        </Grid>
                     </Grid>
                  </Typography>
                  {/* {error ? (
                     <FormHelperText sx={{ color: "red" }}>
                        {error.message}
                     </FormHelperText>
                  ) : null} */}
                  {IsShowMessageError && error && (
                     <FormHelperText>{error.message}</FormHelperText>
                  )}
               </FormControl >
            )
         }}
      />
   );
};

// export const SwitchFormItem = (props: SwitchItemProps) => {
//    const {
//       label = "",
//       id,
//       name,
//       checkText,
//       uncheckText,
//       disabled,
//       fontColor = "#ffffff",
//       onColor = "#8bc34a",
//       offColor = "#ee3a0d",
//       width = 130,
//       direction = "column",
//       defaultValue = true,
//    } = props;
//    const elementRef = useRef(null);
//    const { control, register } = useFormContext();

//    return (
//       <Controller name={name} control={control} defaultValue={defaultValue}
//          render={({
//             field: { onChange, value, ref } }) => {
//             let sCheckText = checkText ?? "เปิดใช้งาน";
//             let sUncheckText = uncheckText ?? "ปิดใช้งาน";
//             let IsChecked = value ?? true;
//             let IsValue = value ?? true;
//             return (
//                <FormControl ref={ref} >
//                   <Stack direction={direction} justifyContent="flex-start" alignItems="center">
//                      {label && <Typography component="legend" className="react-switch-form-label">{label}</Typography>}
//                      <div className="react-switch-form" ref={elementRef}>
//                         <Switch
//                            id={id}
//                           // {...register(name)}
//                            key={name}
//                            name={name}
//                            checked={IsChecked}
//                            value={IsValue}
//                            onChange={(e) => {
//                               onChange(e);
//                               if (props.onChange) {
//                                  props.onChange(e);
//                               }
//                            }}
//                            handleDiameter={26}
//                            offColor={offColor}
//                            onColor={onColor}
//                            height={28}
//                            width={width}
//                            disabled={disabled}
//                            uncheckedIcon={<div style={{ color: fontColor }} className="react-switch-label-uncheck">{sUncheckText}</div>}
//                            checkedIcon={<div style={{ color: fontColor }} className="react-switch-label-check">{sCheckText}</div>}
//                            className={"react-switch"}
//                         />
//                      </div>
//                   </Stack>
//                </FormControl>
//             )
//          }}
//       />
//    );
// };
export default SwitchFormItem;