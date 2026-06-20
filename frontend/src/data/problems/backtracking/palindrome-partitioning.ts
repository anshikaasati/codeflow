import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "palindrome-partitioning",
  title: "Palindrome Partitioning",
  difficulty: "Medium",
  category: "Backtracking",
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
    },
    java: {
      starterCode: `import java.util.*;

class Solution {
    private boolean isPalin(String s, int left, int right) {
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }

    private void backtrack(String s, int start, List<String> curr, List<List<String>> res) {
        if (start == s.length()) {
            res.add(new ArrayList<>(curr));
            return;
        }
        for (int end = start; end < s.length(); end++) {
            if (isPalin(s, start, end)) {
                curr.add(s.substring(start, end + 1));
                backtrack(s, end + 1, curr, res);
                curr.remove(curr.size() - 1);
            }
        }
    }

    public List<List<String>> partition(String s) {
        List<List<String>> res = new ArrayList<>();
        List<String> curr = new ArrayList<>();
        backtrack(s, 0, curr, res);
        return res;
    }
}

public class Main {
    public static void main(String[] args) {
        Solution sol = new Solution();
        for (List<String> v : sol.partition("aab")) {
            System.out.println(String.join(" ", v));
        }
    }
}`
    }
  }
};

export default problem;
