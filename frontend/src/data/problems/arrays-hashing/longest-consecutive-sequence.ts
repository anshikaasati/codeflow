import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "longest-consecutive-sequence",
  title: "Longest Consecutive Sequence",
  difficulty: "Medium",
  category: "Arrays & Hashing",
  url: "https://leetcode.com/problems/longest-consecutive-sequence/",
  description: "Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence.\n\nYou must write an algorithm that runs in `O(n)` time.",
  examples: [
  {
    "input": "nums = [100,4,200,1,3,2]",
    "output": "4",
    "explanation": "The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4."
  },
  {
    "input": "nums = [0,3,7,2,5,8,4,6,0,1]",
    "output": "9"
  }
],
  constraints: [
  "0 <= nums.length <= 10^5",
  "-10^9 <= nums[i] <= 10^9"
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_set<int> numSet(nums.begin(), nums.end());
        int longest = 0;
        for (int n : numSet) {
            // Only start from the beginning of a sequence
            if (!numSet.count(n - 1)) {
                int length = 1;
                while (numSet.count(n + length)) length++;
                longest = max(longest, length);
            }
        }
        return longest;
    }
};

int main() {
    Solution sol;
    vector<int> nums = {100, 4, 200, 1, 3, 2};
    cout << sol.longestConsecutive(nums) << endl; // 4  (1,2,3,4)
    return 0;
}`
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        num_set = set(nums)
        longest = 0
        for n in num_set:
            if n - 1 not in num_set:
                length = 1
                while n + length in num_set:
                    length += 1
                longest = max(longest, length)
        return longest

if __name__ == "__main__":
    sol = Solution()
    nums = [100, 4, 200, 1, 3, 2]
    print(sol.longestConsecutive(nums))  # 4  (1,2,3,4)`
    },
    java: {
      starterCode: `import java.util.*;

class Solution {
    public int longestConsecutive(int[] nums) {
        Set<Integer> numSet = new HashSet<>();
        for (int num : nums) {
            numSet.add(num);
        }
        int longest = 0;
        for (int n : numSet) {
            if (!numSet.contains(n - 1)) {
                int length = 1;
                while (numSet.contains(n + length)) {
                    length++;
                }
                longest = Math.max(longest, length);
            }
        }
        return longest;
    }
}

public class Main {
    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] nums = {100, 4, 200, 1, 3, 2};
        System.out.println(sol.longestConsecutive(nums)); // 4  (1,2,3,4)
    }
}`
    }
  }
};

export default problem;
