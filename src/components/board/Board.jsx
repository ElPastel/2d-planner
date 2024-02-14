import { createRef, useState } from "react"
import { saveAs } from "file-saver"
import { useDispatch, useSelector } from "react-redux"

import styles from "./Board.module.css"
import {
  addObject,
  displayImportObjects,
  moveObject,
} from "../../store/objectSlice"
import { objects } from "../../data/objects"

const Board = ({ objectsOnBoard }) => {
  const dispatch = useDispatch()
  const [draggingObjectId, setDraggingObjectId] = useState(null)
  const [draggingOffset, setDraggingOffset] = useState({ x: 0, y: 0 })
  const [imageDimensions, setImageDimensions] = useState({})
  const boardRef = createRef()

  const newId = useSelector((state) => state.objects.idCounter)

  const handleDrop = (e) => {
    e.preventDefault()
    const objectId = e.dataTransfer.getData("objectId")
    const created = e.dataTransfer.getData("created")

    const x = e.clientX
    const y = e.clientY

    const existingObject = objectsOnBoard.find((obj) => obj.id == objectId)
    if (created) {
      dispatch(moveObject({ id: existingObject.id, x, y }))
    } else {
      dispatch(addObject({ id: newId, objectId, x, y }))
    }
  }

  const handleDragStart = (e, objectId) => {
    e.dataTransfer.setData("created", "yes")
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

      const { width, height } = imageDimensions[draggingObjectId]

      const boardWidth = boardRef.current.clientWidth
      const boardHeight = boardRef.current.clientHeight

      const boardXStart =
        boardRef.current.getBoundingClientRect().left + window.scrollX
      const boardYStart =
        boardRef.current.getBoundingClientRect().top + window.scrollY

      const boardXEnd = boardXStart + boardWidth - width
      const boardYEnd = boardYStart + boardHeight - height

      const isWithinBoard =
        x >= boardXStart && x <= boardXEnd && y >= boardYStart && y <= boardYEnd

      if (isWithinBoard) {
        dispatch(moveObject({ id: draggingObjectId, x, y }))
      }
    }
  }

  const handleMouseUp = () => {
    setDraggingObjectId(null)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleImageLoad = (id, width, height) => {
    setImageDimensions((prevDimensions) => ({
      ...prevDimensions,
      [id]: { width, height },
    }))
  }
  const handleExport = () => {
    const exportData = JSON.stringify(objectsOnBoard)
    const blob = new Blob([exportData], { type: "application/json" })
    saveAs(blob, "plan.json")
  }

  const handleImport = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = (event) => {
      const data = JSON.parse(event.target.result)
      dispatch(displayImportObjects(data))
    }

    reader.readAsText(file)
  }

  return (
    <div>
      <div
        className={styles.board}
        ref={boardRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {objectsOnBoard.map((obj) => {
          const src = objects.filter((object) => object.id == obj.objectId)[0]
            ?.src
          return (
            <img
              key={obj.id}
              src={src}
              alt={obj.name}
              style={{
                position: "absolute",
                left: obj.x,
                top: obj.y,
                cursor: "move",
              }}
              onMouseDown={(e) => handleMouseDown(e, obj.id)}
              onDragStart={(e) => handleDragStart(e, obj.id)}
              draggable
              onLoad={(e) =>
                handleImageLoad(obj.id, e.target.width, e.target.height)
              }
            />
          )
        })}
      </div>
      <div className={styles.container}>
        <button className={styles.btn} onClick={handleExport}>
          Экспорт в файл
        </button>
        <label className={styles.btn} htmlFor="file-upload">
          Загрузите файл
        </label>
        <input
          id="file-upload"
          className={styles.file}
          type="file"
          accept=".json"
          onChange={handleImport}
        />
      </div>
    </div>
  )
}

export default Board
