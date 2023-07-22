import Roomster from "../../API/config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toastMessage } from "../../utils/toasfiy";

const INITIAL_STATE = {
  status: "idle",
  singleApartment: {},
  apartments: [],
  isDataFetched: true,
  reviews: [],
  totalReviews: 0,
  // favourites: [],
  // rented: [],
  error: null,
};

export const getApartments = createAsyncThunk(
  "apartments/getApartments",
  async ({ page = 1, filterString = "", keyword = "" }, thunkAPI) => {
    try {
      const response = await Roomster.get(
        `apartments/all?page=${page}${filterString}${keyword}`
      );

      // console.log(response);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getApartmentReviews = createAsyncThunk(
  "apartments/getApartmentReviews",
  async ({ page = 1, apartmentId }, thunkAPI) => {
    try {
      const response = await Roomster.get(
        `reviews/apartment/${apartmentId}?page=${page}&limit=100`
      );

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const loadMoreApartments = createAsyncThunk(
  "apartments/loadMoreApartments",
  async ({ page, filterString = "", keyword = "" }, thunkAPI) => {
    try {
      const response = await Roomster.get(
        `apartments/all?page=${page}${filterString}${keyword}`
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const getSingleApartment = createAsyncThunk(
  "apartments/getSingleApartment",
  async ({ id }, thunkAPI) => {
    try {
      const response = await Roomster.get(`apartments/${id}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const addReview = createAsyncThunk(
  "apartments/addReview",
  async (data, thunkAPI) => {
    const { apartments, user } = thunkAPI.getState();
    try {
      data.apartmentId = apartments.singleApartment._id;
      data.userId = user.user._id;
      const response = await Roomster.post(`reviews`, data);
      response.data.userId = { ...user.user };
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const removeReview = createAsyncThunk(
  "apartments/removeReview",
  async (data, thunkAPI) => {
    const { reviewId, userId } = data;
    try {
      const response = await Roomster.delete(`reviews/${reviewId}`, {
        data: {
          userId: userId,
        },
      });
      return reviewId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const updateReview = createAsyncThunk(
  "apartments/updateReview",
  async (data, thunkAPI) => {
    const { apartments, user } = thunkAPI.getState();
    try {
      const { reviewId } = { ...data };
      data.apartmentId = apartments.singleApartment._id;
      data.userId = user.user._id;
      delete data.reviewId;
      const response = await Roomster.patch(`reviews/${reviewId}`, data);
      response.data.userId = { ...user.user };
      delete data.apartmentId;
      delete data.userId;
      return { reviewId, data };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const apartmentsSlice = createSlice({
  name: "apartments",
  initialState: INITIAL_STATE,
  reducers: {
    deleteApartement: (state, action) => {
      state.apartments.apartments = state.apartments.apartments.filter(
        (apartement) => apartement._id !== action.payload
      );
    },
  },
  extraReducers: {
    [getApartments.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.apartments = [...action.payload];
    },
    [getApartments.pending]: (state) => {
      state.status = "loading";
    },
    [getApartments.rejected]: (state, action) => {
      state.status = "failed";
      //   state.error = {
      //message: action.payload.response.data.error.message,
      //    code: action.payload.response.data.error.code,
      // };
    },
    [loadMoreApartments.fulfilled]: (state, action) => {
      state.status = "succeeded";
      console.log(action.payload);
      if (action.payload.length == 0) {
        state.isDataFetched = false;
      }
      state.apartments.push(...action.payload);
    },
    [loadMoreApartments.pending]: (state) => {
      state.status = "loading";
    },
    [loadMoreApartments.rejected]: (state, action) => {
      state.status = "failed";
      //state.error = {
      //message: action.payload.response.data.error.message,
      // code: action.payload.response.data.error.code,
      // };
    },
    [getApartmentReviews.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.reviews = [...action.payload.data];
      state.totalReviews = action.payload.totalRate;
    },
    [getApartmentReviews.pending]: (state) => {
      state.status = "loading";
    },
    [getApartmentReviews.rejected]: (state, action) => {
      state.status = "failed";
      state.error = {
        message: action.payload.response.data.error.message,
        code: action.payload.response.data.error.code,
      };
    },

    [getSingleApartment.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.singleApartment = { ...action.payload };
    },
    [getSingleApartment.pending]: (state) => {
      state.status = "loading";
    },
    [getSingleApartment.rejected]: (state, action) => {
      state.status = "failed";
      // state.error = {
      //   message: action.payload.response.data.error.message,
      //   code: action.payload.response.data.error.code,
      // };
    },
    //? add review
    [addReview.fulfilled]: (state, action) => {
      toastMessage("success", "Added Successfully");
      state.reviews.push(action.payload);
    },
    //? remove review
    [removeReview.fulfilled]: (state, action) => {
      console.log(state.reviews);
      let indexToRemove = state.reviews.findIndex((obj) => {
        return obj._id == action.payload;
      });
      state.reviews.splice(indexToRemove, 1);
    },
    //? update review
    [updateReview.fulfilled]: (state, action) => {
      toastMessage("success", "Edit Successfully");
      const { reviewId, data } = action.payload;
      console.log(data);
      state.reviews = state.reviews.map((review) => {
        if (review._id === reviewId) {
          return { ...review, ...data };
        }
        return review;
      });
      // state.reviews.push(action.payload);
    },
  },
});

export const getApartmentsState = (state) => state.apartments.apartments;
export const getApartmentReviwsState = (state) => state.apartments.reviews;
export const getApartmentTotalReviwsState = (state) =>
  state.apartments.totalReviews;
export const getSingleApartmentState = (state) =>
  state.apartments.singleApartment;
export const { deleteApartement } = apartmentsSlice.reducer;
export default apartmentsSlice.reducer;
