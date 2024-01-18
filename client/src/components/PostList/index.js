import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";

import { postsState$ } from "../../redux/selectors";

export default function PostList() {
    const dispatch = useDispatch();
    const posts = useSelector(postsState$);

    console.log("[PostList - posts]", posts);

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
                                    <figcaption className="blockquote-footer mb-0 font-italic">
                                        {post.createBy}
                                    </figcaption>
                                </figure>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
