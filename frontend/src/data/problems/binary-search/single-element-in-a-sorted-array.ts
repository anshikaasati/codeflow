import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "single-element-in-a-sorted-array",
  title: "Single Element in a Sorted Array",
  difficulty: "Medium",
  category: "Binary Search",
  patterns: ["Binary Search","Two Pointer"],
  url: "https://leetcode.com/problems/single-element-in-a-sorted-array/",
  description: `You are given a sorted array consisting of only integers where every element appears exactly twice, except for one element which appears exactly once. Find this single element that appears only once.`,
  examples: [
    {
      "input": "nums = [1,1,2,3,3,4,4,8,8]",
      "output": "2"
    }
  ],
  constraints: [
    "1 <= nums.length <= 10^5",
    "0 <= nums[i] <= 10^5"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int singleNonDuplicate(vector<int>& nums) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> nums = {1, 1, 2, 3, 3, 4, 4, 8, 8};
    cout << sol.singleNonDuplicate(nums) << endl; // 2
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Iterate sequentially through the search space to find the target element or transition point.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int singleNonDuplicate(vector<int>& nums) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> nums = {1, 1, 2, 3, 3, 4, 4, 8, 8};
    cout << sol.singleNonDuplicate(nums) << endl; // 2
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Linear search with early exit or simple range narrowing.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int singleNonDuplicate(vector<int>& nums) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> nums = {1, 1, 2, 3, 3, 4, 4, 8, 8};
    cout << sol.singleNonDuplicate(nums) << endl; // 2
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Binary search dividing search space in half each step, achieving logarithmic runtime.`,
        code: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int singleNonDuplicate(vector<int>& nums) {
        int low = 0, high = nums.size() - 1;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (mid % 2 == 1) mid--;
            if (nums[mid] == nums[mid + 1]) {
                low = mid + 2;
            } else {
                high = mid;
            }
        }
        return nums[low];
    }
};

int main() {
    Solution sol;
    vector<int> nums = {1, 1, 2, 3, 3, 4, 4, 8, 8};
    cout << sol.singleNonDuplicate(nums) << endl; // 2
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def singleNonDuplicate(self, nums: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == "__main__":
    sol = Solution()
    nums = [1, 1, 2, 3, 3, 4, 4, 8, 8]
    print(sol.singleNonDuplicate(nums))  # 2`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Iterate sequentially through the search space to find the target element or transition point.`,
        code: `# Brute Force Approach
# TODO: Implement brute force
from typing import List

class Solution:
    def singleNonDuplicate(self, nums: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == "__main__":
    sol = Solution()
    nums = [1, 1, 2, 3, 3, 4, 4, 8, 8]
    print(sol.singleNonDuplicate(nums))  # 2`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Linear search with early exit or simple range narrowing.`,
        code: `# Better Solution
# TODO: Implement optimized approach
from typing import List

class Solution:
    def singleNonDuplicate(self, nums: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == "__main__":
    sol = Solution()
    nums = [1, 1, 2, 3, 3, 4, 4, 8, 8]
    print(sol.singleNonDuplicate(nums))  # 2`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Binary search dividing search space in half each step, achieving logarithmic runtime.`,
        code: `from typing import List

class Solution:
    def singleNonDuplicate(self, nums: List[int]) -> int:
        low, high = 0, len(nums) - 1
        while low < high:
            mid = low + (high - low) // 2
            if mid % 2 == 1: mid -= 1
            if nums[mid] == nums[mid + 1]:
                low = mid + 2
            else:
                high = mid
        return nums[low]

if __name__ == "__main__":
    sol = Solution()
    nums = [1, 1, 2, 3, 3, 4, 4, 8, 8]
    print(sol.singleNonDuplicate(nums))  # 2`
      }
    }
  }
};

export default problem;
