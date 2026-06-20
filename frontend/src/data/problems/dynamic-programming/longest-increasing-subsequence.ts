import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "longest-increasing-subsequence",
  title: "Longest Increasing Subsequence",
  difficulty: "Medium",
  category: "Dynamic Programming",
  url: "https://leetcode.com/problems/longest-increasing-subsequence/",
  description: "Given an integer array `nums`, return the length of the longest strictly increasing subsequence.",
  examples: [
  {
    "input": "nums = [10,9,2,5,3,7,101,18]",
    "output": "4",
    "explanation": "The longest increasing subsequence is [2,3,7,101], therefore the length is 4."
  },
  {
    "input": "nums = [0,1,0,3,2,3]",
    "output": "4"
  },
  {
    "input": "nums = [7,7,7,7,7,7,7]",
    "output": "1"
  }
],
  constraints: [
  "1 <= nums.length <= 2500",
  "-10^4 <= nums[i] <= 10^4"
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        vector<int> dp; // patience sorting (tails array)
        for (int n : nums) {
            auto it = lower_bound(dp.begin(), dp.end(), n);
            if (it == dp.end()) dp.push_back(n);
            else *it = n;
        }
        return dp.size();
    }
};

int main() {
    Solution sol;
    vector<int> nums = {10,9,2,5,3,7,101,18};
    cout << sol.lengthOfLIS(nums) << endl; // 4  (2,3,7,101)
    return 0;
}`
    },
    python: {
      starterCode: `from typing import List
from bisect import bisect_left

class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        dp = []  # patience sorting (tails array)
        for n in nums:
            it = bisect_left(dp, n)
            if it == len(dp): dp.append(n)
            else: dp[it] = n
        return len(dp)

if __name__ == '__main__':
    sol = Solution()
    nums = [10,9,2,5,3,7,101,18]
    print(sol.lengthOfLIS(nums))  # 4  (2,3,7,101)`
    },
    java: {
      starterCode: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        Solution sol = new Solution();
        List<Integer> nums = Arrays.asList(10, 9, 2, 5, 3, 7, 101, 18);
        System.out.println(sol.lengthOfLIS(nums));
    }
}

class Solution {
    public int lengthOfLIS(List<Integer> nums) {
        List<Integer> dp = new ArrayList<>();
        for (int n : nums) {
            int index = Collections.binarySearch(dp, n);
            if (index >= 0) {
                dp.set(index, n);
            } else {
                int insertionPoint = -index - 1;
                if (insertionPoint == dp.size()) {
                    dp.add(n);
                } else {
                    dp.set(insertionPoint, n);
                }
            }
        }
        return dp.size();
    }
}`
    }
  }
};

export default problem;
