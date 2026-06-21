import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "surrounded-regions",
  title: "Surrounded Regions",
  difficulty: "Medium",
  category: "Graphs",
  patterns: ["Graph","DFS"],
  url: "https://leetcode.com/problems/surrounded-regions/",
  description: "Given an `m x n` matrix `board` containing `'X'` and `'O'`, capture all regions that are 4-directionally surrounded by `'X'`.\n\nA region is **captured** by flipping all `'O'`s into `'X'`s in that surrounded region.",
  examples: [
  {
    "input": "board = [[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"O\",\"X\"],[\"X\",\"X\",\"O\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]",
    "output": "[[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]",
    "explanation": "Surrounded regions should not be on the border, which means that any 'O' on the border of the board are not flipped to 'X'. Any 'O' that is not on the border and it is not connected to an 'O' on the border will be flipped to 'X'. Two cells are connected if they are adjacent cells connected horizontally or vertically."
  },
  {
    "input": "board = [[\"X\"]]",
    "output": "[[\"X\"]]"
  }
],
  constraints: [
  "m == board.length",
  "n == board[i].length",
  "1 <= m, n <= 200",
  "board[i][j] is 'X' or 'O'."
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
    void dfs(vector<vector<char>>&b,int i,int j){
        // Write your code here
    }
public:
    void solve(vector<vector<char>>& board){
        // Write your code here
    }
};

int main(){
    vector<vector<char>> b={{'X','X','X','X'},{'X','O','O','X'},{'X','X','O','X'},{'X','O','X','X'}};
    Solution sol; sol.solve(b);
    for(auto&r:b){for(char c:r)cout<<c<<" ";cout<<endl;}
    return 0;
}`,
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
    void dfs(vector<vector<char>>&b,int i,int j){
        int m=b.size(),n=b[0].size();
        if(i<0||i>=m||j<0||j>=n||b[i][j]!='O') return;
        b[i][j]='S';
        dfs(b,i+1,j);dfs(b,i-1,j);dfs(b,i,j+1);dfs(b,i,j-1);
    }
public:
    void solve(vector<vector<char>>& board){
        if (board.empty()) return;
        int m=board.size(),n=board[0].size();
        for(int i=0;i<m;i++){dfs(board,i,0);dfs(board,i,n-1);}
        for(int j=0;j<n;j++){dfs(board,0,j);dfs(board,m-1,j);}
        for(auto&r:board) for(auto&c:r) c=(c=='S'?'O':'X');
    }
};

int main(){
    vector<vector<char>> b={{'X','X','X','X'},{'X','O','O','X'},{'X','X','O','X'},{'X','O','X','X'}};
    Solution sol; sol.solve(b);
    for(auto&r:b){for(char c:r)cout<<c<<" ";cout<<endl;}
    return 0;
}`
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def dfs(self, board: List[List[str]], i: int, j: int) -> None:
        # Write your code here
        pass
    def solve(self, board: List[List[str]]) -> None:
        # Write your code here
        pass
if __name__ == '__main__':
    b = [['X', 'X', 'X', 'X'], ['X', 'O', 'O', 'X'], ['X', 'X', 'O', 'X'], ['X', 'O', 'X', 'X']]
    sol = Solution()
    sol.solve(b)
    for r in b:
        for c in r:
            print(c, end=" ")
        print()`,
      solutionCode: `from typing import List

class Solution:
    def dfs(self, board: List[List[str]], i: int, j: int) -> None:
        m, n = len(board), len(board[0])
        if i < 0 or i >= m or j < 0 or j >= n or board[i][j] != 'O':
            return
        board[i][j] = 'S'
        self.dfs(board, i + 1, j)
        self.dfs(board, i - 1, j)
        self.dfs(board, i, j + 1)
        self.dfs(board, i, j - 1)

    def solve(self, board: List[List[str]]) -> None:
        if not board:
            return
        m, n = len(board), len(board[0])
        for i in range(m):
            self.dfs(board, i, 0)
            self.dfs(board, i, n - 1)
        for j in range(n):
            self.dfs(board, 0, j)
            self.dfs(board, m - 1, j)
        for r in range(m):
            for c in range(n):
                board[r][c] = 'O' if board[r][c] == 'S' else 'X'

if __name__ == '__main__':
    b = [['X', 'X', 'X', 'X'], ['X', 'O', 'O', 'X'], ['X', 'X', 'O', 'X'], ['X', 'O', 'X', 'X']]
    sol = Solution()
    sol.solve(b)
    for r in b:
        for c in r:
            print(c, end=" ")
        print()`
    }
  }
};

export default problem;
