import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "capacity-to-ship-packages-within-d-days",
  title: "Capacity To Ship Packages Within D Days",
  difficulty: "Medium",
  category: "Binary Search",
  patterns: ["Binary Search","Two Pointer"],
  url: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/",
  description: `A conveyor belt has packages that must be shipped from one port to another within \`days\` days.

The \`ith\` package on the conveyor belt has a weight of \`weights[i]\`. Each day, we load the ship with packages on the conveyor belt (in the order given by weights). We may not load more weight than the maximum weight capacity of the ship.

Return the least weight capacity of the ship that will result in all the packages on the conveyor belt being shipped within \`days\` days.`,
  examples: [
    {
      "input": "weights = [1,2,3,4,5,6,7,8,9,10], days = 5",
      "output": "15",
      "explanation": "A ship capacity of 15 is the minimum to ship all the packages in 5 days like this:\n1st day: 1, 2, 3, 4, 5 (15)\n2nd day: 6, 7 (13)\n3rd day: 8 (8)\n4th day: 9 (9)\n5th day: 10 (10)"
    },
    {
      "input": "weights = [3,2,2,4,1,4], days = 3",
      "output": "6"
    }
  ],
  constraints: [
    "1 <= days <= weights.length <= 5 * 10^4",
    "1 <= weights[i] <= 500"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
    bool canShip(vector<int>& w, int cap, int days) {
        // Write your code here
        return false;
    }
public:
    int shipWithinDays(vector<int>& weights, int days) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> w={1,2,3,4,5,6,7,8,9,10};
    cout<<sol.shipWithinDays(w,5)<<endl; // 15
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Iterate sequentially through the search space to find the target element or transition point.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;

class Solution {
    bool canShip(vector<int>& w, int cap, int days) {
        // Write your code here
        return false;
    }
public:
    int shipWithinDays(vector<int>& weights, int days) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> w={1,2,3,4,5,6,7,8,9,10};
    cout<<sol.shipWithinDays(w,5)<<endl; // 15
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Linear search with early exit or simple range narrowing.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;

class Solution {
    bool canShip(vector<int>& w, int cap, int days) {
        // Write your code here
        return false;
    }
public:
    int shipWithinDays(vector<int>& weights, int days) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> w={1,2,3,4,5,6,7,8,9,10};
    cout<<sol.shipWithinDays(w,5)<<endl; // 15
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Binary search dividing search space in half each step, achieving logarithmic runtime.`,
        code: `#include <bits/stdc++.h>
using namespace std;

class Solution {
    bool canShip(vector<int>& w, int cap, int days) {
        int d=1, curr=0;
        for (int x:w) { if (curr+x>cap) { d++; curr=0; } curr+=x; }
        return d<=days;
    }
public:
    int shipWithinDays(vector<int>& weights, int days) {
        int l=*max_element(weights.begin(),weights.end());
        int r=accumulate(weights.begin(),weights.end(),0);
        while (l<r) {
            int mid=l+(r-l)/2;
            if (canShip(weights,mid,days)) r=mid; else l=mid+1;
        }
        return l;
    }
};

int main() {
    Solution sol;
    vector<int> w={1,2,3,4,5,6,7,8,9,10};
    cout<<sol.shipWithinDays(w,5)<<endl; // 15
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def canShip(self, w: List[int], cap: int, days: int) -> bool:
        # Write your code here
        return False
    def shipWithinDays(self, weights: List[int], days: int) -> int:
        # Write your code here
        return 0
if __name__ == "__main__":
    sol = Solution()
    w = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    print(sol.shipWithinDays(w, 5))  # 15`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Iterate sequentially through the search space to find the target element or transition point.`,
        code: `# Brute Force Approach
# TODO: Implement brute force
from typing import List

class Solution:
    def canShip(self, w: List[int], cap: int, days: int) -> bool:
        # Write your code here
        return False
    def shipWithinDays(self, weights: List[int], days: int) -> int:
        # Write your code here
        return 0
if __name__ == "__main__":
    sol = Solution()
    w = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    print(sol.shipWithinDays(w, 5))  # 15`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Linear search with early exit or simple range narrowing.`,
        code: `# Better Solution
# TODO: Implement optimized approach
from typing import List

class Solution:
    def canShip(self, w: List[int], cap: int, days: int) -> bool:
        # Write your code here
        return False
    def shipWithinDays(self, weights: List[int], days: int) -> int:
        # Write your code here
        return 0
if __name__ == "__main__":
    sol = Solution()
    w = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    print(sol.shipWithinDays(w, 5))  # 15`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Binary search dividing search space in half each step, achieving logarithmic runtime.`,
        code: `from typing import List

class Solution:
    def canShip(self, w: List[int], cap: int, days: int) -> bool:
        d = 1
        curr = 0
        for x in w:
            if curr + x > cap:
                d += 1
                curr = 0
            curr += x
        return d <= days

    def shipWithinDays(self, weights: List[int], days: int) -> int:
        l = max(weights)
        r = sum(weights)
        while l < r:
            mid = l + (r - l) // 2
            if self.canShip(weights, mid, days):
                r = mid
            else:
                l = mid + 1
        return l

if __name__ == "__main__":
    sol = Solution()
    w = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    print(sol.shipWithinDays(w, 5))  # 15`
      }
    }
  }
};

export default problem;
