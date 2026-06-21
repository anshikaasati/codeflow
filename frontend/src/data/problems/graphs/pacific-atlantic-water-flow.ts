import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "pacific-atlantic-water-flow",
  title: "Pacific Atlantic Water Flow",
  difficulty: "Medium",
  category: "Graphs",
  patterns: ["Graph","BFS"],
  url: "https://leetcode.com/problems/pacific-atlantic-water-flow/",
  description: "There is an `m x n` rectangular island that borders both the **Pacific Ocean** and **Atlantic Ocean**. The **Pacific Ocean** touches the island's left and top edges, and the **Atlantic Ocean** touches the island's right and bottom edges.\n\nThe island is partitioned into a grid of square cells. You are given an `m x n` integer matrix `heights` where `heights[r][c]` represents the **height above sea level** of the cell at coordinate `(r, c)`.\n\nThe island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is **less than or equal to** the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.\n\nReturn a **2D list** of grid coordinates `result` where `result[i] = [ri, ci]` denotes that rain water can flow from cell `(ri, ci)` to **both** the Pacific and Atlantic oceans.",
  examples: [
  {
    "input": "heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]",
    "output": "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]"
  },
  {
    "input": "heights = [[2,1],[1,2]]",
    "output": "[[0,0],[0,1],[1,0],[1,1]]"
  }
],
  constraints: [
  "m == heights.length",
  "n == heights[r].length",
  "1 <= m, n <= 200",
  "0 <= heights[r][c] <= 10^5"
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
    void bfs(vector<vector<int>>& h, queue<pair<int,int>>& q, vector<vector<bool>>& vis) {
        // Write your code here
    }
public:
    vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<vector<int>> h = {{1,2,2,3,5},{3,2,3,4,4},{2,4,5,3,1},{6,7,1,4,5},{5,1,1,2,4}};
    auto res = sol.pacificAtlantic(h);
    for (auto& p : res) cout << "[" << p[0] << "," << p[1] << "] ";
    cout << endl;
    return 0;
}`,
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
    void bfs(vector<vector<int>>& h, queue<pair<int,int>>& q, vector<vector<bool>>& vis) {
        int m = h.size(), n = h[0].size();
        int dirs[4][2] = {{0,1},{0,-1},{1,0},{-1,0}};
        while (!q.empty()) {
            auto [r, c] = q.front(); q.pop();
            for (auto& d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr>=0 && nr<m && nc>=0 && nc<n && !vis[nr][nc] && h[nr][nc]>=h[r][c]) {
                    vis[nr][nc] = true;
                    q.push({nr, nc});
                }
            }
        }
    }
public:
    vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {
        int m = heights.size(), n = heights[0].size();
        vector<vector<bool>> pac(m, vector<bool>(n, false));
        vector<vector<bool>> atl(m, vector<bool>(n, false));
        queue<pair<int,int>> pq, aq;
        for (int i = 0; i < m; i++) {
            pq.push({i,0}); pac[i][0] = true;
            aq.push({i,n-1}); atl[i][n-1] = true;
        }
        for (int j = 0; j < n; j++) {
            pq.push({0,j}); pac[0][j] = true;
            aq.push({m-1,j}); atl[m-1][j] = true;
        }
        bfs(heights, pq, pac); bfs(heights, aq, atl);
        vector<vector<int>> res;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (pac[i][j] && atl[i][j]) res.push_back({i, j});
        return res;
    }
};

int main() {
    Solution sol;
    vector<vector<int>> h = {{1,2,2,3,5},{3,2,3,4,4},{2,4,5,3,1},{6,7,1,4,5},{5,1,1,2,4}};
    auto res = sol.pacificAtlantic(h);
    for (auto& p : res) cout << "[" << p[0] << "," << p[1] << "] ";
    cout << endl;
    return 0;
}`
    },
    python: {
      starterCode: `from typing import List
from collections import deque

class Solution:
    def bfs(self, h: List[List[int]], q: deque, vis: List[List[bool]]) -> None:
        # Write your code here
        pass
    def pacificAtlantic(self, heights: List[List[int]]) -> List[List[int]]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    h = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
    res = sol.pacificAtlantic(h)
    print(res)`,
      solutionCode: `from typing import List
from collections import deque

class Solution:
    def bfs(self, h: List[List[int]], q: deque, vis: List[List[bool]]) -> None:
        m, n = len(h), len(h[0])
        dirs = [(0,1),(0,-1),(1,0),(-1,0)]
        while q:
            r, c = q.popleft()
            for d in dirs:
                nr, nc = r + d[0], c + d[1]
                if 0 <= nr < m and 0 <= nc < n and not vis[nr][nc] and h[nr][nc] >= h[r][c]:
                    vis[nr][nc] = True
                    q.append((nr, nc))

    def pacificAtlantic(self, heights: List[List[int]]) -> List[List[int]]:
        m, n = len(heights), len(heights[0])
        pac = [[False]*n for _ in range(m)]
        atl = [[False]*n for _ in range(m)]
        pq, aq = deque(), deque()
        for i in range(m):
            pq.append((i,0))
            pac[i][0] = True
            aq.append((i,n-1))
            atl[i][n-1] = True
        for j in range(n):
            pq.append((0,j))
            pac[0][j] = True
            aq.append((m-1,j))
            atl[m-1][j] = True
        self.bfs(heights, pq, pac)
        self.bfs(heights, aq, atl)
        res = []
        for i in range(m):
            for j in range(n):
                if pac[i][j] and atl[i][j]:
                    res.append([i, j])
        return res

if __name__ == '__main__':
    sol = Solution()
    h = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
    res = sol.pacificAtlantic(h)
    print(res)`
    }
  }
};

export default problem;
