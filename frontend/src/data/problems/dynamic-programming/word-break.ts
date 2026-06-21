import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "word-break",
  title: "Word Break",
  difficulty: "Medium",
  category: "Dynamic Programming",
  patterns: ["DP","Memoization"],
  url: "https://leetcode.com/problems/word-break/",
  description: `Given a string \`s\` and a dictionary of strings \`wordDict\`, return \`true\` if \`s\` can be segmented into a space-separated sequence of one or more dictionary words.

**Note** that the same word in the dictionary may be reused multiple times in the segmentation.`,
  examples: [
    {
      "input": "s = \"leetcode\", wordDict = [\"leet\",\"code\"]",
      "output": "true",
      "explanation": "Return true because \"leetcode\" can be segmented as \"leet code\"."
    },
    {
      "input": "s = \"applepenapple\", wordDict = [\"apple\",\"pen\"]",
      "output": "true",
      "explanation": "Return true because \"applepenapple\" can be segmented as \"apple pen apple\". Note that you are allowed to reuse a dictionary word."
    },
    {
      "input": "s = \"catsandog\", wordDict = [\"cats\",\"dog\",\"sand\",\"and\",\"cat\"]",
      "output": "false"
    }
  ],
  constraints: [
    "1 <= s.length <= 300",
    "1 <= wordDict.length <= 1000",
    "1 <= wordDict[i].length <= 20",
    "s and wordDict[i] consist of only lowercase English letters.",
    "All the strings of wordDict are unique."
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        // Write your code here
        return false;
    }
};

int main() {
    Solution sol;
    cout << boolalpha;
    vector<string> dict1 = {"leet","code"};
    cout << sol.wordBreak("leetcode", dict1) << endl; // true
    vector<string> dict2 = {"apple","pen"};
    cout << sol.wordBreak("applepenapple", dict2) << endl; // true
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
    bool wordBreak(string s, vector<string>& wordDict) {
        // Write your code here
        return false;
    }
};

int main() {
    Solution sol;
    cout << boolalpha;
    vector<string> dict1 = {"leet","code"};
    cout << sol.wordBreak("leetcode", dict1) << endl; // true
    vector<string> dict2 = {"apple","pen"};
    cout << sol.wordBreak("applepenapple", dict2) << endl; // true
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
    bool wordBreak(string s, vector<string>& wordDict) {
        // Write your code here
        return false;
    }
};

int main() {
    Solution sol;
    cout << boolalpha;
    vector<string> dict1 = {"leet","code"};
    cout << sol.wordBreak("leetcode", dict1) << endl; // true
    vector<string> dict2 = {"apple","pen"};
    cout << sol.wordBreak("applepenapple", dict2) << endl; // true
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
    bool wordBreak(string s, vector<string>& wordDict) {
        unordered_set<string> wordSet(wordDict.begin(), wordDict.end());
        int n = s.size();
        vector<bool> dp(n + 1, false);
        dp[0] = true;
        for (int i = 1; i <= n; i++)
            for (int j = 0; j < i; j++)
                if (dp[j] && wordSet.count(s.substr(j, i - j))) {
                    dp[i] = true; break;
                }
        return dp[n];
    }
};

int main() {
    Solution sol;
    cout << boolalpha;
    vector<string> dict1 = {"leet","code"};
    cout << sol.wordBreak("leetcode", dict1) << endl; // true
    vector<string> dict2 = {"apple","pen"};
    cout << sol.wordBreak("applepenapple", dict2) << endl; // true
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        # Write your code here
        return False
if __name__ == '__main__':
    sol = Solution()
    dict1 = ["leet","code"]
    print(sol.wordBreak("leetcode", dict1))  # true
    dict2 = ["apple","pen"]
    print(sol.wordBreak("applepenapple", dict2))  # true`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Recursively solve all subproblems, recalculating overlapping states (exponential runtime).`,
        code: `# Brute Force Approach
# TODO: Implement brute force
from typing import List

class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        # Write your code here
        return False
if __name__ == '__main__':
    sol = Solution()
    dict1 = ["leet","code"]
    print(sol.wordBreak("leetcode", dict1))  # true
    dict2 = ["apple","pen"]
    print(sol.wordBreak("applepenapple", dict2))  # true`
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
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        # Write your code here
        return False
if __name__ == '__main__':
    sol = Solution()
    dict1 = ["leet","code"]
    print(sol.wordBreak("leetcode", dict1))  # true
    dict2 = ["apple","pen"]
    print(sol.wordBreak("applepenapple", dict2))  # true`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Bottom-up tabulation (iterative array/matrix updates) to compute states sequentially in polynomial time.`,
        code: `from typing import List

class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        word_set = set(wordDict)
        n = len(s)
        dp = [False] * (n + 1)
        dp[0] = True
        for i in range(1, n + 1):
            for j in range(i):
                if dp[j] and s[j:i] in word_set:
                    dp[i] = True
                    break
        return dp[n]

if __name__ == '__main__':
    sol = Solution()
    dict1 = ["leet","code"]
    print(sol.wordBreak("leetcode", dict1))  # true
    dict2 = ["apple","pen"]
    print(sol.wordBreak("applepenapple", dict2))  # true`
      }
    }
  }
};

export default problem;
