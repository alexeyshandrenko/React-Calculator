import { useState } from 'react';
import styles from './App.module.css';

const numbers = [
	{ id: 0, num: '0' },
	{ id: 1, num: '1' },
	{ id: 2, num: '2' },
	{ id: 3, num: '3' },
	{ id: 4, num: '4' },
	{ id: 5, num: '5' },
	{ id: 6, num: '6' },
	{ id: 7, num: '7' },
	{ id: 8, num: '8' },
	{ id: 9, num: '9' },
];

const operators = [
	{ id: 0, operator: '+' },
	{ id: 1, operator: '-' },
	{ id: 2, operator: '=' },
	{ id: 3, operator: 'C' },
];

function App() {
	const [operand1, setOperand1] = useState('');
	const [operator, setOperator] = useState('');
	const [operand2, setOperand2] = useState('');
	const [isResult, setIsResult] = useState(false);

	const handleClickNumbers = (num) => {
		if (operand1 && isResult) {
			setIsResult(false);
			setOperand1(num);
		} else if (operand1 && operator) {
			setOperand2((prev) =>
				operand2.length > 10 || (operand2[0] === '0' && num === '0')
					? prev
					: operand2[0] === '0' && num !== '0'
						? num
						: prev + num,
			);
		} else {
			setOperand1((prev) =>
				operand1.length > 10 || (operand1[0] === '0' && num === '0')
					? prev
					: operand1[0] === '0' && num !== '0'
						? num
						: prev + num,
			);
		}
	};

	const handleClickOperator = (sign) => {
		switch (sign) {
			case '+':
				if (operand1 && !isResult) {
					setOperator('+');
				}
				break;
			case '-':
				if (operand1 && !isResult) {
					setOperator('-');
				}
				break;
			case '=':
				if (operand1 && operand2) {
					if (operator === '+') {
						setOperand1(+operand1 + +operand2);
					}
					if (operator === '-') {
						setOperand1(+operand1 - +operand2);
					}
					setOperator('');
					setOperand2('');
					setIsResult(true);
				}
				break;
			case 'C':
				setOperand1('');
				setOperator('');
				setOperand2('');
				break;
			default:
				return null;
		}
	};

	return (
		<main className={styles.calculator}>
			<header className={styles.calculatorHeader}>
				<p
					className={
						isResult
							? `${styles.calculatorField} ${styles.result}`
							: styles.calculatorField
					}
				>
					{operand1}
				</p>
				<p className={styles.calculatorField}>{operator}</p>
				<p className={styles.calculatorField}>{operand2}</p>
			</header>
			<section className={styles.calculatorBody}>
				<ul className={styles.calculatorNumbers}>
					{numbers.map(({ id, num }) => {
						return (
							<li
								key={id}
								className={`${styles.calculatorButton} ${styles[`item${id}`]}`}
							>
								<button onClick={() => handleClickNumbers(num)}>
									{num}
								</button>
							</li>
						);
					})}
				</ul>
				<ul className={styles.calculatorOperators}>
					{operators.map(({ id, operator }) => {
						return (
							<li key={id} className={`${styles.calculatorButton}`}>
								<button onClick={() => handleClickOperator(operator)}>
									{operator}
								</button>
							</li>
						);
					})}
				</ul>
			</section>
		</main>
	);
}

export default App;
