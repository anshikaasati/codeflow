import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "power-of-two",
  title: "Power of Two",
  difficulty: "Easy",
  category: "Bit Manipulation",
  patterns: ["Bit Manipulation"],
  url: "https://leetcode.com/problems/power-of-two/",
  description: `Given an integer \`n\`, return \`true\` if it is a power of two. Otherwise, return \`false\`.

An integer \`n\` is a power of two, if there exists an integer \`x\` such that \`n == 2^x\`.`,
  examples: [
    {
      "input": "n = 1",
      "output": "true",
      "explanation": "2^0 = 1"
    },
    {
      "input": "n = 16",
      "output": "true",
      "explanation": "2^4 = 16"
    },
    {
      "input": "n = 3",
      "output": "false"
    }
  ],
  constraints: [
    "-2^31 <= n <= 2^31 - 1"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    bool isPowerOfTwo(int n){
        // Write your code here
        return false;
    }
};

int main(){
    Solution sol;cout<<boolalpha;
    cout<<sol.isPowerOfTwo(1)<<endl;  // true
    cout<<sol.isPowerOfTwo(16)<<endl; // true
    cout<<sol.isPowerOfTwo(3)<<endl;  // false
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
    bool isPowerOfTwo(int n){
        // Write your code here
        return false;
    }
};

int main(){
    Solution sol;cout<<boolalpha;
    cout<<sol.isPowerOfTwo(1)<<endl;  // true
    cout<<sol.isPowerOfTwo(16)<<endl; // true
    cout<<sol.isPowerOfTwo(3)<<endl;  // false
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
    bool isPowerOfTwo(int n){
        // Write your code here
        return false;
    }
};

int main(){
    Solution sol;cout<<boolalpha;
    cout<<sol.isPowerOfTwo(1)<<endl;  // true
    cout<<sol.isPowerOfTwo(16)<<endl; // true
    cout<<sol.isPowerOfTwo(3)<<endl;  // false
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
    bool isPowerOfTwo(int n){
        return n>0&&(n&(n-1))==0;
    }
};

int main(){
    Solution sol;cout<<boolalpha;
    cout<<sol.isPowerOfTwo(1)<<endl;  // true
    cout<<sol.isPowerOfTwo(16)<<endl; // true
    cout<<sol.isPowerOfTwo(3)<<endl;  // false
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import Optional

class Solution:
    def isPowerOfTwo(self, n: int) -> bool:
        # Write your code here
        return False
if __name__ == '__main__':
    sol = Solution()
    print(sol.isPowerOfTwo(1))  # true
    print(sol.isPowerOfTwo(16))  # true
    print(sol.isPowerOfTwo(3))  # false`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Convert numbers to binary string formats and perform character operations.`,
        code: `# Brute Force Approach
# TODO: Implement brute force
from typing import Optional

class Solution:
    def isPowerOfTwo(self, n: int) -> bool:
        # Write your code here
        return False
if __name__ == '__main__':
    sol = Solution()
    print(sol.isPowerOfTwo(1))  # true
    print(sol.isPowerOfTwo(16))  # true
    print(sol.isPowerOfTwo(3))  # false`
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
    def isPowerOfTwo(self, n: int) -> bool:
        # Write your code here
        return False
if __name__ == '__main__':
    sol = Solution()
    print(sol.isPowerOfTwo(1))  # true
    print(sol.isPowerOfTwo(16))  # true
    print(sol.isPowerOfTwo(3))  # false`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Bitwise operators (AND, OR, XOR, shifts) or precomputed masks to process bits in O(1) time.`,
        code: `from typing import Optional

class Solution:
    def isPowerOfTwo(self, n: int) -> bool:
        return n > 0 and (n & (n - 1)) == 0

if __name__ == '__main__':
    sol = Solution()
    print(sol.isPowerOfTwo(1))  # true
    print(sol.isPowerOfTwo(16))  # true
    print(sol.isPowerOfTwo(3))  # false`
      }
    }
  }
};

export default problem;
