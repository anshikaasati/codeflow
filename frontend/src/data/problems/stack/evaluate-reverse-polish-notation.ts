import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "evaluate-reverse-polish-notation",
  title: "Evaluate Reverse Polish Notation",
  difficulty: "Medium",
  category: "Stack",
  patterns: ["Stack"],
  url: "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
  description: "You are given an array of strings `tokens` that represents an arithmetic expression in a Reverse Polish Notation.\n\nEvaluate the expression. Return an integer that represents the value of the expression.\n\nNote that:\n- The valid operators are '+', '-', '*', and '/'.\n- Each operand may be an integer or another expression.\n- The division between two integers always truncates toward zero.\n- There will not be any division by zero.\n- The input represents a valid arithmetic expression in reverse polish notation.\n- The answer and all the intermediate calculations can be represented in a 32-bit integer.",
  examples: [
  {
    "input": "tokens = [\"2\",\"1\",\"+\",\"3\",\"*\"]",
    "output": "9",
    "explanation": "((2 + 1) * 3) = 9"
  },
  {
    "input": "tokens = [\"4\",\"13\",\"5\",\"/\",\"+\"]",
    "output": "6",
    "explanation": "(4 + (13 / 5)) = 6"
  }
],
  constraints: [
  "1 <= tokens.length <= 10^4",
  "tokens[i] is either an operator: \"+\", \"-\", \"*\", or \"/\", or an integer in the range [-200, 200]."
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int evalRPN(vector<string>& tokens) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<string> tokens = {"2","1","+","3","*"};
    cout << sol.evalRPN(tokens) << endl; // 9  ((2+1)*3)
    vector<string> tokens2 = {"4","13","5","/","+"};
    cout << sol.evalRPN(tokens2) << endl; // 6
    return 0;
}`,
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int evalRPN(vector<string>& tokens) {
        stack<long long> st;
        for (string& t : tokens) {
            if (t == "+" || t == "-" || t == "*" || t == "/") {
                long long b = st.top(); st.pop();
                long long a = st.top(); st.pop();
                if (t == "+") st.push(a + b);
                else if (t == "-") st.push(a - b);
                else if (t == "*") st.push(a * b);
                else st.push(a / b);
            } else {
                st.push(stoll(t));
            }
        }
        return (int)st.top();
    }
};

int main() {
    Solution sol;
    vector<string> tokens = {"2","1","+","3","*"};
    cout << sol.evalRPN(tokens) << endl; // 9  ((2+1)*3)
    vector<string> tokens2 = {"4","13","5","/","+"};
    cout << sol.evalRPN(tokens2) << endl; // 6
    return 0;
}`
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def evalRPN(self, tokens: List[str]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    tokens = ["2","1","+","3","*"]
    print(sol.evalRPN(tokens))  # 9  ((2+1)*3)
    tokens2 = ["4","13","5","/","+"]
    print(sol.evalRPN(tokens2))  # 6`,
      solutionCode: `from typing import List

class Solution:
    def evalRPN(self, tokens: List[str]) -> int:
        stack = []
        for t in tokens:
            if t in ["+", "-", "*", "/"]:
                b = stack.pop()
                a = stack.pop()
                if t == "+":
                    stack.append(a + b)
                elif t == "-":
                    stack.append(a - b)
                elif t == "*":
                    stack.append(a * b)
                else:
                    stack.append(int(a / b))
            else:
                stack.append(int(t))
        return stack[0]

if __name__ == '__main__':
    sol = Solution()
    tokens = ["2","1","+","3","*"]
    print(sol.evalRPN(tokens))  # 9  ((2+1)*3)
    tokens2 = ["4","13","5","/","+"]
    print(sol.evalRPN(tokens2))  # 6`
    }
  }
};

export default problem;
