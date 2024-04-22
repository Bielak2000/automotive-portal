import {removeTokenFromCookies} from "../../components/login/functions";

export function catchErrors(error: any) {
    console.log(error)
    if (error.response.status === 401) {
        removeTokenFromCookies();
    }
    return error.response;
}