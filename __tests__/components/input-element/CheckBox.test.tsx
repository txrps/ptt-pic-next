import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import {
  CheckboxItem,
  CheckBoxListItem,
} from "@/components/input-element/Checkbox";
import { SetValueController } from "@/components/input-element/Checkbox/CheckBoxListItem";
import { ICheckbox } from "@/lib";

const sampleProps: ICheckbox = {
  label: "label",
  name: "name",
  required: true,
  options: [{ value: "1", label: "1" }],
  optionSub: [{ value: "1", label: "1" }],
  IsSelectAllOption: true,
  IsSkeleton: false,
};

const sampleProps2: ICheckbox = {
  label: "label",
  name: "name",
  required: true,
  options: [{ value: "1", label: "1" }],
  optionSub: [{ value: "1", label: "1" }],
  IsSelectAllOption: true,
  IsSkeleton: false,
  disabled: true,
  disableMode: "text",
};

describe("Component Checkbox", () => {
  it("Render Checkbox1", () => {
    render(<CheckboxItem {...sampleProps}></CheckboxItem>);
  });

  it("Render Checkbox2", () => {
    render(<CheckboxItem {...sampleProps2}></CheckboxItem>);
  });

  it("Render CheckboxList", () => {
    const event = {
      preventDefault() {},
      target: { value: "the-value" },
    };

    render(<CheckBoxListItem {...sampleProps2}></CheckBoxListItem>);
    SetValueController(event, ["1", "2"]);
  });
});
