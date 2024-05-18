import Head from "next/head";
import React, {ReactNode} from "react";
import MainMenu from "../organisms/MainMenu";
import {UserDTO} from "../types";

type LayoutProps = {
    title: string;
    showComponents: boolean;
    user?: UserDTO;
    className?: string;
    children?: ReactNode;
    setUser?: (val: UserDTO) => void;
}

const Layout: React.FC<LayoutProps> = ({title, showComponents, user, setUser, className, children}) => {
    return <>
        <Head>
            <title>Portal motoryzacyjny</title>
            <link rel="icon" href="/ac-icon.png"/>
        </Head>
        <main style={{minWidth: "100vw", minHeight: "100vh"}}>
            <MainMenu title={title} showComponents={showComponents} user={user} setUser={setUser}/>
            <div className={className ? "main-app-content-div " + className : "main-app-content-div"}>
                {children}
            </div>
        </main>
        <footer></footer>
    </>
}

export default Layout;