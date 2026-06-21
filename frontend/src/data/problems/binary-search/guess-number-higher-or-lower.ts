import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "guess-number-higher-or-lower",
  title: "Guess Number Higher or Lower",
  difficulty: "Easy",
  category: "Binary Search",
  patterns: ["Binary Search","Two Pointer"],
  url: "https://leetcode.com/problems/guess-number-higher-or-lower/",
  description: `We are playing the Guess Game. The game is as follows: I choose a number from \`1\` to \`n\`. You have to guess which number I chose. Every time you guess wrong, I will tell you whether the number I chose is higher or lower than your guess.`,
  examples: [
    {
      "input": "n = 10, pick = 6",
      "output": "6"
    }
  ],
  constraints: [
    "1 <= n <= 2^31 - 1",
    "1 <= pick <= n"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

int targetNum = 6;
int guess(int num) {
    if (num > targetNum) return -1;
    if (num < targetNum) return 1;
    return 0;
}

class Solution {
public:
    int guessNumber(int n) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    cout << sol.guessNumber(10) << endl; // 6
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

int targetNum = 6;
int guess(int num) {
    if (num > targetNum) return -1;
    if (num < targetNum) return 1;
    return 0;
}

class Solution {
public:
    int guessNumber(int n) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    cout << sol.guessNumber(10) << endl; // 6
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

int targetNum = 6;
int guess(int num) {
    if (num > targetNum) return -1;
    if (num < targetNum) return 1;
    return 0;
}

class Solution {
public:
    int guessNumber(int n) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    cout << sol.guessNumber(10) << endl; // 6
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

int targetNum = 6;
int guess(int num) {
    if (num > targetNum) return -1;
    if (num < targetNum) return 1;
    return 0;
}

class Solution {
public:
    int guessNumber(int n) {
        int low = 1, high = n;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            int res = guess(mid);
            if (res == 0) return mid;
            else if (res < 0) high = mid - 1;
            else low = mid + 1;
        }
        return -1;
    }
};

int main() {
    Solution sol;
    cout << sol.guessNumber(10) << endl; // 6
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import Optional

target_num = 6

def guess(num: int) -> int:
    if num > target_num:
        return -1
    if num < target_num:
        return 1
    return 0

class Solution:
    def guessNumber(self, n: int) -> int:
        # Write your code here
        return 0
if __name__ == "__main__":
    sol = Solution()
    print(sol.guessNumber(10))  # 6`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Iterate sequentially through the search space to find the target element or transition point.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from typing import Optional

target_num = 6

def guess(num: int) -> int:
    if num > target_num:
        return -1
    if num < target_num:
        return 1
    return 0

class Solution:
    def guessNumber(self, n: int) -> int:
        # Write your code here
        return 0
if __name__ == "__main__":
    sol = Solution()
    print(sol.guessNumber(10))  # 6`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Linear search with early exit or simple range narrowing.`,
        code: `// Better Solution
// TODO: Implement optimized approach
from typing import Optional

target_num = 6

def guess(num: int) -> int:
    if num > target_num:
        return -1
    if num < target_num:
        return 1
    return 0

class Solution:
    def guessNumber(self, n: int) -> int:
        # Write your code here
        return 0
if __name__ == "__main__":
    sol = Solution()
    print(sol.guessNumber(10))  # 6`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Binary search dividing search space in half each step, achieving logarithmic runtime.`,
        code: `from typing import Optional

target_num = 6

def guess(num: int) -> int:
    if num > target_num:
        return -1
    if num < target_num:
        return 1
    return 0

class Solution:
    def guessNumber(self, n: int) -> int:
        low, high = 1, n
        while low <= high:
            mid = low + (high - low) // 2
            res = guess(mid)
            if res == 0:
                return mid
            elif res < 0:
                high = mid - 1
            else:
                low = mid + 1
        return -1

if __name__ == "__main__":
    sol = Solution()
    print(sol.guessNumber(10))  # 6`
      }
    }
  }
};

export default problem;
