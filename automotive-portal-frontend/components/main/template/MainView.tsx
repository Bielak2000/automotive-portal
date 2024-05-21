import React, {useRef, useState} from "react";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {getTokenFromCookies} from "../../user/login/functions";
import {Toast} from "primereact/toast";

interface MainViewProps {
    showRightPanel: boolean;
    showLeftPanel: boolean;
    isNotification: boolean;

    setShowRightPanel: (val: boolean) => void;
    setShowLeftPanel: (val: boolean) => void;
}

const MainView: React.FC<MainViewProps> = ({showRightPanel, showLeftPanel, isNotification, setShowRightPanel, setShowLeftPanel}) => {
    const toast = useRef<Toast>(null);
    const token = getTokenFromCookies();
    const [searchValue, setSearchValue] = useState<string>("");

    const addPost = () => {
        if(token) {

        } else {
            toast.current?.show({
                severity: "warn",
                summary: "Operacja niedostępna",
                detail: "Dodawanie postów jest tylko dostępna dla użytkowników zalogowanych.",
                life: 5000
            })
        }
    }

    return <div className="main-div">
        <Toast ref={toast}/>
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
                    <Button icon="pi pi-plus" onClick={addPost} label="Dodaj post"/>
                </div>

            </div>
        </div>
    </div>
}

export default MainView;