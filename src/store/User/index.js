import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: null,
    name: null,
    email: null,
    mobile: null,
    role: null,
  },
  isLoggedIn: false,
};

const mapUserDetails = (data = {}) => ({
  user: {
    id: data?._id,
    name: data?.name,
    email: data?.email,
    mobile: data?.mobile,
    role: data?.role,
  },
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      return {
        ...state,
        ...mapUserDetails(action.payload),
      };
    },
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    resetUser(state) {
      return {
        ...state,
        ...initialState,
      };
    },
  },
});

export const { setUser, setIsLoggedIn, resetUser } = userSlice.actions;

export default userSlice.reducer;
