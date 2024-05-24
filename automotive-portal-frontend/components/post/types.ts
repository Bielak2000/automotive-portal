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
    userDTO: UserDTO;
    images: string[];
}

export interface PostPageDTO {
    page: number;
    size: number;
}

export const PostDataValidation: Yup.SchemaOf<PostFormDTO> = Yup.object().shape({
    title: Yup.string().required("Pole wymagane").max(100, "Tytuł jest za długi"),
    content: Yup.string().nullable().required("Pole wymagane"),//.test('len', 'Tytuł jest za długi', val => val!.length === 5),
    vehicleBrand: Yup.string().nullable().required("Pole wymagane"),
    postType: Yup.string().nullable().required("Pole wymagane"),
    vehicleModel: Yup.string().nullable().notRequired()
});