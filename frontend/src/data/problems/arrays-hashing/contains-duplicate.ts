import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "contains-duplicate",
  title: "Contains Duplicate",
  difficulty: "Easy",
  category: "Arrays & Hashing",
  patterns: ["Array","HashMap"],
  url: "https://leetcode.com/problems/contains-duplicate/",
  description: `Given an integer array \`nums\`, return \`true\` if any value appears at least twice in the array, and return \`false\` if every element is distinct.`,
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
        // Write your code here
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
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Compare every element with every other element using nested loops.`,
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
      betterSolution: {
        title: "Better",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(1)",
        approach: `Sort the array first. If there are duplicates, they will be adjacent in the sorted array.`,
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
      optimalSolution: {
        title: "Optimal",
        timeComplexity: "O(N)",
        spaceComplexity: "O(N)",
        approach: `Use a hash set to keep track of seen elements. Offers O(1) average lookup time.`,
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
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        # Write your code here
        return False
if __name__ == "__main__":
    sol = Solution()
    a = [1, 2, 3, 1]
    b = [1, 2, 3, 4]
    print(sol.containsDuplicate(a))  # true
    print(sol.containsDuplicate(b))  # false`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Compare every element with every other element using nested loops.`,
        code: `class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        n = len(nums)
        for i in range(n):
            for j in range(i + 1, n):
                if nums[i] == nums[j]:
                    return True
        return False`
      },
      betterSolution: {
        title: "Better",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N) (Timsort space complexity in Python)",
        approach: `Sort the array first. Duplicates will end up adjacent to each other.`,
        code: `class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        nums.sort()
        for i in range(1, len(nums)):
            if nums[i] == nums[i - 1]:
                return True
        return False`
      },
      optimalSolution: {
        title: "Optimal",
        timeComplexity: "O(N)",
        spaceComplexity: "O(N)",
        approach: `Use a hash set to track seen numbers. Provides O(1) average lookup times.`,
        code: `class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        seen = set()
        for n in nums:
            if n in seen:
                return True
            seen.add(n)
        return False`
      }
    }
  }
};

export default problem;
