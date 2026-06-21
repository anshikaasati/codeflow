import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "longest-common-subsequence",
  title: "Longest Common Subsequence",
  difficulty: "Medium",
  category: "Dynamic Programming",
  patterns: ["DP","Memoization"],
  url: "https://leetcode.com/problems/longest-common-subsequence/",
  description: `Given two strings \`text1\` and \`text2\`, return the length of their **longest common subsequence**. If there is no common subsequence, return \`0\`.

A **subsequence** of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.
- For example, \`"ace"\` is a subsequence of \`"abcde"\`.

A **common subsequence** of two strings is a subsequence that is common to both strings.`,
  examples: [
    {
      "input": "text1 = \"abcde\", text2 = \"ace\"",
      "output": "3",
      "explanation": "The longest common subsequence is \"ace\" and its length is 3."
    },
    {
      "input": "text1 = \"abc\", text2 = \"abc\"",
      "output": "3",
      "explanation": "The longest common subsequence is \"abc\" and its length is 3."
    },
    {
      "input": "text1 = \"abc\", text2 = \"def\"",
      "output": "0",
      "explanation": "There is no such common subsequence, so the result is 0."
    }
  ],
  constraints: [
    "1 <= text1.length, text2.length <= 1000",
    "text1 and text2 consist of only lowercase English characters."
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int longestCommonSubsequence(string t1, string t2){
        // Write your code here
        return 0;
    }
};

int main(){
    Solution sol;
    cout<<sol.longestCommonSubsequence("abcde","ace")<<endl; // 3
    cout<<sol.longestCommonSubsequence("abc","abc")<<endl;   // 3
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Recursively solve all subproblems, recalculating overlapping states (exponential runtime).`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int longestCommonSubsequence(string t1, string t2){
        // Write your code here
        return 0;
    }
};

int main(){
    Solution sol;
    cout<<sol.longestCommonSubsequence("abcde","ace")<<endl; // 3
    cout<<sol.longestCommonSubsequence("abc","abc")<<endl;   // 3
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Top-down memoization (recursion + cache) to store and reuse solved subproblem states.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int longestCommonSubsequence(string t1, string t2){
        // Write your code here
        return 0;
    }
};

int main(){
    Solution sol;
    cout<<sol.longestCommonSubsequence("abcde","ace")<<endl; // 3
    cout<<sol.longestCommonSubsequence("abc","abc")<<endl;   // 3
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Bottom-up tabulation (iterative array/matrix updates) to compute states sequentially in polynomial time.`,
        code: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int longestCommonSubsequence(string t1, string t2){
        int m=t1.size(), n=t2.size();
        vector<vector<int>> dp(m+1,vector<int>(n+1,0));
        for(int i=1;i<=m;i++)
            for(int j=1;j<=n;j++){
                if(t1[i-1]==t2[j-1]) dp[i][j]=dp[i-1][j-1]+1;
                else dp[i][j]=max(dp[i-1][j],dp[i][j-1]);
            }
        return dp[m][n];
    }
};

int main(){
    Solution sol;
    cout<<sol.longestCommonSubsequence("abcde","ace")<<endl; // 3
    cout<<sol.longestCommonSubsequence("abc","abc")<<endl;   // 3
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def longestCommonSubsequence(self, t1: str, t2: str) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    print(sol.longestCommonSubsequence("abcde", "ace"))  # 3
    print(sol.longestCommonSubsequence("abc", "abc"))  # 3`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Recursively solve all subproblems, recalculating overlapping states (exponential runtime).`,
        code: `# Brute Force Approach
# TODO: Implement brute force
from typing import List

class Solution:
    def longestCommonSubsequence(self, t1: str, t2: str) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    print(sol.longestCommonSubsequence("abcde", "ace"))  # 3
    print(sol.longestCommonSubsequence("abc", "abc"))  # 3`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Top-down memoization (recursion + cache) to store and reuse solved subproblem states.`,
        code: `# Better Solution
# TODO: Implement optimized approach
from typing import List

class Solution:
    def longestCommonSubsequence(self, t1: str, t2: str) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    print(sol.longestCommonSubsequence("abcde", "ace"))  # 3
    print(sol.longestCommonSubsequence("abc", "abc"))  # 3`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Bottom-up tabulation (iterative array/matrix updates) to compute states sequentially in polynomial time.`,
        code: `from typing import List

class Solution:
    def longestCommonSubsequence(self, t1: str, t2: str) -> int:
        m, n = len(t1), len(t2)
        dp: List[List[int]] = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if t1[i - 1] == t2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1] + 1
                else:
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
        return dp[m][n]

if __name__ == '__main__':
    sol = Solution()
    print(sol.longestCommonSubsequence("abcde", "ace"))  # 3
    print(sol.longestCommonSubsequence("abc", "abc"))  # 3`
      }
    }
  }
};

export default problem;
