import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "palindrome-partitioning",
  title: "Palindrome Partitioning",
  difficulty: "Medium",
  category: "Backtracking",
  patterns: ["Backtracking","Recursion"],
  url: "https://leetcode.com/problems/palindrome-partitioning/",
  description: "Given a string `s`, partition `s` such that every substring of the partition is a **palindrome**. Return *all possible palindrome partitioning of `s`*.",
  examples: [
  {
    "input": "s = \"aab\"",
    "output": "[[\"a\",\"a\",\"b\"],[\"aa\",\"b\"]]"
  },
  {
    "input": "s = \"a\"",
    "output": "[[\"a\"]]"
  }
],
  constraints: [
  "1 <= s.length <= 16",
  "s contains only lowercase English letters."
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
    bool isPalin(string&s,int l,int r){
        // Write your code here
        return false;
    }
    void bt(string&s,int start,vector<string>&curr,vector<vector<string>>&res){
        // Write your code here
    }
public:
    vector<vector<string>> partition(string s){
        // Write your code here
        return {};
    }
};

int main(){
    Solution sol;
    for(auto&v:sol.partition("aab")){for(auto&s:v)cout<<s<<" ";cout<<endl;}
    return 0;
}`,
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
    bool isPalin(string&s,int l,int r){while(l<r)if(s[l++]!=s[r--])return false;return true;}
    void bt(string&s,int start,vector<string>&curr,vector<vector<string>>&res){
        if(start==(int)s.size()){res.push_back(curr);return;}
        for(int end=start;end<(int)s.size();end++){
            if(isPalin(s,start,end)){
                curr.push_back(s.substr(start,end-start+1));
                bt(s,end+1,curr,res);
                curr.pop_back();
            }
        }
    }
public:
    vector<vector<string>> partition(string s){
        vector<vector<string>> res; vector<string> curr;
        bt(s,0,curr,res); return res;
    }
};

int main(){
    Solution sol;
    for(auto&v:sol.partition("aab")){for(auto&s:v)cout<<s<<" ";cout<<endl;}
    return 0;
}`
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def isPalin(self, s: str, left: int, right: int) -> bool:
        # Write your code here
        return False
    def backtrack(self, s: str, start: int, curr: List[str], res: List[List[str]]) -> None:
        # Write your code here
        pass
    def partition(self, s: str) -> List[List[str]]:
        # Write your code here
        return []
if __name__ == "__main__":
    sol = Solution()
    for v in sol.partition("aab"):
        print(' '.join(v))`,
      solutionCode: `from typing import List

class Solution:
    def isPalin(self, s: str, left: int, right: int) -> bool:
        while left < right:
            if s[left] != s[right]:
                return False
            left += 1
            right -= 1
        return True

    def backtrack(self, s: str, start: int, curr: List[str], res: List[List[str]]) -> None:
        if start == len(s):
            res.append(curr[:])
            return
        for end in range(start, len(s)):
            if self.isPalin(s, start, end):
                curr.append(s[start:end+1])
                self.backtrack(s, end+1, curr, res)
                curr.pop()

    def partition(self, s: str) -> List[List[str]]:
        res, curr = [], []
        self.backtrack(s, 0, curr, res)
        return res

if __name__ == "__main__":
    sol = Solution()
    for v in sol.partition("aab"):
        print(' '.join(v))`
    }
  }
};

export default problem;
