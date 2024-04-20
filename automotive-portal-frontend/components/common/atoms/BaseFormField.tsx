import {classNames} from "primereact/utils";
import React, {PropsWithChildren} from "react";

interface BaseFormFieldProps<T> {
    className?: string,
    label: string,
    help?: string,
    isInvalid: any,
    errorMsg: JSX.Element,
    id: string
}

export const BaseFormField = <T, >({
                                       id,
                                       className,
                                       label,
                                       help,
                                       errorMsg,
                                       isInvalid,
                                       children
                                   }: PropsWithChildren<BaseFormFieldProps<T>>) => {
    return <div className={"field " + (className ? className : "")}>
        {<label style={{marginBottom: "3px"}} htmlFor={id} className={classNames('block', {'p-error': isInvalid})}>
            {label}
        </label>}
        {children}
        {help && <small id={id + "-help"} className="block">{help}</small>}
        {errorMsg}
    </div>
}