import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "sqrtx",
  title: "Sqrt(x)",
  difficulty: "Easy",
  category: "Binary Search",
  patterns: ["Binary Search","Two Pointer"],
  url: "https://leetcode.com/problems/sqrtx/",
  description: "Given a non-negative integer `x`, return the square root of `x` rounded down to the nearest integer. The returned integer should be non-negative as well. Do not use any built-in exponent function or operator.",
  examples: [
  {
    "input": "x = 4",
    "output": "2"
  },
  {
    "input": "x = 8",
    "output": "2",
    "explanation": "The square root of 8 is 2.82842..., and since we round it down to the nearest integer, 2 is returned."
  }
],
  constraints: [
  "0 <= x <= 2^31 - 1"
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int mySqrt(int x) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    cout << sol.mySqrt(4) << endl; // 2
    cout << sol.mySqrt(8) << endl; // 2
    return 0;
}`,
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int mySqrt(int x) {
        if (x == 0 || x == 1) return x;
        int low = 1, high = x, ans = 0;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (mid <= x / mid) {
                ans = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return ans;
    }
};

int main() {
    Solution sol;
    cout << sol.mySqrt(4) << endl; // 2
    cout << sol.mySqrt(8) << endl; // 2
    return 0;
}`
    },
    python: {
      starterCode: `from typing import Optional

class Solution:
    def mySqrt(self, x: int) -> int:
        # Write your code here
        return 0
if __name__ == "__main__":
    sol = Solution()
    print(sol.mySqrt(4))  # 2
    print(sol.mySqrt(8))  # 2`,
      solutionCode: `from typing import Optional

class Solution:
    def mySqrt(self, x: int) -> int:
        if x == 0 or x == 1:
            return x
        low, high, ans = 1, x, 0
        while low <= high:
            mid = low + (high - low) // 2
            if mid <= x // mid:
                ans = mid
                low = mid + 1
            else:
                high = mid - 1
        return ans

if __name__ == "__main__":
    sol = Solution()
    print(sol.mySqrt(4))  # 2
    print(sol.mySqrt(8))  # 2`
    }
  }
};

export default problem;
