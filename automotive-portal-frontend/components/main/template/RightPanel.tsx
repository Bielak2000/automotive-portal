import React, {useEffect, useState} from "react";
import {Button} from "primereact/button";

interface RightPanelProps {
    showRightPanel: boolean;

    setShowRightPanel: (val: boolean) => void;
}

const RightPanel: React.FC<RightPanelProps> = ({showRightPanel, setShowRightPanel}) => {
    const [fullPanel, setFullPanel] = useState<boolean>(false);
    const [showCloseButton, setShowCloseButton] = useState<boolean>(false);
    let firstMobileMediaQuery;
    let secondMobileMediaQuery;

    useEffect(() => {
        firstMobileMediaQuery = window!.matchMedia('screen and (max-width: 1380px)');
        secondMobileMediaQuery = window!.matchMedia('screen and (max-width: 1089px)');

        if (!firstMobileMediaQuery.matches) {
            setShowRightPanel(true);
        }
        if (secondMobileMediaQuery.matches) {
            setFullPanel(true);
        }

        firstMobileMediaQuery.onchange = (ev) => {
            if (ev.matches) {
                setShowRightPanel(false);
                setShowCloseButton(true);
            } else {
                setShowRightPanel(true);
                setShowCloseButton(false);
            }
        };
        secondMobileMediaQuery.onchange = (ev) => {
            if (ev.matches) {
                setFullPanel(true);
            } else {
                setFullPanel(false);
            }
        };
    }, []);

    useEffect(() => {
        const rightPanel = document.getElementById("right-panel");
        firstMobileMediaQuery = window!.matchMedia('screen and (max-width: 1380px)');
        secondMobileMediaQuery = window!.matchMedia('screen and (max-width: 1089px)');
        if (showRightPanel) {
            if (fullPanel) {
                rightPanel!.style.width = "100svw";
            } else if (showCloseButton) {
                rightPanel!.style.width = "calc(100svw - 300px)";
            } else {
                rightPanel!.style.width = "300px";
            }
            rightPanel!.style.padding = "10px";
        } else {
            rightPanel!.style.width = "0";
            rightPanel!.style.padding = "0";
            rightPanel!.style.overflow = "hidden";
        }
    }, [showRightPanel, showCloseButton, fullPanel]);

    return <div id="right-panel" className="right-panel-main-div">
        <div className="right-panel-content-div">
            <div className="panel-header right-panel">
                <h2>Powiadomienia</h2>
                {showCloseButton && <Button icon="pi pi-times" className="close-right-panel-button" tooltip="zamknij"
                                            onClick={() => setShowRightPanel(false)}
                                            tooltipOptions={{position: "left"}}/>}
            </div>
        </div>


    </div>
}

export default RightPanel;