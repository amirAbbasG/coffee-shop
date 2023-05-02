import axios from "axios";


export type FetcherParams = {
    url: string,
    method?: "POST" | "GET" | "PUT" | "DELETE" | "PATCH",
    data?: any,
    headers?: { [key: string]: string },
    authorization?: boolean,
}

const fetchApi = async <T>({url, method = "GET", data = null, headers = {}}: FetcherParams) => {
    // const token = await SecureStore.getItemAsync("token");
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL!

    const axiosInstance = axios.create({
        baseURL,
        headers: {
            "Content-Type": "application/json",
        },
    });

    return await axiosInstance.request<T>({
        baseURL,
        url,
        method,
        data,
        headers,
    });
}

export default fetchApi