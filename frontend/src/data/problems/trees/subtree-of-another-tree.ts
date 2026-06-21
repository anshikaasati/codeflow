import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "subtree-of-another-tree",
  title: "Subtree of Another Tree",
  difficulty: "Easy",
  category: "Trees",
  patterns: ["Tree","DFS","Recursion"],
  url: "https://leetcode.com/problems/subtree-of-another-tree/",
  description: `Given the roots of two binary trees \`root\` and \`subRoot\`, return \`true\` if there is a subtree of \`root\` with the same structure and node values of \`subRoot\` and \`false\` otherwise.\\n\\nA subtree of a binary tree \`tree\` is a tree that consists of a node in \`tree\` and all of this node's descendants. The tree \`tree\` could also be considered as a subtree of itself.`,
  examples: [
    {
      "input": "root = [3,4,5,1,2], subRoot = [4,1,2]",
      "output": "true"
    },
    {
      "input": "root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]",
      "output": "false"
    }
  ],
  constraints: [
    "The number of nodes in the root tree is in the range [1, 2000].",
    "The number of nodes in the subRoot tree is in the range [1, 1000].",
    "-10^4 <= root.val <= 10^4",
    "-10^4 <= subRoot.val <= 10^4"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;
struct TreeNode{int val;TreeNode*left,*right;TreeNode(int x):val(x),left(nullptr),right(nullptr){}};
class Solution {
    bool same(TreeNode* s, TreeNode* t){
        // Write your code here
        return false;
    }
public:
    bool isSubtree(TreeNode* root, TreeNode* subRoot){
        // Write your code here
        return false;
    }
};
int main(){
    TreeNode* s=new TreeNode(3); s->left=new TreeNode(4); s->right=new TreeNode(5);
    s->left->left=new TreeNode(1); s->left->right=new TreeNode(2);
    TreeNode* t=new TreeNode(4); t->left=new TreeNode(1); t->right=new TreeNode(2);
    Solution sol; cout<<boolalpha<<sol.isSubtree(s,t)<<endl; // true
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
    bool same(TreeNode* s, TreeNode* t){
        // Write your code here
        return false;
    }
public:
    bool isSubtree(TreeNode* root, TreeNode* subRoot){
        // Write your code here
        return false;
    }
};
int main(){
    TreeNode* s=new TreeNode(3); s->left=new TreeNode(4); s->right=new TreeNode(5);
    s->left->left=new TreeNode(1); s->left->right=new TreeNode(2);
    TreeNode* t=new TreeNode(4); t->left=new TreeNode(1); t->right=new TreeNode(2);
    Solution sol; cout<<boolalpha<<sol.isSubtree(s,t)<<endl; // true
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
    bool same(TreeNode* s, TreeNode* t){
        // Write your code here
        return false;
    }
public:
    bool isSubtree(TreeNode* root, TreeNode* subRoot){
        // Write your code here
        return false;
    }
};
int main(){
    TreeNode* s=new TreeNode(3); s->left=new TreeNode(4); s->right=new TreeNode(5);
    s->left->left=new TreeNode(1); s->left->right=new TreeNode(2);
    TreeNode* t=new TreeNode(4); t->left=new TreeNode(1); t->right=new TreeNode(2);
    Solution sol; cout<<boolalpha<<sol.isSubtree(s,t)<<endl; // true
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
    bool same(TreeNode* s, TreeNode* t){
        if(!s&&!t) return true;
        if(!s||!t||s->val!=t->val) return false;
        return same(s->left,t->left)&&same(s->right,t->right);
    }
public:
    bool isSubtree(TreeNode* root, TreeNode* subRoot){
        if(!root) return false;
        if(same(root,subRoot)) return true;
        return isSubtree(root->left,subRoot)||isSubtree(root->right,subRoot);
    }
};
int main(){
    TreeNode* s=new TreeNode(3); s->left=new TreeNode(4); s->right=new TreeNode(5);
    s->left->left=new TreeNode(1); s->left->right=new TreeNode(2);
    TreeNode* t=new TreeNode(4); t->left=new TreeNode(1); t->right=new TreeNode(2);
    Solution sol; cout<<boolalpha<<sol.isSubtree(s,t)<<endl; // true
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
    def same(self, s: Optional[TreeNode], t: Optional[TreeNode]) -> bool:
        # Write your code here
        return False
    def isSubtree(self, root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:
        # Write your code here
        return False
if __name__ == '__main__':
    s = TreeNode(3)
    s.left = TreeNode(4)
    s.right = TreeNode(5)
    s.left.left = TreeNode(1)
    s.left.right = TreeNode(2)

    t = TreeNode(4)
    t.left = TreeNode(1)
    t.right = TreeNode(2)

    sol = Solution()
    print(sol.isSubtree(s, t))  # true`,
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
    def same(self, s: Optional[TreeNode], t: Optional[TreeNode]) -> bool:
        # Write your code here
        return False
    def isSubtree(self, root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:
        # Write your code here
        return False
if __name__ == '__main__':
    s = TreeNode(3)
    s.left = TreeNode(4)
    s.right = TreeNode(5)
    s.left.left = TreeNode(1)
    s.left.right = TreeNode(2)

    t = TreeNode(4)
    t.left = TreeNode(1)
    t.right = TreeNode(2)

    sol = Solution()
    print(sol.isSubtree(s, t))  # true`
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
    def same(self, s: Optional[TreeNode], t: Optional[TreeNode]) -> bool:
        # Write your code here
        return False
    def isSubtree(self, root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:
        # Write your code here
        return False
if __name__ == '__main__':
    s = TreeNode(3)
    s.left = TreeNode(4)
    s.right = TreeNode(5)
    s.left.left = TreeNode(1)
    s.left.right = TreeNode(2)

    t = TreeNode(4)
    t.left = TreeNode(1)
    t.right = TreeNode(2)

    sol = Solution()
    print(sol.isSubtree(s, t))  # true`
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
    def same(self, s: Optional[TreeNode], t: Optional[TreeNode]) -> bool:
        if not s and not t:
            return True
        if not s or not t or s.val != t.val:
            return False
        return self.same(s.left, t.left) and self.same(s.right, t.right)

    def isSubtree(self, root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:
        if not root:
            return False
        if self.same(root, subRoot):
            return True
        return self.isSubtree(root.left, subRoot) or self.isSubtree(root.right, subRoot)

if __name__ == '__main__':
    s = TreeNode(3)
    s.left = TreeNode(4)
    s.right = TreeNode(5)
    s.left.left = TreeNode(1)
    s.left.right = TreeNode(2)

    t = TreeNode(4)
    t.left = TreeNode(1)
    t.right = TreeNode(2)

    sol = Solution()
    print(sol.isSubtree(s, t))  # true`
      }
    }
  }
};

export default problem;
