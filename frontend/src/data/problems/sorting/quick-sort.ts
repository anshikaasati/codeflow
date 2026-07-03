import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "quick-sort",
  title: "Quick Sort",
  difficulty: "Medium",
  category: "Sorting",
  patterns: ["Sorting"],
  url: "https://en.wikipedia.org/wiki/Quicksort",
  description: `Implement the Quick Sort algorithm to sort an array of integers in ascending order.`,
  examples: [
    {
      "input": "nums = [10, 7, 8, 9, 1, 5]",
      "output": "[1, 5, 7, 8, 9, 10]",
      "explanation": "The sorted array is [1, 5, 7, 8, 9, 10]."
    }
  ],
  constraints: [
    "1 <= nums.length <= 100",
    "-100 <= nums[i] <= 100"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
private:
    int partition(vector<int>& nums, int low, int high) {
        // Write your code here
        return 0;
    }

    void quickSortHelper(vector<int>& nums, int low, int high) {
        // Write your code here
    }

public:
    vector<int> quickSort(vector<int>& nums) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums = {10, 7, 8, 9, 1, 5};
    vector<int> res = sol.quickSort(nums);
    for (int x : res) cout << x << " ";
    cout << endl;
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Bubble sort or selection sort comparing all pairs repeatedly.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;

class Solution {
private:
    int partition(vector<int>& nums, int low, int high) {
        // Write your code here
        return 0;
    }

    void quickSortHelper(vector<int>& nums, int low, int high) {
        // Write your code here
    }

public:
    vector<int> quickSort(vector<int>& nums) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums = {10, 7, 8, 9, 1, 5};
    vector<int> res = sol.quickSort(nums);
    for (int x : res) cout << x << " ";
    cout << endl;
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Divide-and-conquer sorting (Merge Sort or Quick Sort) in O(N log N) time.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;

class Solution {
private:
    int partition(vector<int>& nums, int low, int high) {
        // Write your code here
        return 0;
    }

    void quickSortHelper(vector<int>& nums, int low, int high) {
        // Write your code here
    }

public:
    vector<int> quickSort(vector<int>& nums) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums = {10, 7, 8, 9, 1, 5};
    vector<int> res = sol.quickSort(nums);
    for (int x : res) cout << x << " ";
    cout << endl;
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Linear time sorting (like bucket sort or counting sort) taking advantage of constraints.`,
        code: `#include <bits/stdc++.h>
using namespace std;

class Solution {
private:
    int partition(vector<int>& nums, int low, int high) {
        int pivot = nums[high];
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (nums[j] < pivot) {
                i++;
                swap(nums[i], nums[j]);
            }
        }
        swap(nums[i + 1], nums[high]);
        return i + 1;
    }

    void quickSortHelper(vector<int>& nums, int low, int high) {
        if (low < high) {
            int pi = partition(nums, low, high);
            quickSortHelper(nums, low, pi - 1);
            quickSortHelper(nums, pi + 1, high);
        }
    }

public:
    vector<int> quickSort(vector<int>& nums) {
        if (nums.empty()) return nums;
        quickSortHelper(nums, 0, nums.size() - 1);
        return nums;
    }
};

int main() {
    Solution sol;
    vector<int> nums = {10, 7, 8, 9, 1, 5};
    vector<int> res = sol.quickSort(nums);
    for (int x : res) cout << x << " ";
    cout << endl;
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def partition(self, nums: List[int], low: int, high: int) -> int:
        # Write your code here
        return 0
    def quickSortHelper(self, nums: List[int], low: int, high: int) -> None:
        # Write your code here
        pass
    def quickSort(self, nums: List[int]) -> List[int]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    nums = [10, 7, 8, 9, 1, 5]
    res = sol.quickSort(nums)
    print(' '.join(map(str, res)))`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Bubble sort or selection sort comparing all pairs repeatedly.`,
        code: `# Brute Force Approach
# TODO: Implement brute force
from typing import List

class Solution:
    def partition(self, nums: List[int], low: int, high: int) -> int:
        # Write your code here
        return 0
    def quickSortHelper(self, nums: List[int], low: int, high: int) -> None:
        # Write your code here
        pass
    def quickSort(self, nums: List[int]) -> List[int]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    nums = [10, 7, 8, 9, 1, 5]
    res = sol.quickSort(nums)
    print(' '.join(map(str, res)))`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Divide-and-conquer sorting (Merge Sort or Quick Sort) in O(N log N) time.`,
        code: `# Better Solution
# TODO: Implement optimized approach
from typing import List

class Solution:
    def partition(self, nums: List[int], low: int, high: int) -> int:
        # Write your code here
        return 0
    def quickSortHelper(self, nums: List[int], low: int, high: int) -> None:
        # Write your code here
        pass
    def quickSort(self, nums: List[int]) -> List[int]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    nums = [10, 7, 8, 9, 1, 5]
    res = sol.quickSort(nums)
    print(' '.join(map(str, res)))`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Linear time sorting (like bucket sort or counting sort) taking advantage of constraints.`,
        code: `from typing import List

class Solution:
    def partition(self, nums: List[int], low: int, high: int) -> int:
        pivot = nums[high]
        i = low - 1
        for j in range(low, high):
            if nums[j] < pivot:
                i += 1
                nums[i], nums[j] = nums[j], nums[i]
        nums[i + 1], nums[high] = nums[high], nums[i + 1]
        return i + 1

    def quickSortHelper(self, nums: List[int], low: int, high: int) -> None:
        if low < high:
            pi = self.partition(nums, low, high)
            self.quickSortHelper(nums, low, pi - 1)
            self.quickSortHelper(nums, pi + 1, high)

    def quickSort(self, nums: List[int]) -> List[int]:
        if not nums:
            return nums
        self.quickSortHelper(nums, 0, len(nums) - 1)
        return nums


if __name__ == '__main__':
    sol = Solution()
    nums = [10, 7, 8, 9, 1, 5]
    res = sol.quickSort(nums)
    print(' '.join(map(str, res)))`
      }
    }
  }
};

export default problem;
