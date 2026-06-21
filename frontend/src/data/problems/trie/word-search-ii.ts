import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "word-search-ii",
  title: "Word Search II",
  difficulty: "Hard",
  category: "Trie",
  patterns: ["Trie","DFS","Recursion"],
  url: "https://leetcode.com/problems/word-search-ii/",
  description: `Given an \`m x n\` \`board\` of characters and a list of strings \`words\`, return all words on the board.

Each word must be constructed from letters of sequentially adjacent cells, where **adjacent cells** are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.`,
  examples: [
    {
      "input": "board = [[\"o\",\"a\",\"a\",\"n\"],[\"e\",\"t\",\"a\",\"e\"],[\"i\",\"h\",\"k\",\"r\"],[\"i\",\"f\",\"l\",\"v\"]], words = [\"oath\",\"pea\",\"eat\",\"rain\"]",
      "output": "[\"eat\",\"oath\"]"
    }
  ],
  constraints: [
    "m == board.length",
    "n == board[i].length",
    "1 <= m, n <= 12",
    "board[i][j] is a lowercase English letter.",
    "1 <= words.length <= 3 * 10^4",
    "1 <= words[i].length <= 10",
    "words[i] consists of lowercase English letters.",
    "All strings of words are unique."
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

struct TrieNode { TrieNode* ch[26]={}; string word=""; };

class Solution {
    TrieNode* build(vector<string>& words){
        // Write your code here
        return nullptr;
    }
    void dfs(vector<vector<char>>&b,int i,int j,TrieNode*node,vector<string>&res){
        // Write your code here
    }
public:
    vector<string> findWords(vector<vector<char>>& board, vector<string>& words){
        // Write your code here
        return {};
    }
};

int main(){
    Solution sol;
    vector<vector<char>> b={{'o','a','a','n'},{'e','t','a','e'},{'i','h','k','r'},{'i','f','l','v'}};
    vector<string> words={"oath","pea","eat","rain"};
    for(auto&w:sol.findWords(b,words)) cout<<w<<" ";
    cout<<endl;
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(2^N)",
        spaceComplexity: "O(1)",
        approach: `Search words or prefixes using nested string comparisons.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;

struct TrieNode { TrieNode* ch[26]={}; string word=""; };

class Solution {
    TrieNode* build(vector<string>& words){
        // Write your code here
        return nullptr;
    }
    void dfs(vector<vector<char>>&b,int i,int j,TrieNode*node,vector<string>&res){
        // Write your code here
    }
public:
    vector<string> findWords(vector<vector<char>>& board, vector<string>& words){
        // Write your code here
        return {};
    }
};

int main(){
    Solution sol;
    vector<vector<char>> b={{'o','a','a','n'},{'e','t','a','e'},{'i','h','k','r'},{'i','f','l','v'}};
    vector<string> words={"oath","pea","eat","rain"};
    for(auto&w:sol.findWords(b,words)) cout<<w<<" ";
    cout<<endl;
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(N)",
        approach: `Search prefixes using a Hash Map representing character transitions.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;

struct TrieNode { TrieNode* ch[26]={}; string word=""; };

class Solution {
    TrieNode* build(vector<string>& words){
        // Write your code here
        return nullptr;
    }
    void dfs(vector<vector<char>>&b,int i,int j,TrieNode*node,vector<string>&res){
        // Write your code here
    }
public:
    vector<string> findWords(vector<vector<char>>& board, vector<string>& words){
        // Write your code here
        return {};
    }
};

int main(){
    Solution sol;
    vector<vector<char>> b={{'o','a','a','n'},{'e','t','a','e'},{'i','h','k','r'},{'i','f','l','v'}};
    vector<string> words={"oath","pea","eat","rain"};
    for(auto&w:sol.findWords(b,words)) cout<<w<<" ";
    cout<<endl;
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Implement a Prefix Tree (Trie) structure with pointer nodes for efficient insertions and prefix queries.`,
        code: `#include <bits/stdc++.h>
using namespace std;

struct TrieNode { TrieNode* ch[26]={}; string word=""; };

class Solution {
    TrieNode* build(vector<string>& words){
        TrieNode* root=new TrieNode();
        for(auto&w:words){
            TrieNode*cur=root;
            for(char c:w){
                int i=c-'a';
                if(!cur->ch[i]) cur->ch[i]=new TrieNode();
                cur=cur->ch[i];
            }
            cur->word=w;
        }
        return root;
    }
    void dfs(vector<vector<char>>&b,int i,int j,TrieNode*node,vector<string>&res){
        if(i<0||i>=(int)b.size()||j<0||j>=(int)b[0].size()||b[i][j]=='#') return;
        char c=b[i][j]; int idx=c-'a';
        if(!node->ch[idx]) return;
        node=node->ch[idx];
        if(!node->word.empty()){
            res.push_back(node->word);
            node->word="";
        }
        b[i][j]='#';
        dfs(b,i+1,j,node,res);dfs(b,i-1,j,node,res);dfs(b,i,j+1,node,res);dfs(b,i,j-1,node,res);
        b[i][j]=c;
    }
public:
    vector<string> findWords(vector<vector<char>>& board, vector<string>& words){
        TrieNode* root=build(words);
        vector<string> res;
        for(int i=0;i<(int)board.size();i++) 
            for(int j=0;j<(int)board[0].size();j++) 
                dfs(board,i,j,root,res);
        return res;
    }
};

int main(){
    Solution sol;
    vector<vector<char>> b={{'o','a','a','n'},{'e','t','a','e'},{'i','h','k','r'},{'i','f','l','v'}};
    vector<string> words={"oath","pea","eat","rain"};
    for(auto&w:sol.findWords(b,words)) cout<<w<<" ";
    cout<<endl;
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class TrieNode:
    def __init__(self):
        self.children = [None]*26
        self.word = ""

class Solution:
    def build(self, words: List[str]) -> TrieNode:
        # Write your code here
        pass
    def dfs(self, board: List[List[str]], i: int, j: int, node: TrieNode, res: List[str]) -> None:
        # Write your code here
        pass
    def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]]
    words = ["oath","pea","eat","rain"]
    print(" ".join(sol.findWords(board, words)))`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(2^N)",
        spaceComplexity: "O(1)",
        approach: `Search words or prefixes using nested string comparisons.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from typing import List

class TrieNode:
    def __init__(self):
        self.children = [None]*26
        self.word = ""

class Solution:
    def build(self, words: List[str]) -> TrieNode:
        # Write your code here
        pass
    def dfs(self, board: List[List[str]], i: int, j: int, node: TrieNode, res: List[str]) -> None:
        # Write your code here
        pass
    def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]]
    words = ["oath","pea","eat","rain"]
    print(" ".join(sol.findWords(board, words)))`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(N)",
        approach: `Search prefixes using a Hash Map representing character transitions.`,
        code: `// Better Solution
// TODO: Implement optimized approach
from typing import List

class TrieNode:
    def __init__(self):
        self.children = [None]*26
        self.word = ""

class Solution:
    def build(self, words: List[str]) -> TrieNode:
        # Write your code here
        pass
    def dfs(self, board: List[List[str]], i: int, j: int, node: TrieNode, res: List[str]) -> None:
        # Write your code here
        pass
    def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]]
    words = ["oath","pea","eat","rain"]
    print(" ".join(sol.findWords(board, words)))`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Implement a Prefix Tree (Trie) structure with pointer nodes for efficient insertions and prefix queries.`,
        code: `from typing import List

class TrieNode:
    def __init__(self):
        self.children = [None]*26
        self.word = ""

class Solution:
    def build(self, words: List[str]) -> TrieNode:
        root = TrieNode()
        for word in words:
            cur = root
            for c in word:
                idx = ord(c) - ord('a')
                if not cur.children[idx]:
                    cur.children[idx] = TrieNode()
                cur = cur.children[idx]
            cur.word = word
        return root

    def dfs(self, board: List[List[str]], i: int, j: int, node: TrieNode, res: List[str]) -> None:
        if i < 0 or i >= len(board) or j < 0 or j >= len(board[0]) or board[i][j] == '#':
            return
        c = board[i][j]
        idx = ord(c) - ord('a')
        if not node.children[idx]:
            return
        node = node.children[idx]
        if not node.word:
            return
        res.append(node.word)
        node.word = ""
        board[i][j] = '#'
        self.dfs(board, i+1, j, node, res)
        self.dfs(board, i-1, j, node, res)
        self.dfs(board, i, j+1, node, res)
        self.dfs(board, i, j-1, node, res)
        board[i][j] = c

    def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:
        root = self.build(words)
        res = []
        for i in range(len(board)):
            for j in range(len(board[0])):
                self.dfs(board, i, j, root, res)
        return res

if __name__ == '__main__':
    sol = Solution()
    board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]]
    words = ["oath","pea","eat","rain"]
    print(" ".join(sol.findWords(board, words)))`
      }
    }
  }
};

export default problem;
