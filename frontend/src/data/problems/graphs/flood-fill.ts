import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "flood-fill",
  title: "Flood Fill",
  difficulty: "Easy",
  category: "Graphs",
  patterns: ["Graph","DFS"],
  url: "https://leetcode.com/problems/flood-fill/",
  description: `An \`image\` is represented by an \`m x n\` integer grid \`image\` where \`image[i][j]\` represents the pixel value of the image.

You are also given three integers \`sr\`, \`sc\`, and \`color\`. You should perform a **flood fill** on the image starting from the pixel \`image[sr][sc]\`.

To perform a **flood fill**, consider the starting pixel, plus any pixels connected **4-directionally** to the starting pixel of the same color as the starting pixel, plus any pixels connected **4-directionally** to those pixels (also with the same color), and so on. Replace the color of all of the aforementioned pixels with \`color\`.

Return the modified image after performing the flood fill.`,
  examples: [
    {
      "input": "image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2",
      "output": "[[2,2,2],[2,2,0],[2,0,1]]",
      "explanation": "From the center of the image with position (sr, sc) = (1, 1) (i.e., the red pixel), all pixels connected by a path of the same color as the starting pixel (i.e., the blue pixels) are colored with the new color. Note the bottom corner is not colored 2, because it is not 4-directionally connected to the starting pixel."
    },
    {
      "input": "image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, color = 0",
      "output": "[[0,0,0],[0,0,0]]",
      "explanation": "The starting pixel is already colored 0, so no changes are made to the image."
    }
  ],
  constraints: [
    "m == image.length",
    "n == image[i].length",
    "1 <= m, n <= 50",
    "0 <= image[i][j], color < 2^16",
    "0 <= sr < m",
    "0 <= sc < n"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
    void dfs(vector<vector<int>>&img,int i,int j,int orig,int color){
        // Write your code here
    }
public:
    vector<vector<int>> floodFill(vector<vector<int>>& image,int sr,int sc,int color){
        // Write your code here
        return {};
    }
};

int main(){
    vector<vector<int>> img={{1,1,1},{1,1,0},{1,0,1}};
    Solution sol;
    for(auto&r:sol.floodFill(img,1,1,2)){for(int v:r)cout<<v<<" ";cout<<endl;}
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Generate all possible paths or check connectivity of all node pairs.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;

class Solution {
    void dfs(vector<vector<int>>&img,int i,int j,int orig,int color){
        // Write your code here
    }
public:
    vector<vector<int>> floodFill(vector<vector<int>>& image,int sr,int sc,int color){
        // Write your code here
        return {};
    }
};

int main(){
    vector<vector<int>> img={{1,1,1},{1,1,0},{1,0,1}};
    Solution sol;
    for(auto&r:sol.floodFill(img,1,1,2)){for(int v:r)cout<<v<<" ";cout<<endl;}
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Standard Breadth-First Search (BFS) or Depth-First Search (DFS) to traverse nodes.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;

class Solution {
    void dfs(vector<vector<int>>&img,int i,int j,int orig,int color){
        // Write your code here
    }
public:
    vector<vector<int>> floodFill(vector<vector<int>>& image,int sr,int sc,int color){
        // Write your code here
        return {};
    }
};

int main(){
    vector<vector<int>> img={{1,1,1},{1,1,0},{1,0,1}};
    Solution sol;
    for(auto&r:sol.floodFill(img,1,1,2)){for(int v:r)cout<<v<<" ";cout<<endl;}
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Optimized graph algorithms (like Dijkstra, Kruskal, or Union-Find) to solve shortest path or connectivity.`,
        code: `#include <bits/stdc++.h>
using namespace std;

class Solution {
    void dfs(vector<vector<int>>&img,int i,int j,int orig,int color){
        if(i<0||i>=(int)img.size()||j<0||j>=(int)img[0].size()||img[i][j]!=orig) return;
        img[i][j]=color;
        dfs(img,i+1,j,orig,color);dfs(img,i-1,j,orig,color);
        dfs(img,i,j+1,orig,color);dfs(img,i,j-1,orig,color);
    }
public:
    vector<vector<int>> floodFill(vector<vector<int>>& image,int sr,int sc,int color){
        if(image[sr][sc]!=color) dfs(image,sr,sc,image[sr][sc],color);
        return image;
    }
};

int main(){
    vector<vector<int>> img={{1,1,1},{1,1,0},{1,0,1}};
    Solution sol;
    for(auto&r:sol.floodFill(img,1,1,2)){for(int v:r)cout<<v<<" ";cout<<endl;}
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def dfs(self, img: List[List[int]], i: int, j: int, orig: int, color: int) -> None:
        # Write your code here
        pass
    def floodFill(self, image: List[List[int]], sr: int, sc: int, color: int) -> List[List[int]]:
        # Write your code here
        return []
if __name__ == '__main__':
    img = [[1, 1, 1], [1, 1, 0], [1, 0, 1]]
    sol = Solution()
    for r in sol.floodFill(img, 1, 1, 2):
        print(' '.join(map(str, r)))`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Generate all possible paths or check connectivity of all node pairs.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from typing import List

class Solution:
    def dfs(self, img: List[List[int]], i: int, j: int, orig: int, color: int) -> None:
        # Write your code here
        pass
    def floodFill(self, image: List[List[int]], sr: int, sc: int, color: int) -> List[List[int]]:
        # Write your code here
        return []
if __name__ == '__main__':
    img = [[1, 1, 1], [1, 1, 0], [1, 0, 1]]
    sol = Solution()
    for r in sol.floodFill(img, 1, 1, 2):
        print(' '.join(map(str, r)))`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Standard Breadth-First Search (BFS) or Depth-First Search (DFS) to traverse nodes.`,
        code: `// Better Solution
// TODO: Implement optimized approach
from typing import List

class Solution:
    def dfs(self, img: List[List[int]], i: int, j: int, orig: int, color: int) -> None:
        # Write your code here
        pass
    def floodFill(self, image: List[List[int]], sr: int, sc: int, color: int) -> List[List[int]]:
        # Write your code here
        return []
if __name__ == '__main__':
    img = [[1, 1, 1], [1, 1, 0], [1, 0, 1]]
    sol = Solution()
    for r in sol.floodFill(img, 1, 1, 2):
        print(' '.join(map(str, r)))`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Optimized graph algorithms (like Dijkstra, Kruskal, or Union-Find) to solve shortest path or connectivity.`,
        code: `from typing import List

class Solution:
    def dfs(self, img: List[List[int]], i: int, j: int, orig: int, color: int) -> None:
        if i < 0 or i >= len(img) or j < 0 or j >= len(img[0]) or img[i][j] != orig:
            return
        img[i][j] = color
        self.dfs(img, i + 1, j, orig, color)
        self.dfs(img, i - 1, j, orig, color)
        self.dfs(img, i, j + 1, orig, color)
        self.dfs(img, i, j - 1, orig, color)

    def floodFill(self, image: List[List[int]], sr: int, sc: int, color: int) -> List[List[int]]:
        if image[sr][sc] != color:
            self.dfs(image, sr, sc, image[sr][sc], color)
        return image

if __name__ == '__main__':
    img = [[1, 1, 1], [1, 1, 0], [1, 0, 1]]
    sol = Solution()
    for r in sol.floodFill(img, 1, 1, 2):
        print(' '.join(map(str, r)))`
      }
    }
  }
};

export default problem;
