import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "number-of-connected-components-in-an-undirected-graph",
  title: "Number of Connected Components in an Undirected Graph",
  difficulty: "Medium",
  category: "Graphs",
  patterns: ["Graph","DFS","Union Find"],
  url: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/",
  description: `You have a graph of \`n\` nodes. You are given an integer \`n\` and an array \`edges\` where \`edges[i] = [ai, bi]\` indicates that there is an edge between \`ai\` and \`bi\` in the graph.

Return the number of connected components in the graph.`,
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
    "0 <= ai <= bi < n",
    "ai != bi",
    "There are no repeated edges."
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
    vector<int> parent, rnk;
    int find(int x){
        // Write your code here
        return 0;
    }
    bool unite(int a,int b){
        // Write your code here
        return false;
    }
public:
    int countComponents(int n, vector<vector<int>>& edges){
        // Write your code here
        return 0;
    }
};

int main(){
    Solution sol;
    vector<vector<int>> e={{0,1},{1,2},{3,4}};
    cout<<sol.countComponents(5,e)<<endl; // 2
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
    vector<int> parent, rnk;
    int find(int x){
        // Write your code here
        return 0;
    }
    bool unite(int a,int b){
        // Write your code here
        return false;
    }
public:
    int countComponents(int n, vector<vector<int>>& edges){
        // Write your code here
        return 0;
    }
};

int main(){
    Solution sol;
    vector<vector<int>> e={{0,1},{1,2},{3,4}};
    cout<<sol.countComponents(5,e)<<endl; // 2
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
    vector<int> parent, rnk;
    int find(int x){
        // Write your code here
        return 0;
    }
    bool unite(int a,int b){
        // Write your code here
        return false;
    }
public:
    int countComponents(int n, vector<vector<int>>& edges){
        // Write your code here
        return 0;
    }
};

int main(){
    Solution sol;
    vector<vector<int>> e={{0,1},{1,2},{3,4}};
    cout<<sol.countComponents(5,e)<<endl; // 2
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
    vector<int> parent, rnk;
    int find(int x){return parent[x]==x?x:parent[x]=find(parent[x]);}
    bool unite(int a,int b){
        int pa=find(a),pb=find(b);
        if(pa==pb)return false;
        if(rnk[pa]<rnk[pb])swap(pa,pb);
        parent[pb]=pa;
        if(rnk[pa]==rnk[pb])rnk[pa]++;
        return true;
    }
public:
    int countComponents(int n, vector<vector<int>>& edges){
        parent.clear(); rnk.clear();
        parent.resize(n); rnk.resize(n,0);
        for(int i=0;i<n;i++)parent[i]=i;
        int comp=n;
        for(auto&e:edges)if(unite(e[0],e[1]))comp--;
        return comp;
    }
};

int main(){
    Solution sol;
    vector<vector<int>> e={{0,1},{1,2},{3,4}};
    cout<<sol.countComponents(5,e)<<endl; // 2
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
    def __init__(self):
        self.parent = []
        self.rnk = []

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
        if self.rnk[pa] < self.rnk[pb]:
            pa, pb = pb, pa
        self.parent[pb] = pa
        if self.rnk[pa] == self.rnk[pb]:
            self.rnk[pa] += 1
        return True

    def countComponents(self, n: int, edges: List[List[int]]) -> int:
        self.parent = [i for i in range(n)]
        self.rnk = [0] * n
        comp = n
        for e in edges:
            if self.unite(e[0], e[1]):
                comp -= 1
        return comp

if __name__ == '__main__':
    sol = Solution()
    e = [[0,1],[1,2],[3,4]]
    print(sol.countComponents(5, e))  # 2`
      }
    }
  }
};

export default problem;
