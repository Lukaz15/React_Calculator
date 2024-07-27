import styles from "./styles/App.module.css";
import Calculator from "./components/Calculator";
import { CalculatorProvider } from "./Hooks/calculatorContext";

/* Hi! Thanks for reviewing my code. I'm sorry if it looks somewhat messy - I was in the process of adding / changing some things,
but since my Coursera program is about to expire, I have to send this earlier than expected, and several things I wanted to make
were left out. It should be functional regardless. */

function App() {
  return (
    <div className={styles.App}>
      <CalculatorProvider>
        <Calculator />
      </CalculatorProvider>
    </div>
  );
}

export default App;
