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

    useEffect(()=>{
        console.log(post.images)
    }, [])

    const itemTemplate = (item: any) => {
        return <img src="http://localhost:8080/home/kacperbielak/ac/7bdca41b-b4c9-4149-9404-731014b4d999/86d423a6-a1d8-4545-90bd-ce3a158b9b8d_Screenshot%20from%202024-05-11%2015-26-01.png" alt="image" style={{ width: '100%' }} />
    }

    const thumbnailTemplate = (item: any) => {
        return <img src={item.thumbnailImageSrc} alt="image" />
    }

    return <div className="post-view-main-div">
        <p className="margin-5 ">{post.userDTO.name} {post.userDTO.surname}</p>
        <h2 className="margin-5">{post.title}</h2>
        <span className="margin-5 post-content-span margin-top-10">{post.content}</span>
        {/*<div className="card">*/}
        {/*    <Galleria value={post.images} numVisible={1} style={{maxWidth: '640px'}}*/}
        {/*              item={itemTemplate} thumbnail={thumbnailTemplate}/>*/}
        {/*</div>*/}
    </div>
}

export default PostView;