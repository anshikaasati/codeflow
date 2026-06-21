import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "replace-words",
  title: "Replace Words",
  difficulty: "Medium",
  category: "Trie",
  patterns: ["Trie","DFS","Recursion"],
  url: "https://leetcode.com/problems/replace-words/",
  description: `In English, we have a concept called **root**, which can be followed by some other word to form another longer word - let's call this word **derivative**. For example, when the root \`"help"\` is followed by the word \`"ful"\`, we can form a derivative \`"helpful"\`.

Given a \`dictionary\` consisting of many **roots** and a \`sentence\` consisting of words separated by spaces, replace all the derivatives in the sentence with the root forming it. If a derivative can be replaced by more than one root, replace it with the root that has the shortest length.

Return the \`sentence\` after the replacement.`,
  examples: [
    {
      "input": "dictionary = [\"cat\",\"bat\",\"rat\"], sentence = \"the cattle was rattled by the battery\"",
      "output": "\"the cat was rat by the bat\""
    },
    {
      "input": "dictionary = [\"a\",\"b\",\"c\"], sentence = \"aadsfasw absbs bbab cadsfafs\"",
      "output": "\"a a b c\""
    }
  ],
  constraints: [
    "1 <= dictionary.length <= 1000",
    "1 <= dictionary[i].length <= 100",
    "dictionary[i] consists of only lowercase English letters.",
    "1 <= sentence.length <= 10^6",
    "sentence consists of only lowercase English letters and spaces.",
    "The number of words in sentence is in the range [1, 1000]",
    "The length of each word in sentence is in the range [1, 1000]"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

struct TrieNode { TrieNode* ch[26]={}; bool end=false; };

class Solution {
    TrieNode* root=new TrieNode();
    string findRoot(string& w){
        // Write your code here
        return "";
    }
public:
    string replaceWords(vector<string>& dict, string sentence){
        // Write your code here
        return "";
    }
};

int main(){
    Solution sol;
    vector<string> dict={"cat","bat","rat"};
    cout<<sol.replaceWords(dict,"the cattle was rattled by the battery")<<endl; // the cat was rat by the bat
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

struct TrieNode { TrieNode* ch[26]={}; bool end=false; };

class Solution {
    TrieNode* root=new TrieNode();
    string findRoot(string& w){
        // Write your code here
        return "";
    }
public:
    string replaceWords(vector<string>& dict, string sentence){
        // Write your code here
        return "";
    }
};

int main(){
    Solution sol;
    vector<string> dict={"cat","bat","rat"};
    cout<<sol.replaceWords(dict,"the cattle was rattled by the battery")<<endl; // the cat was rat by the bat
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

struct TrieNode { TrieNode* ch[26]={}; bool end=false; };

class Solution {
    TrieNode* root=new TrieNode();
    string findRoot(string& w){
        // Write your code here
        return "";
    }
public:
    string replaceWords(vector<string>& dict, string sentence){
        // Write your code here
        return "";
    }
};

int main(){
    Solution sol;
    vector<string> dict={"cat","bat","rat"};
    cout<<sol.replaceWords(dict,"the cattle was rattled by the battery")<<endl; // the cat was rat by the bat
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

struct TrieNode { TrieNode* ch[26]={}; bool end=false; };

class Solution {
    TrieNode* root=new TrieNode();
    string findRoot(string& w){
        TrieNode* cur=root;
        for(int i=0;i<(int)w.size();i++){
            int idx=w[i]-'a';
            if(!cur->ch[idx]) return w;
            cur=cur->ch[idx];
            if(cur->end) return w.substr(0,i+1);
        }
        return w;
    }
public:
    string replaceWords(vector<string>& dict, string sentence){
        root = new TrieNode(); // reset for multiple calls
        for(auto&d:dict){
            TrieNode*cur=root;
            for(char c:d){
                int i=c-'a';
                if(!cur->ch[i]) cur->ch[i]=new TrieNode();
                cur=cur->ch[i];
            }
            cur->end=true;
        }
        string res="", word="";
        stringstream ss(sentence);
        while(ss >> word){
            if(!res.empty()) res+=" ";
            res+=findRoot(word);
        }
        return res;
    }
};

int main(){
    Solution sol;
    vector<string> dict={"cat","bat","rat"};
    cout<<sol.replaceWords(dict,"the cattle was rattled by the battery")<<endl; // the cat was rat by the bat
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Solution:
    def __init__(self):
        # Write your code here
        pass
    def find_root(self, word: str) -> str:
        # Write your code here
        return ""
    def replace_words(self, dict: List[str], sentence: str) -> str:
        # Write your code here
        return ""
if __name__ == '__main__':
    sol = Solution()
    dict = ["cat", "bat", "rat"]
    print(sol.replace_words(dict, "the cattle was rattled by the battery"))  # the cat was rat by the bat`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Search words or prefixes using nested string comparisons.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from typing import List

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Solution:
    def __init__(self):
        # Write your code here
        pass
    def find_root(self, word: str) -> str:
        # Write your code here
        return ""
    def replace_words(self, dict: List[str], sentence: str) -> str:
        # Write your code here
        return ""
if __name__ == '__main__':
    sol = Solution()
    dict = ["cat", "bat", "rat"]
    print(sol.replace_words(dict, "the cattle was rattled by the battery"))  # the cat was rat by the bat`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Search prefixes using a Hash Map representing character transitions.`,
        code: `// Better Solution
// TODO: Implement optimized approach
from typing import List

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Solution:
    def __init__(self):
        # Write your code here
        pass
    def find_root(self, word: str) -> str:
        # Write your code here
        return ""
    def replace_words(self, dict: List[str], sentence: str) -> str:
        # Write your code here
        return ""
if __name__ == '__main__':
    sol = Solution()
    dict = ["cat", "bat", "rat"]
    print(sol.replace_words(dict, "the cattle was rattled by the battery"))  # the cat was rat by the bat`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Implement a Prefix Tree (Trie) structure with pointer nodes for efficient insertions and prefix queries.`,
        code: `from typing import List

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Solution:
    def __init__(self):
        self.root = TrieNode()

    def find_root(self, word: str) -> str:
        cur = self.root
        for i in range(len(word)):
            idx = ord(word[i]) - ord('a')
            if idx not in cur.children:
                return word
            cur = cur.children[idx]
            if cur.is_end:
                return word[:i+1]
        return word

    def replace_words(self, dict: List[str], sentence: str) -> str:
        self.root = TrieNode()  # reset for multiple calls
        for word in dict:
            cur = self.root
            for char in word:
                idx = ord(char) - ord('a')
                if idx not in cur.children:
                    cur.children[idx] = TrieNode()
                cur = cur.children[idx]
            cur.is_end = True
        words = sentence.split()
        result = ""
        for word in words:
            if result:
                result += " "
            result += self.find_root(word)
        return result

if __name__ == '__main__':
    sol = Solution()
    dict = ["cat", "bat", "rat"]
    print(sol.replace_words(dict, "the cattle was rattled by the battery"))  # the cat was rat by the bat`
      }
    }
  }
};

export default problem;
