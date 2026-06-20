import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "permutations",
  title: "Permutations",
  difficulty: "Medium",
  category: "Backtracking",
  url: "https://leetcode.com/problems/permutations/",
  description: "Given an array `nums` of distinct integers, return all the possible permutations. You can return the answer in any order.",
  examples: [
  {
    "input": "nums = [1,2,3]",
    "output": "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]"
  },
  {
    "input": "nums = [0,1]",
    "output": "[[0,1],[1,0]]"
  },
  {
    "input": "nums = [1]",
    "output": "[[1]]"
  }
],
  constraints: [
  "1 <= nums.length <= 6",
  "-10 <= nums[i] <= 10",
  "All the integers in nums are unique."
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
    void backtrack(vector<int>& nums, vector<bool>& used,
                   vector<int>& curr, vector<vector<int>>& res) {
        if ((int)curr.size() == (int)nums.size()) { res.push_back(curr); return; }
        for (int i = 0; i < (int)nums.size(); i++) {
            if (used[i]) continue;
            used[i] = true; curr.push_back(nums[i]);
            backtrack(nums, used, curr, res);
            used[i] = false; curr.pop_back();
        }
    }
public:
    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> res;
        vector<int> curr;
        vector<bool> used(nums.size(), false);
        backtrack(nums, used, curr, res);
        return res;
    }
};

int main() {
    Solution sol;
    vector<int> nums = {1,2,3};
    auto res = sol.permute(nums);
    for (auto& p : res) {
        for (int x : p) cout << x << " ";
        cout << endl;
    }
    return 0;
}`
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def backtrack(self, nums: List[int], used: List[bool], curr: List[int], res: List[List[int]]) -> None:
        if len(curr) == len(nums):
            res.append(curr[:])
            return
        for i in range(len(nums)):
            if used[i]:
                continue
            used[i] = True
            curr.append(nums[i])
            self.backtrack(nums, used, curr, res)
            used[i] = False
            curr.pop()

    def permute(self, nums: List[int]) -> List[List[int]]:
        res = []
        curr = []
        used = [False] * len(nums)
        self.backtrack(nums, used, curr, res)
        return res

if __name__ == "__main__":
    sol = Solution()
    nums = [1, 2, 3]
    res = sol.permute(nums)
    for p in res:
        print(' '.join(map(str, p)))`
    },
    java: {
      starterCode: `import java.util.*;

class Solution {
    private void backtrack(int[] nums, boolean[] used, List<Integer> curr, List<List<Integer>> res) {
        if (curr.size() == nums.length) {
            res.add(new ArrayList<>(curr));
            return;
        }
        for (int i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            used[i] = true;
            curr.add(nums[i]);
            backtrack(nums, used, curr, res);
            used[i] = false;
            curr.remove(curr.size() - 1);
        }
    }

    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        List<Integer> curr = new ArrayList<>();
        boolean[] used = new boolean[nums.length];
        backtrack(nums, used, curr, res);
        return res;
    }
}

public class Main {
    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] nums = {1, 2, 3};
        List<List<Integer>> res = sol.permute(nums);
        for (List<Integer> p : res) {
            for (int x : p) System.out.print(x + " ");
            System.out.println();
        }
    }
}`
    }
  }
};

export default problem;
