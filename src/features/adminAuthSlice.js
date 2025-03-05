import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const apiURL = process.env.REACT_APP_API_URL

export const adminLogin = createAsyncThunk(
    "adminAuth/login",
    async ({ username, password }, { rejectWithValue }) => {
        const body = JSON.stringify({ username, password })

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }

        try {
            const res = await axios.post(apiURL + "auth/admin/login/", body, config)

            if (res.status === 200) {
                localStorage.setItem("adminAccess", res.data.access)
                localStorage.setItem("adminRefresh", res.data.refresh)
                return res.data
            } else {
                return rejectWithValue(res.data)
            }
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message)
        }
    }
)

export const refreshAdmin = createAsyncThunk(
    "adminAuth/refresh",
    async (_, thunkAPI) => {
        const token = localStorage.getItem("adminRefresh");
        if (token) {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const body = JSON.stringify({ refresh: token });

            try {
                const res = await axios.post(apiURL + "auth/token/refresh/", body, config);
                const data = res.data;

                if (res.status === 200) {
                    const { dispatch } = thunkAPI;

                    localStorage.setItem("adminAccess", data.access);
                    localStorage.setItem("adminRefresh", data.refresh);
                    dispatch(getAdmin());
                }
                return data;
            } catch (err) {
                console.error("Error details:", err.response ? err.response.data : err.message);
                return thunkAPI.rejectWithValue(err.response.data);
            }
        } else {
            return thunkAPI.rejectWithValue("No admin token found");
        }
    }
);


export const verifyAdmin = createAsyncThunk(
    "adminAuth/verify",
    async (_, thunkAPI) => {
        const token = localStorage.getItem("adminAccess");
        if (!token) return thunkAPI.rejectWithValue("No admin token found");

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const body = JSON.stringify({ token });

        try {
            const res = await axios.post(apiURL + "auth/token/verify/", body, config);

            if (res.status === 200) {
                const { dispatch, getState } = thunkAPI;
                
                const adminData = getState().adminAuth.admin;
                if (!adminData) {
                    dispatch(getAdmin());
                }
            }
            return res.data;
        } catch (err) {
            const { dispatch } = thunkAPI;
            await dispatch(refreshAdmin());
            return thunkAPI.rejectWithValue(err.response?.data || "Token verification failed");
        }
    }
);

export const getAdmin = createAsyncThunk(
    "adminAuth/getAdmin",
    async (_, { rejectWithValue }) => {
        const token = localStorage.getItem("adminAccess");
        if (!token) return rejectWithValue("No admin token found");

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const res = await axios.get(apiURL + "auth/admin/me/", config);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
)

export const editAdmin = createAsyncThunk(
    "admin/editAdmin",
    async ({ adminId, formData }, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("adminAccess"); 
        const response = await axios.put(
          apiURL + `auth/admin/edit/${adminId}/`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
)


// Admin Management

export const fetchAdmins = createAsyncThunk(
    "admin/fetchAdmins",
    async(_, rejectWithValue) => {
        const config = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('adminAccess')}`,
            },
        }
        try {
            const response = await axios.get(apiURL + 'admin_panel/list-admins/', config)

            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch admins")
        }
    }
)


export const createAdmin = createAsyncThunk(
    "admin/createAdmin",
    async({ adminData }, {rejectWithValue}) => {
        const config = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('adminAccess')}`,
            },
        }
        try {
            const response = await axios.post(apiURL + 'admin_panel/create-admin/', adminData, config)

            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch admins")
        }
    }
)


export const updateOtherAdmin = createAsyncThunk(
    "admin/updateOtherAdmin",
    async ({ id, updatedData }, { rejectWithValue }) => {
        const config = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('adminAccess')}`,
            },
        }
        try {
            const response = await axios.patch(apiURL + `admin_panel/edit-admin/${id}/`, updatedData, config)

            return response.data;
        }catch (error) {
            return rejectWithValue(error.response?.data || "Failed to edit admin");
        }
    }
)

const initialState = {
    adminAccess: localStorage.getItem("adminAccess") || null,
    isAdminAuthenticated: false,
    admins: [],
    isLoading: false,
    admin: null,
    error: null
}

const adminAuthSlice = createSlice({
    name: "adminAuth",
    initialState,
    reducers: {
        adminLogout(state) {
            localStorage.removeItem("adminAccess")
            state.adminAccess = null
            state.isAdminAuthenticated = false
            state.admin = null
        },
        resetAdminError(state) {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(adminLogin.fulfilled, (state, action) => {
                state.isAdminAuthenticated = true
                state.admin = action.payload
                state.error = null
                state.isLoading = false
            })
            .addCase(adminLogin.rejected, (state, action) => {
                state.error = action.payload
                state.isLoading = false
            })
            .addCase(adminLogin.pending, (state) => {
                state.isLoading = true
            })
            .addCase(refreshAdmin.fulfilled, (state, action) => {
                state.adminAccess = action.payload.access;
                state.isAdminAuthenticated = true;

            })
            .addCase(refreshAdmin.rejected, (state) => {
                localStorage.removeItem('adminAccess')
                localStorage.removeItem('adminRefresh')
                state.isAdminAuthenticated = false;
            })
            .addCase(verifyAdmin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(verifyAdmin.fulfilled, (state) => {
                state.isAdminAuthenticated = true;
                state.isLoading = false;
            })
            .addCase(verifyAdmin.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getAdmin.fulfilled, (state, action) => {
                state.admin = action.payload;
            })
            .addCase(getAdmin.rejected, (state) => {
                state.admin = null;
            })
            .addCase(editAdmin.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(editAdmin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.admin = action.payload;
            })
            .addCase(editAdmin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(fetchAdmins.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAdmins.fulfilled, (state, action) => {
                state.isLoading = false;
                state.admins = action.payload;
            })
            .addCase(fetchAdmins.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(createAdmin.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createAdmin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.admins.push(action.payload);
            })
            .addCase(createAdmin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateOtherAdmin.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateOtherAdmin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.admins = state.admins.map((admin) =>
                    admin.id === action.payload.id ? action.payload : admin
            );
            })
            .addCase(updateOtherAdmin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
})

export const { adminLogout, resetAdminError } = adminAuthSlice.actions
export default adminAuthSlice.reducer
