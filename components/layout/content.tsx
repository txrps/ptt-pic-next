"use client";

import { Grid, useMediaQuery } from "@mui/material";
import React from "react";
import pictest1 from "@/public/assets/images/logo/pic-home1.png";
import pictest2 from "@/public/assets/images/logo/pic-home2.png";
import pictest3 from "@/public/assets/images/logo/pic-home3.png";
import pictest4 from "@/public/assets/images/logo/pic-home4.png";
import pictest5 from "@/public/assets/images/logo/pic-home5.png";
import Image from "next/image";
import Link from "next/link";
const Content = (props) => {
  const arrMenu = [
    {
      key: 1,
      sMenuName: "จดทะเบียนและรายงานผล",
      title: "บันทึกข้อมูลโครงการเข้าระบบและรายงานผลความคืบหน้า",
      sRoute: "MyComponent1",
      img: pictest1,
    },
    {
      key: 2,
      sMenuName: "อนุมัติ PIC",
      title: "ตรวจสอบรายการและพิจารณาผลการอนุมัติข้อมูล",
      sRoute: "Menu2",
      img: pictest2,
    },
    {
      key: 3,
      sMenuName: "Innovation Committee",
      title: "ประเมิน Innovation Potential",
      sRoute: "",
      img: pictest3,
    },
    {
      key: 4,
      sMenuName: "Administrator",
      title: "สำหรับผู้ดูแลระบบจัดการข้อมูล",
      sRoute: "",
      img: pictest4,
    },
    {
      key: 5,
      sMenuName: "สมัคร PTT PIC Award",
      title: "ส่งประกวด Award",
      sRoute: "",
      img: pictest5,
    },
  ];
  const LayoutWebPC = useMediaQuery("(min-width:1400px)");
  return (
    <Grid container justifyContent={"center"}>
      {props.children}
    </Grid>
  );
};

export default Content;
