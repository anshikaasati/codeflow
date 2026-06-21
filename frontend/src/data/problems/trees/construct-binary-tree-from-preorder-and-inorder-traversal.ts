import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "construct-binary-tree-from-preorder-and-inorder-traversal",
  title: "Construct Binary Tree from Preorder and Inorder Traversal",
  difficulty: "Medium",
  category: "Trees",
  patterns: ["Tree","DFS","Recursion"],
  url: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
  description: `Given two integer arrays \`preorder\` and \`inorder\` where \`preorder\` is the preorder traversal of a binary tree and \`inorder\` is the inorder traversal of the same tree, construct and return the binary tree.`,
  examples: [
    {
      "input": "preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]",
      "output": "[3,9,20,null,null,15,7]"
    },
    {
      "input": "preorder = [-1], inorder = [-1]",
      "output": "[-1]"
    }
  ],
  constraints: [
    "1 <= preorder.length <= 3000",
    "inorder.length == preorder.length",
    "-3000 <= preorder[i], inorder[i] <= 3000",
    "preorder and inorder consist of unique values.",
    "Each value of inorder also appears in preorder.",
    "preorder is guaranteed to be the preorder traversal of the tree.",
    "inorder is guaranteed to be the inorder traversal of the tree."
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

struct TreeNode{int val;TreeNode*left,*right;TreeNode(int x):val(x),left(nullptr),right(nullptr){}};

class Solution {
    unordered_map<int,int> inIdx;
    TreeNode* build(vector<int>& pre, int preL, int preR, int inL){
        // Write your code here
        return nullptr;
    }
public:
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder){
        // Write your code here
        return nullptr;
    }
};

void inorderPrint(TreeNode*n){if(!n)return;inorderPrint(n->left);cout<<n->val<<" ";inorderPrint(n->right);}

int main(){
    Solution sol;
    vector<int> pre={3,9,20,15,7}, in={9,3,15,20,7};
    inorderPrint(sol.buildTree(pre,in)); cout<<endl; // 9 3 15 20 7
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
    unordered_map<int,int> inIdx;
    TreeNode* build(vector<int>& pre, int preL, int preR, int inL){
        // Write your code here
        return nullptr;
    }
public:
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder){
        // Write your code here
        return nullptr;
    }
};

void inorderPrint(TreeNode*n){if(!n)return;inorderPrint(n->left);cout<<n->val<<" ";inorderPrint(n->right);}

int main(){
    Solution sol;
    vector<int> pre={3,9,20,15,7}, in={9,3,15,20,7};
    inorderPrint(sol.buildTree(pre,in)); cout<<endl; // 9 3 15 20 7
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
    unordered_map<int,int> inIdx;
    TreeNode* build(vector<int>& pre, int preL, int preR, int inL){
        // Write your code here
        return nullptr;
    }
public:
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder){
        // Write your code here
        return nullptr;
    }
};

void inorderPrint(TreeNode*n){if(!n)return;inorderPrint(n->left);cout<<n->val<<" ";inorderPrint(n->right);}

int main(){
    Solution sol;
    vector<int> pre={3,9,20,15,7}, in={9,3,15,20,7};
    inorderPrint(sol.buildTree(pre,in)); cout<<endl; // 9 3 15 20 7
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
    unordered_map<int,int> inIdx;
    TreeNode* build(vector<int>& pre, int preL, int preR, int inL){
        if(preL>preR) return nullptr;
        int rootVal=pre[preL];
        int mid=inIdx[rootVal];
        int leftSize=mid-inL;
        TreeNode* node=new TreeNode(rootVal);
        node->left=build(pre,preL+1,preL+leftSize,inL);
        node->right=build(pre,preL+leftSize+1,preR,mid+1);
        return node;
    }
public:
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder){
        inIdx.clear();
        for(int i=0;i<(int)inorder.size();i++) inIdx[inorder[i]]=i;
        return build(preorder,0,preorder.size()-1,0);
    }
};

void inorderPrint(TreeNode*n){if(!n)return;inorderPrint(n->left);cout<<n->val<<" ";inorderPrint(n->right);}

int main(){
    Solution sol;
    vector<int> pre={3,9,20,15,7}, in={9,3,15,20,7};
    inorderPrint(sol.buildTree(pre,in)); cout<<endl; // 9 3 15 20 7
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> TreeNode:
        # Write your code here
        pass
    def build(self, pre: List[int], preL: int, preR: int, inL: int) -> TreeNode:
        # Write your code here
        pass
def inorderPrint(node: TreeNode) -> None:
    if not node:
        return
    inorderPrint(node.left)
    print(node.val, end=" ")
    inorderPrint(node.right)

if __name__ == "__main__":
    sol = Solution()
    pre = [3, 9, 20, 15, 7]
    in_ = [9, 3, 15, 20, 7]
    inorderPrint(sol.buildTree(pre, in_))
    print()`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Compare subtrees or paths repeatedly by traversing the tree naive recursive style.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from typing import List

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> TreeNode:
        # Write your code here
        pass
    def build(self, pre: List[int], preL: int, preR: int, inL: int) -> TreeNode:
        # Write your code here
        pass
def inorderPrint(node: TreeNode) -> None:
    if not node:
        return
    inorderPrint(node.left)
    print(node.val, end=" ")
    inorderPrint(node.right)

if __name__ == "__main__":
    sol = Solution()
    pre = [3, 9, 20, 15, 7]
    in_ = [9, 3, 15, 20, 7]
    inorderPrint(sol.buildTree(pre, in_))
    print()`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `DFS (recursion) or BFS (queue) tree traversals using extra tracking maps or objects.`,
        code: `// Better Solution
// TODO: Implement optimized approach
from typing import List

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> TreeNode:
        # Write your code here
        pass
    def build(self, pre: List[int], preL: int, preR: int, inL: int) -> TreeNode:
        # Write your code here
        pass
def inorderPrint(node: TreeNode) -> None:
    if not node:
        return
    inorderPrint(node.left)
    print(node.val, end=" ")
    inorderPrint(node.right)

if __name__ == "__main__":
    sol = Solution()
    pre = [3, 9, 20, 15, 7]
    in_ = [9, 3, 15, 20, 7]
    inorderPrint(sol.buildTree(pre, in_))
    print()`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Single-pass DFS/BFS tree traversal, gathering metrics or updating values in-place with constant height memory.`,
        code: `from typing import List

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> TreeNode:
        self.inIdx = {}
        for i, val in enumerate(inorder):
            self.inIdx[val] = i
        return self.build(preorder, 0, len(preorder) - 1, 0)

    def build(self, pre: List[int], preL: int, preR: int, inL: int) -> TreeNode:
        if preL > preR:
            return None
        root_val = pre[preL]
        mid = self.inIdx[root_val]
        left_size = mid - inL
        node = TreeNode(root_val)
        node.left = self.build(pre, preL + 1, preL + left_size, inL)
        node.right = self.build(pre, preL + left_size + 1, preR, mid + 1)
        return node

def inorderPrint(node: TreeNode) -> None:
    if not node:
        return
    inorderPrint(node.left)
    print(node.val, end=" ")
    inorderPrint(node.right)

if __name__ == "__main__":
    sol = Solution()
    pre = [3, 9, 20, 15, 7]
    in_ = [9, 3, 15, 20, 7]
    inorderPrint(sol.buildTree(pre, in_))
    print()`
      }
    }
  }
};

export default problem;
