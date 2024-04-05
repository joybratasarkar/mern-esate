import {createSlice} from '@reduxjs/toolkit';

const initialState={
    currentUser:null,
    error:null,
    loading:false,
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true;
            state.error=null;
        },
        signInSuccess:(state,action) =>{
            return{
                ...state,
                loading:false,
                error:null,
                currentUser: action.payload,
            }
        },
        signInFailure:(state,action)=> {
            return{
                ...state,
                loading:false,
                error:action.payload,
            }
        },
        updateUserStart:(state)=>{
            return{
                ...state,
                loading:true
            }
        },
        updateUserSuccess:(state,action)=>{
            return{
                ...state,
                currentUser:action.payload,
                loading:false,
                error:null
            }
        },
        updateUserFailure:(state,action)=>{
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },

    }
});
export const {signInStart,signInSuccess,signInFailure,updateUserStart,updateUserSuccess,updateUserFailure}=userSlice.actions;

// The function below is called a selector. It selects the value of the 'contacts   

export default userSlice.reducer;