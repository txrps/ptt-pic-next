import { RenderOptions, fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { AppStore, RootState } from "components/store/Store";
import { PropsWithChildren } from "react";
import { expect, vi } from "vitest";
import {
  configureStore,
  PreloadedStateShapeFromReducersMapObject,
} from "@reduxjs/toolkit";
import { CssBaseline } from "@mui/material";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedStateShapeFromReducersMapObject<RootState>;
  store?: AppStore;
}

export const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {} as any,
    store = configureStore({
      reducer: {} as any,
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const Wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    return (
      <Provider store={store}>
        <CssBaseline />
        <Router>{children}</Router>
      </Provider>
    );
  };
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

// export const TextFieldOnClick = (
//   itemRender: any,
//   onClick: vi.mock<any, any>,
//   sID: string,
//   sValue: string
// ) => {
//   let id = "#" + sID;
//   const input = itemRender.baseElement.querySelector(id);
//   fireEvent.change(input, { target: { value: sValue } });
//   if (sValue) {
//     expect(input.value).toEqual(sValue);
//   }
//   fireEvent.click(input);
//   expect(onClick).toHaveBeenCalled();
// };

// export const TextFieldOnChange = (
//   itemRender: any,
//   onChange: vi.mock<any, any>,
//   sID: string,
//   sValue: string
// ) => {
//   let id = "#" + sID;
//   const input = itemRender.baseElement.querySelector(id);
//   fireEvent.change(input, { target: { value: sValue } });
//   if (sValue) {
//     expect(input.value).toEqual(sValue);
//   }
//   expect(onChange).toHaveBeenCalled();
// };

export const ButtonOnClick = (itemRender: any, sID: string) => {
  // let id = "#" + sID;
  // const input = itemRender.baseElement.querySelector(id);
  // fireEvent.click(input);
};

export const onAxiosTableSuccess = (usefnSuccess, lstDataName: string) => {
  const setDataRowMock = jest.fn();
  const setLoadingTableMock = jest.fn();
  const DialogFnMock = {
    UnBlockUI: jest.fn(),
  };
  const currentDataRow = {
    arrRows: [],
    nDataLength: 0,
    nPageIndex: 0,
    // Other properties as needed
  };

  // Define the response object
  const res: {
    [key: string]: any; // Use an index signature for dynamic property name
    ObjTable: { nDataLength: number; nPageIndex: number };
  } = {
    [lstDataName]: [{}, {}], // Use the dynamic property name
    ObjTable: { nDataLength: 2, nPageIndex: 1 },
  };

  // Call the usefnSuccess function
  const successCallback = usefnSuccess({
    setDataRow: setDataRowMock,
    setLoadingTable: setLoadingTableMock,
    DialogFn: DialogFnMock,
    dataRow: currentDataRow,
  });

  // Call the successCallback function with the mocked response
  successCallback(res);

  expect(setDataRowMock).toHaveBeenCalledWith({
    ...currentDataRow,
    arrRows: res[lstDataName],
    nDataLength: res.ObjTable.nDataLength,
    nPageIndex: res.ObjTable.nPageIndex,
  });
};

export const onAxiosDeleteSuccess = (usefnSuccessDelete) => {
  const DialogFn = {
    Success: jest.fn(),
    UnBlockUI: jest.fn(),
  };

  const getTable = jest.fn();

  const dataRow = {
    // Sample state properties
    prop1: "value1",
    prop2: "value2",
    // Add other properties if needed
  };

  const handleSuccess = usefnSuccessDelete({ DialogFn, getTable, dataRow });

  // Call the handleSuccess function
  const result = handleSuccess();

  expect(getTable).toHaveBeenCalledWith(dataRow);

  expect(result).toEqual({});
};

export const onAxiosFail = (usefnFail) => {
  const DialogFn = {
    Warning: jest.fn(),
    UnBlockUI: jest.fn(),
  };

  // Create an instance of usefnFail with mocked DialogFn
  const handleFail = usefnFail({ DialogFn });

  // Create a sample error object without a response
  const mockErrorWithoutResponse = {
    response: null,
    Message: "Sample error message",
  };

  // Call the handleFail function with the mockErrorWithoutResponse
  const resultWithoutResponse = handleFail(mockErrorWithoutResponse);

  expect(resultWithoutResponse).toEqual({
    error: mockErrorWithoutResponse,
  });
};

export const onAxiosSubmitMaster = (usefnSuccessSave) => {
  const DialogFn = {
    Success: jest.fn((message, callback) => {
      callback(); // Simulate calling the callback function
    }),
    UnBlockUI: jest.fn(),
  };

  const navigate = jest.fn();

  const handleSuccess = usefnSuccessSave({ DialogFn, navigate });

  const result = handleSuccess();

  expect(result).toEqual({});
};

export const PathAPIMock = "https://www.softthaiapp.com/PTT-CRSR-API/";
