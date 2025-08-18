import { configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { userReducer } from "./slice/userSlice" // Adjust the path as necessary

const persistConfig = {
  key: "user", // Key to persist user state
  storage,
}

const persistedReducer = persistReducer(persistConfig, userReducer)

const store = configureStore({
  reducer: {
    user: persistedReducer, // Namespaced reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serialization warnings for redux-persist
    }),
})

const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch;

export { store, persistor }
