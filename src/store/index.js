import { configureStore } from "@reduxjs/toolkit"
import objectsReducer from "./objectSlice"

const store = configureStore({
  reducer: {
    objects: objectsReducer,
  },
})

export default store
