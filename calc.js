
let mainDisplay = document.querySelector('#display');
let storedEquation = document.querySelector('#storedEquation');

const clearBtn = document.querySelector('#clearBtn');
const backspaceBtn = document.querySelector('#backspaceBtn');
const oneBtn = document.querySelector('#oneBtn');
const twoBtn = document.querySelector('#twoBtn');
const threeBtn = document.querySelector('#threeBtn');
const fourBtn = document.querySelector('#fourBtn');
const fiveBtn = document.querySelector('#fiveBtn');
const sixBtn = document.querySelector('#sixBtn');
const sevenBtn = document.querySelector('#sevenBtn');
const eightBtn = document.querySelector('#eightBtn');
const nineBtn = document.querySelector('#nineBtn');
const zeroBtn = document.querySelector('#zeroBtn');
const decimalBtn = document.querySelector('#decimalBtn');
const plusBtn = document.querySelector('#plusBtn');
const minusBtn = document.querySelector('#minusBtn');
const divideBtn = document.querySelector('#divideBtn');
const multiplyBtn = document.querySelector('#multiplyBtn');
const equalsBtn = document.querySelector('#equalsBtn');
const posNegBtn = document.querySelector('#posNegBtn');
const exponentialBtn = document.querySelector('exponentialBtn');

let operator = '';
let operand1 = {
	number: '0',
	polarity: '',
	value: function () {
		return this.polarity + this.number;
	}
};

let operand2 = {
	number: '',
	polarity: '',
	value: function () {
		return this.polarity + this.number;
	}
};

display();

posNegBtn.addEventListener('click', togglePosNeg)
equalsBtn.addEventListener('click', equalizer);
clearBtn.addEventListener('click', resetCalc);
backspaceBtn.addEventListener('click', backspace);
document.addEventListener('keyup', logKey);

const digits = document.querySelectorAll('.digit');
digits.forEach(d => {
	d.addEventListener('click',clickDigit);
}); 

const operators = document.querySelectorAll('.operator');
operators.forEach(o => {
	o.addEventListener('click',clickOperator);
}); 

function logKey(e) {
	// console.log(e.key);
	let nums = '0123456789.'
	let operatorKeys = '-+x*%/^'

  if (nums.includes(e.key)) {
  	digitInput(e.key);
  } else if (operatorKeys.includes(e.key)) {
  	operatorInput(e.key);
  } else if (e.key === 'Control') {
  	togglePosNeg();
  } else if (e.key === 'Enter') {
  	equalizer();
  } else if (e.key === 'Delete') {
  	resetCalc();
  } else if (e.key === 'Backspace') {
  	backspace();
  }

}

function digitInput(digit) {

	if (operator === '') {
		constructOp1(digit);
	} else if (operator !== '') {
		constructOp2(digit)
	}
	display();
}

function operatorInput(selection) {

	if (operand1.number === '0') {
		//do nothing
		operator = selection;
	}	else if (operand1.number.slice(-1) === '.'){	
		operand1.number = operand1.number.replace('.','');
		operator = selection;
	} else if (operand2.number !== '') {
		console.log('operator equalizer');
		equalizer();
		operator = selection;
	} else {
		operator = selection;
	}

	display();

}

function equalizer() {

	if (operand2.number !== '') {

		if (operand2.number.slice(-1) === '.'){
			operand2.number = operand2.number.replace('.','');
		}
		storedEquationDisplay();

		result = doMath();
		operand2.number = '';
		operand2.polarity = '';
		operator = '';
		result = result.toString();
		
		if (result.includes('-')) {
			operand1.polarity = '-';
			operand1.number = result.replace('-','');
		} else {
			operand1.polarity = '';
			operand1.number = result;
		}

		display();
	}
}

function doMath() {
	op1 = parseFloat(operand1.value());
	opt = operator;
	op2 = parseFloat(operand2.value());

	if (opt === '+') {
		return (op1 + op2);
  } else if (opt === '-') {
  	return (op1 - op2);
  } else if (opt === 'x' || opt === '*') {
  	return (op1 * op2);
  } else if (opt === '%' || opt === '/') {
  	return (op1 / op2);
  } else if (opt === '^') {
  	return (op1 ** op2);
  }
}

function togglePosNeg() {
	if (operator === '' && operand1.polarity === '') {
		operand1.polarity = '-'
		display();
	} else if (operator === '' && operand1.polarity === '-') {
		operand1.polarity = ''
		display();
	} else if (operator !== '' && operand2.polarity === '') {
			operand2.polarity = '-'
			if (operand2.number === '0') {
				operand2.number = '';
			}
			display();
	} else if (operator !== '' && operand2.polarity === '-') {
			operand2.polarity = ''
			display();
	}

}

function constructOp1(digit) {			
	if (digit === '0' && operand1.number === '0') {
		operand1.number = '0';
	} else if (digit === '.' && operand1.number === '0') {
		operand1.number = '0.'
	} else if (digit === '.' && operand1.number.includes('.')) {
		operand1.number = operand1.number.slice(0,-1)
	} else  {
		if (operand1.number === '0') {
			operand1.number = digit;
		} else {
			operand1.number += digit;
		}
	}
}

function constructOp2(digit) {
	if (digit === '0' && operand2.number === '0') {
		operand2.number = '0';
	} else if (digit === '.' && operand2.number === '') {
		operand2.number = '0.'
	} else if (digit === '.' && operand2.number.includes('.')) {
		operand2.number = operand2.number.slice(0,-1)
	} else {
		operand2.number += digit;
	}
}

function backspace() {

	if (operand2.number !== '') {
		operand2.number = operand2.number.slice(0,-1);
	} else if (operand1.number !== '' && operator !== ''){
		operator = '';
	} else if (operand1.number !== '') {
		operand1.number = operand1.number.slice(0,-1);
	}

	if (operand1.number === '') {
		resetCalc();
	}

	display();

}
  
function resetCalc() { 
	operand1.number = '0';
	operand1.polarity = '';
	operator = '';
	operand2.number = '';
	operand2.polarity = '';
	storedEquation.textContent = '';
	display();
}

function clickDigit() {
	console.log('click');
	digitInput(this.textContent);
}

function clickOperator() {
	console.log('click');
	operatorInput(this.textContent);
}

function display() {
	mainDisplay.textContent = `${operand1.value()} ${operator} ${operand2.value()}`;
}

function displayEquation() {
	storedEquation.textContent = `${operand1.value()} ${operator} ${operand2.value()}`;
}

function storedEquationDisplay() {
	if (storedEquation.textContent === '') {
		storedEquation.textContent = `${operand1.value()} ${operator} ${operand2.value()}`
	}	else if (storedEquation.textContent !== '') {
		storedEquation.textContent += `${operator} ${operand2.value()}`
	}

}