import {FC} from 'react';
import styles from "@styles/NotFound.module.css"
import Link from "next/link";
import {NextSeo} from "next-seo";

const NotFound: FC = () => {
    return (
        <>
            <NextSeo
                title="404"
                description=""
            />
            <div className={styles.root}>
                <div className={styles.noise}></div>
                <div className={styles.overlay}></div>
                <div className={styles.terminal}>
                    <h1>Error <span className={styles.errorcode}>404</span></h1>
                    <p className={styles.output}>The page you are looking for might have been removed, had its name
                        changed
                        or is
                        temporarily unavailable.</p>
                    <p className={styles.output}>Please try to <Link className={styles.link} href="/">go
                        back</Link> or <Link className={styles.link} href="/">return to the
                        homepage</Link>.
                    </p>
                    <p className={styles.output}>Good luck.</p>
                </div>
            </div>
        </>
    );
};


export default NotFound;