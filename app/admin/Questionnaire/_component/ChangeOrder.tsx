"use client";

import { SelectItem } from "@/components";
import React from "react";
import { SxProps, Select, MenuItem } from "@mui/material";

const ChangeOrder = (props) => {
  const {
    item,
    onChangeOrder,
  } = props;

  const sxSelectOrder: SxProps = {
    height: "39px",
    "& .MuiSelect-select": { padding: "4px 12px" },
  };

  return (

    <Select
      fullWidth
      size="medium"
      sx={sxSelectOrder}
      value={item.nOrder}
      onChange={(e) => {
        ///console.log("onChange", e);
        const nOrder = item.lstOrder.find((f) => f.value === e.target.value).value;
        onChangeOrder(item.sID, nOrder);
      }}
      disabled={false}
      key={item.sID}
      MenuProps={{
        PaperProps: {
          sx: {
            maxHeight: 375,
            "&::-webkit-scrollbar": {
              width: 7,
            },
            "&::-webkit-scrollbar-track": {
              boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
              backgroundColor: "#0c1e3522",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgb(58 58 60) ",
              border: `1px solid rgba(48, 48, 48, 0)`,
              borderRadius: "10px",
            },
          },
        },
      }}>
      {item.lstOrder.map((item, index) => (
        <MenuItem key={item.value} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </Select>

    // <SelectItem
    //   key={item.sID}
    //   id={item.sID}
    //   name={"Order" + item.sID}
    //   label={""}
    //   IsSkeleton={false}
    //   required={false}
    //   disabled={false}
    //   options={item.lstOrder}
    //   defaultValue={item.nOrder}
    //   onChange={(e) => {
    //     //console.log("onChange", e);
    //     const nOrder = item.lstOrder.find((f) => f.value === e.value).value;
    //     onChangeOrder(item.sID, nOrder);
    //   }}
    // />
  );
};

export default ChangeOrder;
