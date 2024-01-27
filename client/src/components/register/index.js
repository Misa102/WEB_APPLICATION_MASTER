import React, { useCallback, useEffect, useState } from "react";
import Icon from "../icon";
import { useDispatch, useSelector } from "react-redux";
import { authState$, resultRegister$ } from "../../redux/selectors";
import * as actions from "../../redux/actions";

export default function Register() {
    const [request, setData] = useState({
        username: "",
        email: "",
        password: "",
        roles: ["user"],
    });

    const [msgUsername, setMsgUsername] = useState("");
    const [msgEmail, setMsgEmail] = useState("");
    const [msgPassword, setMsgPassword] = useState("");
    const [msgRegister, setMessage] = useState("");

    const dispatch = useDispatch();
    const resultRegisterSelector = useSelector(resultRegister$);
    const auth = useSelector(authState$);

    useEffect(() => {
        if (resultRegisterSelector === 201) {
            setMessage("register successfully");
            dispatch(
                actions.authAction.actionLogin({
                    username: request.username,
                    password: request.password,
                })
            );
            setTimeout(() => {
                setMessage("");
            }, 4000);
        } else if (
            resultRegisterSelector !== 0 &&
            resultRegisterSelector !== 200
        ) {
            setMessage("register failed");
            setTimeout(() => {
                setMessage("");
            }, 4000);
        }
    }, [resultRegisterSelector]);

    useEffect(() => {
        if (request.email === "") {
            setMsgEmail("Email does not valid");
        } else {
            setMsgEmail("");
        }

        if (request.username === "") {
            setMsgUsername("Username does not valid");
        } else {
            setMsgUsername("");
        }

        if (request.password.length < 4) {
            setMsgPassword("Password must be greater than 4");
        } else {
            setMsgPassword("");
        }
    }, [request]);

    const onRegister = useCallback(() => {
        if (
            request.email.length > 0 &&
            request.username.length > 0 &&
            request.password.length >= 4
        ) {
            dispatch(actions.registerAction.actionRegister(request));
        }
    });

    
    useEffect(() => {
        if (auth.response !== undefined && auth.response.id !== undefined) {
            dispatch(actions.authAction.actionLoginSuccess(undefined));
            window.location.href = "/";
        }
    }, [dispatch, auth]);

    return (
        <>
            <div class="bg-light py-3 py-md-5">
                <div class="container">
                    <div class="row justify-content-md-center">
                        <div class="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
                            <div class="bg-white p-4 p-md-5 rounded shadow-sm">
                                <span className="text-danger">
                                    {msgRegister}
                                </span>
                                <div class="row gy-3 gy-md-4 overflow-hidden">
                                    <div class="col-12">
                                        <label for="name" class="form-label">
                                            Nom{" "}
                                            <span class="text-danger">*</span>
                                        </label>
                                        <div class="input-group">
                                            <span class="input-group-text">
                                                <Icon iconName="person" />
                                            </span>
                                            <input
                                                type="name"
                                                class="form-control"
                                                name="name"
                                                value={request.username}
                                                onChange={(e) =>
                                                    setData({
                                                        ...request,
                                                        username:
                                                            e.target.value,
                                                    })
                                                }
                                                required
                                            />
                                        </div>
                                        <span className="text-danger">
                                            {msgUsername}
                                        </span>
                                    </div>

                                    <div class="col-12">
                                        <label for="email" class="form-label">
                                            Email{" "}
                                            <span class="text-danger">*</span>
                                        </label>
                                        <div class="input-group">
                                            <span class="input-group-text">
                                                <Icon iconName="mail" />
                                            </span>
                                            <input
                                                type="email"
                                                class="form-control"
                                                name="email"
                                                value={request.email}
                                                onChange={(e) =>
                                                    setData({
                                                        ...request,
                                                        email: e.target.value,
                                                    })
                                                }
                                                required
                                            />
                                        </div>
                                        <span className="text-danger">
                                            {msgEmail}
                                        </span>
                                    </div>

                                    <div class="col-12">
                                        <label
                                            for="password"
                                            class="form-label"
                                        >
                                            Password{" "}
                                            <span class="text-danger">*</span>
                                        </label>
                                        <div class="input-group">
                                            <span class="input-group-text">
                                                <Icon iconName="key" />
                                            </span>
                                            <input
                                                type="password"
                                                class="form-control"
                                                name="password"
                                                value={request.password}
                                                onChange={(e) =>
                                                    setData({
                                                        ...request,
                                                        password:
                                                            e.target.value,
                                                    })
                                                }
                                                required
                                            />
                                        </div>
                                        <span className="text-danger">
                                            {msgPassword}
                                        </span>
                                    </div>

                                    <div class="col-12">
                                        <div class="d-grid">
                                            <button
                                                class="btn btn-primary btn-lg"
                                                onClick={onRegister}
                                            >
                                                S'inscrire
                                            </button>
                                        </div>
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
