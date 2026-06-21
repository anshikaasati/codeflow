import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "combination-sum",
  title: "Combination Sum",
  difficulty: "Medium",
  category: "Backtracking",
  patterns: ["Backtracking","Recursion"],
  url: "https://leetcode.com/problems/combination-sum/",
  description: `Given an array of distinct integers \`candidates\` and a target integer \`target\`, return a list of all unique combinations of \`candidates\` where the chosen numbers sum to \`target\`. You may return the combinations in any order.

The same number may be chosen from \`candidates\` an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

The test cases are generated such that the number of unique combinations that sum up to \`target\` is less than 150 combinations for the given input.`,
  examples: [
    {
      "input": "candidates = [2,3,6,7], target = 7",
      "output": "[[2,2,3],[7]]",
      "explanation": "2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.\n7 is a candidate, and 7 = 7.\nThese are the only two combinations."
    },
    {
      "input": "candidates = [2,3,5], target = 8",
      "output": "[[2,2,2,2],[2,3,3],[3,5]]"
    },
    {
      "input": "candidates = [2], target = 1",
      "output": "[]"
    }
  ],
  constraints: [
    "1 <= candidates.length <= 30",
    "2 <= candidates[i] <= 40",
    "All elements of candidates are distinct.",
    "1 <= target <= 40"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
    void backtrack(vector<int>& candidates, int target, int start,
                   vector<int>& curr, vector<vector<int>>& res) {
        // Write your code here
    }
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> cands = {2,3,6,7};
    auto res = sol.combinationSum(cands, 7);
    for (auto& v : res) {
        for (int x : v) cout << x << " ";
        cout << endl;
    }
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Generate all possible subsets, combinations, or permutations without any pruning.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;

class Solution {
    void backtrack(vector<int>& candidates, int target, int start,
                   vector<int>& curr, vector<vector<int>>& res) {
        // Write your code here
    }
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> cands = {2,3,6,7};
    auto res = sol.combinationSum(cands, 7);
    for (auto& v : res) {
        for (int x : v) cout << x << " ";
        cout << endl;
    }
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Recursively explore states, skipping paths that clearly violate constraints.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;

class Solution {
    void backtrack(vector<int>& candidates, int target, int start,
                   vector<int>& curr, vector<vector<int>>& res) {
        // Write your code here
    }
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> cands = {2,3,6,7};
    auto res = sol.combinationSum(cands, 7);
    for (auto& v : res) {
        for (int x : v) cout << x << " ";
        cout << endl;
    }
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `DFS backtracking using bitwise/integer state representation and highly efficient pruning to minimize exploration.`,
        code: `#include <bits/stdc++.h>
using namespace std;

class Solution {
    void backtrack(vector<int>& candidates, int target, int start,
                   vector<int>& curr, vector<vector<int>>& res) {
        if (target == 0) { res.push_back(curr); return; }
        for (int i = start; i < (int)candidates.size(); i++) {
            if (candidates[i] > target) break;
            curr.push_back(candidates[i]);
            backtrack(candidates, target - candidates[i], i, curr, res);
            curr.pop_back();
        }
    }
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        sort(candidates.begin(), candidates.end());
        vector<vector<int>> res;
        vector<int> curr;
        backtrack(candidates, target, 0, curr, res);
        return res;
    }
};

int main() {
    Solution sol;
    vector<int> cands = {2,3,6,7};
    auto res = sol.combinationSum(cands, 7);
    for (auto& v : res) {
        for (int x : v) cout << x << " ";
        cout << endl;
    }
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def backtrack(self, candidates: List[int], target: int, start: int, curr: List[int], res: List[List[int]]) -> None:
        # Write your code here
        pass
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        # Write your code here
        return []
if __name__ == "__main__":
    sol = Solution()
    cands = [2, 3, 6, 7]
    res = sol.combinationSum(cands, 7)
    for v in res:
        for x in v:
            print(x, end=" ")
        print()`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Generate all possible subsets, combinations, or permutations without any pruning.`,
        code: `# Brute Force Approach
# TODO: Implement brute force
from typing import List

class Solution:
    def backtrack(self, candidates: List[int], target: int, start: int, curr: List[int], res: List[List[int]]) -> None:
        # Write your code here
        pass
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        # Write your code here
        return []
if __name__ == "__main__":
    sol = Solution()
    cands = [2, 3, 6, 7]
    res = sol.combinationSum(cands, 7)
    for v in res:
        for x in v:
            print(x, end=" ")
        print()`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Recursively explore states, skipping paths that clearly violate constraints.`,
        code: `# Better Solution
# TODO: Implement optimized approach
from typing import List

class Solution:
    def backtrack(self, candidates: List[int], target: int, start: int, curr: List[int], res: List[List[int]]) -> None:
        # Write your code here
        pass
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        # Write your code here
        return []
if __name__ == "__main__":
    sol = Solution()
    cands = [2, 3, 6, 7]
    res = sol.combinationSum(cands, 7)
    for v in res:
        for x in v:
            print(x, end=" ")
        print()`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `DFS backtracking using bitwise/integer state representation and highly efficient pruning to minimize exploration.`,
        code: `from typing import List

class Solution:
    def backtrack(self, candidates: List[int], target: int, start: int, curr: List[int], res: List[List[int]]) -> None:
        if target == 0:
            res.append(curr[:])
            return
        for i in range(start, len(candidates)):
            if candidates[i] > target:
                break
            curr.append(candidates[i])
            self.backtrack(candidates, target - candidates[i], i, curr, res)
            curr.pop()

    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        candidates.sort()
        res = []
        curr = []
        self.backtrack(candidates, target, 0, curr, res)
        return res

if __name__ == "__main__":
    sol = Solution()
    cands = [2, 3, 6, 7]
    res = sol.combinationSum(cands, 7)
    for v in res:
        for x in v:
            print(x, end=" ")
        print()`
      }
    }
  }
};

export default problem;
