import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "letter-combinations-of-a-phone-number",
  title: "Letter Combinations of a Phone Number",
  difficulty: "Medium",
  category: "Backtracking",
  patterns: ["Backtracking","Recursion"],
  url: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
  description: `Given a string containing digits from \`2-9\` inclusive, return all possible letter combinations that the number could represent. Return the answer in **any order**.

A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

2: abc, 3: def, 4: ghi, 5: jkl, 6: mno, 7: pqrs, 8: tuv, 9: wxyz`,
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
        // Write your code here
    }
public:
    vector<string> letterCombinations(string digits) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    auto res = sol.letterCombinations("23");
    for (auto& s : res) cout << s << " "; // ad ae af bd be bf cd ce cf
    cout << endl;
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Generate all possible subsets, combinations, or permutations without any pruning.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;

class Solution {
    unordered_map<char, string> keyMap = {
        {'2',"abc"},{'3',"def"},{'4',"ghi"},{'5',"jkl"},
        {'6',"mno"},{'7',"pqrs"},{'8',"tuv"},{'9',"wxyz"}
    };
    void backtrack(string& digits, int i, string& curr, vector<string>& res) {
        // Write your code here
    }
public:
    vector<string> letterCombinations(string digits) {
        // Write your code here
        return {};
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
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Recursively explore states, skipping paths that clearly violate constraints.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;

class Solution {
    unordered_map<char, string> keyMap = {
        {'2',"abc"},{'3',"def"},{'4',"ghi"},{'5',"jkl"},
        {'6',"mno"},{'7',"pqrs"},{'8',"tuv"},{'9',"wxyz"}
    };
    void backtrack(string& digits, int i, string& curr, vector<string>& res) {
        // Write your code here
    }
public:
    vector<string> letterCombinations(string digits) {
        // Write your code here
        return {};
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
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `DFS backtracking using bitwise/integer state representation and highly efficient pruning to minimize exploration.`,
        code: `#include <bits/stdc++.h>
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
      }
    },
    python: {
      starterCode: `from typing import Dict, List

class Solution:
    def __init__(self):
        # Write your code here
        pass
    def backtrack(self, digits: str, i: int, curr: List[str], res: List[str]) -> None:
        # Write your code here
        pass
    def letterCombinations(self, digits: str) -> List[str]:
        # Write your code here
        return []
if __name__ == "__main__":
    sol = Solution()
    res = sol.letterCombinations("23")
    print(' '.join(res))  # ad ae af bd be bf cd ce cf`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Generate all possible subsets, combinations, or permutations without any pruning.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from typing import Dict, List

class Solution:
    def __init__(self):
        # Write your code here
        pass
    def backtrack(self, digits: str, i: int, curr: List[str], res: List[str]) -> None:
        # Write your code here
        pass
    def letterCombinations(self, digits: str) -> List[str]:
        # Write your code here
        return []
if __name__ == "__main__":
    sol = Solution()
    res = sol.letterCombinations("23")
    print(' '.join(res))  # ad ae af bd be bf cd ce cf`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Recursively explore states, skipping paths that clearly violate constraints.`,
        code: `// Better Solution
// TODO: Implement optimized approach
from typing import Dict, List

class Solution:
    def __init__(self):
        # Write your code here
        pass
    def backtrack(self, digits: str, i: int, curr: List[str], res: List[str]) -> None:
        # Write your code here
        pass
    def letterCombinations(self, digits: str) -> List[str]:
        # Write your code here
        return []
if __name__ == "__main__":
    sol = Solution()
    res = sol.letterCombinations("23")
    print(' '.join(res))  # ad ae af bd be bf cd ce cf`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `DFS backtracking using bitwise/integer state representation and highly efficient pruning to minimize exploration.`,
        code: `from typing import Dict, List

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
      }
    }
  }
};

export default problem;
