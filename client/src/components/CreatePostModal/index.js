import React from "react";
import { Button, TextField, TextareaAutosize } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { modalState$ } from '../../redux/selectors';
import useStyles from './styles';
import { createPost, modal } from "../../redux/actions";

export default function CreatePostModal() {
    const [data, setData] = React.useState({
        title: '',
        content: '',
    })
    const dispatch = useDispatch();
    // const { isShow } = useSelector(modalState$);
    const classes = useStyles();
    useSelector(modalState$ => {
        console.log(modalState$)
    });

    const onClose = React.useCallback(()=>{
        dispatch(modal.hideModal('createPost'));

        setData({
            title: '',
            content: '',
        })
    }, [dispatch]);

    const onSubmit = React.useCallback(()=>{
        dispatch(createPost.createPostRequest(data));
        onClose();
    }, [data,dispatch]);

    const body = (
        <div className={classes.paper} id="simple-model-title">
            <h2>Créer nouvelle ciation</h2>
            <form noValidate autoComplete="off" className={classes.form}> 
                <TextField
                    className={classes.title}
                    required
                    label='Titre'
                    value={data.title}
                    onChange={(e) => setData({...data, title: e.target.value})}
                /> 
                <TextareaAutosize
                    className={classes.textarea}
                    rowsMin={10}
                    rowsMax={15}
                    placeholder="Contenu de ciation..."
                    value={data.content}
                    onChange={(e) => setData({...data, content: e.target.value})}
                />
                <div className={classes.footer}>
                    <Button
                        variant="contained"
                        color = 'primary' 
                        component='span' 
                        fullWidth
                        onClick={onSubmit}
                        >
                            Créer
                    </Button>
                </div>
            </form>
        </div>
    );

    const modalBody = (
        <div class="modal fade" id="createPost" tabindex="-1" aria-labelledby="createPost" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5">Create post</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                    <div className="mb-3">
                        <label for="title">Title</label>
                        <input type="text" className="form-control" id="title" value={data.title} onChange={(e) => setData({...data, title: e.target.value})}/>
                    </div>
                    <div className="mb-3">
                        <label for="content">Content</label>
                        <textarea className="form-control" id="content" value={data.content} onChange={(e) => setData({...data, content: e.target.value})}></textarea>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onClick={onSubmit}>Save</button>
            </div>
            </div>
        </div>
        </div>
    );

    return(
        <div>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createPost">
            Create Post
        </button>

        {modalBody}
        </div>
        
    )
}