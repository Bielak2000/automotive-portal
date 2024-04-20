import {LoginData} from "../../components/login/types";
import axios from "axios";
import {catchErrors} from "./common";
import {getTokenFromCookies} from "../../components/login/functions";

export const login = (loginData: LoginData) => {
    return axios({
        url: process.env.NEXT_PUBLIC_API_URL + '/auth/login',
        method: "post",
        data: loginData
    }).then((response) => {
        return response;
    }).catch((error) => {
        return catchErrors(error);
    })
}

export const logout = () => {
    const token = getTokenFromCookies();
    return axios({
        url: process.env.NEXT_PUBLIC_API_URL + '/logout',
        headers: {
            "Authorization": "Bearer " + token
        },
        method: "post"
    }).then((response) => {
        return response;
    }).catch((error) => {
        return catchErrors(error);
    })
}

export const refreshToken = () => {
    const token = getTokenFromCookies();
    return axios({
        url: process.env.NEXT_PUBLIC_API_URL + `/auth/refresh`,
        headers: {
            "Authorization": "Bearer " + token
        },
        method: "post"
    }).then((response) => {
        return response;
    }).catch((error) => {
        return catchErrors(error);
    })
}


export const getUserByEmail = (token: string) => {
    refreshToken();
    return axios({
        url: process.env.NEXT_PUBLIC_API_URL + `/api/users/details`,
        headers: {
            "Authorization": "Bearer " + token
        }
    }).then((response) => {
        return response;
    }).catch((error) => {
        return catchErrors(error);
    })
}