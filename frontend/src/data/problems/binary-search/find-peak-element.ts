import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "find-peak-element",
  title: "Find Peak Element",
  difficulty: "Medium",
  category: "Binary Search",
  patterns: ["Binary Search","Two Pointer"],
  url: "https://leetcode.com/problems/find-peak-element/",
  description: `A peak element is an element that is strictly greater than its neighbors.

Given a **0-indexed** integer array \`nums\`, find a peak element, and return its index. If the array contains multiple peaks, return the index to **any of the peaks**.

You may imagine that \`nums[-1] = nums[n] = -∞\`. In other words, an element is always considered to be strictly greater than a neighbor that is outside the array.

You must write an algorithm that runs in \`O(log n)\` time.`,
  examples: [
    {
      "input": "nums = [1,2,3,1]",
      "output": "2",
      "explanation": "3 is a peak element and your function should return the index number 2."
    },
    {
      "input": "nums = [1,2,1,3,5,6,4]",
      "output": "5",
      "explanation": "Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6."
    }
  ],
  constraints: [
    "1 <= nums.length <= 1000",
    "-2^31 <= nums[i] <= 2^31 - 1",
    "nums[i] != nums[i + 1] for all valid i."
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int findPeakElement(vector<int>& nums) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> a={1,2,3,1};
    vector<int> b={1,2,1,3,5,6,4};
    cout<<sol.findPeakElement(a)<<endl; // 2
    cout<<sol.findPeakElement(b)<<endl; // 5
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
    int findPeakElement(vector<int>& nums) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> a={1,2,3,1};
    vector<int> b={1,2,1,3,5,6,4};
    cout<<sol.findPeakElement(a)<<endl; // 2
    cout<<sol.findPeakElement(b)<<endl; // 5
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
    int findPeakElement(vector<int>& nums) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> a={1,2,3,1};
    vector<int> b={1,2,1,3,5,6,4};
    cout<<sol.findPeakElement(a)<<endl; // 2
    cout<<sol.findPeakElement(b)<<endl; // 5
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
    int findPeakElement(vector<int>& nums) {
        int l=0, r=nums.size()-1;
        while (l<r) {
            int mid=l+(r-l)/2;
            if (nums[mid]<nums[mid+1]) l=mid+1;
            else r=mid;
        }
        return l;
    }
};

int main() {
    Solution sol;
    vector<int> a={1,2,3,1};
    vector<int> b={1,2,1,3,5,6,4};
    cout<<sol.findPeakElement(a)<<endl; // 2
    cout<<sol.findPeakElement(b)<<endl; // 5
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def findPeakElement(self, nums: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == "__main__":
    sol = Solution()
    a = [1, 2, 3, 1]
    b = [1, 2, 1, 3, 5, 6, 4]
    print(sol.findPeakElement(a))  # 2
    print(sol.findPeakElement(b))  # 5`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Iterate sequentially through the search space to find the target element or transition point.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from typing import List

class Solution:
    def findPeakElement(self, nums: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == "__main__":
    sol = Solution()
    a = [1, 2, 3, 1]
    b = [1, 2, 1, 3, 5, 6, 4]
    print(sol.findPeakElement(a))  # 2
    print(sol.findPeakElement(b))  # 5`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Linear search with early exit or simple range narrowing.`,
        code: `// Better Solution
// TODO: Implement optimized approach
from typing import List

class Solution:
    def findPeakElement(self, nums: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == "__main__":
    sol = Solution()
    a = [1, 2, 3, 1]
    b = [1, 2, 1, 3, 5, 6, 4]
    print(sol.findPeakElement(a))  # 2
    print(sol.findPeakElement(b))  # 5`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Binary search dividing search space in half each step, achieving logarithmic runtime.`,
        code: `from typing import List

class Solution:
    def findPeakElement(self, nums: List[int]) -> int:
        l, r = 0, len(nums) - 1
        while l < r:
            mid = l + (r - l) // 2
            if nums[mid] < nums[mid + 1]:
                l = mid + 1
            else:
                r = mid
        return l

if __name__ == "__main__":
    sol = Solution()
    a = [1, 2, 3, 1]
    b = [1, 2, 1, 3, 5, 6, 4]
    print(sol.findPeakElement(a))  # 2
    print(sol.findPeakElement(b))  # 5`
      }
    }
  }
};

export default problem;
