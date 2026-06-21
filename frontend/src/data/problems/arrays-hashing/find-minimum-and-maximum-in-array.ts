import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "find-minimum-and-maximum-in-array",
  title: "Find Minimum and Maximum in Array",
  difficulty: "Easy",
  category: "Arrays & Hashing",
  patterns: ["Array"],
  url: "https://www.geeksforgeeks.org/maximum-and-minimum-in-an-array/",
  description: `Given an array of integers, write a function to find the minimum and maximum elements in the array.`,
  examples: [
    {
      "input": "nums = [3, 2, 1, 56, 10000, 167]",
      "output": "[1, 10000]",
      "explanation": "The minimum is 1 and the maximum is 10000."
    }
  ],
  constraints: [
    "1 <= nums.length <= 10^5",
    "1 <= nums[i] <= 10^12"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> findMinMax(vector<int>& nums) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums = {3, 2, 1, 56, 10000, 167};
    vector<int> res = sol.findMinMax(nums);
    if (res.size() >= 2) cout << res[0] << " " << res[1] << endl; // 1 10000
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Compare all elements or subsegments using nested loops to verify the condition.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> findMinMax(vector<int>& nums) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums = {3, 2, 1, 56, 10000, 167};
    vector<int> res = sol.findMinMax(nums);
    if (res.size() >= 2) cout << res[0] << " " << res[1] << endl; // 1 10000
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Sort the array first to group elements, or use a Hash Set/Map to track seen values.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> findMinMax(vector<int>& nums) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums = {3, 2, 1, 56, 10000, 167};
    vector<int> res = sol.findMinMax(nums);
    if (res.size() >= 2) cout << res[0] << " " << res[1] << endl; // 1 10000
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Use a single pass linear scan with optimized hashing, frequency tables, or in-place marking.`,
        code: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> findMinMax(vector<int>& nums) {
        if (nums.empty()) return {-1, -1};
        int minVal = nums[0];
        int maxVal = nums[0];
        for (int x : nums) {
            if (x < minVal) minVal = x;
            if (x > maxVal) maxVal = x;
        }
        return {minVal, maxVal};
    }
};

int main() {
    Solution sol;
    vector<int> nums = {3, 2, 1, 56, 10000, 167};
    vector<int> res = sol.findMinMax(nums);
    if (res.size() >= 2) cout << res[0] << " " << res[1] << endl; // 1 10000
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def findMinMax(self, nums: List[int]) -> List[int]:
        # Write your code here
        return []
if __name__ == "__main__":
    sol = Solution()
    nums = [3, 2, 1, 56, 10000, 167]
    res = sol.findMinMax(nums)
    if len(res) >= 2:
        print(res[0], res[1])  # 1 10000`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Compare all elements or subsegments using nested loops to verify the condition.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from typing import List

class Solution:
    def findMinMax(self, nums: List[int]) -> List[int]:
        # Write your code here
        return []
if __name__ == "__main__":
    sol = Solution()
    nums = [3, 2, 1, 56, 10000, 167]
    res = sol.findMinMax(nums)
    if len(res) >= 2:
        print(res[0], res[1])  # 1 10000`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Sort the array first to group elements, or use a Hash Set/Map to track seen values.`,
        code: `// Better Solution
// TODO: Implement optimized approach
from typing import List

class Solution:
    def findMinMax(self, nums: List[int]) -> List[int]:
        # Write your code here
        return []
if __name__ == "__main__":
    sol = Solution()
    nums = [3, 2, 1, 56, 10000, 167]
    res = sol.findMinMax(nums)
    if len(res) >= 2:
        print(res[0], res[1])  # 1 10000`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Use a single pass linear scan with optimized hashing, frequency tables, or in-place marking.`,
        code: `from typing import List

class Solution:
    def findMinMax(self, nums: List[int]) -> List[int]:
        if not nums:
            return [-1, -1]
        min_val = max_val = nums[0]
        for x in nums:
            if x < min_val:
                min_val = x
            if x > max_val:
                max_val = x
        return [min_val, max_val]

if __name__ == "__main__":
    sol = Solution()
    nums = [3, 2, 1, 56, 10000, 167]
    res = sol.findMinMax(nums)
    if len(res) >= 2:
        print(res[0], res[1])  # 1 10000`
      }
    }
  }
};

export default problem;
