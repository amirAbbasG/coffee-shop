import {FC} from "react";

import cn from "classnames";

import {ChildrenProps} from "@custom-types/props";
import {IranSans} from "@public/fonts";
import styles from "./styles/Layout.module.css"
import Header from "./Header";
import Footer from "./Footer";
import {useRouter} from "next/router";
import {RenderIf} from "@components";
import dynamic from "next/dynamic";

const AddCommentDialog = dynamic(() => import("@components/modals/AddCommentDialog"), {
    ssr: false
})


const Layout: FC<ChildrenProps> = ({children}) => {
    const router = useRouter()

    return (
        <div className="min-h-screen flex flex-col">
            <Header/>
            <main className={cn(IranSans.className, styles.main)}>
                {children}
            </main>
            <Footer/>
            <RenderIf isTrue={router.pathname.includes("/item")}>
                <div className="h-20"/>
            </RenderIf>
            <AddCommentDialog/>
        </div>
    );
};

export default Layout;