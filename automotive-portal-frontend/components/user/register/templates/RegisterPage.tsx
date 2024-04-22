import React, {useRef, useState} from "react";
import {useFormik} from "formik";
import {InputTextField} from "../../../common/atoms/InputTextField";
import {Button} from "primereact/button";
import {PasswordTextField} from "../../../common/atoms/PaswordTextField";
import {Toast} from "primereact/toast";
import {UserForm, UserFormValidation} from "../types";
import DropDownField from "../../../common/atoms/DropDownField";
import {DropDownType} from "../../../common/types";
import {useRouter} from "next/router";

const RegisterPage: React.FC = () => {
    const router = useRouter();
    const toast = useRef<Toast>(null);
    const [vehicleValues, setVehicleValues] = useState<DropDownType[]>([{name: "audi", code: "1"}]);
    const [selectedVehicle, setSelectedVehicle] = useState<DropDownType | null>(null)
    const formik = useFormik<UserForm>({
        initialValues: {
            email: "",
            password: "",
            confirmationPassword: "",
            name: "",
            surname: "",
            phoneNumber: "",
            vehicleId: null
        },
        validationSchema: UserFormValidation,
        validateOnChange: false,
        onSubmit: (data) => {
            if (data.password === data.confirmationPassword) {
                handleRegister(data);
            } else {
                formik.setFieldError("confirmationPassword", "Hasła nie są takie same.");
            }
        }
    });

    const handleRegister = (data: UserForm) => {
        console.log(data)
        // login(data).then((response) => {
        //     if (response.status === 401) {
        //         toast.current?.show({
        //             severity: "error",
        //             summary: "Błędne dane uwierzytlniające",
        //             detail: "Wprowadzony login lub hasło są nieprawidłowe.",
        //             life: 5000
        //         })
        //     } else {
        //         toast.current?.show({
        //             severity: "success",
        //             summary: "Zalogowano",
        //             detail: "Zostałeś zalogowany do systemu.",
        //             life: 3000
        //         })
        //         console.log("true")
        //         setRefreshData(true);
        //         saveTokenInCookies(response.data.token);
        //         saveUserEmailInLocalStorage(response.data.email);
        //         setShowDialog(false);
        //     }
        // })
    }

    const chooseVehicle = (value: DropDownType) => {
        formik.setFieldValue('vehicleId', !value ? null : Number(value.code));
        setSelectedVehicle(value);
    }

    const footer = <div className="register-page-footer">
        <Button className="register-form-button cancel-button" label="Wyjdź" icon="pi pi-times" type="button"
                onClick={() => router.push({
                    pathname: "/",
                    query: {showLogin: true}
                })}/>
        <Button className="register-form-button confirm-button" label="Zaloguj" icon="pi pi-check" type="submit"/>
    </div>

    return <>
        <Toast ref={toast}/>
        <div className="register-main-div">
            <h2 style={{textAlign: "center", fontSize: "28px"}}>Załóż konto</h2>
            <form onSubmit={formik.handleSubmit} className="register-form">
                <div className="register-form-div">
                    <InputTextField className="inputTextFieldForm register-input-text-field"
                                    classNameInput="inputTextField"
                                    formik={formik} fieldName={'email'} label={'Adres e-mail*'}/>
                    <InputTextField className="inputTextFieldForm register-input-text-field"
                                    classNameInput="inputTextField"
                                    formik={formik} fieldName={'name'} label={'Imię*'}/>
                    <InputTextField className="inputTextFieldForm register-input-text-field"
                                    classNameInput="inputTextField"
                                    formik={formik} fieldName={'surname'} label={'Nazwisko*'}/>
                    <InputTextField className="inputTextFieldForm register-input-text-field"
                                    classNameInput="inputTextField"
                                    formik={formik} fieldName={'phoneNumber'} label={'Numer telefonu'}/>
                    <DropDownField description="Wybierz pojazd" values={vehicleValues} selectedValue={selectedVehicle}
                                   setSelectedValue={chooseVehicle}/>
                    <PasswordTextField className="inputTextFieldForm register-input-text-field"
                                       classNameInput="inputTextField"
                                       formik={formik} fieldName={'password'} label={'Hasło*'}/>
                    <PasswordTextField className="inputTextFieldForm register-input-text-field"
                                       classNameInput="inputTextField"
                                       formik={formik} fieldName={'confirmationPassword'} label={'Potwierdź hasło*'}/>
                </div>
                <p style={{width: "100%", textAlign: "center"}}>* - pole wymagane</p>
                {footer}
            </form>
        </div>
    </>
}

export default RegisterPage;