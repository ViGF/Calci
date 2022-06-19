/*Toggle Colors*/

const header = document.getElementById('header')
let prevColors = ['#f5b561', '#faddb7', '#f19a27']

function showPalettes() {
    header.classList.toggle('show-palettes')
    getPrevColors()
}

function closePalettes() {
    header.classList.remove('show-palettes')
}

function getPrevColors() {
    prevColors = [
        getComputedStyle(document.documentElement).getPropertyValue('--primary-color'),
        getComputedStyle(document.documentElement).getPropertyValue('--secondary-color'),
        getComputedStyle(document.documentElement).getPropertyValue('--result-color')
    ]
}

function setPalette(list) {
    document.documentElement.style.setProperty('--primary-color', list[0])
    document.documentElement.style.setProperty('--secondary-color', list[1])
    document.documentElement.style.setProperty('--result-color', list[2])
}

function setPrevColors() {
    document.documentElement.style.setProperty('--primary-color', prevColors[0])
    document.documentElement.style.setProperty('--secondary-color', prevColors[1])
    document.documentElement.style.setProperty('--result-color', prevColors[2])
}


/*Calculator Logic*/

const numberButtons = document.querySelectorAll('[data-number]')
const operationsButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const deleteAllButton = document.querySelector('[data-delete-all]')
const currentOperand = document.querySelector('[data-current-operand]')
const previousOperand = document.querySelector('[data-previous-operand]')


class Calculator {
    constructor(currentOperand, previousOperand) {
        this.currentOperand = currentOperand
        this.previousOperand = previousOperand
        this.clear()
    }

    formatDisplayNumber(number) {
        const stringNumber = number.toString()

        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]

        let integerDisplay

        if(isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('pt-br', {maximumFractionDigits: 0})
        }

        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    delete() {
        this.currentOperand = this.currentOperand.slice(0, -1)
    }

    calculate() {
        let result

        const _currentOperand = parseFloat(this.currentOperand)
        const _previousOperand = parseFloat(this.previousOperand)

        if(isNaN(_previousOperand) ||isNaN(_currentOperand)) return

        switch (this.operation) {
            case '+':
                result = _previousOperand + _currentOperand
                break;
            case '-':
                result = _previousOperand - _currentOperand
                break;
            case '/':
                result = _previousOperand / _currentOperand
                break;
            case 'x':
                result = _previousOperand * _currentOperand
                break;
            case '%':
                result = (_previousOperand / 100) * _currentOperand
                break;
            default:
                return;
        }

        this.currentOperand = result
        this.operation = undefined
        this.previousOperand = ''
    }

    chooseOperation(operation) {
        if (this.currentOperand !== '') {
            this.calculate()
        }

        this.operation = operation

        this.previousOperand = this.currentOperand
        this.currentOperand = '0'
    }

    appendNumber(number) {
        if (this.currentOperand.split('')[this.currentOperand.split('').length - 1] === '.'  && number === '.') return
        if (this.currentOperand === '0') {
            return this.currentOperand = `${number}`
        }
        this.currentOperand = `${this.currentOperand}${number}`
    }

    clear() {
        this.currentOperand = '0'
        this.previousOperand = ''
        this.operation = undefined
    }

    updateDisplay() {
        previousOperand.innerText = `${this.formatDisplayNumber(this.previousOperand)} ${this.operation || ''}`
        currentOperand.innerText = this.formatDisplayNumber(this.currentOperand)
    }
}

const calculator = new Calculator(currentOperand.innerText, previousOperand.innerText)

for (const numberButton of numberButtons) {
    numberButton.addEventListener('click', () => {
        calculator.appendNumber(numberButton.value)
        calculator.updateDisplay()
    })
}

for (const operationButton of operationsButtons) {
    operationButton.addEventListener('click', () => {
        calculator.chooseOperation(operationButton.value)
        calculator.updateDisplay()
    })
}

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})

deleteAllButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

equalsButton.addEventListener('click', () => {
    calculator.calculate()
    calculator.updateDisplay()
})