## 그래프의 종류

1. 단반향
2. 양방향(무방향)

## 순서

- [그래프의 종류](#그래프의-종류)
- [순서](#순서)
- [사전지식](#사전지식)
- [그래프의 표현](#그래프의-표현)
  - [인접 행렬 그래프](#인접-행렬-그래프)
  - [인접 리스트 그래프](#인접-리스트-그래프)
  - [그래프 탐색](#그래프-탐색)
    - [BFS](#bfs)
    - [DFS](#dfs)
    - [다익스트라](#다익스트라)
    - [플로이드 와샬](#플로이드-와샬)
  - [힙(Heap)](#힙heap)

## 사전지식

1. 벡터
2. 최소 힙(우선순위 큐)
3. 우선순위 큐

## 그래프의 표현

### 인접 행렬 그래프

- 장점
  - 구현이 쉽고 직관적이다.
  - 모든정보를 저장해 정보량이 많다.
- 단점
  1. 메모리초과
  - 행렬로 정보저장을 실행함으로 그래프의 크기가 커지면 메모리 초과가 날수 있다.
  2. 필요없는 정보
  - 불필요한 정보저장이 많이 생긴다.(노드가 늘어날 수록 모든노드와 개인별 노드간의 연결 정의가 다 추가되는데 이는 효율적이지 못하다.)
- 구현
  - 1과 0으로 연결여부를 나타내어 2차원 배열을 사용해 구현

### 인접 리스트 그래프

- 장점
  - 메모리가 적고 계산량 또한 줄어든다.
- 단점
  - 인접행렬에비해 구현이 어렵다.
- 구현
  - 리스트나 벡터와 같은 자료구조 이용, 리스트 안에 리스트로 노드에대한 리스트 안에 해당노드와 연결되어있는 노드를 삽입하는 방식

### 그래프 탐색

#### BFS

정의 : 넓이 우선 탐색
구현 : 큐

#### DFS

정의 : 깊이 우선 탐색
구현 : 재귀

#### 다익스트라

정의 : 한 정점에서 모든 정점에대한 최단경로 탐색. 가중치가 있는 그래프이며 가중치는 양수를 기반함
구현 방법 : 일반 큐`O(V^2)`나 최소 힙`O(E+VlogV)`을 사용한다.
문제 : https://www.acmicpc.net/problem/1753
구현

```c++
#include <iostream>
#include <vector>
#include <queue>

using namespace std;

const int MAX_VERTEX = 20005;
const int MAX_EDGE = 300001;
const int INF = 0x7fffffff;
int min_weight[20005]; // 노드별 최소 가중치
int start_vertex, vertaxN, edgeN;

struct node
{
    int to, val;
    node(int a, int b)
    {
        to = a;
        val = b;
    }
};
// 연산자 오버로딩
bool operator<(node newN, node oldN)
{
    return newN.val < oldN.val;
};

int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    vector<node> V[MAX_VERTEX]; // 그래프 정보
    priority_queue<node> PQ; // 최소힙 : 노드의 가중치 기준으로 가장 작은 값의 노드를 가져옵니다.
    cin >> vertaxN >> edgeN;
    cin >> start_vertex;
    int u, v, w;
    for (int i = 0; i < edgeN; i++) // 그래프 정보 입력
    {
        cin >> u >> v >> w;
        V[u].push_back(node(v, w));
    }
    for (int i = 1; i <= vertaxN; i++) // 노드별 최소 가중치의 배열에 최대값 초기화
        min_weight[i] = INF;

    min_weight[start_vertex] = 0; // 시작 노드는 최소 가중치를 0으로 초기화
    PQ.push(node(start_vertex, 0)); // 시작을 위해 최소힙에 시작노드와 현재가중치 입력

    // 노드별 최소가중치를 구하는 작업을 시작전에 해당코드에서 알고들어갈점
    // priority_queue는 기본적으로 최대힙으로 작동하며 최소 힙을
    // 사용하기위해 추가적인 인자들이 필요한대 그대신 값을 음수로 지정해
    // 최대힙을 사용해도 최소힙과 같은효과를 받았다.
    // PQ에서 노드의 val은 음수로 저장되어 사용되는 중이다.
    while (!PQ.empty())
    {
        int currentNode = PQ.top().to; // 시작점 노드
        int currentValue = -PQ.top().val; // 최소힙처럼 사용하기위해 - 추가
        PQ.pop();
        // 지금까지 노드별 최소가중치와 현재까지의 가중치와 비교 후 노드별 최소가중치가 더 작으면 아래의 간선에서 이동작업을 건너뛴다.
        if (min_weight[currentNode] < currentValue)
            continue;
        // 현재 노드에서 연결된 간선 별로 처리
        for (int i = 0; i < V[currentNode].size(); i++)
        {
            int dest = V[currentNode][i].to;
            int nextValue = currentValue + V[currentNode][i].val;
            if (min_weight[dest] > nextValue)
            {
                min_weight[dest] = nextValue;
                PQ.push(node(dest, -nextValue));
            }
        }
    }
    for (int i = 1; i <= vertaxN; i++)
    {
        if (min_weight[i] == INF)
            cout << "INF\n";
        else
            cout << min_weight[i] << "\n";
    }

    return 0;
}
```

#### 플로이드 와샬

정의 : 모든 정점에서 각 정점의 최단거리를 구하는 방법

### 힙(Heap)

정수형 리스트에서 가장 큰수또는 가장 작은수를 구할 때 기본적으로 for문을 돌릴 시 복잡도가 O(n)이나 힙을 사용하였을때 O(log<sub>n</sub>)으로 표현할 수 있다.

**개념**

- 리스트하나에서 **이진트리 구조**를 구현한다.
- 종류는 최소힙, 최대힙두가지로 나뉜다.
  - 최소 힙 : 루트에 가장 작은 값이 오는 힙, 부모노드의 값이 자식노드보다 작음
  - 최대 힙 : 루트에 가장 큰값이 오는 힙, 부모노드의 값이 자식노드보다 큼
- 자식 구하기
  - 자신의 인덱스 \* 2 : 왼쪽자식
  - 자신의 인덱스 \* 2 + 1 : 오른쪽 자식
- 부모 구하기
  - 자신의 인덱스 / 2

**구현**

```c++
#include <iostream>
#include <queue>
#include <vector>
#include <functional>

using namespace std;

int main()
{
    // less가 디폴트 값이라 최대힙을 사용시 less<int>를 생략해도되며 priority_queue<자료형> 으로 만 사용해도 된다. 최소힙을 사용하기위해 첫번째, 세번째 파라미터가 필요로해졌기 때문에 그렇다.
    priority_queue<int, vector<int>, less<int> > q;     // 최대힙
    priority_queue<int, vector<int>, greater<int> > q1; // 최소힙
    q.push(3);     // 큐에 추가
    q.push(1);
    q.push(7);
    q1.push(3);
    q1.push(1);
    q1.push(7);
    while (!q.empty())
    {
        cout << q.top() << " " << q1.top()<< endl; // 루트노드 값 출력
        q.pop(); // 루트노드 제거
        q1.pop();
    }
    return 0;
}
// 7 1
// 3 3
// 1 7
```
