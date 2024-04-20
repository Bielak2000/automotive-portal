import React, {PropsWithChildren} from "react";
import {Formik, getFormErrorMessage, isFormFieldInvalid} from "./Formik";
import {BaseFormField} from "./BaseFormField";

type FormFieldProps<T> = {
    className?: string,
    formik: Formik<T>,
    fieldName: string & keyof T,
    label: string,
    isFormInvalid?: boolean
}

export const FormField = <T, >(props: PropsWithChildren<FormFieldProps<T>>) => {
    let id = props.fieldName;
    let label, errorMsg, isInvalid;
    label = props.label;
    errorMsg = getFormErrorMessage(props.formik, props.fieldName);
    isInvalid = props.isFormInvalid !== undefined ? props.isFormInvalid : isFormFieldInvalid(props.formik, props.fieldName);

    return <BaseFormField id={id} className={props.className}
                          label={label}
                          errorMsg={errorMsg}
                          isInvalid={isInvalid}>
        {props.children}
    </BaseFormField>

}