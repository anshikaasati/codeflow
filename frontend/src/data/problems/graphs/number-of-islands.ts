import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "number-of-islands",
  title: "Number of Islands",
  difficulty: "Medium",
  category: "Graphs",
  patterns: ["Graph","DFS"],
  url: "https://leetcode.com/problems/number-of-islands/",
  description: "Given an `m x n` 2D binary grid `grid` which represents a map of '1's (land) and '0's (water), return the number of islands.\n\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.",
  examples: [
  {
    "input": "grid = [\n  [\"1\",\"1\",\"1\",\"1\",\"0\"],\n  [\"1\",\"1\",\"0\",\"1\",\"0\"],\n  [\"1\",\"1\",\"0\",\"0\",\"0\"],\n  [\"0\",\"0\",\"0\",\"0\",\"0\"]\n]",
    "output": "1"
  },
  {
    "input": "grid = [\n  [\"1\",\"1\",\"0\",\"0\",\"0\"],\n  [\"1\",\"1\",\"0\",\"0\",\"0\"],\n  [\"0\",\"0\",\"1\",\"0\",\"0\"],\n  [\"0\",\"0\",\"0\",\"1\",\"1\"]\n]",
    "output": "3"
  }
],
  constraints: [
  "m == grid.length",
  "n == grid[i].length",
  "1 <= m, n <= 300",
  "grid[i][j] is '0' or '1'."
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
    void dfs(vector<vector<char>>& grid, int i, int j) {
        if (i < 0 || i >= (int)grid.size() || j < 0 || j >= (int)grid[0].size()
            || grid[i][j] != '1') return;
        grid[i][j] = '0';
        dfs(grid, i+1, j); dfs(grid, i-1, j);
        dfs(grid, i, j+1); dfs(grid, i, j-1);
    }
public:
    int numIslands(vector<vector<char>>& grid) {
        int count = 0;
        for (int i = 0; i < (int)grid.size(); i++)
            for (int j = 0; j < (int)grid[0].size(); j++)
                if (grid[i][j] == '1') { dfs(grid, i, j); count++; }
        return count;
    }
};

int main() {
    Solution sol;
    vector<vector<char>> grid = {
        {'1','1','1','1','0'},
        {'1','1','0','1','0'},
        {'1','1','0','0','0'},
        {'0','0','0','0','0'}
    };
    cout << sol.numIslands(grid) << endl; // 1
    return 0;
}`
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def dfs(self, grid: List[List[str]], i: int, j: int) -> None:
        if i < 0 or i >= len(grid) or j < 0 or j >= len(grid[0]) or grid[i][j] != '1':
            return
        grid[i][j] = '0'
        self.dfs(grid, i+1, j)
        self.dfs(grid, i-1, j)
        self.dfs(grid, i, j+1)
        self.dfs(grid, i, j-1)

    def numIslands(self, grid: List[List[str]]) -> int:
        count = 0
        for i in range(len(grid)):
            for j in range(len(grid[0])):
                if grid[i][j] == '1':
                    self.dfs(grid, i, j)
                    count += 1
        return count

if __name__ == '__main__':
    sol = Solution()
    grid = [
        ['1','1','1','1','0'],
        ['1','1','0','1','0'],
        ['1','1','0','0','0'],
        ['0','0','0','0','0']
    ]
    print(sol.numIslands(grid))  # 1`
    }
  }
};

export default problem;
