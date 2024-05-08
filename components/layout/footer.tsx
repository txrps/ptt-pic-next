import { Box, Divider, Grid, Typography, useMediaQuery } from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';
import { PrivacyTip } from "@mui/icons-material";
const Footer = () => {
    const LayoutWebPC = useMediaQuery('(min-width:1500px)');
    const Layoutipadmini = useMediaQuery('(min-width:768px)');
    const LayoutPhone = useMediaQuery('(min-width:450px)');
    return (
        <div className={LayoutWebPC ? "footer" : "footer-ipad"}>
            <Grid item md={12} xs={12}>
                <Grid container justifyContent={"center"}>
                    <Grid item md={6} sm={6} xs={12}>
                        <div className={Layoutipadmini ? "footer-Contact" : LayoutPhone ? "footer-About" : ""}>
                            <Typography
                                style={{
                                    fontSize: '0.8rem',
                                    fontWeight: 600,
                                    marginTop: "8px",
                                    color: "white",
                                    margin: "1px"
                                }}
                                gutterBottom
                            >
                                About Us
                            </Typography>
                            <Grid item md={12} xs={12}>
                                <Typography
                                    style={{
                                        fontSize: '0.6rem',
                                        fontWeight: 500,
                                        marginTop: "8px",
                                        color: "white",
                                        marginBottom: "1px",
                                    }}
                                >
                                    PTT PUBLIC COMPANY LIMITED
                                </Typography>
                                <Typography
                                    style={{
                                        fontSize: '0.6rem',
                                        marginBottom: "1px",
                                        color: "white"
                                    }}
                                >
                                    555 VIBHAVADI RANGSIT ROAD, CHATUCHAK BAKGKOK 10900 THAILAND
                                </Typography>
                                <Grid container wrap="nowrap" spacing={1}>
                                    <Grid item >
                                        <PrivacyTip style={{ marginTop: "5px", color: "white", fontSize: 15 }} />
                                    </Grid>
                                    <Grid item xs>
                                        <Typography
                                            style={{
                                                cursor: 'pointer',
                                                fontSize: '0.6rem',
                                                fontWeight: 500,
                                                marginTop: "5px",
                                                color: "white"
                                            }}
                                            gutterBottom
                                        >
                                            Privacy Notice
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div >
                    </Grid>
                    {Layoutipadmini ? (
                        <Grid item >
                            <Divider orientation="vertical" style={{ color: "white", backgroundColor: "white", marginTop: "10px", height: LayoutWebPC ? "80px" : "110px" }} />
                        </Grid>
                    ) : (
                        <Grid item >
                            <Divider style={{ color: "white", backgroundColor: "white", marginBottom: "6px", width: "500px" }} />
                        </Grid>
                    )
                    }
                    <Grid item md={5.9} sm={5.9} xs={12}>
                        <div className={LayoutPhone ? "footer-Contact" : ""}>
                            <Typography
                                style={{
                                    fontSize: '0.8rem',
                                    fontWeight: 600,
                                    marginTop: "8px",
                                    color: "white",
                                    margin: "1px"
                                }}
                                gutterBottom
                            >
                                Contact Us
                            </Typography>
                            <Typography
                                style={{
                                    fontSize: '0.6rem',
                                    marginBottom: "1px",
                                    marginTop: "8px",
                                    color: "white"
                                }}
                                gutterBottom
                            >
                               TEERAPAN.R@PTTPLC.COM
                            </Typography>
                            <Typography
                                style={{
                                    fontSize: '0.6rem',
                                    marginBottom: "1px",
                                    color: "white"
                                }}
                                gutterBottom
                            >
                                622-239-9888
                            </Typography>
                            <Grid item xs={3} sm={3.8} md={LayoutWebPC ? 1.5 : 2.8}>
                                <Box
                                    className='footer-crad'
                                >
                                    <Grid container wrap="nowrap" spacing={1}>
                                        <Grid item >
                                            <ErrorIcon style={{ marginTop: "5px", fontSize: 15 }} />
                                        </Grid>
                                        <Grid item xs>
                                            <Typography
                                                style={{
                                                    cursor: 'pointer',
                                                    fontSize: '0.6rem',
                                                    fontWeight: 500,
                                                    marginTop: "5px",
                                                    color: "#4f4f4f"
                                                }}
                                                gutterBottom
                                            >
                                                Contact Us
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                        </div >
                    </Grid>
                </Grid>
            </Grid >
        </div >
    );

}
export default Footer