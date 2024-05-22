import React, {useEffect, useRef, useState} from "react";
import {useFormik} from "formik";
import {InputTextField} from "../../../common/atoms/InputTextField";
import DropDownField from "../../../common/atoms/DropDownField";
import {DropDownType, UserDTO} from "../../../common/types";
import {UserUpdateDTO, UserUpdateValidation} from "../types";
import {Toast} from "primereact/toast";
import {getBrands, getModels} from "../../../common/organisms/VehicleFunctions";
import {Button} from "primereact/button";
import {update} from "../../../../lib/api/user";
import ChangePasswordDialog from "../../register/organisms/ChangePasswordDialog";

interface RegisterPageProps {
    user: UserDTO;

    setUpdateData: (val: boolean) => void;
}

const SettingsPage: React.FC<RegisterPageProps> = ({user, setUpdateData}) => {
    const toast = useRef<Toast>(null);
    const [editData, setEditData] = useState<boolean>(false);
    const [changePassword, setChangePassword] = useState<boolean>(false);
    const [vehicleBrandValues, setVehicleBrandValues] = useState<DropDownType[]>([]);
    const [vehicleModelValues, setVehicleModelValues] = useState<DropDownType[]>([]);
    const [selectedVehicleBrand, setSelectedVehicleBrand] = useState<DropDownType | null>(user.vehicleBrand ? {
        name: user.vehicleBrand,
        code: user.vehicleBrand
    } : null);
    const [selectedVehicleModel, setSelectedVehicleModel] = useState<DropDownType | null>(user.vehicleModel ? {
        name: user.vehicleModel,
        code: user.vehicleModel
    } : null);

    const defaultFormikUserData = (): UserUpdateDTO => {
        return {
            email: user.email,
            name: user.name,
            surname: user.surname,
            phoneNumber: user.phoneNumber,
            vehicleBrand: user.vehicleBrand,
            vehicleModel: user.vehicleModel
        }
    }

    const defaultUserData = () => {
        setSelectedVehicleBrand(user.vehicleBrand ? {name: user.vehicleBrand, code: user.vehicleBrand} : null);
        setSelectedVehicleModel(user.vehicleModel ? {name: user.vehicleModel, code: user.vehicleModel} : null);
        return defaultFormikUserData();
    }

    const formik = useFormik<UserUpdateDTO>({
        initialValues: defaultFormikUserData(),
        validationSchema: UserUpdateValidation,
        validateOnChange: false,
        onSubmit: (data) => {
            if (selectedVehicleBrand && !selectedVehicleModel) {
                toast.current?.show({
                    severity: "warn",
                    summary: "Model pojazdu jest wymagany",
                    detail: "Sama marka pojazdu nie jest wystarczająca, wymagany jest model.",
                    life: 8000
                })
            } else if (!checkChangeData(data)) {
                toast.current?.show({
                    severity: "warn",
                    summary: "Nie wprowadzono zmian",
                    detail: "Dane użytkownika nie zostały zmienione.",
                    life: 8000
                })
            } else {
                handleChangeUserData(data);
            }
        }
    });

    useEffect(() => {
        getBrands(toast, setVehicleBrandValues);
    }, []);

    useEffect(() => {
        formik.setFieldValue('vehicleBrand', !selectedVehicleBrand ? null : selectedVehicleBrand.code);
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

    const handleChangeUserData = (data: UserUpdateDTO) => {
        update(data).then((response) => {
            if (response.status !== 201) {
                toast.current?.show({
                    severity: "error",
                    summary: "Wystąpił błąd",
                    detail: "Wystąpił błąd. Spróbuj ponownie za chwilę.",
                    life: 5000
                })
            } else {
                toast.current?.show({
                    severity: "success",
                    summary: "Dane zostały zmienione",
                    detail: "Twoje dane zostały zaktualizowane.",
                    life: 5000
                })
                setUpdateData(true);
                setEditData(false);
            }
        })
    }

    const checkChangeData = (data: UserUpdateDTO) => {
        return data.email !== user.email || data.name !== user.name || data.surname !== user.surname || data.phoneNumber !== user.phoneNumber ||
            data.vehicleBrand !== user.vehicleBrand || data.vehicleModel !== user.vehicleModel;
    }

    const notEditDataFooter = <div className="user-page-footer">
        <Button className="user-form-button" label="Zmień hasło" icon="pi pi-lock" type="button"
                onClick={() => setChangePassword(true)}/>
        <Button className="user-form-button" label="Edytuj dane" icon="pi pi-user-edit" type="button"
                onClick={() => setEditData(true)}/>
    </div>

    const revertUserDataChanges = () => {
        formik.setValues(defaultUserData());
        setEditData(false);
    }

    const editDataFooter = <div className="user-page-footer">
        <Button className="user-form-button cancel-button" label="Anuluj" icon="pi pi-times" type="button"
                onClick={revertUserDataChanges}/>
        <Button className="user-form-button confirm-button" label="Zapisz" icon="pi pi-check" type="submit"/>
    </div>

    return <>
        <Toast ref={toast}/>
        <div className="user-main-div">
            <ChangePasswordDialog toast={toast} showChangePasswordDialog={changePassword}
                                  setShowChangePasswordDialog={setChangePassword}/>
            <h2 style={{textAlign: "center", fontSize: "28px"}}>Twoje dane</h2>
            <form onSubmit={formik.handleSubmit} className="user-form">
                <div className="user-form-div">
                    <InputTextField className="inputTextFieldForm user-input-text-field"
                                    disabled={!editData}
                                    classNameInput="inputTextField"
                                    formik={formik} fieldName={'email'} label={'Adres e-mail*'}/>
                    <InputTextField className="inputTextFieldForm user-input-text-field"
                                    disabled={!editData}
                                    classNameInput="inputTextField"
                                    formik={formik} fieldName={'name'} label={'Imię*'}/>
                    <InputTextField className="inputTextFieldForm user-input-text-field"
                                    disabled={!editData}
                                    classNameInput="inputTextField"
                                    formik={formik} fieldName={'surname'} label={'Nazwisko*'}/>
                    <InputTextField className="inputTextFieldForm user-input-text-field"
                                    disabled={!editData}
                                    classNameInput="inputTextField"
                                    formik={formik} fieldName={'phoneNumber'} label={'Numer telefonu'}/>
                    <DropDownField description="Wybierz pojazd" values={vehicleBrandValues}
                                   disabled={!editData}
                                   selectedValue={selectedVehicleBrand} filter={true}
                                   setSelectedValue={(val) => setSelectedVehicleBrand(val)}/>
                    <DropDownField description="Wybierz model" values={vehicleModelValues}
                                   selectedValue={selectedVehicleModel} filter={true}
                                   setSelectedValue={(val) => setSelectedVehicleModel(val)}
                                   disabled={!selectedVehicleBrand || !editData}/>
                </div>
                <p style={{width: "100%", textAlign: "center"}}>* - pole wymagane</p>
                {!editData && notEditDataFooter}
                {editData && editDataFooter}
            </form>
        </div>
    </>
}

export default SettingsPage;