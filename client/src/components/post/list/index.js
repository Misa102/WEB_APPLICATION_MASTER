import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/actions";

import {
    currentPost$,
    mapLikePost$,
    mapTotalLikePost$,
    postsState$,
    resultDeleteLikePost$,
    resultSaveLikePost$,
} from "../../../redux/selectors";
import { format } from "date-fns";
import Icon from "../../icon";

function LikePost({ postId }) {
    const posts = useSelector(postsState$);
    const mapLikePostSelector = useSelector(mapLikePost$);
    const mapTotalLikePostSelector = useSelector(mapTotalLikePost$);
    const resultSaveLikePost = useSelector(resultSaveLikePost$);
    const resultDeleteLikePost = useSelector(resultDeleteLikePost$);
    const currentPost = useSelector(currentPost$);

    const [disabled, setDisable] = useState(false);

    const dispatch = useDispatch();

    let likeList = new Map();
    let totalLikeList = new Map();

    useEffect(() => {
        if((resultSaveLikePost === 201 || resultDeleteLikePost === 200) && postId === currentPost) {
            dispatch(actions.deleteLikePostAction.actionDeleteLikePostSuccess(""));
            dispatch(actions.saveLikePostAction.actionSaveLikePostSuccess(""));
            dispatch(actions.currentPostAction.actionSaveCurrentPost(""));
            setDisable(false);
        }
        
      }, [dispatch, disabled, resultDeleteLikePost, resultSaveLikePost]);
    

    useEffect(() => {
        if (posts !== undefined) {
            posts.forEach((v) => {
                likeList.set(v.id, v.isLike);
                totalLikeList.set(v.id, v.totalLike);
            });
            dispatch(actions.mapLikePostAction.actionMapLikePost(likeList));
            dispatch(
                actions.mapTotalLikePostAction.actionMapTotalLikePost(
                    totalLikeList
                )
            );
        }
    }, []);

    const savePostLike = useCallback(() => {
        setDisable(true);

        likeList = new Map();
        totalLikeList = new Map();

        mapTotalLikePostSelector.forEach((value, key) => {
            totalLikeList.set(key, value);
        });
        totalLikeList.set(postId, totalLikeList.get(postId) + 1);
        dispatch(
            actions.mapTotalLikePostAction.actionMapTotalLikePost(totalLikeList)
        );

        mapLikePostSelector.forEach((value, key) => {
            likeList.set(key, value);
        });

        likeList.set(postId, true);
        dispatch(actions.mapLikePostAction.actionMapLikePost(likeList));

        dispatch(actions.currentPostAction.actionSaveCurrentPost(postId));

        dispatch(
            actions.saveLikePostAction.actionSaveLikePost({ postId: postId })
        );
    });

    const deletePostLike = useCallback(() => {
        setDisable(true);

        likeList = new Map();
        totalLikeList = new Map();

        mapTotalLikePostSelector.forEach((value, key) => {
            totalLikeList.set(key, value);
        });
        totalLikeList.set(postId, totalLikeList.get(postId) - 1);
        dispatch(
            actions.mapTotalLikePostAction.actionMapTotalLikePost(totalLikeList)
        );

        mapLikePostSelector.forEach((value, key) => {
            likeList.set(key, value);
        });
        likeList.set(postId, false);

        dispatch(actions.mapLikePostAction.actionMapLikePost(likeList));

        dispatch(actions.currentPostAction.actionSaveCurrentPost(postId));
        dispatch(
            actions.deleteLikePostAction.actionDeleteLikePost({
                postId: postId,
            })
        );
    });

    if (
        mapLikePostSelector !== undefined &&
        mapTotalLikePostSelector !== undefined
    ) {
        const likePostItem = mapLikePostSelector.get(postId);
        const totalLikePostItem = mapTotalLikePostSelector.get(postId);

        if (likePostItem) {
            return (
                <>
                    <button
                        className="btn btn-lg"
                        onClick={deletePostLike}
                        disabled={disabled}
                    >
                        <Icon
                            iconName="favorite"
                            color={likePostItem ? "red" : ""}
                        />
                    </button>
                    <div className="mt-1 ms-2">
                        <p>
                            {totalLikePostItem > 1
                                ? totalLikePostItem + "likes"
                                : totalLikePostItem + "like"}
                        </p>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <button
                        className="btn btn-lg"
                        onClick={savePostLike}
                        disabled={disabled}
                    >
                        <Icon
                            iconName="favorite"
                            color={likePostItem ? "red" : ""}
                        />
                    </button>
                    <div className="mt-1 ms-2">
                        <p>
                            {totalLikePostItem > 1
                                ? totalLikePostItem + "likes"
                                : totalLikePostItem + "like"}
                        </p>
                    </div>
                </>
            );
        }
    }
}

export default function PostList() {
    const dispatch = useDispatch();
    const posts = useSelector(postsState$);

    React.useEffect(() => {
        dispatch(actions.getPosts.getPostsRequest());
    }, [dispatch]);

    return (
        <>
            <div style={{ backgroundColor: "#eee" }}>
                <div className="container py-5">
                    <div className="row d-flex h-100 row-cols-2 g-4">
                        {posts.map((post) => (
                            <div className="col col-lg-6 col-md-6">
                                <figure
                                    className="bg-white p-3 rounded h-100"
                                    style={{
                                        borderLeft: ".25rem solid #a34e78;",
                                    }}
                                >
                                    <blockquote className="blockquote pb-2">
                                        <p>{post.content}</p>

                                        <div className="d-flex">
                                            <LikePost postId={post.id} />
                                        </div>
                                    </blockquote>
                                    <div className="d-flex justify-content-between">
                                        <blockquote className="font-italic">
                                            {post.createBy}
                                        </blockquote>
                                        <blockquote className="blockquote pb-2">
                                            <p>
                                                {format(
                                                    post.modifiedAt,
                                                    "yyyy-MM-dd"
                                                )}
                                            </p>
                                        </blockquote>
                                    </div>
                                </figure>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
