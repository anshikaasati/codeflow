import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "trapping-rain-water",
  title: "Trapping Rain Water",
  difficulty: "Hard",
  category: "Two Pointers",
  patterns: ["Two Pointer"],
  url: "https://leetcode.com/problems/trapping-rain-water/",
  description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is \`1\`, compute how much water it can trap after raining.`,
  examples: [
    {
      "input": "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
      "output": "6",
      "explanation": "The elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water are being trapped."
    },
    {
      "input": "height = [4,2,0,3,2,5]",
      "output": "9"
    }
  ],
  constraints: [
    "n == height.length",
    "1 <= n <= 2 * 10^4",
    "0 <= height[i] <= 10^5"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int trap(vector<int>& height) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> height = {0,1,0,2,1,0,1,3,2,1,2,1};
    cout << sol.trap(height) << endl; // 6
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(2^N)",
        spaceComplexity: "O(1)",
        approach: `Check all pairs, triplets, or combinations using nested loops.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int trap(vector<int>& height) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> height = {0,1,0,2,1,0,1,3,2,1,2,1};
    cout << sol.trap(height) << endl; // 6
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(N)",
        approach: `Sort the elements first, then scan or use two pointers with additional logic/checks.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int trap(vector<int>& height) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> height = {0,1,0,2,1,0,1,3,2,1,2,1};
    cout << sol.trap(height) << endl; // 6
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Position pointers at key boundaries or moving speeds to narrow search space in a single linear pass.`,
        code: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int trap(vector<int>& height) {
        int l = 0, r = (int)height.size() - 1;
        int maxL = 0, maxR = 0, water = 0;
        while (l < r) {
            if (height[l] <= height[r]) {
                maxL = max(maxL, height[l]);
                water += maxL - height[l];
                l++;
            } else {
                maxR = max(maxR, height[r]);
                water += maxR - height[r];
                r--;
            }
        }
        return water;
    }
};

int main() {
    Solution sol;
    vector<int> height = {0,1,0,2,1,0,1,3,2,1,2,1};
    cout << sol.trap(height) << endl; // 6
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def trap(self, height: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    height = [0,1,0,2,1,0,1,3,2,1,2,1]
    print(sol.trap(height))  # Output: 6`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(2^N)",
        spaceComplexity: "O(1)",
        approach: `Check all pairs, triplets, or combinations using nested loops.`,
        code: `# Brute Force Approach
# TODO: Implement brute force
from typing import List

class Solution:
    def trap(self, height: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    height = [0,1,0,2,1,0,1,3,2,1,2,1]
    print(sol.trap(height))  # Output: 6`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(N)",
        approach: `Sort the elements first, then scan or use two pointers with additional logic/checks.`,
        code: `# Better Solution
# TODO: Implement optimized approach
from typing import List

class Solution:
    def trap(self, height: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    height = [0,1,0,2,1,0,1,3,2,1,2,1]
    print(sol.trap(height))  # Output: 6`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Position pointers at key boundaries or moving speeds to narrow search space in a single linear pass.`,
        code: `from typing import List

class Solution:
    def trap(self, height: List[int]) -> int:
        l, r = 0, len(height) - 1
        maxL, maxR, water = 0, 0, 0
        while l < r:
            if height[l] <= height[r]:
                maxL = max(maxL, height[l])
                water += maxL - height[l]
                l += 1
            else:
                maxR = max(maxR, height[r])
                water += maxR - height[r]
                r -= 1
        return water

if __name__ == '__main__':
    sol = Solution()
    height = [0,1,0,2,1,0,1,3,2,1,2,1]
    print(sol.trap(height))  # Output: 6`
      }
    }
  }
};

export default problem;
