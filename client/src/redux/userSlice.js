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
        }
    }
});
export const {signInStart,signInSuccess,signInFailure}=userSlice.actions;

// The function below is called a selector. It selects the value of the 'contacts   

export default userSlice.reducer;