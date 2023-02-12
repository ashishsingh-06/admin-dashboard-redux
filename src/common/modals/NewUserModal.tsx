import React from "react";
import { closeModal, editItem, patchUser, fetchUsers, fetchUsersById, saveUser, UsersType } from "../../feature/user/userSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

const NewUserModal = () => {
  const editValue: UsersType = useAppSelector(state => state.app.userValue);
  const [formValue, setFormValue] = React.useState({firstName:'',lastName:'',phoneNumber:'',age:''});
  const [error, setError] = React.useState({firstName: false, lastName: false, phone: false, age:false});

  const show = useAppSelector( state => state.app.showNewUserModal);
  const editId = useAppSelector( state => state.app.editedId);
  
  const dispatch = useAppDispatch();

  const checkValidation = () => {
    const err: any = {};

    if(formValue.firstName.length < 1){
        err.firstName = true;
    } else {
        err.firstName = false;
    }
    if(formValue.lastName.length < 1){
        err.lastName = true;
    } else {
        err.lastName = false;
    }
    if(formValue.phoneNumber.length < 6){
        err.phone = true;
    } else {
        err.phone = false;
    }
    if(formValue.age.length < 3){
        err.age = true;
    } else {
        err.age = false;
    }

    let valid = true;
    Object.values(error).forEach(val=> {
        if(val === true){
            valid = false;
        }
    });
    setError(err);
    return valid;
  }

  const saveUserData = () => {
    if(checkValidation()){
            if(editId){
                dispatch(patchUser({id: editId, data: formValue}))
                    .then(res => {
                        setFormValue({firstName:'',lastName:'',phoneNumber:'',age:''})
                        dispatch(fetchUsers());
                        setError({firstName: false, lastName: false, phone: false, age:false})
                    })
            } else {
                dispatch(saveUser(formValue))
                    .then(res => {
                        setFormValue({firstName:'',lastName:'',phoneNumber:'',age:''})
                        setError({firstName: false, lastName: false, phone: false, age:false})
                        dispatch(fetchUsers());
                    })
            }
    }
  }

  React.useEffect(()=>{
    setFormValue({
        firstName: editValue.firstName,
        lastName: editValue.lastName,
        phoneNumber: editValue.phoneNumber,
        age: editValue.age,
    })
  },[editValue])

  return (
    <>
      {show ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-1/2 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                   {editId ? 'Edit User' : 'Add User'}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => show}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                    <form>
                        <div className="mb-3 pt-0">
                            <input type="text" value={formValue.firstName} onChange={(e)=> setFormValue({...formValue, firstName: e.target.value})} placeholder="First Name" className="px-2 py-1 mb-3 placeholder-slate-500 text-slate-600 relative bg-white bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"/>
                            { error.firstName  ? <div><h3 className="w-full mb-2 text-left text-xs">*Please Enter Your First Name</h3></div> : null}
                            <input type="text" value={formValue.lastName}  onChange={(e)=> setFormValue({...formValue, lastName: e.target.value})} placeholder="Last Name" className="px-2 py-1 mb-3 placeholder-slate-500 text-slate-600 relative bg-white bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"/>
                            { error.lastName ? <h3 className="w-full mb-2 text-left text-xs">*Please Enter Your Last Name</h3> : null}
                            <input type="text" value={formValue.phoneNumber}  onChange={(e)=> setFormValue({...formValue, phoneNumber: e.target.value})} placeholder="Phone Number" className="px-2 py-1 mb-3 placeholder-slate-500 text-slate-600 relative bg-white bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"/>
                            { error.phone ? <h3 className="w-full mb-2 text-left text-xs">*Please Enter Valid Phone Number</h3> : null}
                            <input type="text" value={formValue.age}  onChange={(e)=> setFormValue({...formValue, age: e.target.value})}  placeholder="Age" className="px-2 py-1 placeholder-slate-500 text-slate-500 relative x bg-white bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"/>
                            {error.age ? <h3 className="w-full mb-2 mt-2 text-left text-xs">*Please Enter Valid Age</h3> : null}
                        </div>
                    </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => dispatch(closeModal())}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => saveUserData()}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default NewUserModal;