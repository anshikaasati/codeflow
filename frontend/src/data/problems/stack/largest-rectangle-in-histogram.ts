import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "largest-rectangle-in-histogram",
  title: "Largest Rectangle in Histogram",
  difficulty: "Hard",
  category: "Stack",
  patterns: ["Stack","Monotonic Stack"],
  url: "https://leetcode.com/problems/largest-rectangle-in-histogram/",
  description: "Given an array of integers `heights` representing the histogram's bar height where the width of each bar is `1`, return the area of the largest rectangle in the histogram.",
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
      solutionCode: `#include <bits/stdc++.h>
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
      solutionCode: `from typing import List

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
};

export default problem;
