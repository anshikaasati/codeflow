import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "height-checker",
  title: "Height Checker",
  difficulty: "Easy",
  category: "Sorting",
  patterns: ["Sorting"],
  url: "https://leetcode.com/problems/height-checker/",
  description: `A school is trying to take an annual photo of all the students. The students are asked to stand in a single file line in non-decreasing order by height. Return the number of indices where \`heights[i] != expected[i]\`.`,
  examples: [
    {
      "input": "heights = [1,1,4,2,1,3]",
      "output": "3",
      "explanation": "heights:  [1,1,4,2,1,3]\nexpected: [1,1,1,2,3,4]\nIndices 2, 4, and 5 do not match."
    }
  ],
  constraints: [
    "1 <= heights.length <= 100",
    "1 <= heights[i] <= 100"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int heightChecker(vector<int>& heights) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> heights = {1, 1, 4, 2, 1, 3};
    cout << sol.heightChecker(heights) << endl; // 3
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
    int heightChecker(vector<int>& heights) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> heights = {1, 1, 4, 2, 1, 3};
    cout << sol.heightChecker(heights) << endl; // 3
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
    int heightChecker(vector<int>& heights) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> heights = {1, 1, 4, 2, 1, 3};
    cout << sol.heightChecker(heights) << endl; // 3
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
    int heightChecker(vector<int>& heights) {
        vector<int> expected = heights;
        sort(expected.begin(), expected.end());
        int count = 0;
        for (int i = 0; i < heights.size(); i++) {
            if (heights[i] != expected[i]) {
                count++;
            }
        }
        return count;
    }
};

int main() {
    Solution sol;
    vector<int> heights = {1, 1, 4, 2, 1, 3};
    cout << sol.heightChecker(heights) << endl; // 3
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def heightChecker(self, heights: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    heights = [1, 1, 4, 2, 1, 3]
    print(sol.heightChecker(heights))  # 3`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Bubble sort or selection sort comparing all pairs repeatedly.`,
        code: `# Brute Force Approach
# TODO: Implement brute force
from typing import List

class Solution:
    def heightChecker(self, heights: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    heights = [1, 1, 4, 2, 1, 3]
    print(sol.heightChecker(heights))  # 3`
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
    def heightChecker(self, heights: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    heights = [1, 1, 4, 2, 1, 3]
    print(sol.heightChecker(heights))  # 3`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Linear time sorting (like bucket sort or counting sort) taking advantage of constraints.`,
        code: `from typing import List

class Solution:
    def heightChecker(self, heights: List[int]) -> int:
        expected = sorted(heights)
        count = 0
        for i in range(len(heights)):
            if heights[i] != expected[i]:
                count += 1
        return count

if __name__ == '__main__':
    sol = Solution()
    heights = [1, 1, 4, 2, 1, 3]
    print(sol.heightChecker(heights))  # 3`
      }
    }
  }
};

export default problem;
