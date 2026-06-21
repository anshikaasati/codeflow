import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "find-all-anagrams-in-a-string",
  title: "Find All Anagrams in a String",
  difficulty: "Medium",
  category: "Sliding Window",
  patterns: ["Sliding Window"],
  url: "https://leetcode.com/problems/find-all-anagrams-in-a-string/",
  description: `Given two strings \`s\` and \`p\`, return an array of all the start indices of \`p\`'s **anagrams** in \`s\`. You may return the answer in **any order**.

An **anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
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
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    for (int v:sol.findAnagrams("cbaebabacd","abc")) cout<<v<<" "; // 0 6
    cout<<endl;
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Recompute metrics for all possible subarrays or substrings using nested loops.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    for (int v:sol.findAnagrams("cbaebabacd","abc")) cout<<v<<" "; // 0 6
    cout<<endl;
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Use a fixed-size window or track state with extra hash tables or collections.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    for (int v:sol.findAnagrams("cbaebabacd","abc")) cout<<v<<" "; // 0 6
    cout<<endl;
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Use a dynamically resizing sliding window with single-pass updates to locate the target range in linear time.`,
        code: `#include <bits/stdc++.h>
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
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def findAnagrams(self, s: str, p: str) -> List[int]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    print(*sol.findAnagrams("cbaebabacd", "abc"))  # 0 6`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Recompute metrics for all possible subarrays or substrings using nested loops.`,
        code: `# Brute Force Approach
# TODO: Implement brute force
from typing import List

class Solution:
    def findAnagrams(self, s: str, p: str) -> List[int]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    print(*sol.findAnagrams("cbaebabacd", "abc"))  # 0 6`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Use a fixed-size window or track state with extra hash tables or collections.`,
        code: `# Better Solution
# TODO: Implement optimized approach
from typing import List

class Solution:
    def findAnagrams(self, s: str, p: str) -> List[int]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    print(*sol.findAnagrams("cbaebabacd", "abc"))  # 0 6`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Use a dynamically resizing sliding window with single-pass updates to locate the target range in linear time.`,
        code: `from typing import List

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
      }
    }
  }
};

export default problem;
