import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "combination-sum-ii",
  title: "Combination Sum II",
  difficulty: "Medium",
  category: "Backtracking",
  url: "https://leetcode.com/problems/combination-sum-ii/",
  description: "Given a collection of candidate numbers (`candidates`) and a target number (`target`), find all unique combinations in `candidates` where the candidate numbers sum to `target`.\n\nEach number in `candidates` may only be used **once** in the combination.\n\n**Note:** The solution set must not contain duplicate combinations.",
  examples: [
  {
    "input": "candidates = [10,1,2,7,6,1,5], target = 8",
    "output": "[ [1,1,6], [1,2,5], [1,7], [2,6] ]"
  },
  {
    "input": "candidates = [2,5,2,1,2], target = 5",
    "output": "[ [1,2,2], [5] ]"
  }
],
  constraints: [
  "1 <= candidates.length <= 100",
  "1 <= candidates[i] <= 50",
  "1 <= target <= 30"
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
    void bt(vector<int>&c,int target,int start,vector<int>&curr,vector<vector<int>>&res){
        if(target==0){res.push_back(curr);return;}
        for(int i=start;i<(int)c.size();i++){
            if(i>start&&c[i]==c[i-1]) continue;
            if(c[i]>target) break;
            curr.push_back(c[i]);
            bt(c,target-c[i],i+1,curr,res);
            curr.pop_back();
        }
    }
public:
    vector<vector<int>> combinationSum2(vector<int>& candidates, int target){
        sort(candidates.begin(),candidates.end());
        vector<vector<int>> res; vector<int> curr;
        bt(candidates,target,0,curr,res); return res;
    }
};

int main(){
    Solution sol;
    vector<int> c={10,1,2,7,6,1,5};
    for(auto&v:sol.combinationSum2(c,8)){for(int x:v)cout<<x<<" ";cout<<endl;}
    return 0;
}`
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def bt(self, c: List[int], target: int, start: int, curr: List[int], res: List[List[int]]) -> None:
        if target == 0:
            res.append(curr[:])
            return
        for i in range(start, len(c)):
            if i > start and c[i] == c[i-1]:
                continue
            if c[i] > target:
                break
            curr.append(c[i])
            self.bt(c, target - c[i], i + 1, curr, res)
            curr.pop()

    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        candidates.sort()
        res, curr = [], []
        self.bt(candidates, target, 0, curr, res)
        return res

if __name__ == "__main__":
    sol = Solution()
    c = [10, 1, 2, 7, 6, 1, 5]
    for v in sol.combinationSum2(c, 8):
        print(' '.join(map(str, v)))`
    },
    java: {
      starterCode: `import java.util.*;

class Solution {
    private void backtrack(int[] candidates, int target, int start, List<Integer> current, List<List<Integer>> result) {
        if (target == 0) {
            result.add(new ArrayList<>(current));
            return;
        }
        for (int i = start; i < candidates.length; i++) {
            if (i > start && candidates[i] == candidates[i - 1]) {
                continue;
            }
            if (candidates[i] > target) {
                break;
            }
            current.add(candidates[i]);
            backtrack(candidates, target - candidates[i], i + 1, current, result);
            current.remove(current.size() - 1);
        }
    }

    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        Arrays.sort(candidates);
        List<List<Integer>> result = new ArrayList<>();
        List<Integer> current = new ArrayList<>();
        backtrack(candidates, target, 0, current, result);
        return result;
    }
}

public class Main {
    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] candidates = {10, 1, 2, 7, 6, 1, 5};
        List<List<Integer>> result = solution.combinationSum2(candidates, 8);
        for (List<Integer> combination : result) {
            for (int num : combination) {
                System.out.print(num + " ");
            }
            System.out.println();
        }
    }
}`
    }
  }
};

export default problem;
