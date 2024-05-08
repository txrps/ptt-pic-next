import { describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { renderWithProviders } from "@/__tests__/utililities/test-utililities";

import Page from "@/app/admin/template/templateList/page";
import { useTemplateDataManagement } from "@/app/admin/template/templateList/_hook/useTemplateDataManagement";



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

describe("Page Template List", () => {
  it("Render Page", () => {
    renderWithProviders(<Page />);
    expect(<Page />).toBeDefined();
  });
});


describe("Function", () => {
  it("useTemplateDataManagement", () => {

    const { result } = renderHook(() => useTemplateDataManagement(false), { wrapper: Wrapper });
    act(() => {
      result.current.onDelete([1]);
    });
  });
});
