import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "subsets",
  title: "Subsets",
  difficulty: "Medium",
  category: "Backtracking",
  patterns: ["Backtracking","Recursion"],
  url: "https://leetcode.com/problems/subsets/",
  description: `Given an integer array \`nums\` of unique elements, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.`,
  examples: [
    {
      "input": "nums = [1,2,3]",
      "output": "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]"
    },
    {
      "input": "nums = [0]",
      "output": "[[],[0]]"
    }
  ],
  constraints: [
    "1 <= nums.length <= 10",
    "-10 <= nums[i] <= 10",
    "All the numbers of nums are unique."
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
    void backtrack(vector<int>& nums, int start, vector<int>& curr, vector<vector<int>>& res) {
        // Write your code here
    }
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums = {1,2,3};
    auto res = sol.subsets(nums);
    for (auto& s : res) {
        cout << "[";
        for (int i = 0; i < (int)s.size(); i++) { cout << s[i]; if (i+1<(int)s.size()) cout << ","; }
        cout << "] ";
    }
    cout << endl;
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
    void backtrack(vector<int>& nums, int start, vector<int>& curr, vector<vector<int>>& res) {
        // Write your code here
    }
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums = {1,2,3};
    auto res = sol.subsets(nums);
    for (auto& s : res) {
        cout << "[";
        for (int i = 0; i < (int)s.size(); i++) { cout << s[i]; if (i+1<(int)s.size()) cout << ","; }
        cout << "] ";
    }
    cout << endl;
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
    void backtrack(vector<int>& nums, int start, vector<int>& curr, vector<vector<int>>& res) {
        // Write your code here
    }
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums = {1,2,3};
    auto res = sol.subsets(nums);
    for (auto& s : res) {
        cout << "[";
        for (int i = 0; i < (int)s.size(); i++) { cout << s[i]; if (i+1<(int)s.size()) cout << ","; }
        cout << "] ";
    }
    cout << endl;
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
    void backtrack(vector<int>& nums, int start, vector<int>& curr, vector<vector<int>>& res) {
        res.push_back(curr);
        for (int i = start; i < (int)nums.size(); i++) {
            curr.push_back(nums[i]);
            backtrack(nums, i + 1, curr, res);
            curr.pop_back();
        }
    }
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<vector<int>> res;
        vector<int> curr;
        backtrack(nums, 0, curr, res);
        return res;
    }
};

int main() {
    Solution sol;
    vector<int> nums = {1,2,3};
    auto res = sol.subsets(nums);
    for (auto& s : res) {
        cout << "[";
        for (int i = 0; i < (int)s.size(); i++) { cout << s[i]; if (i+1<(int)s.size()) cout << ","; }
        cout << "] ";
    }
    cout << endl;
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def backtrack(self, nums: List[int], start: int, curr: List[int], res: List[List[int]]) -> None:
        # Write your code here
        pass
    def subsets(self, nums: List[int]) -> List[List[int]]:
        # Write your code here
        return []
if __name__ == "__main__":
    sol = Solution()
    nums = [1, 2, 3]
    res = sol.subsets(nums)
    print('[' + ', '.join(map(str, res)).replace('], [', '], [').replace('[', '').replace(']', '') + ']')`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Generate all possible subsets, combinations, or permutations without any pruning.`,
        code: `# Brute Force Approach
# TODO: Implement brute force
from typing import List

class Solution:
    def backtrack(self, nums: List[int], start: int, curr: List[int], res: List[List[int]]) -> None:
        # Write your code here
        pass
    def subsets(self, nums: List[int]) -> List[List[int]]:
        # Write your code here
        return []
if __name__ == "__main__":
    sol = Solution()
    nums = [1, 2, 3]
    res = sol.subsets(nums)
    print('[' + ', '.join(map(str, res)).replace('], [', '], [').replace('[', '').replace(']', '') + ']')`
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
    def backtrack(self, nums: List[int], start: int, curr: List[int], res: List[List[int]]) -> None:
        # Write your code here
        pass
    def subsets(self, nums: List[int]) -> List[List[int]]:
        # Write your code here
        return []
if __name__ == "__main__":
    sol = Solution()
    nums = [1, 2, 3]
    res = sol.subsets(nums)
    print('[' + ', '.join(map(str, res)).replace('], [', '], [').replace('[', '').replace(']', '') + ']')`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `DFS backtracking using bitwise/integer state representation and highly efficient pruning to minimize exploration.`,
        code: `from typing import List

class Solution:
    def backtrack(self, nums: List[int], start: int, curr: List[int], res: List[List[int]]) -> None:
        res.append(curr[:])
        for i in range(start, len(nums)):
            curr.append(nums[i])
            self.backtrack(nums, i + 1, curr, res)
            curr.pop()

    def subsets(self, nums: List[int]) -> List[List[int]]:
        res = []
        curr = []
        self.backtrack(nums, 0, curr, res)
        return res

if __name__ == "__main__":
    sol = Solution()
    nums = [1, 2, 3]
    res = sol.subsets(nums)
    print('[' + ', '.join(map(str, res)).replace('], [', '], [').replace('[', '').replace(']', '') + ']')`
      }
    }
  }
};

export default problem;
