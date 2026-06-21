import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "interleaving-string",
  title: "Interleaving String",
  difficulty: "Medium",
  category: "Dynamic Programming",
  patterns: ["DP","Memoization"],
  url: "https://leetcode.com/problems/interleaving-string/",
  description: `Given strings \`s1\`, \`s2\`, and \`s3\`, find whether \`s3\` is formed by an **interleaving** of \`s1\` and \`s2\`.\\n\\nAn **interleaving** of two strings \`s\` and \`t\` is a configuration where they are divided into **non-empty** substrings such that:\\n- \`s = s1 + s2 + ... + sn\`\\n- \`t = t1 + t2 + ... + tm\`\\n- \`|n - m| <= 1\`\\n- The **interleaving** is \`s1 + t1 + s2 + t2 + ...\` or \`t1 + s1 + t2 + s2 + ...\`\\n\\nNote: \`a + b\` is the concatenation of strings \`a\` and \`b\`.`,
  examples: [
    {
      "input": "s1 = \"aabcc\", s2 = \"dbbca\", s3 = \"aadbbcbcac\"",
      "output": "true"
    },
    {
      "input": "s1 = \"aabcc\", s2 = \"dbbca\", s3 = \"aadbbbaccc\"",
      "output": "false"
    },
    {
      "input": "s1 = \"\", s2 = \"\", s3 = \"\"",
      "output": "true"
    }
  ],
  constraints: [
    "0 <= s1.length, s2.length <= 100",
    "0 <= s3.length <= 200",
    "s1, s2, and s3 consist of lowercase English letters."
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    bool isInterleave(string s1, string s2, string s3){
        // Write your code here
        return false;
    }
};
int main(){
    Solution sol;
    cout<<boolalpha<<sol.isInterleave("aabcc","dbbca","aadbbcbcac")<<endl; // true
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
    bool isInterleave(string s1, string s2, string s3){
        // Write your code here
        return false;
    }
};
int main(){
    Solution sol;
    cout<<boolalpha<<sol.isInterleave("aabcc","dbbca","aadbbcbcac")<<endl; // true
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
    bool isInterleave(string s1, string s2, string s3){
        // Write your code here
        return false;
    }
};
int main(){
    Solution sol;
    cout<<boolalpha<<sol.isInterleave("aabcc","dbbca","aadbbcbcac")<<endl; // true
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
    bool isInterleave(string s1, string s2, string s3){
        int m=s1.size(),n=s2.size();
        if(m+n!=(int)s3.size()) return false;
        vector<vector<bool>> dp(m+1,vector<bool>(n+1,false));
        dp[0][0]=true;
        for(int i=1;i<=m;i++) dp[i][0]=dp[i-1][0]&&s1[i-1]==s3[i-1];
        for(int j=1;j<=n;j++) dp[0][j]=dp[0][j-1]&&s2[j-1]==s3[j-1];
        for(int i=1;i<=m;i++) for(int j=1;j<=n;j++)
            dp[i][j]=(dp[i-1][j]&&s1[i-1]==s3[i+j-1])||(dp[i][j-1]&&s2[j-1]==s3[i+j-1]);
        return dp[m][n];
    }
};
int main(){
    Solution sol;
    cout<<boolalpha<<sol.isInterleave("aabcc","dbbca","aadbbcbcac")<<endl; // true
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List, Optional

class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        # Write your code here
        return False
if __name__ == '__main__':
    sol = Solution()
    print(sol.isInterleave("aabcc", "dbbca", "aadbbcbcac"))  # True`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Recursively solve all subproblems, recalculating overlapping states (exponential runtime).`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from typing import List, Optional

class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        # Write your code here
        return False
if __name__ == '__main__':
    sol = Solution()
    print(sol.isInterleave("aabcc", "dbbca", "aadbbcbcac"))  # True`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Top-down memoization (recursion + cache) to store and reuse solved subproblem states.`,
        code: `// Better Solution
// TODO: Implement optimized approach
from typing import List, Optional

class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        # Write your code here
        return False
if __name__ == '__main__':
    sol = Solution()
    print(sol.isInterleave("aabcc", "dbbca", "aadbbcbcac"))  # True`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Bottom-up tabulation (iterative array/matrix updates) to compute states sequentially in polynomial time.`,
        code: `from typing import List, Optional

class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        m, n = len(s1), len(s2)
        if m + n != len(s3):
            return False
        dp = [[False] * (n + 1) for _ in range(m + 1)]
        dp[0][0] = True
        for i in range(1, m + 1):
            dp[i][0] = dp[i - 1][0] and s1[i - 1] == s3[i - 1]
        for j in range(1, n + 1):
            dp[0][j] = dp[0][j - 1] and s2[j - 1] == s3[j - 1]
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                dp[i][j] = (dp[i - 1][j] and s1[i - 1] == s3[i + j - 1]) or (dp[i][j - 1] and s2[j - 1] == s3[i + j - 1])
        return dp[m][n]

if __name__ == '__main__':
    sol = Solution()
    print(sol.isInterleave("aabcc", "dbbca", "aadbbcbcac"))  # True`
      }
    }
  }
};

export default problem;
