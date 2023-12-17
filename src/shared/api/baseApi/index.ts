import {baseURL} from "../../constants/api";
import {TConfig} from "../../types/types.ts";

export const checkResponse = (res: Response) => {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`${res.status} - error`)
};

export const request = async (endpoint: string, options?: TConfig) => {
    const res = await fetch(`${baseURL}/${endpoint}`, options);
    return checkResponse(res);
};
