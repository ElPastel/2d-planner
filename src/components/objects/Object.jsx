import styles from "./Object.module.css"
import { useSelector } from "react-redux"

const Object = ({ object }) => {
  const newId = useSelector((state) => state.objects.idCounter)

  const handleDragStart = (e, objectId) => {
    e.dataTransfer.setData("id", newId)
    e.dataTransfer.setData("objectId", objectId)
  }

  return (
    <li className={styles.object} key={object.id}>
      <p className={styles.name}>{object.name}</p>
      <img
        alt="Предмет мебели"
        src={object.src}
        draggable
        onDragStart={(e) => handleDragStart(e, object.id)}
        className={styles.img}
      />
    </li>
  )
}

export default Object
