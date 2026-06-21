import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "find-if-path-exists-in-graph",
  title: "Find if Path Exists in Graph",
  difficulty: "Easy",
  category: "Graphs",
  patterns: ["Graph","BFS"],
  url: "https://leetcode.com/problems/find-if-path-exists-in-graph/",
  description: `There is a **bi-directional** graph with \`n\` vertices, where each vertex is labeled from \`0\` to \`n - 1\`. The edges in the graph are represented as a 2D integer array \`edges\`, where each \`edges[i] = [ui, vi]\` denotes a bi-directional edge between vertex \`ui\` and vertex \`vi\`. Every vertex pair is connected by **at most one** edge, and no vertex has an edge to itself.

You want to determine if there is a **valid path** that exists from vertex \`source\` to vertex \`destination\`.

Given \`edges\` and the integers \`n\`, \`source\`, and \`destination\`, return \`true\` if there is a **valid path** from \`source\` to \`destination\`, or \`false\` otherwise.`,
  examples: [
    {
      "input": "n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2",
      "output": "true",
      "explanation": "There are two paths from vertex 0 to vertex 2:\n- 0 -> 1 -> 2\n- 0 -> 2"
    },
    {
      "input": "n = 6, edges = [[0,1],[0,2],[3,5],[5,4],[4,3]], source = 0, destination = 5",
      "output": "false",
      "explanation": "There is no path from vertex 0 to vertex 5."
    }
  ],
  constraints: [
    "1 <= n <= 2 * 10^5",
    "0 <= edges.length <= 2 * 10^5",
    "edges[i].length == 2",
    "0 <= ui, vi <= n - 1",
    "ui != vi",
    "0 <= source, destination <= n - 1",
    "There are no duplicate edges.",
    "There are no self edges."
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    bool validPath(int n, vector<vector<int>>& edges, int source, int destination){
        // Write your code here
        return false;
    }
};

int main(){
    Solution sol;
    vector<vector<int>> e={{0,1},{1,2},{2,0}};
    cout<<boolalpha<<sol.validPath(3,e,0,2)<<endl; // true
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
public:
    bool validPath(int n, vector<vector<int>>& edges, int source, int destination){
        // Write your code here
        return false;
    }
};

int main(){
    Solution sol;
    vector<vector<int>> e={{0,1},{1,2},{2,0}};
    cout<<boolalpha<<sol.validPath(3,e,0,2)<<endl; // true
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
public:
    bool validPath(int n, vector<vector<int>>& edges, int source, int destination){
        // Write your code here
        return false;
    }
};

int main(){
    Solution sol;
    vector<vector<int>> e={{0,1},{1,2},{2,0}};
    cout<<boolalpha<<sol.validPath(3,e,0,2)<<endl; // true
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
public:
    bool validPath(int n, vector<vector<int>>& edges, int source, int destination){
        vector<vector<int>> adj(n);
        for(auto&e:edges){adj[e[0]].push_back(e[1]);adj[e[1]].push_back(e[0]);}
        vector<bool> vis(n,false);
        queue<int> q; q.push(source); vis[source]=true;
        while(!q.empty()){
            int u=q.front();q.pop();
            if(u==destination)return true;
            for(int v:adj[u])if(!vis[v]){vis[v]=true;q.push(v);}
        }
        return false;
    }
};

int main(){
    Solution sol;
    vector<vector<int>> e={{0,1},{1,2},{2,0}};
    cout<<boolalpha<<sol.validPath(3,e,0,2)<<endl; // true
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List
from collections import deque

class Solution:
    def validPath(self, n: int, edges: List[List[int]], source: int, destination: int) -> bool:
        # Write your code here
        return False
if __name__ == '__main__':
    sol = Solution()
    e = [[0,1],[1,2],[2,0]]
    print(sol.validPath(3, e, 0, 2))  # true`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Generate all possible paths or check connectivity of all node pairs.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from typing import List
from collections import deque

class Solution:
    def validPath(self, n: int, edges: List[List[int]], source: int, destination: int) -> bool:
        # Write your code here
        return False
if __name__ == '__main__':
    sol = Solution()
    e = [[0,1],[1,2],[2,0]]
    print(sol.validPath(3, e, 0, 2))  # true`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Standard Breadth-First Search (BFS) or Depth-First Search (DFS) to traverse nodes.`,
        code: `// Better Solution
// TODO: Implement optimized approach
from typing import List
from collections import deque

class Solution:
    def validPath(self, n: int, edges: List[List[int]], source: int, destination: int) -> bool:
        # Write your code here
        return False
if __name__ == '__main__':
    sol = Solution()
    e = [[0,1],[1,2],[2,0]]
    print(sol.validPath(3, e, 0, 2))  # true`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Optimized graph algorithms (like Dijkstra, Kruskal, or Union-Find) to solve shortest path or connectivity.`,
        code: `from typing import List
from collections import deque

class Solution:
    def validPath(self, n: int, edges: List[List[int]], source: int, destination: int) -> bool:
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
        vis = [False] * n
        q = deque([source])
        vis[source] = True
        while q:
            u = q.popleft()
            if u == destination:
                return True
            for v in adj[u]:
                if not vis[v]:
                    vis[v] = True
                    q.append(v)
        return False

if __name__ == '__main__':
    sol = Solution()
    e = [[0,1],[1,2],[2,0]]
    print(sol.validPath(3, e, 0, 2))  # true`
      }
    }
  }
};

export default problem;
