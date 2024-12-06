import React, {useRef, useState} from "react";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {getTokenFromCookies} from "../../user/login/functions";
import {Toast} from "primereact/toast";
import AddPostDialog from "../../post/templates/AddPostDialog";
import {UserDTO} from "../../common/types";
import PostScroller from "../../post/templates/PostScroller";

interface MainViewProps {
    showRightPanel: boolean;
    showLeftPanel: boolean;
    isNotification: boolean;
    user?: UserDTO;
    sortPostsByAppearanceNumber: boolean;
    showMyPosts: boolean;
    selectedVehicleBrand: string | null;
    selectedVehicleModel: string | null;
    selectedPostType: string | null;
    requireRefreshPost: boolean;

    setShowRightPanel: (val: boolean) => void;
    setShowLeftPanel: (val: boolean) => void;
    setRequireRefreshPost: (val: boolean) => void;
}

const MainView: React.FC<MainViewProps> = ({
                                               showRightPanel,
                                               showLeftPanel,
                                               isNotification,
                                               user,
                                               sortPostsByAppearanceNumber,
                                               showMyPosts,
                                               requireRefreshPost,
                                               selectedVehicleBrand,
                                               selectedVehicleModel,
                                               selectedPostType,
                                               setShowRightPanel,
                                               setShowLeftPanel,
                                               setRequireRefreshPost
                                           }) => {
    const toast = useRef<Toast>(null);
    const token = getTokenFromCookies();
    const [searchValue, setSearchValue] = useState<string>("");
    const [showAddPostDialog, setShowAddPostDialog] = useState<boolean>(false);
    const [searchPosts, setSearchPosts] = useState<boolean>(false);

    const addPost = () => {
        if (token) {
            setShowAddPostDialog(true);
        } else {
            toast.current?.show({
                severity: "warn",
                summary: "Operacja niedostępna",
                detail: "Dodawanie postów jest tylko dostępne dla użytkowników zalogowanych.",
                life: 5000
            })
        }
    }

    return <div className="main-div">
        <Toast ref={toast}/>
        {user && <AddPostDialog showDialog={showAddPostDialog} user={user} editPost={false}
                                setShowDialog={setShowAddPostDialog} setRequireRefreshPost={setRequireRefreshPost}/>}
        <div className="main-content-div">
            <div className="main-view-menu">
                <div className="flex">
                    <InputText value={searchValue} onChange={(val) => setSearchValue(val.target.value)}
                               className="search-input" placeholder="Szukaj"/>
                    <Button icon="pi pi-search" onClick={() => setSearchPosts(true)} className="search-button"
                            tooltip="Wyszukaj"/>
                    {!showLeftPanel &&
                        <Button icon="pi pi-filter" onClick={() => setShowLeftPanel(true)} className="search-button"
                                tooltip="Pokaż filtry"/>}
                </div>
                <div className="right-buttons">
                    {!showRightPanel && user &&
                        <Button icon="pi pi-bell" onClick={() => setShowRightPanel(true)} style={{marginRight: "5px"}}
                                tooltipOptions={{position: "left"}}
                                className={isNotification ? "active-bell-button" : ""}
                                tooltip="Włącz powiadomienia"/>}
                    <Button icon="pi pi-plus" onClick={addPost} label="Dodaj post"/>
                </div>
            </div>
            <div className="main-view-data-scroller-div">
                <PostScroller user={user} searchPosts={searchPosts} searchValue={searchValue}
                              sortPostsByAppearanceNumber={sortPostsByAppearanceNumber}
                              showMyPosts={showMyPosts} selectedVehicleBrand={selectedVehicleBrand}
                              selectedVehicleModel={selectedVehicleModel} selectedPostType={selectedPostType}
                              requireRefreshPost={requireRefreshPost}
                              setSearchPosts={setSearchPosts} setRequireRefreshPost={setRequireRefreshPost}/>
            </div>
        </div>
    </div>
}

export default MainView;