import {FormikErrors, FormikTouched} from "formik/dist/types";
import React from "react";
import {getIn} from "formik";

export type Formik<T> = {
    errors: FormikErrors<T>,
    touched: FormikTouched<T>,
    values: T,
    handleChange: {
        (e: React.ChangeEvent<any>): void;
        <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
    },
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<FormikErrors<T>> | Promise<void>,
    setValues: (values: React.SetStateAction<T>, shouldValidate?: boolean | undefined) => Promise<FormikErrors<T>> | Promise<void>
}

export const isFormFieldInvalid = <T, >(formik: Formik<T>, name: keyof T) => {
    return getIn(formik.errors, name.toString());
}

function buildErrorMsg<T>(errors: FormikErrors<T>, name: keyof T) {
    return <small className="p-error">{getIn(errors, name.toString())}</small>;
}

export const getFormErrorMessage = <T, >(formik: Formik<T>, name: keyof T) => {
    return isFormFieldInvalid(formik, name) && buildErrorMsg(formik.errors, name);
};
