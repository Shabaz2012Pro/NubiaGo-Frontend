import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  Edit, 
  Download,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  RefreshCw
} from 'lucide-react';
import AdminLayout from './AdminLayout';
import Card from '../../components/atoms/Card';
import Button from '../../components/atoms/Button';
import Input from '../../components/atoms/Input';
import Badge from '../../components/atoms/Badge';
import { clsx } from 'clsx';

interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    avatar?: string;
  };
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  total: number;
  items: number;
}

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('all');

  // Mock data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockOrders: Order[] = [
        {
          id: '1',
          orderNumber: 'ORD-12345',
          customer: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100'
          },
          date: '2024-06-24T10:30:00Z',
          status: 'delivered',
          paymentStatus: 'paid',
          total: 299.99,
          items: 3
        },
        {
          id: '2',
          orderNumber: 'ORD-12346',
          customer: {
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100'
          },
          date: '2024-06-24T09:15:00Z',
          status: 'processing',
          paymentStatus: 'paid',
          total: 149.50,
          items: 2
        },
        {
          id: '3',
          orderNumber: 'ORD-12347',
          customer: {
            name: 'Robert Johnson',
            email: 'robert.johnson@example.com',
            avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100'
          },
          date: '2024-06-23T14:45:00Z',
          status: 'shipped',
          paymentStatus: 'paid',
          total: 524.75,
          items: 5
        },
        {
          id: '4',
          orderNumber: 'ORD-12348',
          customer: {
            name: 'Emily Davis',
            email: 'emily.davis@example.com'
          },
          date: '2024-06-23T11:20:00Z',
          status: 'pending',
          paymentStatus: 'pending',
          total: 89.99,
          items: 1
        },
        {
          id: '5',
          orderNumber: 'ORD-12349',
          customer: {
            name: 'Michael Brown',
            email: 'michael.brown@example.com'
          },
          date: '2024-06-22T16:30:00Z',
          status: 'cancelled',
          paymentStatus: 'refunded',
          total: 199.99,
          items: 2
        }
      ];

      setOrders(mockOrders);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter and sort orders
  const filteredOrders = orders
    .filter(order => {
      const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
      const matchesPaymentStatus = selectedPaymentStatus === 'all' || order.paymentStatus === selectedPaymentStatus;
      
      return matchesSearch && matchesStatus && matchesPaymentStatus;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'orderNumber':
          comparison = a.orderNumber.localeCompare(b.orderNumber);
          break;
        case 'customer':
          comparison = a.customer.name.localeCompare(b.customer.name);
          break;
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'total':
          comparison = a.total - b.total;
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'processing':
        return <RefreshCw className="w-4 h-4" />;
      case 'shipped':
        return <Truck className="w-4 h-4" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'processing':
        return 'primary';
      case 'shipped':
        return 'primary';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getPaymentStatusColor = (status: Order['paymentStatus']) => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      case 'refunded':
        return 'primary';
      default:
        return 'default';
    }
  };

  const statuses = [
    { value: 'all', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const paymentStatuses = [
    { value: 'all', label: 'All Payment Statuses' },
    { value: 'paid', label: 'Paid' },
    { value: 'pending', label: 'Pending' },
    { value: 'failed', label: 'Failed' },
    { value: 'refunded', label: 'Refunded' }
  ];

  return (
    <AdminLayout title="Orders" subtitle="Manage customer orders">
      {/* Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <Input
            placeholder="Search orders..."
            value={searchQuery}
            onChange={setSearchQuery}
            leftIcon={<Search className="w-4 h-4" />}
            className="w-full sm:w-64"
          />
          
          <div className="flex gap-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg text-sm"
            >
              {statuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
            
            <select
              value={selectedPaymentStatus}
              onChange={(e) => setSelectedPaymentStatus(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg text-sm"
            >
              {paymentStatuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download className="w-4 h-4" />}
          >
            Export
          </Button>
          
          <Button
            variant="primary"
            leftIcon={<Filter className="w-4 h-4" />}
            className="bg-red-600 hover:bg-red-700"
          >
            Advanced Filters
          </Button>
        </div>
      </div>
      
      {/* Orders Table */}
      <Card variant="default" padding="md">
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-10 bg-neutral-200 dark:bg-neutral-700 rounded mb-4"></div>
            {[...Array(5)].map((_, index) => (
              <div key={index} className="h-16 bg-neutral-200 dark:bg-neutral-700 rounded mb-2"></div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-50 dark:bg-neutral-800 text-left">
                  <th className="px-4 py-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleSort('orderNumber')}>
                      <span>Order</span>
                      {sortBy === 'orderNumber' && (
                        sortOrder === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleSort('customer')}>
                      <span>Customer</span>
                      {sortBy === 'customer' && (
                        sortOrder === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleSort('date')}>
                      <span>Date</span>
                      {sortBy === 'date' && (
                        sortOrder === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">Status</th>
                  <th className="px-4 py-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">Payment</th>
                  <th className="px-4 py-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleSort('total')}>
                      <span>Total</span>
                      {sortBy === 'total' && (
                        sortOrder === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-neutral-900 dark:text-neutral-100">{order.orderNumber}</p>
                      <p className="text-xs text-neutral-500">{order.items} items</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-3">
                        {order.customer.avatar ? (
                          <img 
                            src={order.customer.avatar} 
                            alt={order.customer.name} 
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
                            <span className="text-neutral-500 dark:text-neutral-400 text-sm font-medium">
                              {order.customer.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-neutral-900 dark:text-neutral-100">{order.customer.name}</p>
                          <p className="text-xs text-neutral-500">{order.customer.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-neutral-500">
                      {new Date(order.date).toLocaleDateString()} <br />
                      {new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-4 py-3">
                      <Badge 
                        variant={getStatusColor(order.status)} 
                        size="sm"
                        className="flex items-center space-x-1"
                      >
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status}</span>
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge 
                        variant={getPaymentStatusColor(order.paymentStatus)} 
                        size="sm"
                        className="capitalize"
                      >
                        {order.paymentStatus}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 font-medium text-neutral-900 dark:text-neutral-100">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="p-1">
                          <Eye className="w-4 h-4 text-neutral-500" />
                        </Button>
                        <Button variant="ghost" size="sm" className="p-1">
                          <Edit className="w-4 h-4 text-blue-500" />
                        </Button>
                        <Button variant="ghost" size="sm" className="p-1">
                          <Download className="w-4 h-4 text-green-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <p className="text-neutral-500 dark:text-neutral-400">No orders found matching your criteria.</p>
              </div>
            )}
          </div>
        )}
        
        {/* Pagination */}
        {!isLoading && filteredOrders.length > 0 && (
          <div className="flex items-center justify-between border-t border-neutral-200 dark:border-neutral-700 px-4 py-3 sm:px-6">
            <div className="flex items-center">
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredOrders.length}</span> of <span className="font-medium">{orders.length}</span> results
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        )}
      </Card>
    </AdminLayout>
  );
};

export default AdminOrders;