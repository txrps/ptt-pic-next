import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { IBreadcrumb } from "./BreadcrumbsBar";
import "./Breadcrumbs.css";
import { Stack } from "@mui/material";
import { IconComponents } from "../mui-elements";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useBreadcrumbs } from "./useBreadcrumbs";

const BreadcrumbsBar = (props: IBreadcrumb) => {
  const { isFrontEnd, isFrontEndProject, arrBreadcrumbs } = useBreadcrumbs(props);

  return (
    <div
      className={
        isFrontEndProject === true
          ? "div-breadcrumbs-frontend-project"
          : isFrontEnd === true
          ? "div-breadcrumbs-frontend"
          : "div-breadcrumbs"
      }
    >
      <Stack justifyContent={"left"} alignItems={"center"} direction={"row"}>
        <Breadcrumbs
          maxItems={3}
          separator={
            <NavigateNextIcon fontSize="small" style={{ color: "white" }} />
          }
          aria-label="breadcrumb"
        >
          {arrBreadcrumbs.map((item, index) => {
            let sKey = "Breadcrumbs_" + item.nMenuID;
            let sMenuName = item.sMenuName;
            let sRoute = item.sRoute ?? "#";
            let sIcon = item.sIcon;

            let IsLastItem = index === arrBreadcrumbs.length - 1;
            return sRoute !== "#" && !IsLastItem ? (
              <Link key={sKey} href={sRoute} style={{ textDecoration: "none" }}>
                {IconComponents(sIcon)} {sMenuName}
              </Link>
            ) : (
              <Typography key={sKey}>
                {IconComponents(sIcon)} {sMenuName}
              </Typography>
            );
          })}
        </Breadcrumbs>
      </Stack>
    </div>
  );
};
export default BreadcrumbsBar;
