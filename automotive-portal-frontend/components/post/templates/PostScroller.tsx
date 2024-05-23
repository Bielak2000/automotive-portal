import React, {useEffect, useRef, useState} from 'react';
import {PostDTO} from "../types";
import {getPageablePosts} from "../../../lib/api/post";
import PostView from "../molecules/PostView";

const PostScroller: React.VFC = () => {
    const [posts, setPosts] = useState<PostDTO[]>([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const observer = useRef<IntersectionObserver | null>(null);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const [refVisible, setRefVisible] = useState(false);
    const [disabledLoadNewPost, setDisabledLoadNewPost] = useState<boolean>(false);
    let oldPageValue = -1;

    const loadPosts = async () => {
        const newPosts = await getPageablePosts({page: page, size: 5});
        return newPosts.data;
    };

    useEffect(() => {
        if(oldPageValue !== page) {
            setLoading(true);
            loadPosts().then((newPosts) => {
                setRefVisible(false);
                if (newPosts.length === 0) {
                    setDisabledLoadNewPost(true);
                } else {
                    setPosts((prev) => prev.concat(newPosts))
                }
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
        oldPageValue = page;
    }, [page]);

    useEffect(() => {
        if (observer.current) observer.current.disconnect();
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !loading) {
                setPage((prevPage) => prevPage + 1);
            }
        }, options);
        if (loadMoreRef.current) {
            observer.current.observe(loadMoreRef.current);
        }
        return () => {
            if (observer.current) observer.current.disconnect();
        };
    }, [loadMoreRef.current]);

    useEffect(() => {
        if (disabledLoadNewPost) {
            observer.current?.disconnect();
        }
    }, [disabledLoadNewPost])

    useEffect(() => {
        if (!refVisible) {
            return
        }
    }, [refVisible])

    return <div className="post-scroller-main-div">
        {posts.map(((post, index) => <div key={index.toString()} ref={(el)=> {
            if(index === posts.length - 1) {
                loadMoreRef.current = el;
                setRefVisible(!!el);
            }
        }}>
            <PostView post={post}/>
        </div>))}
        {loading && <p>Loading...</p>}
    </div>
}

export default PostScroller;
