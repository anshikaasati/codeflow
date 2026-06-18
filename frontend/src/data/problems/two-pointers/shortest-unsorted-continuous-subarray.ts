import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "shortest-unsorted-continuous-subarray",
  title: "Shortest Unsorted Continuous Subarray",
  difficulty: "Medium",
  category: "Two Pointers",
  url: "https://leetcode.com/problems/shortest-unsorted-continuous-subarray/",
  description: "Given an integer array `nums`, you need to find one **continuous subarray** that if you only sort this subarray in ascending order, then the whole array will be sorted in ascending order.\\n\\nReturn the shortest such subarray and output its length.",
  examples: [
  {
    "input": "nums = [2,6,4,8,10,9,15]",
    "output": "5",
    "explanation": "You need to sort [6, 4, 8, 10, 9] in ascending order to make the whole array sorted in ascending order."
  },
  {
    "input": "nums = [1,2,3,4]",
    "output": "0"
  },
  {
    "input": "nums = [1]",
    "output": "0"
  }
],
  constraints: [
  "1 <= nums.length <= 10^4",
  "-10^5 <= nums[i] <= 10^5"
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int findUnsortedSubarray(vector<int>& nums) {
        int n = nums.size();
        int end = -1, start = 0;
        int max_val = nums[0], min_val = nums[n-1];
        
        for (int i = 1; i < n; i++) {
            if (nums[i] < max_val) end = i;
            else max_val = nums[i];
            
            if (nums[n-1-i] > min_val) start = n-1-i;
            else min_val = nums[n-1-i];
        }
        
        return end - start + 1 < 0 ? 0 : end - start + 1;
    }
};

int main() {
    Solution sol;
    vector<int> n = {2,6,4,8,10,9,15};
    cout << sol.findUnsortedSubarray(n) << endl; // 5
    return 0;
}`
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def findUnsortedSubarray(self, nums: List[int]) -> int:
        n = len(nums)
        end = -1
        start = 0
        max_val = nums[0]
        min_val = nums[n-1]
        
        for i in range(1, n):
            if nums[i] < max_val:
                end = i
            else:
                max_val = nums[i]
            
            if nums[n-1-i] > min_val:
                start = n-1-i
            else:
                min_val = nums[n-1-i]
        
        return max(end - start + 1, 0)

if __name__ == '__main__':
    sol = Solution()
    n = [2,6,4,8,10,9,15]
    print(sol.findUnsortedSubarray(n))  # Output: 5`
    }
  }
};

export default problem;
