import { useState } from 'react';
import { Plus, Minus, X, Divide, Percent, Delete, Equal } from 'lucide-react';

// Main Calculator App Component
export default function CalculatorApp() {
  // State variables to manage calculator's state
  const [displayValue, setDisplayValue] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  // Function to handle number inputs
  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplayValue(String(digit));
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
    }
  };

  // Function to handle decimal point input
  const inputDecimal = () => {
    if (waitingForSecondOperand) {
        setDisplayValue('0.');
        setWaitingForSecondOperand(false);
        return;
    }
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  // Function to clear the entire calculator state
  const clearAll = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };
  
  // Function to handle backspace/delete
  const deleteLast = () => {
    if (displayValue.length > 1) {
        setDisplayValue(displayValue.slice(0, -1));
    } else {
        setDisplayValue('0');
    }
  }

  // Core calculation logic
  const calculate = (op1, op2, op) => {
    switch (op) {
      case '+':
        return op1 + op2;
      case '-':
        return op1 - op2;
      case '*':
        return op1 * op2;
      case '/':
        if (op2 === 0) return 'Error';
        return op1 / op2;
      default:
        return op2;
    }
  };

  // Function to handle operator inputs (+, -, *, /)
  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (operator && waitingForSecondOperand) {
        setOperator(nextOperator);
        return;
    }

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplayValue(String(parseFloat(result.toFixed(7))));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };
  
  // Function for percentage calculation
  const handlePercent = () => {
      const currentValue = parseFloat(displayValue);
      const result = currentValue / 100;
      setDisplayValue(String(result));
  }

  // Button component for reusability
  const Button = ({ onClick, children, className = '' }) => (
    <button
      onClick={onClick}
      className={`flex justify-center items-center h-20 w-20 rounded-full text-3xl font-medium focus:outline-none transition-colors duration-200 ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center font-sans">
      <div className="w-full max-w-sm mx-auto">
        <div className="bg-black rounded-3xl shadow-2xl p-4 sm:p-6">
          {/* Display Screen */}
          <div className="mb-6 h-24 flex items-end justify-end">
            <p className="text-white text-6xl font-light tracking-wider break-all text-right">
              {displayValue}
            </p>
          </div>

          {/* Button Grid */}
          <div className="grid grid-cols-4 gap-3">
            {/* Row 1 */}
            <Button onClick={clearAll} className="bg-gray-400 text-black hover:bg-gray-300">AC</Button>
            <Button onClick={deleteLast} className="bg-gray-400 text-black hover:bg-gray-300"><Delete size={30} /></Button>
            <Button onClick={handlePercent} className="bg-gray-400 text-black hover:bg-gray-300"><Percent size={30} /></Button>
            <Button onClick={() => performOperation('/')} className={`text-white ${operator === '/' && !waitingForSecondOperand ? 'bg-white text-yellow-500' : 'bg-yellow-500'}`}><Divide size={30} /></Button>
            
            {/* Row 2 */}
            <Button onClick={() => inputDigit(7)} className="bg-gray-700 text-white hover:bg-gray-600">7</Button>
            <Button onClick={() => inputDigit(8)} className="bg-gray-700 text-white hover:bg-gray-600">8</Button>
            <Button onClick={() => inputDigit(9)} className="bg-gray-700 text-white hover:bg-gray-600">9</Button>
            <Button onClick={() => performOperation('*')} className={`text-white ${operator === '*' && !waitingForSecondOperand ? 'bg-white text-yellow-500' : 'bg-yellow-500'}`}><X size={30} /></Button>

            {/* Row 3 */}
            <Button onClick={() => inputDigit(4)} className="bg-gray-700 text-white hover:bg-gray-600">4</Button>
            <Button onClick={() => inputDigit(5)} className="bg-gray-700 text-white hover:bg-gray-600">5</Button>
            <Button onClick={() => inputDigit(6)} className="bg-gray-700 text-white hover:bg-gray-600">6</Button>
            <Button onClick={() => performOperation('-')} className={`text-white ${operator === '-' && !waitingForSecondOperand ? 'bg-white text-yellow-500' : 'bg-yellow-500'}`}><Minus size={30} /></Button>

            {/* Row 4 */}
            <Button onClick={() => inputDigit(1)} className="bg-gray-700 text-white hover:bg-gray-600">1</Button>
            <Button onClick={() => inputDigit(2)} className="bg-gray-700 text-white hover:bg-gray-600">2</Button>
            <Button onClick={() => inputDigit(3)} className="bg-gray-700 text-white hover:bg-gray-600">3</Button>
            <Button onClick={() => performOperation('+')} className={`text-white ${operator === '+' && !waitingForSecondOperand ? 'bg-white text-yellow-500' : 'bg-yellow-500'}`}><Plus size={30} /></Button>

            {/* Row 5 */}
            <Button onClick={() => inputDigit(0)} className="col-span-2 w-auto justify-start pl-8 bg-gray-700 text-white hover:bg-gray-600">0</Button>
            <Button onClick={inputDecimal} className="bg-gray-700 text-white hover:bg-gray-600">.</Button>
            <Button onClick={() => performOperation('=')} className="bg-yellow-500 text-white hover:bg-yellow-400"><Equal size={30} /></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
