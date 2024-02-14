import { useSelector } from "react-redux"
import { objects } from "./data/objects"
import styles from "./App.module.css"
import ObjectList from "./components/objects/ObjectList"
import Board from "./components/board/Board"

function App() {
  const objectsOnBoard = useSelector((state) => state.objects.objectsOnBoard)

  return (
    <div className={styles.layout}>
      <h1>2D Планировщик</h1>
      <ObjectList objects={objects} />
      <Board objectsOnBoard={objectsOnBoard} />
    </div>
  )
}

export default App
