import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Roomster from "../../API/config";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const { data } = await Roomster.get(`user/all`);
  console.log(data);
  return data;
});

const initialState = {
  users: {
    data: [],
  },
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    deleteUser: (state, action) => {
      state.users.data = state.users.data.filter(
        (user) => user._id !== action.payload
      );
    },
  },
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = { ...action.payload };
    },
    [fetchUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const getAllUserState = (state) => state.users?.users.data;
export const { deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
