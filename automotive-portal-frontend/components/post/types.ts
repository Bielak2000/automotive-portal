import * as Yup from "yup";
import {LoginData} from "../user/login/types";
import {UserDTO} from "../common/types";

export interface PostFormDTO {
    title: string;
    content: string;
    vehicleBrand: string;
    postType: string | null;
    vehicleModel?: string | null;
}

export interface PostDTO {
    postId: string;
    title: string;
    content: string;
    vehicleBrand: string;
    postType: string | null;
    vehicleModel?: string | null;
    appearanceNumber: number;
    appearanceUserIds: string[];
    userDTO: UserDTO;
    images: string[];
}

export interface PostPageDTO {
    page: number;
    size: number;
    searchValue: string | null;
}

export const PostDataValidation: Yup.SchemaOf<PostFormDTO> = Yup.object().shape({
    title: Yup.string().required("Pole wymagane").max(100, "Tytuł jest za długi"),
    content: Yup.string().nullable().required("Pole wymagane"),//.test('len', 'Tytuł jest za długi', val => val!.length === 5),
    vehicleBrand: Yup.string().nullable().required("Pole wymagane"),
    postType: Yup.string().nullable().required("Pole wymagane"),
    vehicleModel: Yup.string().nullable().notRequired()
});

export function typeTranslate(postType: string | null) {
    switch (postType) {
        case "SELL":
            return "sprzedam";
        case "BUY":
            return "kupię";
        case "QUESTION":
            return "pytanie";
        case "FAULT":
            return "usterka";
        default:
            return "brak";
    }
}

export interface BoostPostDTO {
    postId: string;
    userId: string;
    boost: boolean;
}