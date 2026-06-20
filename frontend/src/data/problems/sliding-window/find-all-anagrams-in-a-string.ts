import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "find-all-anagrams-in-a-string",
  title: "Find All Anagrams in a String",
  difficulty: "Medium",
  category: "Sliding Window",
  url: "https://leetcode.com/problems/find-all-anagrams-in-a-string/",
  description: "Given two strings `s` and `p`, return an array of all the start indices of `p`'s **anagrams** in `s`. You may return the answer in **any order**.\n\nAn **anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
  examples: [
  {
    "input": "s = \"cbaebabacd\", p = \"abc\"",
    "output": "[0,6]",
    "explanation": "The substring with start index = 0 is \"cba\", which is an anagram of \"abc\".\nThe substring with start index = 6 is \"bac\", which is an anagram of \"abc\"."
  },
  {
    "input": "s = \"abab\", p = \"ab\"",
    "output": "[0,1,2]",
    "explanation": "The substring with start index = 0 is \"ab\", which is an anagram of \"ab\".\nThe substring with start index = 1 is \"ba\", which is an anagram of \"ab\".\nThe substring with start index = 2 is \"ab\", which is an anagram of \"ab\"."
  }
],
  constraints: [
  "1 <= s.length, p.length <= 3 * 10^4",
  "s and p consist of lowercase English letters."
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
        if (s.size()<p.size()) return {};
        int fp[26]={}, fs[26]={};
        for (char c:p) fp[c-'a']++;
        for (int i=0;i<(int)p.size();i++) fs[s[i]-'a']++;
        vector<int> res;
        if (equal(begin(fp),end(fp),begin(fs))) res.push_back(0);
        for (int i=p.size();i<(int)s.size();i++) {
            fs[s[i]-'a']++;
            fs[s[i-p.size()]-'a']--;
            if (equal(begin(fp),end(fp),begin(fs))) res.push_back(i-p.size()+1);
        }
        return res;
    }
};

int main() {
    Solution sol;
    for (int v:sol.findAnagrams("cbaebabacd","abc")) cout<<v<<" "; // 0 6
    cout<<endl;
    return 0;
}`
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def findAnagrams(self, s: str, p: str) -> List[int]:
        if len(s) < len(p): return []
        fp = [0] * 26
        fs = [0] * 26
        for c in p: fp[ord(c) - ord('a')] += 1
        for i in range(len(p)):
            fs[ord(s[i]) - ord('a')] += 1
        res = []
        if fp == fs: res.append(0)
        for i in range(len(p), len(s)):
            fs[ord(s[i]) - ord('a')] += 1
            fs[ord(s[i - len(p)]) - ord('a')] -= 1
            if fp == fs: res.append(i - len(p) + 1)
        return res

if __name__ == '__main__':
    sol = Solution()
    print(*sol.findAnagrams("cbaebabacd", "abc"))  # 0 6`
    },
    java: {
      starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Solution sol = new Solution();
        List<Integer> res = sol.findAnagrams("cbaebabacd", "abc");
        for (int x : res) {
            System.out.print(x + " ");
        }
        System.out.println();
    }
}

class Solution {
    public List<Integer> findAnagrams(String s, String p) {
        List<Integer> res = new ArrayList<>();
        if (s.length() < p.length()) return res;
        int[] fp = new int[26];
        int[] fs = new int[26];
        for (int i = 0; i < p.length(); i++) {
            fp[p.charAt(i) - 'a']++;
            fs[s.charAt(i) - 'a']++;
        }
        if (Arrays.equals(fp, fs)) res.add(0);
        for (int i = p.length(); i < s.length(); i++) {
            fs[s.charAt(i) - 'a']++;
            fs[s.charAt(i - p.length()) - 'a']--;
            if (Arrays.equals(fp, fs)) {
                res.add(i - p.length() + 1);
            }
        }
        return res;
    }
}`
    }
  }
};

export default problem;

