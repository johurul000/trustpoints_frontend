import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL

export const fetchUserApps = createAsyncThunk(
    "tasks/fetchUserApps", 
    async (_, { rejectWithValue }) => {
        const token = localStorage.getItem('access')
        const config = {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        }

        try {
            const response = await axios.get(apiURL+"user_panel/apps/", config);
            return response.data; 
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch apps");
        }
});

// Fetch user tasks (downloaded apps)
export const fetchUserTasks = createAsyncThunk(
    "tasks/fetchUserTasks", 
    async (_, { rejectWithValue }) => {

        const token = localStorage.getItem('access')
        const config = {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        }

        try {
            const response = await axios.get(apiURL+"user_panel/tasks/", config);
            return response.data; 
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch tasks");
        }
});

export const fetchAppDetails = createAsyncThunk(
    "tasks/fetchAppDetails",
    async (appId, { rejectWithValue }) => {
        const token = localStorage.getItem('access')
        const config = {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        }
        console.log('APP ID: ', appId)
        try {
            const response = await axios.get(apiURL+`user_panel/app/${appId}/`, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch app details");
        }
    }
  );
  

export const submitTask = createAsyncThunk(
    "tasks/submitTask",
    async (formData, { rejectWithValue }) => {

        const token = localStorage.getItem('access')
        const config = {
            headers:{
                "Content-Type": "multipart/form-data",
                'Authorization': `Bearer ${token}`
            }
        }
        try {
            const response = await axios.post(apiURL+"user_panel/tasks/submit/", formData, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Task submission failed.");
        }
    }
  );




export const fetchTaskDetails = createAsyncThunk(
  "tasks/fetchTaskDetails",
  async (taskId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access");
      const response = await axios.get(apiURL+`user_panel/task/${taskId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch task details");
    }
  }
);


const initialState = {
  apps: [], 
  userTasks: [],
  selectedApp: null,
  selectedTask: null,
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserApps.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserApps.fulfilled, (state, action) => {
        state.loading = false;
        console.log('Apps data:', action.payload)
        state.apps = action.payload;
      })
      .addCase(fetchUserApps.rejected, (state, action) => {
        console.log("fetchUserApps failed! Error:", action.payload)
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchUserTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.userTasks = action.payload;
      })
      .addCase(fetchUserTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(submitTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitTask.fulfilled, (state, action) => {
        state.loading = false;
        state.userTasks.push(action.payload);
      })
      .addCase(submitTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAppDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedApp = action.payload;
      })
      .addCase(fetchAppDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTaskDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTaskDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedTask = action.payload;
      })
      .addCase(fetchTaskDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError } = tasksSlice.actions;
export default tasksSlice.reducer;
