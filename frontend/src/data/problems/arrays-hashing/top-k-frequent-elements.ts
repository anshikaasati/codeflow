import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "top-k-frequent-elements",
  title: "Top K Frequent Elements",
  difficulty: "Medium",
  category: "Arrays & Hashing",
  patterns: ["Array","HashMap"],
  url: "https://leetcode.com/problems/top-k-frequent-elements/",
  description: "Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.",
  examples: [
  {
    "input": "nums = [1,1,1,2,2,3], k = 2",
    "output": "[1,2]"
  },
  {
    "input": "nums = [1], k = 1",
    "output": "[1]"
  }
],
  constraints: [
  "1 <= nums.length <= 10^5",
  "k is in the range [1, the number of unique elements in the array].",
  "It is guaranteed that the answer is unique."
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map<int, int> freq;
        for (int n : nums) freq[n]++;

        // Bucket sort by frequency
        vector<vector<int>> buckets(nums.size() + 1);
        for (auto& [num, cnt] : freq)
            buckets[cnt].push_back(num);

        vector<int> res;
        for (int i = (int)buckets.size() - 1; i >= 0 && (int)res.size() < k; i--)
            for (int n : buckets[i])
                res.push_back(n);
        return res;
    }
};

int main() {
    Solution sol;
    vector<int> nums = {1, 1, 1, 2, 2, 3};
    auto res = sol.topKFrequent(nums, 2);
    for (int n : res) cout << n << " "; // 1 2
    cout << endl;
    return 0;
}`
    },
    python: {
      starterCode: `from typing import List
from collections import Counter

class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        freq = Counter(nums)
        
        # Bucket sort by frequency
        buckets = [[] for _ in range(len(nums) + 1)]
        for num, cnt in freq.items():
            buckets[cnt].append(num)
        
        res = []
        for i in range(len(buckets) - 1, -1, -1):
            if len(res) >= k:
                break
            res.extend(buckets[i])
        return res[:k]

if __name__ == "__main__":
    sol = Solution()
    nums = [1, 1, 1, 2, 2, 3]
    res = sol.topKFrequent(nums, 2)
    print(' '.join(map(str, res)))  # 1 2`
    }
  }
};

export default problem;
