import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "decode-ways",
  title: "Decode Ways",
  difficulty: "Medium",
  category: "Dynamic Programming",
  patterns: ["DP"],
  url: "https://leetcode.com/problems/decode-ways/",
  description: "A message containing letters from `A-Z` can be **encoded** into numbers using the following mapping:\n\n'A' -> \"1\"\n'B' -> \"2\"\n...\n'Z' -> \"26\"\n\nTo **decode** an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways). For example, `\"11106\"` can be mapped into:\n- `\"AAJF\"` with the grouping `(1 1 10 6)`\n- `\"KJF\"` with the grouping `(11 10 6)`\n\nNote that the grouping `(1 11 06)` is invalid because `\"06\"` cannot be mapped into 'F' since `\"6\"` is different from `\"06\"`.\n\nGiven a string `s` containing only digits, return the **number of ways** to **decode** it.",
  examples: [
  {
    "input": "s = \"12\"",
    "output": "2",
    "explanation": "\"12\" could be decoded as \"AB\" (1 2) or \"L\" (12)."
  },
  {
    "input": "s = \"226\"",
    "output": "3",
    "explanation": "\"226\" could be decoded as \"BZ\" (2 26), \"VF\" (22 6), or \"BBF\" (2 2 6)."
  },
  {
    "input": "s = \"06\"",
    "output": "0",
    "explanation": "\"06\" cannot be mapped to \"F\" because of the leading zero (6 is different from 06)."
  }
],
  constraints: [
  "1 <= s.length <= 100",
  "s contains only digits and may contain leading zero(s)."
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int numDecodings(string s) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    cout << sol.numDecodings("12")  << endl; // 2
    cout << sol.numDecodings("226") << endl; // 3
    cout << sol.numDecodings("06")  << endl; // 0
    return 0;
}`,
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int numDecodings(string s) {
        if (s.empty()) return 0;
        int n = s.size();
        vector<int> dp(n + 1, 0);
        dp[0] = 1;
        dp[1] = s[0] != '0' ? 1 : 0;
        for (int i = 2; i <= n; i++) {
            if (s[i-1] != '0') dp[i] += dp[i-1];
            int two = stoi(s.substr(i-2, 2));
            if (two >= 10 && two <= 26) dp[i] += dp[i-2];
        }
        return dp[n];
    }
};

int main() {
    Solution sol;
    cout << sol.numDecodings("12")  << endl; // 2
    cout << sol.numDecodings("226") << endl; // 3
    cout << sol.numDecodings("06")  << endl; // 0
    return 0;
}`
    },
    python: {
      starterCode: `from typing import List, Optional

class Solution:
    def numDecodings(self, s: str) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    print(sol.numDecodings("12"))  # 2
    print(sol.numDecodings("226"))  # 3
    print(sol.numDecodings("06"))  # 0`,
      solutionCode: `from typing import List, Optional

class Solution:
    def numDecodings(self, s: str) -> int:
        if not s:
            return 0
        n = len(s)
        dp: List[int] = [0] * (n + 1)
        dp[0] = 1
        dp[1] = 1 if s[0] != '0' else 0
        for i in range(2, n + 1):
            if s[i-1] != '0':
                dp[i] += dp[i-1]
            two = int(s[i-2:i])
            if 10 <= two <= 26:
                dp[i] += dp[i-2]
        return dp[n]

if __name__ == '__main__':
    sol = Solution()
    print(sol.numDecodings("12"))  # 2
    print(sol.numDecodings("226"))  # 3
    print(sol.numDecodings("06"))  # 0`
    }
  }
};

export default problem;
