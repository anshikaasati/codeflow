import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "sum-of-two-integers",
  title: "Sum of Two Integers",
  difficulty: "Medium",
  category: "Bit Manipulation",
  patterns: ["Bit Manipulation"],
  url: "https://leetcode.com/problems/sum-of-two-integers/",
  description: "Given two integers `a` and `b`, return the sum of the two integers without using the operators `+` and `-`.",
  examples: [
  {
    "input": "a = 1, b = 2",
    "output": "3"
  },
  {
    "input": "a = 2, b = 3",
    "output": "5"
  }
],
  constraints: [
  "-1000 <= a, b <= 1000"
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int getSum(int a, int b){
        // Write your code here
        return 0;
    }
};

int main(){
    Solution sol;
    cout<<sol.getSum(1,2)<<endl;  // 3
    cout<<sol.getSum(2,3)<<endl;  // 5
    return 0;
}`,
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int getSum(int a, int b){
        while(b){
            int carry=(unsigned int)(a&b)<<1;
            a=a^b; b=carry;
        }
        return a;
    }
};

int main(){
    Solution sol;
    cout<<sol.getSum(1,2)<<endl;  // 3
    cout<<sol.getSum(2,3)<<endl;  // 5
    return 0;
}`
    },
    python: {
      starterCode: `from typing import Optional

class Solution:
    def getSum(self, a: int, b: int) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    print(sol.getSum(1, 2))  # 3
    print(sol.getSum(2, 3))  # 5`,
      solutionCode: `from typing import Optional

class Solution:
    def getSum(self, a: int, b: int) -> int:
        while b:
            carry = (a & b) << 1
            a = a ^ b
            b = carry
        return a

if __name__ == '__main__':
    sol = Solution()
    print(sol.getSum(1, 2))  # 3
    print(sol.getSum(2, 3))  # 5`
    }
  }
};

export default problem;
