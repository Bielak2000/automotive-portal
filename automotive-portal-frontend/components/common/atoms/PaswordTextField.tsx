import {InputText} from "primereact/inputtext";
import {classNames} from "primereact/utils";
import {Formik, isFormFieldInvalid} from "./Formik";
import {FormField} from "./FormField";
import {PickByType} from "../../../lib/Utils";
import {Password} from "primereact/password";

interface PasswordTextFieldProps<T> {
    formik: Formik<T>,
    fieldName: keyof PickByType<T, string>,
    className?: string,
    label: string,
    classNameInput?: string
}

export const PasswordTextField = ({
                                   formik,
                                   fieldName,
                                   className,
                                   label,
                                   classNameInput
                               }: PasswordTextFieldProps<any>) => {
    return <FormField formik={formik} fieldName={fieldName} className={className} label={label}>
        <Password id={fieldName} name={fieldName} toggleMask
                   value={formik.values[fieldName]} onChange={formik.handleChange} feedback={false}
                   className={classNames('block', 'w-full', classNameInput, {'p-invalid': isFormFieldInvalid(formik, fieldName)})}
        />
    </FormField>
}