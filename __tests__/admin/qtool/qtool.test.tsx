import { describe, expect, it, vi } from "vitest";
import { act, render, renderHook } from "@testing-library/react";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { renderWithProviders } from "@/__tests__/utililities/test-utililities";
import Page from "@/app/admin/qtool/page";
import { useQtoolDataManagement } from "@/app/admin/qtool/_hook/useQtoolDataManagement";


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


describe("Page QuestionnairManagement", () => {
  it("Render Page", () => {
    renderWithProviders(<Page />);
    expect(<Page />).toBeDefined();
  });
});


describe("Function", () => {
  it("useQtoolDataManagement", () => {

    const dataRow = {
      nPageIndex: 1,
      nPageSize: 10,
      arrRows: [],
      nDataLength: 10,
      sSortExpression: "",
      sSortDirection: "",
    }
    const array = []
    const object = {}

    const { result } = renderHook(() => useQtoolDataManagement(), { wrapper: Wrapper });
    act(() => {
      result.current.onGetData(dataRow);
      result.current.onSave();
      result.current.onDelete([1]);

      result.current.fncOrder(array);
      result.current.fncName(array);
      result.current.fncMinimum(array);
      result.current.fncMaximum(array);
      result.current.fncStatus(array);
    });

  });
});