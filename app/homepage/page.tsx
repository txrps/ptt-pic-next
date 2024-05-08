"use client";

import { Grid } from '@mui/material';
import React from 'react';
import "./../../styles/home.css";
import { useHomePage } from './useHomepage';


import { useEffect, useRef, useState } from "react";
import { FnAxios, FnDialog } from "@/lib/useAxios";
import Dialog, { DialogProps } from '@mui/material/Dialog';

import DialogContent from '@mui/material/DialogContent';

import Popup from "./_component/popup";
import axios from 'axios';



export const usePopUpManagement = () => {
  const DialogFn = FnDialog();
  const AxiosFn = FnAxios();

  const [openModal, setOpenModal] = useState(true);
  const [popUpData, setPopUpData] = useState([]);

  const [ipAddress, setIPaddress] = useState();
  const [isShowPopUp, setIsShowPopUp] = useState(false);

  useEffect(() => {
    onGetData();


    GetPublicIP();
  }, []);


  const onGetData = () => {
    const param = {}
    AxiosFn.Get("PopUpEvent/GetDetail", param, (res) => {
      ////console.log("GetDetail", res);
      setPopUpData(res.lstData)
    });
  }

  // const GetPublicIP = async () => {
  //   const result = await axios.get("https://myexternalip.com/json");
  //   if (result?.data && result?.data.ip) {
  //     ///console.log("GetPublicIP", result);
  //     setIPaddress(result.data.ip);

  //     CheckFunction(result.data.ip);
  //   } else {
  //     setIPaddress(result.data);
  //   }
  // };

  const GetPublicIP = async () => {
    fetch('https://myexternalip.com/json')
      .then(response => response.json())
      .then(data => {
        if (data.ip) {
          setIPaddress(data.ip);
          CheckFunction(data.ip);
        } else {
          setIPaddress(data);
        }
      })
      .catch(error => console.error(error));
  };



  const CheckFunction = (item) => {
    const param = {
      sIPAddress: item,
    }
    AxiosFn.Post("PopUpEvent/CheckShowPopup", param, (res) => {
      console.log("CheckShowPopup", res);
      setIsShowPopUp(res);
      if (res) {
        SaveIP(param);
      }
      ////setPopUpData(res.lstData)
    });
  }


  const SaveIP = (param) => {
    AxiosFn.Post("PopUpEvent/SaveIP", param, (res) => {
      console.log("PopUpEvent/SaveIP", res);
    });
  }




  return {
    popUpData,
    openModal,
    setOpenModal,

    isShowPopUp,
  }
}




const MyComponent = () => {

  const {
    arrMenu,
    LayoutWebPC,
    LayoutipadPro,
    LayoutWeb,
    DataMenu
  } = useHomePage();


  const {
    popUpData,
    openModal,
    setOpenModal,

    isShowPopUp,
  } = usePopUpManagement();




  return (
    <>
      <div className={LayoutWebPC ? "div-Back-home" : LayoutWeb ? LayoutipadPro ? "div-Back-home-ipad-pro" : "div-Back-home-ipad-air" : "div-Back-home-ipad"}>
        <Grid container justifyContent={"center"} alignItems={"center"} >
          {arrMenu.map((m) => { return (DataMenu(m)) })}
        </Grid>
      </div>

      {
        isShowPopUp ?
          <Popup
            popUpData={popUpData}
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
          :
          <></>
      }


    </>
  )
};

export default MyComponent;