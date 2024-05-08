import { RegularExpression } from "@/enum/enum";
import { hasValue } from "@/lib";
import { FieldError } from "react-hook-form";




export interface TypeRulesForm {
  disabled: boolean,
  required: boolean,
  isPatternPassword: boolean,
  type: string,
  pattern: TypePattern,
}

export const generateRules = (props) => {
  const { disabled, required, type, pattern, isPatternPassword } = props;  

  if (disabled) { return {} }

  let objvalidate = {
    required: { value: required },
    validate: {
      value: (value) => {
        if (!value) { return true; }
        return hasValue(value)
      }
    }
  };

  switch (type) {
    case "text":
      objvalidate = { ...objvalidate, ...getPatternInputText(pattern) };
      break;
    case "email":
      objvalidate["pattern"] = { value: RegularExpression.Email };
      break;
    case "password":
      if (isPatternPassword) {
        objvalidate["pattern"] = { value: RegularExpression.Password };
      }
      break;
  }
  return objvalidate;
};

type TypePattern = "th" | "th-number"| "en"| "en-number"

export const getPatternInputText = (pattern : TypePattern) => {
  let objvalidate = {};
  switch (pattern) {
    case "th":
      objvalidate["pattern"] = { value: RegularExpression.Th };
      break;
    case "th-number":
      objvalidate["pattern"] = { value: RegularExpression.ThAndNumber };
      break;
    case "en":
      objvalidate["pattern"] = { value: RegularExpression.En };
      break;
    case "en-number":
      objvalidate["pattern"] = { value: RegularExpression.EnAndNumber };
      break;
  }
  return objvalidate;
};

export interface TypeParamProps {
  pattern: string,
  type: string,
  IsShowMessageError: boolean,
  isPatternPassword: boolean,
  label: string,
  min?: number,
  max?: number,
}


export const getMessageValidate = (error: FieldError, props) => {
  const { pattern, label, type, IsShowMessageError, isPatternPassword, min, max } = props;
  if (!(IsShowMessageError && error)) {
    return "";
  }
  let sMessage = "";
  switch (error.type) {
    case "required":
    case "value":
      sMessage = `กรุณาระบุ ${label}`;
      break;
    case "pattern":
      sMessage = genMessagePattern(type, pattern, isPatternPassword, min, max);
      break;
  }
  return sMessage;
};

export const genMessagePattern = (type, pattern, isPatternPassword, min, max) => {
  let message = "";

  switch (type) {
    case "text":
      switch (pattern) {
        case "th":
          message = "ระบุอักขระ ก-ฮ";
          break;
        case "th-number":
          message = "ระบุอักขระ ก-ฮ , 0-9";
          break;
        case "en":
          message = "ระบุอักขระ A-Z";
          break;
        case "en-number":
          message = "ระบุอักขระ A-Z , 0-9";
          break;
      }

      if (min && max) {
        message = `กรุณากรอกค่าระหว่าง ${min} ถึง ${max} `;
      }
      else if (min && !max) {
        message = `กรุณาระบุค่ามากกว่า ${min}`;
      }
      else if (!min && max) {
        message = `กรุณาระบุค่าน้อยกว่า ${max} `;
      }

      if (isPatternPassword) {
        message = "รหัสผ่านต้องมีอักขระอย่างน้อย 8 ตัวและมีรายการต่อไปนี้: ตัวพิมพ์ใหญ่(A-Z), ตัวพิมพ์เล็ก(a-z), ตัวเลข(0-9), สัญลักษณ์(!, @, #, $, %, ^, &, *, (, ), {, }, [, ] )";
      }
      break;
    case "email":
      message = "รูปแบบอีเมลไม่ถูกต้อง";
      break;
    case "password":
      if (isPatternPassword) {
        message = "รหัสผ่านต้องมีอักขระอย่างน้อย 8 ตัวและมีรายการต่อไปนี้: ตัวพิมพ์ใหญ่(A-Z), ตัวพิมพ์เล็ก(a-z), ตัวเลข(0-9), สัญลักษณ์(!, @, #, $, %, ^, &, *, (, ), {, }, [, ] )";
      }
      break;
  }
  return message;
};

export const CheckDisabled = (disabled, readonly, expect, unexpected) => {
  if (disabled && !readonly) {
    return expect;
  } else {
    return unexpected
  }
}