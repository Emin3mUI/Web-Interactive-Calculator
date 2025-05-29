const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
  resetDisplayOnNextDigit: false
};

const historyDisplay = document.querySelector('.calculator-history');
const screenDisplay = document.querySelector('.calculator-screen');

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
    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.operator = nextOperator;
  calculator.waitingForSecondOperand = true;
  updateHistory(`${calculator.firstOperand} ${nextOperator}`);
}

function handleEqual() {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);
  if (operator == null || calculator.waitingForSecondOperand) return;

  const result = calculate(firstOperand, inputValue, operator);
  updateHistory(`${firstOperand} ${operator} ${inputValue} =`);
  calculator.displayValue = String(result);
  calculator.firstOperand = null;
  calculator.operator = null;
  calculator.waitingForSecondOperand = false;
  calculator.resetDisplayOnNextDigit = true;
  updateDisplay();
}

function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  calculator.resetDisplayOnNextDigit = false;
  updateHistory('');
  updateDisplay();
}

function calculate(first, second, operator) {
  switch (operator) {
    case '+': return first + second;
    case '-': return first - second;
    case '*': return first * second;
    case '/': return second !== 0 ? parseFloat((first / second).toFixed(5)) : 'Error';
  }
  return second;
}

// Button click handler
const buttons = document.querySelectorAll('button');
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('operator')) {
      handleOperator(btn.value);
      updateDisplay();
    } else if (btn.classList.contains('equal-sign')) {
      handleEqual();
    } else if (btn.classList.contains('decimal')) {
      // no decimal in this layout
    } else if (btn.classList.contains('all-clear')) {
      resetCalculator();
    } else {
      inputDigit(btn.value);
      updateDisplay();
    }
  });
});

// Keyboard support
document.addEventListener('keydown', (e) => {
  let key = e.key;
  if (key === 'Enter') key = '=';
  if (/[0-9/*+\-]/.test(key) || key === '=') {
    const btn = document.querySelector(`button[value="${key}"]`);
    if (btn) btn.click();
  }
});
