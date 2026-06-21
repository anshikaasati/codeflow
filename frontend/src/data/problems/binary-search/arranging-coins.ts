import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "arranging-coins",
  title: "Arranging Coins",
  difficulty: "Easy",
  category: "Binary Search",
  patterns: ["Binary Search","Two Pointer"],
  url: "https://leetcode.com/problems/arranging-coins/",
  description: `You have \`n\` coins and you want to build a staircase with these coins. The staircase consists of \`k\` rows where the \`i\`-th row has exactly \`i\` coins. The last row of the staircase may be incomplete. Given the integer \`n\`, return the number of complete rows of the staircase you will build.`,
  examples: [
    {
      "input": "n = 5",
      "output": "2",
      "explanation": "Because the 3rd row is incomplete, we return 2."
    }
  ],
  constraints: [
    "1 <= n <= 2^31 - 1"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int arrangeCoins(int n) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    cout << sol.arrangeCoins(5) << endl; // 2
    cout << sol.arrangeCoins(8) << endl; // 3
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
    int arrangeCoins(int n) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    cout << sol.arrangeCoins(5) << endl; // 2
    cout << sol.arrangeCoins(8) << endl; // 3
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
    int arrangeCoins(int n) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    cout << sol.arrangeCoins(5) << endl; // 2
    cout << sol.arrangeCoins(8) << endl; // 3
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
    int arrangeCoins(int n) {
        long long low = 0, high = n;
        while (low <= high) {
            long long mid = low + (high - low) / 2;
            long long curr = mid * (mid + 1) / 2;
            if (curr == n) return mid;
            else if (curr < n) low = mid + 1;
            else high = mid - 1;
        }
        return high;
    }
};

int main() {
    Solution sol;
    cout << sol.arrangeCoins(5) << endl; // 2
    cout << sol.arrangeCoins(8) << endl; // 3
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import Optional

class Solution:
    def arrangeCoins(self, n: int) -> int:
        # Write your code here
        return 0
if __name__ == "__main__":
    sol = Solution()
    print(sol.arrangeCoins(5))  # 2
    print(sol.arrangeCoins(8))  # 3`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Iterate sequentially through the search space to find the target element or transition point.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from typing import Optional

class Solution:
    def arrangeCoins(self, n: int) -> int:
        # Write your code here
        return 0
if __name__ == "__main__":
    sol = Solution()
    print(sol.arrangeCoins(5))  # 2
    print(sol.arrangeCoins(8))  # 3`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Linear search with early exit or simple range narrowing.`,
        code: `// Better Solution
// TODO: Implement optimized approach
from typing import Optional

class Solution:
    def arrangeCoins(self, n: int) -> int:
        # Write your code here
        return 0
if __name__ == "__main__":
    sol = Solution()
    print(sol.arrangeCoins(5))  # 2
    print(sol.arrangeCoins(8))  # 3`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Binary search dividing search space in half each step, achieving logarithmic runtime.`,
        code: `from typing import Optional

class Solution:
    def arrangeCoins(self, n: int) -> int:
        low, high = 0, n
        while low <= high:
            mid = low + (high - low) // 2
            curr = mid * (mid + 1) // 2
            if curr == n: return mid
            elif curr < n: low = mid + 1
            else: high = mid - 1
        return high

if __name__ == "__main__":
    sol = Solution()
    print(sol.arrangeCoins(5))  # 2
    print(sol.arrangeCoins(8))  # 3`
      }
    }
  }
};

export default problem;
