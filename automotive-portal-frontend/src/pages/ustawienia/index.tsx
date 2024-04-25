import {NextPage} from "next";
import Layout from "../../../components/common/templates/Layout";
import React, {useEffect, useRef, useState} from "react";
import {UserDTO} from "../../../components/common/types";
import {getUserByEmail} from "../../../lib/api/user";
import {getTokenFromCookies} from "../../../components/user/login/functions";
import {Toast} from "primereact/toast";
import SettingsPage from "../../../components/user/settings/template/SettingsPage";

const Settings: NextPage = () => {
    const toast = useRef<Toast>(null);
    const [user, setUser] = useState<UserDTO | undefined>();
    const [updateData, setUpdateData] = useState<boolean>(false);

    useEffect(() => {
        getUserData();
    }, []);

    useEffect(() => {
        if (updateData) {
            getUserData();
            setUpdateData(false);
        }
    }, [updateData]);

    const getUserData = () => {
        const token = getTokenFromCookies();
        getUserByEmail(token).then((response) => {
            if (response.status === 200) {
                setUser(response.data);
            } else {
                toast.current?.show({
                    severity: "error",
                    summary: "Brak danych",
                    detail: "Wystąpił błąd przy pobieraniu twoich danych. Spróbuj ponownie za chwilę.",
                    life: 5000
                })
            }
        })
    }

    return <Layout title="Ustawienia" showComponents={true}>
        <Toast ref={toast}/>
        {user && <SettingsPage user={user} setUpdateData={setUpdateData}/>}
    </Layout>
}

export default Settings;