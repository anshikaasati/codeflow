import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "clone-graph",
  title: "Clone Graph",
  difficulty: "Medium",
  category: "Graphs",
  patterns: ["Graph","DFS"],
  url: "https://leetcode.com/problems/clone-graph/",
  description: "Given a reference of a node in a **connected** undirected graph. Return a **deep copy** (clone) of the graph.\n\nEach node in the graph contains a value (`int`) and a list (`List[Node]`) of its neighbors.",
  examples: [
  {
    "input": "adjList = [[2,4],[1,3],[2,4],[1,3]]",
    "output": "[[2,4],[1,3],[2,4],[1,3]]",
    "explanation": "There are 4 nodes in the graph.\n1st node (val = 1)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).\n2nd node (val = 2)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).\n3rd node (val = 3)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).\n4th node (val = 4)'s neighbors are 1st node (val = 1) and 3rd node (val = 3)."
  }
],
  constraints: [
  "The number of nodes in the graph is in the range [0, 100].",
  "1 <= Node.val <= 100",
  "Node.val is unique for each node.",
  "There are no repeated edges and no self-loops in the graph.",
  "The Graph is connected and all nodes can be visited starting from the given node."
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Node {
public:
    int val; vector<Node*> neighbors;
    Node(int v):val(v){}
};

class Solution {
    unordered_map<Node*,Node*> visited;
public:
    Node* cloneGraph(Node* node){
        // Write your code here
        return nullptr;
    }
};

int main(){
    Node* n1=new Node(1); Node* n2=new Node(2);
    Node* n3=new Node(3); Node* n4=new Node(4);
    n1->neighbors={n2,n4}; n2->neighbors={n1,n3};
    n3->neighbors={n2,n4}; n4->neighbors={n1,n3};
    Solution sol;
    Node* c=sol.cloneGraph(n1);
    if(c) {
        cout<<c->val<<" neighbors: ";
        if(c->neighbors.size() >= 2) {
            cout<<c->neighbors[0]->val<<","<<c->neighbors[1]->val;
        }
        cout<<endl;
    } else {
        cout<<"null"<<endl;
    }
    return 0;
}`,
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

class Node {
public:
    int val; vector<Node*> neighbors;
    Node(int v):val(v){}
};

class Solution {
    unordered_map<Node*,Node*> visited;
public:
    Node* cloneGraph(Node* node){
        if(!node) return nullptr;
        if(visited.count(node)) return visited[node];
        Node* clone=new Node(node->val);
        visited[node]=clone;
        for(Node* nei:node->neighbors) clone->neighbors.push_back(cloneGraph(nei));
        return clone;
    }
};

int main(){
    Node* n1=new Node(1); Node* n2=new Node(2);
    Node* n3=new Node(3); Node* n4=new Node(4);
    n1->neighbors={n2,n4}; n2->neighbors={n1,n3};
    n3->neighbors={n2,n4}; n4->neighbors={n1,n3};
    Solution sol;
    Node* c=sol.cloneGraph(n1);
    if(c) {
        cout<<c->val<<" neighbors: ";
        if(c->neighbors.size() >= 2) {
            cout<<c->neighbors[0]->val<<","<<c->neighbors[1]->val;
        }
        cout<<endl;
    } else {
        cout<<"null"<<endl;
    }
    return 0;
}`
    },
    python: {
      starterCode: `from typing import List, Dict

class Node:
    def __init__(self, val = 0, neighbors = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

class Solution:
    def cloneGraph(self, node: 'Node') -> 'Node':
        # Write your code here
        pass
if __name__ == '__main__':
    n1 = Node(1)
    n2 = Node(2)
    n3 = Node(3)
    n4 = Node(4)
    n1.neighbors = [n2, n4]
    n2.neighbors = [n1, n3]
    n3.neighbors = [n2, n4]
    n4.neighbors = [n1, n3]
    sol = Solution()
    c = sol.cloneGraph(n1)
    if c:
        print(c.val, "neighbors:", [n.val for n in c.neighbors])
    else:
        print("None")`,
      solutionCode: `from typing import List, Dict

class Node:
    def __init__(self, val = 0, neighbors = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

class Solution:
    def cloneGraph(self, node: 'Node') -> 'Node':
        visited: Dict['Node', 'Node'] = {}
        def dfs(node: 'Node') -> 'Node':
            if not node:
                return None
            if node in visited:
                return visited[node]
            clone = Node(node.val)
            visited[node] = clone
            clone.neighbors = [dfs(n) for n in node.neighbors]
            return clone
        return dfs(node)

if __name__ == '__main__':
    n1 = Node(1)
    n2 = Node(2)
    n3 = Node(3)
    n4 = Node(4)
    n1.neighbors = [n2, n4]
    n2.neighbors = [n1, n3]
    n3.neighbors = [n2, n4]
    n4.neighbors = [n1, n3]
    sol = Solution()
    c = sol.cloneGraph(n1)
    if c:
        print(c.val, "neighbors:", [n.val for n in c.neighbors])
    else:
        print("None")`
    }
  }
};

export default problem;
