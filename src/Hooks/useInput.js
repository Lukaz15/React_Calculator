import { useCallback, useEffect, useMemo } from "react";
import { useCase } from "./useCase";
import { useCalculator } from "./useCalculator";
import { useCalculatorContext } from "./calculatorContext";
import Button from "../components/Button";

export const useInput = () => {
  const { inputValue, setInputValue, inputRef, result, setResult } =
    useCalculatorContext();
  const { calculate } = useCalculator();
  const {
    invalidKey,
    addKey,
    openParenthesis,
    closingParenthesis,
    evaluateExpression,
  } = useCase();
  const buttons = useMemo(
    () => [
      { v: "1" },
      { v: "2" },
      { v: "3" },
      { l: "X", v: "Backspace" },
      { v: "4" },
      { v: "5" },
      { v: "6" },
      { v: "*" },
      { v: "7" },
      { v: "8" },
      { v: "9" },
      { v: "-" },
      { v: "(" },
      { v: "0" },
      { v: ")" },
      { v: "+" },
      { v: "." },
      { v: "%" },
      { v: "^" },
      { v: "/" },
      { l: "=", v: "Enter" },
      { l: "Del", v: "Delete" },
    ],
    []
  );

  const calculatorButtons = buttons.map((btn) => (
    <Button
      key={btn.v}
      onClick={() => insertKey(btn.v)}
      label={btn.l || btn.v}
    />
  ));

  const handleKeyPress = useCallback(
    (e) => {
      buttons.forEach((button) => {
        if (
          e.key === "Tab" ||
          (e.preventDefault && e.key === button.v.replace(/[0-9]/, ""))
        ) {
          e.preventDefault();
        }
      });

      switch (true) {
        case invalidKey(e.key, inputValue):
          break;

        case addKey(e.key):
          setInputValue(inputValue + e.key);
          break;

        case openParenthesis(e.key, inputValue):
          setInputValue(inputValue + e.key);
          break;

        case closingParenthesis(e.key, inputValue):
          setInputValue(inputValue + e.key);
          break;

        case e.key === "Backspace":
          setInputValue(inputValue.toString().slice(0, -1));
          break;

        case evaluateExpression(e.key, inputValue):
          calculate();
          setInputValue(result);
          setResult(inputValue);
          break;

        case e.key === "Delete":
          setInputValue("");
          setResult("");
          break;

        default:
          break;
      }
    },
    [
      result,
      calculate,
      inputValue,
      setInputValue,
      setResult,
      buttons,
      addKey,
      evaluateExpression,
      invalidKey,
      openParenthesis,
      closingParenthesis,
    ]
  );

  const insertKey = useCallback(
    (n) => {
      const e = { key: n };
      handleKeyPress(e);
    },
    [handleKeyPress]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    const updateLayout = () => {
      calculate();
      if (inputValue === "") {
        setResult("");
      }
      const charSize = inputRef.current.clientWidth / inputValue.length;
      const maxInputLen = Math.round(
        inputRef.current.parentElement.parentElement.parentElement.clientWidth /
          charSize
      );
      if (inputValue.length > maxInputLen) {
        const offSet =
          inputRef.current.clientWidth - charSize * maxInputLen - charSize / 10;
        inputRef.current.style.transform = `translateX(-${offSet}px)`;
      } else {
        inputRef.current.style.transform = `translateX(0)`;
      }
    };
    updateLayout();
    document.addEventListener("resize", updateLayout());
    return () => {
      document.removeEventListener("resize", updateLayout());
    };
  }, [inputValue, calculate, inputRef, setInputValue, setResult]);

  return {
    inputValue,
    setInputValue,
    handleKeyPress,
    calculatorButtons,
  };
};
