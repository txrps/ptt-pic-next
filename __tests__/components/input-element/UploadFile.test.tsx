import { describe, it, vi } from "vitest";
import UploadFileItem from "@/components/input-element/UploadFile";
import { useUploadFile } from "@/components/input-element/UploadFile/useUploadFile";
import { UploadProps } from "@/components/input-element/UploadFile/UploadFileProps";
import { Extension } from "@/lib";
import { renderWithProviders } from "@/__tests__/utililities/test-utililities";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { act, render, renderHook } from "@testing-library/react";
import {
  TablePaginationActions,
  CircularProgressWithLabelTable,
  CircularProgressWithLabelProfile,
} from "@/components/input-element/UploadFile/components/StyleCpnExport";
import DisplayGallery from "@/components/input-element/UploadFile/components/Gallery/DisplayGallery";
import ItemCard from "@/components/input-element/UploadFile/components/Gallery/ItemCard";
import DisplayListRow, {
  handleClickSelect,
  handleDelete,
} from "@/components/input-element/UploadFile/components/List/DisplayListRow";
import ItemRow from "@/components/input-element/UploadFile/components/List/ItemRow";
import FilePopup from "@/components/input-element/UploadFile/components/PopUp/FilePopup";
import ModalError from "@/components/input-element/UploadFile/components/PopUp/ModalError";

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

const sampleProps: UploadProps = {
  id: "arrUploadFile",
  name: "arrUploadFile",
  required: false,
  arrFile: [
    {
      sPath: "/Uploadfils/1",
      sFileName: "123.png",
      sSysFileName: "1234.png",
      sFolderName: "Test",
      sFileLink: "/Uploadfils/1.png",
      sFileType: "png",
    },
  ],
  setarrFile: vi.fn(),
  IsFolder: false,
  IsMultiple: false,
  Extension: [...Extension.Excel],
  nLimitFile: 50,
  sLimitFile: "MB",
  onClearFile: vi.fn(),
  sPositionText: "right",
  modeDisplay: "list",
  disabled: false,
};

describe("Component UploadFileItem", () => {
  it("Render UploadFileItem", () => {
    renderWithProviders(<UploadFileItem {...sampleProps}></UploadFileItem>);

    const objParam = {
      count: 10,
      page: 1,
      rowsPerPage: 10,
      onPageChange: vi.fn(),
    };
    TablePaginationActions(objParam);
    CircularProgressWithLabelTable({ value: 1 });
    CircularProgressWithLabelProfile({ value: 1 });
  });

  it("Render DisplayGalleryUploadfiles", () => {
    render(<DisplayGallery {...sampleProps}></DisplayGallery>);
  });

  const objItem1 = {
    arrFile: [
      {
        sPath: "/Uploadfils/1",
        sFileName: "123.png",
        sSysFileName: "1234.png",
        sFolderName: "Test",
        sFileLink: "/Uploadfils/1.png",
        sFileType: "png",
      },
    ],
    sFileType: "png",
  };

  const objItem2 = {
    arrFile: [
      {
        sPath: "/Uploadfils/1",
        sFileName: "123.png",
        sSysFileName: "1234.png",
        sFolderName: "Test",
        sFileLink: "/Uploadfils/1.png",
        sFileType: "png",
      },
    ],
    sFileType: "mp4",
  };

  const objItem3 = {
    arrFile: [
      {
        sPath: "/Uploadfils/1",
        sFileName: "123.png",
        sSysFileName: "1234.png",
        sFolderName: "Test",
        sFileLink: "/Uploadfils/1.png",
        sFileType: "png",
      },
    ],
    sFileType: "pdf",
  };

  const objItem4 = {
    arrFile: [
      {
        sPath: "/Uploadfils/1",
        sFileName: "123.png",
        sSysFileName: "1234.png",
        sFolderName: "Test",
        sFileLink: "/Uploadfils/1.png",
        sFileType: "png",
      },
    ],
    sFileType: "docx",
  };

  const objItem5 = {
    arrFile: [
      {
        sPath: "/Uploadfils/1",
        sFileName: "123.png",
        sSysFileName: "1234.png",
        sFolderName: "Test",
        sFileLink: "/Uploadfils/1.png",
        sFileType: "png",
      },
    ],
    sFileType: "xlsx",
  };

  const objItem6 = {
    arrFile: [
      {
        sPath: "/Uploadfils/1",
        sFileName: "123.png",
        sSysFileName: "1234.png",
        sFolderName: "Test",
        sFileLink: "/Uploadfils/1.png",
        sFileType: "png",
      },
    ],
    sFileType: "pptx",
  };

  const objItem7 = {
    arrFile: [
      {
        sPath: "/Uploadfils/1",
        sFileName: "123.png",
        sSysFileName: "1234.png",
        sFolderName: "Test",
        sFileLink: "/Uploadfils/1.png",
        sFileType: "png",
        IsCompleted: true,
        disabled: false,
      },
    ],
    sFileType: "txt",
  };

  const objItem8 = {
    arrFile: [
      {
        sPath: "/Uploadfils/1",
        sFileName: "123.png",
        sSysFileName: "1234.png",
        sFolderName: "Test",
        sFileLink: "/Uploadfils/1.png",
        sFileType: "png",
        IsCompleted: true,
        disabled: false,
      },
    ],
    sFileType: "msg",
  };

  const objItem9 = {
    arrFile: [
      {
        sPath: "/Uploadfils/1",
        sFileName: "123.png",
        sSysFileName: "1234.png",
        sFolderName: "Test",
        sFileLink: "/Uploadfils/1.png",
        sFileType: "png",
      },
    ],
    IsCompleted: true,
    disabled: false,
    sFileType: "rar",
  };

  it("Render ItemCardUploadfiles", () => {
    render(<ItemCard {...objItem1}></ItemCard>);
    render(<ItemCard {...objItem2}></ItemCard>);
    render(<ItemCard {...objItem3}></ItemCard>);
    render(<ItemCard {...objItem4}></ItemCard>);
    render(<ItemCard {...objItem5}></ItemCard>);
    render(<ItemCard {...objItem6}></ItemCard>);
    render(<ItemCard {...objItem7}></ItemCard>);
    render(<ItemCard {...objItem8}></ItemCard>);
    render(<ItemCard {...objItem9}></ItemCard>);
  });

  const objDisplay = {
    arrFile: [
      {
        sPath: "/Uploadfils/1",
        sFileName: "123.png",
        sSysFileName: "1234.png",
        sFolderName: "Test",
        sFileLink: "/Uploadfils/1.png",
        sFileType: "png",
      },
    ],
    sFileType: "png",
    IsMultiDelete: true,
    IsHide: false,
  };
  it("Render ListRowUploadfiles", () => {
    renderWithProviders(<DisplayListRow {...objDisplay}></DisplayListRow>);
    handleClickSelect("1234.png", [], vi.fn());
    handleDelete([], [], {
      SetarrFile: vi.fn(),
      onDeleteFileInLocation: vi.fn(),
    });
  });

  it("Render ItemRow", () => {
    renderWithProviders(<ItemRow {...objItem1}></ItemRow>);
    renderWithProviders(<ItemRow {...objItem2}></ItemRow>);
    renderWithProviders(<ItemRow {...objItem3}></ItemRow>);
    renderWithProviders(<ItemRow {...objItem4}></ItemRow>);
    renderWithProviders(<ItemRow {...objItem5}></ItemRow>);
    renderWithProviders(<ItemRow {...objItem6}></ItemRow>);
    renderWithProviders(<ItemRow {...objItem7}></ItemRow>);
    renderWithProviders(<ItemRow {...objItem8}></ItemRow>);
    renderWithProviders(<ItemRow {...objItem9}></ItemRow>);
  });

  it("Render FilePopup", () => {
    const objFile = {
      file: {
        sPath: "/Uploadfils/1",
        sFileName: "123.png",
        sSysFileName: "1234.png",
        sFolderName: "Test",
        sFileLink: "/Uploadfils/1.png",
        sFileType: "png",
      },
    };
    const objFile2 = {
      file: {
        sPath: "/Uploadfils/1",
        sFileName: "123.png",
        sSysFileName: "1234.png",
        sFolderName: "Test",
        sFileLink: "/Uploadfils/1.png",
        sFileType: "png",
      },
      IsCrop: true,
      sPopup: "modal",
    };
    render(<FilePopup {...objFile}></FilePopup>);
    render(<FilePopup {...objFile2}></FilePopup>);
  });

  it("Render ModalError", () => {
    const objFile = {
      file: {
        sPath: "/Uploadfils/1",
        sFileName: "123.png",
        sSysFileName: "1234.png",
        sFolderName: "Test",
        sFileLink: "/Uploadfils/1.png",
        sFileType: "png",
      },
    };
    render(<ModalError {...objFile}></ModalError>);
  });
});

describe("Function", () => {
  it("useUploadFile", () => {
    const { result } = renderHook(() => useUploadFile(), { wrapper: Wrapper });
    act(() => {
      let objParam = {
        sPath: "/Uploadfils/1",
        sFileName: "123.png",
        sSysFileName: "1234.png",
        sFolderName: "Test",
      };

      let objParamPopup = {
        arrFile: [],
        onOpenFile: vi.fn(),
        sPath: "/Uploadfils/1",
        sFileName: "123.png",
        sSysFileName: "1234.png",
        sFolderName: "Test",
        sFileLink: "/Uploadfils/1.png",
        sFileType: "png",
      };

      result.current.DownloadFile(objParam);
      result.current.OpenPopUp(objParamPopup);
      result.current.ClosePopUp();
      result.current.handleClickFile(objParamPopup);
      result.current.handleOpenModalAddDescription();
    });
  });
});
