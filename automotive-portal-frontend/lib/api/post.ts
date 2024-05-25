import {BoostPostDTO, PostFormDTO, PostPageDTO} from "../../components/post/types";
import {getTokenFromCookies} from "../../components/user/login/functions";
import axios from "axios";
import {catchErrors} from "./common";

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

export function boostPostApi(boostPostDTO: BoostPostDTO) {
    const token = getTokenFromCookies();
    return axios({
        url: process.env.NEXT_PUBLIC_API_URL + '/api/posts/boost',
        method: "put",
        data: boostPostDTO,
        headers: {
            "Authorization": "Bearer " + token
        }
    }).then((response) => {
        return response;
    }).catch((error) => {
        return catchErrors(error);
    })
}

export function getPostById(postId: string) {
    return axios.get(process.env.NEXT_PUBLIC_API_URL + `/api/posts/${postId}`)
        .then((response) => {
            return response;
        }).catch((error) => {
            return catchErrors(error);
        })
}

export function deletePostById(userId: string, postId: string) {
    const token = getTokenFromCookies();
    return axios({
        url: process.env.NEXT_PUBLIC_API_URL + `/api/posts/${userId}/${postId}`,
        method: "delete",
        headers: {
            "Authorization": "Bearer " + token
        }
    }).then((response) => {
        return response;
    }).catch((error) => {
        return catchErrors(error);
    })
}

export function updatePost(postFormDTO: PostFormDTO, files: File[], postId: string) {
    const token = getTokenFromCookies();
    const formData = new FormData();
    files.forEach((file, index) => {
        formData.append(`images`, file);
    });
    formData.append('postFormDTO', new Blob([JSON.stringify(postFormDTO)], {
        type: "application/json"
    }));
    return fetch(process.env.NEXT_PUBLIC_API_URL! + `/api/posts/${postId}`, {
        method: 'PUT',
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