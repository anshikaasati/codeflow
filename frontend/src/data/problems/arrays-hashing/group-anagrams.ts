import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "group-anagrams",
  title: "Group Anagrams",
  difficulty: "Medium",
  category: "Arrays & Hashing",
  patterns: ["Array","HashMap"],
  url: "https://leetcode.com/problems/group-anagrams/",
  description: `Given an array of strings \`strs\`, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
  examples: [
    {
      "input": "strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]",
      "output": "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]",
      "explanation": "All strings in each group are anagrams of each other."
    },
    {
      "input": "strs = [\"\"]",
      "output": "[[\"\"]]"
    }
  ],
  constraints: [
    "1 <= strs.length <= 10^4",
    "0 <= strs[i].length <= 100",
    "strs[i] consists of lowercase English letters."
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<string> strs = {"eat","tea","tan","ate","nat","bat"};
    auto groups = sol.groupAnagrams(strs);
    for (auto& g : groups) {
        for (auto& s : g) cout << s << " ";
        cout << endl;
    }
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Compare all elements or subsegments using nested loops to verify the condition.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<string> strs = {"eat","tea","tan","ate","nat","bat"};
    auto groups = sol.groupAnagrams(strs);
    for (auto& g : groups) {
        for (auto& s : g) cout << s << " ";
        cout << endl;
    }
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Sort the array first to group elements, or use a Hash Set/Map to track seen values.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<string> strs = {"eat","tea","tan","ate","nat","bat"};
    auto groups = sol.groupAnagrams(strs);
    for (auto& g : groups) {
        for (auto& s : g) cout << s << " ";
        cout << endl;
    }
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Use a single pass linear scan with optimized hashing, frequency tables, or in-place marking.`,
        code: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> groups;
        for (string& s : strs) {
            string key = s;
            sort(key.begin(), key.end());
            groups[key].push_back(s);
        }
        vector<vector<string>> res;
        for (auto& [k, v] : groups)
            res.push_back(v);
        return res;
    }
};

int main() {
    Solution sol;
    vector<string> strs = {"eat","tea","tan","ate","nat","bat"};
    auto groups = sol.groupAnagrams(strs);
    for (auto& g : groups) {
        for (auto& s : g) cout << s << " ";
        cout << endl;
    }
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        # Write your code here
        return []
if __name__ == "__main__":
    sol = Solution()
    strs = ["eat","tea","tan","ate","nat","bat"]
    groups = sol.groupAnagrams(strs)
    for g in groups:
        for s in g:
            print(s, end=" ")
        print()`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Compare all elements or subsegments using nested loops to verify the condition.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from typing import List

class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        # Write your code here
        return []
if __name__ == "__main__":
    sol = Solution()
    strs = ["eat","tea","tan","ate","nat","bat"]
    groups = sol.groupAnagrams(strs)
    for g in groups:
        for s in g:
            print(s, end=" ")
        print()`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Sort the array first to group elements, or use a Hash Set/Map to track seen values.`,
        code: `// Better Solution
// TODO: Implement optimized approach
from typing import List

class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        # Write your code here
        return []
if __name__ == "__main__":
    sol = Solution()
    strs = ["eat","tea","tan","ate","nat","bat"]
    groups = sol.groupAnagrams(strs)
    for g in groups:
        for s in g:
            print(s, end=" ")
        print()`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Use a single pass linear scan with optimized hashing, frequency tables, or in-place marking.`,
        code: `from typing import List

class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        groups = {}
        for s in strs:
            key = "".join(sorted(s))
            if key in groups:
                groups[key].append(s)
            else:
                groups[key] = [s]
        return list(groups.values())

if __name__ == "__main__":
    sol = Solution()
    strs = ["eat","tea","tan","ate","nat","bat"]
    groups = sol.groupAnagrams(strs)
    for g in groups:
        for s in g:
            print(s, end=" ")
        print()`
      }
    }
  }
};

export default problem;
