import { describe, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { SelectItem } from "@/components/input-element/Select";
import AutocompleteItem from "@/components/input-element/Select/AutocompleteItem";
import ChangeOrder from "@/components/input-element/Select/ChangeOrder";
import MultiSelectItem, {
  GetValueOnChange,
} from "@/components/input-element/Select/MultiSelectItem";
import MultiTreeSelectItem from "@/components/input-element/Select/MultiTreeSelectItem";
import { IAutocomplete, IMultiSelect, IMultiTreeSelect, ISelect } from "@/lib";

const sampleProps: ISelect = {
  label: "select",
  name: "select",
  required: true,
  options: [{ label: "option1", value: "1" }],
};

const sampleProps2: ISelect = {
  label: "select",
  name: "select",
  required: true,
  options: [{ label: "option1", value: "1" }],
  disabled: true,
  disableMode: "text",
  IsSkeleton: true,
};

describe("Component SelectItem", () => {
  it("Render SelectItem", () => {
    render(<SelectItem {...sampleProps}></SelectItem>);
  });

  it("Render SelectItem2", () => {
    render(<SelectItem {...sampleProps2}></SelectItem>);
  });

  it("Render AutocompleteItem", () => {
    const sampleProps1: IAutocomplete = {
      label: "select",
      name: "select",
      required: true,
    };

    const sampleProps2: IAutocomplete = {
      label: "select",
      name: "select",
      required: true,
      disabled: true,
      disableMode: "text",
      IsSkeleton: true,
    };
    render(<AutocompleteItem {...sampleProps1}></AutocompleteItem>);

    render(<AutocompleteItem {...sampleProps2}></AutocompleteItem>);
  });

  it("Render ChangeOrder", () => {
    const sampleProps = {
      id: "select1",
      item: { nOrder: 1, value: "1", label: "1" },
      onChangeOrder: vi.fn(),
      optOrder: [
        { nOrder: 1, value: "1", label: "1" },
        { nOrder: 2, value: "2", label: "2" },
      ],
      disabled: false,
    };
    render(<ChangeOrder {...sampleProps}></ChangeOrder>);
  });

  it("Render MultiSelect", () => {
    const sampleProps: IMultiSelect = {
      id: "select1",
      name: "select1",
      label: "select1",
      options: [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
      ],
      required: true,
      disabled: false,
    };

    const sampleProps2: IMultiSelect = {
      id: "select1",
      name: "select1",
      label: "select1",
      options: [],
      required: true,
      disabled: false,
    };
    render(<MultiSelectItem {...sampleProps}></MultiSelectItem>);

    GetValueOnChange(
      "selectOption",
      [
        { value: "1", label: "1" },
        { value: "SelectAll", label: "Select All" },
      ],
      sampleProps,
      "1",
      vi.fn()
    );

    GetValueOnChange(
      "clear",
      [
        { value: "1", label: "1" },
        { value: "SelectAll", label: "Select All" },
      ],
      sampleProps,
      "1",
      vi.fn()
    );

    GetValueOnChange(
      "selectOption",
      [{ value: "1", label: "1" }],
      sampleProps,
      "1",
      vi.fn()
    );

    GetValueOnChange(
      "selectOption",
      [
        { value: "1", label: "1" },
        { value: "SelectAll", label: "Select All" },
      ],
      sampleProps2,
      [],
      vi.fn()
    );
  });

  it("Render MultiTreeSelectItem", () => {
    const sampleProps: IMultiTreeSelect = {
      id: "select1",
      name: "select1",
      label: "select1",
      options: [],
      required: true,
      disabled: false,
    };
    render(<MultiTreeSelectItem {...sampleProps}></MultiTreeSelectItem>);
  });
});
