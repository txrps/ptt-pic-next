export const enum Language {
  en = "en-US",
  th = "th-TH",
}

export const enum I18NextNs {
  translation = "translation",
  validation = "validation",
  example = "example",
  caption = "caption",
  labelComponent = "labelComponent",
}

export const SelectionOptions = {
  SINGLE_OPTION: {
    label: "ตัวเลือกเดียว",
    value: "0",
  },
  MULTIPLE_OPTIONS: {
    label: "หลายตัวเลือก",
    value: "1",
  },
  OPEN_TEXT: {
    label: "ข้อความเปิด",
    value: "2",
  },
};

export const RequiredChoice = {
  Required_Field: {
    label: "Required field",
    value: "1",
  },
  Note_Field: {
    label: "หมายเหตุ",
    value: "2",
  },
};

export const APIStatusCode = {
  /**
   * เป็นการตอบสนองแบบมาตรฐานเมื่อคำขอ HTTP ประสบความสำเร็จ โดยการตอบสนองจะขึ้นอยู่กับวิธีที่ใช้ในการส่งคำขอด้วย
   */
  OK: 200,
  /**
   * คำขอได้รับการตอบสนองแล้ว เริ่มสร้างทรัพยากรใหม่ขึ้นมา
   */
  Created: 201,
  /**
   * คำขอได้รับและกำลังประมวลผลอยู่ แต่ยังดำเนินการไม่เสร็จ ท้ายที่สุดแล้วคำขออาจจะดำเนินการต่อจนเสร็จ หรือไม่สำเร็จก็ได้
   */
  Accepted: 202,
  /**
   * Server เป็น Transforming proxy (เช่น มีการใช้ Web accelerator) ที่ได้รับ 200 OK จากต้นฉบับ แต่มีการส่งคืนค่าการตอบสนองแบบที่ได้รับการแก้ไขกลับม
   */
  NonAuthoritativeInformation: 203,
  /**
   * Server ไม่สามารถ หรือไม่ดำเนินการตามคำขอเนื่องจากมีข้อผิดพลาดจากทาง Client (เช่น คำขอผิดรูปแบบ, ขนาดใหญ่เกินไป ฯลฯ)
   */
  BadRequest: 400,
  /**
   * มีความเหมือนกับ 403 Forbidden (หวงห้าม) แต่ 401 Unauthorized จะใช้เฉพาะเมื่อจำเป็นต้องมีการตรวจสอบสิทธิ์ (Authentication) แต่ว่าล้มเหลว หรือยังไม่ได้รับการยืนยัน
   */
  Unauthorized: 401,
  /**
   * นี่เป็นโค้ดยอดฮิตที่แวะเวียนมาให้เห็นหน้าค่าตากันอยู่บ่อย ๆ เวลาที่เรากรอกที่อยู่ URL ผิด หรือที่อยู่เว็บไซต์นั้นไม่มีอยู่จริง รหัสนี้เป็นการบ่งบอกว่าทรัพยากรที่ถูกส่งคำขอไม่มีอยู่บน Server
   */
  NotFound: 404,
  /**
   * หมายความว่าทรัพยากรที่มีอยู่ไม่รองรับกับวิธีการที่คำขอใช้ เช่น ใช้คำขอแบบ PUT กับทรัพยากรที่อ่านได้อย่างเดียว (Read-Only Resource)
   */
  MethodNotAllowed: 405,
  /**
   * ในคำขอมีไฟล์มัลติมีเดียที่ทาง Server ไม่สนับสนุนอยู่ ตัวอย่างเช่น ทาง Client อัปโหลดไฟล์ภาพ svg+xml ขึ้นไป แต่ Server ไม่รองรับไฟล์นามสกุลดังกล่าว
   */
  UnsupportedMediaType: 415,
  /**
   * ข้อความแจ้งเตือนที่มักถูกใช้อยู่เป็นประจำ เมื่ออยู่ในสถานการณ์ที่ไม่คาดคิด และไม่มีข้อความใดที่เหมาะสม
   */
  InternalServerError: 500,
  /**
   * Server ไม่เข้าใจวิธีการที่คำขอส่งเข้ามา หรือขาดความสามารถที่จะทำตามคำขอนั้นได้ มักใช้กับคุณสมบัติที่กำลังจะเพิ่มเข้ามาในอนาคต
   */
  NotImplemented: 501,
  /**
   * Server ที่ทำตัวเป็น Gateway หรือ Proxy ได้รับการตอบสนองที่ไม่ถูกต้องจาก Server ต้นทาง
   */
  BadGateway: 502,
  /**
   * Server ไม่สามารถดำเนินการตามคำขอได้ สาเหตุอาจจะมาจากมีภาระการทำงานหนักเกินกว่าจะรับไหว หรืออยู่ในช่วงบำรุงรักษา ส่วนใหญ่แล้วจะเป็นแค่เพียงชั่วคราว
   */
  ServiceUnavailable: 503,
  /**
   * Server ที่ทำตัวเป็น Gateway หรือ Proxy ไม่ได้รับการตอบสนองภายในเวลาที่กำหนดจาก Server ต้นทาง
   */
  GatewayTimeout: 504,
  /**
   * Warning Data
   */
  Warning: 203,
  /**
   * Success
   */
  Success: 200,
  /**
   * Failed
   */
  Failed: 404,
  /**
   * Confirm data
   */
  Confirm: 202,
  /**
   * Error
   */
  Error: 500,
  /**
   * status Duplication use this status code
   */
  Duplication: 409,
};
export const enum TypeFileBlob {
  sharepath = "octet/stream",
  excel = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  word = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  zip = "application/zip",
  pdf = "application/pdf",
}

export const enum TypeComponent {
  input = "input",
  select = "select",
  switch = "switch",
  datePicker = "datePicker",
  dateRangePicker = "dateRangePicker",
  quaterPicker = "quaterPicker",
  quaterRangePicker = "quaterRangePicker",
  startQuaterPicker = "startQuaterPicker",
  endQuaterPicker = "endQuaterPicker",
  timePicker = "timePicker",
  checkBox = "checkBox",
  radio = "radio",
  textArea = "textArea",
  inputNumber = "inputNumber",
  autoComplete = "autoComplete",
  Upload = "Upload",
  froala = "froala",
}

export const RegularExpression = {
  Number: /^\d+$/,
  NumberScientific: /^-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?$/,
  Th: /^[\u0E00-\u0E7F\s.]+$/,
  ThAndNumber: /^[\u0E00-\u0E7F0-9\s]+$/,
  En: /^[A-Za-z\s]+$/g,
  EnAndNumber: /^[A-Za-z0-9\s]+$/g,
  Email: /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/g,
  Password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/g,
};

export const Extension = {
  Image: ["jpg", "jpeg", "png"],
  ImageGif: ["jpg", "jpeg", "png", "gif"],
  Video: ["mp4"],
  PDF: ["pdf"],
  Document: ["doc", "docx", "xls", "xlsx"],
  Word: ["doc", "docx"],
  Excel: ["xls", "xlsx"],
  PowerPoint: ["pptx", "ppt"],
  Text: ["txt"],
  Email: ["msg"],
  Other: ["rar", "zip"],
  ImagePDF: ["jpg", "jpeg", "png", "gif", "pdf"],
  ImageDocument: ["jpg", "jpeg", "png", "gif", "doc", "docx", "xls", "xlsx", "pptx", "ppt", "pdf",],
  Image_New: ["jpg", "jpeg", "png"],
  IaAttacth: ["jpg", "jpeg", "png", "gif", "pdf", "doc", "docx", "xls", "xlsx", "txt", "pptx", "ppt", "rar", "zip",],
};

