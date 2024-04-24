import React, {useEffect, useRef, useState} from "react";
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
    const [vehicleBrandValues, setVehicleBrandValues] = useState<DropDownType[]>([{name: "audi", code: "audi"}]);
    const [vehicleModelValues, setVehicleModelValues] = useState<DropDownType[]>([{name: "a5", code: "1"}]);
    const [selectedVehicleBrand, setSelectedVehicleBrand] = useState<DropDownType | null>(null);
    const [selectedVehicleModel, setSelectedVehicleModel] = useState<DropDownType | null>(null);
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
            if (selectedVehicleBrand && !selectedVehicleModel) {
                toast.current?.show({
                    severity: "error",
                    summary: "Model pojazdu jest wymagany",
                    detail: "Sama marka pojazdu nie jest wystarczająca, wymagany jest model.",
                    life: 8000
                })
            } else if (data.password === data.confirmationPassword) {
                handleRegister(data);
            } else {
                formik.setFieldError("confirmationPassword", "Hasła nie są takie same.");
            }
        }
    });

    useEffect(() => {
        if (!selectedVehicleBrand) {
            setSelectedVehicleModel(null);
        }
    }, [selectedVehicleBrand]);

    useEffect(() => {
        formik.setFieldValue('vehicleId', !selectedVehicleModel ? null : Number(selectedVehicleModel.code));
    }, [selectedVehicleModel]);

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

    const chooseVehicleBrand = (value: DropDownType) => {
        setSelectedVehicleBrand(value);
    }

    const chooseVehicleModel = (value: DropDownType) => {
        setSelectedVehicleModel(value);
    }

    const footer = <div className="register-page-footer">
        <Button className="register-form-button cancel-button" label="Wyjdź" icon="pi pi-times" type="button"
                onClick={() => router.push({
                    pathname: "/",
                    query: {showLogin: true}
                })}/>
        <Button className="register-form-button confirm-button" label="Zarejestruj" icon="pi pi-check" type="submit"/>
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
                    <DropDownField description="Wybierz pojazd" values={vehicleBrandValues}
                                   selectedValue={selectedVehicleBrand}
                                   setSelectedValue={chooseVehicleBrand}/>
                    <DropDownField description="Wybierz model" values={vehicleModelValues}
                                   selectedValue={selectedVehicleModel}
                                   setSelectedValue={chooseVehicleModel}
                                   disabled={!selectedVehicleBrand}/>
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