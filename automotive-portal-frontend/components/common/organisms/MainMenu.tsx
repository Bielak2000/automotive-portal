import {Menubar} from "primereact/menubar";
import {MenuItem} from "primereact/menuitem";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import {useRouter} from "next/router";
import {Button} from "primereact/button";
import LoginDialog from "../../user/login/templates/LoginDialog";
import Link from "next/link";
import {getTokenFromCookies} from "../../user/login/functions";
import {UserMenu} from "./UserMenu";
import DialogInfo from "../atoms/DialogInfo";
import {UserDTO} from "../types";

type MainMenuProps = {
    title: string;
    showComponents: boolean;
    user?: UserDTO;

    setUser?: (val: UserDTO) => void;
}

const MainMenu: React.FC<MainMenuProps> = ({title, showComponents, user, setUser}) => {
    const router = useRouter();
    const [showLoginDialog, setShowLoginDialog] = useState<boolean>(false);
    const [firstMobileView, setFirstMobileView] = useState<boolean>(false);
    const [token, setToken] = useState<string | undefined | null>(null);
    const [refreshData, setRefreshData] = useState<boolean>(false);
    const [showRegisteredDialogInfo, setShowRegisteredDialogInfo] = useState<boolean>(false);
    const query = router.query;

    useEffect(() => {
        setToken(getTokenFromCookies());
        const firstMobileMediaQuery = window!.matchMedia('screen and (max-width: 960px)');

        if (firstMobileMediaQuery.matches) {
            setFirstMobileView(true);
        }

        firstMobileMediaQuery.onchange = (ev) => {
            if (ev.matches) {
                setFirstMobileView(true);
            } else {
                setFirstMobileView(false);
            }
        };
    }, [])

    useEffect(() => {
        if (query.showLogin) {
            setShowLoginDialog(true);
            router.replace('/', undefined, {shallow: true});
        }
    }, [query]);

    useEffect(() => {
        if (refreshData) {
            setToken(getTokenFromCookies());
        }
    }, [refreshData]);

    const closeRegisterDialog = () => {
        router.replace('/', undefined, {shallow: true});
        setShowRegisteredDialogInfo(false);
        setShowLoginDialog(true);
    }

    const items: MenuItem[] = showComponents ? [
        {
            label: 'Tablica',
            icon: 'pi pi-home',
            command: () => {
                router.push("/")
            }
        }
    ] : []

    const start = <div className="main-menu-start">
        <Link href="/">
            <div className="header-title">
                <Image width={35} height={30} src="/ac-icon.png" alt="logo"/>
                <p className="menu-start-p">Portal motoryzacyjny</p>
            </div>
        </Link>
        {firstMobileView && showComponents && <div className="menuitem-mobile"><Button
            className="button-without-background" label="Tablica" icon="pi pi-home"/></div>}
    </div>

    const menuBarEnd = () => <>
        {!token && token !== null && showComponents && <Button icon="pi pi-sign-in" label={'Zaloguj się'}
                                                               className="login-button"
                                                               onClick={() => setShowLoginDialog(true)}/>}
        {token && showComponents && <UserMenu user={user} setUser={setUser}/>}
    </>

    return <>
        <DialogInfo info={"Twoje konto zostało zarejesetrowane w systemie. Możesz zalogować się do portalu."}
                    header={"Konto zarejestrowane"} showDialog={showRegisteredDialogInfo}
                    closeDialog={closeRegisterDialog}/>
        <LoginDialog showDialog={showLoginDialog} setShowDialog={setShowLoginDialog} setRefreshData={setRefreshData}/>
        <Menubar style={!showComponents ? {height: "60px"} : undefined} className="main-menu"
                 model={!firstMobileView ? items : undefined} start={start} end={menuBarEnd}/>
    </>
}

export default MainMenu;