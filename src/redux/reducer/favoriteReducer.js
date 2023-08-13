import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    setFavorite: (state, action) => {
      state.value = action.payload;
    },
    addToFavorite: (state, action) => {
      let { nomor, nomorAyat } = action.payload;
      let found = false;
      state.value.forEach((ayat) => {
        if (ayat.nomor == nomor && ayat.nomorAyat == nomorAyat) {
          found = true;
        }
      });
      if (!found) {
        state.value = [...state.value, action.payload];
      }
    },
    removeFromavorite: (state, action) => {
      let { nomor, nomorAyat } = action.payload;
      let newFav = state.value.filter((ayat, index) => {
        return ayat.nomor !== nomor || ayat.nomorAyat !== nomorAyat;
      });
      state.value = newFav;
    },
  },
});

export const { setFavorite, addToFavorite, removeFromavorite } =
  favoriteSlice.actions;

export default favoriteSlice.reducer;
