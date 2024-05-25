import React, {useEffect, useState} from "react";
import {UserDTO} from "../../common/types";
import {Button} from "primereact/button";
import {Checkbox} from "primereact/checkbox";

interface LeftPanelProps {
    user?: UserDTO;
    showLeftPanel: boolean;
    sortPostsByAppearanceNumber: boolean;

    setShowLeftPanel: (val: boolean) => void;
    setSortPostsByAppearanceNumber: (val: boolean) => void;
}

const LeftPanel: React.FC<LeftPanelProps> = ({
                                                 user,
                                                 showLeftPanel,
                                                 sortPostsByAppearanceNumber,
                                                 setShowLeftPanel,
                                                 setSortPostsByAppearanceNumber
                                             }) => {
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

    return <div id="left-panel" className="left-panel-main-div">
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
                    <p style={{marginLeft: "10px"}}>sortuj po liczbie podbić</p>
                </div>
            </div>
        </div>


    </div>
}

export default LeftPanel;