
import React, { useState, useEffect } from 'react';
import { Card } from '../atoms/Card';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import { Package, Truck, CheckCircle, Clock, MapPin } from 'lucide-react';

export interface Order {
  id: string;
  orderNumber: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  estimatedDelivery: Date;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  total: number;
  currency: string;
  trackingNumber?: string;
  supplier: {
    id: string;
    name: string;
    location: string;
  };
}

interface OrderItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
  variant?: string;
}

interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

interface OrderManagementProps {
  orders: Order[];
  onOrderAction?: (orderId: string, action: string) => void;
}

export const OrderManagement: React.FC<OrderManagementProps> = ({
  orders,
  onOrderAction
}) => {
  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'shipped':
        return <Truck className="w-4 h-4" />;
      case 'delivered':
        return <Package className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'confirmed':
        return 'info';
      case 'shipped':
        return 'primary';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'neutral';
    }
  };

  const getStatusSteps = (status: Order['status']) => {
    const steps = [
      { key: 'pending', label: 'Order Placed', completed: true },
      { key: 'confirmed', label: 'Confirmed', completed: ['confirmed', 'shipped', 'delivered'].includes(status) },
      { key: 'shipped', label: 'Shipped', completed: ['shipped', 'delivered'].includes(status) },
      { key: 'delivered', label: 'Delivered', completed: status === 'delivered' }
    ];
    return steps;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          Order Management
        </h2>
        <div className="flex items-center space-x-2">
          <Badge variant="neutral" size="sm">
            {orders.length} Orders
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} variant="outlined" padding="lg">
            <div className="space-y-6">
              {/* Order Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                      Order #{order.orderNumber}
                    </h3>
                    <Badge 
                      variant={getStatusColor(order.status)} 
                      size="sm"
                      className="flex items-center space-x-1"
                    >
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status}</span>
                    </Badge>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                    Placed on {order.createdAt.toLocaleDateString()}
                  </p>
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    {order.currency} {order.total.toFixed(2)}
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {order.items.length} item{order.items.length > 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              {/* Progress Tracker */}
              <div className="relative">
                <div className="flex items-center justify-between">
                  {getStatusSteps(order.status).map((step, index) => (
                    <div key={step.key} className="flex flex-col items-center space-y-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step.completed 
                          ? 'bg-green-500 text-white' 
                          : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-500'
                      }`}>
                        {step.completed ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <span className="text-xs">{index + 1}</span>
                        )}
                      </div>
                      <span className="text-xs text-neutral-600 dark:text-neutral-400 text-center">
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="absolute top-4 left-4 right-4 h-0.5 bg-neutral-200 dark:bg-neutral-700 -z-10">
                  <div 
                    className="h-full bg-green-500 transition-all duration-300"
                    style={{ 
                      width: `${(getStatusSteps(order.status).filter(s => s.completed).length - 1) * 33.33}%` 
                    }}
                  />
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3">
                <h4 className="font-medium text-neutral-900 dark:text-neutral-100">Items</h4>
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h5 className="font-medium text-neutral-900 dark:text-neutral-100">
                        {item.name}
                      </h5>
                      {item.variant && (
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {item.variant}
                        </p>
                      )}
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                        {order.currency} {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipping Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2 flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>Shipping Address</span>
                  </h4>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    <p>{order.shippingAddress.street}</p>
                    <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                    <p>{order.shippingAddress.country} {order.shippingAddress.postalCode}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                    Supplier
                  </h4>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    <p className="font-medium">{order.supplier.name}</p>
                    <p>{order.supplier.location}</p>
                  </div>
                </div>
              </div>

              {/* Tracking & Actions */}
              {order.trackingNumber && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-blue-700 dark:text-blue-300">
                        Tracking Number
                      </p>
                      <p className="text-blue-600 dark:text-blue-400 font-mono">
                        {order.trackingNumber}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Track Package
                    </Button>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  Estimated delivery: {order.estimatedDelivery.toLocaleDateString()}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  {order.status === 'delivered' && (
                    <Button variant="primary" size="sm">
                      Leave Review
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, X, Eye, Download } from 'lucide-react';
import { Button } from '../atoms/Button';
import { Card } from '../atoms/Card';
import { Badge } from '../atoms/Badge';

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: Array<{
    id: string;
    name: string;
    image: string;
    quantity: number;
    price: number;
  }>;
  trackingNumber?: string;
}

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    date: '2024-01-15',
    status: 'delivered',
    total: 129.99,
    items: [
      {
        id: '1',
        name: 'Premium Headphones',
        image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=200',
        quantity: 1,
        price: 129.99
      }
    ],
    trackingNumber: 'TRK123456789'
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    date: '2024-01-20',
    status: 'shipped',
    total: 89.99,
    items: [
      {
        id: '2',
        name: 'Smart Watch',
        image: 'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=200',
        quantity: 1,
        price: 89.99
      }
    ],
    trackingNumber: 'TRK987654321'
  }
];

const getStatusColor = (status: Order['status']) => {
  switch (status) {
    case 'pending': return 'warning';
    case 'confirmed': return 'info';
    case 'processing': return 'primary';
    case 'shipped': return 'info';
    case 'delivered': return 'success';
    case 'cancelled': return 'danger';
    default: return 'neutral';
  }
};

const getStatusIcon = (status: Order['status']) => {
  switch (status) {
    case 'pending':
    case 'confirmed':
    case 'processing':
      return Package;
    case 'shipped':
      return Truck;
    case 'delivered':
      return CheckCircle;
    case 'cancelled':
      return X;
    default:
      return Package;
  }
};

export const OrderManagement: React.FC = () => {
  const [orders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleTrackOrder = (trackingNumber: string) => {
    // Open tracking page or modal
    console.log('Track order:', trackingNumber);
  };

  const handleDownloadInvoice = (orderNumber: string) => {
    // Generate and download invoice
    console.log('Download invoice for:', orderNumber);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          My Orders
        </h2>
        <Button variant="outline" size="sm">
          Filter Orders
        </Button>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => {
          const StatusIcon = getStatusIcon(order.status);
          
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card variant="outlined" padding="md" className="hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <StatusIcon className="w-8 h-8 text-neutral-600 dark:text-neutral-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                        {order.orderNumber}
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Ordered on {new Date(order.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-neutral-900 dark:text-neutral-100 font-medium">
                        ${order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Badge 
                      variant={getStatusColor(order.status)}
                      size="sm"
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                    
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewOrder(order)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      
                      {order.trackingNumber && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleTrackOrder(order.trackingNumber!)}
                        >
                          <Truck className="w-4 h-4" />
                        </Button>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownloadInvoice(order.orderNumber)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Order Items Preview */}
                <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <div className="flex items-center space-x-3">
                    {order.items.slice(0, 3).map((item) => (
                      <img
                        key={item.id}
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    ))}
                    {order.items.length > 3 && (
                      <div className="w-12 h-12 bg-neutral-200 dark:bg-neutral-700 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                          +{order.items.length - 3}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedOrder(null)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  Order Details
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedOrder(null)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                    Order Information
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-neutral-600 dark:text-neutral-400">Order Number:</span>
                      <p className="font-medium">{selectedOrder.orderNumber}</p>
                    </div>
                    <div>
                      <span className="text-neutral-600 dark:text-neutral-400">Date:</span>
                      <p className="font-medium">{new Date(selectedOrder.date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-neutral-600 dark:text-neutral-400">Status:</span>
                      <Badge variant={getStatusColor(selectedOrder.status)} size="sm" className="mt-1">
                        {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                      </Badge>
                    </div>
                    {selectedOrder.trackingNumber && (
                      <div>
                        <span className="text-neutral-600 dark:text-neutral-400">Tracking:</span>
                        <p className="font-medium">{selectedOrder.trackingNumber}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                    Items Ordered
                  </h4>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h5 className="font-medium text-neutral-900 dark:text-neutral-100">
                            {item.name}
                          </h5>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-neutral-900 dark:text-neutral-100">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                      Total
                    </span>
                    <span className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                      ${selectedOrder.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      
      {orders.length === 0 && (
        <Card variant="outlined" padding="lg" className="text-center">
          <Package className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
            No Orders Yet
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            You haven't placed any orders yet. Start shopping to see your orders here.
          </p>
          <Button onClick={() => window.location.hash = '#products'}>
            Start Shopping
          </Button>
        </Card>
      )}
    </div>
  );
};
