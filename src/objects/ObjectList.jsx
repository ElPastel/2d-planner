import styles from "./Object.module.css"

const ObjectList = ({ objects }) => {
  const handleDragStart = (e, objectId) => {
    e.dataTransfer.setData("objectId", objectId)
  }

  return (
    <div>
      <h2>Список объектов</h2>
      <ul className={styles.objectList}>
        {objects.map((object) => (
          <li
            className={styles.object}
            key={object.id}
            draggable
            onDragStart={(e) => handleDragStart(e, object.id)}
          ></li>
        ))}
      </ul>
    </div>
  )
}

export default ObjectList
