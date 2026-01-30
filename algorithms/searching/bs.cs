using System;

class BinarySearch
{
    static int BinarySearchAlgorithm(int[] arr, int target)
    {
        int low = 0;
        int high = arr.Length - 1;
        
        while (low <= high)
        {
            int mid = low + (high - low) / 2;
            int guess = arr[mid];
            
            if (guess == target)
            {
                return mid;
            }
            
            if (guess > target)
            {
                high = mid - 1;
            }
            else
            {
                low = mid + 1;
            }
        }
        
        return -1; // Target not found
    }
    
    static void Main()
    {
        int[] arr = { 1, 2, 3, 4, 5, 6, 7, 8 };
        int target = 5;
        
        int result = BinarySearchAlgorithm(arr, target);
        Console.WriteLine($"Index of {target}: {result}"); // Index of 5: 4
    }
}
