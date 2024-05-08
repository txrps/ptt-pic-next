import { SxProps, Select, MenuItem } from "@mui/material";
import React from "react";

const ChangeOrder = (props) => {
  const { id, item, onChangeOrder, optOrder, disabled = false } = props;
  const sxSelectOrder: SxProps = {
    height: "25px",
    backgroundColor: "white",
    "& .MuiSelect-select": { padding: "4px 10px" },
  };
  return (
    <Select
      id={id}
      fullWidth
      size="small"
      sx={sxSelectOrder}
      disabled={disabled}
      value={item.nOrder}
      onChange={(e) => {
        onChangeOrder(e.target.value);
      }}
      key={id}
      MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
    >
      {optOrder.map((Item, inx) => (
        <MenuItem key={Item.value} value={Item.value}>
          {Item.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default ChangeOrder;