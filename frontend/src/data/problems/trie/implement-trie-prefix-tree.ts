import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "implement-trie-prefix-tree",
  title: "Implement Trie (Prefix Tree)",
  difficulty: "Medium",
  category: "Trie",
  url: "https://leetcode.com/problems/implement-trie-prefix-tree/",
  description: "A trie (pronounced as \"try\") or **prefix tree** is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.\n\nImplement the Trie class:\n- `Trie()` Initializes the trie object.\n- `void insert(String word)` Inserts the string `word` into the trie.\n- `boolean search(String word)` Returns `true` if the string `word` is in the trie (i.e., was inserted before), and `false` otherwise.\n- `boolean startsWith(String prefix)` Returns `true` if there is a previously inserted string `word` that has the prefix `prefix`, and `false` otherwise.",
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
    python: {
      starterCode: `from typing import List

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
    java: {
      starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Trie t = new Trie();
        t.insert("apple");
        System.out.println(t.search("apple"));   // true
        System.out.println(t.search("app"));     // false
        System.out.println(t.startsWith("app")); // true
    }
}

class Trie {
    private static class Node {
        Node[] ch = new Node[26];
        boolean end = false;
    }
    
    private Node root = new Node();
    
    public Trie() {}
    
    public void insert(String word) {
        Node cur = root;
        for (char c : word.toCharArray()) {
            int i = c - 'a';
            if (cur.ch[i] == null) cur.ch[i] = new Node();
            cur = cur.ch[i];
        }
        cur.end = true;
    }
    
    public boolean search(String word) {
        Node cur = root;
        for (char c : word.toCharArray()) {
            int i = c - 'a';
            if (cur.ch[i] == null) return false;
            cur = cur.ch[i];
        }
        return cur.end;
    }
    
    public boolean startsWith(String prefix) {
        Node cur = root;
        for (char c : prefix.toCharArray()) {
            int i = c - 'a';
            if (cur.ch[i] == null) return false;
            cur = cur.ch[i];
        }
        return true;
    }
}`
    }
  }
};

export default problem;

