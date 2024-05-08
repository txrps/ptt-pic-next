import { describe, expect, it, vi } from "vitest";
import { act, render, renderHook } from "@testing-library/react";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { renderWithProviders } from "@/__tests__/utililities/test-utililities";

import { useTemplateDataManagementForm } from "@/app/admin/template/templateForm/_hook/useTemplateDataManagementForm";
import Page from "@/app/admin/template/templateForm/page";

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

describe("Page Template Form", () => {
  it("Render Page", () => {
    renderWithProviders(<Page />);
    expect(<Page />).toBeDefined();
  });
});

describe("Function", () => {
  it("useTemplateDataManagementForm", () => {
    const { result } = renderHook(() => useTemplateDataManagementForm(), {
      wrapper: Wrapper,
    });
    act(() => {
      result.current.onSave();
    });
  });
});
