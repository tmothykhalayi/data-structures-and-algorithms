/**
 * Custom Problem: Task Scheduler
 * Difficulty: Medium
 * Topics: Greedy, Heap, Array
 * 
 * Problem:
 * Given a char array representing tasks CPU need to do. Each task is
 * represented by a letter from A to Z. Tasks can be done in any order,
 * but there's a constraint that the same task must be separated by at least
 * n intervals due to cooling time.
 * 
 * Return the minimum number of intervals needed to complete all tasks.
 * 
 * Example:
 * Input: tasks = ["A","A","A","B","B","B"], n = 2
 * Output: 8
 * Explanation: A -> B -> idle -> A -> B -> idle -> A -> idle
 */

// Solution 1: Greedy with Max Heap - O(n) time, O(1) space
function leastInterval(tasks, n) {
    // Count frequency of each task
    const freq = Array(26).fill(0);
    for (const task of tasks) {
        freq[task.charCodeAt(0) - 65]++;
    }

    // Sort frequencies in descending order
    freq.sort((a, b) => b - a);

    // Find max frequency
    const maxFreq = freq[0];

    // Count tasks with max frequency
    let maxCount = 0;
    for (const f of freq) {
        if (f === maxFreq) {
            maxCount++;
        }
    }

    // Calculate minimum intervals
    // (maxFreq - 1) chunks, each chunk has (n + 1) slots
    // Plus maxCount tasks in the last chunk
    const intervals = (maxFreq - 1) * (n + 1) + maxCount;

    // Return max of calculated intervals or total tasks
    return Math.max(intervals, tasks.length);
}

// Solution 2: Simulation with Priority Queue
function leastIntervalSimulation(tasks, n) {
    // Count frequencies
    const freq = {};
    for (const task of tasks) {
        freq[task] = (freq[task] || 0) + 1;
    }

    // Use array as max heap
    const maxHeap = Object.values(freq).sort((a, b) => b - a);
    const schedule = [];
    let time = 0;

    while (maxHeap.length > 0) {
        const temp = [];
        let k = n + 1;

        // Schedule tasks for this cycle
        while (k > 0 && (maxHeap.length > 0 || temp.length > 0)) {
            time++;

            if (maxHeap.length > 0) {
                const count = maxHeap.shift();
                schedule.push('Task');

                if (count > 1) {
                    temp.push(count - 1);
                }
            } else {
                schedule.push('idle');
            }

            k--;
        }

        // Put back remaining tasks
        maxHeap.push(...temp);
        maxHeap.sort((a, b) => b - a);
    }

    return time;
}

// Solution 3: With actual schedule display
function leastIntervalWithSchedule(tasks, n) {
    const freq = {};
    for (const task of tasks) {
        freq[task] = (freq[task] || 0) + 1;
    }

    const taskNames = Object.keys(freq);
    const schedule = [];
    const cooldown = new Map();

    // Priority queue (simulate with array)
    let time = 0;

    while (Object.keys(freq).length > 0) {
        // Find available task with max frequency
        let maxTask = null;
        let maxFreq = 0;

        for (const task of taskNames) {
            if (freq[task] > 0) {
                const availableAt = cooldown.get(task) || 0;

                if (time >= availableAt && freq[task] > maxFreq) {
                    maxTask = task;
                    maxFreq = freq[task];
                }
            }
        }

        if (maxTask) {
            schedule.push(maxTask);
            freq[maxTask]--;

            if (freq[maxTask] === 0) {
                delete freq[maxTask];
            }

            cooldown.set(maxTask, time + n + 1);
        } else {
            schedule.push('idle');
        }

        time++;
    }

    return {
        intervals: schedule.length,
        schedule: schedule
    };
}

// Test cases
if (require.main === module) {
    const testCases = [
        {
            tasks: ["A", "A", "A", "B", "B", "B"],
            n: 2,
            expected: 8
        },
        {
            tasks: ["A", "A", "A", "B", "B", "B"],
            n: 0,
            expected: 6
        },
        {
            tasks: ["A", "A", "A", "A", "A", "A", "B", "C", "D", "E", "F", "G"],
            n: 2,
            expected: 16
        },
        {
            tasks: ["A", "B", "C", "D", "E", "A", "B", "C", "D", "E"],
            n: 4,
            expected: 10
        }
    ];

    console.log('=== Task Scheduler ===\n');

    testCases.forEach(({ tasks, n, expected }, idx) => {
        console.log(`Test Case ${idx + 1}:`);
        console.log(`Tasks: [${tasks.join(', ')}]`);
        console.log(`Cooling time: ${n}`);

        const result1 = leastInterval(tasks, n);
        const result2 = leastIntervalWithSchedule(tasks.slice(), n);

        console.log(`Expected: ${expected}`);
        console.log(`Result: ${result1}`);
        console.log(`Status: ${result1 === expected ? '✓ PASS' : '✗ FAIL'}`);

        if (idx === 0) {
            console.log('\nSchedule visualization:');
            console.log(result2.schedule.join(' -> '));
            console.log(`Total intervals: ${result2.intervals}`);
        }

        console.log('\n' + '='.repeat(50) + '\n');
    });

    // Explanation
    console.log('Algorithm Explanation:');
    console.log('1. Count frequency of each task');
    console.log('2. Find task with maximum frequency (maxFreq)');
    console.log('3. Count how many tasks have maxFreq (maxCount)');
    console.log('4. Calculate: (maxFreq - 1) * (n + 1) + maxCount');
    console.log('   - (maxFreq - 1) chunks between max frequency tasks');
    console.log('   - Each chunk has (n + 1) slots');
    console.log('   - Add maxCount for the last execution');
    console.log('5. Return max(calculated, tasks.length)');
}

module.exports = {
    leastInterval,
    leastIntervalSimulation,
    leastIntervalWithSchedule
};
