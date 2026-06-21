import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "minimum-path-sum",
  title: "Minimum Path Sum",
  difficulty: "Medium",
  category: "Dynamic Programming",
  patterns: ["DP","Memoization"],
  url: "https://leetcode.com/problems/minimum-path-sum/",
  description: `Given a \`m x n\` \`grid\` filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.\\n\\n**Note:** You can only move either down or right at any point in time.`,
  examples: [
    {
      "input": "grid = [[1,3,1],[1,5,1],[4,2,1]]",
      "output": "7"
    },
    {
      "input": "grid = [[1,2,3],[4,5,6]]",
      "output": "12"
    }
  ],
  constraints: [
    "m == grid.length",
    "n == grid[i].length",
    "1 <= m, n <= 200",
    "0 <= grid[i][j] <= 200"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    int minPathSum(vector<vector<int>>& grid){
        // Write your code here
        return 0;
    }
};
int main(){
    Solution sol;
    vector<vector<int>> g={{1,3,1},{1,5,1},{4,2,1}};
    cout<<sol.minPathSum(g)<<endl; // 7
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
    int minPathSum(vector<vector<int>>& grid){
        // Write your code here
        return 0;
    }
};
int main(){
    Solution sol;
    vector<vector<int>> g={{1,3,1},{1,5,1},{4,2,1}};
    cout<<sol.minPathSum(g)<<endl; // 7
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
    int minPathSum(vector<vector<int>>& grid){
        // Write your code here
        return 0;
    }
};
int main(){
    Solution sol;
    vector<vector<int>> g={{1,3,1},{1,5,1},{4,2,1}};
    cout<<sol.minPathSum(g)<<endl; // 7
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
    int minPathSum(vector<vector<int>>& grid){
        int m=grid.size(),n=grid[0].size();
        for(int i=0;i<m;i++) for(int j=0;j<n;j++){
            if(i==0&&j==0) continue;
            else if(i==0) grid[i][j]+=grid[i][j-1];
            else if(j==0) grid[i][j]+=grid[i-1][j];
            else grid[i][j]+=min(grid[i-1][j],grid[i][j-1]);
        }
        return grid[m-1][n-1];
    }
};
int main(){
    Solution sol;
    vector<vector<int>> g={{1,3,1},{1,5,1},{4,2,1}};
    cout<<sol.minPathSum(g)<<endl; // 7
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def minPathSum(self, grid: List[List[int]]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    g = [[1,3,1],[1,5,1],[4,2,1]]
    print(sol.minPathSum(g))  # 7`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Recursively solve all subproblems, recalculating overlapping states (exponential runtime).`,
        code: `# Brute Force Approach
# TODO: Implement brute force
from typing import List

class Solution:
    def minPathSum(self, grid: List[List[int]]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    g = [[1,3,1],[1,5,1],[4,2,1]]
    print(sol.minPathSum(g))  # 7`
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
    def minPathSum(self, grid: List[List[int]]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    g = [[1,3,1],[1,5,1],[4,2,1]]
    print(sol.minPathSum(g))  # 7`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Bottom-up tabulation (iterative array/matrix updates) to compute states sequentially in polynomial time.`,
        code: `from typing import List

class Solution:
    def minPathSum(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        for i in range(m):
            for j in range(n):
                if i == 0 and j == 0:
                    continue
                elif i == 0:
                    grid[i][j] += grid[i][j-1]
                elif j == 0:
                    grid[i][j] += grid[i-1][j]
                else:
                    grid[i][j] += min(grid[i-1][j], grid[i][j-1])
        return grid[m-1][n-1]

if __name__ == '__main__':
    sol = Solution()
    g = [[1,3,1],[1,5,1],[4,2,1]]
    print(sol.minPathSum(g))  # 7`
      }
    }
  }
};

export default problem;
