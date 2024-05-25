import {Dialog} from "primereact/dialog";
import React from "react";
import {Button} from "primereact/button";
import Image from "next/image";

interface ConfirmationDeleteDialogProps {
    header: string;
    info: string;
    showDialog: boolean;

    closeDialog: () => void;
    confirmDelete: () => void;
}

const ConfirmationDeleteDialog: React.FC<ConfirmationDeleteDialogProps> = ({header, info, showDialog, closeDialog, confirmDelete}) => {
    const headerTemplate = <div className="dialog-info-header">
        <div style={{width: "80%", textAlign: "center"}}>
            <h3 style={{marginLeft: "25px"}}>{header}</h3>
        </div>
    </div>

    return <Dialog visible={showDialog} closable={false} onHide={closeDialog}
                   className="dialog dialog-info"
                   header={headerTemplate} headerClassName="dialogHeader dialog-delete-header">
        <p style={{fontSize: "18px", paddingTop: "0", marginTop: "0"}}>{info}</p>
        <div className="dialog-info-button" style={{justifyContent: "center"}}>
            <Button className="cancel-button" label="Anuluj" onClick={closeDialog} style={{width: "135px", marginRight: "10px"}} icon="pi pi-times"/>
            <Button className="confirm-delete-button" label="Potwierdź" onClick={confirmDelete} style={{width: "135px"}} icon="pi pi-check"/>
        </div>
    </Dialog>
}

export default ConfirmationDeleteDialog;