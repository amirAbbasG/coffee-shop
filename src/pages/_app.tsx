import type {AppProps} from 'next/app'

import Head from "next/head";

import {CssBaseline, StyledEngineProvider, ThemeProvider} from "@mui/material";
import {ToastContainer} from "react-toastify";
import {Provider} from "react-redux";
import {SessionProvider} from "next-auth/react";
import {DefaultSeo} from "next-seo";
import NextNProgress from "nextjs-progressbar";

import store from "@store";
import {UiContextProvider} from "@contexts/UiContext";
import {Layout} from "@components";
import seoConfig from "../../next-seo.config"

import theme, {primary} from "@styles/theme";
import "react-toastify/dist/ReactToastify.css"
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/bundle";
import '@styles/globals.css'


export default function App({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
            </Head>
            <NextNProgress color={primary.DEFAULT}/>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <SessionProvider session={pageProps.session}>
                        <Provider store={store}>
                            <UiContextProvider>
                                <DefaultSeo {...seoConfig}/>
                                <Layout>
                                    <Component {...pageProps} />
                                </Layout>
                            </UiContextProvider>
                            <ToastContainer/>
                        </Provider>
                    </SessionProvider>
                </ThemeProvider>
            </StyledEngineProvider>
        </>
    )
}
