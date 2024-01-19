import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/actions";

import { postsState$ } from "../../../redux/selectors";
import { format } from "date-fns";

export default function PostList() {
    const dispatch = useDispatch();
    const posts = useSelector(postsState$);

    React.useEffect(() => {
        dispatch(actions.getPosts.getPostsRequest());
    }, [dispatch]);

    return (
        <>
            <section className="vh-100" style={{ backgroundColor: "#eee" }}>
                <div className="container py-5">
                    <div className="row d-flex align-items-center h-100">
                        {posts.map((post) => (
                            <div className="col col-lg-6">
                                <figure
                                    className="bg-white p-3 rounded"
                                    style={{
                                        borderLeft: ".25rem solid #a34e78;",
                                    }}
                                >
                                    <blockquote className="blockquote pb-2">
                                        <p>{post.content}</p>
                                    </blockquote>
                                    <div className="d-flex justify-content-between">
                                        <blockquote className="font-italic">
                                            {post.createBy}
                                        </blockquote>
                                        <blockquote className="blockquote pb-2">
                                            <p>
                                                {format(
                                                    post.createdAt,
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
            </section>
        </>
    );
}
