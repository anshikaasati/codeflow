import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "insertion-sort",
  title: "Insertion Sort",
  difficulty: "Easy",
  category: "Sorting",
  patterns: ["Sorting"],
  url: "https://en.wikipedia.org/wiki/Insertion_sort",
  description: "Implement the Insertion Sort algorithm to sort an array of integers in ascending order.",
  examples: [
  {
    "input": "nums = [12, 11, 13, 5, 6]",
    "output": "[5, 6, 11, 12, 13]",
    "explanation": "The sorted array is [5, 6, 11, 12, 13]."
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
    vector<int> insertionSort(vector<int>& nums) {
        int n = nums.size();
        for (int i = 1; i < n; i++) {
            int key = nums[i];
            int j = i - 1;
            while (j >= 0 && nums[j] > key) {
                nums[j + 1] = nums[j];
                j--;
            }
            nums[j + 1] = key;
        }
        return nums;
    }
};

int main() {
    Solution sol;
    vector<int> nums = {12, 11, 13, 5, 6};
    vector<int> res = sol.insertionSort(nums);
    for (int x : res) cout << x << " ";
    cout << endl;
    return 0;
}`
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def insertionSort(self, nums: List[int]) -> List[int]:
        n = len(nums)
        for i in range(1, n):
            key = nums[i]
            j = i - 1
            while j >= 0 and nums[j] > key:
                nums[j + 1] = nums[j]
                j -= 1
            nums[j + 1] = key
        return nums

if __name__ == '__main__':
    sol = Solution()
    nums = [12, 11, 13, 5, 6]
    res = sol.insertionSort(nums)
    print(' '.join(map(str, res)))`
    }
  }
};

export default problem;
