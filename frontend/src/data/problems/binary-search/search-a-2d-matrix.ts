import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "search-a-2d-matrix",
  title: "Search a 2D Matrix",
  difficulty: "Medium",
  category: "Binary Search",
  patterns: ["Binary Search","Two Pointer"],
  url: "https://leetcode.com/problems/search-a-2d-matrix/",
  description: `Write an efficient algorithm that searches for a value \`target\` in an \`m x n\` integer matrix \`matrix\`. This matrix has the following properties:
- Integers in each row are sorted from left to right.
- The first integer of each row is greater than the last integer of the previous row.`,
  examples: [
    {
      "input": "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3",
      "output": "true"
    },
    {
      "input": "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13",
      "output": "false"
    }
  ],
  constraints: [
    "m == matrix.length",
    "n == matrix[i].length",
    "1 <= m, n <= 100",
    "-10^4 <= matrix[i][j], target <= 10^4"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        // Write your code here
        return false;
    }
};

int main() {
    Solution sol;
    cout << boolalpha;
    vector<vector<int>> mat = {{1,3,5,7},{10,11,16,20},{23,30,34,60}};
    cout << sol.searchMatrix(mat, 3)  << endl; // true
    cout << sol.searchMatrix(mat, 13) << endl; // false
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Iterate sequentially through the search space to find the target element or transition point.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        // Write your code here
        return false;
    }
};

int main() {
    Solution sol;
    cout << boolalpha;
    vector<vector<int>> mat = {{1,3,5,7},{10,11,16,20},{23,30,34,60}};
    cout << sol.searchMatrix(mat, 3)  << endl; // true
    cout << sol.searchMatrix(mat, 13) << endl; // false
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Linear search with early exit or simple range narrowing.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        // Write your code here
        return false;
    }
};

int main() {
    Solution sol;
    cout << boolalpha;
    vector<vector<int>> mat = {{1,3,5,7},{10,11,16,20},{23,30,34,60}};
    cout << sol.searchMatrix(mat, 3)  << endl; // true
    cout << sol.searchMatrix(mat, 13) << endl; // false
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Binary search dividing search space in half each step, achieving logarithmic runtime.`,
        code: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int m = matrix.size(), n = matrix[0].size();
        int l = 0, r = m * n - 1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            int val = matrix[mid / n][mid % n];
            if (val == target) return true;
            else if (val < target) l = mid + 1;
            else r = mid - 1;
        }
        return false;
    }
};

int main() {
    Solution sol;
    cout << boolalpha;
    vector<vector<int>> mat = {{1,3,5,7},{10,11,16,20},{23,30,34,60}};
    cout << sol.searchMatrix(mat, 3)  << endl; // true
    cout << sol.searchMatrix(mat, 13) << endl; // false
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        # Write your code here
        return False
if __name__ == "__main__":
    sol = Solution()
    matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]]
    print(sol.searchMatrix(matrix, 3))  # true
    print(sol.searchMatrix(matrix, 13))  # false`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Iterate sequentially through the search space to find the target element or transition point.`,
        code: `# Brute Force Approach
# TODO: Implement brute force
from typing import List

class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        # Write your code here
        return False
if __name__ == "__main__":
    sol = Solution()
    matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]]
    print(sol.searchMatrix(matrix, 3))  # true
    print(sol.searchMatrix(matrix, 13))  # false`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Linear search with early exit or simple range narrowing.`,
        code: `# Better Solution
# TODO: Implement optimized approach
from typing import List

class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        # Write your code here
        return False
if __name__ == "__main__":
    sol = Solution()
    matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]]
    print(sol.searchMatrix(matrix, 3))  # true
    print(sol.searchMatrix(matrix, 13))  # false`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Binary search dividing search space in half each step, achieving logarithmic runtime.`,
        code: `from typing import List

class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        m, n = len(matrix), len(matrix[0])
        l, r = 0, m * n - 1
        while l <= r:
            mid = l + (r - l) // 2
            val = matrix[mid // n][mid % n]
            if val == target:
                return True
            elif val < target:
                l = mid + 1
            else:
                r = mid - 1
        return False

if __name__ == "__main__":
    sol = Solution()
    matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]]
    print(sol.searchMatrix(matrix, 3))  # true
    print(sol.searchMatrix(matrix, 13))  # false`
      }
    }
  }
};

export default problem;
