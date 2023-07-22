import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Roomster from "../../API/config";
import { toastMessage } from "../../utils/toasfiy";

export const fetchUser = createAsyncThunk("user/fetchUser", async (userId) => {
  const { data } = await Roomster.get(`user/${userId}`);
  return data[0];
});

export const addFavorite = createAsyncThunk(
  "user/addFavorite",
  async ({ userId, location }) => {
    await Roomster.post(`user/${userId}/favourites`, {
      apartmentId: location._id,
    });
    return location;
  }
);
export const deleteFavorite = createAsyncThunk(
  "user/deleteFavorite",
  async ({ userId, location }) => {
    const res = await Roomster.put(`user/${userId}/favourites`, {
      apartmentId: location._id,
    });
    return location;
  }
);

const initialState = {
  user: {
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: { country: "", city: "" },
    image: {
      url: "",
      publicId: "",
    },
    favourites: [],
    rentedApartments: [],
  },
  loading: false,
  error: null,
  socket: null,
  unseen: [],
  notificationsNo: null,
  onlineUsers: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addInfo: (state, action) => {
      state.loading = false;
      state.user = { ...action.payload };
    },
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    ResetRedux: () => initialState,
    setUnseen: (state, action) => {
      state.unseen = action.payload;
    },
    addUnseen: (state, action) => {
      if (!state.unseen.includes(action.payload)) {
        state.unseen = [...state.unseen, action.payload];
      }
    },
    removeUnseen: (state, action) => {
      console.log("here");
      state.unseen = state.unseen.filter((id) => id !== action.payload);
    },
    resetUnseen: (state) => {
      state.unseen = [];
    },
    //////
    setNotificationsNo: (state, action) => {
      state.notificationsNo = action.payload;
    },
    addNotificationsNo: (state) => {
      state.notificationsNo += 1;
    },
    resetNotificationsNo: (state) => {
      state.notificationsNo = null;
    },
    //////
    addOnlineUser: (state, action) => {
      state.onlineUsers = action.payload;
    },
    removeOnlineUser: (state, action) => {
      state.onlineUsers = state.onlineUsers.filter(
        (user) => user !== action.payload
      );
    },
    setUserProfileImage: (state, action) => {
      state.user.image = action.payload;
    },
  },
  extraReducers: {
    [fetchUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = { ...action.payload };
    },
    [fetchUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },

    [addFavorite.fulfilled]: (state, action) => {
      state.user.favourites.push(action.payload);
      toastMessage("success", "Added Successfully 👏");
    },

    [deleteFavorite.fulfilled]: (state, action) => {
      var index = state.user.favourites.findIndex(function (item) {
        return item._id === action.payload._id;
      });
      state.user.favourites.splice(index, 1);
      // toastMessage("success", "Delete Successfully 👏");
    },
  },
});

export const {
  addInfo,
  ResetRedux,
  setSocket,
  setUnseen,
  addUnseen,
  removeUnseen,
  resetUnseen,
  addOnlineUser,
  setUserProfileImage,
  setNotificationsNo,
  addNotificationsNo,
  resetNotificationsNo,
} = userSlice.actions;
export default userSlice.reducer;
