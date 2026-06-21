import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "edit-distance",
  title: "Edit Distance",
  difficulty: "Hard",
  category: "Dynamic Programming",
  patterns: ["DP","Memoization"],
  url: "https://leetcode.com/problems/edit-distance/",
  description: `Given two strings \`word1\` and \`word2\`, return the minimum number of operations required to convert \`word1\` to \`word2\`.\\n\\nYou have the following three operations permitted on a word:\\n- Insert a character\\n- Delete a character\\n- Replace a character`,
  examples: [
    {
      "input": "word1 = \"horse\", word2 = \"ros\"",
      "output": "3"
    },
    {
      "input": "word1 = \"intention\", word2 = \"execution\"",
      "output": "5"
    }
  ],
  constraints: [
    "0 <= word1.length, word2.length <= 500",
    "word1 and word2 consist of lowercase English letters."
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    int minDistance(string w1, string w2){
        // Write your code here
        return 0;
    }
};
int main(){
    Solution sol;
    cout<<sol.minDistance("horse","ros")<<endl; // 3
    cout<<sol.minDistance("intention","execution")<<endl; // 5
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(2^N)",
        spaceComplexity: "O(1)",
        approach: `Recursively solve all subproblems, recalculating overlapping states (exponential runtime).`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    int minDistance(string w1, string w2){
        // Write your code here
        return 0;
    }
};
int main(){
    Solution sol;
    cout<<sol.minDistance("horse","ros")<<endl; // 3
    cout<<sol.minDistance("intention","execution")<<endl; // 5
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(N)",
        approach: `Top-down memoization (recursion + cache) to store and reuse solved subproblem states.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    int minDistance(string w1, string w2){
        // Write your code here
        return 0;
    }
};
int main(){
    Solution sol;
    cout<<sol.minDistance("horse","ros")<<endl; // 3
    cout<<sol.minDistance("intention","execution")<<endl; // 5
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Bottom-up tabulation (iterative array/matrix updates) to compute states sequentially in polynomial time.`,
        code: `#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    int minDistance(string w1, string w2){
        int m=w1.size(), n=w2.size();
        vector<vector<int>> dp(m+1,vector<int>(n+1));
        for(int i=0;i<=m;i++) dp[i][0]=i;
        for(int j=0;j<=n;j++) dp[0][j]=j;
        for(int i=1;i<=m;i++)
            for(int j=1;j<=n;j++){
                if(w1[i-1]==w2[j-1]) dp[i][j]=dp[i-1][j-1];
                else dp[i][j]=1+min({dp[i-1][j],dp[i][j-1],dp[i-1][j-1]});
            }
        return dp[m][n];
    }
};
int main(){
    Solution sol;
    cout<<sol.minDistance("horse","ros")<<endl; // 3
    cout<<sol.minDistance("intention","execution")<<endl; // 5
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def minDistance(self, w1: str, w2: str) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    print(sol.minDistance("horse", "ros"))  # 3
    print(sol.minDistance("intention", "execution"))  # 5`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(2^N)",
        spaceComplexity: "O(1)",
        approach: `Recursively solve all subproblems, recalculating overlapping states (exponential runtime).`,
        code: `# Brute Force Approach
# TODO: Implement brute force
from typing import List

class Solution:
    def minDistance(self, w1: str, w2: str) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    print(sol.minDistance("horse", "ros"))  # 3
    print(sol.minDistance("intention", "execution"))  # 5`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(N)",
        approach: `Top-down memoization (recursion + cache) to store and reuse solved subproblem states.`,
        code: `# Better Solution
# TODO: Implement optimized approach
from typing import List

class Solution:
    def minDistance(self, w1: str, w2: str) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    print(sol.minDistance("horse", "ros"))  # 3
    print(sol.minDistance("intention", "execution"))  # 5`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Bottom-up tabulation (iterative array/matrix updates) to compute states sequentially in polynomial time.`,
        code: `from typing import List

class Solution:
    def minDistance(self, w1: str, w2: str) -> int:
        m, n = len(w1), len(w2)
        dp: List[List[int]] = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(m + 1):
            dp[i][0] = i
        for j in range(n + 1):
            dp[0][j] = j
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if w1[i - 1] == w2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1]
                else:
                    dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
        return dp[m][n]

if __name__ == '__main__':
    sol = Solution()
    print(sol.minDistance("horse", "ros"))  # 3
    print(sol.minDistance("intention", "execution"))  # 5`
      }
    }
  }
};

export default problem;
