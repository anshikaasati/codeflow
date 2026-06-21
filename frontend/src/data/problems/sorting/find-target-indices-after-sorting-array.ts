import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "find-target-indices-after-sorting-array",
  title: "Find Target Indices After Sorting Array",
  difficulty: "Easy",
  category: "Sorting",
  patterns: ["Sorting"],
  url: "https://leetcode.com/problems/find-target-indices-after-sorting-array/",
  description: `You are given a 0-indexed integer array \`nums\` and a target element \`target\`. Find all target indices in \`nums\` after sorting \`nums\` in non-decreasing order.`,
  examples: [
    {
      "input": "nums = [1,2,5,2,3], target = 2",
      "output": "[1,2]",
      "explanation": "After sorting, nums is [1,2,2,3,5]. The indices where nums[i] == 2 are 1 and 2."
    }
  ],
  constraints: [
    "1 <= nums.length <= 100",
    "1 <= nums[i], target <= 100"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> targetIndices(vector<int>& nums, int target) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums = {1, 2, 5, 2, 3};
    vector<int> res = sol.targetIndices(nums, 2);
    for (int x : res) cout << x << " ";
    cout << endl;
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Bubble sort or selection sort comparing all pairs repeatedly.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> targetIndices(vector<int>& nums, int target) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums = {1, 2, 5, 2, 3};
    vector<int> res = sol.targetIndices(nums, 2);
    for (int x : res) cout << x << " ";
    cout << endl;
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Divide-and-conquer sorting (Merge Sort or Quick Sort) in O(N log N) time.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> targetIndices(vector<int>& nums, int target) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums = {1, 2, 5, 2, 3};
    vector<int> res = sol.targetIndices(nums, 2);
    for (int x : res) cout << x << " ";
    cout << endl;
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Linear time sorting (like bucket sort or counting sort) taking advantage of constraints.`,
        code: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> targetIndices(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());
        vector<int> res;
        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] == target) {
                res.push_back(i);
            }
        }
        return res;
    }
};

int main() {
    Solution sol;
    vector<int> nums = {1, 2, 5, 2, 3};
    vector<int> res = sol.targetIndices(nums, 2);
    for (int x : res) cout << x << " ";
    cout << endl;
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def targetIndices(self, nums: List[int], target: int) -> List[int]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    nums = [1, 2, 5, 2, 3]
    res = sol.targetIndices(nums, 2)
    print(' '.join(map(str, res)))`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Bubble sort or selection sort comparing all pairs repeatedly.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from typing import List

class Solution:
    def targetIndices(self, nums: List[int], target: int) -> List[int]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    nums = [1, 2, 5, 2, 3]
    res = sol.targetIndices(nums, 2)
    print(' '.join(map(str, res)))`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Divide-and-conquer sorting (Merge Sort or Quick Sort) in O(N log N) time.`,
        code: `// Better Solution
// TODO: Implement optimized approach
from typing import List

class Solution:
    def targetIndices(self, nums: List[int], target: int) -> List[int]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    nums = [1, 2, 5, 2, 3]
    res = sol.targetIndices(nums, 2)
    print(' '.join(map(str, res)))`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Linear time sorting (like bucket sort or counting sort) taking advantage of constraints.`,
        code: `from typing import List

class Solution:
    def targetIndices(self, nums: List[int], target: int) -> List[int]:
        nums.sort()
        res = []
        for i, num in enumerate(nums):
            if num == target:
                res.append(i)
        return res

if __name__ == '__main__':
    sol = Solution()
    nums = [1, 2, 5, 2, 3]
    res = sol.targetIndices(nums, 2)
    print(' '.join(map(str, res)))`
      }
    }
  }
};

export default problem;
