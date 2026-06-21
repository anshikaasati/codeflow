import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "longest-substring-without-repeating-characters",
  title: "Longest Substring Without Repeating Characters",
  difficulty: "Medium",
  category: "Sliding Window",
  patterns: ["Sliding Window"],
  url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
  description: "Given a string `s`, find the length of the longest substring without repeating characters.",
  examples: [
  {
    "input": "s = \"abcabcbb\"",
    "output": "3",
    "explanation": "The answer is \"abc\", with the length of 3."
  },
  {
    "input": "s = \"bbbbb\"",
    "output": "1",
    "explanation": "The answer is \"b\", with the length of 1."
  },
  {
    "input": "s = \"pwwkew\"",
    "output": "3",
    "explanation": "The answer is \"wke\", with the length of 3. Note that the answer must be a substring, \"pwke\" is a subsequence and not a substring."
  }
],
  constraints: [
  "0 <= s.length <= 5 * 10^4",
  "s consists of English letters, digits, symbols and spaces."
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        unordered_map<char, int> lastSeen;
        int maxLen = 0, start = 0;
        for (int i = 0; i < (int)s.size(); i++) {
            if (lastSeen.count(s[i]) && lastSeen[s[i]] >= start)
                start = lastSeen[s[i]] + 1;
            lastSeen[s[i]] = i;
            maxLen = max(maxLen, i - start + 1);
        }
        return maxLen;
    }
};

int main() {
    Solution sol;
    cout << sol.lengthOfLongestSubstring("abcabcbb") << endl; // 3
    cout << sol.lengthOfLongestSubstring("bbbbb")    << endl; // 1
    cout << sol.lengthOfLongestSubstring("pwwkew")   << endl; // 3
    return 0;
}`
    },
    python: {
      starterCode: `from typing import Dict

class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        lastSeen: Dict[str, int] = {}
        maxLen: int = 0
        start: int = 0
        for i in range(len(s)):
            if s[i] in lastSeen and lastSeen[s[i]] >= start:
                start = lastSeen[s[i]] + 1
            lastSeen[s[i]] = i
            maxLen = max(maxLen, i - start + 1)
        return maxLen

if __name__ == '__main__':
    sol = Solution()
    print(sol.lengthOfLongestSubstring("abcabcbb"))  # 3
    print(sol.lengthOfLongestSubstring("bbbbb"))     # 1
    print(sol.lengthOfLongestSubstring("pwwkew"))    # 3`
    }
  }
};

export default problem;
