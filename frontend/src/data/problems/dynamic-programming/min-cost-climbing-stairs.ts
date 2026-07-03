import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "min-cost-climbing-stairs",
  title: "Min Cost Climbing Stairs",
  difficulty: "Easy",
  category: "Dynamic Programming",
  patterns: ["DP"],
  url: "https://leetcode.com/problems/min-cost-climbing-stairs/",
  description: `You are given an integer array \`cost\` where \`cost[i]\` is the cost of \`ith\` step on a staircase. Once you pay the cost, you can either climb one or two steps.

You can either start from the step with index \`0\`, or the step with index \`1\`.

Return the minimum cost to reach the top of the floor.`,
  examples: [
    {
      "input": "cost = [10,15,20]",
      "output": "15",
      "explanation": "You will start at index 1.\n- Pay 15 and climb two steps to reach the top.\nThe total cost is 15."
    },
    {
      "input": "cost = [1,100,1,1,1,100,1,1,100,1]",
      "output": "6",
      "explanation": "You will start at index 0.\n- Pay 1 and climb two steps to reach index 2.\n- Pay 1 and climb two steps to reach index 4.\n- Pay 1 and climb two steps to reach index 6.\n- Pay 1 and climb one step to reach index 7.\n- Pay 1 and climb two steps to reach index 9.\n- Pay 1 and climb one step to reach the top.\nThe total cost is 6."
    }
  ],
  constraints: [
    "2 <= cost.length <= 1000",
    "0 <= cost[i] <= 999"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int minCostClimbingStairs(vector<int>& cost){
        // Write your code here
        return 0;
    }
};

int main(){
    Solution sol;
    vector<int> c={10,15,20};
    cout<<sol.minCostClimbingStairs(c)<<endl; // 15
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
    int minCostClimbingStairs(vector<int>& cost){
        // Write your code here
        return 0;
    }
};

int main(){
    Solution sol;
    vector<int> c={10,15,20};
    cout<<sol.minCostClimbingStairs(c)<<endl; // 15
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
    int minCostClimbingStairs(vector<int>& cost){
        // Write your code here
        return 0;
    }
};

int main(){
    Solution sol;
    vector<int> c={10,15,20};
    cout<<sol.minCostClimbingStairs(c)<<endl; // 15
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
    int minCostClimbingStairs(vector<int>& cost){
        int n=cost.size();
        if (n < 2) return 0;
        vector<int> dp = cost;
        for(int i=2;i<n;i++) dp[i]+=min(dp[i-1],dp[i-2]);
        return min(dp[n-1],dp[n-2]);
    }
};

int main(){
    Solution sol;
    vector<int> c={10,15,20};
    cout<<sol.minCostClimbingStairs(c)<<endl; // 15
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    c = [10,15,20]
    print(sol.minCostClimbingStairs(c))  # 15`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Recursively solve all subproblems, recalculating overlapping states (exponential runtime).`,
        code: `# Brute Force Approach
# TODO: Implement brute force
from typing import List

class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    c = [10,15,20]
    print(sol.minCostClimbingStairs(c))  # 15`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Top-down memoization (recursion + cache) to store and reuse solved subproblem states.`,
        code: `# Better Solution
# TODO: Implement optimized approach
from typing import List

class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    c = [10,15,20]
    print(sol.minCostClimbingStairs(c))  # 15`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Bottom-up tabulation (iterative array/matrix updates) to compute states sequentially in polynomial time.`,
        code: `from typing import List

class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        n = len(cost)
        if n < 2: 
            return 0
        dp = cost[:]
        for i in range(2, n): 
            dp[i] += min(dp[i-1], dp[i-2])
        return min(dp[n-1], dp[n-2])

if __name__ == '__main__':
    sol = Solution()
    c = [10,15,20]
    print(sol.minCostClimbingStairs(c))  # 15`
      }
    }
  }
};

export default problem;
