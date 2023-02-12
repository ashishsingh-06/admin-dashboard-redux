import React from "react";
import { useAppDispatch } from "../../common/hooks";
import DeleteModal from "../../common/modals/DeleteModal";
import { deleteItem, deleteUser, editItem, fetchUsersById, UsersType } from "./userSlice";

const UserViewItem = (props: UsersType) => {

    const {_id,firstName,lastName,phoneNumber,age} = props;
    const dispatch = useAppDispatch();

    const setEditId = () => {
        dispatch(editItem(_id))
        dispatch(fetchUsersById(_id));
    }

    return (
        <div className="flex px-8 py-2 justify-between items-center border-b-2 border-black-100 text-left">
            <div  className="w-1/4 mt-2">{firstName}</div>
            <div  className="w-1/4 mt-2">{lastName}</div>
            <div  className="w-1/4 mt-2">{phoneNumber}</div>
            <div  className="w-1/4 mt-2">{String(age)}</div>
            <div  className="w-56">
                <button onClick={() => setEditId()} type="button" className="bg-yellow-500 hover:bg-yellow-700 text-white font-small rounded shadow-md py-1 px-2 mr-2 mt-2">Edit User</button>
                <button onClick={()=> dispatch(deleteItem(_id))} type="button" className="bg-red-700 hover:bg-red-900 text-white font-small rounded shadow-md py-1 px-2 mt-2">Delete User</button>
            </div>
        </div>
    )
}

export default UserViewItem;