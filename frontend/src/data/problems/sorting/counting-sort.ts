import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "counting-sort",
  title: "Counting Sort",
  difficulty: "Easy",
  category: "Sorting",
  patterns: ["Sorting"],
  url: "https://en.wikipedia.org/wiki/Counting_sort",
  description: `Implement the Counting Sort algorithm to sort an array of integers in ascending order.`,
  examples: [
    {
      "input": "nums = [4, 2, 2, 8, 3, 3, 1]",
      "output": "[1, 2, 2, 3, 3, 4, 8]",
      "explanation": "The sorted array is [1, 2, 2, 3, 3, 4, 8]."
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
    vector<int> countingSort(vector<int>& nums) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums = {4, 2, 2, 8, 3, 3, 1};
    vector<int> res = sol.countingSort(nums);
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
    vector<int> countingSort(vector<int>& nums) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums = {4, 2, 2, 8, 3, 3, 1};
    vector<int> res = sol.countingSort(nums);
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
    vector<int> countingSort(vector<int>& nums) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums = {4, 2, 2, 8, 3, 3, 1};
    vector<int> res = sol.countingSort(nums);
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
    vector<int> countingSort(vector<int>& nums) {
        if (nums.empty()) return nums;
        int minVal = nums[0], maxVal = nums[0];
        for (int x : nums) {
            if (x < minVal) minVal = x;
            if (x > maxVal) maxVal = x;
        }
        int range = maxVal - minVal + 1;
        vector<int> count(range, 0);
        for (int x : nums) {
            count[x - minVal]++;
        }
        int idx = 0;
        for (int i = 0; i < range; i++) {
            while (count[i] > 0) {
                nums[idx++] = i + minVal;
                count[i]--;
            }
        }
        return nums;
    }
};

int main() {
    Solution sol;
    vector<int> nums = {4, 2, 2, 8, 3, 3, 1};
    vector<int> res = sol.countingSort(nums);
    for (int x : res) cout << x << " ";
    cout << endl;
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def countingSort(self, nums: List[int]) -> List[int]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    nums = [4, 2, 2, 8, 3, 3, 1]
    res = sol.countingSort(nums)
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
    def countingSort(self, nums: List[int]) -> List[int]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    nums = [4, 2, 2, 8, 3, 3, 1]
    res = sol.countingSort(nums)
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
    def countingSort(self, nums: List[int]) -> List[int]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    nums = [4, 2, 2, 8, 3, 3, 1]
    res = sol.countingSort(nums)
    print(' '.join(map(str, res)))`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Linear time sorting (like bucket sort or counting sort) taking advantage of constraints.`,
        code: `from typing import List

class Solution:
    def countingSort(self, nums: List[int]) -> List[int]:
        if not nums:
            return nums
        min_val = nums[0]
        max_val = nums[0]
        for x in nums:
            if x < min_val:
                min_val = x
            if x > max_val:
                max_val = x
        range_val = max_val - min_val + 1
        count = [0] * range_val
        for x in nums:
            count[x - min_val] += 1
        idx = 0
        for i in range(range_val):
            while count[i] > 0:
                nums[idx] = i + min_val
                count[i] -= 1
                idx += 1
        return nums

if __name__ == '__main__':
    sol = Solution()
    nums = [4, 2, 2, 8, 3, 3, 1]
    res = sol.countingSort(nums)
    print(' '.join(map(str, res)))`
      }
    }
  }
};

export default problem;
