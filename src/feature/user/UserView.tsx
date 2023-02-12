import React from "react";
import { useAppSelector, useAppDispatch } from "../../common/hooks";
import { fetchUsers } from "./userSlice";
import UserViewItem from "./UserViewItem";


const UserView = () => {

    const user = useAppSelector(state => state.app);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(fetchUsers());
    },[]);

    return (
        <div>
            <div className="flex px-8 py-2 justify-between items-center border-b-2 border-black-100 text-left">
                <span className="w-1/4">First Name</span>
                <span className="w-1/4">Last Name</span>
                <span className="w-1/4">Phone Number</span>
                <span className="w-1/4">Age</span>
                <span className="w-56">Actions</span>
            </div>
            {
              user.users.length ? user.users.map((userItem) => <UserViewItem key={userItem._id} {...userItem}/>) : 'No Data Available'
            }

        </div>
    )
}

export default UserView;