export interface ApiCallAction {
    url: string,
    method: "POST" | "GET" | "PUT" | "DELETE" | "PATCH",
    data: any,
    onStart?: string,
    onSuccess?: string,
    onError?: string,
    headers?: {[key: string]: string},
    payloadData?: any,
    authorization?: boolean,
}