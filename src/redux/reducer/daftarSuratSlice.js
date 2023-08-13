import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: []
};

export const daftarSuratSlice = createSlice({
    name: "daftarSurat",
    initialState,
    reducers: {
        setDaftarSurat: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setDaftarSurat } = daftarSuratSlice.actions;

export default daftarSuratSlice.reducer;