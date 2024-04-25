import {LoginData} from "../../components/user/login/types";
import axios from "axios";
import {catchErrors} from "./common";
import {getTokenFromCookies} from "../../components/user/login/functions";
import {UserForm} from "../../components/user/register/types";
import {ChangePasswordDTO, UserUpdateDTO} from "../../components/user/settings/types";

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

export const register = (UserData: UserForm) => {
    return axios({
        url: process.env.NEXT_PUBLIC_API_URL + '/api/users/register',
        method: "post",
        data: UserData
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

export const update = (UserData: UserUpdateDTO) => {
    const token = getTokenFromCookies();
    return axios({
        url: process.env.NEXT_PUBLIC_API_URL + '/api/users',
        method: "put",
        data: UserData,
        headers: {
            "Authorization": "Bearer " + token
        }
    }).then((response) => {
        return response;
    }).catch((error) => {
        return catchErrors(error);
    })
}

export const changePassword = (data: ChangePasswordDTO) => {
    const token = getTokenFromCookies();
    return axios({
        url: process.env.NEXT_PUBLIC_API_URL + '/api/users/change-password',
        method: "put",
        data: data,
        headers: {
            "Authorization": "Bearer " + token
        }
    }).then((response) => {
        return response;
    }).catch((error) => {
        return catchErrors(error);
    })
}