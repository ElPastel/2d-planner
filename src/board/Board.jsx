import styles from "./Board.module.css"
import { useDispatch } from "react-redux"
import { addObject, moveObject } from "../objects/objectSlice"
import { createRef, useState } from "react"

const Board = ({ objectsOnBoard }) => {
  const dispatch = useDispatch()
  const [draggingObjectId, setDraggingObjectId] = useState(null)
  const [draggingOffset, setDraggingOffset] = useState({ x: 0, y: 0 })
  const boardRef = createRef()

  const handleDrop = (e) => {
    e.preventDefault()
    const objectId = e.dataTransfer.getData("objectId")
    const x = e.clientX
    const y = e.clientY
    dispatch(addObject({ objectId, x, y }))
  }

  const handleDragStart = (e, objectId) => {
    e.dataTransfer.setData("objectId", objectId)
  }

  const handleMouseDown = (e, id) => {
    setDraggingObjectId(id)
    const offsetX = e.clientX - objectsOnBoard.find((obj) => obj.id === id).x
    const offsetY = e.clientY - objectsOnBoard.find((obj) => obj.id === id).y

    setDraggingOffset({ x: offsetX, y: offsetY })
  }

  const handleMouseMove = (e) => {
    if (draggingObjectId !== null) {
      const x = e.clientX - draggingOffset.x
      const y = e.clientY - draggingOffset.y

      dispatch(moveObject({ id: draggingObjectId, x, y }))
    }
  }

  const handleMouseUp = () => {
    setDraggingObjectId(null)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  return (
    <div
      className={styles.board}
      ref={boardRef}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {objectsOnBoard.map((object) => (
        <img
          key={object.id}
          src={object.img}
          alt={object.name}
          style={{
            position: "absolute",
            left: object.x,
            top: object.y,
            cursor: "move",
          }}
          onMouseDown={(e) => handleMouseDown(e, object.id)}
          onDragStart={(e) => handleDragStart(e, object.objectId)}
          draggable
          className={styles.object}
        />
      ))}
    </div>
  )
}

export default Board
