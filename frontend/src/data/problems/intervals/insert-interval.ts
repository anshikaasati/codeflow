import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "insert-interval",
  title: "Insert Interval",
  difficulty: "Medium",
  category: "Intervals",
  patterns: ["Intervals","Sorting"],
  url: "https://leetcode.com/problems/insert-interval/",
  description: `You are given an array of non-overlapping intervals \`intervals\` where \`intervals[i] = [starti, endi]\` represents the start and the end of the \`i-th\` interval and \`intervals\` is sorted in ascending order by \`starti\`.

You are also given an interval \`newInterval = [start, end]\` that represents the start and end of another interval.

Insert \`newInterval\` into \`intervals\` such that \`intervals\` is still sorted in ascending order by \`starti\` and \`intervals\` still does not have any overlapping intervals (merge overlapping intervals if necessary).

Return \`intervals\` after the insertion.`,
  examples: [
    {
      "input": "intervals = [[1,3],[6,9]], newInterval = [2,5]",
      "output": "[[1,5],[6,9]]"
    },
    {
      "input": "intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]",
      "output": "[[1,2],[3,10],[12,16]]",
      "explanation": "Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10]."
    }
  ],
  constraints: [
    "0 <= intervals.length <= 10^4",
    "intervals[i].length == 2",
    "0 <= starti <= endi <= 10^5",
    "intervals is sorted by starti in ascending order.",
    "newInterval.length == 2",
    "0 <= start <= end <= 10^5"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<vector<int>> iv = {{1,3},{6,9}};
    vector<int> nw = {2,5};
    auto res = sol.insert(iv, nw);
    for (auto& r : res) cout << "[" << r[0] << "," << r[1] << "] "; // [1,5] [6,9]
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
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<vector<int>> iv = {{1,3},{6,9}};
    vector<int> nw = {2,5};
    auto res = sol.insert(iv, nw);
    for (auto& r : res) cout << "[" << r[0] << "," << r[1] << "] "; // [1,5] [6,9]
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
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<vector<int>> iv = {{1,3},{6,9}};
    vector<int> nw = {2,5};
    auto res = sol.insert(iv, nw);
    for (auto& r : res) cout << "[" << r[0] << "," << r[1] << "] "; // [1,5] [6,9]
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
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        vector<vector<int>> res;
        int i = 0, n = intervals.size();
        // Add all intervals before newInterval
        while (i < n && intervals[i][1] < newInterval[0])
            res.push_back(intervals[i++]);
        // Merge overlapping
        while (i < n && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = min(newInterval[0], intervals[i][0]);
            newInterval[1] = max(newInterval[1], intervals[i][1]);
            i++;
        }
        res.push_back(newInterval);
        // Add rest
        while (i < n) res.push_back(intervals[i++]);
        return res;
    }
};

int main() {
    Solution sol;
    vector<vector<int>> iv = {{1,3},{6,9}};
    vector<int> nw = {2,5};
    auto res = sol.insert(iv, nw);
    for (auto& r : res) cout << "[" << r[0] << "," << r[1] << "] "; // [1,5] [6,9]
    cout << endl;
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def insert(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    iv = [[1, 3], [6, 9]]
    nw = [2, 5]
    res = sol.insert(iv, nw)
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
    def insert(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    iv = [[1, 3], [6, 9]]
    nw = [2, 5]
    res = sol.insert(iv, nw)
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
    def insert(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    iv = [[1, 3], [6, 9]]
    nw = [2, 5]
    res = sol.insert(iv, nw)
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
    def insert(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
        res = []
        i = 0
        n = len(intervals)
        # Add all intervals before newInterval
        while i < n and intervals[i][1] < newInterval[0]:
            res.append(intervals[i])
            i += 1
        # Merge overlapping
        while i < n and intervals[i][0] <= newInterval[1]:
            newInterval[0] = min(newInterval[0], intervals[i][0])
            newInterval[1] = max(newInterval[1], intervals[i][1])
            i += 1
        res.append(newInterval)
        # Add rest
        while i < n:
            res.append(intervals[i])
            i += 1
        return res

if __name__ == '__main__':
    sol = Solution()
    iv = [[1, 3], [6, 9]]
    nw = [2, 5]
    res = sol.insert(iv, nw)
    for r in res:
        print(f"[{r[0]},{r[1]}]", end=" ")
    print()`
      }
    }
  }
};

export default problem;
