import { useCalculatorContext } from "../Hooks/calculatorContext";
import { useInput } from "../Hooks/useInput";
import styles from "../styles/Calculator.module.css";
import Field from "./Field";

function Calculator() {
  const { inputRef, inputValue, resultRef, result } = useCalculatorContext();
  const { calculatorButtons } = useInput();

  return (
    <form>
      <div className={styles["field-container"]}>
        <Field reference={inputRef} value={inputValue} sty={"input"} />
        <Field reference={resultRef} value={result} sty={"result"} />
      </div>
      <div className={styles["button-grid"]}>{calculatorButtons}</div>
    </form>
  );
}

export default Calculator;
