import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "longest-palindromic-substring",
  title: "Longest Palindromic Substring",
  difficulty: "Medium",
  category: "Dynamic Programming",
  patterns: ["DP"],
  url: "https://leetcode.com/problems/longest-palindromic-substring/",
  description: `Given a string \`s\`, return the **longest palindromic substring** in \`s\`.`,
  examples: [
    {
      "input": "s = \"babad\"",
      "output": "\"bab\"",
      "explanation": "\"aba\" is also a valid answer."
    },
    {
      "input": "s = \"cbbd\"",
      "output": "\"bb\""
    }
  ],
  constraints: [
    "1 <= s.length <= 1000",
    "s consist of only digits and English letters."
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
    string expand(string&s, int l, int r){
        // Write your code here
        return "";
    }
public:
    string longestPalindrome(string s){
        // Write your code here
        return "";
    }
};

int main(){
    Solution sol;
    cout<<sol.longestPalindrome("babad")<<endl; // bab
    cout<<sol.longestPalindrome("cbbd")<<endl;  // bb
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
    string expand(string&s, int l, int r){
        // Write your code here
        return "";
    }
public:
    string longestPalindrome(string s){
        // Write your code here
        return "";
    }
};

int main(){
    Solution sol;
    cout<<sol.longestPalindrome("babad")<<endl; // bab
    cout<<sol.longestPalindrome("cbbd")<<endl;  // bb
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
    string expand(string&s, int l, int r){
        // Write your code here
        return "";
    }
public:
    string longestPalindrome(string s){
        // Write your code here
        return "";
    }
};

int main(){
    Solution sol;
    cout<<sol.longestPalindrome("babad")<<endl; // bab
    cout<<sol.longestPalindrome("cbbd")<<endl;  // bb
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
    string expand(string&s, int l, int r){
        while(l>=0&&r<(int)s.size()&&s[l]==s[r]){l--;r++;}
        return s.substr(l+1,r-l-1);
    }
public:
    string longestPalindrome(string s){
        string res="";
        for(int i=0;i<(int)s.size();i++){
            string odd=expand(s,i,i), even=expand(s,i,i+1);
            if(odd.size()>res.size()) res=odd;
            if(even.size()>res.size()) res=even;
        }
        return res;
    }
};

int main(){
    Solution sol;
    cout<<sol.longestPalindrome("babad")<<endl; // bab
    cout<<sol.longestPalindrome("cbbd")<<endl;  // bb
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import Optional

class Solution:
    def expand(self, s: str, left: int, right: int) -> str:
        # Write your code here
        return ""
    def longestPalindrome(self, s: str) -> str:
        # Write your code here
        return ""
if __name__ == '__main__':
    sol = Solution()
    print(sol.longestPalindrome("babad"))  # bab
    print(sol.longestPalindrome("cbbd"))  # bb`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Recursively solve all subproblems, recalculating overlapping states (exponential runtime).`,
        code: `# Brute Force Approach
# TODO: Implement brute force
from typing import Optional

class Solution:
    def expand(self, s: str, left: int, right: int) -> str:
        # Write your code here
        return ""
    def longestPalindrome(self, s: str) -> str:
        # Write your code here
        return ""
if __name__ == '__main__':
    sol = Solution()
    print(sol.longestPalindrome("babad"))  # bab
    print(sol.longestPalindrome("cbbd"))  # bb`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Top-down memoization (recursion + cache) to store and reuse solved subproblem states.`,
        code: `# Better Solution
# TODO: Implement optimized approach
from typing import Optional

class Solution:
    def expand(self, s: str, left: int, right: int) -> str:
        # Write your code here
        return ""
    def longestPalindrome(self, s: str) -> str:
        # Write your code here
        return ""
if __name__ == '__main__':
    sol = Solution()
    print(sol.longestPalindrome("babad"))  # bab
    print(sol.longestPalindrome("cbbd"))  # bb`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Bottom-up tabulation (iterative array/matrix updates) to compute states sequentially in polynomial time.`,
        code: `from typing import Optional

class Solution:
    def expand(self, s: str, left: int, right: int) -> str:
        while left >= 0 and right < len(s) and s[left] == s[right]:
            left -= 1
            right += 1
        return s[left + 1:right]

    def longestPalindrome(self, s: str) -> str:
        res = ""
        for i in range(len(s)):
            odd = self.expand(s, i, i)
            even = self.expand(s, i, i + 1)
            if len(odd) > len(res):
                res = odd
            if len(even) > len(res):
                res = even
        return res

if __name__ == '__main__':
    sol = Solution()
    print(sol.longestPalindrome("babad"))  # bab
    print(sol.longestPalindrome("cbbd"))  # bb`
      }
    }
  }
};

export default problem;
