import React from "react";
import moment from 'moment';
import { useDispatch } from "react-redux";
import { updatePost } from "../../../redux/actions";


export default function Post({post}){
    const dispatch = useDispatch();

    const onLikeBtnClick = React.useCallback(()=> {
        dispatch(updatePost.updatePostRequest({...post, likeCount: post.likeCount + 1}));
    },[dispatch,post]);

    // return <Card>
    //     <CardHeader 
    //     avatar = {<Avatar>A</Avatar>}
    //     title={post.author}
    //     subheader = {moment(post.updatedAt).format('YYYY-MM-DD HH:MM ')}
    //     action={
    //         <IconButton>
    //            <MoreVertIcon/> 
    //         </IconButton>
    //     }
    //     />

    //     <CardMedia image = {post.attachment} title='Title'/>
    //     <CardContent>
    //         <Typography variant='h5' color='textPrimary'>
    //             {post.title}
    //         </Typography>
    //         <Typography variant='boby2' component="p" color='textSecondary'>
    //             {post.content}
    //         </Typography>
    //     </CardContent>

    //     <CardActions>
    //         <IconButton onClick={onLikeBtnClick}>
    //             <FavoriteIcon/>
    //             <Typography component="span" color="textSecondary">
    //                 {`${post.likeCount} likes`}
    //             </Typography>
    //         </IconButton>
    //     </CardActions>
    // </Card>
}