import {PostFormDTO, PostPageDTO} from "../../components/post/types";
import {getTokenFromCookies} from "../../components/user/login/functions";
import axios from "axios";
import {catchErrors} from "./common";
import {refreshToken} from "./user";
import {json} from "node:stream/consumers";

export function addPostWithImages(postFormDTO: PostFormDTO, files: File[]) {
    const token = getTokenFromCookies();
    const formData = new FormData();
    files.forEach((file, index) => {
        formData.append(`images`, file);
    });
    formData.append('postFormDTO', new Blob([JSON.stringify(postFormDTO)], {
        type: "application/json"
    }));
    return fetch(process.env.NEXT_PUBLIC_API_URL! + "/api/posts", {
        method: 'POST',
        body: formData,
        headers: {
            "Authorization": "Bearer " + token
        },
    }).then(res => {
            if (!res.ok || res.status !== 200) {
                throw {type: 'WRONG_RESPONSE', status: res.status};
            } else {
                return res;
            }
        }
    )
}

export function getPageablePosts(postPageDTO: PostPageDTO) {
    return axios.post(process.env.NEXT_PUBLIC_API_URL + `/api/posts/pageable`,
        postPageDTO
    ).then((response) => {
        return response;
    }).catch((error) => {
        return catchErrors(error);
    })
}