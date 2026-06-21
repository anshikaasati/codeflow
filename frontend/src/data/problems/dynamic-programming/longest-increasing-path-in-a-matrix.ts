import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "longest-increasing-path-in-a-matrix",
  title: "Longest Increasing Path in a Matrix",
  difficulty: "Hard",
  category: "Dynamic Programming",
  patterns: ["DP","Memoization"],
  url: "https://leetcode.com/problems/longest-increasing-path-in-a-matrix/",
  description: `Given an \`m x n\` integers \`matrix\`, return the length of the longest increasing path in \`matrix\`.\\n\\nFrom each cell, you can either move in four directions: left, right, up, or down. You **may not** move diagonally or move outside the boundary (i.e., wrap-around is not allowed).`,
  examples: [
    {
      "input": "matrix = [[9,9,4],[6,6,8],[2,1,1]]",
      "output": "4",
      "explanation": "The longest increasing path is [1, 2, 6, 9]."
    },
    {
      "input": "matrix = [[3,4,5],[3,2,6],[2,2,1]]",
      "output": "4",
      "explanation": "The longest increasing path is [3, 4, 5, 6]. Moving diagonally is not allowed."
    }
  ],
  constraints: [
    "m == matrix.length",
    "n == matrix[i].length",
    "1 <= m, n <= 200",
    "0 <= matrix[i][j] <= 2^31 - 1"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
    int m, n;
    int memo[200][200];
    int dfs(vector<vector<int>>& matrix, int i, int j) {
        // Write your code here
        return 0;
    }
public:
    int longestIncreasingPath(vector<vector<int>>& matrix) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<vector<int>> m = {{9,9,4},{6,6,8},{2,1,1}};
    cout << sol.longestIncreasingPath(m) << endl; // 4
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(2^N)",
        spaceComplexity: "O(1)",
        approach: `Recursively solve all subproblems, recalculating overlapping states (exponential runtime).`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;

class Solution {
    int m, n;
    int memo[200][200];
    int dfs(vector<vector<int>>& matrix, int i, int j) {
        // Write your code here
        return 0;
    }
public:
    int longestIncreasingPath(vector<vector<int>>& matrix) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<vector<int>> m = {{9,9,4},{6,6,8},{2,1,1}};
    cout << sol.longestIncreasingPath(m) << endl; // 4
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(N)",
        approach: `Top-down memoization (recursion + cache) to store and reuse solved subproblem states.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;

class Solution {
    int m, n;
    int memo[200][200];
    int dfs(vector<vector<int>>& matrix, int i, int j) {
        // Write your code here
        return 0;
    }
public:
    int longestIncreasingPath(vector<vector<int>>& matrix) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<vector<int>> m = {{9,9,4},{6,6,8},{2,1,1}};
    cout << sol.longestIncreasingPath(m) << endl; // 4
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Bottom-up tabulation (iterative array/matrix updates) to compute states sequentially in polynomial time.`,
        code: `#include <bits/stdc++.h>
using namespace std;

class Solution {
    int m, n;
    int memo[200][200];
    int dfs(vector<vector<int>>& matrix, int i, int j) {
        if (memo[i][j]) return memo[i][j];
        int dirs[4][2] = {{0,1},{0,-1},{1,0},{-1,0}};
        int res = 1;
        for (auto& d : dirs) {
            int r = i + d[0], c = j + d[1];
            if (r >= 0 && r < m && c >= 0 && c < n && matrix[r][c] > matrix[i][j]) {
                res = max(res, 1 + dfs(matrix, r, c));
            }
        }
        return memo[i][j] = res;
    }
public:
    int longestIncreasingPath(vector<vector<int>>& matrix) {
        m = matrix.size(); n = matrix[0].size();
        memset(memo, 0, sizeof(memo));
        int maxLen = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                maxLen = max(maxLen, dfs(matrix, i, j));
        return maxLen;
    }
};

int main() {
    Solution sol;
    vector<vector<int>> m = {{9,9,4},{6,6,8},{2,1,1}};
    cout << sol.longestIncreasingPath(m) << endl; // 4
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def longestIncreasingPath(self, matrix: List[List[int]]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    m = [[9,9,4],[6,6,8],[2,1,1]]
    print(sol.longestIncreasingPath(m))  # 4`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(2^N)",
        spaceComplexity: "O(1)",
        approach: `Recursively solve all subproblems, recalculating overlapping states (exponential runtime).`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from typing import List

class Solution:
    def longestIncreasingPath(self, matrix: List[List[int]]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    m = [[9,9,4],[6,6,8],[2,1,1]]
    print(sol.longestIncreasingPath(m))  # 4`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(N)",
        approach: `Top-down memoization (recursion + cache) to store and reuse solved subproblem states.`,
        code: `// Better Solution
// TODO: Implement optimized approach
from typing import List

class Solution:
    def longestIncreasingPath(self, matrix: List[List[int]]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    m = [[9,9,4],[6,6,8],[2,1,1]]
    print(sol.longestIncreasingPath(m))  # 4`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Bottom-up tabulation (iterative array/matrix updates) to compute states sequentially in polynomial time.`,
        code: `from typing import List

class Solution:
    def longestIncreasingPath(self, matrix: List[List[int]]) -> int:
        if not matrix:
            return 0
        m, n = len(matrix), len(matrix[0])
        memo = [[0] * n for _ in range(m)]
        directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]

        def dfs(i: int, j: int) -> int:
            if memo[i][j] != 0:
                return memo[i][j]
            res = 1
            for d in directions:
                r, c = i + d[0], j + d[1]
                if 0 <= r < m and 0 <= c < n and matrix[r][c] > matrix[i][j]:
                    res = max(res, 1 + dfs(r, c))
            memo[i][j] = res
            return res

        max_len = 0
        for i in range(m):
            for j in range(n):
                max_len = max(max_len, dfs(i, j))
        return max_len

if __name__ == '__main__':
    sol = Solution()
    m = [[9,9,4],[6,6,8],[2,1,1]]
    print(sol.longestIncreasingPath(m))  # 4`
      }
    }
  }
};

export default problem;
