"use client";

import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import {StepperProps} from '../../../../hooks/Project/interface';
import { BorderAll } from '@mui/icons-material';



const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
    // background : "#d9d9d9"

  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background:"#18b055",
      // background : "linear-gradient(96deg, #fcb54a 50%, #d9d9d9 50%)", 
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background:"#18b055",
        // background : "linear-gradient(96deg, #fcb54a 50%, #d9d9d9 50%)"
    },
  },
  [`&.${stepConnectorClasses.disabled}`]: {
    [`& .${stepConnectorClasses.line}`]: {

      background : "#d9d9d9"
      // background : "linear-gradient(96deg, #fcb54a 50%, #d9d9d9 50%)", 
        // background : "linear-gradient(96deg, #fcb54a 50%, #d9d9d9 50%)"
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
     background : "#d9d9d9",//"linear-gradient(96deg, #fcb54a 50%, #d9d9d9 50%)",
    // backgroundColor:"#d9d9d9",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
 backgroundColor : "#d9d9d9",
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundColor:"#fcb54a",
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    border: "5px solid #fcb54a",
    outline : "5px solid #ffffff",
    outlineOffset : "-7px"
  }),
  ...(ownerState.completed && {
    backgroundColor:"#18b055",
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;


  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle">
            </div>
      )}
    </ColorlibStepIconRoot>
  );
}

// const arrStep = [{
//     isActive : false,
//     isComplete : true,
//     isDisable : false,
//     sStep : 'Loss & Gain Indentification',
// }
// ,
// {
//     isActive : true,
//     isComplete : false,
//     isDisable : false,
//     sStep : 'PIC Registration',
// },
// {
//     isActive : false,
//     isComplete : false,
//     isDisable : false,
//     sStep : 'PIC Result (Submit)',
// },
// {
//     isActive : false,
//     isComplete : false,
//     isDisable : false,
//     sStep : 'PIC Result (Approve)',
// }
// ] as StepperProps[];

export default function CustomizedSteppers(props) {
  return (
    <Stack sx={{ width: '100%',marginBottom:"1rem",marginTop:"3rem" }} spacing={4}>
  
      <Stepper alternativeLabel activeStep={props.nStepID} connector={<ColorlibConnector />}>
        {props.arrStep ? props.arrStep.map((item) => (
          <Step key={item.sStep}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{item.sStep}</StepLabel>
          </Step>
        )) : null
      }
      </Stepper>
    </Stack>
  );
}
