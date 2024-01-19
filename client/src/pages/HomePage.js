import React from "react";
import PostList from "../components/post/list";
import SavePost from "../components/post/save";

export default function HomePage() {
    return (
        <>
            <PostList/>
            <SavePost/>
        </>
    );
}
