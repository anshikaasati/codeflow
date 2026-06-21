import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "selection-sort",
  title: "Selection Sort",
  difficulty: "Easy",
  category: "Sorting",
  patterns: ["Sorting"],
  url: "https://en.wikipedia.org/wiki/Selection_sort",
  description: "Implement the Selection Sort algorithm to sort an array of integers in ascending order.",
  examples: [
  {
    "input": "nums = [29, 10, 14, 37, 13]",
    "output": "[10, 13, 14, 29, 37]",
    "explanation": "The sorted array is [10, 13, 14, 29, 37]."
  }
],
  constraints: [
  "1 <= nums.length <= 100",
  "-100 <= nums[i] <= 100"
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> selectionSort(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (nums[j] < nums[minIdx]) {
                    minIdx = j;
                }
            }
            swap(nums[i], nums[minIdx]);
        }
        return nums;
    }
};

int main() {
    Solution sol;
    vector<int> nums = {29, 10, 14, 37, 13};
    vector<int> res = sol.selectionSort(nums);
    for (int x : res) cout << x << " ";
    cout << endl;
    return 0;
}`
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def selectionSort(self, nums: List[int]) -> List[int]:
        n = len(nums)
        for i in range(n - 1):
            min_idx = i
            for j in range(i + 1, n):
                if nums[j] < nums[min_idx]:
                    min_idx = j
            nums[i], nums[min_idx] = nums[min_idx], nums[i]
        return nums

if __name__ == '__main__':
    sol = Solution()
    nums = [29, 10, 14, 37, 13]
    res = sol.selectionSort(nums)
    print(' '.join(map(str, res)))`
    }
  }
};

export default problem;
