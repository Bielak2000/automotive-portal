import React, {useEffect, useRef, useState} from 'react';
import {PostDTO} from "../types";
import {getPageablePosts} from "../../../lib/api/post";
import PostView from "../molecules/PostView";

interface PostScrollerProps {
    searchValue: string;
    searchPosts: boolean;

    setSearchPosts: (val: boolean) => void;
}

const PostScroller: React.VFC<PostScrollerProps> = ({searchPosts, searchValue, setSearchPosts}) => {
    const [posts, setPosts] = useState<PostDTO[]>([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const observer = useRef<IntersectionObserver | null>(null);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const [refVisible, setRefVisible] = useState(false);
    const [disabledLoadNewPost, setDisabledLoadNewPost] = useState<boolean>(false);
    const oldPageValue = useRef<number>(-1);

    const loadPosts = async (requirePage: number) => {
        const newPosts = await getPageablePosts({
            page: requirePage,
            size: 5,
            searchValue: searchValue === "" ? null : searchValue
        }, searchValue);
        return newPosts.data;
    };

    useEffect(() => {
        execAndHandlerLoadPosts(false);
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
            return;
        }
    }, [refVisible])

    useEffect(() => {
        if (searchPosts) {
            setPosts([]);
            oldPageValue.current = -1;
            setPage(0);
            execAndHandlerLoadPosts(true);
            setSearchPosts(false);
        }
    }, [searchPosts]);

    const execAndHandlerLoadPosts = (requireRequest: boolean) => {
        if (oldPageValue.current !== page || requireRequest) {
            setLoading(true);
            const designatedPage = requireRequest ? 0 : page;
            loadPosts(designatedPage).then((newPosts) => {
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
        if (requireRequest) {
            oldPageValue.current = 0;
        } else {
            oldPageValue.current = page;
        }
    }

    const emptyValue = () => {
        if (posts.length === 0) {
            return <div style={{width: "100%", textAlign: "center"}}><p>brak postów ...</p></div>
        }
    }

    return <div className="post-scroller-main-div">
        {posts.map(((post, index) => <div key={index.toString()} ref={(el) => {
            if (index === posts.length - 1) {
                loadMoreRef.current = el;
                setRefVisible(!!el);
            }
        }}>
            <PostView post={post}/>
        </div>))}
        {emptyValue()}
        {loading && <p>Loading...</p>}
    </div>
}

export default PostScroller;
