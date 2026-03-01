/**
 * Recursion Examples - Classic Problems
 * Demonstrates various recursive patterns and techniques
 */

// 1. Factorial - O(n)
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

// 2. Fibonacci - O(2^n) without memoization
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// 3. Fibonacci with memoization - O(n)
function fibonacciMemo(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    
    memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
    return memo[n];
}

// 4. Power function - O(log n)
function power(base, exponent) {
    if (exponent === 0) return 1;
    if (exponent === 1) return base;
    
    const half = power(base, Math.floor(exponent / 2));
    if (exponent % 2 === 0) {
        return half * half;
    } else {
        return base * half * half;
    }
}

// 5. Sum of digits - O(log n)
function sumOfDigits(n) {
    if (n === 0) return 0;
    return (n % 10) + sumOfDigits(Math.floor(n / 10));
}

// 6. Reverse a string - O(n)
function reverseString(str) {
    if (str.length <= 1) return str;
    return reverseString(str.slice(1)) + str[0];
}

// 7. Check palindrome - O(n)
function isPalindrome(str, start = 0, end = str.length - 1) {
    if (start >= end) return true;
    if (str[start] !== str[end]) return false;
    return isPalindrome(str, start + 1, end - 1);
}

// 8. Binary search - O(log n)
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) return -1;
    
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    
    if (arr[mid] > target) {
        return binarySearchRecursive(arr, target, left, mid - 1);
    } else {
        return binarySearchRecursive(arr, target, mid + 1, right);
    }
}

// 9. GCD (Greatest Common Divisor) - O(log min(a,b))
function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
}

// 10. Sum of array - O(n)
function sumArray(arr, n = arr.length) {
    if (n <= 0) return 0;
    return arr[n - 1] + sumArray(arr, n - 1);
}

// 11. Find maximum in array - O(n)
function findMax(arr, n = arr.length) {
    if (n === 1) return arr[0];
    return Math.max(arr[n - 1], findMax(arr, n - 1));
}

// 12. Count occurrences - O(n)
function countOccurrences(arr, target, index = 0) {
    if (index >= arr.length) return 0;
    const count = arr[index] === target ? 1 : 0;
    return count + countOccurrences(arr, target, index + 1);
}

// 13. Decimal to binary - O(log n)
function decimalToBinary(n) {
    if (n === 0) return '';
    return decimalToBinary(Math.floor(n / 2)) + (n % 2);
}

// 14. Tower of Hanoi - O(2^n)
function towerOfHanoi(n, from = 'A', to = 'C', aux = 'B') {
    if (n === 1) {
        console.log(`Move disk 1 from ${from} to ${to}`);
        return;
    }
    
    towerOfHanoi(n - 1, from, aux, to);
    console.log(`Move disk ${n} from ${from} to ${to}`);
    towerOfHanoi(n - 1, aux, to, from);
}

// 15. Print array recursively - O(n)
function printArray(arr, index = 0) {
    if (index >= arr.length) return;
    console.log(arr[index]);
    printArray(arr, index + 1);
}

// 16. Flatten nested array - O(n)
function flattenArray(arr) {
    let result = [];
    for (let item of arr) {
        if (Array.isArray(item)) {
            result = result.concat(flattenArray(item));
        } else {
            result.push(item);
        }
    }
    return result;
}

// 17. Generate all binary strings of length n - O(2^n)
function generateBinaryStrings(n, str = '') {
    if (n === 0) {
        console.log(str);
        return;
    }
    generateBinaryStrings(n - 1, str + '0');
    generateBinaryStrings(n - 1, str + '1');
}

// 18. Count paths in matrix (top-left to bottom-right) - O(2^(m+n))
function countPaths(m, n) {
    if (m === 1 || n === 1) return 1;
    return countPaths(m - 1, n) + countPaths(m, n - 1);
}

// Example usage
if (require.main === module) {
    console.log('=== Recursion Examples ===\n');

    console.log('1. Factorial(5):', factorial(5));
    
    console.log('\n2. Fibonacci(10):', fibonacci(10));
    console.log('   Fibonacci(30) with memo:', fibonacciMemo(30));
    
    console.log('\n3. Power(2, 10):', power(2, 10));
    
    console.log('\n4. Sum of digits in 12345:', sumOfDigits(12345));
    
    console.log('\n5. Reverse "hello":', reverseString('hello'));
    
    console.log('\n6. Is "racecar" palindrome?', isPalindrome('racecar'));
    console.log('   Is "hello" palindrome?', isPalindrome('hello'));
    
    const sortedArr = [1, 3, 5, 7, 9, 11, 13, 15];
    console.log('\n7. Binary search for 7 in', sortedArr);
    console.log('   Result:', binarySearchRecursive(sortedArr, 7));
    
    console.log('\n8. GCD(48, 18):', gcd(48, 18));
    
    const arr = [1, 2, 3, 4, 5];
    console.log('\n9. Sum of', arr, ':', sumArray(arr));
    
    console.log('\n10. Maximum in', arr, ':', findMax(arr));
    
    const arr2 = [1, 2, 3, 2, 4, 2, 5];
    console.log('\n11. Count of 2 in', arr2, ':', countOccurrences(arr2, 2));
    
    console.log('\n12. Decimal 10 to binary:', decimalToBinary(10) || '0');
    
    console.log('\n13. Tower of Hanoi with 3 disks:');
    towerOfHanoi(3);
    
    const nested = [1, [2, 3], [4, [5, 6]], 7];
    console.log('\n14. Flatten', JSON.stringify(nested));
    console.log('    Result:', flattenArray(nested));
    
    console.log('\n15. Binary strings of length 3:');
    generateBinaryStrings(3);
    
    console.log('\n16. Count paths in 3x3 matrix:', countPaths(3, 3));
}

module.exports = {
    factorial,
    fibonacci,
    fibonacciMemo,
    power,
    sumOfDigits,
    reverseString,
    isPalindrome,
    binarySearchRecursive,
    gcd,
    sumArray,
    findMax,
    countOccurrences,
    decimalToBinary,
    towerOfHanoi,
    flattenArray,
    countPaths
};
