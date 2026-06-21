import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "find-first-and-last-position-of-element-in-sorted-array",
  title: "Find First and Last Position of Element in Sorted Array",
  difficulty: "Medium",
  category: "Binary Search",
  patterns: ["Binary Search","Two Pointer"],
  url: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
  description: `Given an array of integers \`nums\` sorted in non-decreasing order, find the starting and ending position of a given \`target\` value. If target is not found in the array, return \`[-1, -1]\`.`,
  examples: [
    {
      "input": "nums = [5,7,7,8,8,10], target = 8",
      "output": "[3,4]"
    }
  ],
  constraints: [
    "0 <= nums.length <= 10^5",
    "-10^9 <= nums[i], target <= 10^9",
    "nums is a non-decreasing array."
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
private:
    int findBound(vector<int>& nums, int target, bool isFirst) {
        // Write your code here
        return 0;
    ans;
    }
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums = {5, 7, 7, 8, 8, 10};
    vector<int> res = sol.searchRange(nums, 8);
    cout << res[0] << " " << res[1] << endl; // 3 4
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
private:
    int findBound(vector<int>& nums, int target, bool isFirst) {
        // Write your code here
        return 0;
    ans;
    }
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums = {5, 7, 7, 8, 8, 10};
    vector<int> res = sol.searchRange(nums, 8);
    cout << res[0] << " " << res[1] << endl; // 3 4
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
private:
    int findBound(vector<int>& nums, int target, bool isFirst) {
        // Write your code here
        return 0;
    ans;
    }
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums = {5, 7, 7, 8, 8, 10};
    vector<int> res = sol.searchRange(nums, 8);
    cout << res[0] << " " << res[1] << endl; // 3 4
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
private:
    int findBound(vector<int>& nums, int target, bool isFirst) {
        int low = 0, high = nums.size() - 1;
        int ans = -1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) {
                ans = mid;
                if (isFirst) high = mid - 1;
                else low = mid + 1;
            } else if (nums[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return ans;
    }
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        int first = findBound(nums, target, true);
        int last = findBound(nums, target, false);
        return {first, last};
    }
};

int main() {
    Solution sol;
    vector<int> nums = {5, 7, 7, 8, 8, 10};
    vector<int> res = sol.searchRange(nums, 8);
    cout << res[0] << " " << res[1] << endl; // 3 4
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def findBound(self, nums: List[int], target: int, isFirst: bool) -> int:
        # Write your code here
        return 0
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        # Write your code here
        return []
if __name__ == "__main__":
    sol = Solution()
    nums = [5, 7, 7, 8, 8, 10]
    res = sol.searchRange(nums, 8)
    print(res[0], res[1])  # 3 4`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Iterate sequentially through the search space to find the target element or transition point.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from typing import List

class Solution:
    def findBound(self, nums: List[int], target: int, isFirst: bool) -> int:
        # Write your code here
        return 0
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        # Write your code here
        return []
if __name__ == "__main__":
    sol = Solution()
    nums = [5, 7, 7, 8, 8, 10]
    res = sol.searchRange(nums, 8)
    print(res[0], res[1])  # 3 4`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Linear search with early exit or simple range narrowing.`,
        code: `// Better Solution
// TODO: Implement optimized approach
from typing import List

class Solution:
    def findBound(self, nums: List[int], target: int, isFirst: bool) -> int:
        # Write your code here
        return 0
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        # Write your code here
        return []
if __name__ == "__main__":
    sol = Solution()
    nums = [5, 7, 7, 8, 8, 10]
    res = sol.searchRange(nums, 8)
    print(res[0], res[1])  # 3 4`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Binary search dividing search space in half each step, achieving logarithmic runtime.`,
        code: `from typing import List

class Solution:
    def findBound(self, nums: List[int], target: int, isFirst: bool) -> int:
        low, high = 0, len(nums) - 1
        ans = -1
        while low <= high:
            mid = low + (high - low) // 2
            if nums[mid] == target:
                ans = mid
                if isFirst:
                    high = mid - 1
                else:
                    low = mid + 1
            elif nums[mid] < target:
                low = mid + 1
            else:
                high = mid - 1
        return ans

    def searchRange(self, nums: List[int], target: int) -> List[int]:
        first = self.findBound(nums, target, True)
        last = self.findBound(nums, target, False)
        return [first, last]

if __name__ == "__main__":
    sol = Solution()
    nums = [5, 7, 7, 8, 8, 10]
    res = sol.searchRange(nums, 8)
    print(res[0], res[1])  # 3 4`
      }
    }
  }
};

export default problem;
