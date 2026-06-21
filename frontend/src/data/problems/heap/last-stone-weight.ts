import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "last-stone-weight",
  title: "Last Stone Weight",
  difficulty: "Easy",
  category: "Heap / Priority Queue",
  patterns: ["Heap"],
  url: "https://leetcode.com/problems/last-stone-weight/",
  description: `You are given an array of integers \`stones\` where \`stones[i]\` is the weight of the \`i-th\` stone.

We are playing a game with the stones. On each turn, we choose the heaviest two stones and smash them together. Suppose the heaviest two stones have weights \`x\` and \`y\` with \`x <= y\`. The result of this smash is:
- If \`x == y\`, both stones are destroyed.
- If \`x != y\`, the stone of weight \`x\` is destroyed, and the stone of weight \`y\` has new weight \`y - x\`.

At the end of the game, there is at most one stone left. Return the weight of the last remaining stone. If there are no stones left, return \`0\`.`,
  examples: [
    {
      "input": "stones = [2,7,4,1,8,1]",
      "output": "1",
      "explanation": "We combine 7 and 8 to get 1, so the array becomes [2,4,1,1,1].\nWe combine 2 and 4 to get 2, so the array becomes [2,1,1,1].\nWe combine 2 and 1 to get 1, so the array becomes [1,1,1].\nWe combine 1 and 1 to get 0, so the array becomes [1].\nFinally, we return 1."
    }
  ],
  constraints: [
    "1 <= stones.length <= 30",
    "1 <= stones[i] <= 1000"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int lastStoneWeight(vector<int>& stones) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> stones = {2,7,4,1,8,1};
    cout << sol.lastStoneWeight(stones) << endl; // 1
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
    int lastStoneWeight(vector<int>& stones) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> stones = {2,7,4,1,8,1};
    cout << sol.lastStoneWeight(stones) << endl; // 1
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
    int lastStoneWeight(vector<int>& stones) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> stones = {2,7,4,1,8,1};
    cout << sol.lastStoneWeight(stones) << endl; // 1
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
    int lastStoneWeight(vector<int>& stones) {
        priority_queue<int> maxHeap(stones.begin(), stones.end());
        while (maxHeap.size() > 1) {
            int y = maxHeap.top(); maxHeap.pop();
            int x = maxHeap.top(); maxHeap.pop();
            if (y != x) maxHeap.push(y - x);
        }
        return maxHeap.empty() ? 0 : maxHeap.top();
    }
};

int main() {
    Solution sol;
    vector<int> stones = {2,7,4,1,8,1};
    cout << sol.lastStoneWeight(stones) << endl; // 1
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List
import heapq

class Solution:
    def lastStoneWeight(self, stones: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    stones = [2, 7, 4, 1, 8, 1]
    print(sol.lastStoneWeight(stones))  # 1`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Sort the array or search for max/min elements repeatedly.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from typing import List
import heapq

class Solution:
    def lastStoneWeight(self, stones: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    stones = [2, 7, 4, 1, 8, 1]
    print(sol.lastStoneWeight(stones))  # 1`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Insert all elements into a max-heap or min-heap and extract.`,
        code: `// Better Solution
// TODO: Implement optimized approach
from typing import List
import heapq

class Solution:
    def lastStoneWeight(self, stones: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    stones = [2, 7, 4, 1, 8, 1]
    print(sol.lastStoneWeight(stones))  # 1`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Maintain a min/max heap of size K, or use quickselect to get elements in-place with minimal overhead.`,
        code: `from typing import List
import heapq

class Solution:
    def lastStoneWeight(self, stones: List[int]) -> int:
        max_heap = [-s for s in stones]
        heapq.heapify(max_heap)
        while len(max_heap) > 1:
            y = -heapq.heappop(max_heap)
            x = -heapq.heappop(max_heap)
            if y != x:
                heapq.heappush(max_heap, -(y - x))
        return -max_heap[0] if max_heap else 0

if __name__ == '__main__':
    sol = Solution()
    stones = [2, 7, 4, 1, 8, 1]
    print(sol.lastStoneWeight(stones))  # 1`
      }
    }
  }
};

export default problem;
