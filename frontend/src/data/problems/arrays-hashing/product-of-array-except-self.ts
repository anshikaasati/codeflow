import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "product-of-array-except-self",
  title: "Product of Array Except Self",
  difficulty: "Medium",
  category: "Arrays & Hashing",
  patterns: ["Array"],
  url: "https://leetcode.com/problems/product-of-array-except-self/",
  description: `Given an integer array \`nums\`, return an array \`answer\` such that \`answer[i]\` is equal to the product of all the elements of \`nums\` except \`nums[i]\`.

The product of any prefix or suffix of \`nums\` is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in \`O(n)\` time and without using the division operation.`,
  examples: [
    {
      "input": "nums = [1,2,3,4]",
      "output": "[24,12,8,6]"
    },
    {
      "input": "nums = [-1,1,0,-3,3]",
      "output": "[0,0,9,0,0]"
    }
  ],
  constraints: [
    "2 <= nums.length <= 10^5",
    "-30 <= nums[i] <= 30",
    "The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer."
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums = {1, 2, 3, 4};
    auto res = sol.productExceptSelf(nums);
    for (int n : res) cout << n << " "; // 24 12 8 6
    cout << endl;
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
    vector<int> productExceptSelf(vector<int>& nums) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums = {1, 2, 3, 4};
    auto res = sol.productExceptSelf(nums);
    for (int n : res) cout << n << " "; // 24 12 8 6
    cout << endl;
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
    vector<int> productExceptSelf(vector<int>& nums) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums = {1, 2, 3, 4};
    auto res = sol.productExceptSelf(nums);
    for (int n : res) cout << n << " "; // 24 12 8 6
    cout << endl;
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
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n, 1);

        // Left prefix products
        int prefix = 1;
        for (int i = 0; i < n; i++) {
            res[i] = prefix;
            prefix *= nums[i];
        }

        // Right suffix products
        int suffix = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= suffix;
            suffix *= nums[i];
        }
        return res;
    }
};

int main() {
    Solution sol;
    vector<int> nums = {1, 2, 3, 4};
    auto res = sol.productExceptSelf(nums);
    for (int n : res) cout << n << " "; // 24 12 8 6
    cout << endl;
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        # Write your code here
        return []
if __name__ == "__main__":
    sol = Solution()
    nums = [1, 2, 3, 4]
    res = sol.productExceptSelf(nums)
    print(*res)  # 24 12 8 6`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Compare all elements or subsegments using nested loops to verify the condition.`,
        code: `# Brute Force Approach
# TODO: Implement brute force
from typing import List

class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        # Write your code here
        return []
if __name__ == "__main__":
    sol = Solution()
    nums = [1, 2, 3, 4]
    res = sol.productExceptSelf(nums)
    print(*res)  # 24 12 8 6`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Sort the array first to group elements, or use a Hash Set/Map to track seen values.`,
        code: `# Better Solution
# TODO: Implement optimized approach
from typing import List

class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        # Write your code here
        return []
if __name__ == "__main__":
    sol = Solution()
    nums = [1, 2, 3, 4]
    res = sol.productExceptSelf(nums)
    print(*res)  # 24 12 8 6`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Use a single pass linear scan with optimized hashing, frequency tables, or in-place marking.`,
        code: `from typing import List

class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        n = len(nums)
        res = [1] * n

        prefix = 1
        for i in range(n):
            res[i] = prefix
            prefix *= nums[i]

        suffix = 1
        for i in range(n - 1, -1, -1):
            res[i] *= suffix
            suffix *= nums[i]
        return res

if __name__ == "__main__":
    sol = Solution()
    nums = [1, 2, 3, 4]
    res = sol.productExceptSelf(nums)
    print(*res)  # 24 12 8 6`
      }
    }
  }
};

export default problem;
