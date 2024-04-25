import React, {useRef} from "react";
import {Dialog} from "primereact/dialog";
import {useFormik} from "formik";
import {LoginData, LoginDataValidation} from "../types";
import {InputTextField} from "../../../common/atoms/InputTextField";
import {Button} from "primereact/button";
import Link from "next/link";
import {login} from "../../../../lib/api/user";
import {PasswordTextField} from "../../../common/atoms/PaswordTextField";
import {Toast} from "primereact/toast";
import {saveTokenInCookies, saveUserEmailInLocalStorage} from "../functions";

type LoginDialogProps = {
    showDialog: boolean;

    setShowDialog: (val: boolean) => void;
    setRefreshData: (val: boolean) => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({showDialog, setShowDialog, setRefreshData}) => {
    const toast = useRef<Toast>(null);
    const formik = useFormik<LoginData>({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: LoginDataValidation,
        validateOnChange: false,
        onSubmit: (data) => {
            handleLogin(data);
            formik.resetForm();
        }
    });

    const handleLogin = (data: LoginData) => {
        login(data).then((response) => {
            if (response.status === 401) {
                toast.current?.show({
                    severity: "error",
                    summary: "Błędne dane uwierzytelniające",
                    detail: "Wprowadzony login lub hasło są nieprawidłowe.",
                    life: 5000
                })
            } else {
                toast.current?.show({
                    severity: "success",
                    summary: "Zalogowano",
                    detail: "Zostałeś zalogowany do systemu.",
                    life: 3000
                })
                setRefreshData(true);
                saveTokenInCookies(response.data.token);
                saveUserEmailInLocalStorage(response.data.email);
                setShowDialog(false);
            }
        })
    }

    const footer = <div className="dialog-footer-div">
        <Button label="Zaloguj" icon="pi pi-sign-in" type="submit"/>
        <div className="login-dialog-footer">
            <Link className="linkStyle" href="/">Zapomniałeś hasła?</Link>
            <Link className="linkStyle" style={{marginTop: "5px"}} href="/rejestracja">Nie masz jeszcze konta?</Link>
        </div>
    </div>

    return <>
        <Toast ref={toast}/>
        <Dialog visible={showDialog} onHide={() => setShowDialog(false)}
                className="dialog"
                style={{maxWidth: "80%"}}
                header={"Zaloguj się"} headerClassName="dialogHeader">
            <form onSubmit={formik.handleSubmit}>
                <div style={{marginTop: "5px"}}>
                    <InputTextField className="inputTextFieldForm" classNameInput="inputTextField"
                                    formik={formik} fieldName={'email'} label={'Adres e-mail'}/>
                    <PasswordTextField className="inputTextFieldForm secondInputTextFieldForm"
                                       classNameInput="inputTextField"
                                       formik={formik} fieldName={'password'} label={'Hasło'}/>
                </div>
                {footer}
            </form>
        </Dialog>
    </>
}

export default LoginDialog;