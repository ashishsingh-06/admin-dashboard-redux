import { useAppDispatch } from "../common/hooks";
import { showNewModal } from "./user/userSlice";

const Header = () => {

    const dispatch = useAppDispatch();

    return (
        <div className="flex justify-between items-center bg-indigo-50 px-8 py-2">
            <h3 className="text-xl text-black font-bold	">Admin Dashboard</h3>
            <button onClick={() => dispatch(showNewModal())} type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-medium rounded shadow-md py-2 px-4">Add New User</button>
        </div>
    )
}

export default Header;