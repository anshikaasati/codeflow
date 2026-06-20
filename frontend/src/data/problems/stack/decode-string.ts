import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "decode-string",
  title: "Decode String",
  difficulty: "Medium",
  category: "Stack",
  url: "https://leetcode.com/problems/decode-string/",
  description: "Given an encoded string, return its decoded string.\n\nThe encoding rule is: `k[encoded_string]`, where the `encoded_string` inside the square brackets is being repeated exactly `k` times. Note that `k` is guaranteed to be a positive integer.\n\nYou may assume that the input string is always valid; there are no extra white spaces, square brackets are well-formed, etc. Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, `k`. For example, there will not be input like `3a` or `2[4]`.",
  examples: [
  {
    "input": "s = \"3[a]2[bc]\"",
    "output": "\"aaabcbc\""
  },
  {
    "input": "s = \"3[a2[c]]\"",
    "output": "\"accaccacc\""
  },
  {
    "input": "s = \"2[abc]3[cd]ef\"",
    "output": "\"abcabccdcdcdef\""
  }
],
  constraints: [
  "1 <= s.length <= 30",
  "s consists of lowercase English letters, digits, and square brackets '[]'.",
  "s is guaranteed to be a valid input.",
  "All the integers in s are in the range [1, 300]."
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    string decodeString(string s) {
        stack<int> counts; stack<string> strs;
        string curr=""; int k=0;
        for (char c:s) {
            if (isdigit(c)) k=k*10+(c-'0');
            else if (c=='[') { counts.push(k); strs.push(curr); k=0; curr=""; }
            else if (c==']') {
                int rep=counts.top(); counts.pop();
                string prev=strs.top(); strs.pop();
                for (int i=0;i<rep;i++) prev+=curr;
                curr=prev;
            } else curr+=c;
        }
        return curr;
    }
};

int main() {
    Solution sol;
    cout<<sol.decodeString("3[a]2[bc]")<<endl;   // aaabcbc
    cout<<sol.decodeString("3[a2[c]]")<<endl;     // accaccacc
    return 0;
}`
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def decodeString(self, s: str) -> str:
        counts = []
        strs = []
        curr = ""
        k = 0
        for c in s:
            if c.isdigit():
                k = k * 10 + int(c)
            elif c == '[':
                counts.append(k)
                strs.append(curr)
                k = 0
                curr = ""
            elif c == ']':
                rep = counts.pop()
                prev = strs.pop()
                for _ in range(rep):
                    prev += curr
                curr = prev
            else:
                curr += c
        return curr

if __name__ == '__main__':
    sol = Solution()
    print(sol.decodeString("3[a]2[bc]"))   # aaabcbc
    print(sol.decodeString("3[a2[c]]"))     # accaccacc`
    },
    java: {
      starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.decodeString("3[a]2[bc]")); // aaabcbc
        System.out.println(sol.decodeString("3[a2[c]]"));  // accaccacc
    }
}

class Solution {
    public String decodeString(String s) {
        Stack<Integer> counts = new Stack<>();
        Stack<StringBuilder> strs = new Stack<>();
        StringBuilder curr = new StringBuilder();
        int k = 0;
        for (char c : s.toCharArray()) {
            if (Character.isDigit(c)) {
                k = k * 10 + (c - '0');
            } else if (c == '[') {
                counts.push(k);
                strs.push(curr);
                k = 0;
                curr = new StringBuilder();
            } else if (c == ']') {
                int rep = counts.pop();
                StringBuilder prev = strs.pop();
                for (int i = 0; i < rep; i++) {
                    prev.append(curr);
                }
                curr = prev;
            } else {
                curr.append(c);
            }
        }
        return curr.toString();
    }
}`
    }
  }
};

export default problem;

