// Distributed job queue system for FAANG-level scalability
export class DistributedQueue {
  constructor() {
    this.queues = new Map();
    this.workers = new Map();
    this.metrics = {
      processed: 0,
      failed: 0,
      pending: 0,
      throughput: 0
    };
    this.startMetricsCollection();
  }

  // Add job to distributed queue
  async enqueue(queueName, job, priority = 0) {
    if (!this.queues.has(queueName)) {
      this.queues.set(queueName, []);
    }
    
    const jobWithMetadata = {
      id: `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...job,
      priority,
      createdAt: Date.now(),
      attempts: 0,
      maxAttempts: 3
    };
    
    const queue = this.queues.get(queueName);
    queue.push(jobWithMetadata);
    queue.sort((a, b) => b.priority - a.priority);
    
    this.metrics.pending++;
    this.processQueue(queueName);
    
    return jobWithMetadata.id;
  }

  // Process jobs with worker pool
  async processQueue(queueName) {
    const queue = this.queues.get(queueName);
    if (!queue || queue.length === 0) return;

    const job = queue.shift();
    this.metrics.pending--;

    try {
      const worker = this.getAvailableWorker(queueName);
      if (worker) {
        await worker.process(job);
        this.metrics.processed++;
      } else {
        // Re-queue if no workers available
        queue.unshift(job);
        this.metrics.pending++;
      }
    } catch (error) {
      job.attempts++;
      if (job.attempts < job.maxAttempts) {
        queue.push(job);
        this.metrics.pending++;
      } else {
        this.metrics.failed++;
      }
    }
  }

  // Register worker for queue
  registerWorker(queueName, processor) {
    if (!this.workers.has(queueName)) {
      this.workers.set(queueName, []);
    }
    
    const worker = {
      id: `worker_${Date.now()}`,
      busy: false,
      process: async (job) => {
        worker.busy = true;
        try {
          await processor(job);
        } finally {
          worker.busy = false;
        }
      }
    };
    
    this.workers.get(queueName).push(worker);
    return worker.id;
  }

  getAvailableWorker(queueName) {
    const workers = this.workers.get(queueName) || [];
    return workers.find(w => !w.busy);
  }

  startMetricsCollection() {
    setInterval(() => {
      this.metrics.throughput = this.metrics.processed;
      this.metrics.processed = 0;
    }, 60000);
  }

  getMetrics() {
    return { ...this.metrics };
  }
}

export const distributedQueue = new DistributedQueue();