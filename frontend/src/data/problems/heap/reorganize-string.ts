import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "reorganize-string",
  title: "Reorganize String",
  difficulty: "Medium",
  category: "Heap / Priority Queue",
  patterns: ["Heap"],
  url: "https://leetcode.com/problems/reorganize-string/",
  description: `Given a string \`s\`, rearrange the characters of \`s\` so that any two adjacent characters are not the same.

Return any possible rearrangement of \`s\` or return \`""\` if not possible.`,
  examples: [
    {
      "input": "s = \"aab\"",
      "output": "\"aba\""
    },
    {
      "input": "s = \"aaab\"",
      "output": "\"\""
    }
  ],
  constraints: [
    "1 <= s.length <= 500",
    "s consists of lowercase English letters."
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    string reorganizeString(string s){
        // Write your code here
        return "";
    }
};

int main(){
    Solution sol;
    cout<<sol.reorganizeString("aab")<<endl; // aba
    cout<<sol.reorganizeString("aaab")<<endl; // ""
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
    string reorganizeString(string s){
        // Write your code here
        return "";
    }
};

int main(){
    Solution sol;
    cout<<sol.reorganizeString("aab")<<endl; // aba
    cout<<sol.reorganizeString("aaab")<<endl; // ""
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
    string reorganizeString(string s){
        // Write your code here
        return "";
    }
};

int main(){
    Solution sol;
    cout<<sol.reorganizeString("aab")<<endl; // aba
    cout<<sol.reorganizeString("aaab")<<endl; // ""
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
    string reorganizeString(string s){
        int freq[26]={};
        for(char c:s) freq[c-'a']++;
        priority_queue<pair<int,char>> pq;
        for(int i=0;i<26;i++) if(freq[i]) pq.push({freq[i],'a'+i});
        string res="";
        while(pq.size()>=2){
            auto[f1,c1]=pq.top();pq.pop();
            auto[f2,c2]=pq.top();pq.pop();
            res+=c1; res+=c2;
            if(f1-1) pq.push({f1-1,c1});
            if(f2-1) pq.push({f2-1,c2});
        }
        if(!pq.empty()){
            if(pq.top().first>1) return "";
            res+=pq.top().second;
        }
        return res;
    }
};

int main(){
    Solution sol;
    cout<<sol.reorganizeString("aab")<<endl; // aba
    cout<<sol.reorganizeString("aaab")<<endl; // ""
    return 0;
}`
      }
    },
    python: {
      starterCode: `from collections import Counter
import heapq

class Solution:
    def reorganizeString(self, s: str) -> str:
        # Write your code here
        return ""
if __name__ == '__main__':
    sol = Solution()
    print(sol.reorganizeString("aab"))   # aba
    print(sol.reorganizeString("aaab"))  # ""`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Sort the array or search for max/min elements repeatedly.`,
        code: `# Brute Force Approach
# TODO: Implement brute force
from collections import Counter
import heapq

class Solution:
    def reorganizeString(self, s: str) -> str:
        # Write your code here
        return ""
if __name__ == '__main__':
    sol = Solution()
    print(sol.reorganizeString("aab"))   # aba
    print(sol.reorganizeString("aaab"))  # ""`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Insert all elements into a max-heap or min-heap and extract.`,
        code: `# Better Solution
# TODO: Implement optimized approach
from collections import Counter
import heapq

class Solution:
    def reorganizeString(self, s: str) -> str:
        # Write your code here
        return ""
if __name__ == '__main__':
    sol = Solution()
    print(sol.reorganizeString("aab"))   # aba
    print(sol.reorganizeString("aaab"))  # ""`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Maintain a min/max heap of size K, or use quickselect to get elements in-place with minimal overhead.`,
        code: `from collections import Counter
import heapq

class Solution:
    def reorganizeString(self, s: str) -> str:
        freq = Counter(s)
        pq = [(-count, char) for char, count in freq.items()]
        heapq.heapify(pq)
        
        res = []
        while len(pq) >= 2:
            f1, c1 = heapq.heappop(pq)
            f2, c2 = heapq.heappop(pq)
            res.append(c1)
            res.append(c2)
            if f1 + 1 < 0:
                heapq.heappush(pq, (f1 + 1, c1))
            if f2 + 1 < 0:
                heapq.heappush(pq, (f2 + 1, c2))
                
        if pq:
            f, c = pq[0]
            if -f > 1:
                return ""
            res.append(c)
            
        return "".join(res)

if __name__ == '__main__':
    sol = Solution()
    print(sol.reorganizeString("aab"))   # aba
    print(sol.reorganizeString("aaab"))  # ""`
      }
    }
  }
};

export default problem;
