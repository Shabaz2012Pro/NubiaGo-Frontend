import React from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CreditCard, Calendar, CheckCircle, Clock } from 'lucide-react';
import Card from '../atoms/Card';
import Badge from '../atoms/Badge';
import Button from '../atoms/Button';
import { clsx } from 'clsx';

interface OrderSummaryProps {
  order: any;
  showActions?: boolean;
  className?: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  order,
  showActions = true,
  className
}) => {
  if (!order) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'processing': return 'primary';
      case 'shipped': return 'primary';
      case 'delivered': return 'success';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'processing': return <Package className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <X className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card variant="default" padding="lg" className={className}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
              Order {order.order_number}
            </h2>
            <Badge variant={getStatusColor(order.status)} size="sm">
              <div className="flex items-center space-x-1">
                {getStatusIcon(order.status)}
                <span className="capitalize">{order.status}</span>
              </div>
            </Badge>
          </div>
          <p className="text-sm text-neutral-500">
            Placed on {formatDate(order.created_at)}
          </p>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            ${parseFloat(order.total).toFixed(2)}
          </div>
          <p className="text-sm text-neutral-500">
            {order.order_items?.length || 0} {order.order_items?.length === 1 ? 'item' : 'items'}
          </p>
        </div>
      </div>

      {/* Order Items */}
      <div className="space-y-4 mb-6">
        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
          Items
        </h3>
        <div className="space-y-3">
          {order.order_items?.map((item: any) => (
            <div key={item.id} className="flex items-center space-x-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              {item.products?.product_images?.[0]?.image_url && (
                <img
                  src={item.products.product_images[0].image_url}
                  alt={item.products.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-neutral-900 dark:text-neutral-100 truncate">
                  {item.products?.name}
                </h4>
                {item.product_variants && (
                  <p className="text-xs text-neutral-500">
                    Variant: {item.product_variants.name}
                  </p>
                )}
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    Qty: {item.quantity}
                  </span>
                  <span className="font-medium text-neutral-900 dark:text-neutral-100">
                    ${parseFloat(item.total_price).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Shipping Information */}
        <div>
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3 flex items-center">
            <Truck className="w-4 h-4 mr-2 text-blue-500" />
            Shipping Information
          </h3>
          {order.addresses && (
            <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <p className="font-medium text-neutral-900 dark:text-neutral-100">
                {order.addresses.first_name} {order.addresses.last_name}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {order.addresses.address_line1}
                {order.addresses.address_line2 && `, ${order.addresses.address_line2}`}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {order.addresses.city}, {order.addresses.state} {order.addresses.postal_code}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {order.addresses.country}
              </p>
              {order.addresses.phone && (
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  {order.addresses.phone}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Payment Information */}
        <div>
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3 flex items-center">
            <CreditCard className="w-4 h-4 mr-2 text-green-500" />
            Payment Information
          </h3>
          <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
            <p className="font-medium text-neutral-900 dark:text-neutral-100">
              {order.payment_method}
            </p>
            {order.payments?.[0] && (
              <>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Status: <span className="capitalize">{order.payments[0].payment_status}</span>
                </p>
                {order.payments[0].payment_date && (
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Date: {formatDate(order.payments[0].payment_date)}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div>
        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
          Order Summary
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral-600 dark:text-neutral-400">Subtotal:</span>
            <span className="text-neutral-900 dark:text-neutral-100">${parseFloat(order.subtotal).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600 dark:text-neutral-400">Shipping:</span>
            <span className="text-neutral-900 dark:text-neutral-100">${parseFloat(order.shipping_cost).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600 dark:text-neutral-400">Tax:</span>
            <span className="text-neutral-900 dark:text-neutral-100">${parseFloat(order.tax).toFixed(2)}</span>
          </div>
          {parseFloat(order.discount) > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount:</span>
              <span>-${parseFloat(order.discount).toFixed(2)}</span>
            </div>
          )}
          <div className="border-t border-neutral-200 dark:border-neutral-700 pt-2 mt-2">
            <div className="flex justify-between font-semibold">
              <span className="text-neutral-900 dark:text-neutral-100">Total:</span>
              <span className="text-red-600">${parseFloat(order.total).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      {showActions && (
        <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
          <div className="flex flex-wrap gap-3">
            {order.status === 'shipped' && (
              <Button 
                variant="primary" 
                size="sm"
                leftIcon={<Truck className="w-4 h-4" />}
                onClick={() => window.location.hash = `track-order?number=${order.order_number}`}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Track Order
              </Button>
            )}
            {order.status === 'delivered' && (
              <Button 
                variant="outline" 
                size="sm"
                leftIcon={<Star className="w-4 h-4" />}
              >
                Write Review
              </Button>
            )}
            {(order.status === 'pending' || order.status === 'processing') && (
              <Button 
                variant="outline" 
                size="sm"
                leftIcon={<X className="w-4 h-4" />}
                className="text-red-600 border-red-300 hover:bg-red-50 dark:border-red-700 dark:hover:bg-red-900/20"
              >
                Cancel Order
              </Button>
            )}
            <Button 
              variant="outline" 
              size="sm"
              leftIcon={<Package className="w-4 h-4" />}
            >
              Order Details
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              leftIcon={<MessageSquare className="w-4 h-4" />}
            >
              Contact Support
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default OrderSummary;