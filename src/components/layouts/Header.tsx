import {useState, MouseEvent} from 'react';

import Image from "next/image";
import dynamic from "next/dynamic";

import {Badge, IconButton, InputAdornment, TextField} from "@mui/material";
import PersonOutline from "@mui/icons-material/PersonOutline";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Search from "@mui/icons-material/Search";
import {useSession} from "next-auth/react";

import {RenderIf, SearchModal} from "@components";
import styles from "./styles/Header.module.css"
import {useRouter} from "next/router";
import Link from "next/link";
import {useAppSelector} from "@hooks/redux-hooks";
const CartDrawer = dynamic(() => import("@components/modals/CartDrawer"), {
    ssr: false
})
const LoginDrawer = dynamic(() => import("@components/modals/LoginDrawer"), {
    ssr: false
})
const ProfileMenu = dynamic(() => import("@components/modals/ProfileMenu"), {
    ssr: false
})




const Header = () => {
    const {data: session} = useSession()
    const [isOpenSearch, setIsOpenSearch] = useState(false);
    const [openCart, setOpenCart] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(null);

    const router = useRouter()
    const cart = useAppSelector(state => state.cart)

    const [text, setText] = useState("");

    const isHome = router.pathname === "/"

    const openSearch = () => {
        setIsOpenSearch(true)
    }

    const handleChange = () => {
        setText("")
        openSearch()
    }

    const handlePressAccount = (event: MouseEvent<HTMLButtonElement>) => {
        if (session) {
            setProfileAnchorEl(event.currentTarget);
        } else {
            setOpenLogin(true)
        }
    }


    return (
        <>
            <nav className={styles.topNav} id="top-nav">
                <Link href="/">
                    <Image src="/images/icons/logo.png" alt="logo" width={50} height={50}/>
                </Link>
                <div>
                    <RenderIf isTrue={!isHome}>
                        <IconButton size="large" onClick={openSearch}>
                            <Search className='icon text-primary'/>
                        </IconButton>
                    </RenderIf>

                    <IconButton size="large" onClick={handlePressAccount}>
                        <PersonOutline className='icon text-primary'/>
                    </IconButton>

                    <IconButton size="large" onClick={() => setOpenCart(true)}>
                        <Badge color="secondary" badgeContent={cart.totalCount}>
                            <LocalMallIcon sx={{color: "secondary.dark"}} className='icon'/>
                        </Badge>
                    </IconButton>
                </div>
            </nav>

            <RenderIf isTrue={isHome}>

                <nav className="flex">
                    <TextField
                        className={styles.textFiled}
                        onClick={openSearch}
                        value={text}
                        onChange={handleChange}
                        placeholder="جستجو در منوی کافی شاپ"
                        disabled
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search className="font-bold text-3xl text-primary"/>
                                </InputAdornment>
                            ),
                            className: "bg-white",
                            classes: {
                                input: "cursor-text",
                            },
                            sx: {
                                "& > fieldset > legend": {
                                    height: ".6rem"
                                }
                            }
                        }
                        }
                    />
                </nav>
            </RenderIf>

            <RenderIf isTrue={isOpenSearch}>
                <SearchModal open={isOpenSearch} handleClose={() => setIsOpenSearch(false)}/>
            </RenderIf>

            <CartDrawer open={openCart} handleClose={() => setOpenCart(false)}/>
            <LoginDrawer open={openLogin} handleClose={() => setOpenLogin(false)}/>
            <ProfileMenu anchorEl={profileAnchorEl} onClose={() => setProfileAnchorEl(null)}/>
        </>
    )

};

export default Header;