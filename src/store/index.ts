import {configureStore} from "@reduxjs/toolkit";

import reducer from "./reducers";
import apiMiddleware from "./middlewares/apiMiddleware"


const store = configureStore({
    reducer,
    middleware: [
        apiMiddleware
    ]
})

export type RootState = ReturnType<typeof reducer>
export type AppDispatch = typeof store.dispatch
export default store
