import {
  lastKey,
  isCalculable,
  isDigit,
  isOperator,
  openPar,
  closingPar,
  checkParBalance,
} from "../utils/conditions";

export const useCase = () => {
  const calculable = (v) => {
    return isCalculable(lastKey(v));
  };

  const invalidKey = (v, i) => {
    return isOperator(v) && (isOperator(lastKey(i)) || i === "");
  };

  const addKey = (v) => {
    return isDigit(v) || isOperator(v);
  };

  const openParenthesis = (v, i) => {
    return openPar(v) && isOperator(lastKey(i));
  };

  const closingParenthesis = (v, i) => {
    if (typeof i !== "string") {
      return false;
    }
    return (
      closingPar(v) && checkParBalance(i).unmatched && !openPar(lastKey(i))
    );
  };

  const evaluateExpression = (v, i) => {
    return v === "Enter" && (isDigit(lastKey(i)) || closingPar(lastKey(i)));
  };

  return {
    calculable,
    invalidKey,
    addKey,
    openParenthesis,
    evaluateExpression,
    closingParenthesis,
  };
};
