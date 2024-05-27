import React, {useEffect, useRef, useState} from 'react';
import {PostDTO} from "../types";
import {getPageablePosts} from "../../../lib/api/post";
import PostView from "../molecules/PostView";
import {UserDTO} from "../../common/types";
import {Toast} from "primereact/toast";

interface PostScrollerProps {
    user?: UserDTO;
    searchValue: string;
    searchPosts: boolean;
    sortPostsByAppearanceNumber: boolean;
    showMyPosts: boolean;
    selectedVehicleBrand: string | null;
    selectedVehicleModel: string | null;
    selectedPostType: string | null;
    requireRefreshPost: boolean;

    setSearchPosts: (val: boolean) => void;
    setRequireRefreshPost: (val: boolean) => void;
}

const PostScroller: React.VFC<PostScrollerProps> = ({
                                                        user,
                                                        searchPosts,
                                                        requireRefreshPost,
                                                        searchValue,
                                                        sortPostsByAppearanceNumber,
                                                        showMyPosts,
                                                        selectedVehicleBrand,
                                                        selectedVehicleModel,
                                                        selectedPostType,
                                                        setSearchPosts,
                                                        setRequireRefreshPost
                                                    }) => {
    const toast = useRef<Toast>(null);
    const [posts, setPosts] = useState<PostDTO[]>([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const observer = useRef<IntersectionObserver | null>(null);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const [refVisible, setRefVisible] = useState(false);
    const [disabledLoadNewPost, setDisabledLoadNewPost] = useState<boolean>(false);
    const oldPageValue = useRef<number>(-1);
    const [firstSortValue, setFirstSortValue] = useState<boolean>(true);
    const [firstMyPosts, setFirstMyPosts] = useState<boolean>(true);
    const [firstFilterVehicle, setFirstVehicle] = useState<boolean>(true);
    const [firstFilterPostType, setFirstFilterPostType] = useState<boolean>(true);

    const loadPosts = async (requirePage: number) => {
        const newPosts = await getPageablePosts({
            page: requirePage,
            size: 5,
            searchValue: searchValue === "" ? null : searchValue,
            sortByAppearanceNumber: sortPostsByAppearanceNumber,
            userId: showMyPosts ? (user ? user.id.slice(0, user.id.length) : null) : null,
            vehicleBrand: selectedVehicleBrand,
            vehicleModel: selectedVehicleModel,
            postType: selectedPostType
        });
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
            prepareDataWhenChangeFilersSortingSearching();
        }
    }, [searchPosts]);

    useEffect(() => {
        if (!firstSortValue) {
            prepareDataWhenChangeFilersSortingSearching();
        }
    }, [firstSortValue]);

    useEffect(() => {
        if (sortPostsByAppearanceNumber) {
            setFirstSortValue(false);
        }
        if (!firstSortValue) {
            prepareDataWhenChangeFilersSortingSearching();
        }
    }, [sortPostsByAppearanceNumber]);

    useEffect(() => {
        if (!firstMyPosts) {
            prepareDataWhenChangeFilersSortingSearching();
        }
    }, [firstMyPosts]);

    useEffect(() => {
        if (showMyPosts) {
            setFirstMyPosts(false);
        }
        if (!firstMyPosts) {
            prepareDataWhenChangeFilersSortingSearching();
        }
    }, [showMyPosts]);

    useEffect(() => {
        if (!firstFilterVehicle) {
            prepareDataWhenChangeFilersSortingSearching();
        }
    }, [firstFilterVehicle]);

    useEffect(() => {
        if (selectedVehicleBrand !== null || selectedVehicleModel !== null) {
            setFirstVehicle(false);
        }
        if (!firstFilterVehicle) {
            prepareDataWhenChangeFilersSortingSearching();
        }
    }, [selectedVehicleBrand, selectedVehicleModel]);

    useEffect(() => {
        if (requireRefreshPost) {
            prepareDataWhenChangeFilersSortingSearching();
            setRequireRefreshPost(false);
        }
    }, [requireRefreshPost]);

    useEffect(() => {
        if (!firstFilterPostType) {
            prepareDataWhenChangeFilersSortingSearching();
        }
    }, [firstFilterPostType]);

    useEffect(() => {
        if (selectedPostType !== null) {
            setFirstFilterPostType(false);
        }
        if (!firstFilterPostType) {
            prepareDataWhenChangeFilersSortingSearching();
        }
    }, [selectedPostType]);

    const prepareDataWhenChangeFilersSortingSearching = () => {
        setPosts([]);
        oldPageValue.current = -1;
        setPage(0);
        execAndHandlerLoadPosts(true);
        setSearchPosts(false);
    }

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

    const onDeletedPost = (index: number) => {
        setRequireRefreshPost(true);
    }

    return <div className="post-scroller-main-div">
        <Toast ref={toast}/>
        {posts.map(((post, index) => <div id={`post-${index}`} key={index.toString()} ref={(el) => {
            if (index === posts.length - 1) {
                loadMoreRef.current = el;
                setRefVisible(!!el);
            }
        }}>
            <PostView post={post} index={index} user={user} onDeletedPost={onDeletedPost}
                      setRequireRefreshPost={setRequireRefreshPost}/>
        </div>))}
        {emptyValue()}
        {loading && <p>Loading...</p>}
    </div>
}

export default PostScroller;
