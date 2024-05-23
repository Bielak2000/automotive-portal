import {PostFormDTO} from "../../components/post/types";
import {getTokenFromCookies} from "../../components/user/login/functions";

export function addPostWithImages(postFormDTO: PostFormDTO, files: File[]) {
    const token = getTokenFromCookies();
    const formData = new FormData();

    console.log(files)

    // @ts-ignore
    files.forEach((file, index) => {
        formData.append(`images[${index}]`, file);
    });
    formData.append('postFormDTO', new Blob([JSON.stringify(postFormDTO)], {
        type: "application/json"
    }));

    console.log(formData.get("images[0]"))
    // @ts-ignore
    return fetch(process.env.NEXT_PUBLIC_API_URL! + "/api/posts", {
        method: 'POST',
        body: formData,
        headers: {
            "Authorization": "Bearer " + token
        },
    }).then(res => {
        console.log(res)
            if (!res.ok || res.status!==200) {
                throw {type: 'WRONG_RESPONSE', status: res.status};
            } else {
                return res;
            }
        }
    )
}