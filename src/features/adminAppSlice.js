import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API URL
const API_URL = process.env.REACT_APP_API_URL


export const fetchApps = createAsyncThunk(
  "adminApps/fetchApps",
  async ({ page = 1, search = "" }, { rejectWithValue }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminAccess")}`,
      },
    };
    try {
      const response = await axios.get(
        `${API_URL}admin_panel/apps/?page=${page}${search ? `&search=${search}` : ""}`,
        config
      );
      return {
        apps: response.data.results,
        totalApps: response.data.count,
        nextPage: response.data.next ? page + 1 : null,
        prevPage: response.data.previous ? page - 1 : null,
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const allApps = createAsyncThunk(
  "adminApps/allApps",
  async(_, {rejectWithValue}) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminAccess")}`,
      },
    };

    try{
      const response = await axios.get(`${API_URL}admin_panel/all-apps/`,config);
      return response.data
    }catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)



export const addApp = createAsyncThunk(
  "adminApps/addApp",
  async (appData, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem('adminAccess')}`,
      },
    }
    console.log('Add App Action: ', appData)
    try {
      const response = await axios.post(`${API_URL}admin_panel/apps/add/`, appData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editApp = createAsyncThunk(
  "adminApps/editApp",
  async ({ id, updatedData }, { rejectWithValue }) => {

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem('adminAccess')}`,
      },
    }
    console.log("UpdateData: ",updatedData)
  
    try {
      const response = await axios.put(`${API_URL}admin_panel/apps/${id}/edit/`, updatedData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteApp = createAsyncThunk(
  "adminApps/deleteApp",
  async (id, { rejectWithValue }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminAccess')}`,
      },
    }
    try {
      await axios.delete(`${API_URL}admin_panel/apps/${id}/delete/`, config);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const fetchUserTasks = createAsyncThunk(
  "tasks/fetchUserTasks", 
  async (_, { rejectWithValue }) => {

      const token = localStorage.getItem('adminAccess')
      const config = {
          headers:{
              'Authorization': `Bearer ${token}`
          }
      }

      try {
          const response = await axios.get(API_URL+"admin_panel/tasks/", config);
          return response.data; 
      } catch (error) {
          return rejectWithValue(error.response?.data || "Failed to fetch tasks");
      }
});


export const fetchTaskDetails = createAsyncThunk(
  "tasks/fetchTaskDetails",
  async (taskId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminAccess");
      const response = await axios.get(API_URL+`admin_panel/task/${taskId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch task details");
    }
  }
);

export const verifyTask = createAsyncThunk(
  "adminApps/verifyTask",
  async (taskId, { rejectWithValue }) => {
    const token = localStorage.getItem('adminAccess')
    const config = {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.patch(API_URL+`admin_panel/tasks/${taskId}/verify/`, {}, config);
      return { taskId, newPoints: response.data.new_points };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const rejectTask = createAsyncThunk(
  "adminApps/rejectTask",
  async (taskId, { rejectWithValue }) => {
    const token = localStorage.getItem("adminAccess");

    const config = {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json", 
      },
    }

    try {
      await axios.patch(API_URL+`admin_panel/tasks/${taskId}/reject/`, {}, config);
      return taskId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const adminAppSlice = createSlice({
  name: "adminApps",
  initialState: {
    apps: [],
    userTasks: [],
    selectedTask: null,
    totalApps: 0,
    currentPage: 1,
    nextPage: null,
    prevPage: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetAppError(state) {
      state.error = null;
    },
    resetApps: (state) => {
      state.apps = [];
      state.nextPage = 1;
      state.loading = false;
      state.error = null;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApps.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchApps.fulfilled, (state, action) => {
        state.loading = false;
        console.log('Apps Data: ', action.payload.apps)
        state.apps = action.payload.apps;
        console.log('Apps Data: ', action.payload.apps)
        state.totalApps = action.payload.totalApps; 
        state.nextPage = action.payload.nextPage;
        state.prevPage = action.payload.prevPage;
      })
      .addCase(fetchApps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(allApps.pending, (state) => {
        state.loading = true
      })
      .addCase(allApps.fulfilled, (state, action) => {
        state.loading = false
        console.log('Apps Data: ', action.payload)
        state.apps = action.payload
      })
      .addCase(allApps.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(addApp.pending, (state) => {
        state.loading = true;
      })
      .addCase(addApp.fulfilled, (state, action) => {
        state.loading = false;
        state.apps.unshift(action.payload); 
      })
      .addCase(addApp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(editApp.pending, (state) => {
        state.loading = true;
      })
      .addCase(editApp.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.apps.findIndex((app) => app.id === action.payload.id);
        if (index !== -1) {
          state.apps[index] = action.payload;
        }
      })
      .addCase(editApp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteApp.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteApp.fulfilled, (state, action) => {
        state.loading = false;
        state.apps = state.apps.filter((app) => app.id !== action.payload);
      })
      .addCase(deleteApp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserTasks.fulfilled, (state, action) => {
        state.loading = false;
        console.log('All Tasks: ', action.payload)
        state.userTasks = action.payload;
      })
      .addCase(fetchUserTasks.rejected, (state, action) => {
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
      })
      .addCase(verifyTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyTask.fulfilled, (state, action) => {
        state.loading = false;
        state.userTasks = state.userTasks.map((task) =>
          task.id === action.payload.taskId ? { ...task, status: "verified" } : task
        );
      })
      .addCase(verifyTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(rejectTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(rejectTask.fulfilled, (state, action) => {
        state.loading = false;
        state.userTasks = state.userTasks.map((task) =>
          task.id === action.payload ? { ...task, status: "rejected" } : task
        );
      })
      .addCase(rejectTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAppError, resetApps, setSearchTerm } = adminAppSlice.actions;
export default adminAppSlice.reducer;
