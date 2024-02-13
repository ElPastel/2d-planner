import { useSelector } from "react-redux"
import ObjectList from "./objects/ObjectList"
import Board from "./board/Board"
import { objects } from "./data/objects"

function App() {
  const objectsOnBoard = useSelector((state) => state.objects.objectsOnBoard)

  return (
    <div>
      <ObjectList objects={objects} />
      <Board objectsOnBoard={objectsOnBoard} />
    </div>
  )
}

export default App
