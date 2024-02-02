import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/actions";
import { Link, useNavigate } from "react-router-dom";
import {
    FacebookIcon,
    FacebookShareButton,
    TwitterIcon,
    TwitterShareButton,
} from "react-share";
import {
    currentPost$,
    mapLikePost$,
    mapTotalLikePost$,
    postsState$,
    resultDeleteLikePost$,
    resultDeletePost$,
    resultSaveLikePost$,
} from "../../../redux/selectors";
import { format } from "date-fns";
import Icon from "../../icon";
import authUtils, { isAdmin } from "../../../utils/auth.util";
import validationUtils from "../../../utils/validation.util";

function Action({ postId, userId }) {
    const dispatch = useDispatch();
    let user = authUtils.getUser();
    const resultDeletePostSelector = useSelector(resultDeletePost$);

    useEffect(() => {
        if (resultDeletePostSelector === 200) {
            dispatch(actions.getPosts.getPostsRequest({searchValue: ""}));
            dispatch(actions.deletePost.actionDeletePostSuccess(0));
        }
    }, [dispatch, resultDeletePostSelector]);

    const onDelete = useCallback(() => {
        dispatch(actions.deletePost.actionDeletePost({ postId: postId }));
    });

    if (validationUtils.isNotNullAndNotUndefined(user)) {
        if (userId === user.id || isAdmin()) {
            return (
                <>
                    <div className="dropdown">
                        <button
                            className="bg-transparent border-0"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <Icon iconName="more_horiz" />
                        </button>

                        <ul class="dropdown-menu">
                            <li
                                className="dropdown-item d-flex"
                                onClick={onDelete}
                            >
                                <Icon iconName="delete" />
                                <span>Supprimer</span>
                            </li>
                            <li className="dropdown-item">
                                <Link
                                    to={"/quotes/" + postId}
                                    className="text-decoration-none color-unset"
                                >
                                    <div className="d-flex">
                                        <Icon iconName="edit" />
                                        <span>Modifier</span>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </>
            );
        }
    }
}

function LikePost({ postId }) {
    const posts = useSelector(postsState$);
    const mapLikePostSelector = useSelector(mapLikePost$);
    const mapTotalLikePostSelector = useSelector(mapTotalLikePost$);
    const resultSaveLikePost = useSelector(resultSaveLikePost$);
    const resultDeleteLikePost = useSelector(resultDeleteLikePost$);
    const currentPost = useSelector(currentPost$);
    const isLogin = authUtils.isLogin();
    const navigate = useNavigate();

    const [disabled, setDisable] = useState(false);

    const dispatch = useDispatch();

    let likeList = new Map();
    let totalLikeList = new Map();

    useEffect(() => {
        if (
            (resultSaveLikePost === 201 || resultDeleteLikePost === 200) &&
            postId === currentPost
        ) {
            dispatch(
                actions.deleteLikePostAction.actionDeleteLikePostSuccess("")
            );
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
        if (!isLogin) {
            navigate("/auth/login");
        } else {
            setDisable(true);

            likeList = new Map();
            totalLikeList = new Map();

            mapTotalLikePostSelector.forEach((value, key) => {
                totalLikeList.set(key, value);
            });
            totalLikeList.set(postId, totalLikeList.get(postId) + 1);
            dispatch(
                actions.mapTotalLikePostAction.actionMapTotalLikePost(
                    totalLikeList
                )
            );

            mapLikePostSelector.forEach((value, key) => {
                likeList.set(key, value);
            });

            likeList.set(postId, true);
            dispatch(actions.mapLikePostAction.actionMapLikePost(likeList));

            dispatch(actions.currentPostAction.actionSaveCurrentPost(postId));

            dispatch(
                actions.saveLikePostAction.actionSaveLikePost({
                    postId: postId,
                })
            );
        }
    });

    const deletePostLike = useCallback(() => {
        if (!isLogin) {
            navigate("/auth/login");
        } else {
            setDisable(true);

            likeList = new Map();
            totalLikeList = new Map();

            mapTotalLikePostSelector.forEach((value, key) => {
                totalLikeList.set(key, value);
            });
            totalLikeList.set(postId, totalLikeList.get(postId) - 1);
            dispatch(
                actions.mapTotalLikePostAction.actionMapTotalLikePost(
                    totalLikeList
                )
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
        }
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
                    <dt className="visually-hidden">icon</dt>
                    <dd className="col-auto px-0">
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
                    </dd>
                    <dt className="visually-hidden">total Like</dt>
                    <dd className="col-auto px-0 mt-2">
                        <p>
                            {totalLikePostItem > 1
                                ? totalLikePostItem + "likes"
                                : totalLikePostItem + "like"}
                        </p>
                    </dd>
                </>
            );
        } else {
            return (
                <>
                    <dt className="visually-hidden">icon</dt>
                    <dd className="col-auto px-0">
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
                    </dd>
                    <dt className="visually-hidden">total Like</dt>
                    <dd className="col-auto px-0 mt-2">
                        <p>
                            {totalLikePostItem > 1
                                ? totalLikePostItem + "likes"
                                : totalLikePostItem + "like"}
                        </p>
                    </dd>
                </>
            );
        }
    }
}

function Share({content}) {
    return (
        <>
            <div className="dropdown">
                <button
                    className="bg-transparent border-0"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <Icon iconName="share"></Icon>
                </button>

                <ul class="dropdown-menu">
                    <li className="dropdown-item">
                        <FacebookShareButton 
                        url="https://www.facebook.com/"
                        quote={content}
                        className="Demo__some-network__share-button">
                            <FacebookIcon size={32} round />
                            Facebook
                        </FacebookShareButton>
                    </li>
                    <li className="dropdown-item">
                        <TwitterShareButton
                        url="https://twitter.com/"
                        title={content}
                        >
                            <TwitterIcon size={32} round />
                            Twitter
                        </TwitterShareButton>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default function PostList() {
    const dispatch = useDispatch();
    const posts = useSelector(postsState$);

    React.useEffect(() => {
        dispatch(actions.getPosts.getPostsRequest({ searchValue: "" }));
    }, [dispatch]);

    return (
        <>
            <div
                style={{ backgroundColor: "#eee" }}
                className="cursor-pointer"
            >
                <div className="container py-5">
                    <div className="row d-flex h-100 row-cols-2 g-4">
                        {posts.map((post) => (
                            <div className="col col-lg-6 col-md-6">
                                <figure
                                    className="bg-white p-3 rounded h-100 d-flex flex-column justify-content-between"
                                    style={{
                                        borderLeft: ".25rem solid #a34e78;",
                                    }}
                                >
                                    <div className="d-flex">
                                        <div className="blockquote pb-2 flex-grow-1">
                                            <p>{post.content}</p>
                                        </div>
                                        <Action
                                            postId={post.id}
                                            userId={post.userId}
                                        />
                                    </div>

                                    <div>
                                        <hr />
                                        <div className="row row-cols-auto d-flex justify-content-between align-items-baseline">
                                            <blockquote className="font-italic col">
                                                {post.createBy}
                                            </blockquote>
                                            <div className="d-flex col">
                                                <dl className="row px-2">
                                                    <LikePost
                                                        postId={post.id}
                                                    />
                                                </dl>
                                            </div>
                                            <div className="col">
                                                <Share content={post.content}/>
                                            </div>
                                            <blockquote className="blockquote pb-2 col">
                                                <p>
                                                    {format(
                                                        post.modifiedAt,
                                                        "yyyy-MM-dd"
                                                    )}
                                                </p>
                                            </blockquote>
                                        </div>
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
