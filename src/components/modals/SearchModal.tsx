import React, {useState, memo, useEffect, FC, KeyboardEvent} from "react";

import {useRouter} from "next/router";

import {Dialog, DialogContent, TextField, InputAdornment, DialogContentText, IconButton} from "@mui/material";
import Search from "@mui/icons-material/Search";
import Close from "@mui/icons-material/Close";

import styles from "./styles/SearchModal.module.css"
import {isEmpty} from "@utils/helpers";
import {LoadingLayout} from "@components";
import {ModalProps} from "@custom-types/props";




const SearchDialog: FC<ModalProps> = ({open, handleClose}) => {
    const router = useRouter()

    const [search, setSearch] = useState({});
    const [isFetching, setIsFetching] = useState(false);
    const [searchText, setSearchText] = useState("");

    const onClose = () => {
        setSearch({})
        handleClose();
    };


    const handleSearchText = async (text: string) => {
        setSearchText(text)
        if (text.length > 2) {
            setIsFetching(true)
            try {
                const data = {}
                setSearch(data)
            } catch (e) {
                console.log(e)
            } finally {
                setIsFetching(false)
            }
        } else {
            setSearch({})
        }
    }


    useEffect(() => {
        router.events.on("routeChangeComplete", onClose)

        return () => {
            router.events.off("routeChangeComplete", onClose)
        }

    }, [router])


    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {

        }
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                className: "absolute max-w-full w-[94%] sm:w-4/5 md:w-3/4 lg:w-1/2 top-20"
            }}
            aria-labelledby="search-modal"
            aria-describedby="search-products"
        >
            <DialogContent>
                <TextField
                    autoFocus={open}
                    margin="dense"
                    fullWidth
                    focused={open}
                    // value={searchText}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => handleSearchText(e.target.value)}
                    className="bg-white rounded-md"
                    variant="standard"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search sx={{mb: "1rem", ml: "1rem"}}/>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="start">
                                <IconButton onClick={handleClose} sx={{mb: "1rem", mr: "1rem"}}>
                                    <Close/>
                                </IconButton>
                            </InputAdornment>
                        ),
                        style: {fontSize: "18px"}
                    }}
                />
                {isEmpty(search) ? (
                    <DialogContentText className={styles.helpText}>
                        عبارت مورد نظر خود را وارد کنید
                    </DialogContentText>
                ) : (
                    <LoadingLayout loaded={!isFetching}>

                    </LoadingLayout>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default memo(SearchDialog);
