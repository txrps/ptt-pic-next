export interface ArrayTestModel {
  describeName: string;
  testCase: ArraytestCaseModel[];
}

export interface ArraytestCaseModel {
  testName: string;
  renderComponent?: any;
  propsComponent?: any;
  mockFunction?: "axios" | null;
  axiosMethod?: "get" | "post";
  axiosMockResolvedValue?: any;
  testMode: "Function" | "Component" | "Data";
  function?: any;
  objData?: any;
  screenGetByMode?:
  | "getByText"
  | "getAllByText"
  | "getByTestId"
  | "getAllByTestId";
  screenGetByValueName?: any;
  expectMode?: "notToBeNull" | "toBe" | "notToBe" | "toEqual" | "notToEqual";
  functionParameter?: any;
  expectValue?: any;
  isMockedUsedNavigate?: boolean;
  /**
   * กรณ๊มี UseEffect
   */
  isUseEffect?: boolean;
  /**
   * กรณ๊มี useCallback
   */
  isUseCallback?: boolean;
  isUseRef?: boolean;
  functionRef?: ArrFunctionRef[]
  fireEvent?: ArrayFireEvent[];
}

export interface ArrayFireEvent {
  eventMode: "change" | "keyDown" | "keyUp" | "click";
  getByMode: "getByText" | "getAllByText" | "getByTestId" | "getAllByTestId";
  keyGetBy: any;
  objValue?: any;
}

export interface ArrFunctionRef {
  functionName: string;
  parameter?: any;
}

// export interface ITestClick {
//   itemRender: any;
//   onClick: jest.Mock<any, any>;
//   sID : string;
//   sValue : string;
// }