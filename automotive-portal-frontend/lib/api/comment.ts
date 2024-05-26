import {CommentFormDTO} from "../../components/post/types";
import {getTokenFromCookies} from "../../components/user/login/functions";

export function addCommentApi(commentFormDTO: CommentFormDTO, file: File | null) {
    const token = getTokenFromCookies();
    const formData = new FormData();
    if (file !== null) {
        formData.append("image", file);
    }
    formData.append('commentFormDTO', new Blob([JSON.stringify(commentFormDTO)], {
        type: "application/json"
    }));
    return fetch(process.env.NEXT_PUBLIC_API_URL! + "/api/comments", {
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