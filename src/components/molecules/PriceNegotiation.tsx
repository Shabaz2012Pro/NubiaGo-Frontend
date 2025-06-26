import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, DollarSign, Clock, Check, X, Send } from 'lucide-react';
import { Product } from '../../types';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import TextArea from '../atoms/TextArea';
import Card from '../atoms/Card';
import Badge from '../atoms/Badge';
import { clsx } from 'clsx';

interface NegotiationOffer {
  id: string;
  proposedPrice: number;
  quantity: number;
  message: string;
  status: 'pending' | 'accepted' | 'rejected' | 'countered';
  createdAt: Date;
  expiresAt: Date;
  counterOffer?: {
    price: number;
    message: string;
  };
}

interface PriceNegotiationProps {
  product: Product;
  onSubmitOffer?: (offer: Omit<NegotiationOffer, 'id' | 'status' | 'createdAt' | 'expiresAt'>) => void;
  className?: string;
}

const PriceNegotiation: React.FC<PriceNegotiationProps> = ({
  product,
  onSubmitOffer,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [proposedPrice, setProposedPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [negotiations, setNegotiations] = useState<NegotiationOffer[]>([]);

  // Mock existing negotiations
  React.useEffect(() => {
    const mockNegotiations: NegotiationOffer[] = [
      {
        id: '1',
        proposedPrice: 180.00,
        quantity: 50,
        message: 'Looking to purchase 50 units for our retail chain. Can you offer a bulk discount?',
        status: 'countered',
        createdAt: new Date('2024-01-10'),
        expiresAt: new Date('2024-01-17'),
        counterOffer: {
          price: 185.00,
          message: 'We can offer $185 per unit for 50+ quantity. This includes free shipping.'
        }
      },
      {
        id: '2',
        proposedPrice: 175.00,
        quantity: 100,
        message: 'Interested in 100 units. What\'s your best price for this quantity?',
        status: 'pending',
        createdAt: new Date('2024-01-12'),
        expiresAt: new Date('2024-01-19')
      }
    ];
    setNegotiations(mockNegotiations);
  }, []);

  const handleSubmit = async () => {
    if (!proposedPrice || !quantity || !message) return;

    setIsSubmitting(true);

    const offer = {
      proposedPrice: parseFloat(proposedPrice),
      quantity: parseInt(quantity),
      message: message.trim()
    };

    // Simulate API call
    setTimeout(() => {
      const newNegotiation: NegotiationOffer = {
        id: Date.now().toString(),
        ...offer,
        status: 'pending',
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      };

      setNegotiations(prev => [newNegotiation, ...prev]);
      onSubmitOffer?.(offer);
      
      // Reset form
      setProposedPrice('');
      setQuantity('');
      setMessage('');
      setIsSubmitting(false);
      setIsOpen(false);
    }, 1500);
  };

  const getStatusColor = (status: NegotiationOffer['status']) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'accepted': return 'success';
      case 'rejected': return 'error';
      case 'countered': return 'primary';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: NegotiationOffer['status']) => {
    switch (status) {
      case 'pending': return 'Pending Review';
      case 'accepted': return 'Accepted';
      case 'rejected': return 'Rejected';
      case 'countered': return 'Counter Offer';
      default: return status;
    }
  };

  const calculateSavings = (originalPrice: number, proposedPrice: number) => {
    const savings = originalPrice - proposedPrice;
    const percentage = (savings / originalPrice) * 100;
    return { amount: savings, percentage };
  };

  return (
    <div className={className}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        leftIcon={<MessageSquare className="w-4 h-4" />}
        className="border-blue-300 text-blue-600 hover:bg-blue-50 dark:border-blue-600 dark:text-blue-400 dark:hover:bg-blue-900/20"
      >
        Request Quote
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <Card variant="default" padding="lg" className="relative">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                    Price Negotiation
                  </h2>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Request a custom quote for bulk orders or special pricing
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Product Info & New Offer */}
                  <div className="space-y-6">
                    {/* Product Summary */}
                    <Card variant="outlined" padding="md">
                      <div className="flex items-center space-x-4">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                            {product.name}
                          </h3>
                          <p className="text-sm text-neutral-500">
                            by {product.supplier.name}
                          </p>
                          <p className="text-lg font-bold text-red-600 mt-1">
                            ${product.price} <span className="text-sm font-normal">per unit</span>
                          </p>
                        </div>
                      </div>
                    </Card>

                    {/* New Offer Form */}
                    <Card variant="outlined" padding="md">
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                        Submit New Offer
                      </h3>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            label="Proposed Price (per unit)"
                            placeholder="0.00"
                            value={proposedPrice}
                            onChange={setProposedPrice}
                            leftIcon={<DollarSign className="w-4 h-4" />}
                            type="number"
                            step="0.01"
                          />
                          <Input
                            label="Quantity"
                            placeholder="1"
                            value={quantity}
                            onChange={setQuantity}
                            type="number"
                            min="1"
                          />
                        </div>

                        {proposedPrice && quantity && (
                          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <div className="flex justify-between text-sm">
                              <span>Total Value:</span>
                              <span className="font-semibold">
                                ${(parseFloat(proposedPrice) * parseInt(quantity)).toFixed(2)}
                              </span>
                            </div>
                            {parseFloat(proposedPrice) < product.price && (
                              <div className="flex justify-between text-sm text-green-600">
                                <span>Potential Savings:</span>
                                <span className="font-semibold">
                                  ${((product.price - parseFloat(proposedPrice)) * parseInt(quantity)).toFixed(2)}
                                  ({(((product.price - parseFloat(proposedPrice)) / product.price) * 100).toFixed(1)}%)
                                </span>
                              </div>
                            )}
                          </div>
                        )}

                        <TextArea
                          label="Message to Supplier"
                          placeholder="Explain your requirements, intended use, or any special conditions..."
                          value={message}
                          onChange={setMessage}
                          rows={4}
                          maxLength={500}
                        />

                        <Button
                          variant="primary"
                          onClick={handleSubmit}
                          loading={isSubmitting}
                          disabled={!proposedPrice || !quantity || !message}
                          leftIcon={<Send className="w-4 h-4" />}
                          fullWidth
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          {isSubmitting ? 'Submitting Offer...' : 'Submit Offer'}
                        </Button>
                      </div>
                    </Card>
                  </div>

                  {/* Existing Negotiations */}
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                      Previous Negotiations
                    </h3>

                    {negotiations.length > 0 ? (
                      <div className="space-y-4">
                        {negotiations.map((negotiation) => (
                          <Card key={negotiation.id} variant="outlined" padding="md">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <Badge variant={getStatusColor(negotiation.status)} size="sm">
                                  {getStatusLabel(negotiation.status)}
                                </Badge>
                                <span className="text-xs text-neutral-500">
                                  {negotiation.createdAt.toLocaleDateString()}
                                </span>
                              </div>

                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-neutral-500">Proposed Price:</span>
                                  <p className="font-semibold">${negotiation.proposedPrice}</p>
                                </div>
                                <div>
                                  <span className="text-neutral-500">Quantity:</span>
                                  <p className="font-semibold">{negotiation.quantity} units</p>
                                </div>
                              </div>

                              <div>
                                <span className="text-neutral-500 text-sm">Your Message:</span>
                                <p className="text-sm mt-1">{negotiation.message}</p>
                              </div>

                              {negotiation.counterOffer && (
                                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <MessageSquare className="w-4 h-4 text-yellow-600" />
                                    <span className="font-medium text-yellow-800 dark:text-yellow-200">
                                      Supplier Counter Offer
                                    </span>
                                  </div>
                                  <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-2">
                                    <strong>${negotiation.counterOffer.price}</strong> per unit
                                  </p>
                                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                                    {negotiation.counterOffer.message}
                                  </p>
                                  <div className="flex space-x-2 mt-3">
                                    <Button variant="success" size="sm" leftIcon={<Check className="w-3 h-3" />}>
                                      Accept
                                    </Button>
                                    <Button variant="outline" size="sm">
                                      Counter
                                    </Button>
                                    <Button variant="ghost" size="sm" leftIcon={<X className="w-3 h-3" />}>
                                      Decline
                                    </Button>
                                  </div>
                                </div>
                              )}

                              {negotiation.status === 'pending' && (
                                <div className="flex items-center space-x-2 text-xs text-neutral-500">
                                  <Clock className="w-3 h-3" />
                                  <span>
                                    Expires on {negotiation.expiresAt.toLocaleDateString()}
                                  </span>
                                </div>
                              )}
                            </div>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <MessageSquare className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                        <p className="text-neutral-500">No previous negotiations</p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PriceNegotiation;