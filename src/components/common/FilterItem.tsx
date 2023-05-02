import {ChangeEvent, FC, memo} from "react";

import {Switch, SwitchProps} from "@mui/material";
import {styled} from "@mui/system";

interface Props {
    title: string,
    onToggle: (e: ChangeEvent<HTMLInputElement>) => void,
    value: boolean,
    defaultChecked?: boolean
}

const FilterItem: FC<Props> = ({title, onToggle, value, defaultChecked = false}) => {

    //#region styled switch
    const MySwitch = styled((props: SwitchProps) => (
        <Switch
            focusVisibleClassName=".Mui-focusVisible"
            disableRipple
            {...props}
        />
    ))(({theme}) => ({
        width: 42,
        height: 26,
        padding: 0,
        "& .MuiSwitch-switchBase": {
            padding: 0,
            margin: 2,
            transitionDuration: "300ms",
            "&.Mui-checked": {
                transform: "translateX(16px)",
                color: "#fff",
                "& + .MuiSwitch-track": {
                    backgroundColor: "primary.light",
                    opacity: 1,
                    border: 0,
                },
                "&.Mui-disabled + .MuiSwitch-track": {
                    opacity: 0.5,
                },
            },
            "&.Mui-focusVisible .MuiSwitch-thumb": {
                color: "#33cf4d",
                border: "6px solid #fff",
            },
            "&.Mui-disabled .MuiSwitch-thumb": {
                color: theme.palette.grey[100],
            },
            "&.Mui-disabled + .MuiSwitch-track": {
                opacity: 0.7,
            },
        },
        "& .MuiSwitch-thumb": {
            boxSizing: "border-box",
            width: 22,
            height: 22,
        },
        "& .MuiSwitch-track": {
            borderRadius: 26 / 2,
            backgroundColor: "#E9E9EA",
            opacity: 1,
            transition: "all 500ms"
        },
    }));

    //#endregion

    return (
        <div className="spacing-row pb-2 border-b border-primary-light">
            <p className=" text-sub">{title}</p>
            <MySwitch defaultChecked={defaultChecked} checked={value} value={value} onChange={onToggle}/>
        </div>
    );
};

export default memo(FilterItem);
