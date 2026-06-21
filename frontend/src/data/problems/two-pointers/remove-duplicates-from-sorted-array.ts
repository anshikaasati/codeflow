import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "remove-duplicates-from-sorted-array",
  title: "Remove Duplicates from Sorted Array",
  difficulty: "Easy",
  category: "Two Pointers",
  patterns: ["Two Pointer"],
  url: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
  description: `Given an integer array \`nums\` sorted in non-decreasing order, remove the duplicates **in-place** such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in \`nums\`.

Consider the number of unique elements of \`nums\` to be \`k\`, to get accepted, you need to do the following things:
1. Modify the array \`nums\` such that the first \`k\` elements of \`nums\` contain the unique elements in the order they were initially in \`nums\`. The remaining elements of \`nums\` are not important as well as the size of \`nums\`.
2. Return \`k\`.`,
  examples: [
    {
      "input": "nums = [1,1,2]",
      "output": "2, nums = [1,2,_]",
      "explanation": "Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively. It does not matter what you leave beyond the returned k (hence they are underscores)."
    },
    {
      "input": "nums = [0,0,1,1,1,2,2,3,3,4]",
      "output": "5, nums = [0,1,2,3,4,_,_,_,_,_]",
      "explanation": "Your function should return k = 5, with the first five elements of nums being 0, 1, 2, 3, and 4 respectively."
    }
  ],
  constraints: [
    "1 <= nums.length <= 3 * 10^4",
    "-100 <= nums[i] <= 100",
    "nums is sorted in non-decreasing order."
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> nums={0,0,1,1,1,2,2,3,3,4};
    int k=sol.removeDuplicates(nums);
    cout<<k<<endl; // 5
    for (int i=0;i<k;i++) cout<<nums[i]<<" "; // 0 1 2 3 4
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
    int removeDuplicates(vector<int>& nums) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> nums={0,0,1,1,1,2,2,3,3,4};
    int k=sol.removeDuplicates(nums);
    cout<<k<<endl; // 5
    for (int i=0;i<k;i++) cout<<nums[i]<<" "; // 0 1 2 3 4
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
    int removeDuplicates(vector<int>& nums) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> nums={0,0,1,1,1,2,2,3,3,4};
    int k=sol.removeDuplicates(nums);
    cout<<k<<endl; // 5
    for (int i=0;i<k;i++) cout<<nums[i]<<" "; // 0 1 2 3 4
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
    int removeDuplicates(vector<int>& nums) {
        if (nums.empty()) return 0;
        int pos=1;
        for (int i=1; i<(int)nums.size(); i++)
            if (nums[i]!=nums[i-1]) nums[pos++]=nums[i];
        return pos;
    }
};

int main() {
    Solution sol;
    vector<int> nums={0,0,1,1,1,2,2,3,3,4};
    int k=sol.removeDuplicates(nums);
    cout<<k<<endl; // 5
    for (int i=0;i<k;i++) cout<<nums[i]<<" "; // 0 1 2 3 4
    cout<<endl;
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
    k = sol.removeDuplicates(nums)
    print(k)  # 5
    print(*nums[:k])  # 0 1 2 3 4`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Check all pairs, triplets, or combinations using nested loops.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from typing import List

class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
    k = sol.removeDuplicates(nums)
    print(k)  # 5
    print(*nums[:k])  # 0 1 2 3 4`
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
    def removeDuplicates(self, nums: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
    k = sol.removeDuplicates(nums)
    print(k)  # 5
    print(*nums[:k])  # 0 1 2 3 4`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Position pointers at key boundaries or moving speeds to narrow search space in a single linear pass.`,
        code: `from typing import List

class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        if not nums:
            return 0
        pos = 1
        for i in range(1, len(nums)):
            if nums[i] != nums[i-1]:
                nums[pos] = nums[i]
                pos += 1
        return pos

if __name__ == '__main__':
    sol = Solution()
    nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
    k = sol.removeDuplicates(nums)
    print(k)  # 5
    print(*nums[:k])  # 0 1 2 3 4`
      }
    }
  }
};

export default problem;
