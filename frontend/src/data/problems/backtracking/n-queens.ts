import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "n-queens",
  title: "N-Queens",
  difficulty: "Hard",
  category: "Backtracking",
  url: "https://leetcode.com/problems/n-queens/",
  description: "The **n-queens** puzzle is the problem of placing `n` queens on an `n x n` chessboard such that no two queens attack each other.\n\nGiven an integer `n`, return *all distinct solutions to the **n-queens puzzle***. You may return the answer in **any order**.\n\nEach solution contains a distinct board configuration of the n-queens' placement, where `'Q'` and `'.'` both indicate a queen and an empty space, respectively.",
  examples: [
  {
    "input": "n = 4",
    "output": "[ [\".Q..\",\"...Q\",\"Q...\",\"..Q.\"], [\"..Q.\",\"Q...\",\"...Q\",\".Q..\"] ]",
    "explanation": "There exist two distinct solutions to the 4-queens puzzle as shown above."
  },
  {
    "input": "n = 1",
    "output": "[ [\"Q\"] ]"
  }
],
  constraints: [
  "1 <= n <= 9"
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
    vector<vector<string>> res;
    void bt(int row, int n, vector<string>& board,
            unordered_set<int>& cols,unordered_set<int>& diag1,unordered_set<int>& diag2){
        if(row==n){res.push_back(board);return;}
        for(int col=0;col<n;col++){
            if(cols.count(col)||diag1.count(row-col)||diag2.count(row+col)) continue;
            board[row][col]='Q'; cols.insert(col); diag1.insert(row-col); diag2.insert(row+col);
            bt(row+1,n,board,cols,diag1,diag2);
            board[row][col]='.'; cols.erase(col); diag1.erase(row-col); diag2.erase(row+col);
        }
    }
public:
    vector<vector<string>> solveNQueens(int n){
        res.clear();
        vector<string> board(n,string(n,'.'));
        unordered_set<int> c,d1,d2;
        bt(0,n,board,c,d1,d2); return res;
    }
};

int main(){
    Solution sol;
    auto r=sol.solveNQueens(4);
    cout<<r.size()<<" solutions"<<endl; // 2
    for(auto&s:r[0]) cout<<s<<endl;
    return 0;
}`
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def __init__(self):
        self.res = []

    def bt(self, row: int, n: int, board: List[List[str]], cols: set, diag1: set, diag2: set) -> None:
        if row == n:
            self.res.append([''.join(row) for row in board])
            return
        for col in range(n):
            if col in cols or row - col in diag1 or row + col in diag2:
                continue
            board[row][col] = 'Q'
            cols.add(col)
            diag1.add(row - col)
            diag2.add(row + col)
            self.bt(row + 1, n, board, cols, diag1, diag2)
            board[row][col] = '.'
            cols.remove(col)
            diag1.remove(row - col)
            diag2.remove(row + col)

    def solveNQueens(self, n: int) -> List[List[str]]:
        self.res = []
        board = [['.' for _ in range(n)] for _ in range(n)]
        self.bt(0, n, board, set(), set(), set())
        return self.res

if __name__ == "__main__":
    sol = Solution()
    r = sol.solveNQueens(4)
    print(len(r), "solutions")  # 2
    for s in r[0]:
        print(s)`
    }
  }
};

export default problem;
