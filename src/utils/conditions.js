export const checkParBalance = (v) => {
  let par = { l: 0, r: 0 };
  for (let char of v) {
    if (char === "(") {
      par.l++;
    } else if (char === ")") {
      par.r++;
    }
  }
  return {
    unmatched: par.r < par.l,
    balanced: par.r === par.l,
  };
};

export const isOperator = (v) => /^[+\-*/^.%]$/.test(v);
export const isDigit = (v) => /^[0-9]$/.test(v);
export const isCalculable = (v) => /[0-9)]/.test(v);
export const lastKey = (v) => v[v.length - 1];
export const firstKey = (v) => v[0];
export const openPar = (v) => /[(]/.test(v);
export const closingPar = (v) => /[)]/.test(v);
