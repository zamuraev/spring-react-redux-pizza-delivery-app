import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Load from "../../components/util/Load";
import Error from "../../components/util/Error";
import {deleteUser, getAllUsers} from "../../actions/usersActions";
import Success from "../../components/util/Success";

function UsersList(props) {

    const dispatch = useDispatch()
    const {users, error, loading} = useSelector((state) => state.getAllUsersReducer)
    const {deleteError, deleteSuccess, deleteLoading} = useSelector((state) => state.deleteUserReducer)

    useEffect(
        () => {

            dispatch(getAllUsers());
        }, []
    )

    return (
        <div>
            <h2>Users List</h2>

            {deleteSuccess && (<Success success={'User Deleted Successfully'}/>)}
            {deleteLoading && (<Load />)}
            {deleteError && (<Error error={'Delete User went wrong'}/>)}

            {loading ? (<Load/>) : error ? (<Error error={'Something went wrong'}/>) : (
                <table className="table table-bordered">
                    <thead className='table-dark'>
                    <tr className="text-sm-center">
                        <th scope="col">User ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users && users.map(user => {
                        return <tr key={user.userId}>
                            <th scope='row' style={{width: "100px"}}>{user.userId}</th>
                            <th scope='row' style={{width: "100px"}}>{user.firstName} {user.lastName}</th>
                            <th scope='row' style={{width: "100px"}}>{user.email}</th>
                            <td style={{width: "20px"}}>
                                <i className="bi bi-trash m-2" onClick={() => dispatch(deleteUser(user.userId))}/>
                            </td>
                        </tr>
                    })}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default UsersList;
