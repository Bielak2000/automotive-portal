import {removeTokenFromCookies} from "../../components/user/login/functions";

export function catchErrors(error: any) {
    console.log(error)
    if (error.response.status === 401) {
        removeTokenFromCookies();
        window.location.replace("/?state=tokenexpiration");
    }
    return error.response;
}