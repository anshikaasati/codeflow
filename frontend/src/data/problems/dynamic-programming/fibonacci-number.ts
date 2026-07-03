import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "fibonacci-number",
  title: "Fibonacci Number",
  difficulty: "Easy",
  category: "Dynamic Programming",
  patterns: ["DP"],
  url: "https://leetcode.com/problems/fibonacci-number/",
  description: `The **Fibonacci numbers**, commonly denoted \`F(n)\` form a sequence, called the **Fibonacci sequence**, such that each number is the sum of the two preceding ones, starting from \`0\` and \`1\`. That is:\\n\\n\`F(0) = 0, F(1) = 1\`\\n\`F(n) = F(n - 1) + F(n - 2)\`, for \`n > 1\`.\\n\\nGiven \`n\`, calculate \`F(n)\`.`,
  examples: [
    {
      "input": "n = 2",
      "output": "1"
    },
    {
      "input": "n = 3",
      "output": "2"
    },
    {
      "input": "n = 4",
      "output": "3"
    }
  ],
  constraints: [
    "0 <= n <= 30"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    int fib(int n){
        // Write your code here
        return 0;
    }
};
int main(){Solution sol;cout<<sol.fib(10)<<endl;return 0;}`,
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
    int fib(int n){
        // Write your code here
        return 0;
    }
};
int main(){Solution sol;cout<<sol.fib(10)<<endl;return 0;}`
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
    int fib(int n){
        // Write your code here
        return 0;
    }
};
int main(){Solution sol;cout<<sol.fib(10)<<endl;return 0;}`
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
    int fib(int n){
        if(n<=1) return n;
        int a=0,b=1;
        for(int i=2;i<=n;i++){int c=a+b;a=b;b=c;}
        return b;
    }
};
int main(){Solution sol;cout<<sol.fib(10)<<endl;return 0;}`
      }
    },
    python: {
      starterCode: `class Solution:
    def fib(self, n: int) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    print(sol.fib(10))`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Recursively solve all subproblems, recalculating overlapping states (exponential runtime).`,
        code: `# Brute Force Approach
# TODO: Implement brute force
class Solution:
    def fib(self, n: int) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    print(sol.fib(10))`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Top-down memoization (recursion + cache) to store and reuse solved subproblem states.`,
        code: `# Better Solution
# TODO: Implement optimized approach
class Solution:
    def fib(self, n: int) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    print(sol.fib(10))`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Bottom-up tabulation (iterative array/matrix updates) to compute states sequentially in polynomial time.`,
        code: `class Solution:
    def fib(self, n: int) -> int:
        if n <= 1: return n
        a, b = 0, 1
        for i in range(2, n + 1):
            a, b = b, a + b
        return b

if __name__ == '__main__':
    sol = Solution()
    print(sol.fib(10))`
      }
    }
  }
};

export default problem;
