import {BoostPostDTO} from "../../components/post/types";
import {getTokenFromCookies} from "../../components/user/login/functions";
import axios from "axios";
import {catchErrors} from "./common";

export function assignateNotificationRead(notificationId: string) {
    const token = getTokenFromCookies();
    return axios({
        url: process.env.NEXT_PUBLIC_API_URL + `/api/notification/${notificationId}`,
        method: "put",
        headers: {
            "Authorization": "Bearer " + token
        }
    }).then((response) => {
        return response;
    }).catch((error) => {
        return catchErrors(error);
    })
}