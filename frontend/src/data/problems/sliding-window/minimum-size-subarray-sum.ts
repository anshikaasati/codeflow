import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "minimum-size-subarray-sum",
  title: "Minimum Size Subarray Sum",
  difficulty: "Medium",
  category: "Sliding Window",
  url: "https://leetcode.com/problems/minimum-size-subarray-sum/",
  description: "Given an array of positive integers `nums` and a positive integer `target`, return the **minimal length** of a subarray whose sum is greater than or equal to `target`. If there is no such subarray, return `0` instead.",
  examples: [
  {
    "input": "target = 7, nums = [2,3,1,2,4,3]",
    "output": "2",
    "explanation": "The subarray [4,3] has the minimal length under the problem constraint."
  },
  {
    "input": "target = 4, nums = [1,4,4]",
    "output": "1"
  },
  {
    "input": "target = 11, nums = [1,1,1,1,1,1,1,1]",
    "output": "0"
  }
],
  constraints: [
  "1 <= target <= 10^9",
  "1 <= nums.length <= 10^5",
  "1 <= nums[i] <= 10^4"
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        int l=0, sum=0, res=INT_MAX;
        for (int r=0; r<(int)nums.size(); r++) {
            sum+=nums[r];
            while (sum>=target) {
                res=min(res, r-l+1);
                sum-=nums[l++];
            }
        }
        return res==INT_MAX?0:res;
    }
};

int main() {
    Solution sol;
    vector<int> nums={2,3,1,2,4,3};
    cout<<sol.minSubArrayLen(7,nums)<<endl; // 2
    return 0;
}`
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def minSubArrayLen(self, target: int, nums: List[int]) -> int:
        left = 0
        current_sum = 0
        min_length = float('inf')
        for right in range(len(nums)):
            current_sum += nums[right]
            while current_sum >= target:
                min_length = min(min_length, right - left + 1)
                current_sum -= nums[left]
                left += 1
        return 0 if min_length == float('inf') else min_length

if __name__ == '__main__':
    sol = Solution()
    nums = [2, 3, 1, 2, 4, 3]
    print(sol.minSubArrayLen(7, nums))  # Output: 2`
    },
    java: {
      starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] nums = {2, 3, 1, 2, 4, 3};
        System.out.println(sol.minSubArrayLen(7, nums)); // 2
    }
}

class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        int left = 0;
        int currentSum = 0;
        int minLength = Integer.MAX_VALUE;
        for (int right = 0; right < nums.length; right++) {
            currentSum += nums[right];
            while (currentSum >= target) {
                minLength = Math.min(minLength, right - left + 1);
                currentSum -= nums[left];
                left++;
            }
        }
        return minLength == Integer.MAX_VALUE ? 0 : minLength;
    }
}`
    }
  }
};

export default problem;

