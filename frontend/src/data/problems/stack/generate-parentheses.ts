import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "generate-parentheses",
  title: "Generate Parentheses",
  difficulty: "Medium",
  category: "Stack",
  patterns: ["Stack"],
  url: "https://leetcode.com/problems/generate-parentheses/",
  description: `Given \`n\` pairs of parentheses, write a function to *generate all combinations of well-formed parentheses*.`,
  examples: [
    {
      "input": "n = 3",
      "output": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]"
    },
    {
      "input": "n = 1",
      "output": "[\"()\"]"
    }
  ],
  constraints: [
    "1 <= n <= 8"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
    void bt(int open, int close, int n, string& cur, vector<string>& res) {
        // Write your code here
    }
public:
    vector<string> generateParenthesis(int n) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    for (auto& s:sol.generateParenthesis(3)) cout<<s<<" ";
    cout<<endl;
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Generate and check all paths or elements using nested loop backtracking.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;

class Solution {
    void bt(int open, int close, int n, string& cur, vector<string>& res) {
        // Write your code here
    }
public:
    vector<string> generateParenthesis(int n) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    for (auto& s:sol.generateParenthesis(3)) cout<<s<<" ";
    cout<<endl;
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Use extra stacks or auxiliary memory to store elements and retrieve them on demand.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;

class Solution {
    void bt(int open, int close, int n, string& cur, vector<string>& res) {
        // Write your code here
    }
public:
    vector<string> generateParenthesis(int n) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    for (auto& s:sol.generateParenthesis(3)) cout<<s<<" ";
    cout<<endl;
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Maintain a monotonic stack to resolve nearest smaller/greater elements in a single linear pass.`,
        code: `#include <bits/stdc++.h>
using namespace std;

class Solution {
    void bt(int open, int close, int n, string& cur, vector<string>& res) {
        if ((int)cur.size()==2*n) { res.push_back(cur); return; }
        if (open<n)  { cur+='('; bt(open+1,close,n,cur,res); cur.pop_back(); }
        if (close<open){ cur+=')'; bt(open,close+1,n,cur,res); cur.pop_back(); }
    }
public:
    vector<string> generateParenthesis(int n) {
        vector<string> res; string cur;
        bt(0,0,n,cur,res); return res;
    }
};

int main() {
    Solution sol;
    for (auto& s:sol.generateParenthesis(3)) cout<<s<<" ";
    cout<<endl;
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def bt(self, open: int, close: int, n: int, cur: str, res: List[str]) -> None:
        # Write your code here
        pass
    def generateParenthesis(self, n: int) -> List[str]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    print(" ".join(sol.generateParenthesis(3)))`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Generate and check all paths or elements using nested loop backtracking.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from typing import List

class Solution:
    def bt(self, open: int, close: int, n: int, cur: str, res: List[str]) -> None:
        # Write your code here
        pass
    def generateParenthesis(self, n: int) -> List[str]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    print(" ".join(sol.generateParenthesis(3)))`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Use extra stacks or auxiliary memory to store elements and retrieve them on demand.`,
        code: `// Better Solution
// TODO: Implement optimized approach
from typing import List

class Solution:
    def bt(self, open: int, close: int, n: int, cur: str, res: List[str]) -> None:
        # Write your code here
        pass
    def generateParenthesis(self, n: int) -> List[str]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    print(" ".join(sol.generateParenthesis(3)))`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Maintain a monotonic stack to resolve nearest smaller/greater elements in a single linear pass.`,
        code: `from typing import List

class Solution:
    def bt(self, open: int, close: int, n: int, cur: str, res: List[str]) -> None:
        if len(cur) == 2 * n:
            res.append(cur)
            return
        if open < n:
            self.bt(open + 1, close, n, cur + "(", res)
        if close < open:
            self.bt(open, close + 1, n, cur + ")", res)

    def generateParenthesis(self, n: int) -> List[str]:
        res = []
        self.bt(0, 0, n, "", res)
        return res


if __name__ == '__main__':
    sol = Solution()
    print(" ".join(sol.generateParenthesis(3)))`
      }
    }
  }
};

export default problem;
