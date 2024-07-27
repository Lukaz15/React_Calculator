import { createContext, useContext, useRef, useState } from "react";

const CalculatorContext = createContext();

export const CalculatorProvider = ({ children }) => {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const resultRef = useRef(null);
  const [result, setResult] = useState(0);

  const value = {
    inputRef,
    inputValue,
    setInputValue,
    resultRef,
    result,
    setResult,
  };

  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  );
};
export const useCalculatorContext = () => useContext(CalculatorContext);
