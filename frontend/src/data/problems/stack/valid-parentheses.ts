import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "valid-parentheses",
  title: "Valid Parentheses",
  difficulty: "Easy",
  category: "Stack",
  url: "https://leetcode.com/problems/valid-parentheses/",
  description: "Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
  examples: [
  {
    "input": "s = \"()\"",
    "output": "true"
  },
  {
    "input": "s = \"()[]{}\"",
    "output": "true"
  },
  {
    "input": "s = \"(]\"",
    "output": "false"
  }
],
  constraints: [
  "1 <= s.length <= 10^4",
  "s consists of parentheses only '()[]{}'."
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        unordered_map<char, char> pairs = {{')', '('}, {']', '['}, {'}', '{'}};
        for (char c : s) {
            if (c == '(' || c == '[' || c == '{') st.push(c);
            else {
                if (st.empty() || st.top() != pairs[c]) return false;
                st.pop();
            }
        }
        return st.empty();
    }
};

int main() {
    Solution sol;
    cout << boolalpha;
    cout << sol.isValid("()[]{}") << endl; // true
    cout << sol.isValid("(]")    << endl;  // false
    cout << sol.isValid("{[]}")  << endl;  // true
    return 0;
}`
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        pairs = {')': '(', ']': '[', '}': '{'}
        for c in s:
            if c in ['(', '[', '{']:
                stack.append(c)
            else:
                if not stack or stack.pop() != pairs[c]:
                    return False
        return not stack


if __name__ == '__main__':
    sol = Solution()
    print(sol.isValid("()[]{}"))  # True
    print(sol.isValid("(]"))  # False
    print(sol.isValid("{[]}"))  # True`
    },
    java: {
      starterCode: `import java.util.Stack;
import java.util.HashMap;

class Solution {
    public boolean isValid(String s) {
        Stack<Character> st = new Stack<>();
        HashMap<Character, Character> pairs = new HashMap<>();
        pairs.put(')', '(');
        pairs.put(']', '[');
        pairs.put('}', '{');
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '(' || c == '[' || c == '{') {
                st.push(c);
            } else {
                if (st.empty() || st.peek() != pairs.get(c)) {
                    return false;
                }
                st.pop();
            }
        }
        return st.empty();
    }
}

class Main {
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.isValid("()[]{}")); // true
        System.out.println(sol.isValid("(]"));    // false
        System.out.println(sol.isValid("{[]}"));  // true
    }
}`
    }
  }
};

export default problem;
