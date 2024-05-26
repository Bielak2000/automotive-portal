import React, {useEffect, useState} from "react";
import {Button} from "primereact/button";
import {NotificationDTO, UserDTO} from "../../common/types";
import {assignateNotificationRead} from "../../../lib/api/notification";
import PostDialog from "../../post/molecules/PostDialog";

interface RightPanelProps {
    showRightPanel: boolean;
    user: UserDTO;

    setShowRightPanel: (val: boolean) => void;
}

const RightPanel: React.FC<RightPanelProps> = ({showRightPanel, user, setShowRightPanel}) => {
    const [fullPanel, setFullPanel] = useState<boolean>(false);
    const [showCloseButton, setShowCloseButton] = useState<boolean>(false);
    const [showPostDialog, setShowPostDialog] = useState<boolean>(false);
    const [selectedNotification, setSelectedNotification] = useState<NotificationDTO>();
    let firstMobileMediaQuery;
    let secondMobileMediaQuery;

    useEffect(() => {
        firstMobileMediaQuery = window!.matchMedia('screen and (max-width: 1380px)');
        secondMobileMediaQuery = window!.matchMedia('screen and (max-width: 1089px)');

        if (!firstMobileMediaQuery.matches) {
            setShowRightPanel(true);
        }
        if (secondMobileMediaQuery.matches) {
            setFullPanel(true);
        }

        firstMobileMediaQuery.onchange = (ev) => {
            if (ev.matches) {
                setShowRightPanel(false);
                setShowCloseButton(true);
            } else {
                setShowRightPanel(true);
                setShowCloseButton(false);
            }
        };
        secondMobileMediaQuery.onchange = (ev) => {
            if (ev.matches) {
                setFullPanel(true);
            } else {
                setFullPanel(false);
            }
        };
    }, []);

    useEffect(() => {
        const rightPanel = document.getElementById("right-panel");
        firstMobileMediaQuery = window!.matchMedia('screen and (max-width: 1380px)');
        secondMobileMediaQuery = window!.matchMedia('screen and (max-width: 1089px)');
        if (showRightPanel) {
            if (fullPanel) {
                rightPanel!.style.width = "100svw";
            } else if (showCloseButton) {
                rightPanel!.style.width = "calc(100svw - 300px)";
            } else {
                rightPanel!.style.width = "300px";
            }
            rightPanel!.style.padding = "10px";
        } else {
            rightPanel!.style.width = "0";
            rightPanel!.style.padding = "0";
            rightPanel!.style.overflow = "hidden";
        }
    }, [showRightPanel, showCloseButton, fullPanel]);

    const moveToPost = (notification: NotificationDTO) => {
        assignateNotificationRead(notification.id).then(() => {
            setSelectedNotification(notification);
            setShowPostDialog(true);
        })
    }

    const notificationTemplate = (key: number, notification: NotificationDTO) => {
        return <div key={key} className="notification-single-div"
                    style={!notification.read ? {background: "#bbbbbb"} : {}}>
            <p className="post-type-p" style={{fontSize: "14px"}}>{notification.createdAt.toString()}</p>
            <p className="notification-content-p">{notification.content}</p>
            <div className="move-to-post-div"><Button label="przejdź do postu"
                                                      className="show-all-comments-button"
                                                      onClick={() => moveToPost(notification)}/></div>
        </div>
    }

    const onClosePostDialog = () => {
        setShowPostDialog(false);
        if (!selectedNotification?.read) {
            window.location.reload();
        }
    }

    return <div id="right-panel" className="right-panel-main-div">
        {selectedNotification && <PostDialog postId={selectedNotification!.postId} showDialog={showPostDialog} user={user}
                    closeDialog={onClosePostDialog}/>}
        <div className="right-panel-content-div">
            <div className="panel-header right-panel">
                <h2>Powiadomienia</h2>
                {showCloseButton && <Button icon="pi pi-times" className="close-right-panel-button" tooltip="zamknij"
                                            onClick={() => setShowRightPanel(false)}
                                            tooltipOptions={{position: "left"}}/>}
            </div>
            <div className="notification-main-div">
                {user.notifications.map(((notification, index) => notificationTemplate(index, notification)))}
            </div>
        </div>
    </div>
}

export default RightPanel;