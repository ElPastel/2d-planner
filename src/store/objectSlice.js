import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  idCounter: 0,
  objectsOnBoard: [],
}

const objectsSlice = createSlice({
  name: "objects",
  initialState,
  reducers: {
    addObject(state, action) {
      const { objectId, x, y, id } = action.payload
      state.objectsOnBoard.push({ id, objectId, x, y })
      state.idCounter++
    },
    moveObject(state, action) {
      const { id, x, y } = action.payload
      const objectIndex = state.objectsOnBoard.findIndex((obj) => obj.id === id)
      if (objectIndex !== -1) {
        state.objectsOnBoard[objectIndex].x = x
        state.objectsOnBoard[objectIndex].y = y
      }
    },
    displayImportObjects(state, action) {
      state.objectsOnBoard = action.payload
    },
  },
})

export const { addObject, moveObject, displayImportObjects } =
  objectsSlice.actions
export default objectsSlice.reducer
