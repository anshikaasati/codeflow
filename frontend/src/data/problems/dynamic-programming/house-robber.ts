import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "house-robber",
  title: "House Robber",
  difficulty: "Medium",
  category: "Dynamic Programming",
  patterns: ["DP"],
  url: "https://leetcode.com/problems/house-robber/",
  description: `You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and **it will automatically contact the police if two adjacent houses were broken into on the same night**.

Given an integer array \`nums\` representing the amount of money of each house, return the maximum amount of money you can rob tonight **without alerting the police**.`,
  examples: [
    {
      "input": "nums = [1,2,3,1]",
      "output": "4",
      "explanation": "Rob house 1 (money = 1) and then rob house 3 (money = 3). Total amount you can rob = 1 + 3 = 4."
    },
    {
      "input": "nums = [2,7,9,3,1]",
      "output": "12",
      "explanation": "Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1). Total amount you can rob = 2 + 9 + 1 = 12."
    }
  ],
  constraints: [
    "1 <= nums.length <= 100",
    "0 <= nums[i] <= 400"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int rob(vector<int>& nums) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> a = {1,2,3,1};
    vector<int> b = {2,7,9,3,1};
    cout << sol.rob(a) << endl; // 4
    cout << sol.rob(b) << endl; // 12
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Recursively solve all subproblems, recalculating overlapping states (exponential runtime).`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int rob(vector<int>& nums) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> a = {1,2,3,1};
    vector<int> b = {2,7,9,3,1};
    cout << sol.rob(a) << endl; // 4
    cout << sol.rob(b) << endl; // 12
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Top-down memoization (recursion + cache) to store and reuse solved subproblem states.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int rob(vector<int>& nums) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> a = {1,2,3,1};
    vector<int> b = {2,7,9,3,1};
    cout << sol.rob(a) << endl; // 4
    cout << sol.rob(b) << endl; // 12
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Bottom-up tabulation (iterative array/matrix updates) to compute states sequentially in polynomial time.`,
        code: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int rob(vector<int>& nums) {
        int prev2 = 0, prev1 = 0;
        for (int n : nums) {
            int curr = max(prev1, prev2 + n);
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
};

int main() {
    Solution sol;
    vector<int> a = {1,2,3,1};
    vector<int> b = {2,7,9,3,1};
    cout << sol.rob(a) << endl; // 4
    cout << sol.rob(b) << endl; // 12
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def rob(self, nums: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    a = [1,2,3,1]
    b = [2,7,9,3,1]
    print(sol.rob(a))  # 4
    print(sol.rob(b))  # 12`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Recursively solve all subproblems, recalculating overlapping states (exponential runtime).`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from typing import List

class Solution:
    def rob(self, nums: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    a = [1,2,3,1]
    b = [2,7,9,3,1]
    print(sol.rob(a))  # 4
    print(sol.rob(b))  # 12`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Top-down memoization (recursion + cache) to store and reuse solved subproblem states.`,
        code: `// Better Solution
// TODO: Implement optimized approach
from typing import List

class Solution:
    def rob(self, nums: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    a = [1,2,3,1]
    b = [2,7,9,3,1]
    print(sol.rob(a))  # 4
    print(sol.rob(b))  # 12`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Bottom-up tabulation (iterative array/matrix updates) to compute states sequentially in polynomial time.`,
        code: `from typing import List

class Solution:
    def rob(self, nums: List[int]) -> int:
        prev2 = 0
        prev1 = 0
        for n in nums:
            curr = max(prev1, prev2 + n)
            prev2 = prev1
            prev1 = curr
        return prev1

if __name__ == '__main__':
    sol = Solution()
    a = [1,2,3,1]
    b = [2,7,9,3,1]
    print(sol.rob(a))  # 4
    print(sol.rob(b))  # 12`
      }
    }
  }
};

export default problem;
