import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "flatten-binary-tree-to-linked-list",
  title: "Flatten Binary Tree to Linked List",
  difficulty: "Medium",
  category: "Trees",
  patterns: ["Tree","DFS","Recursion"],
  url: "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/",
  description: `Given the \`root\` of a binary tree, flatten the tree into a "linked list":\\n- The "linked list" should use the same \`TreeNode\` class where the \`right\` child pointer points to the next node in the list and the \`left\` child pointer is always \`null\`.\\n- The "linked list" should be in the same order as a **pre-order traversal** of the binary tree.`,
  examples: [
    {
      "input": "root = [1,2,5,3,4,null,6]",
      "output": "[1,null,2,null,3,null,4,null,5,null,6]"
    },
    {
      "input": "root = []",
      "output": "[]"
    },
    {
      "input": "root = [0]",
      "output": "[0]"
    }
  ],
  constraints: [
    "The number of nodes in the tree is in the range [0, 2000].",
    "-100 <= Node.val <= 100"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;
struct TreeNode{int val;TreeNode*left,*right;TreeNode(int x):val(x),left(nullptr),right(nullptr){}};
class Solution {
public:
    void flatten(TreeNode* root){
        // Write your code here
    }
};
int main(){
    TreeNode* t=new TreeNode(1); t->left=new TreeNode(2); t->right=new TreeNode(5);
    t->left->left=new TreeNode(3); t->left->right=new TreeNode(4); t->right->right=new TreeNode(6);
    Solution sol; sol.flatten(t);
    while(t){cout<<t->val;if(t->right)cout<<"->";t=t->right;} cout<<endl; // 1->2->3->4->5->6
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Compare subtrees or paths repeatedly by traversing the tree naive recursive style.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;
struct TreeNode{int val;TreeNode*left,*right;TreeNode(int x):val(x),left(nullptr),right(nullptr){}};
class Solution {
public:
    void flatten(TreeNode* root){
        // Write your code here
    }
};
int main(){
    TreeNode* t=new TreeNode(1); t->left=new TreeNode(2); t->right=new TreeNode(5);
    t->left->left=new TreeNode(3); t->left->right=new TreeNode(4); t->right->right=new TreeNode(6);
    Solution sol; sol.flatten(t);
    while(t){cout<<t->val;if(t->right)cout<<"->";t=t->right;} cout<<endl; // 1->2->3->4->5->6
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `DFS (recursion) or BFS (queue) tree traversals using extra tracking maps or objects.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;
struct TreeNode{int val;TreeNode*left,*right;TreeNode(int x):val(x),left(nullptr),right(nullptr){}};
class Solution {
public:
    void flatten(TreeNode* root){
        // Write your code here
    }
};
int main(){
    TreeNode* t=new TreeNode(1); t->left=new TreeNode(2); t->right=new TreeNode(5);
    t->left->left=new TreeNode(3); t->left->right=new TreeNode(4); t->right->right=new TreeNode(6);
    Solution sol; sol.flatten(t);
    while(t){cout<<t->val;if(t->right)cout<<"->";t=t->right;} cout<<endl; // 1->2->3->4->5->6
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Single-pass DFS/BFS tree traversal, gathering metrics or updating values in-place with constant height memory.`,
        code: `#include <bits/stdc++.h>
using namespace std;
struct TreeNode{int val;TreeNode*left,*right;TreeNode(int x):val(x),left(nullptr),right(nullptr){}};
class Solution {
public:
    void flatten(TreeNode* root){
        while(root){
            if(root->left){
                TreeNode* tail=root->left;
                while(tail->right) tail=tail->right;
                tail->right=root->right;
                root->right=root->left;
                root->left=nullptr;
            }
            root=root->right;
        }
    }
};
int main(){
    TreeNode* t=new TreeNode(1); t->left=new TreeNode(2); t->right=new TreeNode(5);
    t->left->left=new TreeNode(3); t->left->right=new TreeNode(4); t->right->right=new TreeNode(6);
    Solution sol; sol.flatten(t);
    while(t){cout<<t->val;if(t->right)cout<<"->";t=t->right;} cout<<endl; // 1->2->3->4->5->6
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def flatten(self, root: Optional[TreeNode]) -> None:
        # Write your code here
        pass
def main():
    root = TreeNode(1)
    root.left = TreeNode(2)
    root.right = TreeNode(5)
    root.left.left = TreeNode(3)
    root.left.right = TreeNode(4)
    root.right.right = TreeNode(6)

    sol = Solution()
    sol.flatten(root)

    while root:
        print(root.val, end='')
        if root.right:
            print('->', end='')
        root = root.right
    print()

if __name__ == '__main__':
    main()`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Compare subtrees or paths repeatedly by traversing the tree naive recursive style.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def flatten(self, root: Optional[TreeNode]) -> None:
        # Write your code here
        pass
def main():
    root = TreeNode(1)
    root.left = TreeNode(2)
    root.right = TreeNode(5)
    root.left.left = TreeNode(3)
    root.left.right = TreeNode(4)
    root.right.right = TreeNode(6)

    sol = Solution()
    sol.flatten(root)

    while root:
        print(root.val, end='')
        if root.right:
            print('->', end='')
        root = root.right
    print()

if __name__ == '__main__':
    main()`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `DFS (recursion) or BFS (queue) tree traversals using extra tracking maps or objects.`,
        code: `// Better Solution
// TODO: Implement optimized approach
from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def flatten(self, root: Optional[TreeNode]) -> None:
        # Write your code here
        pass
def main():
    root = TreeNode(1)
    root.left = TreeNode(2)
    root.right = TreeNode(5)
    root.left.left = TreeNode(3)
    root.left.right = TreeNode(4)
    root.right.right = TreeNode(6)

    sol = Solution()
    sol.flatten(root)

    while root:
        print(root.val, end='')
        if root.right:
            print('->', end='')
        root = root.right
    print()

if __name__ == '__main__':
    main()`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Single-pass DFS/BFS tree traversal, gathering metrics or updating values in-place with constant height memory.`,
        code: `from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def flatten(self, root: Optional[TreeNode]) -> None:
        while root:
            if root.left:
                tail = root.left
                while tail.right:
                    tail = tail.right
                tail.right = root.right
                root.right = root.left
                root.left = None
            root = root.right

def main():
    root = TreeNode(1)
    root.left = TreeNode(2)
    root.right = TreeNode(5)
    root.left.left = TreeNode(3)
    root.left.right = TreeNode(4)
    root.right.right = TreeNode(6)

    sol = Solution()
    sol.flatten(root)

    while root:
        print(root.val, end='')
        if root.right:
            print('->', end='')
        root = root.right
    print()

if __name__ == '__main__':
    main()`
      }
    }
  }
};

export default problem;
