import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "3sum",
  title: "3Sum",
  difficulty: "Medium",
  category: "Two Pointers",
  patterns: ["Two Pointer"],
  url: "https://leetcode.com/problems/3sum/",
  description: "Given an integer array nums, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.\n\nNotice that the solution set must not contain duplicate triplets.",
  examples: [
  {
    "input": "nums = [-1,0,1,2,-1,-4]",
    "output": "[[-1,-1,2],[-1,0,1]]",
    "explanation": "nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.\nnums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.\nnums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.\nThe distinct triplets are [-1,0,1] and [-1,-1,2]."
  },
  {
    "input": "nums = [0,1,1]",
    "output": "[]"
  }
],
  constraints: [
  "3 <= nums.length <= 3000",
  "-10^5 <= nums[i] <= 10^5"
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums = {-1, 0, 1, 2, -1, -4};
    auto res = sol.threeSum(nums);
    for (auto& t : res)
        cout << "[" << t[0] << "," << t[1] << "," << t[2] << "]" << endl;
    return 0;
}`,
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> res;
        for (int i = 0; i < (int)nums.size() - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int l = i + 1, r = (int)nums.size() - 1;
            while (l < r) {
                int sum = nums[i] + nums[l] + nums[r];
                if (sum == 0) {
                    res.push_back({nums[i], nums[l], nums[r]});
                    while (l < r && nums[l] == nums[l + 1]) l++;
                    while (l < r && nums[r] == nums[r - 1]) r--;
                    l++; r--;
                } else if (sum < 0) l++;
                else r--;
            }
        }
        return res;
    }
};

int main() {
    Solution sol;
    vector<int> nums = {-1, 0, 1, 2, -1, -4};
    auto res = sol.threeSum(nums);
    for (auto& t : res)
        cout << "[" << t[0] << "," << t[1] << "," << t[2] << "]" << endl;
    return 0;
}`
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    nums = [-1, 0, 1, 2, -1, -4]
    res = sol.threeSum(nums)
    for t in res:
        print(f"[{t[0]},{t[1]},{t[2]}]")`,
      solutionCode: `from typing import List

class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        res = []
        for i in range(len(nums) - 2):
            if i > 0 and nums[i] == nums[i - 1]:
                continue
            l, r = i + 1, len(nums) - 1
            while l < r:
                sum_val = nums[i] + nums[l] + nums[r]
                if sum_val == 0:
                    res.append([nums[i], nums[l], nums[r]])
                    while l < r and nums[l] == nums[l + 1]:
                        l += 1
                    while l < r and nums[r] == nums[r - 1]:
                        r -= 1
                    l += 1
                    r -= 1
                elif sum_val < 0:
                    l += 1
                else:
                    r -= 1
        return res

if __name__ == '__main__':
    sol = Solution()
    nums = [-1, 0, 1, 2, -1, -4]
    res = sol.threeSum(nums)
    for t in res:
        print(f"[{t[0]},{t[1]},{t[2]}]")`
    }
  }
};

export default problem;
