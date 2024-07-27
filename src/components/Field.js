import styles from "../styles/Field.module.css";

function Field(props) {
  return (
    <div className={styles.container}>
      <p className={styles[props.sty]} ref={props.reference}>
        {props.value}
      </p>
    </div>
  );
}

export default Field;
