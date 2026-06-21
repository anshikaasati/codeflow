import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "asteroid-collision",
  title: "Asteroid Collision",
  difficulty: "Medium",
  category: "Stack",
  patterns: ["Stack"],
  url: "https://leetcode.com/problems/asteroid-collision/",
  description: `We are given an array \`asteroids\` of integers representing asteroids in a row.

For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed.

Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.`,
  examples: [
    {
      "input": "asteroids = [5,10,-5]",
      "output": "[5,10]",
      "explanation": "The 10 and -5 collide resulting in 10. The 5 and 10 never collide."
    },
    {
      "input": "asteroids = [8,-8]",
      "output": "[]",
      "explanation": "The 8 and -8 collide exploding each other."
    },
    {
      "input": "asteroids = [10,2,-5]",
      "output": "[10]",
      "explanation": "The 2 and -5 collide resulting in -5. The 10 and -5 collide resulting in 10."
    }
  ],
  constraints: [
    "2 <= asteroids.length <= 10^4",
    "-1000 <= asteroids[i] <= 1000",
    "asteroids[i] != 0"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> asteroidCollision(vector<int>& asteroids) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> a={5,10,-5};
    for (int v:sol.asteroidCollision(a)) cout<<v<<" "; // 5 10
    cout<<endl;
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Generate and check all paths or elements using nested loop backtracking.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> asteroidCollision(vector<int>& asteroids) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> a={5,10,-5};
    for (int v:sol.asteroidCollision(a)) cout<<v<<" "; // 5 10
    cout<<endl;
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Use extra stacks or auxiliary memory to store elements and retrieve them on demand.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> asteroidCollision(vector<int>& asteroids) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> a={5,10,-5};
    for (int v:sol.asteroidCollision(a)) cout<<v<<" "; // 5 10
    cout<<endl;
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Maintain a monotonic stack to resolve nearest smaller/greater elements in a single linear pass.`,
        code: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> asteroidCollision(vector<int>& asteroids) {
        stack<int> st;
        for (int a : asteroids) {
            bool alive = true;
            while (alive && a < 0 && !st.empty() && st.top() > 0) {
                if (st.top() < -a) st.pop();
                else { alive = (st.top() == -a); if (alive) st.pop(); alive = false; }
            }
            if (alive) st.push(a);
        }
        vector<int> res(st.size());
        for (int i=res.size()-1;i>=0;i--) { res[i]=st.top(); st.pop(); }
        return res;
    }
};

int main() {
    Solution sol;
    vector<int> a={5,10,-5};
    for (int v:sol.asteroidCollision(a)) cout<<v<<" "; // 5 10
    cout<<endl;
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def asteroidCollision(self, asteroids: List[int]) -> List[int]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    a = [5, 10, -5]
    print(*sol.asteroidCollision(a))  # 5 10
    a = [8, -8]
    print(*sol.asteroidCollision(a))  # 
    a = [10, 2, -5]
    print(*sol.asteroidCollision(a))  # 10
    a = [-2, -1, 1, 2]
    print(*sol.asteroidCollision(a))  # -2 -1 1 2`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Generate and check all paths or elements using nested loop backtracking.`,
        code: `# Brute Force Approach
# TODO: Implement brute force
from typing import List

class Solution:
    def asteroidCollision(self, asteroids: List[int]) -> List[int]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    a = [5, 10, -5]
    print(*sol.asteroidCollision(a))  # 5 10
    a = [8, -8]
    print(*sol.asteroidCollision(a))  # 
    a = [10, 2, -5]
    print(*sol.asteroidCollision(a))  # 10
    a = [-2, -1, 1, 2]
    print(*sol.asteroidCollision(a))  # -2 -1 1 2`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Use extra stacks or auxiliary memory to store elements and retrieve them on demand.`,
        code: `# Better Solution
# TODO: Implement optimized approach
from typing import List

class Solution:
    def asteroidCollision(self, asteroids: List[int]) -> List[int]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    a = [5, 10, -5]
    print(*sol.asteroidCollision(a))  # 5 10
    a = [8, -8]
    print(*sol.asteroidCollision(a))  # 
    a = [10, 2, -5]
    print(*sol.asteroidCollision(a))  # 10
    a = [-2, -1, 1, 2]
    print(*sol.asteroidCollision(a))  # -2 -1 1 2`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Maintain a monotonic stack to resolve nearest smaller/greater elements in a single linear pass.`,
        code: `from typing import List

class Solution:
    def asteroidCollision(self, asteroids: List[int]) -> List[int]:
        stack = []
        for a in asteroids:
            alive = True
            while alive and a < 0 and stack:
                if stack[-1] < -a:
                    stack.pop()
                elif stack[-1] == -a:
                    stack.pop()
                    alive = False
                else:
                    alive = False
            if alive:
                stack.append(a)
        return stack[::-1]

if __name__ == '__main__':
    sol = Solution()
    a = [5, 10, -5]
    print(*sol.asteroidCollision(a))  # 5 10
    a = [8, -8]
    print(*sol.asteroidCollision(a))  # 
    a = [10, 2, -5]
    print(*sol.asteroidCollision(a))  # 10
    a = [-2, -1, 1, 2]
    print(*sol.asteroidCollision(a))  # -2 -1 1 2`
      }
    }
  }
};

export default problem;
