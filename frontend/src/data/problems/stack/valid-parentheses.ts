import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "valid-parentheses",
  title: "Valid Parentheses",
  difficulty: "Easy",
  category: "Stack",
  patterns: ["Stack"],
  url: "https://leetcode.com/problems/valid-parentheses/",
  description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
  examples: [
    {
      "input": "s = \"()\"",
      "output": "true"
    },
    {
      "input": "s = \"()[]{}\"",
      "output": "true"
    },
    {
      "input": "s = \"(]\"",
      "output": "false"
    }
  ],
  constraints: [
    "1 <= s.length <= 10^4",
    "s consists of parentheses only '()[]{}'."
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        unordered_map<char, char> pairs = {{')', '('}, {']', '['}, {'}', '{'}};
        for (char c : s) {
            if (c == '(' || c == '[' || c == '{') st.push(c);
            else {
                if (st.empty() || st.top() != pairs[c]) return false;
                st.pop();
            }
        }
        return st.empty();
    }
};

int main() {
    Solution sol;
    cout << boolalpha;
    cout << sol.isValid("()[]{}") << endl; // true
    cout << sol.isValid("(]")    << endl;  // false
    cout << sol.isValid("{[]}")  << endl;  // true
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
public:
    bool isValid(string s) {
        stack<char> st;
        unordered_map<char, char> pairs = {{')', '('}, {']', '['}, {'}', '{'}};
        for (char c : s) {
            if (c == '(' || c == '[' || c == '{') st.push(c);
            else {
                if (st.empty() || st.top() != pairs[c]) return false;
                st.pop();
            }
        }
        return st.empty();
    }
};

int main() {
    Solution sol;
    cout << boolalpha;
    cout << sol.isValid("()[]{}") << endl; // true
    cout << sol.isValid("(]")    << endl;  // false
    cout << sol.isValid("{[]}")  << endl;  // true
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
public:
    bool isValid(string s) {
        stack<char> st;
        unordered_map<char, char> pairs = {{')', '('}, {']', '['}, {'}', '{'}};
        for (char c : s) {
            if (c == '(' || c == '[' || c == '{') st.push(c);
            else {
                if (st.empty() || st.top() != pairs[c]) return false;
                st.pop();
            }
        }
        return st.empty();
    }
};

int main() {
    Solution sol;
    cout << boolalpha;
    cout << sol.isValid("()[]{}") << endl; // true
    cout << sol.isValid("(]")    << endl;  // false
    cout << sol.isValid("{[]}")  << endl;  // true
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
public:
    bool isValid(string s) {
        stack<char> st;
        unordered_map<char, char> pairs = {{')', '('}, {']', '['}, {'}', '{'}};
        for (char c : s) {
            if (c == '(' || c == '[' || c == '{') st.push(c);
            else {
                if (st.empty() || st.top() != pairs[c]) return false;
                st.pop();
            }
        }
        return st.empty();
    }
};

int main() {
    Solution sol;
    cout << boolalpha;
    cout << sol.isValid("()[]{}") << endl; // true
    cout << sol.isValid("(]")    << endl;  // false
    cout << sol.isValid("{[]}")  << endl;  // true
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def isValid(self, s: str) -> bool:
        # Write your code here
        return False
if __name__ == '__main__':
    sol = Solution()
    print(sol.isValid("()[]{}"))  # True
    print(sol.isValid("(]")    )  # False
    print(sol.isValid("{[]}")  )  # True`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Generate and check all paths or elements using nested loop backtracking.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from typing import List

class Solution:
    def isValid(self, s: str) -> bool:
        # Write your code here
        return False
if __name__ == '__main__':
    sol = Solution()
    print(sol.isValid("()[]{}"))  # True
    print(sol.isValid("(]")    )  # False
    print(sol.isValid("{[]}")  )  # True`
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
    def isValid(self, s: str) -> bool:
        # Write your code here
        return False
if __name__ == '__main__':
    sol = Solution()
    print(sol.isValid("()[]{}"))  # True
    print(sol.isValid("(]")    )  # False
    print(sol.isValid("{[]}")  )  # True`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Maintain a monotonic stack to resolve nearest smaller/greater elements in a single linear pass.`,
        code: `from typing import List

class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        pairs = {')': '(', ']': '[', '}': '{'}
        for c in s:
            if c in ['(', '[', '{']:
                stack.append(c)
            else:
                if not stack or stack.pop() != pairs[c]:
                    return False
        return not stack


if __name__ == '__main__':
    sol = Solution()
    print(sol.isValid("()[]{}"))  # True
    print(sol.isValid("(]")    )  # False
    print(sol.isValid("{[]}")  )  # True`
      }
    }
  }
};

export default problem;
