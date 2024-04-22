import Head from "next/head";
import React, {ReactNode} from "react";
import MainMenu from "../organisms/MainMenu";

type LayoutProps = {
    title: string;
    showComponents: boolean;
    children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({title, showComponents, children}) => {
    return <>
        <Head>
            <title>Portal motoryzacyjny</title>
            <link rel="icon" href="/ac-icon.png"/>
        </Head>
        <main style={{minWidth: "100vw", minHeight: "100vh"}}>
            <MainMenu title={title} showComponents={showComponents}/>
            <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                {children}
            </div>
        </main>
        <footer></footer>
    </>
}

export default Layout;