import React from "react";
import { Container, Fab } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { useDispatch } from "react-redux";


import Header from "../components/Header";
import PostList from "../components/PostList";
import useStyles from './styles';
import { showModel } from "../redux/actions";
import CreatePostModel from "../components/CreatePostModel";

export default function QuotesPage(){
    const classes = useStyles();
    const dispatch = useDispatch();

    const openCreatePostModel = React.useCallback(()=>{
        dispatch(showModel());
    }, [dispatch]);

    return <Container maxWidth = "lg">
        <Header/>
        <PostList/>
        <CreatePostModel/>


        <Fab color='primary' className={classes.fab} onClick={openCreatePostModel}>
            <AddIcon/>
        </Fab>
    </Container>
}