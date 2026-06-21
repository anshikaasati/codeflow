import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "path-sum",
  title: "Path Sum",
  difficulty: "Easy",
  category: "Trees",
  patterns: ["Tree","DFS","Recursion"],
  url: "https://leetcode.com/problems/path-sum/",
  description: `Given the \`root\` of a binary tree and an integer \`targetSum\`, return \`true\` if the tree has a **root-to-leaf** path such that adding up all the values along the path equals \`targetSum\`.\\n\\nA **leaf** is a node with no children.`,
  examples: [
    {
      "input": "root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22",
      "output": "true"
    },
    {
      "input": "root = [1,2,3], targetSum = 5",
      "output": "false"
    },
    {
      "input": "root = [], targetSum = 0",
      "output": "false"
    }
  ],
  constraints: [
    "The number of nodes in the tree is in the range [0, 5000].",
    "-1000 <= Node.val <= 1000",
    "-1000 <= targetSum <= 1000"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;
struct TreeNode{int val;TreeNode*left,*right;TreeNode(int x):val(x),left(nullptr),right(nullptr){}};
class Solution {
public:
    bool hasPathSum(TreeNode* root, int target){
        // Write your code here
        return false;
    }
};
int main(){
    TreeNode* t=new TreeNode(5);
    t->left=new TreeNode(4); t->right=new TreeNode(8);
    t->left->left=new TreeNode(11); t->left->left->left=new TreeNode(7); t->left->left->right=new TreeNode(2);
    Solution sol; cout<<boolalpha<<sol.hasPathSum(t,22)<<endl; // true
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
    bool hasPathSum(TreeNode* root, int target){
        // Write your code here
        return false;
    }
};
int main(){
    TreeNode* t=new TreeNode(5);
    t->left=new TreeNode(4); t->right=new TreeNode(8);
    t->left->left=new TreeNode(11); t->left->left->left=new TreeNode(7); t->left->left->right=new TreeNode(2);
    Solution sol; cout<<boolalpha<<sol.hasPathSum(t,22)<<endl; // true
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
    bool hasPathSum(TreeNode* root, int target){
        // Write your code here
        return false;
    }
};
int main(){
    TreeNode* t=new TreeNode(5);
    t->left=new TreeNode(4); t->right=new TreeNode(8);
    t->left->left=new TreeNode(11); t->left->left->left=new TreeNode(7); t->left->left->right=new TreeNode(2);
    Solution sol; cout<<boolalpha<<sol.hasPathSum(t,22)<<endl; // true
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
    bool hasPathSum(TreeNode* root, int target){
        if(!root) return false;
        if(!root->left&&!root->right) return root->val==target;
        return hasPathSum(root->left,target-root->val)||hasPathSum(root->right,target-root->val);
    }
};
int main(){
    TreeNode* t=new TreeNode(5);
    t->left=new TreeNode(4); t->right=new TreeNode(8);
    t->left->left=new TreeNode(11); t->left->left->left=new TreeNode(7); t->left->left->right=new TreeNode(2);
    Solution sol; cout<<boolalpha<<sol.hasPathSum(t,22)<<endl; // true
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import Optional

class TreeNode:
    def __init__(self, x: int):
        self.val = x
        self.left = None
        self.right = None

class Solution:
    def hasPathSum(self, root: Optional[TreeNode], target: int) -> bool:
        # Write your code here
        return False
if __name__ == '__main__':
    t = TreeNode(5)
    t.left = TreeNode(4)
    t.right = TreeNode(8)
    t.left.left = TreeNode(11)
    t.left.left.left = TreeNode(7)
    t.left.left.right = TreeNode(2)
    sol = Solution()
    print(sol.hasPathSum(t, 22))  # true`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Compare subtrees or paths repeatedly by traversing the tree naive recursive style.`,
        code: `# Brute Force Approach
# TODO: Implement brute force
from typing import Optional

class TreeNode:
    def __init__(self, x: int):
        self.val = x
        self.left = None
        self.right = None

class Solution:
    def hasPathSum(self, root: Optional[TreeNode], target: int) -> bool:
        # Write your code here
        return False
if __name__ == '__main__':
    t = TreeNode(5)
    t.left = TreeNode(4)
    t.right = TreeNode(8)
    t.left.left = TreeNode(11)
    t.left.left.left = TreeNode(7)
    t.left.left.right = TreeNode(2)
    sol = Solution()
    print(sol.hasPathSum(t, 22))  # true`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `DFS (recursion) or BFS (queue) tree traversals using extra tracking maps or objects.`,
        code: `# Better Solution
# TODO: Implement optimized approach
from typing import Optional

class TreeNode:
    def __init__(self, x: int):
        self.val = x
        self.left = None
        self.right = None

class Solution:
    def hasPathSum(self, root: Optional[TreeNode], target: int) -> bool:
        # Write your code here
        return False
if __name__ == '__main__':
    t = TreeNode(5)
    t.left = TreeNode(4)
    t.right = TreeNode(8)
    t.left.left = TreeNode(11)
    t.left.left.left = TreeNode(7)
    t.left.left.right = TreeNode(2)
    sol = Solution()
    print(sol.hasPathSum(t, 22))  # true`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Single-pass DFS/BFS tree traversal, gathering metrics or updating values in-place with constant height memory.`,
        code: `from typing import Optional

class TreeNode:
    def __init__(self, x: int):
        self.val = x
        self.left = None
        self.right = None

class Solution:
    def hasPathSum(self, root: Optional[TreeNode], target: int) -> bool:
        if not root:
            return False
        if not root.left and not root.right:
            return root.val == target
        return self.hasPathSum(root.left, target - root.val) or self.hasPathSum(root.right, target - root.val)

if __name__ == '__main__':
    t = TreeNode(5)
    t.left = TreeNode(4)
    t.right = TreeNode(8)
    t.left.left = TreeNode(11)
    t.left.left.left = TreeNode(7)
    t.left.left.right = TreeNode(2)
    sol = Solution()
    print(sol.hasPathSum(t, 22))  # true`
      }
    }
  }
};

export default problem;
