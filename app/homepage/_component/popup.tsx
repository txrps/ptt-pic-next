"use client";

import React, { useEffect, useRef, useState } from "react";
import { SlClose } from "react-icons/sl";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';

import DialogContent from '@mui/material/DialogContent';

function popup(prop) {
  const {
    popUpData,
    openModal,
    setOpenModal,
  } = prop;

  const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('lg');

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={maxWidth}
      open={openModal}
      onClose={handleCloseModal}
    >
      {popUpData.map((item, index) => {
        let html = <></>;
        if (item.lstFile && item.lstFile.length > 0) {
          item.lstFile.map((item2, index2) => {
            ////console.log("item.lstFile", item2);
            html = <DialogContent key={item.Id} sx={{
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "50% 50%",
              height: "650px",
              backgroundImage: `url(${item2.sFileLink})`
            }}>


              <Box sx={{ textAlign: "right" }}>
                <SlClose
                  style={{
                    fontSize: "30px",
                    cursor: "pointer",
                    color: "#fff",
                    border: "500"
                  }}
                  onClick={() => { setOpenModal(false) }}
                />
              </Box>

            </DialogContent>
          })
        }
        return html;
      })}

    </Dialog>
  )
}

export default popup