import {NextPage} from "next";
import Layout from "../../components/common/templates/Layout";
import LeftPanel from "../../components/main/template/LeftPanel";
import React, {useEffect, useRef, useState} from "react";
import {DropDownType, UserDTO} from "../../components/common/types";
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
    const [showMyPosts, setShowMyPosts] = useState<boolean>(false);
    const [selectedVehicleBrand, setSelectedVehicleBrand] = useState<DropDownType | null>(null);
    const [selectedVehicleModel, setSelectedVehicleModel] = useState<DropDownType | null>(null);
    const [selectedPostType, setSelectedPostType] = useState<DropDownType | null>(null);
    const [requireRefreshPost, setRequireRefreshPost] = useState<boolean>(false);

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
            window.history.replaceState(null, "", "/")
        } else if(router.query.state === "postdeleted") {
            toast.current?.show({
                severity: "success",
                summary: "Post został usunięty",
                detail: "Wybrany post został usunięty z systemu.",
                life: 5000
            })
            window.history.replaceState(null, "", "/")
        }
    }, [router.query]);

    return <Layout title="Tablica" showComponents={true} className="main-app-content-div-start-web" user={user}
                   setUser={setUser}>
        <Toast ref={toast}/>
        <LeftPanel user={user} showLeftPanel={showLeftPanel} sortPostsByAppearanceNumber={sortPostsByAppearanceNumber}
                   showMyPosts={showMyPosts} selectedVehicleBrand={selectedVehicleBrand}
                   selectedVehicleModel={selectedVehicleModel} selectedPostType={selectedPostType}
                   setShowLeftPanel={setShowLeftPanel} setSortPostsByAppearanceNumber={setSortPostsByAppearanceNumber}
                   setShowMyPosts={setShowMyPosts} setSelectedVehicleBrand={setSelectedVehicleBrand}
                   setSelectedVehicleModel={setSelectedVehicleModel} setSelectedPostType={setSelectedPostType}/>
        <MainView showRightPanel={showRightPanel} showLeftPanel={showLeftPanel} isNotification={isNotification}
                  user={user} sortPostsByAppearanceNumber={sortPostsByAppearanceNumber} showMyPosts={showMyPosts}
                  requireRefreshPost={requireRefreshPost}
                  selectedVehicleBrand={selectedVehicleBrand != null ? selectedVehicleBrand.code : null}
                  selectedVehicleModel={selectedVehicleModel != null ? selectedVehicleModel.code : null}
                  selectedPostType={selectedPostType !== null ? selectedPostType.code : null}
                  setShowRightPanel={setShowRightPanel} setShowLeftPanel={setShowLeftPanel} setRequireRefreshPost={setRequireRefreshPost}/>
        {user && <RightPanel showRightPanel={showRightPanel} user={user} setShowRightPanel={setShowRightPanel} setUser={setUser}/>}
    </Layout>
}

export default App;