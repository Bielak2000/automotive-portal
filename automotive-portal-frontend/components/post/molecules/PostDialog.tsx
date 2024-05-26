import React, {useEffect, useRef, useState} from "react";
import {Dialog} from "primereact/dialog";
import {PostDTO} from "../types";
import {Toast} from "primereact/toast";
import {UserDTO} from "../../common/types";
import {getPostById} from "../../../lib/api/post";
import PostView from "./PostView";

type PostDialogProps = {
    showDialog: boolean;
    postId: string;
    user: UserDTO;

    closeDialog: () => void;
}

const PostDialog: React.FC<PostDialogProps> = ({showDialog, postId, user, closeDialog}) => {
    const toast = useRef<Toast>(null);
    const [post, setPost] = useState<PostDTO>();

    useEffect(() => {
        getPostById(postId).then((response) => {
            setPost(response.data);
        });
    }, [postId]);

    return <>
        <Toast ref={toast}/>
        <Dialog visible={showDialog} onHide={closeDialog}
                className="dialog add-post-dialog"
                style={{maxWidth: "80%"}}
                header={"Wybrany post"} headerClassName="dialogHeader">
            <div style={{border: "1px solid black", color: "black"}}>
                {post && <PostView post={post} user={user} index={0}/>}
            </div>
        </Dialog>
    </>
}

export default PostDialog;