import {
    getTokenFromCookies,
    removeTokenFromCookies,
    removeUserEmailFromLocalStorage,
    removeUserIdFromLocalStorage
} from "../../components/user/login/functions";

export function catchErrors(error: any) {
    console.log(error)
    if (error.response.status === 401 && getTokenFromCookies() != null) {
        removeTokenFromCookies();
        removeUserEmailFromLocalStorage();
        removeUserIdFromLocalStorage();
        window.location.replace("/?state=tokenexpiration");
    }
    return error.response;
}