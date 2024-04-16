import React, {useState} from "react";
import {Dialog} from "primereact/dialog";

type LoginDialogProps = {
    showDialog: boolean;

    setShowDialog: (val: boolean) => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({showDialog, setShowDialog}) => {


    return <Dialog visible={showDialog} onHide={()=>setShowDialog(false)} closable={false}/>
}

export default LoginDialog;