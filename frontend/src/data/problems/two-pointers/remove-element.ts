import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "remove-element",
  title: "Remove Element",
  difficulty: "Easy",
  category: "Two Pointers",
  patterns: ["Two Pointer"],
  url: "https://leetcode.com/problems/remove-element/",
  description: `Given an integer array \`nums\` and an integer \`val\`, remove all occurrences of \`val\` in \`nums\` [**in-place**](https://en.wikipedia.org/wiki/In-place_algorithm). The order of the elements may be changed. Then return *the number of elements in \`nums\` which are not equal to \`val\`*.

Consider the number of elements in \`nums\` which are not equal to \`val\` be \`k\`, to get accepted, you need to do the following things:
1. Change the array \`nums\` such that the first \`k\` elements of \`nums\` contain the elements which are not equal to \`val\`. The remaining elements of \`nums\` are not important as well as the size of \`nums\`.
2. Return \`k\`.`,
  examples: [
    {
      "input": "nums = [3,2,2,3], val = 3",
      "output": "2, nums = [2,2,_,_]",
      "explanation": "Your function should return k = 2, with the first two elements of nums being 2. It does not matter what you leave beyond the returned k (hence they are underscores)."
    },
    {
      "input": "nums = [0,1,2,2,3,0,4,2], val = 2",
      "output": "5, nums = [0,1,4,0,3,_,_,_]",
      "explanation": "Your function should return k = 5, with the first five elements of nums containing 0, 1, 3, 0, and 4. Note that the five elements can be returned in any order. It does not matter what you leave beyond the returned k."
    }
  ],
  constraints: [
    "0 <= nums.length <= 100",
    "0 <= nums[i] <= 50",
    "0 <= val <= 100"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int removeElement(vector<int>& nums, int val) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> nums={3,2,2,3};
    int k=sol.removeElement(nums,3);
    cout<<k<<endl; // 2
    for (int i=0;i<k;i++) cout<<nums[i]<<" "; // 2 2
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
    int removeElement(vector<int>& nums, int val) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> nums={3,2,2,3};
    int k=sol.removeElement(nums,3);
    cout<<k<<endl; // 2
    for (int i=0;i<k;i++) cout<<nums[i]<<" "; // 2 2
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
    int removeElement(vector<int>& nums, int val) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> nums={3,2,2,3};
    int k=sol.removeElement(nums,3);
    cout<<k<<endl; // 2
    for (int i=0;i<k;i++) cout<<nums[i]<<" "; // 2 2
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
    int removeElement(vector<int>& nums, int val) {
        int k=0;
        for (int n : nums) if (n!=val) nums[k++]=n;
        return k;
    }
};

int main() {
    Solution sol;
    vector<int> nums={3,2,2,3};
    int k=sol.removeElement(nums,3);
    cout<<k<<endl; // 2
    for (int i=0;i<k;i++) cout<<nums[i]<<" "; // 2 2
    cout<<endl;
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def removeElement(self, nums: List[int], val: int) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    nums = [3, 2, 2, 3]
    k = sol.removeElement(nums, 3)
    print(k)  # 2
    print(nums[:k])  # [2, 2]`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Check all pairs, triplets, or combinations using nested loops.`,
        code: `# Brute Force Approach
# TODO: Implement brute force
from typing import List

class Solution:
    def removeElement(self, nums: List[int], val: int) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    nums = [3, 2, 2, 3]
    k = sol.removeElement(nums, 3)
    print(k)  # 2
    print(nums[:k])  # [2, 2]`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Sort the elements first, then scan or use two pointers with additional logic/checks.`,
        code: `# Better Solution
# TODO: Implement optimized approach
from typing import List

class Solution:
    def removeElement(self, nums: List[int], val: int) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    nums = [3, 2, 2, 3]
    k = sol.removeElement(nums, 3)
    print(k)  # 2
    print(nums[:k])  # [2, 2]`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Position pointers at key boundaries or moving speeds to narrow search space in a single linear pass.`,
        code: `from typing import List

class Solution:
    def removeElement(self, nums: List[int], val: int) -> int:
        k = 0
        for n in nums:
            if n != val:
                nums[k] = n
                k += 1
        return k

if __name__ == '__main__':
    sol = Solution()
    nums = [3, 2, 2, 3]
    k = sol.removeElement(nums, 3)
    print(k)  # 2
    print(nums[:k])  # [2, 2]`
      }
    }
  }
};

export default problem;
