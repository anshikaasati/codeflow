import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "valid-perfect-square",
  title: "Valid Perfect Square",
  difficulty: "Easy",
  category: "Binary Search",
  patterns: ["Binary Search","Two Pointer"],
  url: "https://leetcode.com/problems/valid-perfect-square/",
  description: `Given a positive integer \`num\`, return \`true\` if \`num\` is a perfect square or \`false\` otherwise. A perfect square is an integer that is the square of an integer. In other words, it is the product of some integer with itself. Do not use any built-in library function.`,
  examples: [
    {
      "input": "num = 16",
      "output": "true"
    },
    {
      "input": "num = 14",
      "output": "false"
    }
  ],
  constraints: [
    "1 <= num <= 2^31 - 1"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    bool isPerfectSquare(int num) {
        // Write your code here
        return false;
    }
};

int main() {
    Solution sol;
    cout << boolalpha;
    cout << sol.isPerfectSquare(16) << endl; // true
    cout << sol.isPerfectSquare(14) << endl; // false
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
    bool isPerfectSquare(int num) {
        // Write your code here
        return false;
    }
};

int main() {
    Solution sol;
    cout << boolalpha;
    cout << sol.isPerfectSquare(16) << endl; // true
    cout << sol.isPerfectSquare(14) << endl; // false
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
    bool isPerfectSquare(int num) {
        // Write your code here
        return false;
    }
};

int main() {
    Solution sol;
    cout << boolalpha;
    cout << sol.isPerfectSquare(16) << endl; // true
    cout << sol.isPerfectSquare(14) << endl; // false
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
    bool isPerfectSquare(int num) {
        if (num < 1) return false;
        long long low = 1, high = num;
        while (low <= high) {
            long long mid = low + (high - low) / 2;
            long long sq = mid * mid;
            if (sq == num) return true;
            else if (sq < num) low = mid + 1;
            else high = mid - 1;
        }
        return false;
    }
};

int main() {
    Solution sol;
    cout << boolalpha;
    cout << sol.isPerfectSquare(16) << endl; // true
    cout << sol.isPerfectSquare(14) << endl; // false
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import Optional

class Solution:
    def isPerfectSquare(self, num: int) -> bool:
        # Write your code here
        return False
if __name__ == "__main__":
    sol = Solution()
    print(sol.isPerfectSquare(16))  # true
    print(sol.isPerfectSquare(14))  # false`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Iterate sequentially through the search space to find the target element or transition point.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from typing import Optional

class Solution:
    def isPerfectSquare(self, num: int) -> bool:
        # Write your code here
        return False
if __name__ == "__main__":
    sol = Solution()
    print(sol.isPerfectSquare(16))  # true
    print(sol.isPerfectSquare(14))  # false`
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
    def isPerfectSquare(self, num: int) -> bool:
        # Write your code here
        return False
if __name__ == "__main__":
    sol = Solution()
    print(sol.isPerfectSquare(16))  # true
    print(sol.isPerfectSquare(14))  # false`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Binary search dividing search space in half each step, achieving logarithmic runtime.`,
        code: `from typing import Optional

class Solution:
    def isPerfectSquare(self, num: int) -> bool:
        if num < 1:
            return False
        low, high = 1, num
        while low <= high:
            mid = (low + high) // 2
            sq = mid * mid
            if sq == num:
                return True
            elif sq < num:
                low = mid + 1
            else:
                high = mid - 1
        return False

if __name__ == "__main__":
    sol = Solution()
    print(sol.isPerfectSquare(16))  # true
    print(sol.isPerfectSquare(14))  # false`
      }
    }
  }
};

export default problem;
