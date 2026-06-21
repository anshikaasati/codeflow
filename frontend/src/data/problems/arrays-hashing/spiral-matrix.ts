import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "spiral-matrix",
  title: "Spiral Matrix",
  difficulty: "Medium",
  category: "Arrays & Hashing",
  patterns: ["Array"],
  url: "https://leetcode.com/problems/spiral-matrix/",
  description: "Given an `m x n` matrix, return all elements of the matrix in spiral order.",
  examples: [
  {
    "input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
    "output": "[1,2,3,6,9,8,7,4,5]"
  },
  {
    "input": "matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]",
    "output": "[1,2,3,4,8,12,11,10,9,5,6,7]"
  }
],
  constraints: [
  "m == matrix.length",
  "n == matrix[i].length",
  "1 <= m, n <= 10",
  "-100 <= matrix[i][j] <= 100"
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        // Write your code here
        return {};
    }
};
int main() {
    Solution sol;
    vector<vector<int>> m = {{1,2,3},{4,5,6},{7,8,9}};
    for (int v : sol.spiralOrder(m)) cout << v << " "; // 1 2 3 6 9 8 7 4 5
    cout << endl;
    return 0;
}`,
      solutionCode: `#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        vector<int> res;
        int top=0, bottom=matrix.size()-1, left=0, right=matrix[0].size()-1;
        while (top<=bottom && left<=right) {
            for (int j=left; j<=right; j++) res.push_back(matrix[top][j]); top++;
            for (int i=top; i<=bottom; i++) res.push_back(matrix[i][right]); right--;
            if (top<=bottom) { for (int j=right; j>=left; j--) res.push_back(matrix[bottom][j]); bottom--; }
            if (left<=right) { for (int i=bottom; i>=top; i--) res.push_back(matrix[i][left]); left++; }
        }
        return res;
    }
};
int main() {
    Solution sol;
    vector<vector<int>> m = {{1,2,3},{4,5,6},{7,8,9}};
    for (int v : sol.spiralOrder(m)) cout << v << " "; // 1 2 3 6 9 8 7 4 5
    cout << endl;
    return 0;
}`
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        # Write your code here
        return []
if __name__ == "__main__":
    sol = Solution()
    m = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    print(*sol.spiralOrder(m))  # 1 2 3 6 9 8 7 4 5`,
      solutionCode: `from typing import List

class Solution:
    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        res = []
        top, bottom, left, right = 0, len(matrix) - 1, 0, len(matrix[0]) - 1
        while top <= bottom and left <= right:
            for j in range(left, right + 1):
                res.append(matrix[top][j])
            top += 1
            for i in range(top, bottom + 1):
                res.append(matrix[i][right])
            right -= 1
            if top <= bottom:
                for j in range(right, left - 1, -1):
                    res.append(matrix[bottom][j])
                bottom -= 1
            if left <= right:
                for i in range(bottom, top - 1, -1):
                    res.append(matrix[i][left])
                left += 1
        return res

if __name__ == "__main__":
    sol = Solution()
    m = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    print(*sol.spiralOrder(m))  # 1 2 3 6 9 8 7 4 5`
    }
  }
};

export default problem;
