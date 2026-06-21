import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "partition-equal-subset-sum",
  title: "Partition Equal Subset Sum",
  difficulty: "Medium",
  category: "Dynamic Programming",
  patterns: ["DP"],
  url: "https://leetcode.com/problems/partition-equal-subset-sum/",
  description: "Given an integer array `nums`, return `true` if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or `false` otherwise.",
  examples: [
  {
    "input": "nums = [1,5,11,5]",
    "output": "true"
  },
  {
    "input": "nums = [1,2,3,5]",
    "output": "false"
  }
],
  constraints: [
  "1 <= nums.length <= 200",
  "1 <= nums[i] <= 100"
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    bool canPartition(vector<int>& nums){
        // Write your code here
        return false;
    }
};
int main(){
    Solution sol;
    vector<int> a={1,5,11,5};
    cout<<boolalpha<<sol.canPartition(a)<<endl; // true
    return 0;
}`,
      solutionCode: `#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    bool canPartition(vector<int>& nums){
        int sum=accumulate(nums.begin(),nums.end(),0);
        if(sum%2) return false;
        int target=sum/2;
        vector<bool> dp(target+1,false); dp[0]=true;
        for(int n:nums)
            for(int j=target;j>=n;j--)
                dp[j]=dp[j]||dp[j-n];
        return dp[target];
    }
};
int main(){
    Solution sol;
    vector<int> a={1,5,11,5};
    cout<<boolalpha<<sol.canPartition(a)<<endl; // true
    return 0;
}`
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def canPartition(self, nums: List[int]) -> bool:
        # Write your code here
        return False
if __name__ == '__main__':
    sol = Solution()
    a = [1, 5, 11, 5]
    print(sol.canPartition(a))  # True`,
      solutionCode: `from typing import List

class Solution:
    def canPartition(self, nums: List[int]) -> bool:
        total_sum = sum(nums)
        if total_sum % 2:
            return False
        target = total_sum // 2
        dp = [False] * (target + 1)
        dp[0] = True
        for num in nums:
            for j in range(target, num - 1, -1):
                dp[j] = dp[j] or dp[j - num]
        return dp[target]

if __name__ == '__main__':
    sol = Solution()
    a = [1, 5, 11, 5]
    print(sol.canPartition(a))  # True`
    }
  }
};

export default problem;
