import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "minimum-window-substring",
  title: "Minimum Window Substring",
  difficulty: "Hard",
  category: "Sliding Window",
  patterns: ["Sliding Window"],
  url: "https://leetcode.com/problems/minimum-window-substring/",
  description: `Given two strings \`s\` and \`t\` of lengths \`m\` and \`n\` respectively, return the minimum window substring of \`s\` such that every character in \`t\` (including duplicates) is included in the window. If there is no such substring, return the empty string \`""\`.

The testcases will be generated such that the answer is unique.`,
  examples: [
    {
      "input": "s = \"ADOBECODEBANC\", t = \"ABC\"",
      "output": "\"BANC\"",
      "explanation": "The minimum window substring \"BANC\" includes 'A', 'B', and 'C' from string t."
    },
    {
      "input": "s = \"a\", t = \"a\"",
      "output": "\"a\"",
      "explanation": "The entire string s is the minimum window."
    },
    {
      "input": "s = \"a\", t = \"aa\"",
      "output": "\"\"",
      "explanation": "Both 'a's from t must be included in the window. Since the largest window of s only has one 'a', return empty string."
    }
  ],
  constraints: [
    "m == s.length",
    "n == t.length",
    "1 <= m, n <= 10^5",
    "s and t consist of uppercase and lowercase English letters."
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    string minWindow(string s, string t) {
        // Write your code here
        return "";
    }
};

int main() {
    Solution sol;
    cout << sol.minWindow("ADOBECODEBANC", "ABC") << endl; // "BANC"
    cout << sol.minWindow("a", "a")               << endl; // "a"
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(2^N)",
        spaceComplexity: "O(1)",
        approach: `Recompute metrics for all possible subarrays or substrings using nested loops.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    string minWindow(string s, string t) {
        // Write your code here
        return "";
    }
};

int main() {
    Solution sol;
    cout << sol.minWindow("ADOBECODEBANC", "ABC") << endl; // "BANC"
    cout << sol.minWindow("a", "a")               << endl; // "a"
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(N)",
        approach: `Use a fixed-size window or track state with extra hash tables or collections.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    string minWindow(string s, string t) {
        // Write your code here
        return "";
    }
};

int main() {
    Solution sol;
    cout << sol.minWindow("ADOBECODEBANC", "ABC") << endl; // "BANC"
    cout << sol.minWindow("a", "a")               << endl; // "a"
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Use a dynamically resizing sliding window with single-pass updates to locate the target range in linear time.`,
        code: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    string minWindow(string s, string t) {
        unordered_map<char, int> need, window;
        for (char c : t) need[c]++;

        int have = 0, required = need.size();
        int l = 0, minLen = INT_MAX, start = 0;

        for (int r = 0; r < (int)s.size(); r++) {
            window[s[r]]++;
            if (need.count(s[r]) && window[s[r]] == need[s[r]])
                have++;

            while (have == required) {
                if (r - l + 1 < minLen) {
                    minLen = r - l + 1;
                    start = l;
                }
                window[s[l]]--;
                if (need.count(s[l]) && window[s[l]] < need[s[l]])
                    have--;
                l++;
            }
        }
        return minLen == INT_MAX ? "" : s.substr(start, minLen);
    }
};

int main() {
    Solution sol;
    cout << sol.minWindow("ADOBECODEBANC", "ABC") << endl; // "BANC"
    cout << sol.minWindow("a", "a")               << endl; // "a"
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def minWindow(self, s: str, t: str) -> str:
        # Write your code here
        return ""
if __name__ == '__main__':
    sol = Solution()
    print(sol.minWindow("ADOBECODEBANC", "ABC"))  # BANC
    print(sol.minWindow("a", "a"))               # a`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(2^N)",
        spaceComplexity: "O(1)",
        approach: `Recompute metrics for all possible subarrays or substrings using nested loops.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from typing import List

class Solution:
    def minWindow(self, s: str, t: str) -> str:
        # Write your code here
        return ""
if __name__ == '__main__':
    sol = Solution()
    print(sol.minWindow("ADOBECODEBANC", "ABC"))  # BANC
    print(sol.minWindow("a", "a"))               # a`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(N)",
        approach: `Use a fixed-size window or track state with extra hash tables or collections.`,
        code: `// Better Solution
// TODO: Implement optimized approach
from typing import List

class Solution:
    def minWindow(self, s: str, t: str) -> str:
        # Write your code here
        return ""
if __name__ == '__main__':
    sol = Solution()
    print(sol.minWindow("ADOBECODEBANC", "ABC"))  # BANC
    print(sol.minWindow("a", "a"))               # a`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Use a dynamically resizing sliding window with single-pass updates to locate the target range in linear time.`,
        code: `from typing import List

class Solution:
    def minWindow(self, s: str, t: str) -> str:
        need, window = {}, {}
        for c in t:
            need[c] = need.get(c, 0) + 1

        have, required = 0, len(need)
        l, min_len, start = 0, float('inf'), 0

        for r in range(len(s)):
            window[s[r]] = window.get(s[r], 0) + 1
            if s[r] in need and window[s[r]] == need[s[r]]:
                have += 1

            while have == required:
                if r - l + 1 < min_len:
                    min_len = r - l + 1
                    start = l
                window[s[l]] -= 1
                if s[l] in need and window[s[l]] < need[s[l]]:
                    have -= 1
                l += 1

        return "" if min_len == float('inf') else s[start:start + min_len]

if __name__ == '__main__':
    sol = Solution()
    print(sol.minWindow("ADOBECODEBANC", "ABC"))  # BANC
    print(sol.minWindow("a", "a"))               # a`
      }
    }
  }
};

export default problem;
