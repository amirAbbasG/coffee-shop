import {useState} from 'react';

import Image from "next/image";

import {Badge, IconButton, InputAdornment, TextField} from "@mui/material";
import PersonOutline from "@mui/icons-material/PersonOutline";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Search from "@mui/icons-material/Search";

import {CartDrawer, LoginDrawer, RenderIf, SearchModal} from "@components";
import {useUiContext} from "@contexts/UiContext";
import styles from "./styles/Header.module.css"
import {useRouter} from "next/router";
import Link from "next/link";
import {useAppSelector} from "@hooks/redux-hooks";

const Header = () => {
    // const {isOpenSearch, closeSearch, openSearch} = useUiContext()
    const [isOpenSearch, setIsOpenSearch] = useState(false);
    const [openCart, setOpenCart] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);

    const router = useRouter()
    const cart = useAppSelector(state => state.cart)
    const isLogin = true

    const [text, setText] = useState("");

    const isHome = router.pathname === "/"

    const openSearch = () => {
        setIsOpenSearch(true)
    }

    const handleChange = () => {
        setText("")
        openSearch()
    }


    return (
        <>
            <nav className={styles.topNav} id="top-nav">
                <Link href="/">
                    <Image src="/images/logo.png" alt="logo" width={55} height={55}/>
                </Link>
                <div>
                    <RenderIf isTrue={!isHome}>
                        <IconButton size="large" onClick={openSearch}>
                            <Search className='icon text-primary'/>
                        </IconButton>
                    </RenderIf>

                    <IconButton size="large" onClick={() => setOpenLogin(true)}>
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
                                input: "cursor-text"
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
        </>
    )

};

export default Header;