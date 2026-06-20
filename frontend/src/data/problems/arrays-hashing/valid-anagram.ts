import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "valid-anagram",
  title: "Valid Anagram",
  difficulty: "Easy",
  category: "Arrays & Hashing",
  url: "https://leetcode.com/problems/valid-anagram/",
  description: "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.\n\nAn Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
  examples: [
  {
    "input": "s = \"anagram\", t = \"nagaram\"",
    "output": "true"
  },
  {
    "input": "s = \"rat\", t = \"car\"",
    "output": "false"
  }
],
  constraints: [
  "1 <= s.length, t.length <= 5 * 10^4",
  "s and t consist of lowercase English letters."
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    bool isAnagram(string s, string t) {
        if (s.size() != t.size()) return false;
        int freq[26] = {};
        for (char c : s) freq[c - 'a']++;
        for (char c : t) {
            freq[c - 'a']--;
            if (freq[c - 'a'] < 0) return false;
        }
        return true;
    }
};

int main() {
    Solution sol;
    cout << boolalpha;
    cout << sol.isAnagram("anagram", "nagaram") << endl; // true
    cout << sol.isAnagram("rat", "car") << endl;         // false
    return 0;
}`
    },
    python: {
      starterCode: `from typing import Optional

class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False
        freq = [0] * 26
        for c in s:
            freq[ord(c) - ord('a')] += 1
        for c in t:
            freq[ord(c) - ord('a')] -= 1
            if freq[ord(c) - ord('a')] < 0:
                return False
        return True

if __name__ == "__main__":
    sol = Solution()
    print(sol.isAnagram("anagram", "nagaram"))  # true
    print(sol.isAnagram("rat", "car"))           # false`
    },
    java: {
      starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.isAnagram("anagram", "nagaram")); // true
        System.out.println(sol.isAnagram("rat", "car"));         // false
    }
}

class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] freq = new int[26];
        for (int i = 0; i < s.length(); i++) {
            freq[s.charAt(i) - 'a']++;
        }
        for (int i = 0; i < t.length(); i++) {
            freq[t.charAt(i) - 'a']--;
            if (freq[t.charAt(i) - 'a'] < 0) return false;
        }
        return true;
    }
}`
    }
  }
};

export default problem;
