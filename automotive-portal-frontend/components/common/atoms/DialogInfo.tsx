import {Dialog} from "primereact/dialog";
import React from "react";
import {Button} from "primereact/button";
import Image from "next/image";

interface DialogInfoProps {
    header: string;
    info: string;
    showDialog: boolean;

    closeDialog: () => void;
}

const DialogInfo: React.FC<DialogInfoProps> = ({header, info, showDialog, closeDialog}) => {
    const headerTemplate = <div className="dialog-info-header">
        <div style={{width: "10%"}}>
            <Image width={55} height={50} src="/ac-icon.png" alt="logo"/>
        </div>
        <div style={{width: "80%", textAlign: "center"}}>
            <h3 style={{marginLeft: "25px"}}>{header}</h3>
        </div>
    </div>

    return <Dialog visible={showDialog} closable={false} onHide={closeDialog}
                   className="dialog dialog-info"
                   header={headerTemplate} headerClassName="dialogHeader">
        <p style={{fontSize: "18px"}}>{info}</p>
        <div className="dialog-info-button">
            <Button label="OK" onClick={closeDialog} style={{width: "90px"}}/>
        </div>
    </Dialog>
}

export default DialogInfo;