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
import {register} from "../../../../lib/api/user";
import {getBrands, getModels} from "../../../common/organisms/VehicleFunctions";

const RegisterPage: React.FC = () => {
    const router = useRouter();
    const toast = useRef<Toast>(null);
    const [vehicleBrandValues, setVehicleBrandValues] = useState<DropDownType[]>([]);
    const [vehicleModelValues, setVehicleModelValues] = useState<DropDownType[]>([]);
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
            vehicleBrand: null,
            vehicleModel: null
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
        getBrands(toast, setVehicleBrandValues);
    }, []);

    useEffect(() => {
        if (!selectedVehicleBrand) {
            setSelectedVehicleModel(null);
            setVehicleModelValues([]);
        } else {
            getModels(toast, selectedVehicleBrand, setVehicleModelValues);
        }
    }, [selectedVehicleBrand]);

    useEffect(() => {
        formik.setFieldValue('vehicleModel', !selectedVehicleModel ? null : selectedVehicleModel.code);
    }, [selectedVehicleModel]);

    useEffect(() => {
        formik.setFieldValue('vehicleBrand', !selectedVehicleBrand ? null : selectedVehicleBrand.code);
    }, [selectedVehicleBrand]);

    const handleRegister = (data: UserForm) => {
        register(data).then((response) => {
            if (response.status !== 201) {
                toast.current?.show({
                    severity: "error",
                    summary: "Wystąpił błąd",
                    detail: "Wystąpił błąd. Spróbuj ponownie za chwilę.",
                    life: 5000
                })
            } else {
                formik.resetForm();
                router.push({
                    pathname: "/",
                    query: {registered: true}
                })
            }
        })
    }

    const footer = <div className="user-page-footer">
        <Button className="user-form-button cancel-button" label="Wyjdź" icon="pi pi-times" type="button"
                onClick={() => router.push({
                    pathname: "/",
                    query: {showLogin: true}
                })}/>
        <Button className="user-form-button confirm-button" label="Zarejestruj" icon="pi pi-check" type="submit"/>
    </div>

    return <>
        <Toast ref={toast}/>
        <div className="user-main-div">
            <h2 style={{textAlign: "center", fontSize: "28px"}}>Załóż konto</h2>
            <form onSubmit={formik.handleSubmit} className="user-form">
                <div className="user-form-div">
                    <InputTextField className="inputTextFieldForm user-input-text-field"
                                    classNameInput="inputTextField"
                                    formik={formik} fieldName={'email'} label={'Adres e-mail*'}/>
                    <InputTextField className="inputTextFieldForm user-input-text-field"
                                    classNameInput="inputTextField"
                                    formik={formik} fieldName={'name'} label={'Imię*'}/>
                    <InputTextField className="inputTextFieldForm user-input-text-field"
                                    classNameInput="inputTextField"
                                    formik={formik} fieldName={'surname'} label={'Nazwisko*'}/>
                    <InputTextField className="inputTextFieldForm user-input-text-field"
                                    classNameInput="inputTextField"
                                    formik={formik} fieldName={'phoneNumber'} label={'Numer telefonu'}/>
                    <DropDownField description="Wybierz pojazd" values={vehicleBrandValues}
                                   selectedValue={selectedVehicleBrand} filter={true}
                                   setSelectedValue={(val) => setSelectedVehicleBrand(val)}/>
                    <DropDownField description="Wybierz model" values={vehicleModelValues}
                                   selectedValue={selectedVehicleModel} filter={true}
                                   setSelectedValue={(val) => setSelectedVehicleModel(val)}
                                   disabled={!selectedVehicleBrand}/>
                    <PasswordTextField className="inputTextFieldForm user-input-text-field"
                                       classNameInput="inputTextField"
                                       formik={formik} fieldName={'password'} label={'Hasło*'}/>
                    <PasswordTextField className="inputTextFieldForm user-input-text-field"
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