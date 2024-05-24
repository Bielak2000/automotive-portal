import {classNames} from "primereact/utils";
import React, {PropsWithChildren} from "react";

interface BaseFormFieldProps<T> {
    className?: string,
    label: string,
    isInvalid: any,
    errorMsg: JSX.Element,
    id: string
}

export const BaseField = <T, >({
                                       id,
                                       className,
                                       label,
                                       errorMsg,
                                       isInvalid,
                                       children
                                   }: PropsWithChildren<BaseFormFieldProps<T>>) => {
    return <div className={"field " + (className ? className : "")}>
        {<label style={{marginBottom: "3px"}} htmlFor={id} className={classNames('block', {'p-error': isInvalid})}>
            {label}
        </label>}
        {children}
        {errorMsg}
    </div>
}