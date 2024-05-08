import { TypeComponent } from "@/enum/enum";
import { FnComponents, ICheckbox, IOptionsSelect } from "@/lib";
import {
	Checkbox,
	FormControl,
	FormHelperText,
	FormLabel,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import _ from "lodash";
import { FormLabelInput, SkeletonRound, Text } from "@/components";


const CheckBoxListItem = (props: ICheckbox) => {
	const {
		label = "",
		name,
		disabled = false,
		disableMode = "input",
		required = false,
		options,
		IsShowMessageError = true,
		IsSelectAllOption = false,
		defaultValue = [],
		size = "small",
		row = true,
		IsSkeleton = false,
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

	const CheckAll = (checked) => {
		let arrValue: string[] = [];
		if (checked) {
			arrValue = _.map(_.filter(options, function (o) { return !o.disable; }), item => item.value);
		}
		setValue(name, arrValue, { shouldValidate: true });
		if (props.onChange) {
			props.onChange(arrValue);
		}
	};

	const CheckItem = (arrValue, item) => {
		let checked = false;
		if (arrValue && Array.isArray(arrValue) && item) {
			checked = arrValue.filter((f) => f === item.value).length > 0;
		}
		return checked;
	};

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
			render={({ field: { value, ref }, fieldState: { invalid, error } }) => {
				let cbItem = options.filter((f) => !(f.disable ?? false));
				let sValue = name + "-All";
				let sKeyItem = name + "-All";
				let sCheckAllId = FnComponents.GetId(TypeComponent.checkBox, sValue, name);
				let sCheckAllKey = FnComponents.GetKey(TypeComponent.checkBox, sKeyItem);
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
					<FormControl required={required} error={invalid} ref={ref}>
						{label && <FormLabel component="legend" focused={false}>{label}</FormLabel>}
						<FormGroup row={row} {...register(`${name}`)}>
							{IsSelectAllOption && (
								<FormControlLabel
									key={sCheckAllKey}
									control={
										<Checkbox
											id={sCheckAllId}
											checked={value.length === cbItem.length}
											disabled={disabled}
											onChange={(e) => CheckAll(e.target.checked)}
											size={size}
										/>
									}
									label={`เลือกทั้งหมด`}
								/>
							)}
							{options.map((item, index) => {
								let label = item.label;

								let sKeyItem = name + "-" + index;
								let sValue = sKeyItem + "-" + item.value + "";
								let sID = FnComponents.GetId(TypeComponent.checkBox, sValue, sKeyItem);
								let sKey = FnComponents.GetKey(TypeComponent.checkBox, sKeyItem);
								let IsDisabled = disabled || (item.disable ?? false);
								return (
									<FormControlLabel
										key={sKey}
										control={
											<Checkbox
												id={sID}
												disabled={IsDisabled}
												checked={CheckItem(value, item)}
												value={item.value}
												onChange={(e) => {
													let arrData = SetValueController(e, value);
													setValue(name, arrData, {
														shouldValidate: true,
														shouldDirty: true,
														shouldTouch: true,
													});
													if (props.onChange) {
														props.onChange(arrData);
													}
												}}
												size={size}
											/>
										}
										label={label}
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

export default CheckBoxListItem;

export const SetValueController = (e, arrValue) => {
	let arrData = [];
	if (arrValue && Array.isArray(arrValue)) {
		if (e.target.checked) {
			arrValue.push(e.target.value);
		} else {
			arrValue = arrValue.filter((f) => f !== e.target.value);
		}
		arrData = arrValue;
	}
	return arrData;
};
