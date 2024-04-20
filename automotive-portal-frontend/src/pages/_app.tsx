import "@/styles/globals.css";
import "@/styles/menubar.css";
import "@/styles/login.css";
import type {AppProps} from "next/app";
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primereact/resources/themes/saga-blue/theme.css';
import "primeflex/primeflex.min.css";

export default function App({Component, pageProps}: AppProps) {
    return <Component {...pageProps} />;
}
