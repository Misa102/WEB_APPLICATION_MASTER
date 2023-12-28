import React from "react";
import { Button, Modal, TextField, TextareaAutosize } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { modelState$ } from '../../redux/selectors';
import useStyles from './styles';
import { hideModel } from "../../redux/actions";
import { createPost } from "../../redux/actions";

export default function CreatePostModel(){
    const [data, setData] = React.useState({
        title: '',
        content: '',
    })
    const dispatch = useDispatch();
    const { isShow } = useSelector(modelState$);
    const classes = useStyles();

    const onClose = React.useCallback(()=>{
        dispatch(hideModel());
    }, [dispatch]);

    const onSubmit = React.useCallback(()=>{
        console.log({data})
        dispatch(createPost.createPostRequest(data));
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

    return(
        <div>
            <Modal open ={isShow} onClose={onClose}>
                {body}
            </Modal>
        </div>
    )
}