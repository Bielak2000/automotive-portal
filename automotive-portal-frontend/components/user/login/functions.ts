import Cookies from "universal-cookie";
import {DropDownType} from "../../common/types";

const cookiesName = 'automotive-portal-token';
const localStorageUserEmail = "automotive-portal-useremail";
const localStorageUserId = "user_id";
const filtersLocalStorage = "ap-filters";

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

export interface FiltersLocalStorage {
    vehicleBrand: DropDownType | null;
    vehicleModel: DropDownType | null;
    postType: DropDownType | null;
}

export function saveFiltersInLocalStorage(filers: FiltersLocalStorage) {
    window.localStorage.setItem(filtersLocalStorage, JSON.stringify(filers));
}

export function getFiltersFromLocalStorage() {
    const filters = window.localStorage.getItem(filtersLocalStorage);
    return  filters !== null ? JSON.parse(filters) as FiltersLocalStorage : null;
}

export function removeFiltersFromLocalStorage() {
    window.localStorage.removeItem(filtersLocalStorage);
}