import React, {useState} from "react";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";

interface MainViewProps {
    showRightPanel: boolean;
    showLeftPanel: boolean;
    isNotification: boolean;

    setShowRightPanel: (val: boolean) => void;
    setShowLeftPanel: (val: boolean) => void;
}

const MainView: React.FC<MainViewProps> = ({showRightPanel, showLeftPanel, isNotification, setShowRightPanel, setShowLeftPanel}) => {
    const [searchValue, setSearchValue] = useState<string>("");

    return <div className="main-div">
        <div className="main-content-div">
            <div className="main-view-menu">
                <div className="flex">
                    <InputText value={searchValue} onChange={(val) => setSearchValue(val.target.value)}
                               className="search-input" placeholder="Szukaj"/>
                    <Button icon="pi pi-search" onClick={() => console.log("xd")} className="search-button"
                            tooltip="wyszukaj"/>
                    {!showLeftPanel && <Button icon="pi pi-filter" onClick={() => setShowLeftPanel(true)} className="search-button"
                                               tooltip="Pokaż filtry"/>}
                </div>
                <div className="right-buttons">
                    {!showRightPanel &&
                        <Button icon="pi pi-bell" onClick={() => setShowRightPanel(true)} style={{marginRight: "5px"}}
                                tooltipOptions={{position: "left"}} className={isNotification ? "active-bell-button" : ""}
                                tooltip="Włącz powiadomienia"/>}
                    <Button icon="pi pi-plus" onClick={() => console.log("xd")} label="Dodaj post"/>
                </div>

            </div>
        </div>
    </div>
}

export default MainView;