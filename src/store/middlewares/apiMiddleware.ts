import {Middleware} from "redux";
import axios from "axios";

import * as actions from "../actions/apiActions";
import {showError} from "@libs/toast";
import {RootState} from "@store";

const apiMiddleware: Middleware<{}, RootState> =
    ({dispatch}) =>
        (next) =>
            async (action) => {
                if (action.type !== actions.apiCallBegan.type) return next(action);

                const {
                    url,
                    method,
                    data,
                    onStart,
                    onSuccess,
                    onError,
                    headers,
                    payloadData,
                    authorization,
                } = action.payload;

                if (onStart) dispatch({type: onStart});

                next(action);

                try {

                    const response = await axios.request({
                        baseURL: process.env.NEXT_PUBLIC_API_URL,
                        url,
                        method,
                        data,
                        headers
                    });

                    if (onSuccess) {
                        // Specific
                        dispatch({
                            type: onSuccess,
                            payload: payloadData
                                ? payloadData
                                : "model" in response?.data
                                    ? response.data?.model
                                    : response?.data,
                        });

                    } else {
                        // General
                        dispatch({
                            type: onSuccess,
                            payload: payloadData
                                ? payloadData
                                : "model" in response?.data
                                    ? response.data?.model
                                    : response?.data,
                        });
                    }
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        if (onError) {
                            // Specific
                            dispatch({type: onError, payload: error?.response?.data?.message});
                        } else {
                            // General
                            dispatch(actions.apiCallFailed(error?.response?.data?.message));
                            showError(error);
                        }
                    }else {
                        showError(error as Error)
                    }
                }
            };

export default apiMiddleware;
