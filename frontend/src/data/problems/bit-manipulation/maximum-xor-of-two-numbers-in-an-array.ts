import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "maximum-xor-of-two-numbers-in-an-array",
  title: "Maximum XOR of Two Numbers in an Array",
  difficulty: "Medium",
  category: "Bit Manipulation",
  patterns: ["Bit Manipulation"],
  url: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",
  description: "Given an integer array `nums`, return the maximum result of `nums[i] XOR nums[j]`, where `0 <= i <= j < n`.",
  examples: [
  {
    "input": "nums = [3,10,5,25,2,8]",
    "output": "28",
    "explanation": "The maximum result is 5 XOR 25 = 28."
  },
  {
    "input": "nums = [14,70,53,83,49,91,36,80,92,51,66,70]",
    "output": "127"
  }
],
  constraints: [
  "1 <= nums.length <= 2 * 10^5",
  "0 <= nums[i] <= 2^31 - 1"
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int findMaximumXOR(vector<int>& nums){
        // Write your code here
        return 0;
    }
};

int main(){
    Solution sol;
    vector<int> nums={3,10,5,25,2,8};
    cout<<sol.findMaximumXOR(nums)<<endl; // 28
    return 0;
}`,
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int findMaximumXOR(vector<int>& nums){
        int maxResult=0, mask=0;
        for(int i=31;i>=0;i--){
            mask|=(1<<i);
            unordered_set<int> prefixes;
            for(int n:nums) prefixes.insert(n&mask);
            int candidate=maxResult|(1<<i);
            for(int p:prefixes) if(prefixes.count(candidate^p)){maxResult=candidate;break;}
        }
        return maxResult;
    }
};

int main(){
    Solution sol;
    vector<int> nums={3,10,5,25,2,8};
    cout<<sol.findMaximumXOR(nums)<<endl; // 28
    return 0;
}`
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def findMaximumXOR(self, nums: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == "__main__":
    sol = Solution()
    nums = [3, 10, 5, 25, 2, 8]
    print(sol.findMaximumXOR(nums))  # 28`,
      solutionCode: `from typing import List

class Solution:
    def findMaximumXOR(self, nums: List[int]) -> int:
        max_result = 0
        mask = 0
        for i in range(31, -1, -1):
            mask |= (1 << i)
            prefixes = set()
            for n in nums:
                prefixes.add(n & mask)
            candidate = max_result | (1 << i)
            for p in prefixes:
                if candidate ^ p in prefixes:
                    max_result = candidate
                    break
        return max_result

if __name__ == "__main__":
    sol = Solution()
    nums = [3, 10, 5, 25, 2, 8]
    print(sol.findMaximumXOR(nums))  # 28`
    }
  }
};

export default problem;
