import Cookies from "universal-cookie";

const cookiesName = 'automotive-portal-token';
const localStorageUserEmail = "automotive-portal-useremail";
const localStorageUserId = "user_id";

export const saveTokenInCookies = (token: string) => {
    new Cookies().set(cookiesName, token);
}

export const getTokenFromCookies = () => {
    return new Cookies().get(cookiesName);
}

export const removeTokenFromCookies = () => {
    return new Cookies().remove(cookiesName);
}

export const saveUserEmailInLocalStorage = (userId: string) => {
    window.localStorage.setItem(localStorageUserEmail, JSON.stringify(userId));
}

export const getUserEmailFromLocalStorage = () => {
    return window.localStorage.getItem(localStorageUserEmail);
}

export const removeUserEmailFromLocalStorage = () => {
    window.localStorage.removeItem(localStorageUserEmail);
}

export const saveUserIdInLocalStorage = (userId: string) => {
    window.localStorage.setItem(localStorageUserId, JSON.stringify(userId));
}

export const getUserIdFromLocalStorage = () => {
    return window.localStorage.getItem(localStorageUserId);
}

export const removeUserIdFromLocalStorage = () => {
    window.localStorage.removeItem(localStorageUserId);
}