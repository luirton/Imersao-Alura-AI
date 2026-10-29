class Calculator {
  constructor(previousOperandElement, currentOperandElement) {
    this.previousOperandElement = previousOperandElement;
    this.currentOperandElement = currentOperandElement;
    this.clear();
  }

  clear() {
    this.currentOperand = '0';
    this.previousOperand = '';
    this.operation = undefined;
    this.shouldResetScreen = false;
    this.updateDisplay();
  }

  delete() {
    if (this.shouldResetScreen) {
      this.clear();
      return;
    }
    if (this.currentOperand === '0' || this.currentOperand === 'Erro') return;
    if (this.currentOperand.length === 1 || (this.currentOperand.length === 2 && this.currentOperand.startsWith('-'))) {
      this.currentOperand = '0';
    } else {
      this.currentOperand = this.currentOperand.slice(0, -1);
    }
    this.updateDisplay();
  }

  appendNumber(number) {
    if (this.currentOperand === 'Erro' || this.shouldResetScreen) {
      this.currentOperand = '';
      this.shouldResetScreen = false;
    }
    if (number === '.' && this.currentOperand.includes('.')) return;
    if (number === '.' && (this.currentOperand === '' || this.currentOperand === '0')) {
      this.currentOperand = '0.';
      this.updateDisplay();
      return;
    }
    if (this.currentOperand === '0' && number !== '.') {
      this.currentOperand = number.toString();
    } else {
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    this.updateDisplay();
  }

  chooseOperation(operation) {
    if (this.currentOperand === 'Erro') return;
    if (this.currentOperand === '' && this.previousOperand !== '') {
      this.operation = operation;
      this.updateDisplay();
      return;
    }
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
    this.updateDisplay();
  }

  toggleSign() {
    if (this.currentOperand === 'Erro' || this.currentOperand === '0') return;
    if (this.currentOperand.startsWith('-')) {
      this.currentOperand = this.currentOperand.substring(1);
    } else {
      this.currentOperand = '-' + this.currentOperand;
    }
    this.updateDisplay();
  }

  applyPercent() {
    if (this.currentOperand === 'Erro' || this.currentOperand === '') return;
    const current = parseFloat(this.currentOperand);
    if (isNaN(current)) return;
    
    let result;
    if (this.previousOperand && this.operation) {
      const prev = parseFloat(this.previousOperand);
      if (this.operation === '+' || this.operation === '-') {
        result = (prev * current) / 100;
      } else {
        result = current / 100;
      }
    } else {
      result = current / 100;
    }

    this.currentOperand = this.roundResult(result).toString();
    this.updateDisplay();
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '×':
        computation = prev * current;
        break;
      case '÷':
        if (current === 0) {
          this.currentOperand = 'Erro';
          this.previousOperand = '';
          this.operation = undefined;
          this.shouldResetScreen = true;
          this.updateDisplay();
          return;
        }
        computation = prev / current;
        break;
      default:
        return;
    }

    this.currentOperand = this.roundResult(computation).toString();
    this.operation = undefined;
    this.previousOperand = '';
    this.shouldResetScreen = true;
    this.updateDisplay();
  }

  roundResult(number) {
    return Math.round((number + Number.EPSILON) * 100000000) / 100000000;
  }

  formatDisplayNumber(number) {
    if (number === 'Erro') return 'Erro';
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('pt-BR', { maximumFractionDigits: 0 });
      if (stringNumber.startsWith('-') && integerDigits === 0) {
        integerDisplay = '-' + integerDisplay;
      }
    }

    if (decimalDigits != null) {
      return `${integerDisplay},${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    if (this.currentOperand === 'Erro') {
      this.currentOperandElement.innerText = 'Erro';
    } else if (this.currentOperand === '') {
      this.currentOperandElement.innerText = '0';
    } else {
      this.currentOperandElement.innerText = this.formatDisplayNumber(this.currentOperand);
    }

    if (this.operation != null) {
      this.previousOperandElement.innerText = `${this.formatDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else {
      this.previousOperandElement.innerText = '';
    }
  }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  const previousOperandElement = document.getElementById('previous-operand');
  const currentOperandElement = document.getElementById('current-operand');
  const calculator = new Calculator(previousOperandElement, currentOperandElement);

  // Cliques nos botões
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
      const action = button.dataset.action;
      const value = button.dataset.value;

      if (!action) {
        calculator.appendNumber(value);
      } else if (action === 'operator') {
        calculator.chooseOperation(value);
      } else if (action === 'clear') {
        calculator.clear();
      } else if (action === 'delete') {
        calculator.delete();
      } else if (action === 'equals') {
        calculator.compute();
      } else if (action === 'toggle-sign') {
        calculator.toggleSign();
      } else if (action === 'percent') {
        calculator.applyPercent();
      }
    });
  });

  // Atalhos de teclado
  window.addEventListener('keydown', (e) => {
    if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
      calculator.appendNumber(e.key);
    } else if (e.key === '+') {
      calculator.chooseOperation('+');
    } else if (e.key === '-') {
      calculator.chooseOperation('-');
    } else if (e.key === '*') {
      calculator.chooseOperation('×');
    } else if (e.key === '/') {
      e.preventDefault();
      calculator.chooseOperation('÷');
    } else if (e.key === 'Enter' || e.key === '=') {
      e.preventDefault();
      calculator.compute();
    } else if (e.key === 'Backspace') {
      calculator.delete();
    } else if (e.key === 'Escape') {
      calculator.clear();
    } else if (e.key === '%') {
      calculator.applyPercent();
    }
  });
});
