import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "regular-expression-matching",
  title: "Regular Expression Matching",
  difficulty: "Hard",
  category: "Dynamic Programming",
  patterns: ["DP","Memoization"],
  url: "https://leetcode.com/problems/regular-expression-matching/",
  description: "Given an input string `s` and a pattern `p`, implement regular expression matching with support for `.' and `*' where:\\n- `.' Matches any single character.\\n- `*' Matches zero or more of the preceding element.\\n\\nThe matching should cover the **entire** input string (not partial).",
  examples: [
  {
    "input": "s = \"aa\", p = \"a\"",
    "output": "false"
  },
  {
    "input": "s = \"aa\", p = \"a*\"",
    "output": "true"
  },
  {
    "input": "s = \"ab\", p = \".*\"",
    "output": "true"
  }
],
  constraints: [
  "1 <= s.length <= 20",
  "1 <= p.length <= 20",
  "s contains only lowercase English letters.",
  "p contains only lowercase English letters, '.', and '*'.",
  "It is guaranteed for each appearance of the character '*', there will be a previous valid character to match."
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    bool isMatch(string s, string p) {
        // Write your code here
        return false;
    };

int main() {
    Solution sol;
    cout << boolalpha << sol.isMatch("aa", "a*") << endl; // true
    return 0;
}`,
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    bool isMatch(string s, string p) {
        int m = s.size(), n = p.size();
        vector<vector<bool>> dp(m + 1, vector<bool>(n + 1, false));
        dp[0][0] = true;
        for (int j = 2; j <= n; j++) {
            if (p[j - 1] == '*') dp[0][j] = dp[0][j - 2];
        }
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (p[j - 1] == '.' || p[j - 1] == s[i - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else if (p[j - 1] == '*') {
                    dp[i][j] = dp[i][j - 2];
                    if (p[j - 2] == '.' || p[j - 2] == s[i - 1]) {
                        dp[i][j] = dp[i][j] || dp[i - 1][j];
                    }
                }
            }
        }
        return dp[m][n];
    }
};

int main() {
    Solution sol;
    cout << boolalpha << sol.isMatch("aa", "a*") << endl; // true
    return 0;
}`
    },
    python: {
      starterCode: `from typing import List, Optional

class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        # Write your code here
        return False
if __name__ == '__main__':
    sol = Solution()
    print(sol.isMatch("aa", "a*"))  # true`,
      solutionCode: `from typing import List, Optional

class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        m, n = len(s), len(p)
        dp: List[List[bool]] = [[False] * (n + 1) for _ in range(m + 1)]
        dp[0][0] = True
        for j in range(2, n + 1):
            if p[j - 1] == '*':
                dp[0][j] = dp[0][j - 2]
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if p[j - 1] == '.' or p[j - 1] == s[i - 1]:
                    dp[i][j] = dp[i - 1][j - 1]
                elif p[j - 1] == '*':
                    dp[i][j] = dp[i][j - 2]
                    if p[j - 2] == '.' or p[j - 2] == s[i - 1]:
                        dp[i][j] = dp[i][j] or dp[i - 1][j]
        return dp[m][n]

if __name__ == '__main__':
    sol = Solution()
    print(sol.isMatch("aa", "a*"))  # true`
    }
  }
};

export default problem;
