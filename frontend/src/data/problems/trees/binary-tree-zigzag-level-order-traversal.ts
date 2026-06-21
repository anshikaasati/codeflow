import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "binary-tree-zigzag-level-order-traversal",
  title: "Binary Tree Zigzag Level Order Traversal",
  difficulty: "Medium",
  category: "Trees",
  patterns: ["Tree","BFS","Queue"],
  url: "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/",
  description: `Given the \`root\` of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate between).`,
  examples: [
    {
      "input": "root = [3,9,20,null,null,15,7]",
      "output": "[[3],[20,9],[15,7]]"
    },
    {
      "input": "root = [1]",
      "output": "[[1]]"
    },
    {
      "input": "root = []",
      "output": "[]"
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
    vector<vector<int>> zigzagLevelOrder(TreeNode* root){
        // Write your code here
        return {};
    }
};
int main(){
    TreeNode* t=new TreeNode(3); t->left=new TreeNode(9); t->right=new TreeNode(20);
    t->right->left=new TreeNode(15); t->right->right=new TreeNode(7);
    Solution sol;
    for(auto&l:sol.zigzagLevelOrder(t)){for(int v:l)cout<<v<<" ";cout<<endl;}
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
    vector<vector<int>> zigzagLevelOrder(TreeNode* root){
        // Write your code here
        return {};
    }
};
int main(){
    TreeNode* t=new TreeNode(3); t->left=new TreeNode(9); t->right=new TreeNode(20);
    t->right->left=new TreeNode(15); t->right->right=new TreeNode(7);
    Solution sol;
    for(auto&l:sol.zigzagLevelOrder(t)){for(int v:l)cout<<v<<" ";cout<<endl;}
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
    vector<vector<int>> zigzagLevelOrder(TreeNode* root){
        // Write your code here
        return {};
    }
};
int main(){
    TreeNode* t=new TreeNode(3); t->left=new TreeNode(9); t->right=new TreeNode(20);
    t->right->left=new TreeNode(15); t->right->right=new TreeNode(7);
    Solution sol;
    for(auto&l:sol.zigzagLevelOrder(t)){for(int v:l)cout<<v<<" ";cout<<endl;}
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
    vector<vector<int>> zigzagLevelOrder(TreeNode* root){
        vector<vector<int>> res;
        if(!root) return res;
        queue<TreeNode*> q; q.push(root); bool leftToRight=true;
        while(!q.empty()){
            int sz=q.size(); deque<int> level;
            for(int i=0;i<sz;i++){
                auto n=q.front();q.pop();
                if(leftToRight) level.push_back(n->val);
                else level.push_front(n->val);
                if(n->left) q.push(n->left);
                if(n->right) q.push(n->right);
            }
            res.push_back(vector<int>(level.begin(),level.end()));
            leftToRight=!leftToRight;
        }
        return res;
    }
};
int main(){
    TreeNode* t=new TreeNode(3); t->left=new TreeNode(9); t->right=new TreeNode(20);
    t->right->left=new TreeNode(15); t->right->right=new TreeNode(7);
    Solution sol;
    for(auto&l:sol.zigzagLevelOrder(t)){for(int v:l)cout<<v<<" ";cout<<endl;}
    return 0;
}`
      }
    },
    python: {
      starterCode: `from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def zigzagLevelOrder(self, root: TreeNode) -> list[list[int]]:
        # Write your code here
        return []
if __name__ == '__main__':
    root = TreeNode(3)
    root.left = TreeNode(9)
    root.right = TreeNode(20)
    root.right.left = TreeNode(15)
    root.right.right = TreeNode(7)
    
    sol = Solution()
    for level in sol.zigzagLevelOrder(root):
        print(' '.join(map(str, level)))`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Compare subtrees or paths repeatedly by traversing the tree naive recursive style.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def zigzagLevelOrder(self, root: TreeNode) -> list[list[int]]:
        # Write your code here
        return []
if __name__ == '__main__':
    root = TreeNode(3)
    root.left = TreeNode(9)
    root.right = TreeNode(20)
    root.right.left = TreeNode(15)
    root.right.right = TreeNode(7)
    
    sol = Solution()
    for level in sol.zigzagLevelOrder(root):
        print(' '.join(map(str, level)))`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `DFS (recursion) or BFS (queue) tree traversals using extra tracking maps or objects.`,
        code: `// Better Solution
// TODO: Implement optimized approach
from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def zigzagLevelOrder(self, root: TreeNode) -> list[list[int]]:
        # Write your code here
        return []
if __name__ == '__main__':
    root = TreeNode(3)
    root.left = TreeNode(9)
    root.right = TreeNode(20)
    root.right.left = TreeNode(15)
    root.right.right = TreeNode(7)
    
    sol = Solution()
    for level in sol.zigzagLevelOrder(root):
        print(' '.join(map(str, level)))`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Single-pass DFS/BFS tree traversal, gathering metrics or updating values in-place with constant height memory.`,
        code: `from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def zigzagLevelOrder(self, root: TreeNode) -> list[list[int]]:
        if not root:
            return []
        
        result = []
        queue = deque([root])
        left_to_right = True
        
        while queue:
            level_size = len(queue)
            level = deque()
            
            for _ in range(level_size):
                node = queue.popleft()
                if left_to_right:
                    level.append(node.val)
                else:
                    level.appendleft(node.val)
                
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
            
            result.append(list(level))
            left_to_right = not left_to_right
        
        return result

if __name__ == '__main__':
    root = TreeNode(3)
    root.left = TreeNode(9)
    root.right = TreeNode(20)
    root.right.left = TreeNode(15)
    root.right.right = TreeNode(7)
    
    sol = Solution()
    for level in sol.zigzagLevelOrder(root):
        print(' '.join(map(str, level)))`
      }
    }
  }
};

export default problem;
