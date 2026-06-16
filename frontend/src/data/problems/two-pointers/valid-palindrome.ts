import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "valid-palindrome",
  title: "Valid Palindrome",
  difficulty: "Easy",
  category: "Two Pointers",
  url: "https://leetcode.com/problems/valid-palindrome/",
  description: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.\n\nGiven a string `s`, return `true` if it is a palindrome, or `false` otherwise.",
  examples: [
  {
    "input": "s = \"A man, a plan, a canal: Panama\"",
    "output": "true",
    "explanation": "\"amanaplanacanalpanama\" is a palindrome."
  },
  {
    "input": "s = \"race a car\"",
    "output": "false",
    "explanation": "\"raceacar\" is not a palindrome."
  }
],
  constraints: [
  "1 <= s.length <= 2 * 10^5",
  "s consists only of printable ASCII characters."
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    bool isPalindrome(string s) {
        int l = 0, r = (int)s.size() - 1;
        while (l < r) {
            while (l < r && !isalnum(s[l])) l++;
            while (l < r && !isalnum(s[r])) r--;
            if (tolower(s[l]) != tolower(s[r])) return false;
            l++; r--;
        }
        return true;
    }
};

int main() {
    Solution sol;
    cout << boolalpha;
    cout << sol.isPalindrome("A man, a plan, a canal: Panama") << endl; // true
    cout << sol.isPalindrome("race a car") << endl;                     // false
    return 0;
}`
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def isPalindrome(self, s: str) -> bool:
        l, r = 0, len(s) - 1
        while l < r:
            while l < r and not s[l].isalnum():
                l += 1
            while l < r and not s[r].isalnum():
                r -= 1
            if s[l].lower() != s[r].lower():
                return False
            l += 1
            r -= 1
        return True

if __name__ == '__main__':
    sol = Solution()
    print(sol.isPalindrome("A man, a plan, a canal: Panama"))  # True
    print(sol.isPalindrome("race a car"))                      # False`
    }
  }
};

export default problem;
