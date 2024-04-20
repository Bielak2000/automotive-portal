import {Menubar} from "primereact/menubar";
import {MenuItem, MenuItemOptions} from "primereact/menuitem";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import {useRouter} from "next/router";
import {Button} from "primereact/button";
import LoginDialog from "../../login/templates/LoginDialog";
import Link from "next/link";
import {getTokenFromCookies, isLogged, removeTokenFromCookies} from "../../login/functions";
import {UserMenu} from "./UserMenu";
import {logout} from "../../../lib/api/user";

type MainMenuProps = {
    title: string;
}

const MainMenu: React.FC<MainMenuProps> = ({title}) => {
    const router = useRouter();
    const [showLoginDialog, setShowLoginDialog] = useState<boolean>(false);
    const [firstMobileView, setFirstMobileView] = useState<boolean>(false);
    const [secondMobileView, setSecondMobileView] = useState<boolean>(false);
    const [token, setToken] = useState<string | undefined | null>(null);
    const [refreshData, setRefreshData] = useState<boolean>(false);

    useEffect(() => {
        setToken(getTokenFromCookies());
        const firstMobileMediaQuery = window!.matchMedia('screen and (max-width: 960px)');
        const secondMobileMediaQuery = window!.matchMedia('screen and (max-width: 585px)');

        if (firstMobileMediaQuery.matches) {
            setFirstMobileView(true);
        }
        if (secondMobileMediaQuery.matches) {
            setSecondMobileView(true);
        }

        firstMobileMediaQuery.onchange = (ev) => {
            if (ev.matches) {
                setFirstMobileView(true);
            } else {
                setFirstMobileView(false);
            }
        };

        secondMobileMediaQuery.onchange = (ev) => {
            if (ev.matches) {
                setSecondMobileView(true);
            } else {
                setSecondMobileView(false);
            }
        };
    }, [])

    useEffect(() => {
        if(refreshData) {
            setToken(getTokenFromCookies());
        }
    }, [refreshData]);

    const items: MenuItem[] = [
        {
            label: 'Tablica',
            icon: 'pi pi-home',
            command: () => {
                router.push("/")
            }
        }
    ]

    const start = <div className="main-menu-start">
        <Link href="/">
            <div style={{display: "flex", alignItems: "center"}}>
                <Image width={35} height={30} src="/ac-icon.png" alt="logo"/>
                <p className="menu-start-p">Portal motoryzacyjny</p>
            </div>
        </Link>
        {firstMobileView && <div className="menuitem-mobile"><Button
            className="button-without-background" label="Tablica" icon="pi pi-home"/></div>}
    </div>

    const menuBarEnd = () => <>
        {!token && token !== null && <Button icon="pi pi-sign-in" label={!secondMobileView ? 'Zaloguj się' : undefined}
                                             onClick={() => setShowLoginDialog(true)}/>}
        {token && <UserMenu/>}
    </>

    return <>
        <LoginDialog showDialog={showLoginDialog} setShowDialog={setShowLoginDialog} setRefreshData={setRefreshData}/>
        <Menubar className="main-menu" model={items} start={start} end={menuBarEnd}/>
    </>
}

export default MainMenu;