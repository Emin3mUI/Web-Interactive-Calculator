const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
  resetDisplayOnNextDigit: false,
};

const historyDisplay = document.querySelector('.calculator-history');
const screenDisplay = document.querySelector('.calculator-screen');

// Map keyboard keys to calculator buttons
const keyMap = {
  '0': '0','1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9',
  '+': '+','-':'-','*':'*','/':'/','=':'=','Enter':'=','.':'.',
  'Backspace': 'all-clear','Escape':'all-clear'
};

document.addEventListener('keydown', (e) => {
  const key = keyMap[e.key];
  if (!key) return;
  const button = document.querySelector(`button[value="${key}"]`);
  if (button) button.click();
});

document.querySelector('.calculator-keys').addEventListener('click', (event) => {
  const { target } = event;
  if (!target.matches('button')) return;

  const { value, classList } = target;
  if (classList.contains('operator')) {
    handleOperator(value);
    updateDisplay();
    return;
  }

  if (classList.contains('equal-sign')) {
    handleEqual();
    updateDisplay();
    return;
  }

  if (classList.contains('decimal')) {
    inputDecimal(value);
    updateDisplay();
    return;
  }

  if (classList.contains('all-clear')) {
    resetCalculator();
    updateDisplay();
    return;
  }

  inputDigit(value);
  updateDisplay();
});

function updateDisplay() {
  screenDisplay.value = calculator.displayValue;
}

function updateHistory(text = '') {
  historyDisplay.textContent = text;
}

function inputDigit(digit) {
  if (calculator.resetDisplayOnNextDigit) {
    calculator.displayValue = digit;
    calculator.resetDisplayOnNextDigit = false;
    updateHistory('');
    return;
  }

  const { displayValue, waitingForSecondOperand } = calculator;
  if (waitingForSecondOperand) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
}

function inputDecimal(dot) {
  if (calculator.waitingForSecondOperand || calculator.resetDisplayOnNextDigit) return;
  if (!calculator.displayValue.includes(dot)) calculator.displayValue += dot;
}

function formatResult(result, operator) {
  if (operator === '/') {
    if (Number.isInteger(result)) return result.toString();
    return parseFloat(result.toFixed(5)).toString();
  }
  return parseFloat(result.toFixed(7)).toString();
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    updateHistory(`${calculator.firstOperand} ${nextOperator}`);
    return;
  }

  if (firstOperand == null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);
    calculator.displayValue = formatResult(result, operator);
    calculator.firstOperand = result;
  }

  calculator.operator = nextOperator;
  calculator.waitingForSecondOperand = true;
  calculator.resetDisplayOnNextDigit = false;
  updateHistory(`${calculator.firstOperand} ${nextOperator}`);
}

function handleEqual() {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);
  if (!operator || calculator.waitingForSecondOperand) return;

  const result = calculate(firstOperand, inputValue, operator);
  updateHistory(`${firstOperand} ${operator} ${inputValue} =`);
  calculator.displayValue = formatResult(result, operator);
  calculator.firstOperand = null;
  calculator.operator = null;
  calculator.waitingForSecondOperand = false;
  calculator.resetDisplayOnNextDigit = true;
}

function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  calculator.resetDisplayOnNextDigit = false;
  updateHistory('');
}

function calculate(first, second, operator) {
  switch (operator) {
    case '+': return first + second;
    case '-': return first - second;
    case '*': return first * second;
    case '/': return first / second;
  }
  return second;
}