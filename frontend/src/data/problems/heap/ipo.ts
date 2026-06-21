import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "ipo",
  title: "IPO",
  difficulty: "Hard",
  category: "Heap / Priority Queue",
  patterns: ["Heap"],
  url: "https://leetcode.com/problems/ipo/",
  description: `Suppose LeetCode will start its **IPO** soon. In order to sell a good price of its shares to Venture Capital, LeetCode would like to work on some projects to increase its capital before the IPO. Since it has limited resources, it can only finish at most \`k\` distinct projects before the IPO. Help LeetCode design the best way to maximize its total capital after finishing at most \`k\` distinct projects.

You are given \`n\` projects where the \`ith\` project has a profit \`profits[i]\` and a minimum capital \`capital[i]\` needed to start it.

Initially, you have \`w\` capital. When you finish a project, you will obtain its pure profit and the profit will be added to your total capital.

Pick a list of at most \`k\` distinct projects from given projects to **maximize your final capital**, and return the final maximized capital.`,
  examples: [
    {
      "input": "k = 2, w = 0, profits = [1,2,3], capital = [0,1,1]",
      "output": "4",
      "explanation": "Since your initial capital is 0, you can only start the project indexed 0.\nAfter finishing it, you will obtain profit 1 and your capital becomes 1.\nWith capital 1, you can either start the project indexed 1 or the project indexed 2.\nSince you can choose at most 2 projects, you need to finish the project indexed 2 to get the maximum capital.\nTherefore, output the final maximized capital, which is 0 + 1 + 3 = 4."
    }
  ],
  constraints: [
    "1 <= k <= 10^5",
    "0 <= w <= 10^9",
    "n == profits.length",
    "n == capital.length",
    "1 <= n <= 10^5",
    "0 <= profits[i] <= 10^4",
    "0 <= capital[i] <= 10^9"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int findMaximizedCapital(int k, int w, vector<int>& profits, vector<int>& capital){
        // Write your code here
        return 0;
    }
};

int main(){
    Solution sol;
    vector<int> p={1,2,3}, c={0,1,1};
    cout<<sol.findMaximizedCapital(2,0,p,c)<<endl; // 4
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(2^N)",
        spaceComplexity: "O(1)",
        approach: `Sort the array or search for max/min elements repeatedly.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int findMaximizedCapital(int k, int w, vector<int>& profits, vector<int>& capital){
        // Write your code here
        return 0;
    }
};

int main(){
    Solution sol;
    vector<int> p={1,2,3}, c={0,1,1};
    cout<<sol.findMaximizedCapital(2,0,p,c)<<endl; // 4
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(N)",
        approach: `Insert all elements into a max-heap or min-heap and extract.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int findMaximizedCapital(int k, int w, vector<int>& profits, vector<int>& capital){
        // Write your code here
        return 0;
    }
};

int main(){
    Solution sol;
    vector<int> p={1,2,3}, c={0,1,1};
    cout<<sol.findMaximizedCapital(2,0,p,c)<<endl; // 4
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Maintain a min/max heap of size K, or use quickselect to get elements in-place with minimal overhead.`,
        code: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int findMaximizedCapital(int k, int w, vector<int>& profits, vector<int>& capital){
        int n=profits.size();
        vector<pair<int,int>> projects(n);
        for(int i=0;i<n;i++) projects[i]={capital[i],profits[i]};
        sort(projects.begin(),projects.end());
        priority_queue<int> pq;
        int i=0;
        for(int j=0;j<k;j++){
            while(i<n&&projects[i].first<=w){ pq.push(projects[i].second); i++; }
            if(pq.empty()) break;
            w+=pq.top(); pq.pop();
        }
        return w;
    }
};

int main(){
    Solution sol;
    vector<int> p={1,2,3}, c={0,1,1};
    cout<<sol.findMaximizedCapital(2,0,p,c)<<endl; // 4
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List
import heapq

class Solution:
    def findMaximizedCapital(self, k: int, w: int, profits: List[int], capital: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    p = [1, 2, 3]
    c = [0, 1, 1]
    print(sol.findMaximizedCapital(2, 0, p, c))  # 4`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(2^N)",
        spaceComplexity: "O(1)",
        approach: `Sort the array or search for max/min elements repeatedly.`,
        code: `# Brute Force Approach
# TODO: Implement brute force
from typing import List
import heapq

class Solution:
    def findMaximizedCapital(self, k: int, w: int, profits: List[int], capital: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    p = [1, 2, 3]
    c = [0, 1, 1]
    print(sol.findMaximizedCapital(2, 0, p, c))  # 4`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(N)",
        approach: `Insert all elements into a max-heap or min-heap and extract.`,
        code: `# Better Solution
# TODO: Implement optimized approach
from typing import List
import heapq

class Solution:
    def findMaximizedCapital(self, k: int, w: int, profits: List[int], capital: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    p = [1, 2, 3]
    c = [0, 1, 1]
    print(sol.findMaximizedCapital(2, 0, p, c))  # 4`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Maintain a min/max heap of size K, or use quickselect to get elements in-place with minimal overhead.`,
        code: `from typing import List
import heapq

class Solution:
    def findMaximizedCapital(self, k: int, w: int, profits: List[int], capital: List[int]) -> int:
        n = len(profits)
        projects = sorted(zip(capital, profits))
        pq = []
        i = 0
        for _ in range(k):
            while i < n and projects[i][0] <= w:
                heapq.heappush(pq, -projects[i][1])
                i += 1
            if not pq:
                break
            w += -heapq.heappop(pq)
        return w

if __name__ == '__main__':
    sol = Solution()
    p = [1, 2, 3]
    c = [0, 1, 1]
    print(sol.findMaximizedCapital(2, 0, p, c))  # 4`
      }
    }
  }
};

export default problem;
