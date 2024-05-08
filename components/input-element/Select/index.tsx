import { PopperProps } from "@mui/base";
import { Popper } from "@mui/material";

export { default as SelectItem } from "./SelectItem";
export { default as MultiSelectItem } from "./MultiSelectItem";
export { default as AutocompleteItem } from "./AutocompleteItem";


export const PopperCustom = (props : PopperProps) => {
    return (
      <Popper
        {...props}
        placement="bottom-start"
        disablePortal={true}
        modifiers={[
          {
            name: "flip",
            enabled: false,
            options: {
              altBoundary: true,
              rootBoundary: "document",
              padding: 8,
            },
          },
        ]}
      />
    );
  }