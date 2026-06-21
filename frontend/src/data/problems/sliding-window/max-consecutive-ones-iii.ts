import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "max-consecutive-ones-iii",
  title: "Max Consecutive Ones III",
  difficulty: "Medium",
  category: "Sliding Window",
  patterns: ["Sliding Window"],
  url: "https://leetcode.com/problems/max-consecutive-ones-iii/",
  description: `Given a binary array \`nums\` and an integer \`k\`, return the maximum number of consecutive \`1\`'s in the array if you can flip at most \`k\` \`0\`'s.`,
  examples: [
    {
      "input": "nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2",
      "output": "6",
      "explanation": "[1,1,1,0,0,1,1,1,1,1,1]\nBolded numbers were flipped from 0 to 1. The longest subarray is underlined."
    },
    {
      "input": "nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3",
      "output": "10"
    }
  ],
  constraints: [
    "1 <= nums.length <= 10^5",
    "nums[i] is either 0 or 1.",
    "0 <= k <= nums.length"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int longestOnes(vector<int>& nums, int k) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> nums={1,1,1,0,0,0,1,1,1,1,0};
    cout<<sol.longestOnes(nums,2)<<endl; // 6
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
    int longestOnes(vector<int>& nums, int k) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> nums={1,1,1,0,0,0,1,1,1,1,0};
    cout<<sol.longestOnes(nums,2)<<endl; // 6
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
    int longestOnes(vector<int>& nums, int k) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> nums={1,1,1,0,0,0,1,1,1,1,0};
    cout<<sol.longestOnes(nums,2)<<endl; // 6
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
    int longestOnes(vector<int>& nums, int k) {
        int l=0, zeros=0, res=0;
        for (int r=0;r<(int)nums.size();r++) {
            if (nums[r]==0) zeros++;
            while (zeros>k) if (nums[l++]==0) zeros--;
            res=max(res,r-l+1);
        }
        return res;
    }
};

int main() {
    Solution sol;
    vector<int> nums={1,1,1,0,0,0,1,1,1,1,0};
    cout<<sol.longestOnes(nums,2)<<endl; // 6
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def longestOnes(self, nums: List[int], k: int) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    nums = [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0]
    print(sol.longestOnes(nums, 2))  # 6`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Recompute metrics for all possible subarrays or substrings using nested loops.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from typing import List

class Solution:
    def longestOnes(self, nums: List[int], k: int) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    nums = [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0]
    print(sol.longestOnes(nums, 2))  # 6`
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
    def longestOnes(self, nums: List[int], k: int) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    nums = [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0]
    print(sol.longestOnes(nums, 2))  # 6`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Use a dynamically resizing sliding window with single-pass updates to locate the target range in linear time.`,
        code: `from typing import List

class Solution:
    def longestOnes(self, nums: List[int], k: int) -> int:
        l = 0
        zeros = 0
        res = 0
        for r in range(len(nums)):
            if nums[r] == 0:
                zeros += 1
            while zeros > k:
                if nums[l] == 0:
                    zeros -= 1
                l += 1
            res = max(res, r - l + 1)
        return res

if __name__ == '__main__':
    sol = Solution()
    nums = [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0]
    print(sol.longestOnes(nums, 2))  # 6`
      }
    }
  }
};

export default problem;
