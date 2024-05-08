import { describe, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { SwitchFormItem } from "@/components/input-element/Switch";
import { SwitchForm } from "@/components/input-element/Switch/SwitchForm";
import { SwitchItemProps } from "@/components/input-element/Switch/SwitchProps";

const sampleProps: SwitchItemProps = {
  name: "switch1",
  label: "switch1",
  required: true,
  defaultValue: true,
};

describe("Component SwitchFormItem", () => {
  it("Render SwitchFormItem", () => {
    render(<SwitchFormItem {...sampleProps}></SwitchFormItem>);
  });

  it("Render SwitchForm", () => {
    render(<SwitchForm {...sampleProps}></SwitchForm>);
  });
});
