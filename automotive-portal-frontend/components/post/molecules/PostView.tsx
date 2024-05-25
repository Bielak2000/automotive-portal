import {PostDTO, typeTranslate} from "../types";
import {Galleria} from "primereact/galleria";
import {Button} from "primereact/button";
import Image from "next/image";
import {getTokenFromCookies, getUserIdFromLocalStorage} from "../../user/login/functions";
import React, {useRef, useState} from "react";
import {Toast} from "primereact/toast";
import {boostPostApi, deletePostById, getPostById} from "../../../lib/api/post";
import ConfirmationDeleteDialog from "../../common/organisms/ConfirmationDeleteDialog";
import AddPostDialog from "../templates/AddPostDialog";
import {UserDTO} from "../../common/types";

interface PostViewProps {
    post: PostDTO;
    index: number;
    user?: UserDTO;

    onDeletedPost: (index: number) => void;
}

const PostView: React.VFC<PostViewProps> = ({post, index, user, onDeletedPost}) => {
    const token = getTokenFromCookies();
    const userId = getUserIdFromLocalStorage();
    const toast = useRef<Toast>(null);
    const [postState, setPostState] = useState<PostDTO>(post);
    const [showConfirmationDeleteDialog, setShowConfirmationDeleteDialog] = useState<boolean>(false);
    const [showEditPostDialog, setShowEditPostDialog] = useState<boolean>(false);

    const itemTemplate = (item: string) => {
        return <img src={`http://localhost:8080/api/posts/${postState.postId}/${item}`} alt="image"
                    style={{width: '100%'}}/>
    }

    const thumbnailTemplate = (item: string) => {
        return <img src={`http://localhost:8080/api/posts/${postState.postId}/${item}`} alt="image"
                    style={{maxHeight: "50px"}}/>
    }

    const vehicleTemplate = (item: string | null | undefined, marginLeft: string) => {
        if (item) {
            return <div className="post-view-vehicle-div" style={{marginLeft: marginLeft}}>
                <p>{item}</p>
            </div>
        }
    }

    const boostPost = (boost: boolean) => {
        if (token && userId) {
            const formattedUserId = userId.slice(1, userId.length - 1);
            if (boost) {
                if (!postState.appearanceUserIds.includes(formattedUserId)) {
                    boostPostApi({userId: formattedUserId, postId: postState.postId, boost: boost}).then(() => {
                        getPostById(postState.postId).then((response) => {
                            setPostState(response.data);
                        })
                    })
                } else {
                    toast.current?.show({
                        severity: "warn",
                        summary: "Operacja niedostępna",
                        detail: "Ten post został już przez ciebie podbity.",
                        life: 5000
                    })
                }
            } else {
                if (postState.appearanceUserIds.includes(formattedUserId)) {
                    boostPostApi({userId: formattedUserId, postId: postState.postId, boost: boost}).then(() => {
                        getPostById(postState.postId).then((response) => {
                            setPostState(response.data);
                        })
                    })
                } else {
                    toast.current?.show({
                        severity: "warn",
                        summary: "Operacja niedostępna",
                        detail: "Ten post nie jest przez ciebie podbity.",
                        life: 5000
                    })
                }
            }
        } else {
            toast.current?.show({
                severity: "warn",
                summary: "Operacja niedostępna",
                detail: "Podbijanie postów jest tylko dostępne dla użytkowników zalogowanych.",
                life: 5000
            })
        }
    }

    const confirmDeletePost = () => {
        deletePostById(userId!.slice(1, userId!.length - 1), postState.postId).then((response) => {
            if (response.status === 200) {
                setShowConfirmationDeleteDialog(false);
                onDeletedPost(index);
            } else {
                toast.current?.show({
                    severity: "error",
                    summary: "Wystąpił błąd",
                    detail: "Wystąpił błąd w trakcie usuwania postu, spróbuj ponownie później.",
                    life: 5000
                })
            }
        })
    }

    return <div className="post-view-main-div">
        {user && <AddPostDialog showDialog={showEditPostDialog} user={user} editPost={true}
                                setShowDialog={setShowEditPostDialog}
                                post={post}/>}
        <Toast ref={toast}/>
        <ConfirmationDeleteDialog header={`Usuwanie postu`} info={"Czy na pewno chcesz usunąć wybrany post?"}
                                  showDialog={showConfirmationDeleteDialog}
                                  closeDialog={() => setShowConfirmationDeleteDialog(false)}
                                  confirmDelete={confirmDeletePost}/>
        <div className="post-view-header-div">
            <div>
                <div className="flex">
                    <p className="post-type-p">{postState.modifiedAt.toString()},</p>
                    <p className="post-type-p" style={{marginLeft: "5px"}}>{typeTranslate(postState.postType)}</p>
                </div>
                <div className="post-view-header-div-content">
                    <p style={{marginRight: "10px"}}>{postState.userDTO.name} {postState.userDTO.surname}</p>
                    {vehicleTemplate(postState.vehicleBrand, "0")}
                    {vehicleTemplate(postState.vehicleModel, "5px")}
                </div>
            </div>
            <div className="right-post-view-header-div">
                {token && userId !== null && postState.userDTO.id === userId.slice(1, userId.length - 1) &&
                    <Button icon="pi pi-pen-to-square" onClick={() => setShowEditPostDialog(true)}
                            className="post-view-action-button edit-post-button"
                            tooltip="Edytuj post" tooltipOptions={{position: "bottom"}}/>}
                {token && userId !== null && postState.userDTO.id === userId.slice(1, userId.length - 1) &&
                    <Button icon="pi pi-times-circle" onClick={() => setShowConfirmationDeleteDialog(true)}
                            className="post-view-action-button delete-post-button"
                            tooltip="Usuń post" tooltipOptions={{position: "bottom"}}/>}
                <div className="type-arrow-div">
                    <Button className="arrow-button" tooltip="Podbij" tooltipOptions={{position: "left"}}
                            onClick={() => boostPost(true)}
                            disabled={userId !== null ? postState.userDTO.id === userId.slice(1, userId.length - 1) : false}>
                        <Image src="/arrow-up.svg" alt="up" width={20} height={40}/>
                    </Button>
                    <p className="appearance-number-p">{postState.appearanceNumber}</p>
                    <Button className="arrow-button" style={{marginTop: "0"}} tooltip="Anuluj"
                            disabled={userId !== null ? postState.userDTO.id === userId.slice(1, userId.length - 1) : false}
                            tooltipOptions={{position: "left"}} onClick={() => boostPost(false)}>
                        <Image src="/arrow-down.svg" alt="up" width={20} height={40}/>
                    </Button>
                </div>
            </div>
        </div>

        <h2 className="margin-5">{postState.title}</h2>
        <span className="margin-5 post-content-span margin-top-10">{postState.content}</span>
        <div className="galleria-post-view-div">
            <Galleria value={postState.images} numVisible={1} style={{maxWidth: '99%'}}
                      item={itemTemplate} thumbnail={thumbnailTemplate}/>
        </div>
    </div>
}

export default PostView;