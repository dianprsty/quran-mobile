import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  initializing: true,
  nama: "",
  kota: { id: "667", nama: "KOTA JAKARTA" },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
    setInitializing: (state, action) => {
      state.initializing = action.payload;
    },
    setNama: (state, action) => {
      state.nama = action.payload;
    },
    setKota: (state, action) => {
      state.kota = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setInitializing, setNama, setKota } = userSlice.actions;

export default userSlice.reducer;
