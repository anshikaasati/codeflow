import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "power-of-two",
  title: "Power of Two",
  difficulty: "Easy",
  category: "Bit Manipulation",
  patterns: ["Bit Manipulation"],
  url: "https://leetcode.com/problems/power-of-two/",
  description: "Given an integer `n`, return `true` if it is a power of two. Otherwise, return `false`.\n\nAn integer `n` is a power of two, if there exists an integer `x` such that `n == 2^x`.",
  examples: [
  {
    "input": "n = 1",
    "output": "true",
    "explanation": "2^0 = 1"
  },
  {
    "input": "n = 16",
    "output": "true",
    "explanation": "2^4 = 16"
  },
  {
    "input": "n = 3",
    "output": "false"
  }
],
  constraints: [
  "-2^31 <= n <= 2^31 - 1"
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    bool isPowerOfTwo(int n){
        return n>0&&(n&(n-1))==0;
    }
};

int main(){
    Solution sol;cout<<boolalpha;
    cout<<sol.isPowerOfTwo(1)<<endl;  // true
    cout<<sol.isPowerOfTwo(16)<<endl; // true
    cout<<sol.isPowerOfTwo(3)<<endl;  // false
    return 0;
}`
    },
    python: {
      starterCode: `from typing import Optional

class Solution:
    def isPowerOfTwo(self, n: int) -> bool:
        return n > 0 and (n & (n - 1)) == 0

if __name__ == '__main__':
    sol = Solution()
    print(sol.isPowerOfTwo(1))  # true
    print(sol.isPowerOfTwo(16))  # true
    print(sol.isPowerOfTwo(3))  # false`
    }
  }
};

export default problem;
