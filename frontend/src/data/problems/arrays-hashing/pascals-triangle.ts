import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "pascals-triangle",
  title: "Pascal's Triangle",
  difficulty: "Easy",
  category: "Arrays & Hashing",
  patterns: ["Array"],
  url: "https://leetcode.com/problems/pascals-triangle/",
  description: `Given an integer \`numRows\`, return the first \`numRows\` of Pascal's triangle.

In Pascal's triangle, each number is the sum of the two numbers directly above it.`,
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
        // Write your code here
        return {};
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
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Compare all elements or subsegments using nested loops to verify the condition.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<vector<int>> generate(int numRows) {
        // Write your code here
        return {};
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
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Sort the array first to group elements, or use a Hash Set/Map to track seen values.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<vector<int>> generate(int numRows) {
        // Write your code here
        return {};
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
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Use a single pass linear scan with optimized hashing, frequency tables, or in-place marking.`,
        code: `#include <bits/stdc++.h>
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
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def generate(self, numRows: int) -> List[List[int]]:
        # Write your code here
        return []
def main():
    sol = Solution()
    triangle = sol.generate(5)
    for row in triangle:
        print(' '.join(str(x) for x in row))

if __name__ == "__main__":
    main()`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Compare all elements or subsegments using nested loops to verify the condition.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from typing import List

class Solution:
    def generate(self, numRows: int) -> List[List[int]]:
        # Write your code here
        return []
def main():
    sol = Solution()
    triangle = sol.generate(5)
    for row in triangle:
        print(' '.join(str(x) for x in row))

if __name__ == "__main__":
    main()`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Sort the array first to group elements, or use a Hash Set/Map to track seen values.`,
        code: `// Better Solution
// TODO: Implement optimized approach
from typing import List

class Solution:
    def generate(self, numRows: int) -> List[List[int]]:
        # Write your code here
        return []
def main():
    sol = Solution()
    triangle = sol.generate(5)
    for row in triangle:
        print(' '.join(str(x) for x in row))

if __name__ == "__main__":
    main()`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Use a single pass linear scan with optimized hashing, frequency tables, or in-place marking.`,
        code: `from typing import List

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
      }
    }
  }
};

export default problem;
