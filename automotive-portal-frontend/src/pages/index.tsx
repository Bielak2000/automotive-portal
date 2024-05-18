import {NextPage} from "next";
import Layout from "../../components/common/templates/Layout";
import LeftPanel from "../../components/main/template/LeftPanel";
import {useState} from "react";
import {UserDTO} from "../../components/common/types";

const App: NextPage = () => {
    const [user, setUser] = useState<UserDTO>();

    return <Layout title="Tablica" showComponents={true} className="main-app-content-div-start-web" user={user} setUser={setUser}>
        <LeftPanel user={user}/>
    </Layout>
}

export default App;