import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                error: null,
                currentUser: action.payload,
            }
        },
        signInFailure: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },
        updateUserStart: (state) => {
            return {
                ...state,
                loading: true
            }
        },
        updateUserSuccess: (state, action) => {
            return {
                ...state,
                currentUser: action.payload,
                loading: false,
                error: null
            }
        },
        updateUserFailure: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        deleteUser: (state, action) => {
            return {
                ...state,
                loading: true
            }
        },
        deleteUserSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                currentUser: null,
                error: null
            }
        },
        deleteUserFailure: (state, action) => {
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        },


        signOutUser: (state, action) => {
            return {
                ...state,
                loading: true
            }
        },
        signOutUserSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                currentUser: null,
                error: null
            }
        },
        signOutUserFailure: (state, action) => {
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        },
        clearState: () => initialState


    }
});
export const { signInStart, signInSuccess, signInFailure, updateUserStart,
    updateUserSuccess, updateUserFailure,deleteUserFailure,deleteUserSuccess,deleteUser,
    signOutUser, signOutUserSuccess,signOutUserFailure,clearState} = userSlice.actions;

// The function below is called a selector. It selects the value of the 'contacts   

export default userSlice.reducer;

