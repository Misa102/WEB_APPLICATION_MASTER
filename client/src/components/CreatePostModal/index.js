import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { modal, createPost } from "../../redux/actions";

import { modalState$ } from "../../redux/selectors";

export default function CreatePostModal() {
    const [data, setData] = React.useState({
        title: '',
        content: '',
    })
    const dispatch = useDispatch();
    const postModal = useSelector(modalState$);
    if(!postModal.isShow && postModal.id !== null && postModal !== undefined) {
        let btn = document.getElementById('closePost');
        if(btn !== null & btn !== undefined) {
            btn.click();
            dispatch(modal.showModal('closePost'));
        }
    }

    const onClose = React.useCallback(() => {
        dispatch(modal.hideModal('closePost'));

        setData({
            title: '',
            content: '',
        })
    }, [dispatch]);

    const onSubmit = React.useCallback(()=>{
        dispatch(createPost.createPostRequest(data));
        onClose();
    }, [ data, dispatch ]);

    const modalBody = (
        <div class="modal fade" id="createPost" tabindex="-1" aria-labelledby="createPost" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5">Create post</h1>
                <button id="closePost" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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