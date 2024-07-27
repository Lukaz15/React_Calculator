import styles from "../styles/Button.module.css";

function Button(props) {
  return (
    <button
      className={styles.button}
      onClick={(e) => {
        e.preventDefault();
        e.target.blur();
        props.onClick();
      }}
    >
      {props.label}
    </button>
  );
}

export default Button;
