import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../../utililities/test-utililities";
import { configureStore } from "@reduxjs/toolkit";
import { Show } from "@/components/common/Show";

//#region Initial
const preloadedState = {
  counter: { open: true },
};
const store = configureStore({
  reducer: {},
  preloadedState,
});
//#endregion Initial

describe("Show", () => {
  it("Render Page", () => {
    renderWithProviders(<Show />);
    expect(<Show />).toBeDefined();
  });
});
