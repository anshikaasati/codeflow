import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "kth-largest-element-in-an-array",
  title: "Kth Largest Element in an Array",
  difficulty: "Medium",
  category: "Heap / Priority Queue",
  patterns: ["Heap","Greedy"],
  url: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
  description: "Given an integer array `nums` and an integer `k`, return the `k-th` largest element in the array.\n\nNote that it is the `k-th` largest element in the sorted order, not the `k-th` distinct element.\n\nCan you solve it without sorting?",
  examples: [
  {
    "input": "nums = [3,2,1,5,6,4], k = 2",
    "output": "5"
  },
  {
    "input": "nums = [3,2,3,1,2,4,5,5,6], k = 4",
    "output": "4"
  }
],
  constraints: [
  "1 <= k <= nums.length <= 10^5",
  "-10^4 <= nums[i] <= 10^4"
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> nums = {3,2,1,5,6,4};
    cout << sol.findKthLargest(nums, 2) << endl; // 5
    return 0;
}`,
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        priority_queue<int, vector<int>, greater<int>> minHeap;
        for (int n : nums) {
            minHeap.push(n);
            if ((int)minHeap.size() > k) minHeap.pop();
        }
        return minHeap.top();
    }
};

int main() {
    Solution sol;
    vector<int> nums = {3,2,1,5,6,4};
    cout << sol.findKthLargest(nums, 2) << endl; // 5
    return 0;
}`
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    nums = [3,2,1,5,6,4]
    print(sol.findKthLargest(nums, 2))  # 5`,
      solutionCode: `from typing import List

class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        import heapq
        minHeap = []
        for n in nums:
            heapq.heappush(minHeap, n)
            if len(minHeap) > k:
                heapq.heappop(minHeap)
        return minHeap[0]

if __name__ == '__main__':
    sol = Solution()
    nums = [3,2,1,5,6,4]
    print(sol.findKthLargest(nums, 2))  # 5`
    }
  }
};

export default problem;
