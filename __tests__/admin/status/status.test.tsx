import { describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { renderWithProviders } from "@/__tests__/utililities/test-utililities";
import Page from "@/app/admin/status/page";
import { useStatusDataManagement } from "@/app/admin/status/_hook/useStatusDataManagement";



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

describe("Page Popup", () => {
  it("Render Page", () => {
    renderWithProviders(<Page />);
    expect(<Page />).toBeDefined();
  });
});

describe("Function", () => {
  it("useStatusDataManagement", () => {

    const dataRow = {
      arrRows: [{ sID: 1 }, { sID: 2 }],
      nPageIndex: 1,
      nPageSize: 10,
    }

    const objData = []

    const { result } = renderHook(() => useStatusDataManagement(), { wrapper: Wrapper });
    act(() => {
      result.current.onSave();
      result.current.inputStatusShowName(objData);
    });
  });
});