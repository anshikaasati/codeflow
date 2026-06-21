import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "permutation-in-string",
  title: "Permutation in String",
  difficulty: "Medium",
  category: "Sliding Window",
  patterns: ["Sliding Window"],
  url: "https://leetcode.com/problems/permutation-in-string/",
  description: "Given two strings `s1` and `s2`, return `true` if `s2` contains a permutation of `s1`, or `false` otherwise.\n\nIn other words, return `true` if one of `s1`'s permutations is the substring of `s2`.",
  examples: [
  {
    "input": "s1 = \"ab\", s2 = \"eidbaooo\"",
    "output": "true",
    "explanation": "s2 contains one permutation of s1 (\"ba\")."
  },
  {
    "input": "s1 = \"ab\", s2 = \"eidboaoo\"",
    "output": "false"
  }
],
  constraints: [
  "1 <= s1.length, s2.length <= 10^4",
  "s1 and s2 consist of lowercase English letters."
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    bool checkInclusion(string s1, string s2) {
        // Write your code here
        return false;
    }
};

int main() {
    Solution sol;
    cout << boolalpha;
    cout << sol.checkInclusion("ab", "eidbaooo") << endl; // true
    cout << sol.checkInclusion("ab", "eidboaoo") << endl; // false
    return 0;
}`,
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    bool checkInclusion(string s1, string s2) {
        if (s1.size() > s2.size()) return false;
        vector<int> freq1(26, 0), freq2(26, 0);
        for (char c : s1) freq1[c - 'a']++;
        for (int i = 0; i < (int)s1.size(); i++) freq2[s2[i] - 'a']++;

        for (int i = (int)s1.size(); i < (int)s2.size(); i++) {
            if (freq1 == freq2) return true;
            freq2[s2[i] - 'a']++;
            freq2[s2[i - s1.size()] - 'a']--;
        }
        return freq1 == freq2;
    }
};

int main() {
    Solution sol;
    cout << boolalpha;
    cout << sol.checkInclusion("ab", "eidbaooo") << endl; // true
    cout << sol.checkInclusion("ab", "eidboaoo") << endl; // false
    return 0;
}`
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        # Write your code here
        return False
if __name__ == '__main__':
    sol = Solution()
    print(sol.checkInclusion("ab", "eidbaooo"))  # True
    print(sol.checkInclusion("ab", "eidboaoo"))  # False`,
      solutionCode: `from typing import List

class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        if len(s1) > len(s2):
            return False
        freq1 = [0] * 26
        freq2 = [0] * 26
        for c in s1:
            freq1[ord(c) - ord('a')] += 1
        for i in range(len(s1)):
            freq2[ord(s2[i]) - ord('a')] += 1

        for i in range(len(s1), len(s2)):
            if freq1 == freq2:
                return True
            freq2[ord(s2[i]) - ord('a')] += 1
            freq2[ord(s2[i - len(s1)]) - ord('a')] -= 1
        return freq1 == freq2


if __name__ == '__main__':
    sol = Solution()
    print(sol.checkInclusion("ab", "eidbaooo"))  # True
    print(sol.checkInclusion("ab", "eidboaoo"))  # False`
    }
  }
};

export default problem;
