import Cookies from "universal-cookie";

const cookiesName = 'automotive-portal-token';
const localStorageUserEmail = "automotive-portal-useremail";

export const saveTokenInCookies = (token: string) => {
    new Cookies().set(cookiesName, token);
}

export const getTokenFromCookies = () => {
    return new Cookies().get(cookiesName);
}

export const removeTokenFromCookies = () => {
    return new Cookies().remove(cookiesName);
}

export const isLogged = () => {
    console.log(getTokenFromCookies() !== undefined)
    return getTokenFromCookies() !== undefined;
}

export const saveUserEmailInLocalStorage = (userId: string) => {
    window.localStorage.setItem(localStorageUserEmail, JSON.stringify(userId));
}

export const getUserEmailFromLocalStorage = () => {
    return window.localStorage.getItem(localStorageUserEmail);
}