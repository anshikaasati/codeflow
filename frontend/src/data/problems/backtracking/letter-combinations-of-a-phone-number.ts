import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "letter-combinations-of-a-phone-number",
  title: "Letter Combinations of a Phone Number",
  difficulty: "Medium",
  category: "Backtracking",
  url: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
  description: "Given a string containing digits from `2-9` inclusive, return all possible letter combinations that the number could represent. Return the answer in **any order**.\n\nA mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.\n\n2: abc, 3: def, 4: ghi, 5: jkl, 6: mno, 7: pqrs, 8: tuv, 9: wxyz",
  examples: [
  {
    "input": "digits = \"23\"",
    "output": "[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]"
  },
  {
    "input": "digits = \"\"",
    "output": "[]"
  },
  {
    "input": "digits = \"2\"",
    "output": "[\"a\",\"b\",\"c\"]"
  }
],
  constraints: [
  "0 <= digits.length <= 4",
  "digits[i] is a digit in the range ['2', '9']."
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
    unordered_map<char, string> keyMap = {
        {'2',"abc"},{'3',"def"},{'4',"ghi"},{'5',"jkl"},
        {'6',"mno"},{'7',"pqrs"},{'8',"tuv"},{'9',"wxyz"}
    };
    void backtrack(string& digits, int i, string& curr, vector<string>& res) {
        if (i == (int)digits.size()) { res.push_back(curr); return; }
        for (char c : keyMap[digits[i]]) {
            curr.push_back(c);
            backtrack(digits, i + 1, curr, res);
            curr.pop_back();
        }
    }
public:
    vector<string> letterCombinations(string digits) {
        if (digits.empty()) return {};
        vector<string> res; string curr;
        backtrack(digits, 0, curr, res);
        return res;
    }
};

int main() {
    Solution sol;
    auto res = sol.letterCombinations("23");
    for (auto& s : res) cout << s << " "; // ad ae af bd be bf cd ce cf
    cout << endl;
    return 0;
}`
    },
    python: {
      starterCode: `from typing import Dict, List

class Solution:
    def __init__(self):
        self.keyMap: Dict[str, str] = {
            '2': "abc", '3': "def", '4': "ghi", '5': "jkl",
            '6': "mno", '7': "pqrs", '8': "tuv", '9': "wxyz"
        }

    def backtrack(self, digits: str, i: int, curr: List[str], res: List[str]) -> None:
        if i == len(digits):
            res.append(''.join(curr))
            return
        for c in self.keyMap[digits[i]]:
            curr.append(c)
            self.backtrack(digits, i + 1, curr, res)
            curr.pop()

    def letterCombinations(self, digits: str) -> List[str]:
        if not digits:
            return []
        res: List[str] = []
        curr: List[str] = []
        self.backtrack(digits, 0, curr, res)
        return res

if __name__ == "__main__":
    sol = Solution()
    res = sol.letterCombinations("23")
    print(' '.join(res))  # ad ae af bd be bf cd ce cf`
    },
    java: {
      starterCode: `import java.util.*;

class Solution {
    private Map<Character, String> keyMap = new HashMap<>();

    public Solution() {
        keyMap.put('2', "abc");
        keyMap.put('3', "def");
        keyMap.put('4', "ghi");
        keyMap.put('5', "jkl");
        keyMap.put('6', "mno");
        keyMap.put('7', "pqrs");
        keyMap.put('8', "tuv");
        keyMap.put('9', "wxyz");
    }

    private void backtrack(String digits, int i, StringBuilder curr, List<String> res) {
        if (i == digits.length()) {
            res.add(curr.toString());
            return;
        }
        for (char c : keyMap.get(digits.charAt(i)).toCharArray()) {
            curr.append(c);
            backtrack(digits, i + 1, curr, res);
            curr.deleteCharAt(curr.length() - 1);
        }
    }

    public List<String> letterCombinations(String digits) {
        if (digits.isEmpty()) {
            return new ArrayList<>();
        }
        List<String> res = new ArrayList<>();
        StringBuilder curr = new StringBuilder();
        backtrack(digits, 0, curr, res);
        return res;
    }
}

public class Main {
    public static void main(String[] args) {
        Solution sol = new Solution();
        List<String> res = sol.letterCombinations("23");
        System.out.println(String.join(" ", res)); // ad ae af bd be bf cd ce cf
    }
}`
    }
  }
};

export default problem;
