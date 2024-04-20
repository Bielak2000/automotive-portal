import {removeTokenFromCookies} from "../../components/login/functions";

export function catchErrors(error: any) {
    if (error.response.response.status === 401) {
        removeTokenFromCookies();
    }
    return error.response;
}