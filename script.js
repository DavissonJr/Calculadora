document.addEventListener('DOMContentLoaded', function() {
    let currentOp = document.querySelector('#current-op p');
    let currentInput = '';
    let previousInput = '';
    let operation = '';

    function updateDisplay(value) {
        currentOp.textContent = value;
    }

    function appendNumber(number) {
        if (number === '.' && currentInput.includes('.')) return;
        currentInput += number;
        updateDisplay(currentInput);
    }

    function chooseOperation(op) {
        if (currentInput === '') return;
        if (previousInput !== '') {
            compute();
        }
        operation = op;
        previousInput = currentInput;
        currentInput = '';
    }

    function compute() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        if (isNaN(prev) || isNaN(current)) return;

        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }
        currentInput = result;
        operation = '';
        previousInput = '';
        updateDisplay(currentInput);
    }


    function clear() {
        currentInput = '';
        previousInput = '';
        operation = '';
        updateDisplay('0');
    }

    function deleteLast() {
        currentInput = currentInput.toString().slice(0, -1);
        updateDisplay(currentInput || '0');
    }

    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            if (button.textContent >= '0' && button.textContent <= '9' || button.textContent === '.') {
                appendNumber(button.textContent);
            } else if (button.textContent === 'C') {
                clear();
            } else if (button.textContent === 'DEL') {
                deleteLast();
            } else if (button.textContent === 'CE') {
                currentInput = '';
                updateDisplay('0');
            } else if (button.textContent === '=') {
                compute();
            } else {
                chooseOperation(button.textContent);
            }
        });
    });
});
