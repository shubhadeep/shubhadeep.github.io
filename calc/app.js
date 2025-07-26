const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let resetNext = false;

function updateDisplay() {
    display.value = currentInput || '0';
}

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const value = btn.getAttribute('data-value');
        if (btn.id === 'clear') {
            currentInput = '';
            updateDisplay();
        } else if (btn.id === 'equals') {
            try {
                // Evaluate the expression safely
                // eslint-disable-next-line no-eval
                currentInput = eval(currentInput).toString();
            } catch {
                currentInput = 'Error';
            }
            updateDisplay();
            resetNext = true;
        } else {
            if (resetNext && !['+', '-', '*', '/'].includes(value)) {
                currentInput = '';
                resetNext = false;
            }
            if (value) {
                currentInput += value;
                updateDisplay();
            }
        }
    });
});

updateDisplay();