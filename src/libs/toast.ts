import {toast} from "react-toastify";
import axios, {AxiosError} from "axios";

export const successMessage = (message: string) => {
    toast.success(message, {
        position: "top-right",
        style: {
            fontFamily: "irsans",
            direction: "rtl",
        },
    });
};
export const errorMessage = (message: string) => {
    toast.error(message, {
        position: "top-right",
        style: {
            fontFamily: "irsans",
            direction: "rtl",
        },
    });
};

export const showError = (error: Error | AxiosError) => {
    if (axios.isAxiosError(error)) {
        if (error?.response?.data?.message) {
            errorMessage(error.response.data.message);
        }

        if (error?.response?.data?.errors) {
            Object.keys(error?.response?.data?.errors || {}).map((k) => {
                errorMessage(error?.response?.data?.errors[k]);
            });
        }
    }

    console.log(error);
};
