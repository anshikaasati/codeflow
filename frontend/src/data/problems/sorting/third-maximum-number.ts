import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "third-maximum-number",
  title: "Third Maximum Number",
  difficulty: "Easy",
  category: "Sorting",
  patterns: ["Sorting"],
  url: "https://leetcode.com/problems/third-maximum-number/",
  description: `Given an integer array \`nums\`, return the third distinct maximum number in this array. If the third maximum does not exist, return the maximum number.`,
  examples: [
    {
      "input": "nums = [3,2,1]",
      "output": "1",
      "explanation": "The first distinct maximum is 3. The second distinct maximum is 2. The third distinct maximum is 1."
    },
    {
      "input": "nums = [1,2]",
      "output": "2",
      "explanation": "The first distinct maximum is 2. The second distinct maximum is 1. The third distinct maximum does not exist, so the maximum (2) is returned."
    }
  ],
  constraints: [
    "1 <= nums.length <= 10^4",
    "-2^31 <= nums[i] <= 2^31 - 1"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int thirdMax(vector<int>& nums) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> a = {3, 2, 1};
    vector<int> b = {1, 2};
    cout << sol.thirdMax(a) << endl; // 1
    cout << sol.thirdMax(b) << endl; // 2
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Bubble sort or selection sort comparing all pairs repeatedly.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int thirdMax(vector<int>& nums) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> a = {3, 2, 1};
    vector<int> b = {1, 2};
    cout << sol.thirdMax(a) << endl; // 1
    cout << sol.thirdMax(b) << endl; // 2
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Divide-and-conquer sorting (Merge Sort or Quick Sort) in O(N log N) time.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int thirdMax(vector<int>& nums) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> a = {3, 2, 1};
    vector<int> b = {1, 2};
    cout << sol.thirdMax(a) << endl; // 1
    cout << sol.thirdMax(b) << endl; // 2
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Linear time sorting (like bucket sort or counting sort) taking advantage of constraints.`,
        code: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int thirdMax(vector<int>& nums) {
        long long first = -2000000000000LL;
        long long second = -2000000000000LL;
        long long third = -2000000000000LL;
        
        for (int x : nums) {
            if (x == first || x == second || x == third) continue;
            if (x > first) {
                third = second;
                second = first;
                first = x;
            } else if (x > second) {
                third = second;
                second = x;
            } else if (x > third) {
                third = x;
            }
        }
        return (third == -2000000000000LL) ? first : third;
    }
};

int main() {
    Solution sol;
    vector<int> a = {3, 2, 1};
    vector<int> b = {1, 2};
    cout << sol.thirdMax(a) << endl; // 1
    cout << sol.thirdMax(b) << endl; // 2
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def thirdMax(self, nums: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    a = [3, 2, 1]
    b = [1, 2]
    print(sol.thirdMax(a))  # 1
    print(sol.thirdMax(b))  # 2`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Bubble sort or selection sort comparing all pairs repeatedly.`,
        code: `# Brute Force Approach
# TODO: Implement brute force
from typing import List

class Solution:
    def thirdMax(self, nums: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    a = [3, 2, 1]
    b = [1, 2]
    print(sol.thirdMax(a))  # 1
    print(sol.thirdMax(b))  # 2`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Divide-and-conquer sorting (Merge Sort or Quick Sort) in O(N log N) time.`,
        code: `# Better Solution
# TODO: Implement optimized approach
from typing import List

class Solution:
    def thirdMax(self, nums: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    a = [3, 2, 1]
    b = [1, 2]
    print(sol.thirdMax(a))  # 1
    print(sol.thirdMax(b))  # 2`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Linear time sorting (like bucket sort or counting sort) taking advantage of constraints.`,
        code: `from typing import List

class Solution:
    def thirdMax(self, nums: List[int]) -> int:
        first = float('-inf')
        second = float('-inf')
        third = float('-inf')
        
        for x in nums:
            if x == first or x == second or x == third:
                continue
            if x > first:
                third = second
                second = first
                first = x
            elif x > second:
                third = second
                second = x
            elif x > third:
                third = x
        return third if third != float('-inf') else first

if __name__ == '__main__':
    sol = Solution()
    a = [3, 2, 1]
    b = [1, 2]
    print(sol.thirdMax(a))  # 1
    print(sol.thirdMax(b))  # 2`
      }
    }
  }
};

export default problem;
