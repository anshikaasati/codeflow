import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "lfu-cache",
  title: "LFU Cache",
  difficulty: "Hard",
  category: "Linked List",
  patterns: ["Linked List"],
  url: "https://leetcode.com/problems/lfu-cache/",
  description: `Design and implement a data structure for a **Least Frequently Used (LFU)** cache.\\n\\nImplement the \`LFUCache\` class:\\n- \`LFUCache(int capacity)\` Initializes the object with the \`capacity\` of the data structure.\\n- \`int get(int key)\` Gets the value of the \`key\` if the \`key\` exists in the cache. Otherwise, returns \`-1\`.\\n- \`void put(int key, int value)\` Update the value of the \`key\` if present, or inserts the \`key\` if not already present. When the cache reaches its \`capacity\`, it should invalidate and remove the **least frequently used** item before inserting a new item. For this problem, when there is a **tie** (i.e., two or more keys with the same frequency), the **least recently used** key would be invalidated.\\n\\nTo determine the least frequently used key, a **use counter** is maintained for each key in the cache. The key with the smallest **use counter** is the least frequently used key.\\n\\nWhen a key is first inserted into the cache, its **use counter** is set to \`1\`. The **use counter** for a key in the cache is incremented either a \`get\` or \`put\` operation is called on it.\\n\\nThe functions \`get\` and \`put\` must each run in \`O(1)\` average time complexity.`,
  examples: [
    {
      "input": "[\"LFUCache\", \"put\", \"put\", \"get\", \"put\", \"get\", \"get\", \"put\", \"get\", \"get\", \"get\"]\\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [3], [4, 4], [1], [3], [4]]",
      "output": "[null, null, null, 1, null, -1, 3, null, -1, 3, 4]",
      "explanation": "LFUCache lfu = new LFUCache(2);\\nlfu.put(1, 1);\\nlfu.put(2, 2);\\nlfu.get(1);      // return 1\\nlfu.put(3, 3);   // evicts key 2\\nlfu.get(2);      // return -1\\nlfu.get(3);      // return 3\\nlfu.put(4, 4);   // evicts key 1\\nlfu.get(1);      // return -1\\nlfu.get(3);      // return 3\\nlfu.get(4);      // return 4"
    }
  ],
  constraints: [
    "1 <= capacity <= 10^4",
    "0 <= key <= 10^5",
    "0 <= value <= 10^9",
    "At most 2 * 10^5 calls will be made to get and put."
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class LFUCache {
    int cap, minFreq;
    unordered_map<int, pair<int, int>> keyVal; // key -> {value, freq}
    unordered_map<int, list<int>::iterator> keyIter; // key -> list iterator
    unordered_map<int, list<int>> freqList; // freq -> list of keys
public:
    LFUCache(int capacity) : cap(capacity), minFreq(0) {}
    
    int get(int key) {
        if (keyVal.find(key) == keyVal.end()) return -1;
        int freq = keyVal[key].second;
        freqList[freq].erase(keyIter[key]);
        keyVal[key].second++;
        freqList[freq + 1].push_front(key);
        keyIter[key] = freqList[freq + 1].begin();
        if (freqList[minFreq].empty()) minFreq++;
        return keyVal[key].first;
    }
    
    void put(int key, int value) {
        if (cap <= 0) return;
        if (get(key) != -1) {
            keyVal[key].first = value;
            return;
        }
        if ((int)keyVal.size() >= cap) {
            int d_key = freqList[minFreq].back();
            freqList[minFreq].pop_back();
            keyVal.erase(d_key);
            keyIter.erase(d_key);
        }
        keyVal[key] = {value, 1};
        freqList[1].push_front(key);
        keyIter[key] = freqList[1].begin();
        minFreq = 1;
    }
};

int main() {
    LFUCache cache(2);
    cache.put(1, 1);
    cache.put(2, 2);
    cout << cache.get(1) << endl; // 1
    cache.put(3, 3);              // evicts 2
    cout << cache.get(2) << endl; // -1
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(2^N)",
        spaceComplexity: "O(1)",
        approach: `Convert the linked list into an array or use nested loops over list elements.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;

class LFUCache {
    int cap, minFreq;
    unordered_map<int, pair<int, int>> keyVal; // key -> {value, freq}
    unordered_map<int, list<int>::iterator> keyIter; // key -> list iterator
    unordered_map<int, list<int>> freqList; // freq -> list of keys
public:
    LFUCache(int capacity) : cap(capacity), minFreq(0) {}
    
    int get(int key) {
        if (keyVal.find(key) == keyVal.end()) return -1;
        int freq = keyVal[key].second;
        freqList[freq].erase(keyIter[key]);
        keyVal[key].second++;
        freqList[freq + 1].push_front(key);
        keyIter[key] = freqList[freq + 1].begin();
        if (freqList[minFreq].empty()) minFreq++;
        return keyVal[key].first;
    }
    
    void put(int key, int value) {
        if (cap <= 0) return;
        if (get(key) != -1) {
            keyVal[key].first = value;
            return;
        }
        if ((int)keyVal.size() >= cap) {
            int d_key = freqList[minFreq].back();
            freqList[minFreq].pop_back();
            keyVal.erase(d_key);
            keyIter.erase(d_key);
        }
        keyVal[key] = {value, 1};
        freqList[1].push_front(key);
        keyIter[key] = freqList[1].begin();
        minFreq = 1;
    }
};

int main() {
    LFUCache cache(2);
    cache.put(1, 1);
    cache.put(2, 2);
    cout << cache.get(1) << endl; // 1
    cache.put(3, 3);              // evicts 2
    cout << cache.get(2) << endl; // -1
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(N)",
        approach: `Traverse list while tracking visited nodes using a hash set.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;

class LFUCache {
    int cap, minFreq;
    unordered_map<int, pair<int, int>> keyVal; // key -> {value, freq}
    unordered_map<int, list<int>::iterator> keyIter; // key -> list iterator
    unordered_map<int, list<int>> freqList; // freq -> list of keys
public:
    LFUCache(int capacity) : cap(capacity), minFreq(0) {}
    
    int get(int key) {
        if (keyVal.find(key) == keyVal.end()) return -1;
        int freq = keyVal[key].second;
        freqList[freq].erase(keyIter[key]);
        keyVal[key].second++;
        freqList[freq + 1].push_front(key);
        keyIter[key] = freqList[freq + 1].begin();
        if (freqList[minFreq].empty()) minFreq++;
        return keyVal[key].first;
    }
    
    void put(int key, int value) {
        if (cap <= 0) return;
        if (get(key) != -1) {
            keyVal[key].first = value;
            return;
        }
        if ((int)keyVal.size() >= cap) {
            int d_key = freqList[minFreq].back();
            freqList[minFreq].pop_back();
            keyVal.erase(d_key);
            keyIter.erase(d_key);
        }
        keyVal[key] = {value, 1};
        freqList[1].push_front(key);
        keyIter[key] = freqList[1].begin();
        minFreq = 1;
    }
};

int main() {
    LFUCache cache(2);
    cache.put(1, 1);
    cache.put(2, 2);
    cout << cache.get(1) << endl; // 1
    cache.put(3, 3);              // evicts 2
    cout << cache.get(2) << endl; // -1
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `In-place pointer manipulation, slow-fast pointers, or dummy nodes to achieve O(1) auxiliary space.`,
        code: `#include <bits/stdc++.h>
using namespace std;

class LFUCache {
    int cap, minFreq;
    unordered_map<int, pair<int, int>> keyVal; // key -> {value, freq}
    unordered_map<int, list<int>::iterator> keyIter; // key -> list iterator
    unordered_map<int, list<int>> freqList; // freq -> list of keys
public:
    LFUCache(int capacity) : cap(capacity), minFreq(0) {}
    
    int get(int key) {
        if (keyVal.find(key) == keyVal.end()) return -1;
        int freq = keyVal[key].second;
        freqList[freq].erase(keyIter[key]);
        keyVal[key].second++;
        freqList[freq + 1].push_front(key);
        keyIter[key] = freqList[freq + 1].begin();
        if (freqList[minFreq].empty()) minFreq++;
        return keyVal[key].first;
    }
    
    void put(int key, int value) {
        if (cap <= 0) return;
        if (get(key) != -1) {
            keyVal[key].first = value;
            return;
        }
        if ((int)keyVal.size() >= cap) {
            int d_key = freqList[minFreq].back();
            freqList[minFreq].pop_back();
            keyVal.erase(d_key);
            keyIter.erase(d_key);
        }
        keyVal[key] = {value, 1};
        freqList[1].push_front(key);
        keyIter[key] = freqList[1].begin();
        minFreq = 1;
    }
};

int main() {
    LFUCache cache(2);
    cache.put(1, 1);
    cache.put(2, 2);
    cout << cache.get(1) << endl; // 1
    cache.put(3, 3);              // evicts 2
    cout << cache.get(2) << endl; // -1
    return 0;
}`
      }
    },
    python: {
      starterCode: `from collections import defaultdict, OrderedDict

class LFUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.min_freq = 0
        self.key_val = {}      # key -> (value, freq)
        self.freq_list = defaultdict(OrderedDict) # freq -> OrderedDict (key -> True)

    def get(self, key: int) -> int:
        if key not in self.key_val:
            return -1
        val, freq = self.key_val[key]
        self.freq_list[freq].pop(key)
        if not self.freq_list[freq] and freq == self.min_freq:
            self.min_freq += 1
        self.key_val[key] = (val, freq + 1)
        self.freq_list[freq + 1][key] = True
        return val

    def put(self, key: int, value: int) -> None:
        if self.cap <= 0:
            return
        if self.get(key) != -1:
            self.key_val[key] = (value, self.key_val[key][1])
            return
        if len(self.key_val) >= self.cap:
            d_key, _ = self.freq_list[self.min_freq].popitem(last=False)
            self.key_val.pop(d_key)
        self.key_val[key] = (value, 1)
        self.freq_list[1][key] = True
        self.min_freq = 1

if __name__ == '__main__':
    cache = LFUCache(2)
    cache.put(1, 1)
    cache.put(2, 2)
    print(cache.get(1)) # 1
    cache.put(3, 3)     # evicts 2
    print(cache.get(2)) # -1`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(2^N)",
        spaceComplexity: "O(1)",
        approach: `Convert the linked list into an array or use nested loops over list elements.`,
        code: `# Brute Force Approach
# TODO: Implement brute force
from collections import defaultdict, OrderedDict

class LFUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.min_freq = 0
        self.key_val = {}      # key -> (value, freq)
        self.freq_list = defaultdict(OrderedDict) # freq -> OrderedDict (key -> True)

    def get(self, key: int) -> int:
        if key not in self.key_val:
            return -1
        val, freq = self.key_val[key]
        self.freq_list[freq].pop(key)
        if not self.freq_list[freq] and freq == self.min_freq:
            self.min_freq += 1
        self.key_val[key] = (val, freq + 1)
        self.freq_list[freq + 1][key] = True
        return val

    def put(self, key: int, value: int) -> None:
        if self.cap <= 0:
            return
        if self.get(key) != -1:
            self.key_val[key] = (value, self.key_val[key][1])
            return
        if len(self.key_val) >= self.cap:
            d_key, _ = self.freq_list[self.min_freq].popitem(last=False)
            self.key_val.pop(d_key)
        self.key_val[key] = (value, 1)
        self.freq_list[1][key] = True
        self.min_freq = 1

if __name__ == '__main__':
    cache = LFUCache(2)
    cache.put(1, 1)
    cache.put(2, 2)
    print(cache.get(1)) # 1
    cache.put(3, 3)     # evicts 2
    print(cache.get(2)) # -1`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(N)",
        approach: `Traverse list while tracking visited nodes using a hash set.`,
        code: `# Better Solution
# TODO: Implement optimized approach
from collections import defaultdict, OrderedDict

class LFUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.min_freq = 0
        self.key_val = {}      # key -> (value, freq)
        self.freq_list = defaultdict(OrderedDict) # freq -> OrderedDict (key -> True)

    def get(self, key: int) -> int:
        if key not in self.key_val:
            return -1
        val, freq = self.key_val[key]
        self.freq_list[freq].pop(key)
        if not self.freq_list[freq] and freq == self.min_freq:
            self.min_freq += 1
        self.key_val[key] = (val, freq + 1)
        self.freq_list[freq + 1][key] = True
        return val

    def put(self, key: int, value: int) -> None:
        if self.cap <= 0:
            return
        if self.get(key) != -1:
            self.key_val[key] = (value, self.key_val[key][1])
            return
        if len(self.key_val) >= self.cap:
            d_key, _ = self.freq_list[self.min_freq].popitem(last=False)
            self.key_val.pop(d_key)
        self.key_val[key] = (value, 1)
        self.freq_list[1][key] = True
        self.min_freq = 1

if __name__ == '__main__':
    cache = LFUCache(2)
    cache.put(1, 1)
    cache.put(2, 2)
    print(cache.get(1)) # 1
    cache.put(3, 3)     # evicts 2
    print(cache.get(2)) # -1`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `In-place pointer manipulation, slow-fast pointers, or dummy nodes to achieve O(1) auxiliary space.`,
        code: `from collections import defaultdict, OrderedDict

class LFUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.min_freq = 0
        self.key_val = {}      # key -> (value, freq)
        self.freq_list = defaultdict(OrderedDict) # freq -> OrderedDict (key -> True)

    def get(self, key: int) -> int:
        if key not in self.key_val:
            return -1
        val, freq = self.key_val[key]
        self.freq_list[freq].pop(key)
        if not self.freq_list[freq] and freq == self.min_freq:
            self.min_freq += 1
        self.key_val[key] = (val, freq + 1)
        self.freq_list[freq + 1][key] = True
        return val

    def put(self, key: int, value: int) -> None:
        if self.cap <= 0:
            return
        if self.get(key) != -1:
            self.key_val[key] = (value, self.key_val[key][1])
            return
        if len(self.key_val) >= self.cap:
            d_key, _ = self.freq_list[self.min_freq].popitem(last=False)
            self.key_val.pop(d_key)
        self.key_val[key] = (value, 1)
        self.freq_list[1][key] = True
        self.min_freq = 1

if __name__ == '__main__':
    cache = LFUCache(2)
    cache.put(1, 1)
    cache.put(2, 2)
    print(cache.get(1)) # 1
    cache.put(3, 3)     # evicts 2
    print(cache.get(2)) # -1`
      }
    }
  }
};

export default problem;
