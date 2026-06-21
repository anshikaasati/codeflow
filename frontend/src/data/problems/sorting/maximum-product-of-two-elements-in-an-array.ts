import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "maximum-product-of-two-elements-in-an-array",
  title: "Maximum Product of Two Elements in an Array",
  difficulty: "Easy",
  category: "Sorting",
  patterns: ["Sorting"],
  url: "https://leetcode.com/problems/maximum-product-of-two-elements-in-an-array/",
  description: `Given the array of integers \`nums\`, you will choose two different indices \`i\` and \`j\` of that array. Return the maximum value of \`(nums[i]-1)*(nums[j]-1)\`.`,
  examples: [
    {
      "input": "nums = [3,4,5,2]",
      "output": "12",
      "explanation": "Choosing indices 1 and 2, we get (4-1)*(5-1) = 12."
    }
  ],
  constraints: [
    "2 <= nums.length <= 500",
    "1 <= nums[i] <= 1000"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int maxProduct(vector<int>& nums) {
        // Write your code here
        return 0;
    * (m2 - 1);
    }
};

int main() {
    Solution sol;
    vector<int> nums = {3, 4, 5, 2};
    cout << sol.maxProduct(nums) << endl; // 12
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
    int maxProduct(vector<int>& nums) {
        // Write your code here
        return 0;
    * (m2 - 1);
    }
};

int main() {
    Solution sol;
    vector<int> nums = {3, 4, 5, 2};
    cout << sol.maxProduct(nums) << endl; // 12
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
    int maxProduct(vector<int>& nums) {
        // Write your code here
        return 0;
    * (m2 - 1);
    }
};

int main() {
    Solution sol;
    vector<int> nums = {3, 4, 5, 2};
    cout << sol.maxProduct(nums) << endl; // 12
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
    int maxProduct(vector<int>& nums) {
        int m1 = 0, m2 = 0;
        for (int x : nums) {
            if (x > m1) {
                m2 = m1;
                m1 = x;
            } else if (x > m2) {
                m2 = x;
            }
        }
        return (m1 - 1) * (m2 - 1);
    }
};

int main() {
    Solution sol;
    vector<int> nums = {3, 4, 5, 2};
    cout << sol.maxProduct(nums) << endl; // 12
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    nums = [3, 4, 5, 2]
    print("Input: nums =", nums)
    print("Output: maxProduct(nums) =", sol.maxProduct(nums))`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Bubble sort or selection sort comparing all pairs repeatedly.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from typing import List

class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    nums = [3, 4, 5, 2]
    print("Input: nums =", nums)
    print("Output: maxProduct(nums) =", sol.maxProduct(nums))`
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
    def maxProduct(self, nums: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    nums = [3, 4, 5, 2]
    print("Input: nums =", nums)
    print("Output: maxProduct(nums) =", sol.maxProduct(nums))`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Linear time sorting (like bucket sort or counting sort) taking advantage of constraints.`,
        code: `from typing import List

class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        m1 = 0
        m2 = 0
        for x in nums:
            if x > m1:
                m2 = m1
                m1 = x
            elif x > m2:
                m2 = x
        return (m1 - 1) * (m2 - 1)


if __name__ == '__main__':
    sol = Solution()
    nums = [3, 4, 5, 2]
    print("Input: nums =", nums)
    print("Output: maxProduct(nums) =", sol.maxProduct(nums))`
      }
    }
  }
};

export default problem;
