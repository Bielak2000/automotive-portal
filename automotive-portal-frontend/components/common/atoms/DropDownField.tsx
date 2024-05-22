import {Dropdown, DropdownChangeEvent} from "primereact/dropdown";
import {DropDownType} from "../types";

interface DropdownFieldProps {
    values: any;
    description: string;
    selectedValue: any;
    filter: boolean;
    divStyle?: any;
    spanErrorStyle?: any;
    disabled?: boolean;
    setSelectedValue: (val: any) => void;
    optionTemplate?: (option: DropDownType) => any;
    selectedValueTemplate?: (option: DropDownType) => any;
}

const DropDownField = ({
                           values,
                           description,
                           selectedValue,
                           filter,
                           divStyle,
                           spanErrorStyle,
                           disabled,
                           setSelectedValue,
                           optionTemplate,
                           selectedValueTemplate
                       }: DropdownFieldProps) => {
    return <div className="dropdown-field" style={divStyle}>
        <label style={spanErrorStyle ? spanErrorStyle.border !== "" ? {color: "red"} : {} : {}}>{description}</label>
        <span className="p-float-label" style={spanErrorStyle ? spanErrorStyle : {marginBottom: "1rem", marginTop: "3px"}}>
                <Dropdown value={selectedValue} disabled={disabled ? disabled : false}
                          style={{width: "100%", borderRadius: "10px"}}
                          filter={filter} showClear
                          itemTemplate={optionTemplate ?? optionTemplate}
                          valueTemplate={selectedValueTemplate ?? selectedValueTemplate}
                          onChange={(e: DropdownChangeEvent) => setSelectedValue(e.value)}
                          options={values} optionLabel="name"/>
            </span>
    </div>
}

export default DropDownField;