import { describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { renderWithProviders } from "@/__tests__/utililities/test-utililities";
import Page from "@/app/admin/popup/page";
import { usePopupDataManagement } from "@/app/admin/popup/_hook/usePopupDataManagement";


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


vi.mock('@/components/input-element/UploadFile', () => ({
  default: (props) => {
    return <div>Input</div>
  },
}))

describe("Page Popup", () => {
  it("Render Page", () => {
    renderWithProviders(<Page />);
    expect(<Page />).toBeDefined();
  });
});

describe("Function", () => {
  it("usePopupDataManagement", () => {


    const { result } = renderHook(() => usePopupDataManagement(), { wrapper: Wrapper });
    act(() => {
      result.current.onSave();
    });
    
  });
});
