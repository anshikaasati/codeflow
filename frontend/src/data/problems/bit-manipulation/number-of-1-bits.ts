import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "number-of-1-bits",
  title: "Number of 1 Bits",
  difficulty: "Easy",
  category: "Bit Manipulation",
  patterns: ["Bit Manipulation"],
  url: "https://leetcode.com/problems/number-of-1-bits/",
  description: `Write a function that takes an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).`,
  examples: [
    {
      "input": "n = 11 (binary: 1011)",
      "output": "3"
    },
    {
      "input": "n = 128 (binary: 10000000)",
      "output": "1"
    }
  ],
  constraints: [
    "The input must be a binary string of length 32"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int hammingWeight(uint32_t n) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    cout << sol.hammingWeight(11) << endl; // 3
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Convert numbers to binary string formats and perform character operations.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int hammingWeight(uint32_t n) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    cout << sol.hammingWeight(11) << endl; // 3
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Standard loop checking bits one by one.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int hammingWeight(uint32_t n) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    cout << sol.hammingWeight(11) << endl; // 3
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Bitwise operators (AND, OR, XOR, shifts) or precomputed masks to process bits in O(1) time.`,
        code: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int hammingWeight(uint32_t n) {
        int count = 0;
        while (n) {
            n &= (n - 1);
            count++;
        }
        return count;
    }
};

int main() {
    Solution sol;
    cout << sol.hammingWeight(11) << endl; // 3
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import Optional

class Solution:
    def hammingWeight(self, n: int) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    print(sol.hammingWeight(11))  # 3`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Convert numbers to binary string formats and perform character operations.`,
        code: `# Brute Force Approach
# TODO: Implement brute force
from typing import Optional

class Solution:
    def hammingWeight(self, n: int) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    print(sol.hammingWeight(11))  # 3`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Standard loop checking bits one by one.`,
        code: `# Better Solution
# TODO: Implement optimized approach
from typing import Optional

class Solution:
    def hammingWeight(self, n: int) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    print(sol.hammingWeight(11))  # 3`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Bitwise operators (AND, OR, XOR, shifts) or precomputed masks to process bits in O(1) time.`,
        code: `from typing import Optional

class Solution:
    def hammingWeight(self, n: int) -> int:
        count = 0
        while n:
            n &= (n - 1)
            count += 1
        return count

if __name__ == '__main__':
    sol = Solution()
    print(sol.hammingWeight(11))  # 3`
      }
    }
  }
};

export default problem;
