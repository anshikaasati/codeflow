import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "move-zeroes",
  title: "Move Zeroes",
  difficulty: "Easy",
  category: "Arrays & Hashing",
  patterns: ["Array"],
  url: "https://leetcode.com/problems/move-zeroes/",
  description: "Given an integer array `nums`, move all `0`s to the end of it while maintaining the relative order of the non-zero elements. Note that you must do this in-place without making a copy of the array.",
  examples: [
  {
    "input": "nums = [0,1,0,3,12]",
    "output": "[1,3,12,0,0]"
  },
  {
    "input": "nums = [0]",
    "output": "[0]"
  }
],
  constraints: [
  "1 <= nums.length <= 10^4",
  "-2^31 <= nums[i] <= 2^31 - 1"
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        // Write your code here
    }
};
int main() {
    Solution sol;
    vector<int> nums = {0,1,0,3,12};
    sol.moveZeroes(nums);
    for (int n : nums) cout << n << " "; // 1 3 12 0 0
    cout << endl;
    return 0;
}`,
      solutionCode: `#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int pos = 0;
        for (int n : nums) if (n != 0) nums[pos++] = n;
        while (pos < (int)nums.size()) nums[pos++] = 0;
    }
};
int main() {
    Solution sol;
    vector<int> nums = {0,1,0,3,12};
    sol.moveZeroes(nums);
    for (int n : nums) cout << n << " "; // 1 3 12 0 0
    cout << endl;
    return 0;
}`
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        # Write your code here
        pass
if __name__ == "__main__":
    sol = Solution()
    nums = [0,1,0,3,12]
    sol.moveZeroes(nums)
    print(*nums)  # 1 3 12 0 0`,
      solutionCode: `from typing import List

class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        pos = 0
        for n in nums:
            if n != 0:
                nums[pos] = n
                pos += 1
        while pos < len(nums):
            nums[pos] = 0
            pos += 1

if __name__ == "__main__":
    sol = Solution()
    nums = [0,1,0,3,12]
    sol.moveZeroes(nums)
    print(*nums)  # 1 3 12 0 0`
    }
  }
};

export default problem;
