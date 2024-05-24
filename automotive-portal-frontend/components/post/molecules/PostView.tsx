import {PostDTO} from "../types";
import {RefObject, useEffect} from "react";
import {Galleria, GalleriaResponsiveOptions} from "primereact/galleria";

interface PostViewProps {
    post: PostDTO;
}

const PostView: React.VFC<PostViewProps> = ({post}) => {
    const responsiveOptions: GalleriaResponsiveOptions[] = [
        {
            breakpoint: '991px',
            numVisible: 4
        },
        {
            breakpoint: '767px',
            numVisible: 3
        },
        {
            breakpoint: '575px',
            numVisible: 1
        }
    ];

    const itemTemplate = (item: string) => {
        return <img src={`http://localhost:8080/api/posts/${post.postId}/${item}`} alt="image" style={{ width: '100%' }} />
    }

    const thumbnailTemplate = (item: string) => {
        return <img src={`http://localhost:8080/api/posts/${post.postId}/${item}`} alt="image" style={{maxHeight: "50px"}} />
    }

    return <div className="post-view-main-div">
        <p className="margin-5 ">{post.userDTO.name} {post.userDTO.surname}</p>
        <h2 className="margin-5">{post.title}</h2>
        <span className="margin-5 post-content-span margin-top-10">{post.content}</span>
        <div className="galleria-post-view-div">
            <Galleria value={post.images} numVisible={1} style={{maxWidth: '99%'}}
                      item={itemTemplate} thumbnail={thumbnailTemplate}/>
        </div>
    </div>
}

export default PostView;