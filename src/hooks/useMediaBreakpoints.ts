import {useMediaQuery, useTheme} from "@mui/material";


const UseMediaBreakpoints = () => {
    const {breakpoints} = useTheme();
    const isDownXs = useMediaQuery(breakpoints.down("xs"));
    const isXs = useMediaQuery(breakpoints.between("xs", "sm"));
    const isSm = useMediaQuery(breakpoints.between("sm", "md"));
    const isMd = useMediaQuery(breakpoints.between("md", "lg"));
    const isLg = useMediaQuery(breakpoints.between("lg", "xl"));
    const isXl = useMediaQuery(breakpoints.up("xl"));

    return {  isXs, isSm, isMd, isLg, isXl, isDownXs}

};

export default UseMediaBreakpoints;