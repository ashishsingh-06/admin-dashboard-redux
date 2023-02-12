import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import  axios  from "axios";

export interface UsersType{
    _id?: string
    firstName: string,
    lastName: string,
    phoneNumber: string,
    age: string
}

export interface initialStateType {
    loading: Boolean,
    users: Array<UsersType>,
    error: string,
    deleteId: string,
    editedId: string,
    showDeleteModal: Boolean
    showNewUserModal: Boolean,
    userValue: UsersType
}

const initialState:initialStateType  = {
    loading: false,
    users: [],
    error: '',
    deleteId: '',
    editedId: '',
    showDeleteModal: false,
    showNewUserModal: false,
    userValue: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        age: ''
    }
}

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
    return axios.get('https://blue-journalist-bbrpv.ineuron.app:4000/users')
        .then((res: any) => res.data.data);
})

export const fetchUsersById = createAsyncThunk("user/fetchUsersById", async (id: any) => {
    return axios.get(`https://blue-journalist-bbrpv.ineuron.app:4000/user/${id}`)
        .then((res: any) => res.data.data);
})

export const deleteUser = createAsyncThunk("user/deleteUser", async (id: string) => {
    return axios.delete(`https://blue-journalist-bbrpv.ineuron.app:4000/user/${id}`)
        .then((res: any) => res.data);
})

export const saveUser = createAsyncThunk("user/saveUser", async (data: UsersType) => {
    return axios.post(`https://blue-journalist-bbrpv.ineuron.app:4000/user/create`,{...data})
        .then((res: any) => res.data);
})

export const patchUser = createAsyncThunk("user/editUser", async (value: any) => {
    const {id, data} = value
    return axios.patch(`https://blue-journalist-bbrpv.ineuron.app:4000/user/${id}`, {...data})
        .then((res: any) => res.data);
})


const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        deleteItem: (state: initialStateType, action) => {
           state.deleteId = action.payload
           state.showDeleteModal = true
        },
        editItem: (state: initialStateType, action) => {
            state.editedId = action.payload
            state.showNewUserModal = true
        },
        closeModal: (state: initialStateType) => {
            state.deleteId = ''
            state.showDeleteModal = false
            state.showNewUserModal = false
            state.editedId = ''
            state.userValue = {
                firstName: '',
                lastName: '',
                phoneNumber: '',
                age: ''
            }
        },
        showNewModal: (state: initialStateType) => {
            state.showNewUserModal = true
            state.userValue = {
                firstName: '',
                lastName: '',
                phoneNumber: '',
                age: ''
            }
        }
    },
    extraReducers: (builder) => {
        // fetch
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchUsers.fulfilled, (state, action: any) => {
            state.loading = false
            state.users = action.payload
            state.error = ''
        })
        builder.addCase(fetchUsers.rejected, (state, action: any) => {
            state.loading = false
            state.users = []
            state.error = action.error.message || 'Something went wrong'
        })
        // fetchUsersById
         builder.addCase(fetchUsersById.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchUsersById.fulfilled, (state, action: any) => {
            state.loading = false
            state.userValue = action.payload
            state.error = ''
            state.showNewUserModal = true
        })
        builder.addCase(fetchUsersById.rejected, (state, action: any) => {
            state.loading = false
            state.users = []
            state.error = action.error.message || 'Something went wrong'
        })
        // delete
        builder.addCase(deleteUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteUser.fulfilled, (state, action: any) => {
            state.loading = false
            state.users =  state.users.filter((item) => item._id != state.deleteId);
            state.error = action.message
            state.showDeleteModal = false
        })
        builder.addCase(deleteUser.rejected, (state, action: any) => {
            state.loading = false
            state.users = []
            state.error = action.error.message || 'Something went wrong'
        })
        // save 
        builder.addCase(saveUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(saveUser.fulfilled, (state, action: any) => {
            state.loading = false
            state.users =  []
            state.error = action.message
            state.showNewUserModal = false
        })
        builder.addCase(saveUser.rejected, (state, action: any) => {
            state.loading = false
            state.users = []
            state.error = action.error.message || 'Something went wrong'
        })
        // patch 
        builder.addCase(patchUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(patchUser.fulfilled, (state, action: any) => {
            state.loading = false
            state.users =  []
            state.error = action.message
            state.showNewUserModal = false
        })
        builder.addCase(patchUser.rejected, (state, action: any) => {
            state.loading = false
            state.users = []
            state.error = action.error.message || 'Something went wrong'
        })
    } 
})

export default userSlice.reducer;
export const {deleteItem, closeModal, editItem, showNewModal} = userSlice.actions;
