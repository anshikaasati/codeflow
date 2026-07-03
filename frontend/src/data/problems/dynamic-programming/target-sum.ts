import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "target-sum",
  title: "Target Sum",
  difficulty: "Medium",
  category: "Dynamic Programming",
  patterns: ["DP","Memoization"],
  url: "https://leetcode.com/problems/target-sum/",
  description: `You are given an integer array \`nums\` and an integer \`target\`.\\n\\nYou want to build an expression out of nums by adding one of the symbols \`'+'\` and \`'-'\` before each integer in nums and then concatenate all the integers.\\n\\nFor example, if \`nums = [2, 1]\`, you can add a \`'+'\` before \`2\` and a \`'-'\` before \`1\` and concatenate them to build the expression \`"+2-1"\`.\\n\\nReturn the number of different **expressions** that you can build, which evaluates to \`target\`.`,
  examples: [
    {
      "input": "nums = [1,1,1,1,1], target = 3",
      "output": "5"
    },
    {
      "input": "nums = [1], target = 1",
      "output": "1"
    }
  ],
  constraints: [
    "1 <= nums.length <= 20",
    "0 <= nums[i] <= 1000",
    "0 <= sum(nums[i]) <= 1000",
    "-1000 <= target <= 1000"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    int findTargetSumWays(vector<int>& nums, int target){
        // Write your code here
        return 0;
    }
};
int main(){
    Solution sol;
    vector<int> nums={1,1,1,1,1};
    cout<<sol.findTargetSumWays(nums,3)<<endl; // 5
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
    int findTargetSumWays(vector<int>& nums, int target){
        // Write your code here
        return 0;
    }
};
int main(){
    Solution sol;
    vector<int> nums={1,1,1,1,1};
    cout<<sol.findTargetSumWays(nums,3)<<endl; // 5
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
    int findTargetSumWays(vector<int>& nums, int target){
        // Write your code here
        return 0;
    }
};
int main(){
    Solution sol;
    vector<int> nums={1,1,1,1,1};
    cout<<sol.findTargetSumWays(nums,3)<<endl; // 5
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
    int findTargetSumWays(vector<int>& nums, int target){
        unordered_map<int,int> dp; dp[0]=1;
        for(int n:nums){
            unordered_map<int,int> next;
            for(auto&[sum,cnt]:dp){next[sum+n]+=cnt;next[sum-n]+=cnt;}
            dp=next;
        }
        return dp.count(target)?dp[target]:0;
    }
};
int main(){
    Solution sol;
    vector<int> nums={1,1,1,1,1};
    cout<<sol.findTargetSumWays(nums,3)<<endl; // 5
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List, Dict

class Solution:
    def findTargetSumWays(self, nums: List[int], target: int) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    nums = [1, 1, 1, 1, 1]
    print(sol.findTargetSumWays(nums, 3))  # 5`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Recursively solve all subproblems, recalculating overlapping states (exponential runtime).`,
        code: `# Brute Force Approach
# TODO: Implement brute force
from typing import List, Dict

class Solution:
    def findTargetSumWays(self, nums: List[int], target: int) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    nums = [1, 1, 1, 1, 1]
    print(sol.findTargetSumWays(nums, 3))  # 5`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Top-down memoization (recursion + cache) to store and reuse solved subproblem states.`,
        code: `# Better Solution
# TODO: Implement optimized approach
from typing import List, Dict

class Solution:
    def findTargetSumWays(self, nums: List[int], target: int) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    nums = [1, 1, 1, 1, 1]
    print(sol.findTargetSumWays(nums, 3))  # 5`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Bottom-up tabulation (iterative array/matrix updates) to compute states sequentially in polynomial time.`,
        code: `from typing import List, Dict

class Solution:
    def findTargetSumWays(self, nums: List[int], target: int) -> int:
        dp: Dict[int, int] = {0: 1}
        for n in nums:
            next_dp: Dict[int, int] = {}
            for sum_val, cnt in dp.items():
                next_dp[sum_val + n] = next_dp.get(sum_val + n, 0) + cnt
                next_dp[sum_val - n] = next_dp.get(sum_val - n, 0) + cnt
            dp = next_dp
        return dp.get(target, 0)

if __name__ == '__main__':
    sol = Solution()
    nums = [1, 1, 1, 1, 1]
    print(sol.findTargetSumWays(nums, 3))  # 5`
      }
    }
  }
};

export default problem;
