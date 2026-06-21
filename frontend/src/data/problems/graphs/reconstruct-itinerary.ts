import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "reconstruct-itinerary",
  title: "Reconstruct Itinerary",
  difficulty: "Hard",
  category: "Graphs",
  patterns: ["Graph","DFS"],
  url: "https://leetcode.com/problems/reconstruct-itinerary/",
  description: `You are given a list of airline tickets where \`tickets[i] = [fromi, toi]\` represent the departure and the arrival airports of one flight. Reconstruct the itinerary in order and return it.\\n\\nAll of the tickets belong to a man who departs from **"JFK"**, thus, the itinerary must begin with "JFK". If there are multiple valid itineraries, you should return the itinerary that has the smallest lexical order when read as a single string.\\n\\n- For example, the itinerary \`["JFK", "LGA"]\` has a smaller lexical order than \`["JFK", "LGB"]\`.\\n\\nYou may assume all tickets form at least one valid itinerary. You must use all the tickets once and only once.`,
  examples: [
    {
      "input": "tickets = [[\"MUC\",\"LHR\"],[\"JFK\",\"MUC\"],[\"SFO\",\"SJC\"],[\"LHR\",\"SFO\"]]",
      "output": "[\"JFK\",\"MUC\",\"LHR\",\"SFO\",\"SJC\"]"
    },
    {
      "input": "tickets = [[\"JFK\",\"SFO\"],[\"JFK\",\"ATL\"],[\"SFO\",\"ATL\"],[\"ATL\",\"JFK\"],[\"ATL\",\"SFO\"]]",
      "output": "[\"JFK\",\"ATL\",\"JFK\",\"SFO\",\"ATL\",\"SFO\"]",
      "explanation": "Another possible reconstruction is [\"JFK\",\"SFO\",\"ATL\",\"JFK\",\"ATL\",\"SFO\"]. But it is larger in lexical order."
    }
  ],
  constraints: [
    "1 <= tickets.length <= 300",
    "tickets[i].length == 2",
    "fromi.length == 3",
    "toi.length == 3",
    "fromi and toi consist of uppercase English letters.",
    "fromi != toi"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
    unordered_map<string, multiset<string>> adj;
    vector<string> res;
    void dfs(string s) {
        // Write your code here
    }
public:
    vector<string> findItinerary(vector<vector<string>>& tickets) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<vector<string>> t = {{"MUC","LHR"},{"JFK","MUC"},{"SFO","SJC"},{"LHR","SFO"}};
    for (string s : sol.findItinerary(t)) cout << s << " ";
    cout << endl; // JFK MUC LHR SFO SJC
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(2^N)",
        spaceComplexity: "O(1)",
        approach: `Generate all possible paths or check connectivity of all node pairs.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;

class Solution {
    unordered_map<string, multiset<string>> adj;
    vector<string> res;
    void dfs(string s) {
        // Write your code here
    }
public:
    vector<string> findItinerary(vector<vector<string>>& tickets) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<vector<string>> t = {{"MUC","LHR"},{"JFK","MUC"},{"SFO","SJC"},{"LHR","SFO"}};
    for (string s : sol.findItinerary(t)) cout << s << " ";
    cout << endl; // JFK MUC LHR SFO SJC
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(N)",
        approach: `Standard Breadth-First Search (BFS) or Depth-First Search (DFS) to traverse nodes.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;

class Solution {
    unordered_map<string, multiset<string>> adj;
    vector<string> res;
    void dfs(string s) {
        // Write your code here
    }
public:
    vector<string> findItinerary(vector<vector<string>>& tickets) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<vector<string>> t = {{"MUC","LHR"},{"JFK","MUC"},{"SFO","SJC"},{"LHR","SFO"}};
    for (string s : sol.findItinerary(t)) cout << s << " ";
    cout << endl; // JFK MUC LHR SFO SJC
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Optimized graph algorithms (like Dijkstra, Kruskal, or Union-Find) to solve shortest path or connectivity.`,
        code: `#include <bits/stdc++.h>
using namespace std;

class Solution {
    unordered_map<string, multiset<string>> adj;
    vector<string> res;
    void dfs(string s) {
        while (!adj[s].empty()) {
            string next = *adj[s].begin();
            adj[s].erase(adj[s].begin());
            dfs(next);
        }
        res.push_back(s);
    }
public:
    vector<string> findItinerary(vector<vector<string>>& tickets) {
        for (auto& t : tickets) adj[t[0]].insert(t[1]);
        dfs("JFK");
        reverse(res.begin(), res.end());
        return res;
    }
};

int main() {
    Solution sol;
    vector<vector<string>> t = {{"MUC","LHR"},{"JFK","MUC"},{"SFO","SJC"},{"LHR","SFO"}};
    for (string s : sol.findItinerary(t)) cout << s << " ";
    cout << endl; // JFK MUC LHR SFO SJC
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List, Dict, Set
from collections import defaultdict

class Solution:
    def findItinerary(self, tickets: List[List[str]]) -> List[str]:
        # Write your code here
        return []
    def dfs(self, s: str) -> None:
        # Write your code here
        pass
if __name__ == '__main__':
    sol = Solution()
    t = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
    print(' '.join(sol.findItinerary(t)))  # JFK MUC LHR SFO SJC`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(2^N)",
        spaceComplexity: "O(1)",
        approach: `Generate all possible paths or check connectivity of all node pairs.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from typing import List, Dict, Set
from collections import defaultdict

class Solution:
    def findItinerary(self, tickets: List[List[str]]) -> List[str]:
        # Write your code here
        return []
    def dfs(self, s: str) -> None:
        # Write your code here
        pass
if __name__ == '__main__':
    sol = Solution()
    t = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
    print(' '.join(sol.findItinerary(t)))  # JFK MUC LHR SFO SJC`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(N)",
        approach: `Standard Breadth-First Search (BFS) or Depth-First Search (DFS) to traverse nodes.`,
        code: `// Better Solution
// TODO: Implement optimized approach
from typing import List, Dict, Set
from collections import defaultdict

class Solution:
    def findItinerary(self, tickets: List[List[str]]) -> List[str]:
        # Write your code here
        return []
    def dfs(self, s: str) -> None:
        # Write your code here
        pass
if __name__ == '__main__':
    sol = Solution()
    t = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
    print(' '.join(sol.findItinerary(t)))  # JFK MUC LHR SFO SJC`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Optimized graph algorithms (like Dijkstra, Kruskal, or Union-Find) to solve shortest path or connectivity.`,
        code: `from typing import List, Dict, Set
from collections import defaultdict

class Solution:
    def findItinerary(self, tickets: List[List[str]]) -> List[str]:
        self.adj = defaultdict(list)
        self.res = []
        for t in tickets:
            self.adj[t[0]].append(t[1])
        for k in self.adj:
            self.adj[k].sort(reverse=True)
        self.dfs("JFK")
        return self.res[::-1]

    def dfs(self, s: str) -> None:
        while self.adj[s]:
            next = self.adj[s].pop()
            self.dfs(next)
        self.res.append(s)

if __name__ == '__main__':
    sol = Solution()
    t = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
    print(' '.join(sol.findItinerary(t)))  # JFK MUC LHR SFO SJC`
      }
    }
  }
};

export default problem;
