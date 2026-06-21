import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "peak-index-in-a-mountain-array",
  title: "Peak Index in a Mountain Array",
  difficulty: "Medium",
  category: "Binary Search",
  patterns: ["Binary Search","Two Pointer"],
  url: "https://leetcode.com/problems/peak-index-in-a-mountain-array/",
  description: "An array `arr` is a mountain if it increases to a peak element and then decreases. Given a mountain array `arr`, return the index `i` such that `arr[0] < arr[1] < ... < arr[i - 1] < arr[i] > arr[i + 1] > ... > arr[arr.length - 1]`.",
  examples: [
  {
    "input": "arr = [0,2,1,0]",
    "output": "1"
  }
],
  constraints: [
  "3 <= arr.length <= 10^5",
  "0 <= arr[i] <= 10^6",
  "arr is guaranteed to be a mountain array."
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int peakIndexInMountainArray(vector<int>& arr) {
        int low = 0, high = arr.size() - 1;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] < arr[mid + 1]) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        return low;
    }
};

int main() {
    Solution sol;
    vector<int> arr = {0, 2, 1, 0};
    cout << sol.peakIndexInMountainArray(arr) << endl; // 1
    return 0;
}`
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def peakIndexInMountainArray(self, arr: List[int]) -> int:
        low, high = 0, len(arr) - 1
        while low < high:
            mid = low + (high - low) // 2
            if arr[mid] < arr[mid + 1]:
                low = mid + 1
            else:
                high = mid
        return low

if __name__ == "__main__":
    sol = Solution()
    arr = [0, 2, 1, 0]
    print(sol.peakIndexInMountainArray(arr))  # 1`
    }
  }
};

export default problem;
