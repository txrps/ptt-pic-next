import { describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { renderWithProviders } from "../../utililities/test-utililities";
import Page from "@/app/admin/Questionnaire/ManageQuestionnaireForm/page";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { useQuestionForm } from "@/app/admin/Questionnaire/ManageQuestionnaireForm/_component/useQuestionForm";

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
    //     renderWithProviders(<Page />);
    //     expect(<Page />).toBeDefined();
  });
});

describe("Function", () => {
  it("useQuestionForm", () => {
    //     const objParam = { nStartDate_1: "14552247", nEndDate_1: "55555" };
    //     const objitem = { sID: "1" }
    //     const objData = []
    //     const { result } = renderHook(() => useQuestionForm(), { wrapper: Wrapper });
    //     act(() => {
    //         result.current.GetEdit();
    //         result.current.onSubmit(objitem);
    //         result.current.onDelete(objData);
    //         result.current.DialogHint();
    //         result.current.fncAddQuestion();
    //         result.current.onDelete(objitem);
    //         result.current.onGetInitialTable();
    //         result.current.onSumitTable();
    //     });
  });
});
