import * as Yup from "yup";

export interface LoginData {
    email: string;
    password: string;
}

export const LoginDataValidation: Yup.SchemaOf<LoginData> = Yup.object().shape({
    email: Yup.string().nullable().required("Pole wymagane"),
    password: Yup.string().nullable().required("Pole wymagane"),
});
