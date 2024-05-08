import { describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { renderWithProviders } from "../../utililities/test-utililities";
import Page from "@/app/admin/Questionnaire/ManageQuestionnaire/page";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { useQuestionList } from "@/app/admin/Questionnaire/ManageQuestionnaire/_component/useQuestionList";

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

describe("Page ManageQuestionnaire", () => {
    it("Render Page", () => {
        renderWithProviders(<Page />);
        expect(<Page />).toBeDefined();
    });
});

describe("Function", () => {
    it("useQuestionList", () => {
        const objParam = { nStartDate_1: "14552247", nEndDate_1: "55555" };
        const objitem = { sID: "1" }
        const objData = []

        const { result } = renderHook(() => useQuestionList(), { wrapper: Wrapper });
        act(() => {
            result.current.onGetDataTable();
            result.current.handleCloseModalDialog();
            result.current.onDelete(objData);
            result.current.DialogQuestion();
            result.current.fncTableTopic(objitem);
            result.current.fncTableQuestionCount(objitem);
        });
    });


});
