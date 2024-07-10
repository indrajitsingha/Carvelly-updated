import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name: "Authtentation",
    initialState: {
        user: {},
        UpdateDepe: false,
    },
    reducers: {
        SigninUser(state, action) {
            state.user = action.payload
        },
        SignoutUser(state) {
            // signOut(auth) 
            state.user = ""
        },
        UpdateDependency(state) {
            state.UpdateDepe = !state.UpdateDepe
        },

    }

})

export default AuthSlice.reducer


export const { SigninUser, SignoutUser, UpdateDependency, OneTimeLogin } = AuthSlice.actions