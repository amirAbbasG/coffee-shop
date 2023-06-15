import {FC} from 'react';

import Link from "next/link";
import Image from "next/image";

import styles from "./styles/Footer.module.css"

const Footer: FC = () => {
    return (
        <footer className="bg-primary pb-8 px-5">

                <div className={styles.root}>

                    <div className={styles.rightBox}>
                        <Image src="/images/logos/logo.png" alt="logo" width={75} height={75}/>

                        <div className={styles.menu}>
                            <Link href="#" className={styles.menuItem}> تماس با ما </Link>
                            <Link href="#" className={styles.menuItem}> درباره ما </Link>
                            <Link href="#" className={styles.menuItem}> حریم خصوصی </Link>
                            <Link href="#" className={styles.menuItem}> قوانین سایت </Link>
                        </div>

                    </div>

                    <div className={styles.leftBox}>

                        <div className={styles.socialMedias}>
                                <a href="#">
                                    <Image src="/images/icons/icon-facebook.svg" alt="" width={30} height={30}/>
                                </a>

                                <a href="#">
                                    <Image src="/images/icons/icon-twitter.svg" alt="" width={30} height={30}/>
                                </a>

                                <a href="#">
                                    <Image src="/images/icons/icon-pinterest.svg" alt="" width={30} height={30}/>
                                </a>

                                <a href="#">
                                    <Image src="/images/icons/icon-instagram.svg" alt="" width={30} height={30}/>
                                </a>
                        </div>

                        <p className="font-bold" style={{direction: 'ltr'}}>
                            &copy; 2022 Coffee Shop. All Rights Reserved
                        </p>

                    </div>

                </div>
        </footer>
    );
};

export default Footer;