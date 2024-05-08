import { describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { renderWithProviders } from "../../utililities/test-utililities";
import Page from "@/app/admin/setup/timeline/page";
import { useLoginBypass, usefnLoginSuccess } from "@/hooks/useLogin";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { APIStatusCode } from "@/enum/enum";
import { useTimeline } from "@/app/admin/setup/timeline/useTimeline";

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

describe("Page Timeline", () => {
    it("Render Page", () => {
        renderWithProviders(<Page />);
        expect(<Page />).toBeDefined();
    });
});


describe("Function", () => {
    it("useTimeline", () => {
        const objParam = { nStartDate_1: "14552247", nEndDate_1: "55555" };
        const objitem = { sID: "1" }
        const objData = []

        const { result } = renderHook(() => useTimeline(), { wrapper: Wrapper });
        act(() => {
            result.current.onGetData();
            result.current.onSubmit(objParam);
            result.current.onGetTargetDate();
            result.current.StartDate(objitem);
            result.current.EndDate(objitem);
            result.current.DataEvent(objData,objitem,objParam);
        });
    });


});