import * as Yup from "yup";
import {DropDownType} from "../../common/types";

export type UserForm = {
    name: string;
    password: string;
    confirmationPassword: string;
    surname: string;
    email: string;
    phoneNumber: string | null;
    vehicleBrand: string | null;
    vehicleModel: string | null;
}

// @ts-ignore
export const UserFormValidation: Yup.SchemaOf<UserForm> = Yup.object().shape({
    name: Yup.string().required("Pole wymagane").matches(/^.{3,}$/, "Imię powinno zawierać minimum 3 znaki."),
    surname: Yup.string().required("Pole wymagane").matches(/^.{1,}$/, "Nazwisko powinno zawierać minimum 1 znak"),
    password: Yup.string().required("Pole wymagane").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Hasło nie spełnia wymagań"),
    confirmationPassword: Yup.string().required("Pole wymagane"),
    email: Yup.string().required("Pole wymagane").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Adres e-mail jest niepoprawny."),
    phoneNumber: Yup.string().notRequired().matches(/^[0-9]{9}$/, "Numer kontaktowy jest błędny."),
    vehicleBrand: Yup.string().nullable().notRequired(),
    vehicleModel: Yup.string().nullable().notRequired()
});
