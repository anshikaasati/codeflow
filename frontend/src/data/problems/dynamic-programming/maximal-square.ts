import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "maximal-square",
  title: "Maximal Square",
  difficulty: "Medium",
  category: "Dynamic Programming",
  patterns: ["DP","Memoization"],
  url: "https://leetcode.com/problems/maximal-square/",
  description: `Given an \`m x n\` binary \`matrix\` filled with \`0\`s and \`1\`s, find the largest square containing only \`1\`s and return its area.`,
  examples: [
    {
      "input": "matrix = [[\"1\",\"0\",\"1\",\"0\",\"0\"],[\"1\",\"0\",\"1\",\"1\",\"1\"],[\"1\",\"1\",\"1\",\"1\",\"1\"],[\"1\",\"0\",\"0\",\"1\",\"0\"]]",
      "output": "4"
    },
    {
      "input": "matrix = [[\"0\",\"1\"],[\"1\",\"0\"]]",
      "output": "1"
    },
    {
      "input": "matrix = [[\"0\"]]",
      "output": "0"
    }
  ],
  constraints: [
    "m == matrix.length",
    "n == matrix[i].length",
    "1 <= m, n <= 300",
    "matrix[i][j] is '0' or '1'."
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    int maximalSquare(vector<vector<char>>& matrix){
        // Write your code here
        return 0;
    }
};
int main(){
    Solution sol;
    vector<vector<char>> m={{'1','0','1','0','0'},{'1','0','1','1','1'},{'1','1','1','1','1'},{'1','0','0','1','0'}};
    cout<<sol.maximalSquare(m)<<endl; // 4
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
    int maximalSquare(vector<vector<char>>& matrix){
        // Write your code here
        return 0;
    }
};
int main(){
    Solution sol;
    vector<vector<char>> m={{'1','0','1','0','0'},{'1','0','1','1','1'},{'1','1','1','1','1'},{'1','0','0','1','0'}};
    cout<<sol.maximalSquare(m)<<endl; // 4
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
    int maximalSquare(vector<vector<char>>& matrix){
        // Write your code here
        return 0;
    }
};
int main(){
    Solution sol;
    vector<vector<char>> m={{'1','0','1','0','0'},{'1','0','1','1','1'},{'1','1','1','1','1'},{'1','0','0','1','0'}};
    cout<<sol.maximalSquare(m)<<endl; // 4
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
    int maximalSquare(vector<vector<char>>& matrix){
        int m=matrix.size(),n=matrix[0].size(),maxSide=0;
        vector<vector<int>> dp(m+1,vector<int>(n+1,0));
        for(int i=1;i<=m;i++) for(int j=1;j<=n;j++){
            if(matrix[i-1][j-1]=='1'){
                dp[i][j]=min({dp[i-1][j],dp[i][j-1],dp[i-1][j-1]})+1;
                maxSide=max(maxSide,dp[i][j]);
            }
        }
        return maxSide*maxSide;
    }
};
int main(){
    Solution sol;
    vector<vector<char>> m={{'1','0','1','0','0'},{'1','0','1','1','1'},{'1','1','1','1','1'},{'1','0','0','1','0'}};
    cout<<sol.maximalSquare(m)<<endl; // 4
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def maximalSquare(self, matrix: List[List[str]]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    m = [['1','0','1','0','0'],['1','0','1','1','1'],['1','1','1','1','1'],['1','0','0','1','0']]
    print(sol.maximalSquare(m))  # 4`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Recursively solve all subproblems, recalculating overlapping states (exponential runtime).`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from typing import List

class Solution:
    def maximalSquare(self, matrix: List[List[str]]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    m = [['1','0','1','0','0'],['1','0','1','1','1'],['1','1','1','1','1'],['1','0','0','1','0']]
    print(sol.maximalSquare(m))  # 4`
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
    def maximalSquare(self, matrix: List[List[str]]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    m = [['1','0','1','0','0'],['1','0','1','1','1'],['1','1','1','1','1'],['1','0','0','1','0']]
    print(sol.maximalSquare(m))  # 4`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Bottom-up tabulation (iterative array/matrix updates) to compute states sequentially in polynomial time.`,
        code: `from typing import List

class Solution:
    def maximalSquare(self, matrix: List[List[str]]) -> int:
        m, n, max_side = len(matrix), len(matrix[0]), 0
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if matrix[i - 1][j - 1] == '1':
                    dp[i][j] = min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1
                    max_side = max(max_side, dp[i][j])
        return max_side * max_side

if __name__ == '__main__':
    sol = Solution()
    m = [['1','0','1','0','0'],['1','0','1','1','1'],['1','1','1','1','1'],['1','0','0','1','0']]
    print(sol.maximalSquare(m))  # 4`
      }
    }
  }
};

export default problem;
