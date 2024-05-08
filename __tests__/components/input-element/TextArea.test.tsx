import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import { TextAreaItem } from "@/components/input-element/TextArea";
import { ITextarea } from "@/lib";

const sampleProps: ITextarea = {
  name: "name1",
  label: "label1",
  required: true,
  maxLength: 500,
  IsShrink: true,
};

describe("Component TextAreaItem", () => {
  it("Render TextAreaItem", () => {
    render(<TextAreaItem {...sampleProps}></TextAreaItem>);
  });
});
