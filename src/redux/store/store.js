import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../reducer/userSlice";
import { daftarSuratSlice } from "../reducer/daftarSuratSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import { favoriteSlice } from "../reducer/favoriteReducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [daftarSuratSlice.name]: daftarSuratSlice.reducer,
  [favoriteSlice.name]: favoriteSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
