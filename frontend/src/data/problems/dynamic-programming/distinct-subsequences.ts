import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "distinct-subsequences",
  title: "Distinct Subsequences",
  difficulty: "Hard",
  category: "Dynamic Programming",
  patterns: ["DP","Memoization"],
  url: "https://leetcode.com/problems/distinct-subsequences/",
  description: "Given two strings `s` and `t`, return the number of distinct **subsequences** of `s` which equals `t`.",
  examples: [
  {
    "input": "s = \"rabbbit\", t = \"rabbit\"",
    "output": "3"
  },
  {
    "input": "s = \"babgbag\", t = \"bag\"",
    "output": "5"
  }
],
  constraints: [
  "1 <= s.length, t.length <= 1000",
  "s and t consist of English letters."
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    int numDistinct(string s, string t){
        int m=s.size(),n=t.size();
        vector<vector<long long>> dp(m+1,vector<long long>(n+1,0));
        for(int i=0;i<=m;i++) dp[i][0]=1;
        for(int i=1;i<=m;i++) for(int j=1;j<=n;j++){
            dp[i][j]=dp[i-1][j];
            if(s[i-1]==t[j-1]) dp[i][j]+=dp[i-1][j-1];
        }
        return (int)dp[m][n];
    }
};
int main(){
    Solution sol;
    cout<<sol.numDistinct("rabbbit","rabbit")<<endl; // 3
    return 0;
}`
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def numDistinct(self, s: str, t: str) -> int:
        m, n = len(s), len(t)
        dp: List[List[int]] = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(m + 1):
            dp[i][0] = 1
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                dp[i][j] = dp[i - 1][j]
                if s[i - 1] == t[j - 1]:
                    dp[i][j] += dp[i - 1][j - 1]
        return dp[m][n]

if __name__ == '__main__':
    sol = Solution()
    print(sol.numDistinct("rabbbit", "rabbit"))  # 3`
    }
  }
};

export default problem;
