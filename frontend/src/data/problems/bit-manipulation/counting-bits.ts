import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "counting-bits",
  title: "Counting Bits",
  difficulty: "Easy",
  category: "Bit Manipulation",
  url: "https://leetcode.com/problems/counting-bits/",
  description: "Given an integer `n`, return an array `ans` of length `n + 1` such that for each `i` (`0 <= i <= n`), `ans[i]` is the **number of 1's** in the binary representation of `i`.",
  examples: [
  {
    "input": "n = 2",
    "output": "[0,1,1]",
    "explanation": "0 --> 0\n1 --> 1\n2 --> 10"
  },
  {
    "input": "n = 5",
    "output": "[0,1,1,2,1,2]",
    "explanation": "0 --> 0\n1 --> 1\n2 --> 10\n3 --> 11\n4 --> 100\n5 --> 101"
  }
],
  constraints: [
  "0 <= n <= 10^5"
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> countBits(int n){
        vector<int> dp(n+1,0);
        for(int i=1;i<=n;i++) dp[i]=dp[i>>1]+(i&1);
        return dp;
    }
};

int main(){
    Solution sol;
    for(int v:sol.countBits(5)) cout<<v<<" "; // 0 1 1 2 1 2
    cout<<endl;
    return 0;
}`
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def countBits(self, n: int) -> List[int]:
        dp = [0] * (n + 1)
        for i in range(1, n + 1):
            dp[i] = dp[i >> 1] + (i & 1)
        return dp

if __name__ == "__main__":
    sol = Solution()
    print(*sol.countBits(5))  # 0 1 1 2 1 2`
    },
    java: {
      starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] res = sol.countBits(5);
        for (int v : res) {
            System.out.print(v + " ");
        }
        System.out.println();
    }
}

class Solution {
    public int[] countBits(int n) {
        int[] dp = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            dp[i] = dp[i >> 1] + (i & 1);
        }
        return dp;
    }
}`
    }
  }
};

export default problem;

