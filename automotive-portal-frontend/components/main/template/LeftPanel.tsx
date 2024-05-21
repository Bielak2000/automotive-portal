import React, {useEffect, useState} from "react";
import {UserDTO} from "../../common/types";
import DropDownField from "../../common/atoms/DropDownField";
import {Button} from "primereact/button";

interface LeftPanelProps {
    user?: UserDTO;
    showLeftPanel: boolean;

    setShowLeftPanel: (val: boolean) => void;
}

const LeftPanel: React.FC<LeftPanelProps> = ({user, showLeftPanel, setShowLeftPanel}) => {
    const [fullPanel, setFullPanel] = useState<boolean>(false);

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
    }, []);

    useEffect(() => {
        const leftPanel = document.getElementById("left-panel");
        if (showLeftPanel) {
            if(fullPanel) {
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

    return <div id="left-panel" className="left-panel-main-div">
        <div className="left-panel-filter-div">
            <div className="panel-header left-panel">
                <h2>Filtruj</h2>
                {fullPanel && <Button icon="pi pi-times" className="close-right-panel-button" tooltip="zamknij"
                                           onClick={() => setShowLeftPanel(false)}
                                           tooltipOptions={{position: "left"}}/>}
            </div>
        </div>


    </div>
}

export default LeftPanel;