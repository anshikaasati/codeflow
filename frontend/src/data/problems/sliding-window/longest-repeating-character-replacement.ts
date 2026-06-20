import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "longest-repeating-character-replacement",
  title: "Longest Repeating Character Replacement",
  difficulty: "Medium",
  category: "Sliding Window",
  url: "https://leetcode.com/problems/longest-repeating-character-replacement/",
  description: "You are given a string `s` and an integer `k`. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most `k` times.\n\nReturn the length of the longest substring containing the same letter you can get after performing the above operations.",
  examples: [
  {
    "input": "s = \"ABAB\", k = 2",
    "output": "4",
    "explanation": "Replace the two 'A's with two 'B's or vice versa."
  },
  {
    "input": "s = \"AABABBA\", k = 1",
    "output": "4",
    "explanation": "Replace the one 'A' in the middle with 'B' and form \"AABBBBA\". The substring \"BBBB\" has the longest repeating character, which is 4."
  }
],
  constraints: [
  "1 <= s.length <= 10^5",
  "s consists of only uppercase English letters.",
  "0 <= k <= s.length"
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int characterReplacement(string s, int k) {
        int freq[26]={}, maxFreq=0, l=0, res=0;
        for (int r=0; r<(int)s.size(); r++) {
            maxFreq=max(maxFreq, ++freq[s[r]-'A']);
            while (r-l+1-maxFreq>k) freq[s[l++]-'A']--;
            res=max(res, r-l+1);
        }
        return res;
    }
};

int main() {
    Solution sol;
    cout<<sol.characterReplacement("ABAB",2)<<endl; // 4
    cout<<sol.characterReplacement("AABABBA",1)<<endl; // 4
    return 0;
}`
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        freq = [0] * 26
        max_freq = 0
        l = 0
        res = 0
        for r in range(len(s)):
            max_freq = max(max_freq, freq[ord(s[r]) - ord('A')])
            while r - l + 1 - max_freq > k:
                freq[ord(s[l]) - ord('A')] -= 1
                l += 1
            res = max(res, r - l + 1)
        return res

if __name__ == '__main__':
    sol = Solution()
    print(sol.characterReplacement("ABAB", 2))  # 4
    print(sol.characterReplacement("AABABBA", 1))  # 4`
    },
    java: {
      starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.characterReplacement("ABAB", 2));    // 4
        System.out.println(sol.characterReplacement("AABABBA", 1)); // 4
    }
}

class Solution {
    public int characterReplacement(String s, int k) {
        int[] freq = new int[26];
        int maxFreq = 0;
        int l = 0;
        int res = 0;
        for (int r = 0; r < s.length(); r++) {
            freq[s.charAt(r) - 'A']++;
            maxFreq = Math.max(maxFreq, freq[s.charAt(r) - 'A']);
            while (r - l + 1 - maxFreq > k) {
                freq[s.charAt(l) - 'A']--;
                l++;
            }
            res = Math.max(res, r - l + 1);
        }
        return res;
    }
}`
    }
  }
};

export default problem;

