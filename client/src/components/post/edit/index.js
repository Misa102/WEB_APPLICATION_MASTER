import React, { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { modal, createPost, detailPost } from "../../../redux/actions";
import { modalState$, postsStateError$ } from "../../../redux/selectors";
import { Navigate } from "react-router-dom";
import Icon from "../../icon";

import { useParams } from 'react-router';
import { resultGetDetailPost$ } from "../../../redux/selectors/post.selector";

export default function EditPost() {
    const params = useParams();
    const dispatch = useDispatch();

    const resultGetDetailPostSelector = useSelector(resultGetDetailPost$);

    useEffect(() => {
        dispatch(detailPost.actionGetDetailPost(params.id));
    }, [dispatch]);
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-lg-6 col-xxl-4 mx-auto my-3">
                        <div className="card shadow-sm border-0 rounded-2 h-100">
                            <div className="card-header p-4 pb-0 bg-transparent border-0 d-flex align-items-center">
                                <h5>test</h5>
                            </div>
                            <div className="card-body p-3 p-md-5">
                                <div className="row row-cols-1 g-3">
                                    <div className="col">
                                        <label className="form-label">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="title"
                                            placeholder="Enter title"
                                            value={resultGetDetailPostSelector.title}
                                        />
                                    </div>
                                    <div className="col">
                                        <label className="form-label">
                                            Content
                                        </label>
                                        <textarea
                                            type="text"
                                            class="form-control"
                                            id="content"
                                            placeholder="Enter content"
                                            value={resultGetDetailPostSelector.content}
                                        ></textarea>
                                    </div>
                                    <div className="d-flex justify-content-end px-md-3">
                                        <button className="btn btn-primary btn-lg">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
