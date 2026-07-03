import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "intersection-of-three-sorted-arrays",
  title: "Intersection of Three Sorted Arrays",
  difficulty: "Easy",
  category: "Sorting",
  patterns: ["Sorting"],
  url: "https://leetcode.com/problems/intersection-of-three-sorted-arrays/",
  description: `Given three integer arrays \`arr1\`, \`arr2\` and \`arr3\` sorted in strictly increasing order, return a sorted array of only the integers that appeared in all three arrays.`,
  examples: [
    {
      "input": "arr1 = [1,2,3,4,5], arr2 = [1,2,5,7,9], arr3 = [1,3,4,5,8]",
      "output": "[1,5]",
      "explanation": "Only 1 and 5 appeared in all three arrays."
    }
  ],
  constraints: [
    "1 <= arr1.length, arr2.length, arr3.length <= 1000",
    "1 <= arr1[i], arr2[i], arr3[i] <= 2000"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> arraysIntersection(vector<int>& arr1, vector<int>& arr2, vector<int>& arr3) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> arr1 = {1, 2, 3, 4, 5};
    vector<int> arr2 = {1, 2, 5, 7, 9};
    vector<int> arr3 = {1, 3, 4, 5, 8};
    vector<int> res = sol.arraysIntersection(arr1, arr2, arr3);
    for (int x : res) cout << x << " ";
    cout << endl;
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Bubble sort or selection sort comparing all pairs repeatedly.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> arraysIntersection(vector<int>& arr1, vector<int>& arr2, vector<int>& arr3) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> arr1 = {1, 2, 3, 4, 5};
    vector<int> arr2 = {1, 2, 5, 7, 9};
    vector<int> arr3 = {1, 3, 4, 5, 8};
    vector<int> res = sol.arraysIntersection(arr1, arr2, arr3);
    for (int x : res) cout << x << " ";
    cout << endl;
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Divide-and-conquer sorting (Merge Sort or Quick Sort) in O(N log N) time.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> arraysIntersection(vector<int>& arr1, vector<int>& arr2, vector<int>& arr3) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> arr1 = {1, 2, 3, 4, 5};
    vector<int> arr2 = {1, 2, 5, 7, 9};
    vector<int> arr3 = {1, 3, 4, 5, 8};
    vector<int> res = sol.arraysIntersection(arr1, arr2, arr3);
    for (int x : res) cout << x << " ";
    cout << endl;
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Linear time sorting (like bucket sort or counting sort) taking advantage of constraints.`,
        code: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> arraysIntersection(vector<int>& arr1, vector<int>& arr2, vector<int>& arr3) {
        vector<int> res;
        int i = 0, j = 0, k = 0;
        while (i < arr1.size() && j < arr2.size() && k < arr3.size()) {
            if (arr1[i] == arr2[j] && arr2[j] == arr3[k]) {
                res.push_back(arr1[i]);
                i++; j++; k++;
            } else {
                int minVal = arr1[i];
                if (arr2[j] < minVal) minVal = arr2[j];
                if (arr3[k] < minVal) minVal = arr3[k];
                
                if (arr1[i] == minVal) i++;
                if (arr2[j] == minVal) j++;
                if (arr3[k] == minVal) k++;
            }
        }
        return res;
    }
};

int main() {
    Solution sol;
    vector<int> arr1 = {1, 2, 3, 4, 5};
    vector<int> arr2 = {1, 2, 5, 7, 9};
    vector<int> arr3 = {1, 3, 4, 5, 8};
    vector<int> res = sol.arraysIntersection(arr1, arr2, arr3);
    for (int x : res) cout << x << " ";
    cout << endl;
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def arraysIntersection(self, arr1: List[int], arr2: List[int], arr3: List[int]) -> List[int]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    arr1 = [1, 2, 3, 4, 5]
    arr2 = [1, 2, 5, 7, 9]
    arr3 = [1, 3, 4, 5, 8]
    res = sol.arraysIntersection(arr1, arr2, arr3)
    print(' '.join(map(str, res)))`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Bubble sort or selection sort comparing all pairs repeatedly.`,
        code: `# Brute Force Approach
# TODO: Implement brute force
from typing import List

class Solution:
    def arraysIntersection(self, arr1: List[int], arr2: List[int], arr3: List[int]) -> List[int]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    arr1 = [1, 2, 3, 4, 5]
    arr2 = [1, 2, 5, 7, 9]
    arr3 = [1, 3, 4, 5, 8]
    res = sol.arraysIntersection(arr1, arr2, arr3)
    print(' '.join(map(str, res)))`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Divide-and-conquer sorting (Merge Sort or Quick Sort) in O(N log N) time.`,
        code: `# Better Solution
# TODO: Implement optimized approach
from typing import List

class Solution:
    def arraysIntersection(self, arr1: List[int], arr2: List[int], arr3: List[int]) -> List[int]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    arr1 = [1, 2, 3, 4, 5]
    arr2 = [1, 2, 5, 7, 9]
    arr3 = [1, 3, 4, 5, 8]
    res = sol.arraysIntersection(arr1, arr2, arr3)
    print(' '.join(map(str, res)))`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Linear time sorting (like bucket sort or counting sort) taking advantage of constraints.`,
        code: `from typing import List

class Solution:
    def arraysIntersection(self, arr1: List[int], arr2: List[int], arr3: List[int]) -> List[int]:
        res = []
        i, j, k = 0, 0, 0
        while i < len(arr1) and j < len(arr2) and k < len(arr3):
            if arr1[i] == arr2[j] == arr3[k]:
                res.append(arr1[i])
                i += 1
                j += 1
                k += 1
            else:
                min_val = min(arr1[i], arr2[j], arr3[k])
                
                if arr1[i] == min_val:
                    i += 1
                if arr2[j] == min_val:
                    j += 1
                if arr3[k] == min_val:
                    k += 1
        return res

if __name__ == '__main__':
    sol = Solution()
    arr1 = [1, 2, 3, 4, 5]
    arr2 = [1, 2, 5, 7, 9]
    arr3 = [1, 3, 4, 5, 8]
    res = sol.arraysIntersection(arr1, arr2, arr3)
    print(' '.join(map(str, res)))`
      }
    }
  }
};

export default problem;
