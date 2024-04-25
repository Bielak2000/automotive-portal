import React, {RefObject} from "react";
import {Dialog} from "primereact/dialog";
import {useFormik} from "formik";
import {InputTextField} from "../../../common/atoms/InputTextField";
import {Button} from "primereact/button";
import {PasswordTextField} from "../../../common/atoms/PaswordTextField";
import {Toast} from "primereact/toast";
import {ChangePasswordDTO, ChangePasswordValidation} from "../../settings/types";
import {changePassword, login} from "../../../../lib/api/user";

type ChangePasswordDialogProps = {
    toast: RefObject<Toast>;
    showChangePasswordDialog: boolean;

    setShowChangePasswordDialog: (val: boolean) => void;
}

const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({
                                                                       toast,
                                                                       showChangePasswordDialog,
                                                                       setShowChangePasswordDialog
                                                                   }) => {
    const formik = useFormik<ChangePasswordDTO>({
        initialValues: {
            oldPassword: "",
            newPassword: "",
            confirmationPassword: ""
        },
        validationSchema: ChangePasswordValidation,
        validateOnChange: false,
        onSubmit: (data) => {
            if (data.newPassword !== data.confirmationPassword) {
                formik.setFieldError("confirmationPassword", "Hasła nie są takie same.");
            } else {
                handleChangePassword(data);
            }
        }
    });

    const handleChangePassword = (data: ChangePasswordDTO) => {
        changePassword(data).then((response) => {
            if (response.status === 400) {
                toast.current?.show({
                    severity: "error",
                    summary: "Błędne dane",
                    detail: "Wprowadzone dane są błędne.",
                    life: 5000
                })
                formik.resetForm();
            } else {
                toast.current?.show({
                    severity: "success",
                    summary: "Dane zostały zmienione",
                    detail: "Twoje hasło zostało zmienione.",
                    life: 5000
                })
                formik.resetForm();
                setShowChangePasswordDialog(false);
            }
        })
    }

    const cancel = () => {
        formik.resetForm();
        setShowChangePasswordDialog(false);
    }

    const footer = <div className="user-page-footer" style={{marginTop: "35px"}}>
        <Button className="user-form-button cancel-button" label="Anuluj" icon="pi pi-times" type="button"
                onClick={cancel}/>
        <Button className="user-form-button confirm-button" label="Zapisz" icon="pi pi-check" type="submit"/>
    </div>

    return <>
        <Toast ref={toast}/>
        <Dialog visible={showChangePasswordDialog} onHide={() => setShowChangePasswordDialog(false)}
                closable={false}
                className="dialog"
                header={"Zmień hasło"} headerClassName="dialogHeader">
            <form onSubmit={formik.handleSubmit}>
                <div style={{maxWidth: "80%"}}>
                    <PasswordTextField className="inputTextFieldForm secondInputTextFieldForm"
                                       classNameInput="inputTextField"
                                       formik={formik} fieldName={'oldPassword'} label={'Stare hasło'}/>
                    <PasswordTextField className="inputTextFieldForm secondInputTextFieldForm"
                                       classNameInput="inputTextField"
                                       formik={formik} fieldName={'newPassword'} label={'Nowe hasło'}/>
                    <PasswordTextField className="inputTextFieldForm secondInputTextFieldForm"
                                       classNameInput="inputTextField"
                                       formik={formik} fieldName={'confirmationPassword'} label={'Potwierdź hasło'}/>
                </div>
                {footer}
            </form>
        </Dialog>
    </>
}

export default ChangePasswordDialog;