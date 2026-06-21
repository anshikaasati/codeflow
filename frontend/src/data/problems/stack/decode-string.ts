import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "decode-string",
  title: "Decode String",
  difficulty: "Medium",
  category: "Stack",
  patterns: ["Stack"],
  url: "https://leetcode.com/problems/decode-string/",
  description: `Given an encoded string, return its decoded string.

The encoding rule is: \`k[encoded_string]\`, where the \`encoded_string\` inside the square brackets is being repeated exactly \`k\` times. Note that \`k\` is guaranteed to be a positive integer.

You may assume that the input string is always valid; there are no extra white spaces, square brackets are well-formed, etc. Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, \`k\`. For example, there will not be input like \`3a\` or \`2[4]\`.`,
  examples: [
    {
      "input": "s = \"3[a]2[bc]\"",
      "output": "\"aaabcbc\""
    },
    {
      "input": "s = \"3[a2[c]]\"",
      "output": "\"accaccacc\""
    },
    {
      "input": "s = \"2[abc]3[cd]ef\"",
      "output": "\"abcabccdcdcdef\""
    }
  ],
  constraints: [
    "1 <= s.length <= 30",
    "s consists of lowercase English letters, digits, and square brackets '[]'.",
    "s is guaranteed to be a valid input.",
    "All the integers in s are in the range [1, 300]."
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    string decodeString(string s) {
        // Write your code here
        return "";
    }
};

int main() {
    Solution sol;
    cout<<sol.decodeString("3[a]2[bc]")<<endl;   // aaabcbc
    cout<<sol.decodeString("3[a2[c]]")<<endl;     // accaccacc
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
    string decodeString(string s) {
        // Write your code here
        return "";
    }
};

int main() {
    Solution sol;
    cout<<sol.decodeString("3[a]2[bc]")<<endl;   // aaabcbc
    cout<<sol.decodeString("3[a2[c]]")<<endl;     // accaccacc
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
    string decodeString(string s) {
        // Write your code here
        return "";
    }
};

int main() {
    Solution sol;
    cout<<sol.decodeString("3[a]2[bc]")<<endl;   // aaabcbc
    cout<<sol.decodeString("3[a2[c]]")<<endl;     // accaccacc
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
    string decodeString(string s) {
        stack<int> counts; stack<string> strs;
        string curr=""; int k=0;
        for (char c:s) {
            if (isdigit(c)) k=k*10+(c-'0');
            else if (c=='[') { counts.push(k); strs.push(curr); k=0; curr=""; }
            else if (c==']') {
                int rep=counts.top(); counts.pop();
                string prev=strs.top(); strs.pop();
                for (int i=0;i<rep;i++) prev+=curr;
                curr=prev;
            } else curr+=c;
        }
        return curr;
    }
};

int main() {
    Solution sol;
    cout<<sol.decodeString("3[a]2[bc]")<<endl;   // aaabcbc
    cout<<sol.decodeString("3[a2[c]]")<<endl;     // accaccacc
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def decodeString(self, s: str) -> str:
        # Write your code here
        return ""
if __name__ == '__main__':
    sol = Solution()
    print(sol.decodeString("3[a]2[bc]"))   # aaabcbc
    print(sol.decodeString("3[a2[c]]"))     # accaccacc`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Generate and check all paths or elements using nested loop backtracking.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from typing import List

class Solution:
    def decodeString(self, s: str) -> str:
        # Write your code here
        return ""
if __name__ == '__main__':
    sol = Solution()
    print(sol.decodeString("3[a]2[bc]"))   # aaabcbc
    print(sol.decodeString("3[a2[c]]"))     # accaccacc`
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
    def decodeString(self, s: str) -> str:
        # Write your code here
        return ""
if __name__ == '__main__':
    sol = Solution()
    print(sol.decodeString("3[a]2[bc]"))   # aaabcbc
    print(sol.decodeString("3[a2[c]]"))     # accaccacc`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Maintain a monotonic stack to resolve nearest smaller/greater elements in a single linear pass.`,
        code: `from typing import List

class Solution:
    def decodeString(self, s: str) -> str:
        counts = []
        strs = []
        curr = ""
        k = 0
        for c in s:
            if c.isdigit():
                k = k * 10 + int(c)
            elif c == '[':
                counts.append(k)
                strs.append(curr)
                k = 0
                curr = ""
            elif c == ']':
                rep = counts.pop()
                prev = strs.pop()
                for _ in range(rep):
                    prev += curr
                curr = prev
            else:
                curr += c
        return curr

if __name__ == '__main__':
    sol = Solution()
    print(sol.decodeString("3[a]2[bc]"))   # aaabcbc
    print(sol.decodeString("3[a2[c]]"))     # accaccacc`
      }
    }
  }
};

export default problem;
