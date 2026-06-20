import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "bubble-sort",
  title: "Bubble Sort",
  difficulty: "Easy",
  category: "Sorting",
  url: "https://en.wikipedia.org/wiki/Bubble_sort",
  description: "Implement the Bubble Sort algorithm to sort an array of integers in ascending order.",
  examples: [
  {
    "input": "nums = [5, 2, 8, 1, 9]",
    "output": "[1, 2, 5, 8, 9]",
    "explanation": "The sorted array is [1, 2, 5, 8, 9]."
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
    vector<int> bubbleSort(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (nums[j] > nums[j + 1]) {
                    swap(nums[j], nums[j + 1]);
                }
            }
        }
        return nums;
    }
};

int main() {
    Solution sol;
    vector<int> nums = {5, 2, 8, 1, 9};
    vector<int> res = sol.bubbleSort(nums);
    for (int x : res) cout << x << " ";
    cout << endl;
    return 0;
}`
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def bubbleSort(self, nums: List[int]) -> List[int]:
        n = len(nums)
        for i in range(n - 1):
            for j in range(n - i - 1):
                if nums[j] > nums[j + 1]:
                    nums[j], nums[j + 1] = nums[j + 1], nums[j]
        return nums

if __name__ == '__main__':
    sol = Solution()
    nums = [5, 2, 8, 1, 9]
    res = sol.bubbleSort(nums)
    print(' '.join(map(str, res)))`
    },
    java: {
      starterCode: `class Solution {
    public int[] bubbleSort(int[] nums) {
        int n = nums.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (nums[j] > nums[j + 1]) {
                    int temp = nums[j];
                    nums[j] = nums[j + 1];
                    nums[j + 1] = temp;
                }
            }
        }
        return nums;
    }
}

class Main {
    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] nums = {5, 2, 8, 1, 9};
        int[] res = sol.bubbleSort(nums);
        for (int x : res) {
            System.out.print(x + " ");
        }
        System.out.println();
    }
}`
    }
  }
};

export default problem;
