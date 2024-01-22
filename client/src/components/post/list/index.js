import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/actions";

import { mapLikePost$, postsState$ } from "../../../redux/selectors";
import { format } from "date-fns";
import Icon from "../../icon";

function LikePost({ postId }) {
    const posts = useSelector(postsState$);
    const mapLikePostSelector = useSelector(mapLikePost$);
    const dispatch = useDispatch();

    const likeList = new Map();
    useEffect(() => {
        if (posts !== undefined) {
            posts.forEach((v) => {
                likeList.set(v.id, v.isLike);
            });
            dispatch(actions.mapLikePostAction.actionMapLikePost(likeList));
        }
    }, []);

    const savePostLike = useCallback(() => {
        posts.forEach((v) => {
            likeList.set(v.id, v.isLike);
        });

        likeList.set(postId, true);
        dispatch(actions.mapLikePostAction.actionMapLikePost(likeList));
        dispatch(
            actions.saveLikePostAction.actionSaveLikePost({ postId: postId })
        );
    });

    const deletePostLike = useCallback(() => {
        posts.forEach((v) => {
            likeList.set(v.id, v.isLike);
        });
        likeList.set(postId, false);
        dispatch(actions.mapLikePostAction.actionMapLikePost(likeList));
        dispatch(
            actions.deleteLikePostAction.actionDeleteLikePost({
                postId: postId,
            })
        );
    });

    if (mapLikePostSelector !== undefined) {
        const likePostItem = mapLikePostSelector.get(postId);
        if (likePostItem) {
            return (
                <div className="mt-1" role="button" onClick={deletePostLike}>
                    <Icon
                        iconName="favorite"
                        color={likePostItem ? "red" : ""}
                    />
                </div>
            );
        } else {
            return (
                <div className="mt-1" role="button" onClick={savePostLike}>
                    <Icon
                        iconName="favorite"
                        color={likePostItem ? "red" : ""}
                    />
                </div>
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
                    <div className="row d-flex align-items-center h-100">
                        {posts.map((post) => (
                            <div className="col col-lg-6 col-md-6">
                                <figure
                                    className="bg-white p-3 rounded"
                                    style={{
                                        borderLeft: ".25rem solid #a34e78;",
                                    }}
                                >
                                    <blockquote className="blockquote pb-2">
                                        <p>{post.content}</p>

                                        <div className="d-flex">
                                            <LikePost postId={post.id} />
                                            <div>
                                                <p>{post.totalLike}</p>
                                            </div>
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
