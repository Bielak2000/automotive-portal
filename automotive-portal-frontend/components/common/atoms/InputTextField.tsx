import {InputText} from "primereact/inputtext";
import {classNames} from "primereact/utils";
import {Formik, isFormFieldInvalid} from "./Formik";
import {FormField} from "./FormField";
import {PickByType} from "../../../lib/Utils";

interface InputTextFieldProps<T> {
    formik: Formik<T>,
    fieldName: keyof PickByType<T, string>,
    className?: string,
    label: string,
    classNameInput?: string
}

export const InputTextField = ({
                                   formik,
                                   fieldName,
                                   className,
                                   label,
                                   classNameInput
                               }: InputTextFieldProps<any>) => {
    return <FormField formik={formik} fieldName={fieldName} className={className} label={label}>
        <InputText id={fieldName} name={fieldName}
                   value={formik.values[fieldName]} onChange={formik.handleChange}
                   className={classNames('block', 'w-full', classNameInput, {'p-invalid': isFormFieldInvalid(formik, fieldName)})}
        />
    </FormField>
}