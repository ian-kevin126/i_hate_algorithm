/**
 * 图
 */

class Graph {
  constructor() {
    this.vertices = []; // 用来存放图中的顶点
    this.adjList = new Dictionary(); // 用来存放图中的边
  }

  // 向图中添加一个新顶点
  addVertex(v) {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v);
      this.adjList.set(v, []);
    }
  }

  // 向图中添加a和b两个顶点之间的边
  addEdge(a, b) {
    // 如果图中没有顶点a，先添加顶点a
    if (!this.adjList.has(a)) {
      this.addVertex(a);
    }
    // 如果图中没有顶点b，先添加顶点b
    if (!this.adjList.has(b)) {
      this.addVertex(b);
    }

    this.adjList.get(a).push(b); // 在顶点a中添加指向顶点b的边
    this.adjList.get(b).push(a); // 在顶点b中添加指向顶点a的边
  }

  // 获取图的vertices
  getVertices() {
    return this.vertices;
  }

  // 获取图中的adjList
  getAdjList() {
    return this.adjList;
  }

  toString() {
    let s = "";
    this.vertices.forEach((v) => {
      s += `${v} -> `;
      this.adjList.get(v).forEach((n) => {
        s += `${n} `;
      });
      s += "\n";
    });
    return s;
  }
}

const INF = Number.MAX_SAFE_INTEGER;
const minDistance = (dist, visited) => {
  let min = INF;
  let minIndex = -1;
  for (let v = 0; v < dist.length; v++) {
    if (visited[v] === false && dist[v] <= min) {
      min = dist[v];
      minIndex = v;
    }
  }
  return minIndex;
};

const dijkstra = (graph, src) => {
  const dist = [];
  const visited = [];
  const { length } = graph;
  for (let i = 0; i < length; i++) {
    dist[i] = INF;
    visited[i] = false;
  }
  dist[src] = 0;
  for (let i = 0; i < length - 1; i++) {
    const u = minDistance(dist, visited);
    visited[u] = true;
    for (let v = 0; v < length; v++) {
      if (
        !visited[v] &&
        graph[u][v] !== 0 &&
        dist[u] !== INF &&
        dist[u] + graph[u][v] < dist[v]
      ) {
        dist[v] = dist[u] + graph[u][v];
      }
    }
  }
  return dist;
};

dijkstra;

const floydWarshall = (graph) => {
  const dist = [];
  const { length } = graph;
  for (let i = 0; i < length; i++) {
    dist[i] = [];
    for (let j = 0; j < length; j++) {
      if (i === j) {
        dist[i][j] = 0;
      } else if (!isFinite(graph[i][j])) {
        dist[i][j] = Infinity;
      } else {
        dist[i][j] = graph[i][j];
      }
    }
  }
  for (let k = 0; k < length; k++) {
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }
  return dist;
};

floydWarshall;

const INF = Number.MAX_SAFE_INTEGER;
const find = (i, parent) => {
  while (parent[i]) {
    i = parent[i]; // eslint-disable-line prefer-destructuring
  }
  return i;
};
const union = (i, j, parent) => {
  if (i !== j) {
    parent[j] = i;
    return true;
  }
  return false;
};
const initializeCost = (graph) => {
  const cost = [];
  const { length } = graph;
  for (let i = 0; i < length; i++) {
    cost[i] = [];
    for (let j = 0; j < length; j++) {
      if (graph[i][j] === 0) {
        cost[i][j] = INF;
      } else {
        cost[i][j] = graph[i][j];
      }
    }
  }
  return cost;
};

const kruskal = (graph) => {
  const { length } = graph;
  const parent = [];
  let ne = 0;
  let a;
  let b;
  let u;
  let v;
  const cost = initializeCost(graph);
  while (ne < length - 1) {
    for (let i = 0, min = INF; i < length; i++) {
      for (let j = 0; j < length; j++) {
        if (cost[i][j] < min) {
          min = cost[i][j];
          a = u = i;
          b = v = j;
        }
      }
    }
    u = find(u, parent);
    v = find(v, parent);
    if (union(u, v, parent)) {
      ne++;
    }
    cost[a][b] = cost[b][a] = INF;
  }
  return parent;
};

kruskal;

const INF = Number.MAX_SAFE_INTEGER;
const minKey = (graph, key, visited) => {
  // Initialize min value
  let min = INF;
  let minIndex = 0;
  for (let v = 0; v < graph.length; v++) {
    if (visited[v] === false && key[v] < min) {
      min = key[v];
      minIndex = v;
    }
  }
  return minIndex;
};

const prim = (graph) => {
  const parent = [];
  const key = [];
  const visited = [];
  const { length } = graph;
  for (let i = 0; i < length; i++) {
    key[i] = INF;
    visited[i] = false;
  }
  key[0] = 0;
  parent[0] = -1;
  for (let i = 0; i < length - 1; i++) {
    const u = minKey(graph, key, visited);
    visited[u] = true;
    for (let v = 0; v < length; v++) {
      if (graph[u][v] && !visited[v] && graph[u][v] < key[v]) {
        parent[v] = u;
        key[v] = graph[u][v];
      }
    }
  }
  return parent;
};

prim;

class Graph {
  constructor(isDirected = false) {
    this.isDirected = isDirected;
    this.vertices = []; // 用来存放图中的顶点
    this.adjList = new Dictionary(); // 用来存放图中的边
  }

  // 向图中添加一个新顶点
  addVertex(v) {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v);
      this.adjList.set(v, []);
    }
  }

  // 向图中添加a和b两个顶点之间的边
  addEdge(a, b) {
    // 如果图中没有顶点a，先添加顶点a
    if (!this.adjList.has(a)) {
      this.addVertex(a);
    }
    // 如果图中没有顶点b，先添加顶点b
    if (!this.adjList.has(b)) {
      this.addVertex(b);
    }

    this.adjList.get(a).push(b); // 在顶点a中添加指向顶点b的边
    if (this.isDirected !== true) {
      this.adjList.get(b).push(a); // 如果为无向图，则在顶点b中添加指向顶点a的边
    }
  }

  // 获取图的vertices
  getVertices() {
    return this.vertices;
  }

  // 获取图中的adjList
  getAdjList() {
    return this.adjList;
  }

  toString() {
    let s = "";
    this.vertices.forEach((v) => {
      s += `${v} -> `;
      this.adjList.get(v).forEach((n) => {
        s += `${n} `;
      });
      s += "\n";
    });
    return s;
  }
}

Graph;
