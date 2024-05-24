import React, {PropsWithChildren} from "react";
import {Formik, getFormErrorMessage, isFormFieldInvalid} from "./Formik";
import {BaseField} from "./BaseField";

type FormFieldProps<T> = {
    className?: string,
    formik: Formik<T>,
    fieldName: string & keyof T,
    label: string,
    isFormInvalid?: boolean
}

export const FormField = <T, >(props: PropsWithChildren<FormFieldProps<T>>) => {
    const id = props.fieldName;
    const label = props.label;
    const errorMsg = getFormErrorMessage(props.formik, props.fieldName);
    const isInvalid = props.isFormInvalid !== undefined ? props.isFormInvalid : isFormFieldInvalid(props.formik, props.fieldName);

    return <BaseField id={id} className={props.className}
                      label={label}
                      errorMsg={errorMsg}
                      isInvalid={isInvalid}>
        {props.children}
    </BaseField>

}