import { evaluate } from "mathjs";
import { useCallback } from "react";
import { useCase } from "./useCase";
import { useCalculatorContext } from "./calculatorContext";
import { checkParBalance } from "../utils/conditions";

export const useCalculator = () => {
  const { inputValue, setInputValue, result, setResult } =
    useCalculatorContext();
  const { calculable } = useCase();

  const calculate = useCallback(() => {
    try {
      let input;
      if (calculable(inputValue) && checkParBalance(inputValue).balanced) {
        input = evaluate(inputValue);
      }
      !isNaN(input) ? setResult(input) : setResult(result);
    } catch (error) {
      alert("Invalid expression.");
      console.log(error);
      setInputValue("");
    }
  }, [inputValue, setInputValue, result, setResult, calculable]);

  return {
    calculate,
  };
};
