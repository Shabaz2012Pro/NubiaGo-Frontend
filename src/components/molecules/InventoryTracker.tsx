
import React, { useState, useEffect } from 'react';
import { Badge } from '../atoms/Badge';
import { AlertTriangle, Package, TrendingDown, TrendingUp } from 'lucide-react';

interface InventoryItem {
  productId: string;
  sku: string;
  name: string;
  currentStock: number;
  reservedStock: number;
  availableStock: number;
  reorderLevel: number;
  maxStock: number;
  lastRestocked: Date;
  stockMovements: StockMovement[];
}

interface StockMovement {
  id: string;
  type: 'in' | 'out' | 'reserved' | 'returned';
  quantity: number;
  reason: string;
  timestamp: Date;
}

interface InventoryTrackerProps {
  productId: string;
  onStockUpdate?: (productId: string, newStock: number) => void;
}

export const InventoryTracker: React.FC<InventoryTrackerProps> = ({
  productId,
  onStockUpdate
}) => {
  const [inventory, setInventory] = useState<InventoryItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch inventory data
    const fetchInventory = async () => {
      setIsLoading(true);
      
      // Mock inventory data
      const mockInventory: InventoryItem = {
        productId,
        sku: `SKU-${productId}`,
        name: 'Sample Product',
        currentStock: 45,
        reservedStock: 5,
        availableStock: 40,
        reorderLevel: 10,
        maxStock: 100,
        lastRestocked: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        stockMovements: [
          {
            id: '1',
            type: 'out',
            quantity: 3,
            reason: 'Order #12345',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
          },
          {
            id: '2',
            type: 'in',
            quantity: 20,
            reason: 'Supplier restock',
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000)
          }
        ]
      };
      
      setInventory(mockInventory);
      setIsLoading(false);
    };

    fetchInventory();
  }, [productId]);

  const getStockStatus = (item: InventoryItem) => {
    if (item.availableStock <= 0) {
      return { status: 'out-of-stock', label: 'Out of Stock', color: 'error' as const };
    } else if (item.availableStock <= item.reorderLevel) {
      return { status: 'low-stock', label: 'Low Stock', color: 'warning' as const };
    } else if (item.availableStock >= item.maxStock * 0.8) {
      return { status: 'well-stocked', label: 'Well Stocked', color: 'success' as const };
    }
    return { status: 'normal', label: 'In Stock', color: 'info' as const };
  };

  const getStockPercentage = (item: InventoryItem) => {
    return Math.round((item.availableStock / item.maxStock) * 100);
  };

  if (isLoading || !inventory) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-24 mb-2"></div>
        <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-16"></div>
      </div>
    );
  }

  const stockStatus = getStockStatus(inventory);
  const stockPercentage = getStockPercentage(inventory);

  return (
    <div className="space-y-3">
      {/* Stock Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Package className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
          <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            Stock Level
          </span>
        </div>
        <Badge variant={stockStatus.color} size="sm">
          {stockStatus.label}
        </Badge>
      </div>

      {/* Stock Numbers */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-xs text-neutral-500">Available</p>
          <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            {inventory.availableStock}
          </p>
        </div>
        <div>
          <p className="text-xs text-neutral-500">Reserved</p>
          <p className="text-lg font-semibold text-yellow-600">
            {inventory.reservedStock}
          </p>
        </div>
        <div>
          <p className="text-xs text-neutral-500">Total</p>
          <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            {inventory.currentStock}
          </p>
        </div>
      </div>

      {/* Stock Bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-neutral-500">
          <span>Stock Level</span>
          <span>{stockPercentage}%</span>
        </div>
        <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              stockPercentage > 50 ? 'bg-green-500' :
              stockPercentage > 20 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${Math.min(stockPercentage, 100)}%` }}
          />
        </div>
      </div>

      {/* Low Stock Warning */}
      {inventory.availableStock <= inventory.reorderLevel && (
        <div className="flex items-center space-x-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <AlertTriangle className="w-4 h-4 text-yellow-600" />
          <p className="text-xs text-yellow-700 dark:text-yellow-300">
            Stock is running low. Consider restocking soon.
          </p>
        </div>
      )}

      {/* Recent Stock Movements */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
          Recent Activity
        </p>
        {inventory.stockMovements.slice(0, 2).map((movement) => (
          <div key={movement.id} className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              {movement.type === 'in' ? (
                <TrendingUp className="w-3 h-3 text-green-500" />
              ) : (
                <TrendingDown className="w-3 h-3 text-red-500" />
              )}
              <span className="text-neutral-600 dark:text-neutral-400">
                {movement.reason}
              </span>
            </div>
            <span className={`font-medium ${
              movement.type === 'in' ? 'text-green-600' : 'text-red-600'
            }`}>
              {movement.type === 'in' ? '+' : '-'}{movement.quantity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
