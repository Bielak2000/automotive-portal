import React, {useEffect, useRef, useState} from "react";
import {DropDownType, postTypes, UserDTO} from "../../common/types";
import {Button} from "primereact/button";
import {Checkbox} from "primereact/checkbox";
import DropDownField from "../../common/atoms/DropDownField";
import {getBrands, getModels} from "../../common/organisms/VehicleFunctions";
import {Toast} from "primereact/toast";
import {getFiltersFromLocalStorage, saveFiltersInLocalStorage} from "../../user/login/functions";

interface LeftPanelProps {
    user?: UserDTO;
    showLeftPanel: boolean;
    sortPostsByAppearanceNumber: boolean;
    showMyPosts: boolean;
    selectedVehicleBrand: DropDownType | null;
    selectedVehicleModel: DropDownType | null;
    selectedPostType: DropDownType | null;

    setShowLeftPanel: (val: boolean) => void;
    setSortPostsByAppearanceNumber: (val: boolean) => void;
    setShowMyPosts: (val: boolean) => void;
    setSelectedVehicleBrand: (val: DropDownType | null) => void;
    setSelectedVehicleModel: (val: DropDownType | null) => void;
    setSelectedPostType: (val: DropDownType | null) => void;
}

const LeftPanel: React.FC<LeftPanelProps> = ({
                                                 user,
                                                 showLeftPanel,
                                                 sortPostsByAppearanceNumber,
                                                 showMyPosts,
                                                 selectedVehicleBrand,
                                                 selectedVehicleModel,
                                                 selectedPostType,
                                                 setShowLeftPanel,
                                                 setSortPostsByAppearanceNumber,
                                                 setShowMyPosts,
                                                 setSelectedVehicleBrand,
                                                 setSelectedVehicleModel,
                                                 setSelectedPostType
                                             }) => {
    const toast = useRef<Toast>(null);
    const [fullPanel, setFullPanel] = useState<boolean>(false);
    const [vehicleBrandValues, setVehicleBrandValues] = useState<DropDownType[]>([]);
    const [vehicleModelValues, setVehicleModelValues] = useState<DropDownType[]>([]);

    useEffect(() => {
        const firstMobileMediaQuery = window!.matchMedia('screen and (max-width: 1089px)');

        if (!firstMobileMediaQuery.matches) {
            setShowLeftPanel(true);
        } else {
            setFullPanel(true);
        }

        firstMobileMediaQuery.onchange = (ev) => {
            if (ev.matches) {
                setShowLeftPanel(false);
                setFullPanel(true);
            } else {
                setShowLeftPanel(true);
                setFullPanel(false);
            }
        };

        getBrands(toast, setVehicleBrandValues);
        setFiltersFromLocalStorage();
    }, []);

    useEffect(() => {
        const leftPanel = document.getElementById("left-panel");
        if (showLeftPanel) {
            if (fullPanel) {
                leftPanel!.style.width = "100svw";
            } else {
                leftPanel!.style.width = "300px";
            }
            leftPanel!.style.padding = "10px";
        } else {
            leftPanel!.style.width = "0";
            leftPanel!.style.padding = "0";
            leftPanel!.style.overflow = "hidden";
        }
    }, [showLeftPanel]);

    useEffect(() => {
        const filters = getFiltersFromLocalStorage();
        if (filters === null || (filters!.vehicleBrand === null && filters!.vehicleModel === null)) {
            if (user && user.vehicleBrand) {
                setSelectedVehicleBrand({name: user.vehicleBrand, code: user.vehicleBrand});
            }
            if (user && user.vehicleModel) {
                setSelectedVehicleModel({name: user.vehicleModel, code: user.vehicleModel});
            }
        }
    }, [user]);

    useEffect(() => {
        if (!selectedVehicleBrand) {
            setVehicleModelValues([]);
            setSelectedVehicleModel(null);
        } else {
            getModels(toast, selectedVehicleBrand, setVehicleModelValues);
            if (user && selectedVehicleBrand?.code !== user.vehicleBrand) {
                setSelectedVehicleModel(null);
            }
        }
    }, [selectedVehicleBrand]);

    useEffect(() => {
        if (!(getFiltersFromLocalStorage() !== null && selectedVehicleModel === null && selectedVehicleBrand === null)) {
            saveFiltersInLocalStorage({
                vehicleBrand: selectedVehicleBrand,
                vehicleModel: selectedVehicleModel,
                postType: selectedPostType
            });
        }
    }, [selectedVehicleBrand, selectedVehicleModel, selectedPostType])

    const setFiltersFromLocalStorage = () => {
        const filters = getFiltersFromLocalStorage();
        if (filters !== null) {
            setSelectedVehicleBrand(filters.vehicleBrand);
            setSelectedVehicleModel(filters.vehicleModel);
            setSelectedPostType(filters.postType);
        }
    }

    return <div id="left-panel" className="left-panel-main-div">
        <Toast ref={toast}/>
        <div className="left-panel-filter-div">
            <div className="panel-header left-panel">
                <h2>Filtry</h2>
                {fullPanel && <Button icon="pi pi-times" className="close-right-panel-button" tooltip="zamknij"
                                      onClick={() => setShowLeftPanel(false)}
                                      tooltipOptions={{position: "left"}}/>}
            </div>
            <div className="left-panel-content-panel-div">
                <div className="left-panel-checkbox-div">
                    <Checkbox onChange={e => setSortPostsByAppearanceNumber(e.checked ? e.checked : false)}
                              checked={sortPostsByAppearanceNumber}></Checkbox>
                    <p style={{marginLeft: "10px"}}>sortuj po liczbie wystąpień</p>
                </div>
                {user && <div className="left-panel-checkbox-div">
                    <Checkbox onChange={e => setShowMyPosts(e.checked ? e.checked : false)}
                              checked={showMyPosts}></Checkbox>
                    <p style={{marginLeft: "10px"}}>moje posty</p>
                </div>}
                <div className="left-panel-dropdowns-div">
                    <DropDownField description="Wybierz typ postu" values={postTypes}
                                   className="left-panel-dropdown" filter={false}
                                   selectedValue={selectedPostType}
                                   setSelectedValue={(val) => setSelectedPostType(val ? val : null)}/>
                    <DropDownField description="Wybierz pojazd" values={vehicleBrandValues}
                                   className="left-panel-dropdown"
                                   selectedValue={selectedVehicleBrand} filter={true}
                                   setSelectedValue={(val) => setSelectedVehicleBrand(val)}/>
                    <DropDownField description="Wybierz model" values={vehicleModelValues}
                                   selectedValue={selectedVehicleModel} filter={true}
                                   className="left-panel-dropdown"
                                   setSelectedValue={(val) => setSelectedVehicleModel(val)}
                                   disabled={!selectedVehicleBrand}/>
                </div>
            </div>
        </div>


    </div>
}

export default LeftPanel;