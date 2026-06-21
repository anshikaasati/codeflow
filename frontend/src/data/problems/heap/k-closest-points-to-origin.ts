import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "k-closest-points-to-origin",
  title: "K Closest Points to Origin",
  difficulty: "Medium",
  category: "Heap / Priority Queue",
  patterns: ["Heap","Greedy"],
  url: "https://leetcode.com/problems/k-closest-points-to-origin/",
  description: `Given an array of \`points\` where \`points[i] = [xi, yi]\` represents a point on the X-Y plane and an integer \`k\`, return the \`k\` closest points to the origin \`(0, 0)\`.

The distance between two points on the X-Y plane is the Euclidean distance \`sqrt((x1 - x2)^2 + (y1 - y2)^2)\`.

You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).`,
  examples: [
    {
      "input": "points = [[1,3],[-2,2]], k = 1",
      "output": "[[-2,2]]",
      "explanation": "The distance from (1, 3) to the origin is sqrt(10).\nThe distance from (-2, 2) to the origin is sqrt(8).\nSince sqrt(8) < sqrt(10), (-2, 2) is closer to the origin."
    },
    {
      "input": "points = [[3,3],[5,-1],[-2,4]], k = 2",
      "output": "[[-2,4],[3,3]]"
    }
  ],
  constraints: [
    "1 <= k <= points.length <= 10^4",
    "-10^4 <= xi, yi <= 10^4"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<vector<int>> pts = {{1,3},{-2,2}};
    auto res = sol.kClosest(pts, 1);
    for (auto& p : res) cout << "[" << p[0] << "," << p[1] << "]" << endl; // [-2,2]
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Sort the array or search for max/min elements repeatedly.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<vector<int>> pts = {{1,3},{-2,2}};
    auto res = sol.kClosest(pts, 1);
    for (auto& p : res) cout << "[" << p[0] << "," << p[1] << "]" << endl; // [-2,2]
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Insert all elements into a max-heap or min-heap and extract.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<vector<int>> pts = {{1,3},{-2,2}};
    auto res = sol.kClosest(pts, 1);
    for (auto& p : res) cout << "[" << p[0] << "," << p[1] << "]" << endl; // [-2,2]
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Maintain a min/max heap of size K, or use quickselect to get elements in-place with minimal overhead.`,
        code: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
        // Max-heap of size k
        auto cmp = [](const vector<int>& a, const vector<int>& b) {
            return a[0]*a[0]+a[1]*a[1] < b[0]*b[0]+b[1]*b[1];
        };
        priority_queue<vector<int>, vector<vector<int>>, decltype(cmp)> maxHeap(cmp);
        for (auto& p : points) {
            maxHeap.push(p);
            if ((int)maxHeap.size() > k) maxHeap.pop();
        }
        vector<vector<int>> res;
        while (!maxHeap.empty()) { res.push_back(maxHeap.top()); maxHeap.pop(); }
        return res;
    }
};

int main() {
    Solution sol;
    vector<vector<int>> pts = {{1,3},{-2,2}};
    auto res = sol.kClosest(pts, 1);
    for (auto& p : res) cout << "[" << p[0] << "," << p[1] << "]" << endl; // [-2,2]
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def kClosest(self, points: List[List[int]], k: int) -> List[List[int]]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    pts = [[1,3],[-2,2]]
    res = sol.kClosest(pts, 1)
    for p in res:
        print(f"[{p[0]},{p[1]}]") # [-2,2]`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Sort the array or search for max/min elements repeatedly.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from typing import List

class Solution:
    def kClosest(self, points: List[List[int]], k: int) -> List[List[int]]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    pts = [[1,3],[-2,2]]
    res = sol.kClosest(pts, 1)
    for p in res:
        print(f"[{p[0]},{p[1]}]") # [-2,2]`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Insert all elements into a max-heap or min-heap and extract.`,
        code: `// Better Solution
// TODO: Implement optimized approach
from typing import List

class Solution:
    def kClosest(self, points: List[List[int]], k: int) -> List[List[int]]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    pts = [[1,3],[-2,2]]
    res = sol.kClosest(pts, 1)
    for p in res:
        print(f"[{p[0]},{p[1]}]") # [-2,2]`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Maintain a min/max heap of size K, or use quickselect to get elements in-place with minimal overhead.`,
        code: `from typing import List

class Solution:
    def kClosest(self, points: List[List[int]], k: int) -> List[List[int]]:
        # Max-heap of size k
        max_heap = []
        for p in points:
            max_heap.append(p)
            if len(max_heap) > k:
                max_heap.sort(key=lambda x: x[0]*x[0]+x[1]*x[1])
                max_heap.pop()
        max_heap.sort(key=lambda x: x[0]*x[0]+x[1]*x[1])
        return max_heap[:k]

if __name__ == '__main__':
    sol = Solution()
    pts = [[1,3],[-2,2]]
    res = sol.kClosest(pts, 1)
    for p in res:
        print(f"[{p[0]},{p[1]}]") # [-2,2]`
      }
    }
  }
};

export default problem;
