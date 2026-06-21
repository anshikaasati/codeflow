import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "find-median-from-data-stream",
  title: "Find Median from Data Stream",
  difficulty: "Hard",
  category: "Heap / Priority Queue",
  patterns: ["Heap","Greedy"],
  url: "https://leetcode.com/problems/find-median-from-data-stream/",
  description: `The **median** is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.

For example, for \`arr = [2,3,4]\`, the median is \`3\`.
For example, for \`arr = [2,3]\`, the median is \`(2 + 3) / 2 = 2.5\`.

Implement the MedianFinder class:
- \`MedianFinder()\` initializes the MedianFinder object.
- \`void addNum(int num)\` adds the integer \`num\` from the data stream to the data structure.
- \`double findMedian()\` returns the median of all elements so far. Answers within \`10^-5\` of the actual answer will be accepted.`,
  examples: [
    {
      "input": "[\"MedianFinder\", \"addNum\", \"addNum\", \"findMedian\", \"addNum\", \"findMedian\"]\n[[], [1], [2], [], [3], []]",
      "output": "[null, null, null, 1.5, null, 2.0]"
    }
  ],
  constraints: [
    "-10^5 <= num <= 10^5",
    "There will be at least one element in the data structure before calling findMedian.",
    "At most 5 * 10^4 calls will be made to addNum and findMedian."
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class MedianFinder {
    priority_queue<int> lo;                          // max-heap (left half)
    priority_queue<int,vector<int>,greater<int>> hi; // min-heap (right half)
public:
    void addNum(int num){
        lo.push(num);
        hi.push(lo.top()); lo.pop();
        if(hi.size()>lo.size()){lo.push(hi.top());hi.pop();}
    }
    double findMedian(){
        if(lo.size()>hi.size()) return lo.top();
        return (lo.top()+hi.top())/2.0;
    }
};

int main(){
    MedianFinder mf;
    mf.addNum(1); mf.addNum(2);
    cout<<mf.findMedian()<<endl; // 1.5
    mf.addNum(3);
    cout<<mf.findMedian()<<endl; // 2
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(2^N)",
        spaceComplexity: "O(1)",
        approach: `Sort the array or search for max/min elements repeatedly.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;

class MedianFinder {
    priority_queue<int> lo;                          // max-heap (left half)
    priority_queue<int,vector<int>,greater<int>> hi; // min-heap (right half)
public:
    void addNum(int num){
        lo.push(num);
        hi.push(lo.top()); lo.pop();
        if(hi.size()>lo.size()){lo.push(hi.top());hi.pop();}
    }
    double findMedian(){
        if(lo.size()>hi.size()) return lo.top();
        return (lo.top()+hi.top())/2.0;
    }
};

int main(){
    MedianFinder mf;
    mf.addNum(1); mf.addNum(2);
    cout<<mf.findMedian()<<endl; // 1.5
    mf.addNum(3);
    cout<<mf.findMedian()<<endl; // 2
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(N)",
        approach: `Insert all elements into a max-heap or min-heap and extract.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;

class MedianFinder {
    priority_queue<int> lo;                          // max-heap (left half)
    priority_queue<int,vector<int>,greater<int>> hi; // min-heap (right half)
public:
    void addNum(int num){
        lo.push(num);
        hi.push(lo.top()); lo.pop();
        if(hi.size()>lo.size()){lo.push(hi.top());hi.pop();}
    }
    double findMedian(){
        if(lo.size()>hi.size()) return lo.top();
        return (lo.top()+hi.top())/2.0;
    }
};

int main(){
    MedianFinder mf;
    mf.addNum(1); mf.addNum(2);
    cout<<mf.findMedian()<<endl; // 1.5
    mf.addNum(3);
    cout<<mf.findMedian()<<endl; // 2
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Maintain a min/max heap of size K, or use quickselect to get elements in-place with minimal overhead.`,
        code: `#include <bits/stdc++.h>
using namespace std;

class MedianFinder {
    priority_queue<int> lo;                          // max-heap (left half)
    priority_queue<int,vector<int>,greater<int>> hi; // min-heap (right half)
public:
    void addNum(int num){
        lo.push(num);
        hi.push(lo.top()); lo.pop();
        if(hi.size()>lo.size()){lo.push(hi.top());hi.pop();}
    }
    double findMedian(){
        if(lo.size()>hi.size()) return lo.top();
        return (lo.top()+hi.top())/2.0;
    }
};

int main(){
    MedianFinder mf;
    mf.addNum(1); mf.addNum(2);
    cout<<mf.findMedian()<<endl; // 1.5
    mf.addNum(3);
    cout<<mf.findMedian()<<endl; // 2
    return 0;
}`
      }
    },
    python: {
      starterCode: `import heapq

class MedianFinder:
    def __init__(self):
        self.lo = []  # max-heap (left half)
        self.hi = []  # min-heap (right half)

    def addNum(self, num: int) -> None:
        heapq.heappush(self.lo, -num)
        heapq.heappush(self.hi, -heapq.heappop(self.lo))
        if len(self.hi) > len(self.lo):
            heapq.heappush(self.lo, -heapq.heappop(self.hi))

    def findMedian(self) -> float:
        if len(self.lo) > len(self.hi):
            return float(-self.lo[0])
        return (-self.lo[0] + self.hi[0]) / 2.0

if __name__ == '__main__':
    mf = MedianFinder()
    mf.addNum(1)
    mf.addNum(2)
    print(mf.findMedian())  # 1.5
    mf.addNum(3)
    print(mf.findMedian())  # 2.0`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(2^N)",
        spaceComplexity: "O(1)",
        approach: `Sort the array or search for max/min elements repeatedly.`,
        code: `# Brute Force Approach
# TODO: Implement brute force
import heapq

class MedianFinder:
    def __init__(self):
        self.lo = []  # max-heap (left half)
        self.hi = []  # min-heap (right half)

    def addNum(self, num: int) -> None:
        heapq.heappush(self.lo, -num)
        heapq.heappush(self.hi, -heapq.heappop(self.lo))
        if len(self.hi) > len(self.lo):
            heapq.heappush(self.lo, -heapq.heappop(self.hi))

    def findMedian(self) -> float:
        if len(self.lo) > len(self.hi):
            return float(-self.lo[0])
        return (-self.lo[0] + self.hi[0]) / 2.0

if __name__ == '__main__':
    mf = MedianFinder()
    mf.addNum(1)
    mf.addNum(2)
    print(mf.findMedian())  # 1.5
    mf.addNum(3)
    print(mf.findMedian())  # 2.0`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(N)",
        approach: `Insert all elements into a max-heap or min-heap and extract.`,
        code: `# Better Solution
# TODO: Implement optimized approach
import heapq

class MedianFinder:
    def __init__(self):
        self.lo = []  # max-heap (left half)
        self.hi = []  # min-heap (right half)

    def addNum(self, num: int) -> None:
        heapq.heappush(self.lo, -num)
        heapq.heappush(self.hi, -heapq.heappop(self.lo))
        if len(self.hi) > len(self.lo):
            heapq.heappush(self.lo, -heapq.heappop(self.hi))

    def findMedian(self) -> float:
        if len(self.lo) > len(self.hi):
            return float(-self.lo[0])
        return (-self.lo[0] + self.hi[0]) / 2.0

if __name__ == '__main__':
    mf = MedianFinder()
    mf.addNum(1)
    mf.addNum(2)
    print(mf.findMedian())  # 1.5
    mf.addNum(3)
    print(mf.findMedian())  # 2.0`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Maintain a min/max heap of size K, or use quickselect to get elements in-place with minimal overhead.`,
        code: `import heapq

class MedianFinder:
    def __init__(self):
        self.lo = []  # max-heap (left half)
        self.hi = []  # min-heap (right half)

    def addNum(self, num: int) -> None:
        heapq.heappush(self.lo, -num)
        heapq.heappush(self.hi, -heapq.heappop(self.lo))
        if len(self.hi) > len(self.lo):
            heapq.heappush(self.lo, -heapq.heappop(self.hi))

    def findMedian(self) -> float:
        if len(self.lo) > len(self.hi):
            return float(-self.lo[0])
        return (-self.lo[0] + self.hi[0]) / 2.0

if __name__ == '__main__':
    mf = MedianFinder()
    mf.addNum(1)
    mf.addNum(2)
    print(mf.findMedian())  # 1.5
    mf.addNum(3)
    print(mf.findMedian())  # 2.0`
      }
    }
  }
};

export default problem;
