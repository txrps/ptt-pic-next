import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import { TextBoxItem } from "@/components/input-element/TextBox";
import {
  generateRules,
  getPatternInputText,
  getMessageValidate,
  genMessagePattern,
  CheckDisabled,
} from "@/components/input-element/TextBox/textBoxUtils";
import { ITextbox } from "@/lib";

const sampleProps: ITextbox = {
  name: "name1",
  label: "label1",
  required: true,
  maxLength: 500,
  IsShrink: true,
};

describe("Component TextBoxItem", () => {
  it("Render TextBoxItem", () => {
    render(<TextBoxItem {...sampleProps}></TextBoxItem>);

    const sampleProps1 = {
      disabled: false,
      required: true,
      type: "text",
      pattern: null,
      isPatternPassword: false,
    };
    generateRules(sampleProps1);
    getPatternInputText("th");
    getPatternInputText("th-number");
    getPatternInputText("en");
    getPatternInputText("en-number");

    getMessageValidate({ type: "required" }, sampleProps1);
    getMessageValidate({ type: "value" }, sampleProps1);
    getMessageValidate({ type: "pattern" }, sampleProps1);

    genMessagePattern("text", "th", true, 1, 2);
    genMessagePattern("text", "th-number", true, 1, 2);
    genMessagePattern("text", "en", true, null, 2);
    genMessagePattern("text", "en-number", true, 1, null);
    genMessagePattern("email", "en-number", true, 1, null);
    genMessagePattern("password", "en-number", true, 1, null);

    CheckDisabled(true, false, null, null);
    CheckDisabled(false, false, null, null);
  });
});
