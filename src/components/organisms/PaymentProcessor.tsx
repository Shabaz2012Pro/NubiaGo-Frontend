import React, { useState } from 'react';
import { Card } from '../atoms/Card';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { CreditCard, Lock, Shield } from 'lucide-react';

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'mobile';
  name: string;
  icon: React.ReactNode;
}

interface PaymentProcessorProps {
  amount: number;
  currency: string;
  onPaymentSuccess: (paymentId: string) => void;
  onPaymentError: (error: string) => void;
}

export const PaymentProcessor: React.FC<PaymentProcessorProps> = ({
  amount,
  currency,
  onPaymentSuccess,
  onPaymentError
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'card',
      type: 'card',
      name: 'Credit/Debit Card',
      icon: <CreditCard className="w-5 h-5" />
    },
    {
      id: 'bank',
      type: 'bank',
      name: 'Bank Transfer',
      icon: <Shield className="w-5 h-5" />
    }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In real implementation, integrate with Stripe, PayPal, or local payment providers
      const paymentId = `pay_${Date.now()}`;
      onPaymentSuccess(paymentId);
    } catch (error) {
      onPaymentError('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
          Complete Payment
        </h3>
        <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          {currency} {amount.toFixed(2)}
        </p>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-neutral-900 dark:text-neutral-100">
          Choose Payment Method
        </h4>

        {paymentMethods.map((method) => (
          <Card
            key={method.id}
            variant={selectedMethod === method.id ? "default" : "outlined"}
            padding="md"
            className="cursor-pointer"
            onClick={() => setSelectedMethod(method.id)}
          >
            <div className="flex items-center space-x-3">
              {method.icon}
              <span className="font-medium">{method.name}</span>
            </div>
          </Card>
        ))}
      </div>

      {selectedMethod === 'card' && (
        <Card variant="outlined" padding="md">
          <div className="space-y-4">
            <Input
              label="Card Number"
              placeholder="1234 5678 9012 3456"
              value={cardDetails.number}
              onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Expiry Date"
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
              />
              <Input
                label="CVV"
                placeholder="123"
                value={cardDetails.cvv}
                onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
              />
            </div>

            <Input
              label="Cardholder Name"
              placeholder="John Doe"
              value={cardDetails.name}
              onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
            />
          </div>
        </Card>
      )}

      <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
        <Lock className="w-4 h-4" />
        <span>Your payment information is encrypted and secure</span>
      </div>

      <Button
        variant="primary"
        size="lg"
        className="w-full"
        disabled={!selectedMethod || isProcessing}
        onClick={handlePayment}
      >
        {isProcessing ? 'Processing...' : `Pay ${currency} ${amount.toFixed(2)}`}
      </Button>
    </div>
  );
};
// Removed duplicate PaymentProcessor component
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Wallet, Building, Shield, CheckCircle } from 'lucide-react';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Card } from '../atoms/Card';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  description: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    icon: CreditCard,
    description: 'Visa, Mastercard, American Express'
  },
  {
    id: 'mobile',
    name: 'Mobile Money',
    icon: Wallet,
    description: 'M-Pesa, MTN Mobile Money, Airtel Money'
  },
  {
    id: 'bank',
    name: 'Bank Transfer',
    icon: Building,
    description: 'Direct bank transfer'
  }
];

interface PaymentProcessorProps {
  total: number;
  onPaymentSuccess: (paymentId: string) => void;
  onPaymentError: (error: string) => void;
}

export const PaymentProcessor: React.FC<PaymentProcessorProps> = ({
  total,
  onPaymentSuccess,
  onPaymentError
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate mock payment ID
      const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      onPaymentSuccess(paymentId);
    } catch (error) {
      onPaymentError('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Payment Methods */}
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
          Payment Method
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <motion.button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`p-4 border-2 rounded-lg transition-all ${
                  selectedMethod === method.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-neutral-200 dark:border-neutral-700'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-6 h-6 mx-auto mb-2 text-neutral-600 dark:text-neutral-400" />
                <p className="font-medium text-sm text-neutral-900 dark:text-neutral-100">
                  {method.name}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  {method.description}
                </p>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Payment Form */}
      {selectedMethod === 'card' && (
        <Card variant="outlined" padding="md">
          <div className="space-y-4">
            <Input
              label="Card Number"
              value={cardData.number}
              onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Expiry Date"
                value={cardData.expiry}
                onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                placeholder="MM/YY"
                maxLength={5}
              />
              <Input
                label="CVV"
                value={cardData.cvv}
                onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                placeholder="123"
                maxLength={4}
              />
            </div>
            <Input
              label="Cardholder Name"
              value={cardData.name}
              onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
              placeholder="John Doe"
            />
          </div>
        </Card>
      )}

      {selectedMethod === 'mobile' && (
        <Card variant="outlined" padding="md">
          <div className="space-y-4">
            <Input
              label="Mobile Number"
              placeholder="+254 700 000 000"
            />
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              You will receive an SMS prompt to complete the payment.
            </p>
          </div>
        </Card>
      )}

      {selectedMethod === 'bank' && (
        <Card variant="outlined" padding="md">
          <div className="space-y-4">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              You will be redirected to your bank's secure payment page.
            </p>
          </div>
        </Card>
      )}

      {/* Security Info */}
      <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
        <Shield className="w-4 h-4" />
        <span>Your payment information is encrypted and secure</span>
      </div>

      {/* Total and Pay Button */}
      <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            Total: ${total.toFixed(2)}
          </span>
        </div>

        <Button
          onClick={handlePayment}
          disabled={isProcessing}
          loading={isProcessing}
          fullWidth
          size="lg"
          className="bg-green-600 hover:bg-green-700"
        >
          {isProcessing ? 'Processing Payment...' : `Pay $${total.toFixed(2)}`}
        </Button>
      </div>
    </div>
  );
};