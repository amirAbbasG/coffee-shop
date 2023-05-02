import {FC, useEffect, useState} from 'react';

import Link from "next/link";

import {Button} from "@mui/material";
import cn from "classnames";

import styles from "@styles/ServerError.module.css"

const ServerError: FC = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoaded(true)
        }, 1000)
        return () => {
            setLoaded(false)
        };
    }, []);

    const rootClassname = cn(
        styles.root,
        {
            [styles.loading]: !loaded
        }
    )

    return (
        <div className={rootClassname}>
            <h1 className={styles.code}>500</h1>
            <h2 className={styles.title}>Unexpected Error <b>:(</b></h2>
            <div className={styles.gears}>
                <div className={cn(styles.gear, styles.one)}>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                </div>
                <div className={cn(styles.gear, styles.two)}>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                </div>
                <div className={cn(styles.gear, styles.three)}>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                </div>
                <div className="center">
                    <Link href="/">
                        <Button variant="contained" className="px-10 py-3 bg-primary mx-auto">
                            Go Home
                        </Button>
                    </Link>
                </div>
            </div>

        </div>
    );
};


export default ServerError;