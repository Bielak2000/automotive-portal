import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {getTokenFromCookies, getUserEmailFromLocalStorage, removeTokenFromCookies} from "../../login/functions";
import {MenuItem, MenuItemOptions} from "primereact/menuitem";
import {Menubar} from "primereact/menubar";
import {Button} from "primereact/button";
import {getUserByEmail, logout} from "../../../lib/api/user";
import {UserDTO} from "../types";
import Image from "next/image";

export const UserMenu: React.FC = () => {
    const router = useRouter();
    // const mobileMediaQuery = window.matchMedia('screen and (max-width: 960px)');
    const [user, setUser] = useState<UserDTO>();
    // const [showChangePasswordDialog, setShowChangePasswordDialog] = useState<boolean>(false);
    const [token, setToken] = useState<string | undefined>(getTokenFromCookies());
    const [userEmail, setUserEmail] = useState<string | null>(getUserEmailFromLocalStorage());

    useEffect(() => {
        console.log("eeeeeeeeee")
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

    // const menuMobileStartTemplate = () => {
    //     return <div style={{display: "flex", alignItems: "center"}}>
    //         {emailTemplate}
    //     </div>
    // }

    const startTemplate = (item: MenuItem, options: MenuItemOptions) => {
        // subMenuOptions = options;
        return <div className="menu-bar-end-div">
            {emailTemplate}
            <Button className='menu-bar-end-button' type="button"
                    icon={'pi pi-angle-down'}/>
        </div>
    }

    const desktopMenuUser: MenuItem[] = [
        {
            template: (item, options) => startTemplate(item, options),
            className: 'user-menu',
            items: mobileMenuUser
        }
    ]

    // let menuUser: MenuItem[] = mobileMediaQuery.matches ? mobileMenuUser : desktopMenuUser;
    let menuUser: MenuItem[] = desktopMenuUser;

    return <>
        <Menubar id='menu-bar-user' menuIcon={'pi pi-chevron-down'}
            // start={mobileMediaQuery.matches ? menuMobileStartTemplate : null}
                 className="user-menu-bar"
                 model={desktopMenuUser}
        />
    </>
}