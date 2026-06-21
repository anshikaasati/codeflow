import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "merge-intervals",
  title: "Merge Intervals",
  difficulty: "Medium",
  category: "Intervals",
  patterns: ["Intervals","Sorting"],
  url: "https://leetcode.com/problems/merge-intervals/",
  description: `Given an array of \`intervals\` where \`intervals[i] = [starti, endi]\`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.`,
  examples: [
    {
      "input": "intervals = [[1,3],[2,6],[8,10],[15,18]]",
      "output": "[[1,6],[8,10],[15,18]]",
      "explanation": "Since intervals [1,3] and [2,6] overlap, merge them into [1,6]."
    },
    {
      "input": "intervals = [[1,4],[4,5]]",
      "output": "[[1,5]]",
      "explanation": "Intervals [1,4] and [4,5] are considered overlapping."
    }
  ],
  constraints: [
    "1 <= intervals.length <= 10^4",
    "intervals[i].length == 2",
    "0 <= starti <= endi <= 10^4"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<vector<int>> iv = {{1,3},{2,6},{8,10},{15,18}};
    auto res = sol.merge(iv);
    for (auto& r : res) cout << "[" << r[0] << "," << r[1] << "] "; // [1,6] [8,10] [15,18]
    cout << endl;
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Compare each interval with every other interval to find overlaps.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<vector<int>> iv = {{1,3},{2,6},{8,10},{15,18}};
    auto res = sol.merge(iv);
    for (auto& r : res) cout << "[" << r[0] << "," << r[1] << "] "; // [1,6] [8,10] [15,18]
    cout << endl;
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Sort intervals based on start times first, then compare adjacent intervals with extra checks.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<vector<int>> iv = {{1,3},{2,6},{8,10},{15,18}};
    auto res = sol.merge(iv);
    for (auto& r : res) cout << "[" << r[0] << "," << r[1] << "] "; // [1,6] [8,10] [15,18]
    cout << endl;
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Sort intervals and scan in a single pass, merging or inserting intervals greedily in-place.`,
        code: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> res;
        for (auto& iv : intervals) {
            if (!res.empty() && iv[0] <= res.back()[1])
                res.back()[1] = max(res.back()[1], iv[1]);
            else
                res.push_back(iv);
        }
        return res;
    }
};

int main() {
    Solution sol;
    vector<vector<int>> iv = {{1,3},{2,6},{8,10},{15,18}};
    auto res = sol.merge(iv);
    for (auto& r : res) cout << "[" << r[0] << "," << r[1] << "] "; // [1,6] [8,10] [15,18]
    cout << endl;
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    iv = [[1, 3], [2, 6], [8, 10], [15, 18]]
    res = sol.merge(iv)
    for r in res:
        print(f"[{r[0]},{r[1]}]", end=" ")
    print()`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Compare each interval with every other interval to find overlaps.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from typing import List

class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    iv = [[1, 3], [2, 6], [8, 10], [15, 18]]
    res = sol.merge(iv)
    for r in res:
        print(f"[{r[0]},{r[1]}]", end=" ")
    print()`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Sort intervals based on start times first, then compare adjacent intervals with extra checks.`,
        code: `// Better Solution
// TODO: Implement optimized approach
from typing import List

class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    iv = [[1, 3], [2, 6], [8, 10], [15, 18]]
    res = sol.merge(iv)
    for r in res:
        print(f"[{r[0]},{r[1]}]", end=" ")
    print()`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Sort intervals and scan in a single pass, merging or inserting intervals greedily in-place.`,
        code: `from typing import List

class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        intervals.sort(key=lambda x: x[0])
        res = []
        for iv in intervals:
            if res and iv[0] <= res[-1][1]:
                res[-1][1] = max(res[-1][1], iv[1])
            else:
                res.append(iv)
        return res

if __name__ == '__main__':
    sol = Solution()
    iv = [[1, 3], [2, 6], [8, 10], [15, 18]]
    res = sol.merge(iv)
    for r in res:
        print(f"[{r[0]},{r[1]}]", end=" ")
    print()`
      }
    }
  }
};

export default problem;
