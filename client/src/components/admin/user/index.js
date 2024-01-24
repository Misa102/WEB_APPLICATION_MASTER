import { useDispatch, useSelector } from "react-redux";
import { listUser$, resultUpdateStatusUser$ } from "../../../redux/selectors";
import { useCallback, useEffect, useState } from "react";
import * as actions from "../../../redux/actions";

function StatusUser({ status, userId }) {
    const dispatch = useDispatch();
    
    const onUpdateStatus = useCallback(() => {
        dispatch(actions.updateStatusUser.actionUpdateStatusUser({status: status === 1 ? 0 : 1, userId: userId}));
    });

    if (status === 0) {
        return <button className="btn btn-danger" onClick={onUpdateStatus}>Disabled</button>;
    }
    return <button className="btn btn-success" onClick={onUpdateStatus}>Activated</button>;
}

export default function ManagementUser() {
    const dispatch = useDispatch();
    const userListSelector = useSelector(listUser$);
    const resultUpdateStatusSelector = useSelector(resultUpdateStatusUser$);

    const [msgUpdate, setMessage] = useState("");

    useEffect(() => {
        if (resultUpdateStatusSelector === 200) {
            setMessage("update success");
            dispatch(actions.updateStatusUser.actionUpdateStatusUserSuccess(0));
            dispatch(actions.getAllUser.actionGetAllUser());
            setTimeout(() => {
                setMessage("");
            }, 4000);
        } else if (
            resultUpdateStatusSelector !== 0 &&
            resultUpdateStatusSelector !== 200
        ) {

            dispatch(actions.updateStatusUser.actionUpdateStatusUserSuccess(0));
            setMessage("update failed");
            setTimeout(() => {
                setMessage("");
            }, 4000);
        }
    }, [dispatch, resultUpdateStatusSelector]);

    useEffect(() => {
        dispatch(actions.getAllUser.actionGetAllUser());
    }, [dispatch]);

    return (
        <>
            <div className="container vh-100">
                <div className="row">
                    <div className="col-12">
                        <div className="row h-100 flex-grow-1">
                            <div className="col-12 py-3">
                                <div className="row g-4">
                                    <div className="mb-3">
                                        <div className="card shadow-sm border-0 rounded-2">
                                            <div className="card-body">
                                                <div className="card-text mb-3">
                                                    Users
                                                </div>
                                                <span className="text-danger">{msgUpdate}</span>
                                                <div className="overflow-x-auto mb-3">
                                                    <table className="table table-bordered mb-0">
                                                        <thead>
                                                            <tr>
                                                                <th>id</th>
                                                                <th>
                                                                    username
                                                                </th>
                                                                <th>email</th>
                                                                <th>status</th>
                                                                <th>roles</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                            {userListSelector.map(
                                                                (user) => (
                                                                    <tr>
                                                                        <td>
                                                                            {
                                                                                user._id
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                user.username
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                user.email
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            <StatusUser
                                                                                status={
                                                                                    user.status
                                                                                }
                                                                                userId={user._id}
                                                                            />
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                user.roles.map(role => (
                                                                                    <span className="text-primary mx-2 py-2">{role.name}</span>
                                                                                ))
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
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
