import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "longest-repeating-character-replacement",
  title: "Longest Repeating Character Replacement",
  difficulty: "Medium",
  category: "Sliding Window",
  patterns: ["Sliding Window"],
  url: "https://leetcode.com/problems/longest-repeating-character-replacement/",
  description: `You are given a string \`s\` and an integer \`k\`. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most \`k\` times.

Return the length of the longest substring containing the same letter you can get after performing the above operations.`,
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
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    cout<<sol.characterReplacement("ABAB",2)<<endl; // 4
    cout<<sol.characterReplacement("AABABBA",1)<<endl; // 4
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
    int characterReplacement(string s, int k) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    cout<<sol.characterReplacement("ABAB",2)<<endl; // 4
    cout<<sol.characterReplacement("AABABBA",1)<<endl; // 4
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
    int characterReplacement(string s, int k) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    cout<<sol.characterReplacement("ABAB",2)<<endl; // 4
    cout<<sol.characterReplacement("AABABBA",1)<<endl; // 4
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
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    print(sol.characterReplacement("ABAB", 2))  # 4
    print(sol.characterReplacement("AABABBA", 1))  # 4`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Recompute metrics for all possible subarrays or substrings using nested loops.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from typing import List

class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    print(sol.characterReplacement("ABAB", 2))  # 4
    print(sol.characterReplacement("AABABBA", 1))  # 4`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Use a fixed-size window or track state with extra hash tables or collections.`,
        code: `// Better Solution
// TODO: Implement optimized approach
from typing import List

class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    print(sol.characterReplacement("ABAB", 2))  # 4
    print(sol.characterReplacement("AABABBA", 1))  # 4`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Use a dynamically resizing sliding window with single-pass updates to locate the target range in linear time.`,
        code: `from typing import List

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
      }
    }
  }
};

export default problem;
