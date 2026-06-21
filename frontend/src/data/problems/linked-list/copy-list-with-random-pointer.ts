import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "copy-list-with-random-pointer",
  title: "Copy List with Random Pointer",
  difficulty: "Medium",
  category: "Linked List",
  patterns: ["Linked List"],
  url: "https://leetcode.com/problems/copy-list-with-random-pointer/",
  description: `A linked list of length \`n\` is given such that each node contains an additional random pointer, which could point to any node in the list, or \`null\`.

Construct a **deep copy** of the list. The deep copy should consist of exactly \`n\` **brand new** nodes, where each new node has its value set to the value of its corresponding original node. Both the \`next\` and \`random\` pointer of the new nodes should point to new nodes in the copied list such that the pointers in the original list and copied list represent the same list state. **None of the pointers in the new list should point to nodes in the original list.**

For example, if there are two nodes \`X\` and \`Y\` in the original list, where \`X.random --> Y\`, then for the corresponding two nodes \`x\` and \`y\` in the copied list, \`x.random --> y\`.

Return the head of the copied linked list.`,
  examples: [
    {
      "input": "head = [[7,null],[13,0],[11,4],[10,2],[1,0]]",
      "output": "[[7,null],[13,0],[11,4],[10,2],[1,0]]"
    }
  ],
  constraints: [
    "0 <= n <= 1000",
    "-10^4 <= Node.val <= 10^4",
    "Node.random is null or is pointing to some node in the linked list."
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

struct Node{int val;Node*next,*random;Node(int x):val(x),next(nullptr),random(nullptr){}};

class Solution {
public:
    Node* copyRandomList(Node* head) {
        // Write your code here
        return nullptr;
    }
};

int main(){
    Node* n1=new Node(7); Node* n2=new Node(13); Node* n3=new Node(11);
    n1->next=n2; n2->next=n3;
    n1->random=nullptr; n2->random=n1; n3->random=n3;
    Solution sol;
    Node* copy=sol.copyRandomList(n1);
    while(copy){cout<<copy->val;if(copy->next)cout<<" -> ";copy=copy->next;}
    cout<<endl;
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Convert the linked list into an array or use nested loops over list elements.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;

struct Node{int val;Node*next,*random;Node(int x):val(x),next(nullptr),random(nullptr){}};

class Solution {
public:
    Node* copyRandomList(Node* head) {
        // Write your code here
        return nullptr;
    }
};

int main(){
    Node* n1=new Node(7); Node* n2=new Node(13); Node* n3=new Node(11);
    n1->next=n2; n2->next=n3;
    n1->random=nullptr; n2->random=n1; n3->random=n3;
    Solution sol;
    Node* copy=sol.copyRandomList(n1);
    while(copy){cout<<copy->val;if(copy->next)cout<<" -> ";copy=copy->next;}
    cout<<endl;
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Traverse list while tracking visited nodes using a hash set.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;

struct Node{int val;Node*next,*random;Node(int x):val(x),next(nullptr),random(nullptr){}};

class Solution {
public:
    Node* copyRandomList(Node* head) {
        // Write your code here
        return nullptr;
    }
};

int main(){
    Node* n1=new Node(7); Node* n2=new Node(13); Node* n3=new Node(11);
    n1->next=n2; n2->next=n3;
    n1->random=nullptr; n2->random=n1; n3->random=n3;
    Solution sol;
    Node* copy=sol.copyRandomList(n1);
    while(copy){cout<<copy->val;if(copy->next)cout<<" -> ";copy=copy->next;}
    cout<<endl;
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `In-place pointer manipulation, slow-fast pointers, or dummy nodes to achieve O(1) auxiliary space.`,
        code: `#include <bits/stdc++.h>
using namespace std;

struct Node{int val;Node*next,*random;Node(int x):val(x),next(nullptr),random(nullptr){}};

class Solution {
public:
    Node* copyRandomList(Node* head) {
        if(!head) return nullptr;
        unordered_map<Node*,Node*> mp;
        Node* cur=head;
        while(cur){mp[cur]=new Node(cur->val);cur=cur->next;}
        cur=head;
        while(cur){
            mp[cur]->next=mp[cur->next];
            mp[cur]->random=mp[cur->random];
            cur=cur->next;
        }
        return mp[head];
    }
};

int main(){
    Node* n1=new Node(7); Node* n2=new Node(13); Node* n3=new Node(11);
    n1->next=n2; n2->next=n3;
    n1->random=nullptr; n2->random=n1; n3->random=n3;
    Solution sol;
    Node* copy=sol.copyRandomList(n1);
    while(copy){cout<<copy->val;if(copy->next)cout<<" -> ";copy=copy->next;}
    cout<<endl;
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import Optional

class Node:
    def __init__(self, x: int, next: 'Node' = None, random: 'Node' = None):
        self.val = x
        self.next = next
        self.random = random

class Solution:
    def copyRandomList(self, head: Optional[Node]) -> Optional[Node]:
        # Write your code here
        pass
if __name__ == '__main__':
    n1 = Node(7)
    n2 = Node(13)
    n3 = Node(11)
    n1.next = n2
    n2.next = n3
    n1.random = None
    n2.random = n1
    n3.random = n3
    sol = Solution()
    copied = sol.copyRandomList(n1)
    
    curr = copied
    parts = []
    while curr:
        parts.append(str(curr.val))
        curr = curr.next
    print(" -> ".join(parts))`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Convert the linked list into an array or use nested loops over list elements.`,
        code: `# Brute Force Approach
# TODO: Implement brute force
from typing import Optional

class Node:
    def __init__(self, x: int, next: 'Node' = None, random: 'Node' = None):
        self.val = x
        self.next = next
        self.random = random

class Solution:
    def copyRandomList(self, head: Optional[Node]) -> Optional[Node]:
        # Write your code here
        pass
if __name__ == '__main__':
    n1 = Node(7)
    n2 = Node(13)
    n3 = Node(11)
    n1.next = n2
    n2.next = n3
    n1.random = None
    n2.random = n1
    n3.random = n3
    sol = Solution()
    copied = sol.copyRandomList(n1)
    
    curr = copied
    parts = []
    while curr:
        parts.append(str(curr.val))
        curr = curr.next
    print(" -> ".join(parts))`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Traverse list while tracking visited nodes using a hash set.`,
        code: `# Better Solution
# TODO: Implement optimized approach
from typing import Optional

class Node:
    def __init__(self, x: int, next: 'Node' = None, random: 'Node' = None):
        self.val = x
        self.next = next
        self.random = random

class Solution:
    def copyRandomList(self, head: Optional[Node]) -> Optional[Node]:
        # Write your code here
        pass
if __name__ == '__main__':
    n1 = Node(7)
    n2 = Node(13)
    n3 = Node(11)
    n1.next = n2
    n2.next = n3
    n1.random = None
    n2.random = n1
    n3.random = n3
    sol = Solution()
    copied = sol.copyRandomList(n1)
    
    curr = copied
    parts = []
    while curr:
        parts.append(str(curr.val))
        curr = curr.next
    print(" -> ".join(parts))`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `In-place pointer manipulation, slow-fast pointers, or dummy nodes to achieve O(1) auxiliary space.`,
        code: `from typing import Optional

class Node:
    def __init__(self, x: int, next: 'Node' = None, random: 'Node' = None):
        self.val = x
        self.next = next
        self.random = random

class Solution:
    def copyRandomList(self, head: Optional[Node]) -> Optional[Node]:
        if not head:
            return None
        mp = {}
        cur = head
        while cur:
            mp[cur] = Node(cur.val)
            cur = cur.next
        cur = head
        while cur:
            mp[cur].next = mp.get(cur.next)
            mp[cur].random = mp.get(cur.random)
            cur = cur.next
        return mp[head]

if __name__ == '__main__':
    n1 = Node(7)
    n2 = Node(13)
    n3 = Node(11)
    n1.next = n2
    n2.next = n3
    n1.random = None
    n2.random = n1
    n3.random = n3
    sol = Solution()
    copied = sol.copyRandomList(n1)
    
    curr = copied
    parts = []
    while curr:
        parts.append(str(curr.val))
        curr = curr.next
    print(" -> ".join(parts))`
      }
    }
  }
};

export default problem;
