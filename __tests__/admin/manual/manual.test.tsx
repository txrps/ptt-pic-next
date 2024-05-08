import { describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import Page from "@/app/admin/manual/page";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { renderWithProviders } from "@/__tests__/utililities/test-utililities";
import { useManualDataManagement } from "@/app/admin/manual/_hook/useManualDataManagement";

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

describe("Page Manual", () => {
  it("Render Page", () => {
    renderWithProviders(<Page />);
    expect(<Page />).toBeDefined();
  });
});

describe("Function", () => {
  it("useManualDataManagement", () => {

    const dataRow = {
      nPageIndex: 1,
      nPageSize: 10,
      arrRows: [],
      nDataLength: 10,
      sSortExpression: "",
      sSortDirection: "",
    }

    const { result } = renderHook(() => useManualDataManagement(), { wrapper: Wrapper });
    act(() => {

      result.current.onGetData(dataRow);

    });
  });

});