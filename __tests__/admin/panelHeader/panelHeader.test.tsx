import { describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { renderWithProviders } from "@/__tests__/utililities/test-utililities";
import Page from "@/app/admin/panelHeader/page";
import { usePanelHeaderDataManagement } from "@/app/admin/panelHeader/_hook/usePanelHeaderDataManagement";



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


describe("Page resultType", () => {
  it("Render Page", () => {
    renderWithProviders(<Page />);
    expect(<Page />).toBeDefined();
  });
});


describe("Function", () => {
    it("useResultTypeDataManagement", () => {
      const dataRow = {
        nPageIndex: 1,
        nPageSize: 10,
        arrRows: [],
        nDataLength: 10,
        sSortExpression: "",
        sSortDirection: "",
      }
  
      const array = []
      const { result } = renderHook(() => usePanelHeaderDataManagement(), { wrapper: Wrapper });
      act(() => {
        result.current.onSave();
        result.current.fncPanelHeader(array);
        result.current.onGetData(dataRow);
      });
      
    });
  });