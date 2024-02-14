import Object from "./Object"
import styles from "./Object.module.css"

const ObjectList = ({ objects }) => {
  return (
    <div>
      <ul className={styles.objectList}>
        {objects.map((object) => (
          <Object key={object.id} object={object} />
        ))}
      </ul>
    </div>
  )
}

export default ObjectList
