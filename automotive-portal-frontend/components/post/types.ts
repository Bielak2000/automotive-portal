import * as Yup from "yup";
import {UserDTO} from "../common/types";
import {UUID} from "node:crypto";

export interface PostFormDTO {
    title: string;
    content: string;
    vehicleBrand: string;
    postType: string | null;
    vehicleModel?: string | null;
}

export interface CommentDTO {
    id: string;
    userId: string;
    content: string;
    imageUrl: null;
    userName: string;
    userLastName: string;
    createdAt: Date;
}

export interface CommentFormDTO {
    content: string;
    userId: string;
    postId: string;
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
    modifiedAt: Date;
    comments: CommentDTO[];
}

export interface PostPageDTO {
    page: number;
    size: number;
    searchValue: string | null;
    sortByAppearanceNumber: boolean;
    userId: string | null;
    vehicleBrand: string | null;
    vehicleModel: string | null;
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