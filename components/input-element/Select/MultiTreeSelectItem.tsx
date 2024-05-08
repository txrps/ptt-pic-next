"use client";

import React, { useMemo, useCallback, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
    Autocomplete,
    TextField,
    FormHelperText,
    InputAdornment,
    Chip,
    ListItem,
    Typography,
    Checkbox,
    ListItemButton,
    Box,
    List,
    Collapse,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { DefaultArrayEmpty, FnComponents, IMultiTreeSelect, IOptionsTreeSelect } from "@/lib";
import { TypeComponent } from "@/enum/enum";
import { FormLabelInput, SkeletonRound, Text } from "@/components";
import { PopperCustom } from ".";
import _ from "lodash";
import { ExpandMore, NavigateNext } from "@mui/icons-material";

const MultiTreeSelectItem = (props: IMultiTreeSelect) => {
    const {
        id,
        name,
        label,
        fullWidth = true,
        limitTag = 1,
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
        variant = "outlined",
        IsDisplayLabel = false,
        onClearOptions,
    } = props;

    const { getValues, setValue, control } = useFormContext();

    const [arrParentIDExpand, setArrParentIDExpand] = useState<any>([]);
    const [IsFirstTimeLoad, setIsFirstTimeLoad] = useState(true);
  
    const rules = useMemo(() => {
      return {
        required: {
          value: required,
          message: `กรุณาระบุ ${label}`,
        },
      };
    }, [required, label]);
  
    useMemo(() => {
      //Select Parent if children select all
      if (options.length > 0) 
      {
        let arrAllParent = options.filter((f) => f.IsParent);
        let arrChildrenSeleted = getValues(name) || [];
        //Loop Parent
        arrAllParent.forEach((iP) => {
          let arrChildrenOfParent = options.filter((f) => f.sParentID === iP.value);  
          let isSelectAllChildren = true;

          if (arrChildrenOfParent.length === 0) {
            isSelectAllChildren = false;
          }
          //Loop Children
          arrChildrenOfParent.forEach((iC) => {
            if (!arrChildrenSeleted.includes(iC.value)) {
              isSelectAllChildren = false;
            }
          });
          if (isSelectAllChildren) {
            arrChildrenSeleted.push(iP.value);
          }
        });
        if ([...arrChildrenSeleted].length > 0 && IsFirstTimeLoad) {
          arrChildrenSeleted = Object.keys(_.groupBy(arrChildrenSeleted));
          setValue(name, [...arrChildrenSeleted]);
          setIsFirstTimeLoad(false);
        }
      }
    }, [IsFirstTimeLoad, getValues, name, options, setValue]);
   
    const handleToggleSelectAll = (value, onChangeController) => {
      const allSelected = options.filter((f) => !f.disable).length === (value || []).length;
      let arrOption = [];
      if (!allSelected) {
        arrOption = options.filter((f) => f.value !== "SelectAll" && !f.disable);
        onChangeController(props.options.filter((f) => f.value !== "SelectAll" && !f.disable).map((m) => m.value));
      } else {
        onChangeController([]);
        arrOption = [];
      }  
      if (props.onChange) {
        props.onChange(arrOption);
      }
    };
  
    const setExpand = useCallback((sParentID) => {
      setArrParentIDExpand([...arrParentIDExpand, sParentID]);
    }, [arrParentIDExpand]);
  
    const removeExpand = useCallback((sParentID) => {
      let arrCloneParentID = arrParentIDExpand;
      arrCloneParentID = arrCloneParentID.filter((f) => f !== sParentID);
      let lstChild = options.filter((f) => f.sParentID === sParentID);
        while (lstChild && lstChild.length > 0) {
          let arrChild = [];
          // eslint-disable-next-line no-loop-func
          lstChild.forEach((child) => {
            arrCloneParentID = arrCloneParentID.filter(
              (item) => item !== child.value
            );
            let subChild = options.filter((f) => f.sParentID === child.value);
            if (subChild && subChild.length > 0) {
              arrChild = [...arrChild, ...subChild];
            }
          });
          lstChild = arrChild;
        }
      setArrParentIDExpand([...arrCloneParentID]);

    }, [arrParentIDExpand]);
  
    const onSelectchange = useCallback((isParentSelected, nValue, onChange, selectedOptions) => {
      let objData = options.find((f) => f.value === nValue);
      let newCheckedValues = [...selectedOptions];

        let arrOptionSelectedParent = options.filter((f) => f.sParentID === nValue);
        let lstChild = options.filter((f) => f.sParentID === nValue);
        while (lstChild && lstChild.length > 0) {
          let arrChild = [];
          // eslint-disable-next-line no-loop-func
          lstChild.forEach((child) => {
            newCheckedValues = [...newCheckedValues, child];
            let subChild = options.filter((f) => f.sParentID === child.value);
            if (subChild && subChild.length > 0) {
              arrChild = [...arrChild, ...subChild];
            }
          });
          lstChild = arrChild;
        }
        let objParent = options.find((f) => f.value === objData.sParentID);
        let sParentID = objParent ? objParent.value : "0";
        while(objParent){
          let nCountChildrenOfParent = options.filter((f) => f.sParentID === sParentID).length;
          let nCountChildrenSelectedOfParent = newCheckedValues.filter((f) => f.sParentID === sParentID).length;
          if (nCountChildrenSelectedOfParent >= nCountChildrenOfParent) {
          newCheckedValues = [...newCheckedValues, objParent];
          }
          objParent = options.find((f) => f.value === objParent.sParentID);
        }
        const distinctValues = Array.from(new Set(newCheckedValues.map(m => m.value)))
          onChange(distinctValues);
        if (arrOptionSelectedParent.length > 0 && isParentSelected) {
          setExpand(nValue);
        }else if(!isParentSelected){
          setExpand(sParentID);
        }
    }, [getValues, name, options, setExpand]);
  
    const onRemovechange = useCallback((isParentSelected, nValue, onChange, selectedOptions) => {   
      let objData = options.find((f) => f.value === nValue);
      let newCheckedValues = selectedOptions.filter((value) => value.value !== objData.value);

        let lstChild = options.filter((f) => f.sParentID === nValue);
        while (lstChild && lstChild.length > 0) {
          let arrChild = [];
          // eslint-disable-next-line no-loop-func
          lstChild.forEach((child) => {
            newCheckedValues = newCheckedValues.filter(
              (item) => item.value !== child.value
            );
            let subChild = options.filter((f) => f.sParentID === child.value);
            if (subChild && subChild.length > 0) {
              arrChild = [...arrChild, ...subChild];
            }
          });
          lstChild = arrChild;
        }
        let objParent = options.find((f) => f.value === objData.sParentID);
        while(objParent){
          newCheckedValues = newCheckedValues.filter(
            (item) => item.value !== objParent.value
          );
          objParent = options.find((f) => f.value === objParent.sParentID);
        }
        
        const distinctValues = Array.from(new Set(newCheckedValues.map(m => m.value)))
          onChange(distinctValues);
          removeExpand(nValue);
    }, [getValues, name, options, removeExpand]);
  
    const onSelectRemovechange = useCallback((reason, isParentSelected, nValue, onChangeController, selectedOptions) => {
      if (reason === "selectOption") {
        onSelectchange(isParentSelected, nValue, onChangeController, selectedOptions)
      } else if (reason === "removeOption") {
        onRemovechange(isParentSelected, nValue, onChangeController, selectedOptions)
      }
      if (props.onChange) props.onChange(selectedOptions);
    }, [onRemovechange, onSelectchange, props]);
  
    const handleChange = (event, selectedOptions, reason, onChangeController, value) => {
      let nValue = event.target.value + "";
      if (!nValue) {
        return;
      }
      setValue(`$select-${name}`, "");
      if (reason === "selectOption" || reason === "removeOption")
      {
        selectedOptions = selectedOptions.filter((f) => f !== undefined && f != null && !f.disable);        
        //Select All
        if (selectedOptions.find((option) => option.value === "SelectAll")) {
          handleToggleSelectAll(value, onChangeController);
        }
        else 
        {
          // const arr = (selectedOptions || []).filter(f => f.value !== "SelectAll" && !f.disable).map(m => m.value);
          // onChangeController(arr);
  
          //Parent Selected
          let arrAllParent = options.filter((f) => f.IsParent && !f.disable);
          let arrAllParentID = arrAllParent.map((f) => f.value);
          let isParentSelected = arrAllParentID.includes(nValue);
          //props.onChange > onSelectRemovechange
          onSelectRemovechange(reason, isParentSelected, nValue, onChangeController, selectedOptions)
        }
      } 
      else if (reason === "clear")
      {
        if (onClearOptions) onClearOptions();
        onChangeController([]);
        setArrParentIDExpand([]);
        if (props.onChange) props.onChange([]);
      }     
    };
  
    const handleExpand = useCallback((sParentID, arrsParentCode) => {
      let arrClone = arrParentIDExpand;
      let isExist = arrClone.findIndex((f) => f === sParentID) !== -1;
      if (!isExist) {
        arrClone.push(sParentID);
      } else {
        arrClone = arrClone.filter((f) => f !== sParentID && !arrsParentCode.includes(f));
      }
      setArrParentIDExpand([...arrClone]);
    }, [arrParentIDExpand]);
  
    const handleAutoCompleteChange = (e) => {
      let sText = e.target.value;
      // setValue(FnComponents.GetId(TypeComponent.select, id, name), sText);
      setValue(`$select-${name}`, sText);
    };
  
    const onHandleRenderTag = (tagValue, getTagProps) => {
      let arrParent = tagValue.filter((f) => f.IsParent);
      let arrParentNotChildren = [];
      arrParent.forEach((f) => {
        if (!options.some((s) => s.sParentID === f.value && !f.IsParent)) {
          arrParentNotChildren.push(f);
        }
      });
  
      tagValue = [...tagValue.filter((f) => f && !f.IsParent), ...arrParentNotChildren,];
      if (tagValue !== undefined) {
        return (
          <React.Fragment>
            {tagValue.slice(0, limitTag).map((option: any, index) => (
              <Chip
                key={option.value}
                // sx={{ ".MuiChip-label": { ...sxCustomLabelChip } }}
                size={size}
                {...getTagProps({ index })}
                label={option.label}
                disabled={disabled || false}
                onDelete={null}
              />
            ))}
            {tagValue.length > limitTag ? (
              <Chip
                size={size}
                label={"+" + (tagValue.length - limitTag)}
                disabled={disabled || false}
                onDelete={null}
              />
            ) : (
              <React.Fragment></React.Fragment>
            )}
          </React.Fragment>
        );
      }
    };
  
    const ListItemParentCallback = useCallback((props_, option, value, selected) => {
        let nSpace = 0;
        for (let i = 1; i < option.nLevel; i++) { nSpace = (nSpace + 4);}
        let arrsParentCode = option.sParentCode !== null ? option.sParentCode.split("-") : [];
        return (
            <Collapse
                key={option.value}
                in={option.nLevel == 1 ? true :(arrParentIDExpand.findIndex((f) => f === option.sParentID) !== -1 || DefaultArrayEmpty(getValues(FnComponents.GetId(TypeComponent.select, id, name))).length > 0)}
                timeout="auto"
                unmountOnExit
            >
                <List component="div" disablePadding sx={{ p: 0, backgroundColor: option.bgcolor ?? "white", color: option.color ?? "black", }}>
                    <ListItemButton key={option.value} sx={{ p: 0, pl: nSpace, backgroundColor: option.bgcolor ?? "white", color: option.color ?? "black", }}>
                      {
                        option.IsParent && (
                          options.some((s) => s.sParentID === option.value) &&
                          (arrParentIDExpand.findIndex((f) => f === option.value) !== -1 || DefaultArrayEmpty(getValues(FnComponents.GetId(TypeComponent.select, id, name))).length > 0 ? 
                            <Box {...props_} sx={{ height: '50px', p: 0, pl: 1, pr: 0, pt: 0, pb: 0 }} onClick={() => handleExpand(option.value, arrsParentCode)}><ExpandMore /></Box>
                          : 
                            <Box {...props_} sx={{ height: '50px', p: 0, pl: 1, pr: 0, pt: 0, pb: 0 }} onClick={() => handleExpand(option.value, arrsParentCode)}><NavigateNext /></Box>
                          )
                        )
                      }
                        <ListItem
                          {...props_}
                          key={option.value} 
                          value={option.value}
                          sx={{ p: 0, backgroundColor: option.bgcolor ?? "white", color: option.color ?? "black", }}
                        >
                            <Checkbox
                              icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                              checkedIcon={<CheckBoxIcon fontSize="small" />}
                              value={option.value}
                              checked={((value || []).length > 0 && options.filter((f) => !f.disable).length === (value || []).length) && selected ? true : selected}
                              disabled={option.disable}
                            />
                            {option.label}
                        </ListItem>                        
                    </ListItemButton>
                </List>
            </Collapse>
        )
    }, [arrParentIDExpand, getValues, handleExpand, name, options, props])
  

    const onFilterOption = useCallback(
        (options, params) => {
            const filtered = params.inputValue ? options.filter((f: any) => f.label.toLowerCase().includes(params.inputValue.toLowerCase())) : options;
            if (props.limits != null) {
                const filtered_ = filtered.slice(0, props.limits);
                return IsSelectAllOption ? [{ label: "เลือกทั้งหมด", value: "SelectAll" }, ...filtered_] : filtered_;
            } else {
                let obj = {}
                if ("เลือกทั้งหมด".includes(params.inputValue.toLowerCase())) {
                    obj = { label: "เลือกทั้งหมด", value: "SelectAll" }
                }
                return IsSelectAllOption && filtered.length > 0 ? [obj,...filtered,] : filtered;
            }
        },
        [IsSelectAllOption, props.limits]
    );

    const GetValueOption = (value) => {
      let arrValue: IOptionsTreeSelect[] = [];
      if (value) {
          const arrStrValue: string[] = _.map(value, itemvalue => itemvalue + "");
          arrValue = _.filter(options, function (o) { return arrStrValue.includes(o.value) && !o.disable; });
      }
      return arrValue;
    };

    if (IsSkeleton) {
      return ( <SkeletonRound height={40} width={"100%"} />)
    }

    // const onRender = useCallback((props_, option, selected, value) => {
    const onRender = (props_, option, selected, value) => {
      console.log("option",option)
      if (options && options.length > 0)
      {
          if (option.value === "SelectAll")
          {
            return (
              <ListItem
                  {...props_}
                  key={option.value}
                  sx={{ backgroundColor: option.bgcolor ?? "white", color: option.color ?? "black", }}
              >
                  <Checkbox
                      icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                      checkedIcon={<CheckBoxIcon fontSize="small" />}
                      checked={(value || []).length === (options.filter(f => !f.disable) || []).length}
                      disabled={disabled}
                  />
                  {option.label}
              </ListItem>
            );         
          }
          else  {
            return (ListItemParentCallback(props_, option, value, selected))                                        
          }
      }
      else
      {
        return (
          <Typography sx={{ display: "flex", justifyContent: "center" }}>
              {notOptionsText}
          </Typography>
        );
      }
    }//, [arrParentIDExpand, getValues, handleExpand, name, options, props, ListItemParentCallback, ListItemCollapseCallback]);
  
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
                           // {...register(name)}
                            multiple
                            disableCloseOnSelect
                            ref={ref}
                            id={FnComponents.GetId(TypeComponent.select, id, name)}
                            data-testid={name}
                            disabled={disabled}
                            fullWidth={fullWidth}
                            size={size}
                            limitTags={limitTag || 1}
                            selectOnFocus
                            options={options}
                            value={GetValueOption(value)}
                            noOptionsText={notOptionsText}
                            getOptionDisabled={(option: IOptionsTreeSelect) => option.disable === true}
                            disableClearable={disableClearable}
                            PopperComponent={IsPopperCustom ? PopperCustom : undefined}
                            renderTags={onHandleRenderTag}
                            renderOption={(props_, option, { selected }) => onRender(props_, option, selected, value)}
                            getOptionLabel={(itemOption: IOptionsTreeSelect) => { return `${itemOption?.label}`; }}
                            filterOptions={onFilterOption}
                            onChange={(event, selectedOptions, reason) => {
                              handleChange(event, selectedOptions, reason, onChange, value);
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
                                    label={IsDisplayLabel ? '' : label}
                                    placeholder={checkValue(value, props, GetValueOption)}
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
                                    onChange={handleAutoCompleteChange}                                        
                                />
                            )}
                            sx={{
                                " > label": {
                                  " > span": {
                                    fontSize: "12px",
                                    " ::before": {
                                      content: `"${required ? " *" : ""}"`,
                                      color: "red",
                                    },
                                  },
                                },
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

export const checkValue = (value, props, GetValueOption) => {
    const opObjValueLength = GetValueOption(value).length;
    return opObjValueLength === 0 ? props.placeholder : null;
};

export default MultiTreeSelectItem;
