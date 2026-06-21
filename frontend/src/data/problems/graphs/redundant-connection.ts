import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "redundant-connection",
  title: "Redundant Connection",
  difficulty: "Medium",
  category: "Graphs",
  patterns: ["Graph","DFS","Union Find"],
  url: "https://leetcode.com/problems/redundant-connection/",
  description: `In this problem, a tree is an **undirected graph** that is connected and has no cycles.

You are given a graph that started as a tree with \`n\` nodes labeled from \`1\` to \`n\`, with one additional edge added. The added edge has two **different** vertices chosen from \`1\` to \`n\`, and was not an edge that already existed. The resulting graph is given as a 2D-array of \`edges\`. Each element of \`edges\` is a pair \`[ui, vi]\` that represents an **undirected** edge between nodes \`ui\` and \`vi\`.

Return an edge that can be removed so that the resulting graph is a tree of \`n\` nodes. If there are multiple answers, return the answer that occurs last in the input.`,
  examples: [
    {
      "input": "edges = [[1,2],[1,3],[2,3]]",
      "output": "[2,3]"
    },
    {
      "input": "edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]",
      "output": "[1,4]"
    }
  ],
  constraints: [
    "n == edges.length",
    "3 <= n <= 1000",
    "edges[i].length == 2",
    "1 <= ui < vi <= n",
    "ui != vi",
    "There are no repeated edges.",
    "The given graph is connected."
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
    vector<int> parent, rank_;
    int find(int x){
        // Write your code here
        return 0;
    }
    bool unite(int a,int b){
        // Write your code here
        return false;
    }
public:
    vector<int> findRedundantConnection(vector<vector<int>>& edges){
        // Write your code here
        return {};
    }
};

int main(){
    Solution sol;
    vector<vector<int>> e={{1,2},{1,3},{2,3}};
    auto r=sol.findRedundantConnection(e);
    cout<<r[0]<<" "<<r[1]<<endl; // 2 3
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
    vector<int> parent, rank_;
    int find(int x){
        // Write your code here
        return 0;
    }
    bool unite(int a,int b){
        // Write your code here
        return false;
    }
public:
    vector<int> findRedundantConnection(vector<vector<int>>& edges){
        // Write your code here
        return {};
    }
};

int main(){
    Solution sol;
    vector<vector<int>> e={{1,2},{1,3},{2,3}};
    auto r=sol.findRedundantConnection(e);
    cout<<r[0]<<" "<<r[1]<<endl; // 2 3
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
    vector<int> parent, rank_;
    int find(int x){
        // Write your code here
        return 0;
    }
    bool unite(int a,int b){
        // Write your code here
        return false;
    }
public:
    vector<int> findRedundantConnection(vector<vector<int>>& edges){
        // Write your code here
        return {};
    }
};

int main(){
    Solution sol;
    vector<vector<int>> e={{1,2},{1,3},{2,3}};
    auto r=sol.findRedundantConnection(e);
    cout<<r[0]<<" "<<r[1]<<endl; // 2 3
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
    vector<int> parent, rank_;
    int find(int x){ return parent[x]==x?x:parent[x]=find(parent[x]); }
    bool unite(int a,int b){
        int pa=find(a),pb=find(b);
        if(pa==pb) return false;
        if(rank_[pa]<rank_[pb]) swap(pa,pb);
        parent[pb]=pa;
        if(rank_[pa]==rank_[pb]) rank_[pa]++;
        return true;
    }
public:
    vector<int> findRedundantConnection(vector<vector<int>>& edges){
        int n=edges.size();
        parent.resize(n+1); rank_.resize(n+1,0);
        for(int i=0;i<=n;i++) parent[i]=i;
        for(auto&e:edges) if(!unite(e[0],e[1])) return e;
        return {};
    }
};

int main(){
    Solution sol;
    vector<vector<int>> e={{1,2},{1,3},{2,3}};
    auto r=sol.findRedundantConnection(e);
    cout<<r[0]<<" "<<r[1]<<endl; // 2 3
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def __init__(self):
        # Write your code here
        pass
    def find(self, x: int) -> int:
        # Write your code here
        return 0
    def unite(self, a: int, b: int) -> bool:
        # Write your code here
        return False
    def findRedundantConnection(self, edges: List[List[int]]) -> List[int]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    e = [[1, 2], [1, 3], [2, 3]]
    r = sol.findRedundantConnection(e)
    print(r[0] if len(r) >= 2 else "", r[1] if len(r) >= 2 else f"Output: {r}")`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Generate all possible paths or check connectivity of all node pairs.`,
        code: `# Brute Force Approach
# TODO: Implement brute force
from typing import List

class Solution:
    def __init__(self):
        # Write your code here
        pass
    def find(self, x: int) -> int:
        # Write your code here
        return 0
    def unite(self, a: int, b: int) -> bool:
        # Write your code here
        return False
    def findRedundantConnection(self, edges: List[List[int]]) -> List[int]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    e = [[1, 2], [1, 3], [2, 3]]
    r = sol.findRedundantConnection(e)
    print(r[0] if len(r) >= 2 else "", r[1] if len(r) >= 2 else f"Output: {r}")  # 2 3`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Standard Breadth-First Search (BFS) or Depth-First Search (DFS) to traverse nodes.`,
        code: `# Better Solution
# TODO: Implement optimized approach
from typing import List

class Solution:
    def __init__(self):
        # Write your code here
        pass
    def find(self, x: int) -> int:
        # Write your code here
        return 0
    def unite(self, a: int, b: int) -> bool:
        # Write your code here
        return False
    def findRedundantConnection(self, edges: List[List[int]]) -> List[int]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    e = [[1, 2], [1, 3], [2, 3]]
    r = sol.findRedundantConnection(e)
    print(r[0] if len(r) >= 2 else "", r[1] if len(r) >= 2 else f"Output: {r}")  # 2 3`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Optimized graph algorithms (like Dijkstra, Kruskal, or Union-Find) to solve shortest path or connectivity.`,
        code: `from typing import List

class Solution:
    def __init__(self):
        self.parent = []
        self.rank_ = []

    def find(self, x: int) -> int:
        if self.parent[x] == x:
            return x
        self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def unite(self, a: int, b: int) -> bool:
        pa = self.find(a)
        pb = self.find(b)
        if pa == pb:
            return False
        if self.rank_[pa] < self.rank_[pb]:
            pa, pb = pb, pa
        self.parent[pb] = pa
        if self.rank_[pa] == self.rank_[pb]:
            self.rank_[pa] += 1
        return True

    def findRedundantConnection(self, edges: List[List[int]]) -> List[int]:
        n = len(edges)
        self.parent = list(range(n + 1))
        self.rank_ = [0] * (n + 1)
        for e in edges:
            if not self.unite(e[0], e[1]):
                return e
        return []

if __name__ == '__main__':
    sol = Solution()
    e = [[1, 2], [1, 3], [2, 3]]
    r = sol.findRedundantConnection(e)
    print(r[0] if len(r) >= 2 else "", r[1] if len(r) >= 2 else f"Output: {r}")  # 2 3`
      }
    }
  }
};

export default problem;
