import {Dropdown, DropdownChangeEvent} from "primereact/dropdown";
import {DropDownType} from "../types";

interface DropdownFieldProps {
    values: any;
    description: string;
    selectedValue: any;
    disabled?: boolean;
    setSelectedValue: (val: any) => void;
    optionTemplate?: (option: DropDownType) => any;
    selectedValueTemplate?: (option: DropDownType) => any;
}

const DropDownField = ({
                           values,
                           description,
                           selectedValue,
                           disabled,
                           setSelectedValue,
                           optionTemplate,
                           selectedValueTemplate
                       }: DropdownFieldProps) => {
    return <div className="dropdown-field">
        <label>{description}</label>
        <span className="p-float-label"  style={{marginBottom: "1rem", marginTop: "3px"}}>
                <Dropdown value={selectedValue} disabled={disabled ? disabled : false} style={{width: "100%", borderRadius: "10px"}}
                          filter showClear
                          itemTemplate={optionTemplate ?? optionTemplate}
                          valueTemplate={selectedValueTemplate ?? selectedValueTemplate}
                          onChange={(e: DropdownChangeEvent) => setSelectedValue(e.value)}
                          options={values} optionLabel="name"/>
            </span>
    </div>
}

export default DropDownField;