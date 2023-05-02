import type {AppProps} from 'next/app'

import Head from "next/head";

import {CssBaseline, StyledEngineProvider, ThemeProvider} from "@mui/material";
import {ToastContainer} from "react-toastify";
import {Provider} from "react-redux";

import store from "@store";
import {UiContextProvider} from "@contexts/UiContext";
import {Layout} from "@components";

import theme from "@styles/theme";
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
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <Provider store={store}>

                        <UiContextProvider>
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        </UiContextProvider>
                        <ToastContainer/>
                    </Provider>
                </ThemeProvider>
            </StyledEngineProvider>
        </>
    )
}
