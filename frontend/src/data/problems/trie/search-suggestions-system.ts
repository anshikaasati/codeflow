import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "search-suggestions-system",
  title: "Search Suggestions System",
  difficulty: "Medium",
  category: "Trie",
  url: "https://leetcode.com/problems/search-suggestions-system/",
  description: "You are given an array of strings `products` and a string `searchWord`.\n\nDesign a system that suggests at most three product names from `products` after each character of `searchWord` is typed. Suggested products should have common prefix with `searchWord`. If there are more than three suggested products return the three lexicographically minimum products.\n\nReturn a list of lists of the suggested products after each character of `searchWord` is typed.",
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
    },
    python: {
      starterCode: `from typing import List

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
    },
    java: {
      starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Solution sol = new Solution();
        String[] products = {"mobile", "mouse", "moneypot", "monitor", "mousepad"};
        for (List<String> suggestions : sol.suggestedProducts(products, "mouse")) {
            for (String s : suggestions) {
                System.out.print(s + " ");
            }
            System.out.println();
        }
    }
}

class Solution {
    public List<List<String>> suggestedProducts(String[] products, String searchWord) {
        Arrays.sort(products);
        List<List<String>> res = new ArrayList<>();
        int l = 0, r = products.length - 1;
        for (int i = 0; i < searchWord.length(); i++) {
            char c = searchWord.charAt(i);
            while (l <= r && (products[l].length() <= i || products[l].charAt(i) < c)) l++;
            while (l <= r && (products[r].length() <= i || products[r].charAt(i) > c)) r--;
            List<String> suggestions = new ArrayList<>();
            for (int j = l; j <= Math.min(l + 2, r); j++) {
                suggestions.add(products[j]);
            }
            res.add(suggestions);
        }
        return res;
    }
}`
    }
  }
};

export default problem;

