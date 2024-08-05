import { createSlice } from '@reduxjs/toolkit'
import { globalConfig } from '@/globalConfig'

//该store分库的初始值
const initialState = {
   token:'',
}

export const tokenSlice = createSlice({
    // store分库名称
    name: 'token',
    // store分库初始值
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
            window.localStorage.setItem(globalConfig.SESSION_LOGIN_INFO, JSON.stringify(state))
        },
    },
})

export const { setToken } = tokenSlice.actions

export default tokenSlice.reducer