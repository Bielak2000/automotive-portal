import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {getTokenFromCookies, getUserEmailFromLocalStorage, removeTokenFromCookies} from "../../user/login/functions";
import {MenuItem} from "primereact/menuitem";
import {Menubar} from "primereact/menubar";
import {Button} from "primereact/button";
import {getUserByEmail, logout} from "../../../lib/api/user";
import {UserDTO} from "../types";
import Image from "next/image";

export const UserMenu: React.FC = () => {
    const router = useRouter();
    const [user, setUser] = useState<UserDTO>();
    const [token, setToken] = useState<string | undefined>(getTokenFromCookies());
    const [userEmail, setUserEmail] = useState<string | null>(getUserEmailFromLocalStorage());

    useEffect(() => {
        updateUserData();
    }, []);

    useEffect(() => {
        if (token !== undefined && userEmail !== null) {
            getUserByEmail(token).then(response => {
                if (response.status === 200) {
                    setUser(response.data);
                }
            })
        }
    }, [token])

    const updateUserData = () => {
        setToken(getTokenFromCookies());
        setUserEmail(getUserEmailFromLocalStorage());
    }


    const mobileMenuUser: MenuItem[] = [
        {
            label: "ustawienia",
            command() {
                router.push("/ustawienia")
            }
        },
        {
            label: "pomoc",
            command() {

            }
        },
        {
            label: "wyloguj się",
            className: 'user-menuitem-link',
            command() {
                if (token !== undefined) {
                    logout().then((response: any) => {
                        if (response.status === 204) {
                            removeTokenFromCookies();
                            window.location.reload();
                        }
                    })
                }
            }
        }
    ]

    const emailTemplate = <div className="email-template-div">
        <Image width={20} height={20} alt="uzytkownik" src="/user-icon.svg"/>
        <div style={{marginLeft: "5px", marginRight: "10px"}}>
            <p className='email-info'>{user ? user.email : "brak danych"}</p>
        </div>
    </div>

    const startTemplate = () => {
        return <div className="menu-bar-end-div">
            {emailTemplate}
            <Button className='menu-bar-end-button' type="button"
                    icon={'pi pi-angle-down'}/>
        </div>
    }

    const desktopMenuUser: MenuItem[] = [
        {
            template: () => startTemplate(),
            className: 'user-menu',
            items: mobileMenuUser
        }
    ]

    return <>
        <Menubar id='menu-bar-user' menuIcon={'pi pi-chevron-down'}
                 className="user-menu-bar"
                 model={desktopMenuUser}
        />
    </>
}