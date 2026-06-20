import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "subsets-ii",
  title: "Subsets II",
  difficulty: "Medium",
  category: "Backtracking",
  url: "https://leetcode.com/problems/subsets-ii/",
  description: "Given an integer array `nums` that may contain duplicates, return all possible **subsets** (the power set). The solution set **must not** contain duplicate subsets. Return the solution in **any order**.",
  examples: [
  {
    "input": "nums = [1,2,2]",
    "output": "[[],[1],[1,2],[1,2,2],[2],[2,2]]"
  },
  {
    "input": "nums = [0]",
    "output": "[[],[0]]"
  }
],
  constraints: [
  "1 <= nums.length <= 10",
  "-10 <= nums[i] <= 10"
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;
class Solution {
    void bt(vector<int>&nums,int start,vector<int>&curr,vector<vector<int>>&res){
        res.push_back(curr);
        for(int i=start;i<(int)nums.size();i++){
            if(i>start&&nums[i]==nums[i-1]) continue;
            curr.push_back(nums[i]);
            bt(nums,i+1,curr,res);
            curr.pop_back();
        }
    }
public:
    vector<vector<int>> subsetsWithDup(vector<int>& nums){
        sort(nums.begin(),nums.end());
        vector<vector<int>> res; vector<int> curr;
        bt(nums,0,curr,res); return res;
    }
};
int main(){
    Solution sol;
    vector<int> nums={1,2,2};
    for(auto&v:sol.subsetsWithDup(nums)){cout<<"[";for(int i=0;i<(int)v.size();i++){cout<<v[i];if(i+1<(int)v.size())cout<<",";}cout<<"] ";}
    cout<<endl;
    return 0;
}`
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        res = []
        self.bt(nums, 0, [], res)
        return res

    def bt(self, nums: List[int], start: int, curr: List[int], res: List[List[int]]) -> None:
        res.append(curr[:])
        for i in range(start, len(nums)):
            if i > start and nums[i] == nums[i-1]:
                continue
            curr.append(nums[i])
            self.bt(nums, i+1, curr, res)
            curr.pop()

if __name__ == "__main__":
    sol = Solution()
    nums = [1, 2, 2]
    result = sol.subsetsWithDup(nums)
    for v in result:
        print("[" + ",".join(map(str, v)) + "]", end=" ")
    print()`
    },
    java: {
      starterCode: `import java.util.*;

class Solution {
    private void bt(int[] nums, int start, List<Integer> curr, List<List<Integer>> res) {
        res.add(new ArrayList<>(curr));
        for (int i = start; i < nums.length; i++) {
            if (i > start && nums[i] == nums[i - 1]) {
                continue;
            }
            curr.add(nums[i]);
            bt(nums, i + 1, curr, res);
            curr.remove(curr.size() - 1);
        }
    }

    public List<List<Integer>> subsetsWithDup(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        List<Integer> curr = new ArrayList<>();
        bt(nums, 0, curr, res);
        return res;
    }
}

public class Main {
    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] nums = {1, 2, 2};
        List<List<Integer>> result = sol.subsetsWithDup(nums);
        for (List<Integer> v : result) {
            System.out.print("[");
            for (int i = 0; i < v.size(); i++) {
                System.out.print(v.get(i));
                if (i + 1 < v.size()) {
                    System.out.print(",");
                }
            }
            System.out.print("] ");
        }
        System.out.println();
    }
}`
    }
  }
};

export default problem;
