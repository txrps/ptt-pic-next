import { describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { renderWithProviders } from "../utililities/test-utililities";
import Page from "@/app/(login)/loginBypass/page";
import { useLoginBypass, usefnLoginSuccess } from "@/hooks/useLogin";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { APIStatusCode } from "@/enum/enum";

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

describe("Page Login By Pass", () => {
  it("Render Page", () => {
    renderWithProviders(<Page />);
    expect(<Page />).toBeDefined();
  });
});

describe("Function", () => {
  it("useLoginBypass", () => {
    const eventMouse = new MouseEvent("mousedown", { ctrlKey: true });

    const { result } = renderHook(() => useLoginBypass(), { wrapper: Wrapper });
    act(() => {
      result.current.handleClickShowSecuredCode();
      result.current.handleMouseDownSecuredCode(eventMouse);
      result.current.handleKeyPress(
        new KeyboardEvent("keydown", { keyCode: 13 })
      );
      result.current.handleKeyPress(
        new KeyboardEvent("keydown", { keyCode: 9 })
      );
      result.current.handleKeyPress(
        new KeyboardEvent("keydown", { key: "Enter" })
      );
      result.current.onLogin();
    });
  });

  it("usefnLoginSuccess", () => {
    const DialogFn = {
      UnBlockUI: vi.fn(),
      Warning: vi.fn(),
    };
    const Router = {
      push: vi.fn(),
    };

    const handleLoginSuccess = usefnLoginSuccess(DialogFn, Router);

    const resultSuccess = handleLoginSuccess({
      nStatusCode: APIStatusCode.Success,
    });
    expect(resultSuccess).toEqual({});

    const resultFail = handleLoginSuccess({
      nStatusCode: APIStatusCode.Warning,
      sMessage: "Test Fail",
    });
    expect(resultFail).toEqual({});
  });
});
