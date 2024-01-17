import React from "react";
import { Container, Fab } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { useDispatch } from "react-redux";


import Header from "../components/Header";
import PostList from "../components/PostList";
import useStyles from './styles';
import CreatePostModal from "../components/CreatePostModal";

export default function QuotesPage(){
    const classes = useStyles();
    const dispatch = useDispatch();

    const openCreatePostModel = React.useCallback(()=>{
        // dispatch(showModal());
    }, [dispatch]);

    return <Container maxWidth = "lg">
        <Header/>
        <PostList/>
        <CreatePostModal/>


        <Fab color='primary' className={classes.fab} onClick={openCreatePostModel}>
            <AddIcon/>
        </Fab>
    </Container>
}