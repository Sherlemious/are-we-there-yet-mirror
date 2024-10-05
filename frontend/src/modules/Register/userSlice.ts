import { createSlice } from "@reduxjs/toolkit";
import { fieldNames } from "../shared/constants/inputNames";

const initialState = {
  userRole: "",
  username: "",
  email: "",
  password: "",
  occupation: "",
  dateOfBirth: "",
  nationality: "",
  mobileNumber: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(action.payload);

      if (action.payload.userRole === "Tourist") {
        state.userRole = action.payload.userRole;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.password = action.payload.password;
        state.occupation = action.payload.occupation;
        state.dateOfBirth = action.payload[fieldNames.dateOfBirth];
        state.nationality = action.payload.nationality;
        state.mobileNumber = action.payload[fieldNames.mobileNumber];
      } else if (action.payload.userRole === "Tour Guide") {
        state.userRole = action.payload.userRole;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.password = action.payload.password;
      } else if (action.payload.userRole === "Adviser") {
        state.userRole = action.payload.userRole;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.password = action.payload.password;
      } else {
        state.userRole = action.payload.userRole;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.password = action.payload.password;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
