import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "squares-of-a-sorted-array",
  title: "Squares of a Sorted Array",
  difficulty: "Easy",
  category: "Two Pointers",
  patterns: ["Two Pointer"],
  url: "https://leetcode.com/problems/squares-of-a-sorted-array/",
  description: `Given an integer array \`nums\` sorted in **non-decreasing** order, return *an array of **the squares of each number** sorted in non-decreasing order*.`,
  examples: [
    {
      "input": "nums = [-4,-1,0,3,10]",
      "output": "[0,1,9,16,100]",
      "explanation": "After squaring, the array becomes [16,1,0,9,100]. After sorting, it becomes [0,1,9,16,100]."
    },
    {
      "input": "nums = [-7,-3,2,3,11]",
      "output": "[4,9,9,49,121]"
    }
  ],
  constraints: [
    "1 <= nums.length <= 10^4",
    "-10^4 <= nums[i] <= 10^4",
    "nums is sorted in non-decreasing order."
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> sortedSquares(vector<int>& nums) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums={-4,-1,0,3,10};
    for (int v : sol.sortedSquares(nums)) cout<<v<<" "; // 0 1 9 16 100
    cout<<endl;
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Check all pairs, triplets, or combinations using nested loops.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> sortedSquares(vector<int>& nums) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums={-4,-1,0,3,10};
    for (int v : sol.sortedSquares(nums)) cout<<v<<" "; // 0 1 9 16 100
    cout<<endl;
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Sort the elements first, then scan or use two pointers with additional logic/checks.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> sortedSquares(vector<int>& nums) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums={-4,-1,0,3,10};
    for (int v : sol.sortedSquares(nums)) cout<<v<<" "; // 0 1 9 16 100
    cout<<endl;
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Position pointers at key boundaries or moving speeds to narrow search space in a single linear pass.`,
        code: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> sortedSquares(vector<int>& nums) {
        int n=nums.size(), l=0, r=n-1;
        vector<int> res(n);
        for (int i=n-1; i>=0; i--) {
            if (abs(nums[l])>=abs(nums[r])) { res[i]=nums[l]*nums[l]; l++; }
            else                             { res[i]=nums[r]*nums[r]; r--; }
        }
        return res;
    }
};

int main() {
    Solution sol;
    vector<int> nums={-4,-1,0,3,10};
    for (int v : sol.sortedSquares(nums)) cout<<v<<" "; // 0 1 9 16 100
    cout<<endl;
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def sortedSquares(self, nums: List[int]) -> List[int]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    nums = [-4, -1, 0, 3, 10]
    print(' '.join(map(str, sol.sortedSquares(nums))))  # 0 1 9 16 100`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Check all pairs, triplets, or combinations using nested loops.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from typing import List

class Solution:
    def sortedSquares(self, nums: List[int]) -> List[int]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    nums = [-4, -1, 0, 3, 10]
    print(' '.join(map(str, sol.sortedSquares(nums))))  # 0 1 9 16 100`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Sort the elements first, then scan or use two pointers with additional logic/checks.`,
        code: `// Better Solution
// TODO: Implement optimized approach
from typing import List

class Solution:
    def sortedSquares(self, nums: List[int]) -> List[int]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    nums = [-4, -1, 0, 3, 10]
    print(' '.join(map(str, sol.sortedSquares(nums))))  # 0 1 9 16 100`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Position pointers at key boundaries or moving speeds to narrow search space in a single linear pass.`,
        code: `from typing import List

class Solution:
    def sortedSquares(self, nums: List[int]) -> List[int]:
        n = len(nums)
        l, r = 0, n - 1
        res = [0] * n
        for i in range(n - 1, -1, -1):
            if abs(nums[l]) >= abs(nums[r]):
                res[i] = nums[l] * nums[l]
                l += 1
            else:
                res[i] = nums[r] * nums[r]
                r -= 1
        return res

if __name__ == '__main__':
    sol = Solution()
    nums = [-4, -1, 0, 3, 10]
    print(' '.join(map(str, sol.sortedSquares(nums))))  # 0 1 9 16 100`
      }
    }
  }
};

export default problem;
