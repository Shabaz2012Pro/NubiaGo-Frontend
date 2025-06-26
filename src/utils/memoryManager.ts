
// Memory management utilities for better performance

export class MemoryManager {
  private static instance: MemoryManager;
  private observers: Set<() => void> = new Set();
  private memoryThreshold = 0.85; // 85% of available memory

  static getInstance(): MemoryManager {
    if (!MemoryManager.instance) {
      MemoryManager.instance = new MemoryManager();
    }
    return MemoryManager.instance;
  }

  private constructor() {
    this.startMonitoring();
  }

  private startMonitoring(): void {
    if (typeof window === 'undefined' || !('memory' in performance)) {
      return;
    }

    setInterval(() => {
      this.checkMemoryUsage();
    }, 10000); // Check every 10 seconds
  }

  private checkMemoryUsage(): void {
    if (!('memory' in performance)) return;

    const memory = (performance as any).memory;
    const usageRatio = memory.usedJSHeapSize / memory.jsHeapSizeLimit;

    if (usageRatio > this.memoryThreshold) {
      console.warn('High memory usage detected:', {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit,
        percentage: Math.round(usageRatio * 100)
      });

      // Notify observers
      this.observers.forEach(callback => callback());
      
      // Force garbage collection if available
      if ('gc' in window && typeof (window as any).gc === 'function') {
        (window as any).gc();
      }
    }
  }

  onMemoryPressure(callback: () => void): void {
    this.observers.add(callback);
  }

  offMemoryPressure(callback: () => void): void {
    this.observers.delete(callback);
  }

  // Utility to clean up references
  cleanup(): void {
    this.observers.clear();
  }

  // Get current memory stats
  getMemoryStats(): any {
    if (!('memory' in performance)) {
      return null;
    }

    const memory = (performance as any).memory;
    return {
      used: memory.usedJSHeapSize,
      total: memory.totalJSHeapSize,
      limit: memory.jsHeapSizeLimit,
      percentage: Math.round((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100)
    };
  }
}

// Hook for React components
export const useMemoryManager = () => {
  const manager = MemoryManager.getInstance();
  
  React.useEffect(() => {
    const handleMemoryPressure = () => {
      // Component-specific cleanup logic can be added here
      console.log('Memory pressure detected in component');
    };

    manager.onMemoryPressure(handleMemoryPressure);
    
    return () => {
      manager.offMemoryPressure(handleMemoryPressure);
    };
  }, [manager]);

  return {
    getStats: () => manager.getMemoryStats(),
    cleanup: () => manager.cleanup()
  };
};

export default MemoryManager;
