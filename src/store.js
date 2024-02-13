import { configureStore } from "@reduxjs/toolkit"
import objectsReducer from "./objects/objectSlice"

const store = configureStore({
  reducer: {
    objects: objectsReducer,
  },
})

export default store
