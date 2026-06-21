import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "palindromic-substrings",
  title: "Palindromic Substrings",
  difficulty: "Medium",
  category: "Dynamic Programming",
  patterns: ["DP","Memoization"],
  url: "https://leetcode.com/problems/palindromic-substrings/",
  description: `Given a string \`s\`, return the number of **palindromic substrings** in it.

A string is a **palindrome** when it reads the same backward as forward.

A **substring** is a contiguous sequence of characters within the string.`,
  examples: [
    {
      "input": "s = \"abc\"",
      "output": "3",
      "explanation": "Three palindromic strings: \"a\", \"b\", \"c\"."
    },
    {
      "input": "s = \"aaa\"",
      "output": "6",
      "explanation": "Six palindromic strings: \"a\", \"a\", \"a\", \"aa\", \"aa\", \"aaa\"."
    }
  ],
  constraints: [
    "1 <= s.length <= 1000",
    "s consists of lowercase English letters."
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
    int count=0;
    void expand(string&s,int l,int r){
        // Write your code here
    }
public:
    int countSubstrings(string s){
        // Write your code here
        return 0;
    }
};

int main(){
    Solution sol;
    cout<<sol.countSubstrings("abc")<<endl; // 3
    cout<<sol.countSubstrings("aaa")<<endl; // 6
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
    int count=0;
    void expand(string&s,int l,int r){
        // Write your code here
    }
public:
    int countSubstrings(string s){
        // Write your code here
        return 0;
    }
};

int main(){
    Solution sol;
    cout<<sol.countSubstrings("abc")<<endl; // 3
    cout<<sol.countSubstrings("aaa")<<endl; // 6
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
    int count=0;
    void expand(string&s,int l,int r){
        // Write your code here
    }
public:
    int countSubstrings(string s){
        // Write your code here
        return 0;
    }
};

int main(){
    Solution sol;
    cout<<sol.countSubstrings("abc")<<endl; // 3
    cout<<sol.countSubstrings("aaa")<<endl; // 6
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
    int count=0;
    void expand(string&s,int l,int r){
        while(l>=0&&r<(int)s.size()&&s[l]==s[r]){count++;l--;r++;}
    }
public:
    int countSubstrings(string s){
        count = 0;
        for(int i=0;i<(int)s.size();i++){expand(s,i,i);expand(s,i,i+1);}
        return count;
    }
};

int main(){
    Solution sol;
    cout<<sol.countSubstrings("abc")<<endl; // 3
    cout<<sol.countSubstrings("aaa")<<endl; // 6
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List, Optional, Dict, Set, Tuple

class Solution:
    def countSubstrings(self, s: str) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    print(sol.countSubstrings("abc"))  # 3
    print(sol.countSubstrings("aaa"))  # 6`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Recursively solve all subproblems, recalculating overlapping states (exponential runtime).`,
        code: `# Brute Force Approach
# TODO: Implement brute force
from typing import List, Optional, Dict, Set, Tuple

class Solution:
    def countSubstrings(self, s: str) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    print(sol.countSubstrings("abc"))  # 3
    print(sol.countSubstrings("aaa"))  # 6`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Top-down memoization (recursion + cache) to store and reuse solved subproblem states.`,
        code: `# Better Solution
# TODO: Implement optimized approach
from typing import List, Optional, Dict, Set, Tuple

class Solution:
    def countSubstrings(self, s: str) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    print(sol.countSubstrings("abc"))  # 3
    print(sol.countSubstrings("aaa"))  # 6`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Bottom-up tabulation (iterative array/matrix updates) to compute states sequentially in polynomial time.`,
        code: `from typing import List, Optional, Dict, Set, Tuple

class Solution:
    def countSubstrings(self, s: str) -> int:
        count = 0
        def expand(s: str, left: int, right: int) -> None:
            nonlocal count
            while left >= 0 and right < len(s) and s[left] == s[right]:
                count += 1
                left -= 1
                right += 1

        for i in range(len(s)):
            expand(s, i, i)
            expand(s, i, i + 1)
        return count

if __name__ == '__main__':
    sol = Solution()
    print(sol.countSubstrings("abc"))  # 3
    print(sol.countSubstrings("aaa"))  # 6`
      }
    }
  }
};

export default problem;
