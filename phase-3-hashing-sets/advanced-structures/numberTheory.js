/**
 * Number Theory Algorithms
 * Prime numbers, GCD, LCM, Modular arithmetic
 */

// 1. Sieve of Eratosthenes - O(n log log n)
function sieveOfEratosthenes(n) {
    const isPrime = Array(n + 1).fill(true);
    isPrime[0] = isPrime[1] = false;

    for (let i = 2; i * i <= n; i++) {
        if (isPrime[i]) {
            for (let j = i * i; j <= n; j += i) {
                isPrime[j] = false;
            }
        }
    }

    const primes = [];
    for (let i = 2; i <= n; i++) {
        if (isPrime[i]) primes.push(i);
    }

    return primes;
}

// 2. Check if number is prime - O(√n)
function isPrime(n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;

    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) {
            return false;
        }
    }

    return true;
}

// 3. Prime factorization - O(√n)
function primeFactorization(n) {
    const factors = [];

    while (n % 2 === 0) {
        factors.push(2);
        n = Math.floor(n / 2);
    }

    for (let i = 3; i * i <= n; i += 2) {
        while (n % i === 0) {
            factors.push(i);
            n = Math.floor(n / i);
        }
    }

    if (n > 2) {
        factors.push(n);
    }

    return factors;
}

// Count prime factors with multiplicity
function primeFactorsCount(n) {
    const factors = {};

    while (n % 2 === 0) {
        factors[2] = (factors[2] || 0) + 1;
        n = Math.floor(n / 2);
    }

    for (let i = 3; i * i <= n; i += 2) {
        while (n % i === 0) {
            factors[i] = (factors[i] || 0) + 1;
            n = Math.floor(n / i);
        }
    }

    if (n > 2) {
        factors[n] = (factors[n] || 0) + 1;
    }

    return factors;
}

// 4. GCD (Greatest Common Divisor) - Euclidean Algorithm - O(log min(a,b))
function gcd(a, b) {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
}

// Recursive GCD
function gcdRecursive(a, b) {
    return b === 0 ? a : gcdRecursive(b, a % b);
}

// 5. LCM (Least Common Multiple) - O(log min(a,b))
function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

// 6. Extended Euclidean Algorithm
// Returns [gcd, x, y] where gcd = a*x + b*y
function extendedGCD(a, b) {
    if (b === 0) {
        return [a, 1, 0];
    }

    const [gcd, x1, y1] = extendedGCD(b, a % b);
    const x = y1;
    const y = x1 - Math.floor(a / b) * y1;

    return [gcd, x, y];
}

// 7. Modular exponentiation - O(log n)
function modPower(base, exp, mod) {
    let result = 1;
    base = base % mod;

    while (exp > 0) {
        if (exp % 2 === 1) {
            result = (result * base) % mod;
        }

        exp = Math.floor(exp / 2);
        base = (base * base) % mod;
    }

    return result;
}

// 8. Modular multiplicative inverse - O(log n)
function modInverse(a, m) {
    const [gcd, x] = extendedGCD(a, m);

    if (gcd !== 1) {
        return null; // Inverse doesn't exist
    }

    return ((x % m) + m) % m;
}

// 9. Chinese Remainder Theorem
function chineseRemainder(remainders, moduli) {
    const product = moduli.reduce((a, b) => a * b, 1);
    let sum = 0;

    for (let i = 0; i < remainders.length; i++) {
        const p = product / moduli[i];
        sum += remainders[i] * modInverse(p, moduli[i]) * p;
    }

    return sum % product;
}

// 10. Euler's Totient Function - O(√n)
function eulerTotient(n) {
    let result = n;

    for (let p = 2; p * p <= n; p++) {
        if (n % p === 0) {
            while (n % p === 0) {
                n = Math.floor(n / p);
            }
            result -= result / p;
        }
    }

    if (n > 1) {
        result -= result / n;
    }

    return Math.floor(result);
}

// 11. Count divisors - O(√n)
function countDivisors(n) {
    let count = 0;

    for (let i = 1; i * i <= n; i++) {
        if (n % i === 0) {
            count += (i * i === n) ? 1 : 2;
        }
    }

    return count;
}

// Get all divisors - O(√n)
function getAllDivisors(n) {
    const divisors = [];

    for (let i = 1; i * i <= n; i++) {
        if (n % i === 0) {
            divisors.push(i);
            if (i * i !== n) {
                divisors.push(n / i);
            }
        }
    }

    return divisors.sort((a, b) => a - b);
}

// 12. Fibonacci using matrix exponentiation - O(log n)
function fibonacciMatrix(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;

    const multiply = (a, b) => {
        return [
            [a[0][0] * b[0][0] + a[0][1] * b[1][0],
             a[0][0] * b[0][1] + a[0][1] * b[1][1]],
            [a[1][0] * b[0][0] + a[1][1] * b[1][0],
             a[1][0] * b[0][1] + a[1][1] * b[1][1]]
        ];
    };

    const power = (matrix, n) => {
        if (n === 1) return matrix;

        if (n % 2 === 0) {
            const half = power(matrix, n / 2);
            return multiply(half, half);
        }

        return multiply(matrix, power(matrix, n - 1));
    };

    const result = power([[1, 1], [1, 0]], n);
    return result[0][1];
}

// 13. Catalan Number - O(n)
function catalanNumber(n) {
    const dp = Array(n + 1).fill(0);
    dp[0] = dp[1] = 1;

    for (let i = 2; i <= n; i++) {
        for (let j = 0; j < i; j++) {
            dp[i] += dp[j] * dp[i - 1 - j];
        }
    }

    return dp[n];
}

// Example usage
if (require.main === module) {
    console.log('=== Number Theory Algorithms ===\n');

    console.log('1. Primes up to 50:', sieveOfEratosthenes(50));

    console.log('\n2. Is 17 prime?', isPrime(17));
    console.log('   Is 18 prime?', isPrime(18));

    console.log('\n3. Prime factorization of 60:', primeFactorization(60));
    console.log('   With counts:', primeFactorsCount(60));

    console.log('\n4. GCD(48, 18):', gcd(48, 18));
    console.log('   LCM(48, 18):', lcm(48, 18));

    const [g, x, y] = extendedGCD(35, 15);
    console.log(`\n5. Extended GCD(35, 15): ${g} = 35*${x} + 15*${y}`);

    console.log('\n6. 2^10 mod 1000:', modPower(2, 10, 1000));

    console.log('\n7. Modular inverse of 3 mod 11:', modInverse(3, 11));

    const remainders = [2, 3, 2];
    const moduli = [3, 5, 7];
    console.log('\n8. Chinese Remainder Theorem:');
    console.log(`   x ≡ ${remainders} (mod ${moduli})`);
    console.log(`   x = ${chineseRemainder(remainders, moduli)}`);

    console.log('\n9. Euler totient φ(36):', eulerTotient(36));

    console.log('\n10. Divisors of 36:', getAllDivisors(36));
    console.log('    Count:', countDivisors(36));

    console.log('\n11. Fibonacci(10) using matrix:', fibonacciMatrix(10));

    console.log('\n12. 5th Catalan number:', catalanNumber(5));
}

module.exports = {
    sieveOfEratosthenes,
    isPrime,
    primeFactorization,
    primeFactorsCount,
    gcd,
    gcdRecursive,
    lcm,
    extendedGCD,
    modPower,
    modInverse,
    chineseRemainder,
    eulerTotient,
    countDivisors,
    getAllDivisors,
    fibonacciMatrix,
    catalanNumber
};
