import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "group-anagrams",
  title: "Group Anagrams",
  difficulty: "Medium",
  category: "Arrays & Hashing",
  url: "https://leetcode.com/problems/group-anagrams/",
  description: "Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.\n\nAn Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
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
    },
    python: {
      starterCode: `from typing import List

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
    },
    java: {
      starterCode: `import java.util.*;

class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> groups = new HashMap<>();
        for (String s : strs) {
            char[] key = s.toCharArray();
            Arrays.sort(key);
            String sortedKey = new String(key);
            groups.computeIfAbsent(sortedKey, k -> new ArrayList<>()).add(s);
        }
        return new ArrayList<>(groups.values());
    }
}

public class Main {
    public static void main(String[] args) {
        Solution sol = new Solution();
        String[] strs = {"eat","tea","tan","ate","nat","bat"};
        List<List<String>> groups = sol.groupAnagrams(strs);
        for (List<String> g : groups) {
            for (String s : g) System.out.print(s + " ");
            System.out.println();
        }
    }
}`
    }
  }
};

export default problem;
