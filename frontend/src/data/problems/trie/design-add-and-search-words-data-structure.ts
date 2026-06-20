import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "design-add-and-search-words-data-structure",
  title: "Design Add and Search Words Data Structure",
  difficulty: "Medium",
  category: "Trie",
  url: "https://leetcode.com/problems/design-add-and-search-words-data-structure/",
  description: "Design a data structure that supports adding new words and finding if a string matches any previously added string.\n\nImplement the `WordDictionary` class:\n- `WordDictionary()` Initializes the object.\n- `void addWord(word)` Adds `word` to the data structure, it can be matched later.\n- `bool search(word)` Returns `true` if there is any string in the data structure that matches `word` or `false` otherwise. `word` may contain dots `.` where dots can be matched with any letter.",
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
    print(bool(wd.search(".ad")))  # true`
    },
    java: {
      starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        WordDictionary wd = new WordDictionary();
        wd.addWord("bad");
        wd.addWord("dad");
        wd.addWord("mad");
        System.out.println(wd.search("pad")); // false
        System.out.println(wd.search("bad")); // true
        System.out.println(wd.search(".ad")); // true
    }
}

class WordDictionary {
    private static class Node {
        Node[] ch = new Node[26];
        boolean end = false;
    }
    
    private Node root = new Node();
    
    public WordDictionary() {}
    
    public void addWord(String word) {
        Node cur = root;
        for (char c : word.toCharArray()) {
            int i = c - 'a';
            if (cur.ch[i] == null) cur.ch[i] = new Node();
            cur = cur.ch[i];
        }
        cur.end = true;
    }
    
    public boolean search(String word) {
        return dfs(root, word, 0);
    }
    
    private boolean dfs(Node node, String w, int i) {
        if (i == w.length()) return node.end;
        char c = w.charAt(i);
        if (c == '.') {
            for (int j = 0; j < 26; j++) {
                if (node.ch[j] != null && dfs(node.ch[j], w, i + 1)) return true;
            }
            return false;
        }
        int idx = c - 'a';
        return node.ch[idx] != null && dfs(node.ch[idx], w, i + 1);
    }
}`
    }
  }
};

export default problem;

