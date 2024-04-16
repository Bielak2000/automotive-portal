import Head from "next/head";
import React, {ReactNode} from "react";
import MainMenu from "../organisms/MainMenu";

type LayoutProps = {
    title: string;
    children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({title, children}) => {
    return <>
        <Head>
            <title>Portal motoryzacyjny</title>
            <link rel="icon" href="/ac-icon.png"/>
        </Head>
        <main style={{minWidth: "100vw", minHeight: "100vh"}}>
            <MainMenu title={title}/>
            {children}
        </main>
        <footer></footer>
    </>
}

export default Layout;