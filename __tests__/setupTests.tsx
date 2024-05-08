import { vi } from "vitest";
import "vitest-canvas-mock";

vi.mock("react-hook-form", async () => ({
  ...(await vi.importActual("react-hook-form")),
  useFormContext: () => ({
    handleSubmit: () => vi.fn(),
    register: vi.fn(),
    control: {
      register: vi.fn(),
      unregister: vi.fn(),
      getFieldState: vi.fn(),
      _removeUnmounted: vi.fn(),
      _names: {
        array: new Set("test"),
        mount: new Set("test"),
        unMount: new Set("test"),
        watch: new Set("test"),
        focus: "test",
        watchAll: false,
      },
      _subjects: {
        watch: vi.fn(),
        array: vi.fn(),
        state: vi.fn(),
      },
      _getWatch: vi.fn(),
      _formValues: ["test"],
      _defaultValues: ["test"],
    },
    getValues: () => {
      return 100;
    },
    setValue: () => vi.fn(),
    formState: () => vi.fn(),
    watch: () => vi.fn(),
    clearErrors: () => vi.fn(),
  }),
  Controller: ({ name, render }) => {
    return render({
      field: { name, onChange: vi.fn(), ref: null },
      fieldState: {
        invalid: true,
        error: {
          message: "require",
        },
      },
    });
  },
  useSubscribe: () => ({
    r: { current: { subject: { subscribe: () => vi.fn() } } },
  }),
  useNavigate: () => ({
    navigate: vi.fn(),
  }),
}));

vi.mock("react-secure-storage", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as any),
    textBaseline: vi.fn(),
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  };
});

export const localStorageMock = {
  getItem: vi.fn().mockImplementation((key) => localStorageItems[key]),
  setItem: vi.fn().mockImplementation((key, value) => {
    localStorageItems[key] = value;
  }),
  clear: vi.fn().mockImplementation(() => {
    localStorageItems = {};
  }),
  removeItem: vi.fn().mockImplementation((key) => {
    localStorageItems[key] = undefined;
  }),
};

let localStorageItems = {};

vi.mock("@mui/x-data-grid-pro", () => ({
  DataGridPro: () => <div data-testid="mock-datagrid" />,
  useGridApiRef: vi.fn(),
  LicenseInfo: {
    setLicenseKey: vi.fn(),
  },
}));
vi.mock("@mui/x-data-grid-pro", () => ({
  Standard: vi.fn(),
  GridActionsCellItem: ({ children }) => (
    <div data-testid="div-GridActionsCellItem">{children}</div>
  ),
}));
vi.mock("swiper/react", () => ({
  Swiper: ({ children }) => <div data-testid="swiper-testid">{children}</div>,
  SwiperSlide: ({ children }) => (
    <div data-testid="swiper-slide-testid">{children}</div>
  ),
}));

//// vi.mock("@amcharts/amcharts4/core", () => ({
////   addLicense: ({ children }) => (
////     <div data-testid="swiper-slide-testid">{children}</div>
////   ),
////   useTheme: ({ children }) => (
////     <div data-testid="swiper-slide-testid">{children}</div>
////   ),
//// }));
//// vi.mock("@amcharts/amcharts4/charts", () => ({
////   GaugeChartDataItem: vi.fn(),
////   GaugeChart: vi.fn(),
//// }));
//// vi.mock("@amcharts/amcharts4/themes/animated", () => ({
////   default: vi.fn(),
//// }));

process.env.NEXT_PUBLIC_APP_JWT_KEY =
  "https://www.softthaiapp.com/PTT-CRSR-API/";

vi.mock("swiper/modules", () => ({
  Navigation: (props) => null,
  Pagination: (props) => null,
  Scrollbar: (props) => null,
  A11y: (props) => null,
  Autoplay: (props) => null,
  FreeMode: (props) => null,
  Thumb: (props) => null,
}));

window.open = vi.fn();

vi.mock("moment/locale/th", () => ({}));

vi.mock("@mui/x-date-pickers-pro", () => ({
  DatePicker: () => <div data-testid="div-DatePicker"></div>,
  LocalizationProvider: () => (
    <div data-testid="div-LocalizationProvider"></div>
  ),
  LicenseInfo: {
    setLicenseKey: vi.fn(),
  },
}));

vi.mock("react-gallery-carousel", () => ({}));

vi.mock("@cyntler/react-doc-viewer", () => ({}));

vi.mock("src/utilities/utilities", async () => ({
  ...(await vi.importActual("src/utilities/utilities")),
  useDispatch: () => vi.fn(),
  FnAxios: () => {
    return {
      Get: vi.fn(),
      Post: vi.fn(),
      DowloadFileBlob: vi.fn(),
      DownloadFile: vi.fn(),
    };
  },
}));

vi.mock("react-router", async () => {
  return {
    ...(await vi.importActual("react-router")),
    useLocation: () => {
      return {
        search: "",
        pathname: "/somepath/mock",
      };
    },
  };
});

vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual("react-router-dom")),
  useNavigate: () => vi.fn(),
  useLocation: vi.fn().mockReturnValue({
    pathname: "/somepath/mock",
  }),
}));

vi.mock("react-router-dom", () => ({
  useParams: () => ({
    articleId: "63d466ca3d00b50db15aed93",
  }),
  BrowserRouter: vi.fn().mockImplementation((props) => props.children),
}));

vi.mock("next/navigation");

vi.mock("@/assets/images/logo/pic-home5.png", () => {
  return {
    default: () => <>Mocked PNG</>,
  };
});

const nextRouterMock = require("next-router-mock");
vi.mock("next/router", () => nextRouterMock);
vi.mock("next/navigation", () => {
  const { useRouter } = nextRouterMock;
  const usePathname = () => {
    const router = useRouter();
    return router.pathname;
  };

  const useSearchParams = () => {
    const router = useRouter();
    return new URLSearchParams(router.query);
  };

  return {
    useRouter,
    usePathname,
    useSearchParams,
  };
});

vi.mock("react-redux", async () => ({
  ...(await vi.importActual("react-redux")),
  useSelector: jest.fn(),
}));

vi.mock("react-gallery-carousel");
