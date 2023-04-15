import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.user = action.payload;
      // console.log(action.payload);
    },
    removeActiveUser: (state) => {
      state.user = null;
    },
  },
});

export const { setActiveUser, removeActiveUser } = authSlice.actions;

export default authSlice.reducer;
