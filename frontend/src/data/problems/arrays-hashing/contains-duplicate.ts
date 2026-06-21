import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "contains-duplicate",
  title: "Contains Duplicate",
  difficulty: "Easy",
  category: "Arrays & Hashing",
  patterns: ["Array","HashMap"],
  url: "https://leetcode.com/problems/contains-duplicate/",
  description: "Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.",
  examples: [
  {
    "input": "nums = [1,2,3,1]",
    "output": "true",
    "explanation": "The element 1 occurs at indices 0 and 3."
  },
  {
    "input": "nums = [1,2,3,4]",
    "output": "false"
  }
],
  constraints: [
  "1 <= nums.length <= 10^5",
  "-10^9 <= nums[i] <= 10^9"
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        unordered_set<int> seen;
        for (int n : nums) {
            if (seen.count(n)) return true;
            seen.insert(n);
        }
        return false;
    }
};

int main() {
    Solution sol;
    cout << boolalpha;
    vector<int> a = {1, 2, 3, 1};
    vector<int> b = {1, 2, 3, 4};
    cout << sol.containsDuplicate(a) << endl; // true
    cout << sol.containsDuplicate(b) << endl; // false
    return 0;
}`,
      solutions: [
        {
          title: 'Brute Force',
          description: 'Compare every element with every other element using nested loops.',
          timeComplexity: 'O(N^2)',
          spaceComplexity: 'O(1)',
          code: `class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; ++i) {
            for (int j = i + 1; j < n; ++j) {
                if (nums[i] == nums[j]) return true;
            }
        }
        return false;
    }
};`
        },
        {
          title: 'Better',
          description: 'Sort the array first. If there are duplicates, they will be adjacent in the sorted array.',
          timeComplexity: 'O(N log N)',
          spaceComplexity: 'O(1)',
          code: `class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        for (int i = 1; i < n; ++i) {
            if (nums[i] == nums[i - 1]) return true;
        }
        return false;
    }
};`
        },
        {
          title: 'Optimal',
          description: 'Use a hash set to keep track of seen elements. Offers O(1) average lookup time.',
          timeComplexity: 'O(N)',
          spaceComplexity: 'O(N)',
          code: `class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        unordered_set<int> seen;
        for (int n : nums) {
            if (seen.count(n)) return true;
            seen.insert(n);
        }
        return false;
    }
};`
        }
      ]
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        seen = set()
        for n in nums:
            if n in seen:
                return True
            seen.add(n)
        return False

if __name__ == "__main__":
    sol = Solution()
    a = [1, 2, 3, 1]
    b = [1, 2, 3, 4]
    print(sol.containsDuplicate(a))  # true
    print(sol.containsDuplicate(b))  # false`,
      solutions: [
        {
          title: 'Brute Force',
          description: 'Compare every element with every other element using nested loops.',
          timeComplexity: 'O(N^2)',
          spaceComplexity: 'O(1)',
          code: `class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        n = len(nums)
        for i in range(n):
            for j in range(i + 1, n):
                if nums[i] == nums[j]:
                    return True
        return False`
        },
        {
          title: 'Better',
          description: 'Sort the array first. Duplicates will end up adjacent to each other.',
          timeComplexity: 'O(N log N)',
          spaceComplexity: 'O(N) (Timsort space complexity in Python)',
          code: `class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        nums.sort()
        for i in range(1, len(nums)):
            if nums[i] == nums[i - 1]:
                return True
        return False`
        },
        {
          title: 'Optimal',
          description: 'Use a hash set to track seen numbers. Provides O(1) average lookup times.',
          timeComplexity: 'O(N)',
          spaceComplexity: 'O(N)',
          code: `class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        seen = set()
        for n in nums:
            if n in seen:
                return True
            seen.add(n)
        return False`
        }
      ]
    }
  }
};

export default problem;
