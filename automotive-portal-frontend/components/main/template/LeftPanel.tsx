import React from "react";
import {UserDTO} from "../../common/types";
import DropDownField from "../../common/atoms/DropDownField";

interface LeftPanelProps {
    user: UserDTO;
}

const LeftPanel: React.FC<LeftPanelProps> = ({user}) => {

    return <div className="left-panel-main-div">
        {/*{user && <h2>{user.name} {user.surname}</h2>}*/}
        <div className="left-panel-filter-div">
            <h2>Filtruj</h2>
            <DropDownField description="Wybierz pojazd" values={vehicleBrandValues}
                           disabled={!editData}
                           selectedValue={selectedVehicleBrand}
                           setSelectedValue={(val) => setSelectedVehicleBrand(val)}/>
        </div>


    </div>
}

export default LeftPanel;