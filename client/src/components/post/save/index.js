import React, {useCallback, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { modal, createPost } from "../../../redux/actions";
import { modalState$, postsStateError$ } from "../../../redux/selectors";
import { Navigate } from "react-router-dom";
import Icon from "../../icon";

function NavigationToLogin() {
    const error = useSelector(postsStateError$);
    const dispatch = useDispatch();
    if(error !== undefined) {
        dispatch(createPost.createPostFailure(undefined));
        return (<Navigate replace to="/auth/login" />)
    }
}

function CheckCloseModal() {
    const dispatch = useDispatch();
    const postModal = useSelector(modalState$);
    if (!postModal.isShow && postModal.id !== null && postModal !== undefined) {
        let btn = document.getElementById("closePost");
        if ((btn !== null) & (btn !== undefined)) {
            dispatch(modal.showModal("closePost"));
            btn.click();
        }
    }
}

export default function SavePost() {
    const [request, setData] = useState({
        title: ""
    });
    const dispatch = useDispatch();

    const onClose = useCallback(() => {
        dispatch(modal.hideModal("closePost"));

        setData({
            title: ""
        });
    }, [dispatch]);

    const onSubmit = useCallback(() => {
        dispatch(createPost.createPostRequest(request));
        onClose();
    }, [request, dispatch]);

    const modalBody = (
        <div
            class="modal fade"
            id="createPost"
            tabindex="-1"
            aria-labelledby="createPost"
            aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">Creer post</h1>
                        <button
                            id="closePost"
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div className="mb-3">
                                <label for="content">Contenu</label>
                                <textarea
                                    className="form-control"
                                    id="content"
                                    value={request.content}
                                    onChange={(e) =>
                                        setData({
                                            ...request,
                                            content: e.target.value,
                                        })
                                    }
                                ></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Fermer
                        </button>
                        <button
                            type="button"
                            class="btn btn-primary"
                            onClick={onSubmit}
                        >
                            Sauvegarder
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <div class="position-fixed bottom-0 end-0 rounded-circle m-5">
                <button
                    type="button"
                    class="btn btn-success btn-lg"
                    data-bs-toggle="modal"
                    data-bs-target="#createPost"
                    iconName="save"
                >
                    <Icon iconName="save" />
                    <span class="visually-hidden">Ajouter Category</span>
                </button>
            </div>
            {modalBody}
            <NavigationToLogin/>
            <CheckCloseModal/>
        </>
    );
}
