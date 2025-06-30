import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login_info: {
    userName: "",
    isloggedin: false,
    burnerid: 0,
    room: "",
    usertheme: "dark",
    companyName: "",
    usertype: "",
    lastseen: null,
  },

}

const AppState = createSlice({
  name: "appStore",
  initialState,
  reducers: {
    setlogininfo: (state, action) => {
      state.login_info = action.payload;
    },
  },
});
export const { setlogininfo } = AppState.actions;
export default AppState.reducer;
