import {useRouter} from "next/router";

import {
    Menu,
    MenuItem,
    MenuList,
    ListItemText,
    ListItemIcon, Theme,
} from "@mui/material";
import PersonOutline from "@mui/icons-material/PersonOutline";
import Logout from "@mui/icons-material/Logout";
import {AxiosError} from "axios";

import {showError, successMessage} from "@libs/toast";
import {FC} from "react";
import {signOut, useSession} from "next-auth/react";

interface Props {
    onClose: () => void,
    anchorEl: any
}

const ProfileMenu: FC<Props> = ({onClose, anchorEl}) => {
    const open = Boolean(anchorEl);
    const router = useRouter();

    const {data: session} = useSession()
    console.log(session)

    //#region exit account
    const exitAccount = async () => {
        try {
            await signOut()
            onClose();
            // if (router.pathname !== "/") {
            //     await router.push("/");
            // }
            successMessage("از حساب کاربری خود خارج شدید");
        } catch (e) {
            showError(e as AxiosError);
        }
    };
    //#endregion

    const handleClickProfile = () => {
        // router.push("/profile");
        onClose();
    };

    return (
        <Menu
            anchorEl={anchorEl}
            onClose={onClose}
            open={open}
            PaperProps={{
                elevation: 0,
                sx: styles.menu,
            }}
        >
            <MenuList>
                <p className="text-xs text-center px-2 py-3 mx-2 mb-4 rounded-lg text-white bg-secondary">{session?.user?.name}</p>
                <MenuItem sx={{py: ".5rem"}} onClick={handleClickProfile}>
                    <ListItemIcon>
                        <PersonOutline sx={{color: "primary.main"}}/>
                    </ListItemIcon>
                    <ListItemText>مشاهده حساب کاربری</ListItemText>
                </MenuItem>

                <MenuItem sx={{py: ".5rem"}} onClick={exitAccount}>
                    <ListItemIcon>
                        <Logout sx={{color: "error.light"}}/>
                    </ListItemIcon>
                    <ListItemText>خروج</ListItemText>
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default ProfileMenu;

const styles = {
    menu: (theme: Theme) => ({
        overflow: "visible",
        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
        ml: 30,
        "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            left: 45,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
        },
        // [theme.breakpoints.down("lg")]: {
        //     display: "none",
        // },
    }),
};
