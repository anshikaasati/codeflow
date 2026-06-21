import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "coin-change",
  title: "Coin Change",
  difficulty: "Medium",
  category: "Dynamic Programming",
  patterns: ["DP"],
  url: "https://leetcode.com/problems/coin-change/",
  description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return \`-1\`.

You may assume that you have an infinite number of each kind of coin.`,
  examples: [
    {
      "input": "coins = [1,2,5], amount = 11",
      "output": "3",
      "explanation": "11 = 5 + 5 + 1"
    },
    {
      "input": "coins = [2], amount = 3",
      "output": "-1"
    },
    {
      "input": "coins = [1], amount = 0",
      "output": "0"
    }
  ],
  constraints: [
    "1 <= coins.length <= 12",
    "1 <= coins[i] <= 2^31 - 1",
    "0 <= amount <= 10^4"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> coins1 = {1,5,6,9};
    cout << sol.coinChange(coins1, 11) << endl; // 2  (5+6)
    vector<int> coins2 = {2};
    cout << sol.coinChange(coins2, 3) << endl;  // -1
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
    int coinChange(vector<int>& coins, int amount) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> coins1 = {1,5,6,9};
    cout << sol.coinChange(coins1, 11) << endl; // 2  (5+6)
    vector<int> coins2 = {2};
    cout << sol.coinChange(coins2, 3) << endl;  // -1
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
    int coinChange(vector<int>& coins, int amount) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> coins1 = {1,5,6,9};
    cout << sol.coinChange(coins1, 11) << endl; // 2  (5+6)
    vector<int> coins2 = {2};
    cout << sol.coinChange(coins2, 3) << endl;  // -1
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
    int coinChange(vector<int>& coins, int amount) {
        vector<int> dp(amount + 1, amount + 1);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++)
            for (int c : coins)
                if (c <= i) dp[i] = min(dp[i], dp[i - c] + 1);
        return dp[amount] > amount ? -1 : dp[amount];
    }
};

int main() {
    Solution sol;
    vector<int> coins1 = {1,5,6,9};
    cout << sol.coinChange(coins1, 11) << endl; // 2  (5+6)
    vector<int> coins2 = {2};
    cout << sol.coinChange(coins2, 3) << endl;  // -1
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    coins1 = [1,5,6,9]
    print(sol.coinChange(coins1, 11))  # 2  (5+6)
    coins2 = [2]
    print(sol.coinChange(coins2, 3))  # -1`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Recursively solve all subproblems, recalculating overlapping states (exponential runtime).`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from typing import List

class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    coins1 = [1,5,6,9]
    print(sol.coinChange(coins1, 11))  # 2  (5+6)
    coins2 = [2]
    print(sol.coinChange(coins2, 3))  # -1`
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
    def coinChange(self, coins: List[int], amount: int) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    coins1 = [1,5,6,9]
    print(sol.coinChange(coins1, 11))  # 2  (5+6)
    coins2 = [2]
    print(sol.coinChange(coins2, 3))  # -1`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Bottom-up tabulation (iterative array/matrix updates) to compute states sequentially in polynomial time.`,
        code: `from typing import List

class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        dp = [amount + 1] * (amount + 1)
        dp[0] = 0
        for i in range(1, amount + 1):
            for c in coins:
                if c <= i:
                    dp[i] = min(dp[i], dp[i - c] + 1)
        return dp[amount] if dp[amount] <= amount else -1

if __name__ == '__main__':
    sol = Solution()
    coins1 = [1,5,6,9]
    print(sol.coinChange(coins1, 11))  # 2  (5+6)
    coins2 = [2]
    print(sol.coinChange(coins2, 3))  # -1`
      }
    }
  }
};

export default problem;
