import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "bubble-sort",
  title: "Bubble Sort",
  difficulty: "Easy",
  category: "Sorting",
  patterns: ["Sorting"],
  url: "https://en.wikipedia.org/wiki/Bubble_sort",
  description: `Implement the Bubble Sort algorithm to sort an array of integers in ascending order.`,
  examples: [
    {
      "input": "nums = [5, 2, 8, 1, 9]",
      "output": "[1, 2, 5, 8, 9]",
      "explanation": "The sorted array is [1, 2, 5, 8, 9]."
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
public:
    vector<int> bubbleSort(vector<int>& nums) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums = {5, 2, 8, 1, 9};
    vector<int> res = sol.bubbleSort(nums);
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
public:
    vector<int> bubbleSort(vector<int>& nums) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums = {5, 2, 8, 1, 9};
    vector<int> res = sol.bubbleSort(nums);
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
public:
    vector<int> bubbleSort(vector<int>& nums) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums = {5, 2, 8, 1, 9};
    vector<int> res = sol.bubbleSort(nums);
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
public:
    vector<int> bubbleSort(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (nums[j] > nums[j + 1]) {
                    swap(nums[j], nums[j + 1]);
                }
            }
        }
        return nums;
    }
};

int main() {
    Solution sol;
    vector<int> nums = {5, 2, 8, 1, 9};
    vector<int> res = sol.bubbleSort(nums);
    for (int x : res) cout << x << " ";
    cout << endl;
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def bubbleSort(self, nums: List[int]) -> List[int]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    nums = [5, 2, 8, 1, 9]
    res = sol.bubbleSort(nums)
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
    def bubbleSort(self, nums: List[int]) -> List[int]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    nums = [5, 2, 8, 1, 9]
    res = sol.bubbleSort(nums)
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
    def bubbleSort(self, nums: List[int]) -> List[int]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    nums = [5, 2, 8, 1, 9]
    res = sol.bubbleSort(nums)
    print(' '.join(map(str, res)))`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Linear time sorting (like bucket sort or counting sort) taking advantage of constraints.`,
        code: `from typing import List

class Solution:
    def bubbleSort(self, nums: List[int]) -> List[int]:
        n = len(nums)
        for i in range(n - 1):
            for j in range(n - i - 1):
                if nums[j] > nums[j + 1]:
                    nums[j], nums[j + 1] = nums[j + 1], nums[j]
        return nums

if __name__ == '__main__':
    sol = Solution()
    nums = [5, 2, 8, 1, 9]
    res = sol.bubbleSort(nums)
    print(' '.join(map(str, res)))`
      }
    }
  }
};

export default problem;
