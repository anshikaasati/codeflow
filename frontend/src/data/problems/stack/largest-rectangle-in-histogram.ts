import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "largest-rectangle-in-histogram",
  title: "Largest Rectangle in Histogram",
  difficulty: "Hard",
  category: "Stack",
  patterns: ["Stack","Monotonic Stack"],
  url: "https://leetcode.com/problems/largest-rectangle-in-histogram/",
  description: `Given an array of integers \`heights\` representing the histogram's bar height where the width of each bar is \`1\`, return the area of the largest rectangle in the histogram.`,
  examples: [
    {
      "input": "heights = [2,1,5,6,2,3]",
      "output": "10"
    },
    {
      "input": "heights = [2,4]",
      "output": "4"
    }
  ],
  constraints: [
    "1 <= heights.length <= 10^5",
    "0 <= heights[i] <= 10^4"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> heights = {2,1,5,6,2,3};
    cout << sol.largestRectangleArea(heights) << endl; // 10
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(2^N)",
        spaceComplexity: "O(1)",
        approach: `Generate and check all paths or elements using nested loop backtracking.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> heights = {2,1,5,6,2,3};
    cout << sol.largestRectangleArea(heights) << endl; // 10
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(N)",
        approach: `Use extra stacks or auxiliary memory to store elements and retrieve them on demand.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> heights = {2,1,5,6,2,3};
    cout << sol.largestRectangleArea(heights) << endl; // 10
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Maintain a monotonic stack to resolve nearest smaller/greater elements in a single linear pass.`,
        code: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        stack<int> st;
        int maxArea = 0;
        heights.push_back(0); // sentinel

        for (int i = 0; i < (int)heights.size(); i++) {
            int start = i;
            while (!st.empty() && heights[st.top()] > heights[i]) {
                int idx = st.top(); st.pop();
                maxArea = max(maxArea, heights[idx] * (i - idx));
                start = idx;
            }
            st.push(start);
        }
        return maxArea;
    }
};

int main() {
    Solution sol;
    vector<int> heights = {2,1,5,6,2,3};
    cout << sol.largestRectangleArea(heights) << endl; // 10
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def largestRectangleArea(self, heights: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    heights = [2, 1, 5, 6, 2, 3]
    print(sol.largestRectangleArea(heights))  # 10`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(2^N)",
        spaceComplexity: "O(1)",
        approach: `Generate and check all paths or elements using nested loop backtracking.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from typing import List

class Solution:
    def largestRectangleArea(self, heights: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    heights = [2, 1, 5, 6, 2, 3]
    print(sol.largestRectangleArea(heights))  # 10`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(N)",
        approach: `Use extra stacks or auxiliary memory to store elements and retrieve them on demand.`,
        code: `// Better Solution
// TODO: Implement optimized approach
from typing import List

class Solution:
    def largestRectangleArea(self, heights: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    heights = [2, 1, 5, 6, 2, 3]
    print(sol.largestRectangleArea(heights))  # 10`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Maintain a monotonic stack to resolve nearest smaller/greater elements in a single linear pass.`,
        code: `from typing import List

class Solution:
    def largestRectangleArea(self, heights: List[int]) -> int:
        stack = []
        max_area = 0
        heights.append(0)  # sentinel

        for i in range(len(heights)):
            start = i
            while stack and heights[stack[-1]] > heights[i]:
                idx = stack.pop()
                max_area = max(max_area, heights[idx] * (i - idx))
                start = idx
            stack.append(start)

        return max_area


if __name__ == '__main__':
    sol = Solution()
    heights = [2, 1, 5, 6, 2, 3]
    print(sol.largestRectangleArea(heights))  # 10`
      }
    }
  }
};

export default problem;
