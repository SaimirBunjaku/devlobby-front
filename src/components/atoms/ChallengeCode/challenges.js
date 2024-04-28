import { toast } from 'react-toastify';

const challenges = {
  '661799e30a6f8385c1271c7f': {
    description: "Check Prime Number",
    test: (code) => {
      try {
        const isPrimeFunction = new Function(code + '; return isPrime;');
        const isPrime = isPrimeFunction();
        if (typeof isPrime !== 'function') {
          toast.error('isPrime is not defined as a function. Please define it correctly.');
          return;
        }
        const testResult = isPrime(5) && !isPrime(4);
        if (testResult) {
          toast.success('Correct!');
        } else {
          toast.error('Not Correct. Please try again.');
        }
      } catch (error) {
        toast.error('Error in code execution: ' + error.message);
      }
    }
  },
  '66186b960a6f8385c1271d6e': {
    description: "Generate Sequence of Numbers",
    test: (code) => {
      try {
        const generateSequenceFunction = new Function(code + '; return generateSequence;');
        const generateSequence = generateSequenceFunction();
        if (typeof generateSequence !== 'function') {
          toast.error('generateSequence is not defined as a function. Please define it correctly.');
          return;
        }
        const testResult = JSON.stringify(generateSequence(5)) === JSON.stringify([1, 2, 3, 4, 5]);
        if (testResult) {
          toast.success('Correct!');
        } else {
          toast.error('Not Correct. Please try again.');
        }
      } catch (error) {
        toast.error('Error in code execution: ' + error.message);
      }
    }
  },
  '66186dd90a6f8385c1271d94': {
    description: "Reverse a String",
    test: (code) => {
      try {
        const reverseStringFunction = new Function(code + '; return reverseString;');
        const reverseString = reverseStringFunction();
        if (typeof reverseString !== 'function') {
          toast.error('reverseString is not defined as a function. Please define it correctly.');
          return;
        }
        const testResult = reverseString('hello') === 'olleh';
        if (testResult) {
          toast.success('Correct!');
        } else {
          toast.error('Not Correct. Please try again.');
        }
      } catch (error) {
        toast.error('Error in code execution: ' + error.message);
      }
    }
  },
  '66186e190a6f8385c1271d98': {
    description: "Calculate Factorial",
    test: (code) => {
      try {
        const factorialFunction = new Function(code + '; return factorial;');
        const factorial = factorialFunction();
        if (typeof factorial !== 'function') {
          toast.error('factorial is not defined as a function. Please define it correctly.');
          return;
        }
        const testResult = factorial(5) === 120;
        if (testResult) {
          toast.success('Correct!');
        } else {
          toast.error('Not Correct. Please try again.');
        }
      } catch (error) {
        toast.error('Error in code execution: ' + error.message);
      }
    }
  },
  '66186e440a6f8385c1271d9c': {
    description: "Find Maximum in Array",
    test: (code) => {
      try {
        const findMaximumFunction = new Function(code + '; return findMaximum;');
        const findMaximum = findMaximumFunction();
        if (typeof findMaximum !== 'function') {
          toast.error('findMaximum is not defined as a function. Please define it correctly.');
          return;
        }
        const testResult = findMaximum([1, 3, 2]) === 3;
        if (testResult) {
          toast.success('Correct!');
        } else {
          toast.error('Not Correct. Please try again.');
        }
      } catch (error) {
        toast.error('Error in code execution: ' + error.message);
      }
    }
  },
  '66186e750a6f8385c1271da0': {
    description: "Sum of Array",
    test: (code) => {
      try {
        const sumArrayFunction = new Function(code + '; return sumArray;');
        const sumArray = sumArrayFunction();
        if (typeof sumArray !== 'function') {
          toast.error('sumArray is not defined as a function. Please define it correctly.');
          return;
        }
        const testResult = sumArray([1, 2, 3]) === 6;
        if (testResult) {
          toast.success('Correct!');
        } else {
          toast.error('Not Correct. Please try again.');
        }
      } catch (error) {
        toast.error('Error in code execution: ' + error.message);
      }
    }
  },
  '66186eae0a6f8385c1271da4': {
    description: "Palindrome Checker",
    test: (code) => {
      try {
        const isPalindromeFunction = new Function(code + '; return isPalindrome;');
        const isPalindrome = isPalindromeFunction();
        if (typeof isPalindrome !== 'function') {
          toast.error('isPalindrome is not defined as a function. Please define it correctly.');
          return;
        }
        const testResult = isPalindrome('radar') && !isPalindrome('hello');
        if (testResult) {
          toast.success('Correct!');
        } else {
          toast.error('Not Correct. Please try again.');
        }
      } catch (error) {
        toast.error('Error in code execution: ' + error.message);
      }
    }
  },
  '66186f220a6f8385c1271db0': {
    description: "Is Array Sorted",
    test: (code) => {
      try {
        const isArraySortedFunction = new Function(code + '; return isArraySorted;');
        const isArraySorted = isArraySortedFunction();
        if (typeof isArraySorted !== 'function') {
          toast.error('isArraySorted is not defined as a function. Please define it correctly.');
          return;
        }
        const testResult = isArraySorted([1, 2, 3]) && !isArraySorted([3, 1, 2]);
        if (testResult) {
          toast.success('Correct!');
        } else {
          toast.error('Not Correct. Please try again.');
        }
      } catch (error) {
        toast.error('Error in code execution: ' + error.message);
      }
    }
  }
};

export default challenges;