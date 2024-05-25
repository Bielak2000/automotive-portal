import {
    removeTokenFromCookies,
    removeUserEmailFromLocalStorage,
    removeUserIdFromLocalStorage
} from "../../components/user/login/functions";

export function catchErrors(error: any) {
    console.log(error)
    if (error.response.status === 401) {
        removeTokenFromCookies();
        removeUserEmailFromLocalStorage();
        removeUserIdFromLocalStorage();
        window.location.replace("/?state=tokenexpiration");
    }
    return error.response;
}