import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../utililities/test-utililities";
import Page from "@/app/page";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { useHomePage } from "@/app/homepage/useHomepage";
import { act, renderHook } from "@testing-library/react";
//#region Initial
const preloadedState = {
  counter: { open: true },
};
const store = configureStore({
  reducer: {},
  preloadedState,
});
const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
//#endregion Initial

describe("Page hometest", () => {
  it("Render page", () => {
    renderWithProviders(<Page />);
    expect(<Page />).toBeDefined();
  });
});

describe("Function", () => {
  it("useHomepage", () => {
    const { result } = renderHook(() => useHomePage(), { wrapper: Wrapper });
    const objitem = [];
    act(() => {
      result.current.onGetInitialTable();
      result.current.DataMenu(objitem);

    });
  });


});