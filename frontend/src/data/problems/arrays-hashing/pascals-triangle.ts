import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "pascals-triangle",
  title: "Pascal's Triangle",
  difficulty: "Easy",
  category: "Arrays & Hashing",
  url: "https://leetcode.com/problems/pascals-triangle/",
  description: "Given an integer `numRows`, return the first `numRows` of Pascal's triangle.\n\nIn Pascal's triangle, each number is the sum of the two numbers directly above it.",
  examples: [
  {
    "input": "numRows = 5",
    "output": "[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]"
  },
  {
    "input": "numRows = 1",
    "output": "[[1]]"
  }
],
  constraints: [
  "1 <= numRows <= 30"
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<vector<int>> generate(int numRows) {
        vector<vector<int>> res;
        for (int i = 0; i < numRows; i++) {
            vector<int> row(i + 1, 1);
            for (int j = 1; j < i; j++) {
                row[j] = res[i-1][j-1] + res[i-1][j];
            }
            res.push_back(row);
        }
        return res;
    }
};

int main() {
    Solution sol;
    vector<vector<int>> triangle = sol.generate(5);
    for (int i = 0; i < triangle.size(); i++) {
        for (int j = 0; j < triangle[i].size(); j++) {
            cout << triangle[i][j];
            if (j < triangle[i].size() - 1) cout << " ";
        }
        cout << endl;
    }
    return 0;
}`
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def generate(self, numRows: int) -> List[List[int]]:
        result = []
        for i in range(numRows):
            row = [1] * (i + 1)
            for j in range(1, i):
                row[j] = result[i-1][j-1] + result[i-1][j]
            result.append(row)
        return result

def main():
    sol = Solution()
    triangle = sol.generate(5)
    for row in triangle:
        print(' '.join(str(x) for x in row))

if __name__ == "__main__":
    main()`
    },
    java: {
      starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Solution sol = new Solution();
        List<List<Integer>> triangle = sol.generate(5);
        for (List<Integer> row : triangle) {
            for (int j = 0; j < row.size(); j++) {
                System.out.print(row.get(j));
                if (j < row.size() - 1) System.out.print(" ");
            }
            System.out.println();
        }
    }
}

class Solution {
    public List<List<Integer>> generate(int numRows) {
        List<List<Integer>> res = new ArrayList<>();
        for (int i = 0; i < numRows; i++) {
            List<Integer> row = new ArrayList<>();
            for (int j = 0; j <= i; j++) {
                if (j == 0 || j == i) {
                    row.add(1);
                } else {
                    row.add(res.get(i - 1).get(j - 1) + res.get(i - 1).get(j));
                }
            }
            res.add(row);
        }
        return res;
    }
}`
    }
  }
};

export default problem;
