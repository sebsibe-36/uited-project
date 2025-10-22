
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
                this.updateDisplay();
            }
            
            delete() {
                if (this.currentOperand === '0') return;
                this.currentOperand = this.currentOperand.toString().slice(0, -1);
                if (this.currentOperand === '') {
                    this.currentOperand = '0';
                }
                this.updateDisplay();
            }
            
            appendNumber(number) {
                if (number === '.' && this.currentOperand.includes('.')) return;
                
                if (this.currentOperand === '0' && number !== '.') {
                    this.currentOperand = number;
                } else {
                    this.currentOperand = this.currentOperand.toString() + number.toString();
                }
                
                this.updateDisplay();
            }
            
            chooseOperation(operation) {
                if (this.currentOperand === '0') return;
                
                if (this.previousOperand !== '') {
                    this.compute();
                }
                
                this.operation = operation;
                this.previousOperand = this.currentOperand;
                this.currentOperand = '0';
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
                        computation = prev / current;
                        break;
                    case '%':
                        computation = prev % current;
                        break;
                    default:
                        return;
                }
                
                this.currentOperand = computation.toString();
                this.operation = undefined;
                this.previousOperand = '';
                this.updateDisplay();
            }
            
            toggleSign() {
                if (this.currentOperand === '0') return;
                this.currentOperand = (parseFloat(this.currentOperand) * -1).toString();
                this.updateDisplay();
            }
            
            getDisplayNumber(number) {
                const stringNumber = number.toString();
                const integerDigits = parseFloat(stringNumber.split('.')[0]);
                const decimalDigits = stringNumber.split('.')[1];
                let integerDisplay;
                
                if (isNaN(integerDigits)) {
                    integerDisplay = '';
                } else {
                    integerDisplay = integerDigits.toLocaleString('en', {
                        maximumFractionDigits: 0
                    });
                }
                
                if (decimalDigits != null) {
                    return `${integerDisplay}.${decimalDigits}`;
                } else {
                    return integerDisplay;
                }
            }
            
            updateDisplay() {
                this.currentOperandElement.innerText = this.getDisplayNumber(this.currentOperand);
                
                if (this.operation != null) {
                    this.previousOperandElement.innerText = 
                        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
                } else {
                    this.previousOperandElement.innerText = '';
                }
            }
        }
        
        // Initialize calculator
        const previousOperandElement = document.querySelector('.previous-operand');
        const currentOperandElement = document.querySelector('.current-operand');
        const calculator = new Calculator(previousOperandElement, currentOperandElement);
        
        // Add event listeners to buttons
        document.querySelectorAll('.number').forEach(button => {
            button.addEventListener('click', () => {
                calculator.appendNumber(button.innerText);
            });
        });
        
        document.querySelectorAll('.operator').forEach(button => {
            if (button.innerText === '±') {
                button.addEventListener('click', () => {
                    calculator.toggleSign();
                });
            } else {
                button.addEventListener('click', () => {
                    calculator.chooseOperation(button.innerText);
                });
            }
        });
        
        document.querySelector('.equals').addEventListener('click', () => {
            calculator.compute();
        });
        
        document.querySelector('.clear').addEventListener('click', () => {
            calculator.clear();
        });
        
        // Keyboard support
        document.addEventListener('keydown', event => {
            if (event.key >= '0' && event.key <= '9') {
                calculator.appendNumber(event.key);
            } else if (event.key === '.') {
                calculator.appendNumber('.');
            } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
                let operation;
                switch (event.key) {
                    case '+': operation = '+'; break;
                    case '-': operation = '-'; break;
                    case '*': operation = '×'; break;
                    case '/': operation = '÷'; break;
                }
                calculator.chooseOperation(operation);
            } else if (event.key === 'Enter' || event.key === '=') {
                calculator.compute();
            } else if (event.key === 'Escape' || event.key === 'Delete') {
                calculator.clear();
            } else if (event.key === 'Backspace') {
                calculator.delete();
            }
        });
