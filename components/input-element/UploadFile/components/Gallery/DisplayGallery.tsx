import Grid from "@mui/material/Grid";
import ItemCard from "./ItemCard";
import useMediaQuery from '@mui/material/useMediaQuery';

const DisplayGallery = (props: any) => {
  const matches440 = useMediaQuery('(min-width:440px)');
  const { IsopenPopUp, setIsopenPopUp, sPopup, arrFile, SetarrFile, disabled, onDelete, onOpenFile } = props;

  return (
    <Grid container spacing={1} justifyContent="flex-start" alignItems="center">
      {arrFile && arrFile.length > 0
        ?
        <>
          {
            arrFile.map((item, idx) => {
              let sKey = `glr-${idx}`;
              return (
                <Grid key={sKey} item xs={matches440 ? 6 : 12} sm={4} md={3} lg={2}>
                  <ItemCard
                    dtRow={item}
                    arrFile={arrFile}
                    SetarrFile={SetarrFile}
                    sFileName={item.sFileName}
                    sFileType={item.sFileType}
                    sCropFileLink={item.sCropFileLink}
                    IsCompleted={item.IsCompleted}
                    IsProgress={item.IsProgress}
                    sProgress={item.sProgress}
                    sSysFileName={item.sSysFileName}
                    sDescription={item.sDescription}
                    sFileLink={item.sFileLink}
                    disabled={disabled}
                    onDelete={onDelete}
                    onOpenFile={onOpenFile}
                    IsopenPopUp={IsopenPopUp}
                    setIsopenPopUp={setIsopenPopUp}
                    sPopup={sPopup}
                  />
                </Grid>
              )
            })
          }
        </>
        :
        null
      }
    </Grid>
  );
};
export default DisplayGallery;
