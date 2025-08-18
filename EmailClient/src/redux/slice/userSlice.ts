import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

// Define the initial state for the user
interface UserState {
  id: string | null
  name: string | null
  email: string | null
}

const initialState: UserState = {
  id: null,
  name: null,
  email: null,
}

// Create the user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action to set user details after login
    login: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id
      state.name = action.payload.name
      state.email = action.payload.email
    },
    // Action to log out the user
    logout: (state) => {
      state.id = null
      state.name = null
      state.email = null
    },
  },
})

// Export actions
export const { login, logout } = userSlice.actions

// Export the reducer to use in the store
export const userReducer = userSlice.reducer
