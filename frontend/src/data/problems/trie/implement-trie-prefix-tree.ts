import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "implement-trie-prefix-tree",
  title: "Implement Trie (Prefix Tree)",
  difficulty: "Medium",
  category: "Trie",
  patterns: ["Trie","DFS","Recursion"],
  url: "https://leetcode.com/problems/implement-trie-prefix-tree/",
  description: `A trie (pronounced as "try") or **prefix tree** is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

Implement the Trie class:
- \`Trie()\` Initializes the trie object.
- \`void insert(String word)\` Inserts the string \`word\` into the trie.
- \`boolean search(String word)\` Returns \`true\` if the string \`word\` is in the trie (i.e., was inserted before), and \`false\` otherwise.
- \`boolean startsWith(String prefix)\` Returns \`true\` if there is a previously inserted string \`word\` that has the prefix \`prefix\`, and \`false\` otherwise.`,
  examples: [
    {
      "input": "[\"Trie\", \"insert\", \"search\", \"search\", \"startsWith\", \"insert\", \"search\"]\n[[], [\"apple\"], [\"apple\"], [\"app\"], [\"app\"], [\"app\"], [\"app\"]]",
      "output": "[null, null, true, false, true, null, true]",
      "explanation": "Trie trie = new Trie();\ntrie.insert(\"apple\");\ntrie.search(\"apple\");   // return True\ntrie.search(\"app\");     // return False\ntrie.startsWith(\"app\"); // return True\ntrie.insert(\"app\");\ntrie.search(\"app\");     // return True"
    }
  ],
  constraints: [
    "1 <= word.length, prefix.length <= 2000",
    "word and prefix consist only of lowercase English letters.",
    "At most 3 * 10^4 calls in total will be made to insert, search, and startsWith."
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Trie {
public:
    Trie() {
        
    }
    
    void insert(string word) {
        
    }
    
    bool search(string word) {
        return false;
    }
    
    bool startsWith(string prefix) {
        return false;
    }
};

int main(){
    Trie t; t.insert("apple");
    cout<<boolalpha;
    cout<<t.search("apple")<<endl;   // true
    cout<<t.search("app")<<endl;     // false
    cout<<t.startsWith("app")<<endl; // true
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

class Trie {
    struct Node { Node* ch[26]={}; bool end=false; };
    Node* root=new Node();
public:
    void insert(string word){
        Node* cur=root;
        for(char c:word){int i=c-'a';if(!cur->ch[i])cur->ch[i]=new Node();cur=cur->ch[i];}
        cur->end=true;
    }
    bool search(string word){
        Node* cur=root;
        for(char c:word){int i=c-'a';if(!cur->ch[i])return false;cur=cur->ch[i];}
        return cur->end;
    }
    bool startsWith(string prefix){
        Node* cur=root;
        for(char c:prefix){int i=c-'a';if(!cur->ch[i])return false;cur=cur->ch[i];}
        return true;
    }
};

int main(){
    Trie t; t.insert("apple");
    cout<<boolalpha;
    cout<<t.search("apple")<<endl;   // true
    cout<<t.search("app")<<endl;     // false
    cout<<t.startsWith("app")<<endl; // true
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

class Trie {
    struct Node { Node* ch[26]={}; bool end=false; };
    Node* root=new Node();
public:
    void insert(string word){
        Node* cur=root;
        for(char c:word){int i=c-'a';if(!cur->ch[i])cur->ch[i]=new Node();cur=cur->ch[i];}
        cur->end=true;
    }
    bool search(string word){
        Node* cur=root;
        for(char c:word){int i=c-'a';if(!cur->ch[i])return false;cur=cur->ch[i];}
        return cur->end;
    }
    bool startsWith(string prefix){
        Node* cur=root;
        for(char c:prefix){int i=c-'a';if(!cur->ch[i])return false;cur=cur->ch[i];}
        return true;
    }
};

int main(){
    Trie t; t.insert("apple");
    cout<<boolalpha;
    cout<<t.search("apple")<<endl;   // true
    cout<<t.search("app")<<endl;     // false
    cout<<t.startsWith("app")<<endl; // true
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

class Trie {
    struct Node { Node* ch[26]={}; bool end=false; };
    Node* root=new Node();
public:
    void insert(string word){
        Node* cur=root;
        for(char c:word){int i=c-'a';if(!cur->ch[i])cur->ch[i]=new Node();cur=cur->ch[i];}
        cur->end=true;
    }
    bool search(string word){
        Node* cur=root;
        for(char c:word){int i=c-'a';if(!cur->ch[i])return false;cur=cur->ch[i];}
        return cur->end;
    }
    bool startsWith(string prefix){
        Node* cur=root;
        for(char c:prefix){int i=c-'a';if(!cur->ch[i])return false;cur=cur->ch[i];}
        return true;
    }
};

int main(){
    Trie t; t.insert("apple");
    cout<<boolalpha;
    cout<<t.search("apple")<<endl;   // true
    cout<<t.search("app")<<endl;     // false
    cout<<t.startsWith("app")<<endl; // true
    return 0;
}`
      }
    },
    python: {
      starterCode: `class Trie:
    def __init__(self):
        pass

    def insert(self, word: str) -> None:
        pass

    def search(self, word: str) -> bool:
        return False

    def startsWith(self, prefix: str) -> bool:
        return False

if __name__ == '__main__':
    t = Trie()
    t.insert("apple")
    print(t.search("apple"))   # true
    print(t.search("app"))     # false
    print(t.startsWith("app")) # true`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Search words or prefixes using nested string comparisons.`,
        code: `# Brute Force Approach
# TODO: Implement brute force
from typing import List

class Trie:
    class Node:
        def __init__(self):
            self.ch: List['Trie.Node'] = [None]*26
            self.end = False

    def __init__(self):
        self.root = Trie.Node()

    def insert(self, word: str) -> None:
        cur = self.root
        for c in word:
            i = ord(c) - ord('a')
            if not cur.ch[i]:
                cur.ch[i] = Trie.Node()
            cur = cur.ch[i]
        cur.end = True

    def search(self, word: str) -> bool:
        cur = self.root
        for c in word:
            i = ord(c) - ord('a')
            if not cur.ch[i]:
                return False
            cur = cur.ch[i]
        return cur.end

    def startsWith(self, prefix: str) -> bool:
        cur = self.root
        for c in prefix:
            i = ord(c) - ord('a')
            if not cur.ch[i]:
                return False
            cur = cur.ch[i]
        return True


if __name__ == '__main__':
    t = Trie()
    t.insert("apple")
    print(t.search("apple"))   # true
    print(t.search("app"))     # false
    print(t.startsWith("app")) # true`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Search prefixes using a Hash Map representing character transitions.`,
        code: `# Better Solution
# TODO: Implement optimized approach
from typing import List

class Trie:
    class Node:
        def __init__(self):
            self.ch: List['Trie.Node'] = [None]*26
            self.end = False

    def __init__(self):
        self.root = Trie.Node()

    def insert(self, word: str) -> None:
        cur = self.root
        for c in word:
            i = ord(c) - ord('a')
            if not cur.ch[i]:
                cur.ch[i] = Trie.Node()
            cur = cur.ch[i]
        cur.end = True

    def search(self, word: str) -> bool:
        cur = self.root
        for c in word:
            i = ord(c) - ord('a')
            if not cur.ch[i]:
                return False
            cur = cur.ch[i]
        return cur.end

    def startsWith(self, prefix: str) -> bool:
        cur = self.root
        for c in prefix:
            i = ord(c) - ord('a')
            if not cur.ch[i]:
                return False
            cur = cur.ch[i]
        return True


if __name__ == '__main__':
    t = Trie()
    t.insert("apple")
    print(t.search("apple"))   # true
    print(t.search("app"))     # false
    print(t.startsWith("app")) # true`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Implement a Prefix Tree (Trie) structure with pointer nodes for efficient insertions and prefix queries.`,
        code: `from typing import List

class Trie:
    class Node:
        def __init__(self):
            self.ch: List['Trie.Node'] = [None]*26
            self.end = False

    def __init__(self):
        self.root = Trie.Node()

    def insert(self, word: str) -> None:
        cur = self.root
        for c in word:
            i = ord(c) - ord('a')
            if not cur.ch[i]:
                cur.ch[i] = Trie.Node()
            cur = cur.ch[i]
        cur.end = True

    def search(self, word: str) -> bool:
        cur = self.root
        for c in word:
            i = ord(c) - ord('a')
            if not cur.ch[i]:
                return False
            cur = cur.ch[i]
        return cur.end

    def startsWith(self, prefix: str) -> bool:
        cur = self.root
        for c in prefix:
            i = ord(c) - ord('a')
            if not cur.ch[i]:
                return False
            cur = cur.ch[i]
        return True


if __name__ == '__main__':
    t = Trie()
    t.insert("apple")
    print(t.search("apple"))   # true
    print(t.search("app"))     # false
    print(t.startsWith("app")) # true`
      }
    }
  }
};

export default problem;
