import * as Yup from "yup";
import {LoginData} from "../user/login/types";

export interface PostFormDTO {
    title: string;
    content: string;
    vehicleBrand: string;
    postType: string | null;
    vehicleModel?: string | null;
}

export const PostDataValidation: Yup.SchemaOf<PostFormDTO> = Yup.object().shape({
    title: Yup.string().required("Pole wymagane"),
    content: Yup.string().nullable().required("Pole wymagane"),
    vehicleBrand: Yup.string().nullable().required("Pole wymagane"),
    postType: Yup.string().nullable().required("Pole wymagane"),
    vehicleModel: Yup.string().nullable().notRequired()
});