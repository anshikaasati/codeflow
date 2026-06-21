import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "subarray-product-less-than-k",
  title: "Subarray Product Less Than K",
  difficulty: "Medium",
  category: "Sliding Window",
  patterns: ["Sliding Window"],
  url: "https://leetcode.com/problems/subarray-product-less-than-k/",
  description: `Given an array of integers \`nums\` and an integer \`k\`, return the number of contiguous subarrays where the product of all the elements in the subarray is strictly less than \`k\`.`,
  examples: [
    {
      "input": "nums = [10,5,2,6], k = 100",
      "output": "8",
      "explanation": "The 8 subarrays that have product less than 100 are:\n[10], [5], [2], [6], [10, 5], [5, 2], [2, 6], [5, 2, 6]\nNote that [10, 5, 2] is not included as the product is 100 which is not strictly less than k."
    },
    {
      "input": "nums = [1,2,3], k = 0",
      "output": "0"
    }
  ],
  constraints: [
    "1 <= nums.length <= 3 * 10^4",
    "1 <= nums[i] <= 1000",
    "0 <= k <= 10^6"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int numSubarrayProductLessThanK(vector<int>& nums, int k) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> nums={10,5,2,6};
    cout<<sol.numSubarrayProductLessThanK(nums,100)<<endl; // 8
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Recompute metrics for all possible subarrays or substrings using nested loops.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int numSubarrayProductLessThanK(vector<int>& nums, int k) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> nums={10,5,2,6};
    cout<<sol.numSubarrayProductLessThanK(nums,100)<<endl; // 8
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Use a fixed-size window or track state with extra hash tables or collections.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int numSubarrayProductLessThanK(vector<int>& nums, int k) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> nums={10,5,2,6};
    cout<<sol.numSubarrayProductLessThanK(nums,100)<<endl; // 8
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Use a dynamically resizing sliding window with single-pass updates to locate the target range in linear time.`,
        code: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int numSubarrayProductLessThanK(vector<int>& nums, int k) {
        if (k<=1) return 0;
        int prod=1, l=0, count=0;
        for (int r=0;r<(int)nums.size();r++) {
            prod*=nums[r];
            while (prod>=k) prod/=nums[l++];
            count+=r-l+1;
        }
        return count;
    }
};

int main() {
    Solution sol;
    vector<int> nums={10,5,2,6};
    cout<<sol.numSubarrayProductLessThanK(nums,100)<<endl; // 8
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def numSubarrayProductLessThanK(self, nums: List[int], k: int) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    nums = [10, 5, 2, 6]
    print(sol.numSubarrayProductLessThanK(nums, 100))  # 8`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Recompute metrics for all possible subarrays or substrings using nested loops.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from typing import List

class Solution:
    def numSubarrayProductLessThanK(self, nums: List[int], k: int) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    nums = [10, 5, 2, 6]
    print(sol.numSubarrayProductLessThanK(nums, 100))  # 8`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Use a fixed-size window or track state with extra hash tables or collections.`,
        code: `// Better Solution
// TODO: Implement optimized approach
from typing import List

class Solution:
    def numSubarrayProductLessThanK(self, nums: List[int], k: int) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    nums = [10, 5, 2, 6]
    print(sol.numSubarrayProductLessThanK(nums, 100))  # 8`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Use a dynamically resizing sliding window with single-pass updates to locate the target range in linear time.`,
        code: `from typing import List

class Solution:
    def numSubarrayProductLessThanK(self, nums: List[int], k: int) -> int:
        if k <= 1:
            return 0
        prod = 1
        l = 0
        count = 0
        for r in range(len(nums)):
            prod *= nums[r]
            while prod >= k:
                prod //= nums[l]
                l += 1
            count += r - l + 1
        return count

if __name__ == '__main__':
    sol = Solution()
    nums = [10, 5, 2, 6]
    print(sol.numSubarrayProductLessThanK(nums, 100))  # 8`
      }
    }
  }
};

export default problem;
