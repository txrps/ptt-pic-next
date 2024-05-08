import { describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { renderWithProviders } from "../../utililities/test-utililities";
import Page from "@/components/Breadcrumbs/index";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { useBreadcrumbs } from "@/components/Breadcrumbs/useBreadcrumbs";

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

describe("Breadcrumbs", () => {
  it("Render Page", () => {
    renderWithProviders(<Page />);
    expect(<Page />).toBeDefined();
  });
});

describe("Function", () => {
  it("useHook", () => {
    const objBreadcrumbs = {
      Item: [],
      isFrontEnd: true,
      isFrontEndProject: true,
    };
    const objD = { objResult: { lstBreadcrumbs: [] } };
    const { result } = renderHook(() => useBreadcrumbs(objBreadcrumbs), {
      wrapper: Wrapper,
    });

    act(() => {
      result.current.handleUpdate(objD);
    });
  });
});
