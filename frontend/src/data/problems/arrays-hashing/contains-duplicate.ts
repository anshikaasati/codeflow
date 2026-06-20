import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "contains-duplicate",
  title: "Contains Duplicate",
  difficulty: "Easy",
  category: "Arrays & Hashing",
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
}`
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
    print(sol.containsDuplicate(b))  # false`
    },
    java: {
      starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] a = {1, 2, 3, 1};
        int[] b = {1, 2, 3, 4};
        System.out.println(sol.containsDuplicate(a)); // true
        System.out.println(sol.containsDuplicate(b)); // false
    }
}

class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        for (int n : nums) {
            if (seen.contains(n)) return true;
            seen.add(n);
        }
        return false;
    }
}`
    }
  }
};

export default problem;
