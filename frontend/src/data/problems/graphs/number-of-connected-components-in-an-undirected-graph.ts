import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "number-of-connected-components-in-an-undirected-graph",
  title: "Number of Connected Components in an Undirected Graph",
  difficulty: "Medium",
  category: "Graphs",
  patterns: ["Graph","DFS","Union Find"],
  url: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/",
  description: `You have a graph of \`n\` nodes. You are given an integer \`n\` and an array \`edges\` where \`edges[i] = [ai, bi]\` indicates that there is an edge between \`ai\` and \`bi\` in the graph.\\n\\nReturn the number of connected components in the graph.`,
  examples: [
    {
      "input": "n = 5, edges = [[0,1],[1,2],[3,4]]",
      "output": "2"
    },
    {
      "input": "n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]",
      "output": "1"
    }
  ],
  constraints: [
    "1 <= n <= 2000",
    "1 <= edges.length <= 5000",
    "edges[i].length == 2",
    "0 <= ai, bi < n",
    "ai != bi",
    "There are no self-loops or repeated edges."
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
    vector<int> parent;
    int find(int i) {
        // Write your code here
        return 0;
    }
public:
    int countComponents(int n, vector<vector<int>>& edges) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<vector<int>> e = {{0,1},{1,2},{3,4}};
    cout << sol.countComponents(5, e) << endl; // 2
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Generate all possible paths or check connectivity of all node pairs.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;

class Solution {
    vector<int> parent;
    int find(int i) {
        // Write your code here
        return 0;
    }
public:
    int countComponents(int n, vector<vector<int>>& edges) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<vector<int>> e = {{0,1},{1,2},{3,4}};
    cout << sol.countComponents(5, e) << endl; // 2
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Standard Breadth-First Search (BFS) or Depth-First Search (DFS) to traverse nodes.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;

class Solution {
    vector<int> parent;
    int find(int i) {
        // Write your code here
        return 0;
    }
public:
    int countComponents(int n, vector<vector<int>>& edges) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<vector<int>> e = {{0,1},{1,2},{3,4}};
    cout << sol.countComponents(5, e) << endl; // 2
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Optimized graph algorithms (like Dijkstra, Kruskal, or Union-Find) to solve shortest path or connectivity.`,
        code: `#include <bits/stdc++.h>
using namespace std;

class Solution {
    vector<int> parent;
    int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]);
    }
public:
    int countComponents(int n, vector<vector<int>>& edges) {
        parent.resize(n);
        for (int i = 0; i < n; i++) parent[i] = i;
        int count = n;
        for (auto& e : edges) {
            int r1 = find(e[0]);
            int r2 = find(e[1]);
            if (r1 != r2) {
                parent[r1] = r2;
                count--;
            }
        }
        return count;
    }
};

int main() {
    Solution sol;
    vector<vector<int>> e = {{0,1},{1,2},{3,4}};
    cout << sol.countComponents(5, e) << endl; // 2
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def countComponents(self, n: int, edges: List[List[int]]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    e = [[0,1],[1,2],[3,4]]
    print(sol.countComponents(5, e))  # 2`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Generate all possible paths or check connectivity of all node pairs.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from typing import List

class Solution:
    def countComponents(self, n: int, edges: List[List[int]]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    e = [[0,1],[1,2],[3,4]]
    print(sol.countComponents(5, e))  # 2`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Standard Breadth-First Search (BFS) or Depth-First Search (DFS) to traverse nodes.`,
        code: `// Better Solution
// TODO: Implement optimized approach
from typing import List

class Solution:
    def countComponents(self, n: int, edges: List[List[int]]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    e = [[0,1],[1,2],[3,4]]
    print(sol.countComponents(5, e))  # 2`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Optimized graph algorithms (like Dijkstra, Kruskal, or Union-Find) to solve shortest path or connectivity.`,
        code: `from typing import List

class Solution:
    def countComponents(self, n: int, edges: List[List[int]]) -> int:
        parent = list(range(n))
        count = n

        def find(i: int) -> int:
            if parent[i] == i:
                return i
            parent[i] = find(parent[i])
            return parent[i]

        for e in edges:
            r1 = find(e[0])
            r2 = find(e[1])
            if r1 != r2:
                parent[r1] = r2
                count -= 1
        return count

if __name__ == '__main__':
    sol = Solution()
    e = [[0,1],[1,2],[3,4]]
    print(sol.countComponents(5, e))  # 2`
      }
    }
  }
};

export default problem;
