import {NextPage} from "next";
import Layout from "../../components/common/templates/Layout";
import LeftPanel from "../../components/main/template/LeftPanel";
import React, {useEffect, useRef, useState} from "react";
import {UserDTO} from "../../components/common/types";
import MainView from "../../components/main/template/MainView";
import RightPanel from "../../components/main/template/RightPanel";
import {Toast} from "primereact/toast";
import {useRouter} from "next/router";

const App: NextPage = () => {
    const toast = useRef<Toast>(null);
    const router = useRouter();
    const [user, setUser] = useState<UserDTO>();
    const [showRightPanel, setShowRightPanel] = useState<boolean>(false);
    const [showLeftPanel, setShowLeftPanel] = useState<boolean>(false);
    const [isNotification, setIsNotification] = useState<boolean>(false);
    const [sortPostsByAppearanceNumber, setSortPostsByAppearanceNumber] = useState<boolean>(false);

    useEffect(() => {
        if (isNotification) {
            toast.current?.show({
                severity: "success",
                summary: "Nowe powiadomienia",
                detail: "Masz nowe powiadomienie!",
                life: 5000
            })
        }
    }, [isNotification]);

    useEffect(() => {
        if (router.query.state === "tokenexpiration") {
            toast.current?.show({
                severity: "warn",
                summary: "Zostałeś wylogowany",
                detail: "Twój token wygasł, zaloguj się ponownie.",
                life: 8000
            })
        }
    }, [router.query]);

    return <Layout title="Tablica" showComponents={true} className="main-app-content-div-start-web" user={user}
                   setUser={setUser}>
        <Toast ref={toast}/>
        <LeftPanel user={user} showLeftPanel={showLeftPanel} sortPostsByAppearanceNumber={sortPostsByAppearanceNumber}
                   setShowLeftPanel={setShowLeftPanel} setSortPostsByAppearanceNumber={setSortPostsByAppearanceNumber}/>
        <MainView showRightPanel={showRightPanel} showLeftPanel={showLeftPanel} isNotification={isNotification}
                  user={user} sortPostsByAppearanceNumber={sortPostsByAppearanceNumber}
                  setShowRightPanel={setShowRightPanel} setShowLeftPanel={setShowLeftPanel}/>
        <RightPanel showRightPanel={showRightPanel} setShowRightPanel={setShowRightPanel}/>
    </Layout>
}

export default App;