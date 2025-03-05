import { configureStore } from "@reduxjs/toolkit"
import authReducer from './features/AuthSlice'
import adminAuthReducer from './features/adminAuthSlice'
import adminAppReducer from './features/adminAppSlice'
import taskReducer from './features/tasksSlice'


const Store = configureStore({
    reducer: {
        auth: authReducer,
        adminAuth: adminAuthReducer,
        adminApps: adminAppReducer,
        tasks: taskReducer,
    },
})

export default Store