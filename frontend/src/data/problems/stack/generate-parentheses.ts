import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "generate-parentheses",
  title: "Generate Parentheses",
  difficulty: "Medium",
  category: "Stack",
  url: "https://leetcode.com/problems/generate-parentheses/",
  description: "Given `n` pairs of parentheses, write a function to *generate all combinations of well-formed parentheses*.",
  examples: [
  {
    "input": "n = 3",
    "output": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]"
  },
  {
    "input": "n = 1",
    "output": "[\"()\"]"
  }
],
  constraints: [
  "1 <= n <= 8"
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
    void bt(int open, int close, int n, string& cur, vector<string>& res) {
        if ((int)cur.size()==2*n) { res.push_back(cur); return; }
        if (open<n)  { cur+='('; bt(open+1,close,n,cur,res); cur.pop_back(); }
        if (close<open){ cur+=')'; bt(open,close+1,n,cur,res); cur.pop_back(); }
    }
public:
    vector<string> generateParenthesis(int n) {
        vector<string> res; string cur;
        bt(0,0,n,cur,res); return res;
    }
};

int main() {
    Solution sol;
    for (auto& s:sol.generateParenthesis(3)) cout<<s<<" ";
    cout<<endl;
    return 0;
}`
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def bt(self, open: int, close: int, n: int, cur: str, res: List[str]) -> None:
        if len(cur) == 2 * n:
            res.append(cur)
            return
        if open < n:
            self.bt(open + 1, close, n, cur + "(", res)
        if close < open:
            self.bt(open, close + 1, n, cur + ")", res)

    def generateParenthesis(self, n: int) -> List[str]:
        res = []
        self.bt(0, 0, n, "", res)
        return res


if __name__ == '__main__':
    sol = Solution()
    print(" ".join(sol.generateParenthesis(3)))`
    },
    java: {
      starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Solution sol = new Solution();
        List<String> res = sol.generateParenthesis(3);
        for (String s : res) {
            System.out.print(s + " ");
        }
        System.out.println();
    }
}

class Solution {
    private void bt(int open, int close, int n, String cur, List<String> res) {
        if (cur.length() == 2 * n) {
            res.add(cur);
            return;
        }
        if (open < n) {
            bt(open + 1, close, n, cur + "(", res);
        }
        if (close < open) {
            bt(open, close + 1, n, cur + ")", res);
        }
    }
    
    public List<String> generateParenthesis(int n) {
        List<String> res = new ArrayList<>();
        bt(0, 0, n, "", res);
        return res;
    }
}`
    }
  }
};

export default problem;

