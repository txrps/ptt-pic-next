import { createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import '../styles/globals.css';

const theme = createTheme({
    palette: {
        primary: {
            main: blue[700]
        },
        info: {
            main: "#5bc0de",
            light: "#46b8da",
            dark: "#00a5d6",
        }
    },
    typography: {
        "fontFamily": "Prompt",
        "fontSize": 14,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                ".MuiDataGrid-menuIcon":
                {
                    ".MuiButtonBase-root": {
                        "svg": {
                            color: "white !important",
                        }
                    }
                },

                ".MuiDataGrid-columnHeaders": {
                    backgroundColor: '#00338d',
                    display: "flex"
                },
                ".MuiDataGrid-row.Mui-selected": {
                    backgroundColor: "#bfd4ff3b !important",
                    ".MuiCheckbox-root": {
                        color: "#002484!important",
                    }
                },
                ".MuiDataGrid-columnHeaderTitle": {
                    color: "white !important",
                },
                ".MuiDataGrid-columnHeaderTitleContainer": {
                    ".MuiCheckbox-root": {
                        color: "white !important",
                        ".MuiCheckbox-root > Mui-checked": {
                            color: "white !important",
                        },
                    },
                    ".MuiDataGrid-iconButtonContainer": {
                        ".MuiButtonBase-root": {
                            "svg": {
                                color: "white !important",
                            }
                        }
                    }
                },
                ".MuiDataGrid-columnSeparator": {
                    display: "flex",
                    height: "100%",
                    ".MuiDivider-root": {
                        height: "100%",
                        margin: "0 10px",
                        borderColor: "white",
                        opacity: '0 !important',
                    }
                },
                ".MuiDataGrid-columnHeader, .MuiDataGrid-columnHeader--alignCenter, .MuiDataGrid-columnHeader--sortable": {
                    backgroundColor: '#00338d',
                    border: `1px solid rgba(224, 224, 224, 1)`
                },

                ".MuiDataGrid-root.show-line": {
                    ".MuiDataGrid-row": {
                        ".MuiDataGrid-cell": {
                            position: "relative",
                            "::after": {
                                position: "absolute",
                                content: '""',
                                height: "100%",
                                width: "1px",
                                backgroundColor: "rgba(96, 96, 96, 0.12)",
                                right: "-2px"
                            }
                        }
                    },
                },
                ".MuiDataGrid-footerContainer": {
                    overflow: "auto"
                },
                ".MuiDataGrid-row": {
                    backgroundColor: "#fff",
                    "&:hover": {
                        backgroundColor: "#fff !important",
                        fontWeight: "bold",
                        color: "#393939",
                        ".MuiCheckbox-root": {
                            color: "#002484 !important",
                        }
                    },
                    "&:nth-of-type(even)": {
                        background: "#f6f6f6",
                        "&:hover": {
                            backgroundColor: "#f6f6f6 !important",
                        },
                    },
                },
                "label.MuiInputLabel-shrink": {
                    color: "#060606",
                    top: "0px",
                },
                // ".MuiInputLabel-outlined": {
                //     top: "0px",     //Recheck
                // },
                ".MuiFormHelperText-root": {
                    margin: '3px 0 0 !important',
                },
                // "& .MuiInputBase-root.Mui-disabled": {
                //     backgroundColor: '#d6d6d6 !important',
                //     color: '#4a4a4a !important',
                // },
                // "& .MuiFormLabel-root-MuiInputLabel-root.Mui-disabled": {
                //     color: 'rgb(52 52 52) !important',
                // },
                // "& .MuiInputBase-input-MuiOutlinedInput-input:disabled": {
                //     backgroundColor: '#d6d6d6 !important',
                //     color: '#4a4a4a !important',
                //     boxShadow: 'none',
                // }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: "10px",
                    boxShadow: "rgba(116, 116, 116, 0.189) 0px 5px 15px",
                },
                input: {
                    color: '#363636',
                    backgroundColor: "rgba(255,255,255,0.95)",
                    borderRadius: "10px",
                    padding: "9px 10px",
                    ":disabled": {
                        backgroundColor: '#d6d6d6 !important',
                        color: '#4a4a4a !important',
                        boxShadow: 'none',
                    }
                },
                multiline: {
                    backgroundColor: "rgba(255,255,255,0.95)",
                    padding: 0,
                    input: {
                        padding: "4px",
                    },
                    ":disabled": {
                        backgroundColor: '#d6d6d6 !important',
                        color: '#4a4a4a !important',
                        boxShadow: 'none',
                    }
                }
            }
        },
        
        MuiAutocomplete: {
            styleOverrides: {
                root: {
                    borderRadius: "10px",
                    backgroundColor: "rgba(255,255,255,0.95)",
                },
                input: {
                    color: '#363636',
                    backgroundColor: "rgba(255,255,255,0.95)",
                    borderRadius: "10px",

                    ":disabled": {
                        backgroundColor: '#d6d6d6 !important',
                        color: '#4a4a4a !important',
                        boxShadow: 'none',
                    }
                }
            }
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    borderRadius: "20px",
                    // backgroundColor: "rgba(255,255,255,0.95)",
                },
            }
        },
        MuiButtonBase: {
            styleOverrides: {
                root: {
                    zIndex: 1,
                },
            }
        },
        MuiSelect: {
            styleOverrides: {
                outlined: {
                    backgroundColor: "transparent",
                },
            }
        },
        MuiFormControlLabel: {
            styleOverrides: {
                label: {
                    '&.Mui-disabled': {
                        color: "#000000 !important",
                    },
                },
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    '&.Mui-disabled': {
                        color: "#000000",
                    },
                },
                shrink: {
                    top: "0px",
                }
            }
        },
        MuiFormLabel: {
            styleOverrides: {
                asterisk: {
                    color: "red"
                }
            }
        },
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    color: "#d32f2f",
                    fontWeight: 400,
                    fontSize: ".85rem"
                }
            }
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    width: "42px",
                    height: "42px"
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    marginTop: "0px",
                },
            },
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    minWidth: "41px",
                },
            },
        },
        MuiBreadcrumbs: {
            styleOverrides: {
                separator: {
                    color: "white"
                }
            }
        },
        MuiAccordionSummary: {
            styleOverrides: {
                root: {
                    '&.Mui-expanded': {
                        minHeight: "48px !important",
                    }
                },
                content: {
                    '&.Mui-expanded': {
                        margin: "10px 0 !important",
                    }
                },
            }
        }
    }
});

export default theme;