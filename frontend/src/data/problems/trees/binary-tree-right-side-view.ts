import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "binary-tree-right-side-view",
  title: "Binary Tree Right Side View",
  difficulty: "Medium",
  category: "Trees",
  patterns: ["Tree","BFS","Queue"],
  url: "https://leetcode.com/problems/binary-tree-right-side-view/",
  description: "Given the `root` of a binary tree, imagine yourself standing on the **right side** of it, return the values of the nodes you can see ordered from top to bottom.",
  examples: [
  {
    "input": "root = [1,2,3,null,5,null,4]",
    "output": "[1,3,4]"
  },
  {
    "input": "root = [1,null,3]",
    "output": "[1,3]"
  },
  {
    "input": "root = []",
    "output": "[]"
  }
],
  constraints: [
  "The number of nodes in the tree is in the range [0, 100].",
  "-100 <= Node.val <= 100"
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

struct TreeNode{int val;TreeNode*left,*right;TreeNode(int x):val(x),left(nullptr),right(nullptr){}};

class Solution {
public:
    vector<int> rightSideView(TreeNode* root){
        vector<int> res;
        if(!root) return res;
        queue<TreeNode*> q; q.push(root);
        while(!q.empty()){
            int sz=q.size();
            for(int i=0;i<sz;i++){
                auto n=q.front();q.pop();
                if(i==sz-1) res.push_back(n->val);
                if(n->left) q.push(n->left);
                if(n->right) q.push(n->right);
            }
        }
        return res;
    }
};

int main(){
    TreeNode* t=new TreeNode(1); t->left=new TreeNode(2); t->right=new TreeNode(3);
    t->left->right=new TreeNode(5); t->right->right=new TreeNode(4);
    Solution sol;
    for(int v:sol.rightSideView(t)) cout<<v<<" "; // 1 3 4
    cout<<endl; return 0;
}`
    },
    python: {
      starterCode: `from typing import List

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def rightSideView(self, root: TreeNode) -> List[int]:
        if not root:
            return []
        queue = [root]
        result = []
        while queue:
            level_size = len(queue)
            for i in range(level_size):
                node = queue.pop(0)
                if i == level_size - 1:
                    result.append(node.val)
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
        return result

if __name__ == '__main__':
    root = TreeNode(1)
    root.left = TreeNode(2)
    root.right = TreeNode(3)
    root.left.right = TreeNode(5)
    root.right.right = TreeNode(4)
    sol = Solution()
    print(" ".join(map(str, sol.rightSideView(root))))  # 1 3 4
    print()`
    }
  }
};

export default problem;
