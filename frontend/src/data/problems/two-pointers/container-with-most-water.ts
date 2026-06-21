import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "container-with-most-water",
  title: "Container With Most Water",
  difficulty: "Medium",
  category: "Two Pointers",
  patterns: ["Two Pointer","Greedy"],
  url: "https://leetcode.com/problems/container-with-most-water/",
  description: `You are given an integer array \`height\` of length \`n\`. There are \`n\` vertical lines drawn such that the two endpoints of the \`i-th\` line are \`(i, 0)\` and \`(i, height[i])\`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.`,
  examples: [
    {
      "input": "height = [1,8,6,2,5,4,8,3,7]",
      "output": "49",
      "explanation": "The vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water the container can contain is 49."
    },
    {
      "input": "height = [1,1]",
      "output": "1"
    }
  ],
  constraints: [
    "n == height.length",
    "2 <= n <= 10^5",
    "0 <= height[i] <= 10^4"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int maxArea(vector<int>& height) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> height = {1, 8, 6, 2, 5, 4, 8, 3, 7};
    cout << sol.maxArea(height) << endl; // 49
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Check all pairs, triplets, or combinations using nested loops.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int maxArea(vector<int>& height) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> height = {1, 8, 6, 2, 5, 4, 8, 3, 7};
    cout << sol.maxArea(height) << endl; // 49
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Sort the elements first, then scan or use two pointers with additional logic/checks.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int maxArea(vector<int>& height) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> height = {1, 8, 6, 2, 5, 4, 8, 3, 7};
    cout << sol.maxArea(height) << endl; // 49
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Position pointers at key boundaries or moving speeds to narrow search space in a single linear pass.`,
        code: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int maxArea(vector<int>& height) {
        int l = 0, r = (int)height.size() - 1, maxWater = 0;
        while (l < r) {
            int water = min(height[l], height[r]) * (r - l);
            maxWater = max(maxWater, water);
            if (height[l] < height[r]) l++;
            else r--;
        }
        return maxWater;
    }
};

int main() {
    Solution sol;
    vector<int> height = {1, 8, 6, 2, 5, 4, 8, 3, 7};
    cout << sol.maxArea(height) << endl; // 49
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def maxArea(self, height: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
    print(sol.maxArea(height))  # 49`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Check all pairs, triplets, or combinations using nested loops.`,
        code: `# Brute Force Approach
# TODO: Implement brute force
from typing import List

class Solution:
    def maxArea(self, height: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
    print(sol.maxArea(height))  # 49`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Sort the elements first, then scan or use two pointers with additional logic/checks.`,
        code: `# Better Solution
# TODO: Implement optimized approach
from typing import List

class Solution:
    def maxArea(self, height: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
    print(sol.maxArea(height))  # 49`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Position pointers at key boundaries or moving speeds to narrow search space in a single linear pass.`,
        code: `from typing import List

class Solution:
    def maxArea(self, height: List[int]) -> int:
        l, r = 0, len(height) - 1
        maxWater = 0
        while l < r:
            water = min(height[l], height[r]) * (r - l)
            maxWater = max(maxWater, water)
            if height[l] < height[r]:
                l += 1
            else:
                r -= 1
        return maxWater

if __name__ == '__main__':
    sol = Solution()
    height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
    print(sol.maxArea(height))  # 49`
      }
    }
  }
};

export default problem;
