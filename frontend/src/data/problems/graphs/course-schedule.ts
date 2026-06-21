import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "course-schedule",
  title: "Course Schedule",
  difficulty: "Medium",
  category: "Graphs",
  patterns: ["Graph","DFS","Topological Sort"],
  url: "https://leetcode.com/problems/course-schedule/",
  description: "There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you must take course `bi` first if you want to take course `ai`.\n\n- For example, the pair `[0, 1]`, indicates that to take course 0 you have to first take course 1.\n\nReturn `true` if you can finish all courses. Otherwise, return `false`.",
  examples: [
  {
    "input": "numCourses = 2, prerequisites = [[1,0]]",
    "output": "true",
    "explanation": "There are a total of 2 courses to take. To take course 1 you should have finished course 0. So it is possible."
  },
  {
    "input": "numCourses = 2, prerequisites = [[1,0],[0,1]]",
    "output": "false",
    "explanation": "There are a total of 2 courses to take. To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible."
  }
],
  constraints: [
  "1 <= numCourses <= 2000",
  "0 <= prerequisites.length <= 5000",
  "prerequisites[i].length == 2",
  "0 <= ai, bi < numCourses",
  "All the pairs prerequisites[i] are unique."
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
    bool hasCycle(int node, vector<vector<int>>& adj, vector<int>& state) {
        // Write your code here
        return false;
    }
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        // Write your code here
        return false;
    }
};

int main() {
    Solution sol;
    cout << boolalpha;
    vector<vector<int>> p1 = {{1,0}};
    cout << sol.canFinish(2, p1) << endl; // true
    vector<vector<int>> p2 = {{1,0},{0,1}};
    cout << sol.canFinish(2, p2) << endl; // false (cycle)
    return 0;
}`,
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
    bool hasCycle(int node, vector<vector<int>>& adj, vector<int>& state) {
        if (state[node] == 1) return true;  // in current path
        if (state[node] == 2) return false; // already processed
        state[node] = 1;
        for (int nei : adj[node])
            if (hasCycle(nei, adj, state)) return true;
        state[node] = 2;
        return false;
    }
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(numCourses);
        for (auto& p : prerequisites) adj[p[1]].push_back(p[0]);
        vector<int> state(numCourses, 0);
        for (int i = 0; i < numCourses; i++)
            if (hasCycle(i, adj, state)) return false;
        return true;
    }
};

int main() {
    Solution sol;
    cout << boolalpha;
    vector<vector<int>> p1 = {{1,0}};
    cout << sol.canFinish(2, p1) << endl; // true
    vector<vector<int>> p2 = {{1,0},{0,1}};
    cout << sol.canFinish(2, p2) << endl; // false (cycle)
    return 0;
}`
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def hasCycle(self, node: int, adj: List[List[int]], state: List[int]) -> bool:
        # Write your code here
        return False
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        # Write your code here
        return False
if __name__ == '__main__':
    sol = Solution()
    p1 = [[1,0]]
    print(sol.canFinish(2, p1)) # true
    p2 = [[1,0],[0,1]]
    print(sol.canFinish(2, p2)) # false (cycle)`,
      solutionCode: `from typing import List

class Solution:
    def hasCycle(self, node: int, adj: List[List[int]], state: List[int]) -> bool:
        if state[node] == 1: return True  # in current path
        if state[node] == 2: return False # already processed
        state[node] = 1
        for nei in adj[node]:
            if self.hasCycle(nei, adj, state): return True
        state[node] = 2
        return False

    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        adj = [[] for _ in range(numCourses)]
        for p in prerequisites: adj[p[1]].append(p[0])
        state = [0] * numCourses
        for i in range(numCourses):
            if self.hasCycle(i, adj, state): return False
        return True

if __name__ == '__main__':
    sol = Solution()
    p1 = [[1,0]]
    print(sol.canFinish(2, p1)) # true
    p2 = [[1,0],[0,1]]
    print(sol.canFinish(2, p2)) # false (cycle)`
    }
  }
};

export default problem;
