import React, { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { detailPost, updatePost } from "../../../redux/actions";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router";
import {
    resultGetDetailPost$,
    resultUpdatePost$,
} from "../../../redux/selectors/post.selector";
import validationUtils from "../../../utils/validation.util";

export default function EditPost() {
    const [dataUpdate, setDataUpdate] = useState({
        content: "",
        postId: "",
    });

    const [msgUpdate, setMessage] = useState("");

    const navigate = useNavigate();

    const params = useParams();
    const dispatch = useDispatch();

    const resultGetDetailPostSelector = useSelector(resultGetDetailPost$);
    const resultUpdatePostSelector = useSelector(resultUpdatePost$);

    useEffect(() => {
        if (resultUpdatePostSelector === 200) {
            setMessage("Update successfully!");
            dispatch(updatePost.actionUpdatePostSuccess(0));
            setTimeout(() => {
                setMessage("");
                navigate("/");
            }, 1000);
        } else if (
            resultUpdatePostSelector !== 0 &&
            resultUpdatePostSelector !== 200
        ) {
            setMessage("Update failed!");
            setTimeout(() => {
                setMessage("");
            }, 1000);
        }
    }, [dispatch, resultUpdatePostSelector]);

    useEffect(() => {
        if (
            validationUtils.isNotNullAndNotUndefined(
                resultGetDetailPostSelector
            )
        ) {
            setDataUpdate({
                content: resultGetDetailPostSelector.content,
                postId: params.id,
            });
        }
    }, [resultGetDetailPostSelector]);

    const onUpdate = useCallback(() => {
        dispatch(updatePost.actionUpdatePost(dataUpdate));
    });

    useEffect(() => {
        dispatch(detailPost.actionGetDetailPost(params.id));
    }, [dispatch, params.id]);
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-lg-6 col-xxl-4 mx-auto my-3">
                        <div className="card shadow-sm border-0 rounded-2 h-100">
                            <div className="card-header p-4 pb-0 bg-transparent border-0 d-flex align-items-center">
                                <h5>Mise à jour citation</h5>
                            </div>

                            <div className="card-body p-3 p-md-5">
                                <span className="text-danger">{msgUpdate}</span>
                                <div className="row row-cols-1 g-3">
                                    <div className="col">
                                        <label className="form-label">
                                            Contenu
                                        </label>
                                        <textarea
                                            type="text"
                                            class="form-control"
                                            id="content"
                                            placeholder="Enter content"
                                            value={dataUpdate.content}
                                            onChange={(e) =>
                                                setDataUpdate({
                                                    ...dataUpdate,
                                                    content: e.target.value,
                                                })
                                            }
                                        ></textarea>
                                    </div>
                                    <div className="d-flex justify-content-end px-md-3">
                                        <button
                                            className="btn btn-primary btn-lg"
                                            onClick={onUpdate}
                                        >
                                            Sauvegarder
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
