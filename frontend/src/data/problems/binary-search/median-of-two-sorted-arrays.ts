import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "median-of-two-sorted-arrays",
  title: "Median of Two Sorted Arrays",
  difficulty: "Hard",
  category: "Binary Search",
  patterns: ["Binary Search","Two Pointer"],
  url: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
  description: `Given two sorted arrays \`nums1\` and \`nums2\` of size \`m\` and \`n\` respectively, return **the median** of the two sorted arrays. The overall run time complexity should be \`O(log (m+n))\`.`,
  examples: [
    {
      "input": "nums1 = [1,3], nums2 = [2]",
      "output": "2.00000"
    },
    {
      "input": "nums1 = [1,2], nums2 = [3,4]",
      "output": "2.50000"
    }
  ],
  constraints: [
    "nums1.length == m",
    "nums2.length == n",
    "0 <= m, n <= 1000",
    "1 <= m + n <= 2000",
    "-10^6 <= nums1[i], nums2[i] <= 10^6"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    double findMedianSortedArrays(vector<int>& A, vector<int>& B) {
        // Write your code here
        return 0;
    }
};
int main() {
    Solution sol;
    vector<int> a={1,3}, b={2};
    cout<<sol.findMedianSortedArrays(a,b)<<endl; // 2.0
    vector<int> c={1,2}, d={3,4};
    cout<<sol.findMedianSortedArrays(c,d)<<endl; // 2.5
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(2^N)",
        spaceComplexity: "O(1)",
        approach: `Iterate sequentially through the search space to find the target element or transition point.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    double findMedianSortedArrays(vector<int>& A, vector<int>& B) {
        // Write your code here
        return 0;
    }
};
int main() {
    Solution sol;
    vector<int> a={1,3}, b={2};
    cout<<sol.findMedianSortedArrays(a,b)<<endl; // 2.0
    vector<int> c={1,2}, d={3,4};
    cout<<sol.findMedianSortedArrays(c,d)<<endl; // 2.5
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(N)",
        approach: `Linear search with early exit or simple range narrowing.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    double findMedianSortedArrays(vector<int>& A, vector<int>& B) {
        // Write your code here
        return 0;
    }
};
int main() {
    Solution sol;
    vector<int> a={1,3}, b={2};
    cout<<sol.findMedianSortedArrays(a,b)<<endl; // 2.0
    vector<int> c={1,2}, d={3,4};
    cout<<sol.findMedianSortedArrays(c,d)<<endl; // 2.5
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Binary search dividing search space in half each step, achieving logarithmic runtime.`,
        code: `#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    double findMedianSortedArrays(vector<int>& A, vector<int>& B) {
        if (A.size()>B.size()) swap(A,B);
        int m=A.size(), n=B.size(), lo=0, hi=m;
        while (lo<=hi) {
            int i=lo+(hi-lo)/2, j=(m+n+1)/2-i;
            int maxL_A=(i==0?INT_MIN:A[i-1]), minR_A=(i==m?INT_MAX:A[i]);
            int maxL_B=(j==0?INT_MIN:B[j-1]), minR_B=(j==n?INT_MAX:B[j]);
            if (maxL_A<=minR_B&&maxL_B<=minR_A) {
                if ((m+n)%2==0) return (max(maxL_A,maxL_B)+min(minR_A,minR_B))/2.0;
                return max(maxL_A,maxL_B);
            } else if (maxL_A>minR_B) hi=i-1; else lo=i+1;
        }
        return 0;
    }
};
int main() {
    Solution sol;
    vector<int> a={1,3}, b={2};
    cout<<sol.findMedianSortedArrays(a,b)<<endl; // 2.0
    vector<int> c={1,2}, d={3,4};
    cout<<sol.findMedianSortedArrays(c,d)<<endl; // 2.5
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def findMedianSortedArrays(self, A: List[int], B: List[int]) -> float:
        # Write your code here
        return 0
if __name__ == "__main__":
    sol = Solution()
    a = [1, 3]
    b = [2]
    print(sol.findMedianSortedArrays(a, b))  # 2.0
    c = [1, 2]
    d = [3, 4]
    print(sol.findMedianSortedArrays(c, d))  # 2.5`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(2^N)",
        spaceComplexity: "O(1)",
        approach: `Iterate sequentially through the search space to find the target element or transition point.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from typing import List

class Solution:
    def findMedianSortedArrays(self, A: List[int], B: List[int]) -> float:
        # Write your code here
        return 0
if __name__ == "__main__":
    sol = Solution()
    a = [1, 3]
    b = [2]
    print(sol.findMedianSortedArrays(a, b))  # 2.0
    c = [1, 2]
    d = [3, 4]
    print(sol.findMedianSortedArrays(c, d))  # 2.5`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(N)",
        approach: `Linear search with early exit or simple range narrowing.`,
        code: `// Better Solution
// TODO: Implement optimized approach
from typing import List

class Solution:
    def findMedianSortedArrays(self, A: List[int], B: List[int]) -> float:
        # Write your code here
        return 0
if __name__ == "__main__":
    sol = Solution()
    a = [1, 3]
    b = [2]
    print(sol.findMedianSortedArrays(a, b))  # 2.0
    c = [1, 2]
    d = [3, 4]
    print(sol.findMedianSortedArrays(c, d))  # 2.5`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Binary search dividing search space in half each step, achieving logarithmic runtime.`,
        code: `from typing import List

class Solution:
    def findMedianSortedArrays(self, A: List[int], B: List[int]) -> float:
        if len(A) > len(B):
            A, B = B, A
        m, n = len(A), len(B)
        lo, hi = 0, m
        while lo <= hi:
            i = lo + (hi - lo) // 2
            j = (m + n + 1) // 2 - i
            maxL_A = float('-inf') if i == 0 else A[i - 1]
            minR_A = float('inf') if i == m else A[i]
            maxL_B = float('-inf') if j == 0 else B[j - 1]
            minR_B = float('inf') if j == n else B[j]
            if maxL_A <= minR_B and maxL_B <= minR_A:
                if (m + n) % 2 == 0:
                    return (max(maxL_A, maxL_B) + min(minR_A, minR_B)) / 2.0
                return max(maxL_A, maxL_B)
            elif maxL_A > minR_B:
                hi = i - 1
            else:
                lo = i + 1
        return 0

if __name__ == "__main__":
    sol = Solution()
    a = [1, 3]
    b = [2]
    print(sol.findMedianSortedArrays(a, b))  # 2.0
    c = [1, 2]
    d = [3, 4]
    print(sol.findMedianSortedArrays(c, d))  # 2.5`
      }
    }
  }
};

export default problem;
