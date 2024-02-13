import { createSlice } from "@reduxjs/toolkit"

let nextId = 1

const initialState = {
  objectsOnBoard: [],
}

const objectsSlice = createSlice({
  name: "objects",
  initialState,
  reducers: {
    addObject(state, action) {
      const { objectId, x, y } = action.payload
      state.objectsOnBoard.push({ id: nextId++, objectId, x, y })
    },
    moveObject(state, action) {
      const { id, x, y } = action.payload
      const objectIndex = state.objectsOnBoard.findIndex((obj) => obj.id === id)
      if (objectIndex !== -1) {
        state.objectsOnBoard[objectIndex].x = x
        state.objectsOnBoard[objectIndex].y = y
      }
    },
  },
})

export const { addObject, moveObject } = objectsSlice.actions
export default objectsSlice.reducer
