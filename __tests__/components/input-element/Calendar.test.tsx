import { describe, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { Calendar } from "@/components/input-element/Calendar";

const sampleProps = {
  mode: "single",
  selected: new Date(),
  onSelect: vi.fn(),
  required: false,
  enableYearNavigation: true,
} as any;

describe("Component Calendar", () => {
  it("Render Calendar", () => {
    render(<Calendar {...sampleProps}></Calendar>);
  });
});
