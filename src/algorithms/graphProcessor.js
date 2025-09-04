// Graph algorithms for FAANG-level complexity
export class GraphProcessor {
  constructor() {
    this.graph = new Map();
  }

  addEdge(from, to, weight = 1) {
    if (!this.graph.has(from)) this.graph.set(from, []);
    if (!this.graph.has(to)) this.graph.set(to, []);
    this.graph.get(from).push({ node: to, weight });
  }

  // Dijkstra's shortest path - O(V log V + E)
  dijkstra(start, end) {
    const distances = new Map();
    const previous = new Map();
    const unvisited = new Set();
    
    for (const node of this.graph.keys()) {
      distances.set(node, node === start ? 0 : Infinity);
      unvisited.add(node);
    }
    
    while (unvisited.size > 0) {
      let current = null;
      let minDistance = Infinity;
      
      for (const node of unvisited) {
        if (distances.get(node) < minDistance) {
          minDistance = distances.get(node);
          current = node;
        }
      }
      
      if (current === null || current === end) break;
      unvisited.delete(current);
      
      const neighbors = this.graph.get(current) || [];
      for (const { node: neighbor, weight } of neighbors) {
        if (!unvisited.has(neighbor)) continue;
        
        const newDistance = distances.get(current) + weight;
        if (newDistance < distances.get(neighbor)) {
          distances.set(neighbor, newDistance);
          previous.set(neighbor, current);
        }
      }
    }
    
    const path = [];
    let current = end;
    while (current !== undefined) {
      path.unshift(current);
      current = previous.get(current);
    }
    
    return {
      distance: distances.get(end),
      path: path[0] === start ? path : []
    };
  }

  // Topological sort - O(V + E)
  topologicalSort() {
    const inDegree = new Map();
    const result = [];
    const queue = [];
    
    for (const node of this.graph.keys()) {
      inDegree.set(node, 0);
    }
    
    for (const [node, neighbors] of this.graph) {
      for (const { node: neighbor } of neighbors) {
        inDegree.set(neighbor, (inDegree.get(neighbor) || 0) + 1);
      }
    }
    
    for (const [node, degree] of inDegree) {
      if (degree === 0) queue.push(node);
    }
    
    while (queue.length > 0) {
      const current = queue.shift();
      result.push(current);
      
      const neighbors = this.graph.get(current) || [];
      for (const { node: neighbor } of neighbors) {
        inDegree.set(neighbor, inDegree.get(neighbor) - 1);
        if (inDegree.get(neighbor) === 0) {
          queue.push(neighbor);
        }
      }
    }
    
    return result.length === this.graph.size ? result : null;
  }
}

export const graphProcessor = new GraphProcessor();