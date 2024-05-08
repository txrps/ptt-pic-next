import { describe, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { InputNumberFormat } from "@/components/input-element/InputNumber";
import { IInputNumber } from "@/lib";

const sampleProps: IInputNumber = {
  label: "input",
  name: "input",
  required: true,
  valueType: "number",
};

const sampleProps2: IInputNumber = {
  label: "input",
  name: "input",
  required: true,
  valueType: "string",
  disabled: true,
  disableMode: "text",
  onChange: vi.fn(),
  onBlur: vi.fn(),
  onKeyDown: vi.fn(),
  onKeyUp: vi.fn(),
  onFocus: vi.fn(),
};

describe("Component InputNumberFormat", () => {
  it("Render InputNumberFormat", () => {
    render(<InputNumberFormat {...sampleProps}></InputNumberFormat>);
  });

  it("Render InputNumberFormat2", () => {
    render(<InputNumberFormat {...sampleProps2}></InputNumberFormat>);
  });
});
