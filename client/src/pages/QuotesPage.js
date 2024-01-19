import React from "react";
import { useDispatch } from "react-redux";


// import Header from "../components/Header";
// import PostList from "../components/PostList";
// import CreatePostModal from "../components/CreatePostModal";
// import PostList from "../components/PostList";
// import CreatePostModal from "../components/CreatePostModal";
import PostList from "../components/post/list";

export default function QuotesPage(){
    const dispatch = useDispatch();

    const openCreatePostModel = React.useCallback(()=>{
        // dispatch(showModal());
    }, [dispatch]);

    // return <Container maxWidth = "lg">
    //     <Header/>
    //     <PostList/>
    //     <CreatePostModal/>


    //     <Fab color='primary' className={classes.fab} onClick={openCreatePostModel}>
    //         <AddIcon/>
    //     </Fab>
    // </Container>

    return (
        <PostList/>
    );

}