import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "is-subsequence",
  title: "Is Subsequence",
  difficulty: "Easy",
  category: "Two Pointers",
  patterns: ["Two Pointer"],
  url: "https://leetcode.com/problems/is-subsequence/",
  description: `Given two strings \`s\` and \`t\`, return \`true\` if \`s\` is a **subsequence** of \`t\`, or \`false\` otherwise.

A **subsequence** of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., "ace" is a subsequence of "abcde" while "aec" is not).`,
  examples: [
    {
      "input": "s = \"abc\", t = \"ahbgdc\"",
      "output": "true"
    },
    {
      "input": "s = \"axc\", t = \"ahbgdc\"",
      "output": "false"
    }
  ],
  constraints: [
    "0 <= s.length <= 100",
    "0 <= t.length <= 10^4",
    "s and t consist only of lowercase English letters."
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    bool isSubsequence(string s, string t) {
        // Write your code here
        return false;
    }
};

int main() {
    Solution sol;
    cout<<boolalpha;
    cout<<sol.isSubsequence("abc","ahbgdc")<<endl; // true
    cout<<sol.isSubsequence("axc","ahbgdc")<<endl; // false
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Check all pairs, triplets, or combinations using nested loops.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    bool isSubsequence(string s, string t) {
        // Write your code here
        return false;
    }
};

int main() {
    Solution sol;
    cout<<boolalpha;
    cout<<sol.isSubsequence("abc","ahbgdc")<<endl; // true
    cout<<sol.isSubsequence("axc","ahbgdc")<<endl; // false
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Sort the elements first, then scan or use two pointers with additional logic/checks.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    bool isSubsequence(string s, string t) {
        // Write your code here
        return false;
    }
};

int main() {
    Solution sol;
    cout<<boolalpha;
    cout<<sol.isSubsequence("abc","ahbgdc")<<endl; // true
    cout<<sol.isSubsequence("axc","ahbgdc")<<endl; // false
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Position pointers at key boundaries or moving speeds to narrow search space in a single linear pass.`,
        code: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    bool isSubsequence(string s, string t) {
        int i=0;
        for (char c : t) if (i<(int)s.size()&&c==s[i]) i++;
        return i==(int)s.size();
    }
};

int main() {
    Solution sol;
    cout<<boolalpha;
    cout<<sol.isSubsequence("abc","ahbgdc")<<endl; // true
    cout<<sol.isSubsequence("axc","ahbgdc")<<endl; // false
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def isSubsequence(self, s: str, t: str) -> bool:
        # Write your code here
        return False
if __name__ == '__main__':
    sol = Solution()
    print(sol.isSubsequence("abc", "ahbgdc"))  # True
    print(sol.isSubsequence("axc", "ahbgdc"))  # False`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Check all pairs, triplets, or combinations using nested loops.`,
        code: `# Brute Force Approach
# TODO: Implement brute force
from typing import List

class Solution:
    def isSubsequence(self, s: str, t: str) -> bool:
        # Write your code here
        return False
if __name__ == '__main__':
    sol = Solution()
    print(sol.isSubsequence("abc", "ahbgdc"))  # True
    print(sol.isSubsequence("axc", "ahbgdc"))  # False`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Sort the elements first, then scan or use two pointers with additional logic/checks.`,
        code: `# Better Solution
# TODO: Implement optimized approach
from typing import List

class Solution:
    def isSubsequence(self, s: str, t: str) -> bool:
        # Write your code here
        return False
if __name__ == '__main__':
    sol = Solution()
    print(sol.isSubsequence("abc", "ahbgdc"))  # True
    print(sol.isSubsequence("axc", "ahbgdc"))  # False`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Position pointers at key boundaries or moving speeds to narrow search space in a single linear pass.`,
        code: `from typing import List

class Solution:
    def isSubsequence(self, s: str, t: str) -> bool:
        i = 0
        for c in t:
            if i < len(s) and c == s[i]:
                i += 1
        return i == len(s)


if __name__ == '__main__':
    sol = Solution()
    print(sol.isSubsequence("abc", "ahbgdc"))  # True
    print(sol.isSubsequence("axc", "ahbgdc"))  # False`
      }
    }
  }
};

export default problem;
