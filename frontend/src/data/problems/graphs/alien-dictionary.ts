import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "alien-dictionary",
  title: "Alien Dictionary",
  difficulty: "Hard",
  category: "Graphs",
  patterns: ["Graph","BFS","Topological Sort"],
  url: "https://leetcode.com/problems/alien-dictionary/",
  description: `There is a new alien language that uses the English alphabet. However, the order of the letters is unknown to you.\\n\\nYou are given a list of strings \`words\` from the alien language's dictionary, where the strings in \`words\` are **sorted lexicographically** by the rules of this new language.\\n\\nReturn a string of the unique letters in the new alien language sorted in **lexicographically increasing order** by the new language's rules. If there is no solution, return \`""\`. If there are multiple solutions, return **any of them**.`,
  examples: [
    {
      "input": "words = [\"wrt\",\"wrf\",\"er\",\"ett\",\"rftt\"]",
      "output": "\"wertf\""
    },
    {
      "input": "words = [\"z\",\"x\"]",
      "output": "\"zx\""
    },
    {
      "input": "words = [\"z\",\"x\",\"z\"]",
      "output": "\"\"",
      "explanation": "The order is invalid, so return \"\"."
    }
  ],
  constraints: [
    "1 <= words.length <= 100",
    "1 <= words[i].length <= 100",
    "words[i] consists of only lowercase English letters."
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    string alienOrder(vector<string>& words) {
        // Write your code here
        return "";
    }
};

int main() {
    Solution sol;
    vector<string> w = {"wrt","wrf","er","ett","rftt"};
    cout << sol.alienOrder(w) << endl; // wertf
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
public:
    string alienOrder(vector<string>& words) {
        // Write your code here
        return "";
    }
};

int main() {
    Solution sol;
    vector<string> w = {"wrt","wrf","er","ett","rftt"};
    cout << sol.alienOrder(w) << endl; // wertf
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
public:
    string alienOrder(vector<string>& words) {
        // Write your code here
        return "";
    }
};

int main() {
    Solution sol;
    vector<string> w = {"wrt","wrf","er","ett","rftt"};
    cout << sol.alienOrder(w) << endl; // wertf
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
public:
    string alienOrder(vector<string>& words) {
        unordered_map<char, unordered_set<char>> adj;
        unordered_map<char, int> count;
        for (string& w : words) for (char c : w) count[c] = 0;
        
        for (int i = 0; i < (int)words.size() - 1; i++) {
            string s = words[i], t = words[i+1];
            int len = min(s.size(), t.size());
            if (s.size() > t.size() && s.substr(0, len) == t) return "";
            for (int j = 0; j < len; j++) {
                if (s[j] != t[j]) {
                    if (!adj[s[j]].count(t[j])) {
                        adj[s[j]].insert(t[j]);
                        count[t[j]]++;
                    }
                    break;
                }
            }
        }
        
        queue<char> q;
        for (auto& p : count) if (p.second == 0) q.push(p.first);
        string res = "";
        while (!q.empty()) {
            char c = q.front(); q.pop();
            res += c;
            for (char next : adj[c]) {
                if (--count[next] == 0) q.push(next);
            }
        }
        return res.size() == count.size() ? res : "";
    }
};

int main() {
    Solution sol;
    vector<string> w = {"wrt","wrf","er","ett","rftt"};
    cout << sol.alienOrder(w) << endl; // wertf
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List
from collections import defaultdict, deque

class Solution:
    def alienOrder(self, words: List[str]) -> str:
        # Write your code here
        return ""
if __name__ == '__main__':
    sol = Solution()
    w = ["wrt","wrf","er","ett","rftt"]
    print(sol.alienOrder(w))  # wertf`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(2^N)",
        spaceComplexity: "O(1)",
        approach: `Generate all possible paths or check connectivity of all node pairs.`,
        code: `# Brute Force Approach
# TODO: Implement brute force
from typing import List
from collections import defaultdict, deque

class Solution:
    def alienOrder(self, words: List[str]) -> str:
        # Write your code here
        return ""
if __name__ == '__main__':
    sol = Solution()
    w = ["wrt","wrf","er","ett","rftt"]
    print(sol.alienOrder(w))  # wertf`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(N)",
        approach: `Standard Breadth-First Search (BFS) or Depth-First Search (DFS) to traverse nodes.`,
        code: `# Better Solution
# TODO: Implement optimized approach
from typing import List
from collections import defaultdict, deque

class Solution:
    def alienOrder(self, words: List[str]) -> str:
        # Write your code here
        return ""
if __name__ == '__main__':
    sol = Solution()
    w = ["wrt","wrf","er","ett","rftt"]
    print(sol.alienOrder(w))  # wertf`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Optimized graph algorithms (like Dijkstra, Kruskal, or Union-Find) to solve shortest path or connectivity.`,
        code: `from typing import List
from collections import defaultdict, deque

class Solution:
    def alienOrder(self, words: List[str]) -> str:
        adj = defaultdict(set)
        count = defaultdict(int)
        for word in words:
            for char in word:
                count[char] = 0
        
        for i in range(len(words) - 1):
            s = words[i]
            t = words[i+1]
            len_min = min(len(s), len(t))
            if len(s) > len(t) and s[:len_min] == t[:len_min]:
                return ""
            for j in range(len_min):
                if s[j] != t[j]:
                    if t[j] not in adj[s[j]]:
                        adj[s[j]].add(t[j])
                        count[t[j]] += 1
                    break
        
        q = deque([char for char in count if count[char] == 0])
        res = ""
        while q:
            char = q.popleft()
            res += char
            for next_char in adj[char]:
                count[next_char] -= 1
                if count[next_char] == 0:
                    q.append(next_char)
        
        return res if len(res) == len(count) else ""

if __name__ == '__main__':
    sol = Solution()
    w = ["wrt","wrf","er","ett","rftt"]
    print(sol.alienOrder(w))  # wertf`
      }
    }
  }
};

export default problem;
