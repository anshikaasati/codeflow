import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "min-stack",
  title: "Min Stack",
  difficulty: "Medium",
  category: "Stack",
  url: "https://leetcode.com/problems/min-stack/",
  description: "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.\n\nImplement the `MinStack` class:\n- `MinStack()` initializes the stack object.\n- `void push(int val)` pushes the element `val` onto the stack.\n- `void pop()` removes the element on the top of the stack.\n- `int top()` gets the top element of the stack.\n- `int getMin()` retrieves the minimum element in the stack.\n\nYou must implement a solution with `O(1)` time complexity for each function.",
  examples: [
  {
    "input": "[\"MinStack\",\"push\",\"push\",\"push\",\"getMin\",\"pop\",\"top\",\"getMin\"]\n[[],[-2],[0],[-3],[],[],[],[]]",
    "output": "[null,null,null,null,-3,null,0,-2]",
    "explanation": "MinStack minStack = new MinStack();\nminStack.push(-2);\nminStack.push(0);\nminStack.push(-3);\nminStack.getMin(); // return -3\nminStack.pop();\nminStack.top();    // return 0\nminStack.getMin(); // return -2"
  }
],
  constraints: [
  "-2^31 <= val <= 2^31 - 1",
  "Methods pop, top and getMin will always be called on non-empty stacks.",
  "At most 3 * 10^4 calls will be made to push, pop, top, and getMin."
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class MinStack {
    stack<int> st, minSt;
public:
    void push(int val) {
        st.push(val);
        int m = minSt.empty() ? val : min(val, minSt.top());
        minSt.push(m);
    }
    void pop() { st.pop(); minSt.pop(); }
    int top() { return st.top(); }
    int getMin() { return minSt.top(); }
};

int main() {
    MinStack ms;
    ms.push(-2);
    ms.push(0);
    ms.push(-3);
    cout << ms.getMin() << endl; // -3
    ms.pop();
    cout << ms.top()    << endl; // 0
    cout << ms.getMin() << endl; // -2
    return 0;
}`
    },
    python: {
      starterCode: `from typing import List

class MinStack:
    def __init__(self):
        self.st: List[int] = []
        self.minSt: List[int] = []

    def push(self, val: int) -> None:
        self.st.append(val)
        if not self.minSt or val <= self.minSt[-1]:
            self.minSt.append(val)

    def pop(self) -> None:
        if self.st:
            self.st.pop()
            self.minSt.pop()

    def top(self) -> int:
        if self.st:
            return self.st[-1]
        return None

    def getMin(self) -> int:
        if self.minSt:
            return self.minSt[-1]
        return None


if __name__ == '__main__':
    ms = MinStack()
    ms.push(-2)
    ms.push(0)
    ms.push(-3)
    print(ms.getMin())  # -3
    ms.pop()
    print(ms.top())     # 0
    print(ms.getMin())  # -2`
    },
    java: {
      starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        MinStack ms = new MinStack();
        ms.push(-2);
        ms.push(0);
        ms.push(-3);
        System.out.println(ms.getMin()); // -3
        ms.pop();
        System.out.println(ms.top());    // 0
        System.out.println(ms.getMin()); // -2
    }
}

class MinStack {
    private Stack<Integer> st = new Stack<>();
    private Stack<Integer> minSt = new Stack<>();
    
    public MinStack() {}
    
    public void push(int val) {
        st.push(val);
        if (minSt.isEmpty() || val <= minSt.peek()) {
            minSt.push(val);
        }
    }
    
    public void pop() {
        int val = st.pop();
        if (val == minSt.peek().intValue()) { // use intValue to handle object reference comparison in java Wrapper classes
            minSt.pop();
        }
    }
    
    public int top() {
        return st.peek();
    }
    
    public int getMin() {
        return minSt.peek();
    }
}`
    }
  }
};

export default problem;

