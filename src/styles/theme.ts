import {createTheme, responsiveFontSizes} from "@mui/material/styles";
import resolveConfig from "tailwindcss/resolveConfig"

const tailwindConfig = require("../../tailwind.config")

const {theme: {colors}} = resolveConfig(tailwindConfig)
export const {primary, secondary, gray} = colors
const rootElement = () => document.getElementById("__next");

let theme = createTheme({
    direction: "rtl",
    breakpoints: {
        values: {
            xs: 495,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
        },
    },
    palette: {
        primary: {
            light: primary.light,
            main: primary.DEFAULT,
            dark: primary.dark,
        },
        secondary: {
            light: secondary.light,
            main: secondary.DEFAULT,
            dark: secondary.dark,
        },
        grey: gray,
        divider: "#808080",
        action: {
            hover: "rgba(0, 0, 0, 0.075)",
        },
        background: {
            default: "#F8F8F8",
            paper: "#FFFFFF",
        },
        text: {
            primary: "#000000",
            secondary: "#FCFCFC",
            disabled: "#212529",
        },
    },
    spacing: 1,
    shape: {
        borderRadius: 10,
    },

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontSize: "12px",
                    margin: 3,
                    padding: "7px 11px",
                    borderRadius: "10px",
                },
                startIcon: {
                    marginLeft: 4,
                    marginRight: 0,
                },
                endIcon: {
                    marginRight: 4,
                    marginLeft: 0,
                },
            },
        },
        MuiAccordion: {
            styleOverrides: {
                root: {
                    "&::before": {
                        display: "none",
                    },
                },
            },
        },
        MuiPopover: {
            defaultProps: {
                container: rootElement,
            },
        },

        MuiPopper: {
            defaultProps: {
                container: rootElement,
            },
        },

        MuiDrawer: {
            defaultProps: {
                container: rootElement,
            },
        },

        MuiModal: {
            defaultProps: {
                container: rootElement,
            },
        },
        MuiDialog: {
            defaultProps: {
                container: rootElement,
            },
        },

        MuiTabs: {
            styleOverrides: {
                indicator: {
                    backgroundColor: primary.DEFAULT
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "& > fieldset > legend": {
                        textAlign: "right",
                        fontSize: ".75rem",
                        height: "1rem"
                    }
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: "#808080",
                    left: "unset",
                    right: "1.75rem",
                    transformOrigin: "right",
                    fontSize: "1rem",
                },
                asterisk: {
                    color: "red"
                },
            },
        },
        // MuiInputBase: {
        //   styleOverrides: {
        //     root: {
        //       "&.Mui-focused": {
        //         "&:after": {borderBottomColor: '#148D8D !important'}
        //       }
        //     }
        //   }
        // },

    },

    typography: {
        fontFamily: "irsans",
        body1: {
            fontSize: "0.889rem",
        },
        subtitle1: {
            fontSize: "0.79rem",
        },
        subtitle2: {
            fontSize: "0.702rem",
        },
        h6: {
            fontSize: "1.125rem",
        },
        h5: {
            fontSize: "1.266rem",
        },
        h4: {
            fontSize: "1.424rem",
        },
        h3: {
            fontSize: "1.602rem",
        },
        h2: {
            fontSize: "1.802rem",
        },
        h1: {
            fontSize: "1.9rem",
        },
    },
});

theme.shadows[1] =
    "0 1px 3px 0 rgba(0, 0, 0, 0.07), 0 1px 3px 0 rgba(0, 0, 0, 0.07)";
theme.shadows[2] =
    "0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.12)";
theme.shadows[3] =
    " 0 3px 6px 0 rgba(0, 0, 0, 0.15), 0 3px 6px 0 rgba(0, 0, 0, 0.15)";

export default responsiveFontSizes(theme);
