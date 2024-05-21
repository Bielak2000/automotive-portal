import {NextPage} from "next";
import Layout from "../../components/common/templates/Layout";
import LeftPanel from "../../components/main/template/LeftPanel";
import React, {useEffect, useRef, useState} from "react";
import {UserDTO} from "../../components/common/types";
import MainView from "../../components/main/template/MainView";
import RightPanel from "../../components/main/template/RightPanel";
import {Toast} from "primereact/toast";

const App: NextPage = () => {
    const toast = useRef<Toast>(null);
    const [user, setUser] = useState<UserDTO>();
    const [showRightPanel, setShowRightPanel] = useState<boolean>(false);
    const [showLeftPanel, setShowLeftPanel] = useState<boolean>(false);
    const [isNotification, setIsNotification] = useState<boolean>(false);

    useEffect(() => {
        if(isNotification) {
            toast.current?.show({
                severity: "success",
                summary: "Nowe powiadomienia",
                detail: "Masz nowe powiadomienie!",
                life: 5000
            })
        }
    }, [isNotification]);

    return <Layout title="Tablica" showComponents={true} className="main-app-content-div-start-web" user={user}
                   setUser={setUser}>
        <Toast ref={toast}/>
        <LeftPanel user={user} showLeftPanel={showLeftPanel} setShowLeftPanel={setShowLeftPanel}/>
        <MainView showRightPanel={showRightPanel} showLeftPanel={showLeftPanel} isNotification={isNotification}
                  setShowRightPanel={setShowRightPanel} setShowLeftPanel={setShowLeftPanel}/>
        <RightPanel showRightPanel={showRightPanel} setShowRightPanel={setShowRightPanel}/>
    </Layout>
}

export default App;