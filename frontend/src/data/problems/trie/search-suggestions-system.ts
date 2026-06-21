import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "search-suggestions-system",
  title: "Search Suggestions System",
  difficulty: "Medium",
  category: "Trie",
  patterns: ["Trie","DFS","Recursion"],
  url: "https://leetcode.com/problems/search-suggestions-system/",
  description: `You are given an array of strings \`products\` and a string \`searchWord\`.

Design a system that suggests at most three product names from \`products\` after each character of \`searchWord\` is typed. Suggested products should have common prefix with \`searchWord\`. If there are more than three suggested products return the three lexicographically minimum products.

Return a list of lists of the suggested products after each character of \`searchWord\` is typed.`,
  examples: [
    {
      "input": "products = [\"mobile\",\"mouse\",\"moneypot\",\"monitor\",\"mousepad\"], searchWord = \"mouse\"",
      "output": "[[\"mobile\",\"moneypot\",\"monitor\"],[\"mobile\",\"moneypot\",\"monitor\"],[\"mouse\",\"mousepad\"],[\"mouse\",\"mousepad\"],[\"mouse\",\"mousepad\"]]"
    }
  ],
  constraints: [
    "1 <= products.length <= 1000",
    "1 <= products[i].length <= 3000",
    "1 <= searchWord.length <= 1000",
    "All strings of products are unique.",
    "products[i] consists of lowercase English letters.",
    "searchWord consists of lowercase English letters."
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<vector<string>> suggestedProducts(vector<string>& products, string searchWord){
        // Write your code here
        return {};
    }
};

int main(){
    Solution sol;
    vector<string> p={"mobile","mouse","moneypot","monitor","mousepad"};
    for(auto&v:sol.suggestedProducts(p,"mouse")){for(auto&s:v)cout<<s<<" ";cout<<endl;}
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Search words or prefixes using nested string comparisons.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<vector<string>> suggestedProducts(vector<string>& products, string searchWord){
        // Write your code here
        return {};
    }
};

int main(){
    Solution sol;
    vector<string> p={"mobile","mouse","moneypot","monitor","mousepad"};
    for(auto&v:sol.suggestedProducts(p,"mouse")){for(auto&s:v)cout<<s<<" ";cout<<endl;}
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Search prefixes using a Hash Map representing character transitions.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<vector<string>> suggestedProducts(vector<string>& products, string searchWord){
        // Write your code here
        return {};
    }
};

int main(){
    Solution sol;
    vector<string> p={"mobile","mouse","moneypot","monitor","mousepad"};
    for(auto&v:sol.suggestedProducts(p,"mouse")){for(auto&s:v)cout<<s<<" ";cout<<endl;}
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Implement a Prefix Tree (Trie) structure with pointer nodes for efficient insertions and prefix queries.`,
        code: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<vector<string>> suggestedProducts(vector<string>& products, string searchWord){
        sort(products.begin(),products.end());
        vector<vector<string>> res;
        int l=0, r=products.size()-1;
        for(int i=0;i<(int)searchWord.size();i++){
            char c=searchWord[i];
            while(l<=r&&((int)products[l].size()<=i||products[l][i]<c)) l++;
            while(l<=r&&((int)products[r].size()<=i||products[r][i]>c)) r--;
            vector<string> suggestions;
            for(int j=l;j<=min(l+2,r);j++) suggestions.push_back(products[j]);
            res.push_back(suggestions);
        }
        return res;
    }
};

int main(){
    Solution sol;
    vector<string> p={"mobile","mouse","moneypot","monitor","mousepad"};
    for(auto&v:sol.suggestedProducts(p,"mouse")){for(auto&s:v)cout<<s<<" ";cout<<endl;}
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def suggestedProducts(self, products: List[str], searchWord: str) -> List[List[str]]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    products = ["mobile", "mouse", "moneypot", "monitor", "mousepad"]
    for suggestions in sol.suggestedProducts(products, "mouse"):
        print(' '.join(suggestions))`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Search words or prefixes using nested string comparisons.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from typing import List

class Solution:
    def suggestedProducts(self, products: List[str], searchWord: str) -> List[List[str]]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    products = ["mobile", "mouse", "moneypot", "monitor", "mousepad"]
    for suggestions in sol.suggestedProducts(products, "mouse"):
        print(' '.join(suggestions))`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Search prefixes using a Hash Map representing character transitions.`,
        code: `// Better Solution
// TODO: Implement optimized approach
from typing import List

class Solution:
    def suggestedProducts(self, products: List[str], searchWord: str) -> List[List[str]]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    products = ["mobile", "mouse", "moneypot", "monitor", "mousepad"]
    for suggestions in sol.suggestedProducts(products, "mouse"):
        print(' '.join(suggestions))`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Implement a Prefix Tree (Trie) structure with pointer nodes for efficient insertions and prefix queries.`,
        code: `from typing import List

class Solution:
    def suggestedProducts(self, products: List[str], searchWord: str) -> List[List[str]]:
        products.sort()
        result = []
        left, right = 0, len(products) - 1
        for i in range(len(searchWord)):
            char = searchWord[i]
            while left <= right and (len(products[left]) <= i or products[left][i] < char):
                left += 1
            while left <= right and (len(products[right]) <= i or products[right][i] > char):
                right -= 1
            suggestions = products[left:min(left + 3, right + 1)]
            result.append(suggestions)
        return result

if __name__ == '__main__':
    sol = Solution()
    products = ["mobile", "mouse", "moneypot", "monitor", "mousepad"]
    for suggestions in sol.suggestedProducts(products, "mouse"):
        print(' '.join(suggestions))`
      }
    }
  }
};

export default problem;
