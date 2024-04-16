import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import {NextPage} from "next";
import Layout from "../../components/common/templates/Layout";

const inter = Inter({ subsets: ["latin"] });

const App: NextPage = () => {
  // const dashboard = dynamic(() => import('@components/components/main/templates/LifeRemy'), {ssr: false});

  return <Layout title="Tablica">
    </Layout>
}

export default App;