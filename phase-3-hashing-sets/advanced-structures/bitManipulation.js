/**
 * Bit Manipulation Algorithms and Techniques
 */

// 1. Basic Bit Operations
class BitOperations {
    // Check if kth bit is set
    static isKthBitSet(n, k) {
        return ((n >> k) & 1) === 1;
    }

    // Set kth bit
    static setKthBit(n, k) {
        return n | (1 << k);
    }

    // Clear kth bit
    static clearKthBit(n, k) {
        return n & ~(1 << k);
    }

    // Toggle kth bit
    static toggleKthBit(n, k) {
        return n ^ (1 << k);
    }

    // Get rightmost set bit
    static getRightmostSetBit(n) {
        return n & -n;
    }

    // Clear rightmost set bit
    static clearRightmostSetBit(n) {
        return n & (n - 1);
    }

    // Count set bits (Brian Kernighan's Algorithm)
    static countSetBits(n) {
        let count = 0;
        while (n > 0) {
            n &= (n - 1);
            count++;
        }
        return count;
    }

    // Check if number is power of 2
    static isPowerOfTwo(n) {
        return n > 0 && (n & (n - 1)) === 0;
    }

    // Get position of rightmost set bit (1-indexed)
    static positionOfRightmostSetBit(n) {
        if (n === 0) return -1;
        return Math.log2(n & -n) + 1;
    }
}

// 2. XOR Properties and Applications
class XOROperations {
    // Find single number when all others appear twice
    static singleNumber(nums) {
        return nums.reduce((xor, num) => xor ^ num, 0);
    }

    // Find two numbers that appear once
    static singleNumberII(nums) {
        const xor = nums.reduce((acc, num) => acc ^ num, 0);
        const rightmostBit = xor & -xor;

        let num1 = 0, num2 = 0;
        for (let num of nums) {
            if (num & rightmostBit) {
                num1 ^= num;
            } else {
                num2 ^= num;
            }
        }

        return [num1, num2];
    }

    // Find single number when others appear thrice
    static singleNumberIII(nums) {
        let ones = 0, twos = 0;

        for (let num of nums) {
            twos |= ones & num;
            ones ^= num;
            const threes = ones & twos;
            ones &= ~threes;
            twos &= ~threes;
        }

        return ones;
    }

    // XOR from 1 to n
    static xorFrom1ToN(n) {
        const mod = n % 4;
        if (mod === 0) return n;
        if (mod === 1) return 1;
        if (mod === 2) return n + 1;
        return 0;
    }

    // XOR in range [l, r]
    static xorInRange(l, r) {
        return this.xorFrom1ToN(l - 1) ^ this.xorFrom1ToN(r);
    }
}

// 3. Subset Generation
class SubsetGeneration {
    // Generate all subsets using bit masking
    static generateSubsets(arr) {
        const n = arr.length;
        const subsets = [];

        for (let mask = 0; mask < (1 << n); mask++) {
            const subset = [];
            for (let i = 0; i < n; i++) {
                if (mask & (1 << i)) {
                    subset.push(arr[i]);
                }
            }
            subsets.push(subset);
        }

        return subsets;
    }

    // Count subsets with given sum
    static countSubsetsWithSum(arr, target) {
        const n = arr.length;
        let count = 0;

        for (let mask = 0; mask < (1 << n); mask++) {
            let sum = 0;
            for (let i = 0; i < n; i++) {
                if (mask & (1 << i)) {
                    sum += arr[i];
                }
            }
            if (sum === target) count++;
        }

        return count;
    }
}

// 4. Advanced Bit Tricks
class AdvancedBitTricks {
    // Swap two numbers without temp variable
    static swap(a, b) {
        a = a ^ b;
        b = a ^ b;
        a = a ^ b;
        return [a, b];
    }

    // Reverse bits of a 32-bit integer
    static reverseBits(n) {
        let result = 0;
        for (let i = 0; i < 32; i++) {
            result <<= 1;
            result |= (n & 1);
            n >>= 1;
        }
        return result >>> 0;
    }

    // Find missing number in array [0, n]
    static findMissingNumber(nums) {
        const n = nums.length;
        let xor = 0;

        for (let i = 0; i <= n; i++) {
            xor ^= i;
        }

        for (let num of nums) {
            xor ^= num;
        }

        return xor;
    }

    // Number of flips required to convert a to b
    static bitFlipsRequired(a, b) {
        let xor = a ^ b;
        let count = 0;

        while (xor > 0) {
            count += xor & 1;
            xor >>= 1;
        }

        return count;
    }

    // Next higher number with same number of set bits
    static nextHigherWithSameSetBits(n) {
        const c = n;
        const c0 = 0; // Count of trailing zeros
        const c1 = 0; // Count of ones to the right of trailing zeros

        // Count c0 and c1
        let temp = n;
        let zeros = 0;
        while ((temp & 1) === 0 && temp !== 0) {
            zeros++;
            temp >>= 1;
        }

        let ones = 0;
        while ((temp & 1) === 1) {
            ones++;
            temp >>= 1;
        }

        const pos = zeros + ones;

        if (pos === 31 || pos === 0) {
            return -1;
        }

        // Flip rightmost non-trailing zero
        n |= (1 << pos);

        // Clear all bits to the right of pos
        n &= ~((1 << pos) - 1);

        // Insert (ones-1) ones on the right
        n |= (1 << (ones - 1)) - 1;

        return n;
    }
}

// 5. Gray Code
class GrayCode {
    // Convert binary to Gray code
    static binaryToGray(n) {
        return n ^ (n >> 1);
    }

    // Convert Gray code to binary
    static grayToBinary(gray) {
        let binary = gray;
        while (gray >>= 1) {
            binary ^= gray;
        }
        return binary;
    }

    // Generate n-bit Gray code sequence
    static generateGrayCode(n) {
        const result = [];
        const total = 1 << n;

        for (let i = 0; i < total; i++) {
            result.push(i ^ (i >> 1));
        }

        return result;
    }
}

// 6. Bit Manipulation Problems
class BitProblems {
    // Hamming distance between two integers
    static hammingDistance(x, y) {
        let xor = x ^ y;
        let count = 0;

        while (xor > 0) {
            count += xor & 1;
            xor >>= 1;
        }

        return count;
    }

    // Total hamming distance in array
    static totalHammingDistance(nums) {
        let total = 0;
        const n = nums.length;

        for (let i = 0; i < 32; i++) {
            let ones = 0;
            for (let num of nums) {
                ones += (num >> i) & 1;
            }
            total += ones * (n - ones);
        }

        return total;
    }

    // Maximum XOR of two numbers in array
    static maximumXOR(nums) {
        let max = 0;
        let mask = 0;

        for (let i = 31; i >= 0; i--) {
            mask |= (1 << i);
            const prefixes = new Set();

            for (let num of nums) {
                prefixes.add(num & mask);
            }

            const candidate = max | (1 << i);

            for (let prefix of prefixes) {
                if (prefixes.has(candidate ^ prefix)) {
                    max = candidate;
                    break;
                }
            }
        }

        return max;
    }

    // Count numbers with unique digits
    static countNumbersWithUniqueDigits(n) {
        if (n === 0) return 1;
        if (n === 1) return 10;

        let result = 10;
        let uniqueDigits = 9;
        let availableNumbers = 9;

        for (let i = 2; i <= n && availableNumbers > 0; i++) {
            uniqueDigits *= availableNumbers;
            result += uniqueDigits;
            availableNumbers--;
        }

        return result;
    }
}

// Example usage
if (require.main === module) {
    console.log('=== Bit Manipulation Examples ===\n');

    console.log('1. Basic Operations on 10 (1010):');
    console.log('   Is 2nd bit set?', BitOperations.isKthBitSet(10, 2));
    console.log('   Set 0th bit:', BitOperations.setKthBit(10, 0).toString(2));
    console.log('   Clear 1st bit:', BitOperations.clearKthBit(10, 1).toString(2));
    console.log('   Count set bits:', BitOperations.countSetBits(10));
    console.log('   Is power of 2?', BitOperations.isPowerOfTwo(10));

    console.log('\n2. XOR Operations:');
    console.log('   Single number in [2,2,1]:', XOROperations.singleNumber([2, 2, 1]));
    console.log('   Two singles in [1,2,1,3,2,5]:', XOROperations.singleNumberII([1, 2, 1, 3, 2, 5]));
    console.log('   XOR from 1 to 10:', XOROperations.xorFrom1ToN(10));

    console.log('\n3. Subsets of [1,2,3]:');
    const subsets = SubsetGeneration.generateSubsets([1, 2, 3]);
    console.log('   All subsets:', JSON.stringify(subsets));

    console.log('\n4. Advanced Tricks:');
    console.log('   Swap 5 and 7:', AdvancedBitTricks.swap(5, 7));
    console.log('   Reverse bits of 1 (binary: 00000001):', AdvancedBitTricks.reverseBits(1).toString(2));
    console.log('   Missing in [0,1,3,4,5]:', AdvancedBitTricks.findMissingNumber([0, 1, 3, 4, 5]));
    console.log('   Flips needed (10 → 7):', AdvancedBitTricks.bitFlipsRequired(10, 7));

    console.log('\n5. Gray Code:');
    console.log('   2-bit Gray code:', GrayCode.generateGrayCode(2));
    console.log('   Binary 5 to Gray:', GrayCode.binaryToGray(5));
    console.log('   Gray 7 to Binary:', GrayCode.grayToBinary(7));

    console.log('\n6. Bit Problems:');
    console.log('   Hamming distance (1, 4):', BitProblems.hammingDistance(1, 4));
    console.log('   Max XOR in [3,10,5,25,2,8]:', BitProblems.maximumXOR([3, 10, 5, 25, 2, 8]));
}

module.exports = {
    BitOperations,
    XOROperations,
    SubsetGeneration,
    AdvancedBitTricks,
    GrayCode,
    BitProblems
};
