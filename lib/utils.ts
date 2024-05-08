import { APIStatusCode, I18NextNs, Language, TypeComponent } from "@/enum/enum";
import { IAvatar, ValueFormatter } from "./inputTypes";
import { jwtDecode } from "jwt-decode";
import { initReactI18next } from "react-i18next";
import { ApiAuthentication } from "@/enum/api";
import parse from "html-react-parser";
import dayjs from "dayjs";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import i18next, { t } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import enlabelComponent from "@/Locales/en-US/labelComponent.json"
import thlabelComponent from "@/Locales/th-TH/labelComponent.json"
import en from "@/Locales/en-US/translation.json";
import th from "@/Locales/th-TH/translation.json";
import enValidation from "@/Locales/en-US/validation.json";
import thValidation from "@/Locales/th-TH/validation.json";
import enExampleComponent from "@/Locales/en-US/exampleComponent.json";
import thExampleComponent from "@/Locales/th-TH/exampleComponent.json";

export const I18n = {
  envI18next: process.env.NEXT_PUBLIC_APP_I18NEXT,
  InitialI18next: () => {
    i18next
      .use(initReactI18next)
      .use(LanguageDetector)
      .use(Backend)
      .init(
        {
          ns: [
            "translation",
            "validation",
            "example",
            "caption",
            "labelComponent",
          ],
          lng: I18n.GetLanguage(),
          resources: {
            th: {
              translation: th,
              validation: thValidation,
              example: thExampleComponent,
              labelComponent: thlabelComponent,
            },
            en: {
              translation: en,
              validation: enValidation,
              example: enExampleComponent,
              labelComponent: enlabelComponent,
            },
          },
          fallbackLng: Language.en,
          interpolation: {
            escapeValue: false,
          },
        },
        (err, _t) => {
          if (err) {
            console.log("I18n", err, t);
            return err;
          }
        }
      );

    I18n.SetLanguage(Language.en);
  },
  GetLanguage: () => {
    let value = SecureStorage.Get(I18n.envI18next);
    if (!value) value = Language.en;
    return value;
  },
  SetLanguage: (value: string) => {
    return SecureStorage.Set(I18n.envI18next, value);
  },
  SetText: (sKey: string, sMode?: string) => {
    return t(sKey, { ns: sMode ?? I18NextNs.translation });
  },
};

// eslint-disable-next-line react-refresh/only-export-components
export const SecureStorage = {
  Get: (name: string) => {
    return secureLocalStorage.getItem(name) as string;
  },
  Set: (name: string, value: string) => {
    return secureLocalStorage.setItem(name, value);
  },
  Remove: (name: string) => {
    return secureLocalStorage.removeItem(name);
  },
  Clear: () => {
    return secureLocalStorage.clear();
  },
};

export const GetUrlApi = () => {
  const sCurrentLocation =
    typeof window !== "undefined" ? window.location.hostname : "";
  let sUrlApi;
  if (sCurrentLocation === "localhost") {
    sUrlApi = "http://localhost:7239/";
  } else {
    sUrlApi = "https://softthaiapp.com/ptt-pic-2024-api/";
  }
  return sUrlApi;
};

export const FnComponents = {
  GetId: (type: TypeComponent, id: string, name: string) =>
    id || `${type}-${name}`,
  GetKey: (type: TypeComponent, name: string) => `${type}-${name}`,
  GetLabel: (sLabel: string, IsDisplayLabel: boolean) =>
    IsDisplayLabel ? sLabel : "",
};

export const OpenNewTab = (sUrl: string) => {
  const newWindow = window.open(sUrl, "_blank", "noopener,noreferrer");
  if (newWindow) {
    newWindow.opener = null;
  }
};

export const hasValueDisableInput = (value) => {
  if (!hasValue(value)) {
    return "-";
  } else if (value.includes("\n")) {
    let jsxText = value.replaceAll("\n", "<br/>");

    value = parse(jsxText);
  }
  return value;
};

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}

export const customParamsSerializer = (params) => {
  return Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");
};

export function hasValue<T>(value: T | null | undefined) {
  return value !== null && value !== undefined && (value + "").trim() !== "";
}

export const isNumber = (n) => {
  return typeof n != "boolean" && !isNaN(n);
};

export const currencyValueFormatter: ValueFormatter = (e: number) =>
  `$ ${Intl.NumberFormat("en-US").format(e)}`;

export const sumNumericArray = (arr: number[]) =>
  arr.reduce((prefixSum, num) => prefixSum + num, 0);
export const GetQuerystring = (searchParams) => {
  return Convert.StringToStringEmpty(searchParams);
};
export const Convert = {
  /**
   * แปรง Date เป็น String
   * @param value string
   * @param format string
   * @returns Date string
   */
  DateTimeToString: (value: string, format: string = "DD/MM/YYYY") => {
    //   moment.locale("en");
    //   let result = null;
    //   if (moment(value).isValid()) {
    //     result = moment(value).format(format);
    //   }
    //   return result;
    return null;
  },
  /**
   * แปรง String เป็น Date
   * @param value string "YYYY-MM-DD"
   * @returns DateTime string
   */
  StringToDateTime: (value: string) => {
    //   moment.locale("en");
    //   let result = null;
    //   const date = moment(value);
    //   if (date.isValid()) {
    //     result = date;
    //   }
    // return result;
    return null;
  },
  StringToStringEmpty: (value: string) => {
    return value ?? "";
  },
  StringToInt: (value: string) => {
    let result = null;
    if (value) {
      result = (value + "").replace(/,/g, "");
    }
    return !isNaN(parseInt(result)) ? parseInt(result) : 0;
  },
  StringToIntOrNull: (value: string) => {
    let result = null;
    if (value) {
      result = (value + "").replace(/,/g, "");
    }
    return !isNaN(parseInt(result)) ? parseInt(result) : null;
  },
  StringToFloat: (value: string) => {
    let result = null;
    if (value) {
      result = (value + "").replace(/,/g, "");
    }
    return !isNaN(parseFloat(result)) ? parseFloat(result) : 0;
  },
  StringToFloatOrNull: (value: string) => {
    let result = null;
    if (value) {
      result = (value + "").replace(/,/g, "");
    }
    return !isNaN(parseFloat(result)) ? parseFloat(result) : null;
  },
  StringToNumber: (value: string) => {
    let result = null;
    if (value) {
      result = (value + "").replace(/,/g, "");
    }
    return !isNaN(Number(result)) ? Number(result) : 0;
  },
  StringToNumberOrNull: (value: string) => {
    let result = null;
    if (value) {
      result = (value + "").replace(/,/g, "");
    }
    return !isNaN(Number(result)) ? Number(result) : null;
  },
  BooleanToString: (value: boolean) => {
    return value ? "1" : "0";
  },
  FormGetValue: (form, sField: string) => {
    return form.getValues(sField) ?? null;
  },
  FormGetValueUnixTime: (form, sField: string) => {
    //   const dValue = form.getValues(sField);
    //   moment.locale("en");
    //   let result = null;
    //   const date = moment(dValue);
    //   if (date.isValid()) {
    //     result = date.valueOf();
    //   }
    //   return result;
    return null;
  },
  HtmlStringToString: (value: string) => {
    const myHTML = new DOMParser().parseFromString(value, "text/html");
    return myHTML.body.textContent || "";
  },
  ArrayToEmpty: (value) => {
    return value ?? [];
  },
  StringToHtmlString: (value: string) => {
    const sHtml =
      value.replace(/<br\s?\/?>/g, "\n").replace(/\s/g, "&nbsp;") ?? "";
    return sHtml;
  },
  DateToTimePicker: (value: string) => {
    const sDate = Convert.DateTimeToString(value, "YYYYMMDDHHmmss");
    return dayjs(sDate);
  },
  // NumberToDigit: (value: number, nDigit: number) => {
  //   const options = {
  //     style: "decimal",
  //     minimumFractionDigits: nDigit,
  //     maximumFractionDigits: nDigit,
  //   };
  //   const nValue = value ?? 0;
  //   const formattedWithOptions = nValue.toLocaleString("en-US", options);
  //   return formattedWithOptions;
  // },
};

export const undefinedOrNull = (
  value,
  mode?: "string" | "number" | "bool" | "dateToString",
  format = "DD/MM/YYYY"
) => {
  if (mode === "string") {
    return value !== undefined ? value + "" : "";
  } else if (mode === "number") {
    return value !== undefined && value !== "" ? +value : null;
  } else if (mode === "bool") {
    return undefinedOrNullBoolean(value);
  } else if (mode === "dateToString") {
    let res = null;
    if (value !== undefined && value !== null && value !== "") {
      res = Convert.DateTimeToString(value, format);
    }
    return res;
  }

  return value ?? null;
};

function undefinedOrNullBoolean(value: any) {
  let res = false;
  if (value !== undefined && value !== "") {
    if ((value + "").toLowerCase() === "true") {
      res = true;
    }
  }
  return res;
}

export const DefaultArrayEmpty = (arrData) => {
  return arrData ?? [];
};

export const DefaultNull = (val) => {
  return val ?? null;
};

export const DefaultNumber = (val) => {
  return val ?? 0;
};

export const DefaultStringEmpty = (val) => {
  return val ?? "";
};

export const ConvertToStringOrNull = (val) => {
  return val ? val.toString() : null;
};

export function formatNumber(num: any, digit: number) {
  if (num != null && num !== "N/A" && num !== "") {
    const numberFormatter = new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: digit,
      maximumFractionDigits: digit,
    });
    let numCommas = numberFormatter.format(num);
    return numCommas;
  } else {
    return num;
  }
}

export const parseFloatCheckValue = (value) => {
  if (value === "" || value === null || value === undefined) {
    return null;
  }

  const floatValue = parseFloat(value);
  //not minus value
  if (isNaN(floatValue) || floatValue < 0) {
    return null;
  }

  return floatValue;
};

export const parseFloatNotZero = (value) => {
  if (value === 0 || value === "" || value === null || value === undefined) {
    return null;
  }

  const floatValue = parseFloat(value);
  //not minus value
  if (isNaN(floatValue) || floatValue < 0) {
    return null;
  }

  return floatValue;
};

export const ParseHtml = (val: string) => {
  return val ? parse(val) : null;
};

export const IsNullOrUndefined = (value) => !value;

export const OnElementFocus = (inputID: string, buttonID: string) => {
  const input = document.getElementById(inputID);
  const button = document.getElementById(buttonID);
  if (input) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        if (button) {
          button.click();
          return false;
        }
      } else if (e.key === "Backspace") return false;
    });
  }
};

export const GetAntiforgeryToken = async () => {
  const baseUrl = GetUrlApi();
  const sPathApi = `${baseUrl}antiforgery/token`;
  const url = new URL(sPathApi, window.location.href);
  const sNewPath = url.origin + url.pathname + url.search;
  const localJwtKey = process.env.NEXT_PUBLIC_APP_JWT_KEY;
  const auth_token =
    secureLocalStorage.getItem(localJwtKey) != null
      ? (secureLocalStorage.getItem(localJwtKey) as string)
      : undefined;
  const config = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: IsNullOrUndefined(auth_token) ? "" : `Bearer ${auth_token}`,
  } as any;
  try {
    const response = await axios.get(sNewPath, {
      withCredentials: true,
      headers: config,
    });

    return {
      isPass: response.status === 200,
      xsrfToken: response.data.token,
    };
  } catch (error) {
    return {
      isPass: false,
      xsrfToken: "",
    };
  }
};

export const GetMenuPermission = async (AxiosFn, FnState, DialogFn) => {
  let sRoute = window.location.pathname.toLocaleLowerCase().toString();
  await AxiosFn.Get(
    ApiAuthentication.GetPermission,
    { sRoute: sRoute },
    (result) => {
      let objData = result.objResult;
      FnState(objData.nPermission === 2);
      if (objData.nPermission === 0) NoPermission(DialogFn);
    }
  );
};

export const NoPermission = (DialogFn) => {
  if (DialogFn) {
    DialogFn.Warning(
      I18n.SetText(`Message.NoPermission`, I18NextNs.labelComponent),
      () => {
        window.location.href = process.env.NEXT_PUBLIC_APP_URL + "Home";
      }
    );
  }
};

export const GetUserAccout = () => {
  let sJwt = SecureStorage.Get(process.env.NEXT_PUBLIC_APP_JWT_KEY);
  let user: IAvatar = {
    sEmpCode: "",
    sFullNameTH: "",
    sEmail: "",
    sPathImgEmp: "",
    sUnitCode: "",
    sUnitAbbr: "",
    sUnitName: "",
    lstGroupAll: [],
    lstUnitAll: [],
    lstMenuHomePageAll: [],
    lstMenuBackEndAll: [],
  };
  if (sJwt) user = jwtDecode(sJwt);
  return user;
  // if (SecureStorage.Get(`${process.env.NEXT_PUBLIC_APP_JWT_KEY}`) != null) return false;
  // const objUser = SecureStorage.Get("UserData") as any;
  // let sGroupLocal = secureLocalStorage.getItem("group-user");
};

export const StmImageLoader = ({ src, width, quality }: any) => {
  // const baseURL = process.env.NEXT_PUBLIC_URL;
  // ${baseURL}
  return `${src}?w=${width}&q=${quality || 75}`;
};


// 
export const ResultAPI = (response: any, onFunction: any, Warning : any, Errors : any) => {
  if (!response) {
    if (onFunction) onFunction(null, null);
    return;
  }
  switch (response.status) {
    case APIStatusCode.OK:
    case APIStatusCode.Warning:
    case APIStatusCode.NonAuthoritativeInformation:
      handleFunctionResponeData(onFunction, response);
      break;
    case APIStatusCode.Duplication:
      handleFunctionResponeData(onFunction, response);
      APIResponDuplicate(response, Warning);
      break;
    case APIStatusCode.Unauthorized:
      Unauthorize(Errors);
      break;
    case APIStatusCode.BadRequest:
    case APIStatusCode.NotFound:
    case APIStatusCode.InternalServerError:
      handleFunctionResponeStatus(onFunction, response);
      APIResponFail(response, Warning);
      break;
    case APIStatusCode.MethodNotAllowed:
      handleFunctionResponeStatus(onFunction, response);
      APIMethodFail(Warning);
      break;
    default:
      if (!response.data) response.data = response;
      handleFunctionResponeStatus(onFunction, response);
      break;
  }
};

const handleFunctionResponeStatus = (onFunction, response) => {
  if (onFunction) onFunction(response.data, response.status);
};

const handleFunctionResponeData = (onFunction, response) => {
  if (onFunction) onFunction(response.data);
};

export const APIResponFail = (response, Warning: any,) => {
  const sMessageRequire = response.data?.sMessage;
  const sMessageTitle = response.data?.title ?? "";
  const sMessage = sMessageRequire ?? sMessageTitle;
  Warning(sMessage);
};

export const APIMethodFail = (Warning: any,) => {
  const sMessage = "405 Method Not Allowed";
  Warning(sMessage);
};

export const Unauthorize = (Errors: any,) => {
	Errors('Please log in again.', () => { 
		SecureStorage.Remove(process.env.NEXT_PUBLIC_APP_JWT_KEY);
		setTimeout(() => {
			window.location.href = '/';
		}, 500);
	});
};

export const APIResponDuplicate = (response, Warning: any,) => {
  const sMessageDup = 'Duplicate';
  const sMessage = response.data?.sMessage ?? sMessageDup;
  Warning(sMessage);
};