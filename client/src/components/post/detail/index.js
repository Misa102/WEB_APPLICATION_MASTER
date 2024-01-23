import React, {useCallback, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { modal, createPost } from "../../../redux/actions";
import { modalState$, postsStateError$ } from "../../../redux/selectors";
import { Navigate } from "react-router-dom";
import Icon from "../../icon";


export default function DetailPost() {

    return (
        <>
            <div>
                test
            </div>
        </>
    );
}
