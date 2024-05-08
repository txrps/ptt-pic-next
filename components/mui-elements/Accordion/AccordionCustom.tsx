import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowDropDown, AddCircleOutline, Remove } from "@mui/icons-material";
import Grid from '@mui/material/Grid';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import Skeleton from '@mui/material/Skeleton';
interface IAccordionProps {
  children: React.ReactNode;
  header?: string;
  subheader? : string;
  color?: string;
  expandIconColor?: string;
  bgColor?: string;
  background?: string;
  isExpanded?: boolean;
  borderRadius?: string;
  boxShadowHead?: string;
  boxShadowDetail?: string;
  headerComponent?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  isNotExpand?: boolean;
  trigger?: number;
  isSkeleton? : boolean
}

const AccordionCustom = (props: IAccordionProps) => {
  const {
    children,
    header,
    subheader,
    headerComponent,
    color,
    expandIconColor,
    bgColor,
    background,
    isExpanded,
    borderRadius,
    boxShadowHead,
    boxShadowDetail,
    onClick,
    className,
    isNotExpand,
    trigger,
    isSkeleton
  } = props;

  const [isExpand, setIsExpand] = useState<boolean>(isExpanded);

  const handleChange = useCallback(
    (event, isNotExpand) => {
      if (isNotExpand) {
        event.stopPropagation();
      } else {
        setIsExpand(!isExpand);
      }
    },
    [isExpand]
  );

  useEffect(() => {
    setIsExpand(isExpanded);
  }, [isExpanded]);

  useMemo(() => {
    setIsExpand(isExpanded);
  }, [trigger]);

  return (
    <Accordion onClick={onClick} expanded={isExpand} sx={{width:"100%",marginBottom:"1rem"}}>
      <AccordionSummary

        expandIcon={
          !isNotExpand ? (
            !isExpand ? <AddCircleOutline
              style={{
                fontSize: "2.5rem",
                color: expandIconColor ?? "#6596f5",
              }}
            />
              : <Remove
                style={{
                  fontSize: "2.5rem",
                  color: expandIconColor ?? "#6596f5",
                }}
              />
          ) : null
        }
        onClick={(event) => handleChange(event, isNotExpand)}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={className}
        sx={{
          zIndex: "auto",
          fontSize: "25px",
          color: color ?? "#423c3c",
          backgroundColor: bgColor ?? "rgb(102,151,245)",
          background:
            background ??
            "linear-gradient(90deg, rgba(102,151,245,1) 0%, rgba(215,246,249,1) 100%)",
          cursor: isNotExpand ? "default !important" : "pointer !important",
          borderRadius: borderRadius ?? "6px",
          "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
            transform: "rotate(180deg)",
          },
          "& .MuiAccordionSummary-content": {
            marginLeft: "8px",
          },
          alignItems: "center",
          "& .MuiAccordionSummary-expandIconWrapper": {
            margin: "0",
          },
          boxShadow: boxShadowHead ?? "none",
        }}
      >
        {header ? (
          <Grid container direction="row"
          justifyContent="flex-start"
          alignItems="center">
            {
              isSkeleton ? 
              <Skeleton variant="text" sx={{ fontSize: '25px',width:'100%',marginRight:"10px"  }}/>

              :  <Grid item textAlign={"left"} xs={4}>
              <Typography className="font-medium" align="left" fontSize={"20px"}>{header}</Typography>
            </Grid>
            }
           
            {subheader && !isSkeleton?  <Grid item textAlign={"right"}  xs={8} style={{paddingRight:"10px"}}>
              <Typography className="font-medium" align="right" fontSize={"20px"}>{subheader}</Typography>
            </Grid>
            : null
              
            }
          </Grid>

        ) : (
          headerComponent
        )}
      </AccordionSummary>
      {!isNotExpand && (
        <AccordionDetails
          sx={{
            boxShadow: boxShadowDetail ?? "none",
            borderRadius: borderRadius ?? "0px",
          }}
        >
          {children}
        </AccordionDetails>
      )}
    </Accordion>
  );
};

export default AccordionCustom;
