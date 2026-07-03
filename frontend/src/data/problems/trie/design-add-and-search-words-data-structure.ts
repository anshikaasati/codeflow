import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "design-add-and-search-words-data-structure",
  title: "Design Add and Search Words Data Structure",
  difficulty: "Medium",
  category: "Trie",
  patterns: ["Trie","DFS","Recursion"],
  url: "https://leetcode.com/problems/design-add-and-search-words-data-structure/",
  description: `Design a data structure that supports adding new words and finding if a string matches any previously added string.

Implement the \`WordDictionary\` class:
- \`WordDictionary()\` Initializes the object.
- \`void addWord(word)\` Adds \`word\` to the data structure, it can be matched later.
- \`bool search(word)\` Returns \`true\` if there is any string in the data structure that matches \`word\` or \`false\` otherwise. \`word\` may contain dots \`.\` where dots can be matched with any letter.`,
  examples: [
    {
      "input": "[\"WordDictionary\",\"addWord\",\"addWord\",\"addWord\",\"search\",\"search\",\"search\",\"search\"]\n[[],[\"bad\"],[\"dad\"],[\"mad\"],[\"pad\"],[\"bad\"],[\".ad\"],[\"b..\"]]",
      "output": "[null,null,null,null,false,true,true,true]"
    }
  ],
  constraints: [
    "1 <= word.length <= 25",
    "word in addWord consists of lowercase English letters.",
    "word in search consist of '.' or lowercase English letters.",
    "There will be at most 2 dots in word for search queries.",
    "At most 10^4 calls will be made to addWord and search."
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class WordDictionary {
public:
    WordDictionary() {
        
    }
    
    void addWord(string word) {
        
    }
    
    bool search(string word) {
        return false;
    }
};

int main(){
    WordDictionary wd;
    wd.addWord("bad"); wd.addWord("dad"); wd.addWord("mad");
    cout<<boolalpha;
    cout<<wd.search("pad")<<endl; // false
    cout<<wd.search("bad")<<endl; // true
    cout<<wd.search(".ad")<<endl; // true
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

class WordDictionary {
    struct Node { Node* ch[26]={}; bool end=false; };
    Node* root=new Node();
    bool dfs(Node* node, string& w, int i){
        if(i==(int)w.size()) return node->end;
        char c=w[i];
        if(c=='.'){
            for(int j=0;j<26;j++) if(node->ch[j]&&dfs(node->ch[j],w,i+1)) return true;
            return false;
        }
        int idx=c-'a';
        return node->ch[idx]&&dfs(node->ch[idx],w,i+1);
    }
public:
    void addWord(string word){
        Node* cur=root;
        for(char c:word){int i=c-'a';if(!cur->ch[i])cur->ch[i]=new Node();cur=cur->ch[i];}
        cur->end=true;
    }
    bool search(string word){ return dfs(root,word,0); }
};

int main(){
    WordDictionary wd;
    wd.addWord("bad"); wd.addWord("dad"); wd.addWord("mad");
    cout<<boolalpha;
    cout<<wd.search("pad")<<endl; // false
    cout<<wd.search("bad")<<endl; // true
    cout<<wd.search(".ad")<<endl; // true
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

class WordDictionary {
    struct Node { Node* ch[26]={}; bool end=false; };
    Node* root=new Node();
    bool dfs(Node* node, string& w, int i){
        if(i==(int)w.size()) return node->end;
        char c=w[i];
        if(c=='.'){
            for(int j=0;j<26;j++) if(node->ch[j]&&dfs(node->ch[j],w,i+1)) return true;
            return false;
        }
        int idx=c-'a';
        return node->ch[idx]&&dfs(node->ch[idx],w,i+1);
    }
public:
    void addWord(string word){
        Node* cur=root;
        for(char c:word){int i=c-'a';if(!cur->ch[i])cur->ch[i]=new Node();cur=cur->ch[i];}
        cur->end=true;
    }
    bool search(string word){ return dfs(root,word,0); }
};

int main(){
    WordDictionary wd;
    wd.addWord("bad"); wd.addWord("dad"); wd.addWord("mad");
    cout<<boolalpha;
    cout<<wd.search("pad")<<endl; // false
    cout<<wd.search("bad")<<endl; // true
    cout<<wd.search(".ad")<<endl; // true
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

class WordDictionary {
    struct Node { Node* ch[26]={}; bool end=false; };
    Node* root=new Node();
    bool dfs(Node* node, string& w, int i){
        if(i==(int)w.size()) return node->end;
        char c=w[i];
        if(c=='.'){
            for(int j=0;j<26;j++) if(node->ch[j]&&dfs(node->ch[j],w,i+1)) return true;
            return false;
        }
        int idx=c-'a';
        return node->ch[idx]&&dfs(node->ch[idx],w,i+1);
    }
public:
    void addWord(string word){
        Node* cur=root;
        for(char c:word){int i=c-'a';if(!cur->ch[i])cur->ch[i]=new Node();cur=cur->ch[i];}
        cur->end=true;
    }
    bool search(string word){ return dfs(root,word,0); }
};

int main(){
    WordDictionary wd;
    wd.addWord("bad"); wd.addWord("dad"); wd.addWord("mad");
    cout<<boolalpha;
    cout<<wd.search("pad")<<endl; // false
    cout<<wd.search("bad")<<endl; // true
    cout<<wd.search(".ad")<<endl; // true
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Node:
    def __init__(self):
        self.ch = [None] * 26
        self.end = False

class WordDictionary:
    def __init__(self):
        self.root = Node()

    def addWord(self, word: str) -> None:
        cur = self.root
        for c in word:
            idx = ord(c) - ord('a')
            if not cur.ch[idx]:
                cur.ch[idx] = Node()
            cur = cur.ch[idx]
        cur.end = True

    def search(self, word: str) -> bool:
        return self.dfs(self.root, word, 0)

    def dfs(self, node: Node, word: str, i: int) -> bool:
        if i == len(word):
            return node.end
        c = word[i]
        if c == '.':
            for j in range(26):
                if node.ch[j] and self.dfs(node.ch[j], word, i + 1):
                    return True
            return False
        idx = ord(c) - ord('a')
        return node.ch[idx] and self.dfs(node.ch[idx], word, i + 1)


if __name__ == '__main__':
    wd = WordDictionary()
    wd.addWord("bad")
    wd.addWord("dad")
    wd.addWord("mad")
    print(bool(wd.search("pad")))  # false
    print(bool(wd.search("bad")))  # true
    print(bool(wd.search(".ad")))  # true`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Search words or prefixes using nested string comparisons.`,
        code: `# Brute Force Approach
# TODO: Implement brute force
from typing import List

class Node:
    def __init__(self):
        self.ch = [None] * 26
        self.end = False

class WordDictionary:
    def __init__(self):
        self.root = Node()

    def addWord(self, word: str) -> None:
        cur = self.root
        for c in word:
            idx = ord(c) - ord('a')
            if not cur.ch[idx]:
                cur.ch[idx] = Node()
            cur = cur.ch[idx]
        cur.end = True

    def search(self, word: str) -> bool:
        return self.dfs(self.root, word, 0)

    def dfs(self, node: Node, word: str, i: int) -> bool:
        if i == len(word):
            return node.end
        c = word[i]
        if c == '.':
            for j in range(26):
                if node.ch[j] and self.dfs(node.ch[j], word, i + 1):
                    return True
            return False
        idx = ord(c) - ord('a')
        return node.ch[idx] and self.dfs(node.ch[idx], word, i + 1)


if __name__ == '__main__':
    wd = WordDictionary()
    wd.addWord("bad")
    wd.addWord("dad")
    wd.addWord("mad")
    print(bool(wd.search("pad")))  # false
    print(bool(wd.search("bad")))  # true
    print(bool(wd.search(".ad")))  # true`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Search prefixes using a Hash Map representing character transitions.`,
        code: `# Better Solution
# TODO: Implement optimized approach
from typing import List

class Node:
    def __init__(self):
        self.ch = [None] * 26
        self.end = False

class WordDictionary:
    def __init__(self):
        self.root = Node()

    def addWord(self, word: str) -> None:
        cur = self.root
        for c in word:
            idx = ord(c) - ord('a')
            if not cur.ch[idx]:
                cur.ch[idx] = Node()
            cur = cur.ch[idx]
        cur.end = True

    def search(self, word: str) -> bool:
        return self.dfs(self.root, word, 0)

    def dfs(self, node: Node, word: str, i: int) -> bool:
        if i == len(word):
            return node.end
        c = word[i]
        if c == '.':
            for j in range(26):
                if node.ch[j] and self.dfs(node.ch[j], word, i + 1):
                    return True
            return False
        idx = ord(c) - ord('a')
        return node.ch[idx] and self.dfs(node.ch[idx], word, i + 1)


if __name__ == '__main__':
    wd = WordDictionary()
    wd.addWord("bad")
    wd.addWord("dad")
    wd.addWord("mad")
    print(bool(wd.search("pad")))  # false
    print(bool(wd.search("bad")))  # true
    print(bool(wd.search(".ad")))  # true`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Implement a Prefix Tree (Trie) structure with pointer nodes for efficient insertions and prefix queries.`,
        code: `from typing import List

class Node:
    def __init__(self):
        self.ch = [None] * 26
        self.end = False

class WordDictionary:
    def __init__(self):
        self.root = Node()

    def addWord(self, word: str) -> None:
        cur = self.root
        for c in word:
            idx = ord(c) - ord('a')
            if not cur.ch[idx]:
                cur.ch[idx] = Node()
            cur = cur.ch[idx]
        cur.end = True

    def search(self, word: str) -> bool:
        return self.dfs(self.root, word, 0)

    def dfs(self, node: Node, word: str, i: int) -> bool:
        if i == len(word):
            return node.end
        c = word[i]
        if c == '.':
            for j in range(26):
                if node.ch[j] and self.dfs(node.ch[j], word, i + 1):
                    return True
            return False
        idx = ord(c) - ord('a')
        return node.ch[idx] and self.dfs(node.ch[idx], word, i + 1)


if __name__ == '__main__':
    wd = WordDictionary()
    wd.addWord("bad")
    wd.addWord("dad")
    wd.addWord("mad")
    print(bool(wd.search("pad")))  # false
    print(bool(wd.search("bad")))  # true
    print(bool(wd.search(".ad")))  # true`
      }
    }
  }
};

export default problem;
