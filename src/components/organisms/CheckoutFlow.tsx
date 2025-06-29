import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  MapPin, 
  CreditCard, 
  Package, 
  Check, 
  ArrowLeft, 
  ArrowRight,
  Shield,
  Truck,
  Clock,
  Phone,
  Mail,
  Building,
  Globe
} from 'lucide-react';
import Button from '../atoms/Button';
import Card from '../atoms/Card';
import Badge from '../atoms/Badge';
import { FormProvider, FormInput, FormSelect, FormCheckbox, FormRadioGroup, FormSubmitButton } from '../forms';
import useForm from '../../hooks/useForm';
import useMultiStepForm from '../../hooks/useMultiStepForm';
import { validationSchemas } from '../../utils/validation';
import { useCreateOrder } from '../../api/queries/useOrderQueries';
import { useCartStore } from '../../store/useCartStore';
import { clsx } from 'clsx';

interface CheckoutFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  className?: string;
}

const CheckoutFlow: React.FC<CheckoutFlowProps> = ({
  isOpen,
  onClose,
  onComplete,
  className
}) => {
  const { items: cartItems, subtotal, clearCart } = useCartStore();
  const { mutate: createOrder, isPending } = useCreateOrder();

  // Initialize form
  const form = useForm({
    schema: validationSchemas.order,
    defaultValues: {
      // Account
      email: '',
      firstName: '',
      lastName: '',
      phone: '',

      // Shipping Address
      shippingAddress: {
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        country: 'Nigeria',
        postalCode: '',
        phone: '',
        isDefault: false,
      },

      // Billing Address
      billingAddress: {
        sameAsShipping: true,
        address: {
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          country: '',
          postalCode: '',
          phone: '',
        },
      },

      // Payment
      paymentMethod: 'card',
      paymentDetails: {
        cardNumber: '',
        cardholderName: '',
        expiryDate: '',
        cvv: '',
        saveCard: false,
      },

      // Additional
      notes: '',
      agreeTerms: false,
    },
    onSubmit: async (data) => {
      await createOrder({
        cartItems,
        shippingAddress: data.shippingAddress,
        billingAddress: data.billingAddress.sameAsShipping ? data.shippingAddress : data.billingAddress.address,
        paymentMethod: data.paymentMethod,
        notes: data.notes
      }, {
        onSuccess: () => {
          clearCart();
          onComplete();
        }
      });
    },
  });

  // Define form steps
  const steps = [
    {
      id: 'account',
      title: 'Account',
      description: 'Your personal information',
      fields: ['email', 'firstName', 'lastName', 'phone'],
      component: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              Account Information
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              Sign in or continue as guest
            </p>
          </div>

          <div className="space-y-4">
            <FormInput
              name="email"
              label="Email Address"
              type="email"
              placeholder="your@email.com"
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <FormInput
                name="firstName"
                label="First Name"
                placeholder="John"
                leftIcon={<User className="w-4 h-4" />}
                required
              />
              <FormInput
                name="lastName"
                label="Last Name"
                placeholder="Doe"
                leftIcon={<User className="w-4 h-4" />}
                required
              />
            </div>

            <FormInput
              name="phone"
              label="Phone Number"
              placeholder="+234 XXX XXX XXXX"
              leftIcon={<Phone className="w-4 h-4" />}
              required
            />
          </div>
        </div>
      ),
    },
    {
      id: 'shipping',
      title: 'Shipping',
      description: 'Where should we deliver your order?',
      fields: [
        'shippingAddress.firstName',
        'shippingAddress.lastName',
        'shippingAddress.address',
        'shippingAddress.city',
        'shippingAddress.country',
        'shippingAddress.postalCode',
        'shippingAddress.phone',
      ],
      component: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              Shipping Address
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              Where should we deliver your order?
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                name="shippingAddress.firstName"
                label="First Name"
                placeholder="John"
                leftIcon={<User className="w-4 h-4" />}
                required
              />
              <FormInput
                name="shippingAddress.lastName"
                label="Last Name"
                placeholder="Doe"
                leftIcon={<User className="w-4 h-4" />}
                required
              />
            </div>

            <FormInput
              name="shippingAddress.address"
              label="Street Address"
              placeholder="123 Main Street, Victoria Island"
              leftIcon={<MapPin className="w-4 h-4" />}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <FormInput
                name="shippingAddress.city"
                label="City"
                placeholder="Lagos"
                leftIcon={<Building className="w-4 h-4" />}
                required
              />
              <FormSelect
                name="shippingAddress.country"
                label="Country"
                options={[
                  { value: 'Nigeria', label: 'Nigeria' },
                  { value: 'Ghana', label: 'Ghana' },
                  { value: 'Kenya', label: 'Kenya' },
                  { value: 'South Africa', label: 'South Africa' },
                  { value: 'Egypt', label: 'Egypt' },
                  { value: 'Morocco', label: 'Morocco' },
                ]}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormInput
                name="shippingAddress.postalCode"
                label="Postal Code"
                placeholder="100001"
                leftIcon={<Globe className="w-4 h-4" />}
              />
              <FormInput
                name="shippingAddress.phone"
                label="Phone Number"
                placeholder="+234 XXX XXX XXXX"
                leftIcon={<Phone className="w-4 h-4" />}
                required
              />
            </div>

            <FormCheckbox
              name="shippingAddress.isDefault"
              label="Save this address for future orders"
            />
          </div>

          <Card variant="outlined" padding="md">
            <div className="flex items-center space-x-3 mb-3">
              <Truck className="w-5 h-5 text-blue-500" />
              <span className="font-medium">Estimated Delivery</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                Standard Shipping (5-7 business days)
              </span>
              <span className="font-semibold">$25.00</span>
            </div>
          </Card>
        </div>
      ),
    },
    {
      id: 'payment',
      title: 'Payment',
      description: 'Choose your preferred payment method',
      fields: [
        'paymentMethod',
        'paymentDetails.cardNumber',
        'paymentDetails.cardholderName',
        'paymentDetails.expiryDate',
        'paymentDetails.cvv',
        'paymentDetails.saveCard',
      ],
      component: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              Payment Method
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              Choose your preferred payment method
            </p>
          </div>

          <FormRadioGroup
            name="paymentMethod"
            options={[
              { value: 'card', label: 'Credit/Debit Card', description: 'Visa, Mastercard, American Express' },
              { value: 'paypal', label: 'PayPal', description: 'Fast and secure payment' },
              { value: 'bank', label: 'Bank Transfer', description: 'Direct bank transfer' },
              { value: 'mobile', label: 'Mobile Money', description: 'Pay with mobile money services' },
            ]}
            required
          />

          {form.watch('paymentMethod') === 'card' && (
            <div className="space-y-4 mt-4">
              <FormInput
                name="paymentDetails.cardNumber"
                label="Card Number"
                placeholder="1234 5678 9012 3456"
                leftIcon={<CreditCard className="w-4 h-4" />}
                required
              />

              <FormInput
                name="paymentDetails.cardholderName"
                label="Cardholder Name"
                placeholder="John Doe"
                leftIcon={<User className="w-4 h-4" />}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  name="paymentDetails.expiryDate"
                  label="Expiry Date"
                  placeholder="MM/YY"
                  required
                />
                <FormInput
                  name="paymentDetails.cvv"
                  label="CVV"
                  placeholder="123"
                  required
                />
              </div>

              <FormCheckbox
                name="paymentDetails.saveCard"
                label="Save card for future payments"
              />
            </div>
          )}

          <Card variant="outlined" padding="md">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-medium text-neutral-900 dark:text-neutral-100">
                  Secure Payment
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Your payment information is encrypted and secure
                </p>
              </div>
            </div>
          </Card>
        </div>
      ),
    },
    {
      id: 'review',
      title: 'Review',
      description: 'Review your order before completing your purchase',
      fields: ['agreeTerms'],
      component: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              Review Your Order
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              Please review your order before completing your purchase
            </p>
          </div>

          {/* Order Items */}
          <Card variant="outlined" padding="md">
            <h3 className="font-semibold mb-4">Order Items</h3>
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex items-center space-x-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-neutral-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Shipping Address */}
          <Card variant="outlined" padding="md">
            <h3 className="font-semibold mb-4">Shipping Address</h3>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              <p>{form.watch('shippingAddress.firstName')} {form.watch('shippingAddress.lastName')}</p>
              <p>{form.watch('shippingAddress.address')}</p>
              <p>{form.watch('shippingAddress.city')}, {form.watch('shippingAddress.country')}</p>
              <p>{form.watch('shippingAddress.postalCode')}</p>
              <p>{form.watch('shippingAddress.phone')}</p>
            </div>
          </Card>

          {/* Payment Method */}
          <Card variant="outlined" padding="md">
            <h3 className="font-semibold mb-4">Payment Method</h3>
            <div className="flex items-center space-x-3">
              <CreditCard className="w-5 h-5 text-neutral-500" />
              <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                {form.watch('paymentMethod') === 'card' ? 'Credit/Debit Card' : 
                 form.watch('paymentMethod') === 'paypal' ? 'PayPal' :
                 form.watch('paymentMethod') === 'bank' ? 'Bank Transfer' : 'Mobile Money'}
              </span>
              {form.watch('paymentMethod') === 'card' && form.watch('paymentDetails.cardNumber') && (
                <span className="text-sm text-neutral-500">
                  •••• {form.watch('paymentDetails.cardNumber').slice(-4)}
                </span>
              )}
            </div>
          </Card>

          {/* Order Summary */}
          <Card variant="outlined" padding="md">
            <h3 className="font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>$25.00</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (10%):</span>
                <span>${(subtotal * 0.1).toFixed(2)}</span>
              </div>
              <div className="border-t border-neutral-200 dark:border-neutral-700 pt-2">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span className="text-red-600">${(subtotal + 25 + subtotal * 0.1).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Terms and Conditions */}
          <FormCheckbox
            name="agreeTerms"
            label={
              <span>
                I agree to the <a href="#terms" className="text-red-600 hover:underline">Terms of Service</a> and <a href="#privacy" className="text-red-600 hover:underline">Privacy Policy</a>
              </span>
            }
            required
          />
        </div>
      ),
    },
  ];

  // Initialize multi-step form
  const {
    currentStep,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    nextStep,
    prevStep,
  } = useMultiStepForm({
    steps,
    form,
    onComplete: form.handleSubmit,
  });

  // Handle form step navigation
  const handleNextStep = async () => {
    try {
      const isValid = await form.trigger(currentStep.fields);
      if (isValid) {
        nextStep();
      }
    } catch (error) {
      console.error('Form validation error:', error);
    }
  };

  const handlePrevStep = () => {
    if (!isFirstStep) {
      prevStep();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={clsx(
          'w-full max-w-4xl max-h-[90vh] bg-white dark:bg-neutral-900 rounded-xl shadow-2xl overflow-hidden',
          className
        )}
      >
        <div className="flex h-full">
          {/* Left Panel - Steps & Summary */}
          <div className="w-1/3 bg-neutral-50 dark:bg-neutral-800 p-6 border-r border-neutral-200 dark:border-neutral-700">
            {/* Progress Steps */}
            <div className="space-y-4 mb-8">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={clsx(
                    'flex items-center space-x-3 p-3 rounded-lg transition-all',
                    index === currentStepIndex
                      ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                      : index < currentStepIndex
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                      : 'text-neutral-500'
                  )}
                >
                  <div className={clsx(
                    'w-8 h-8 rounded-full flex items-center justify-center',
                    index === currentStepIndex
                      ? 'bg-red-500 text-white'
                      : index < currentStepIndex
                      ? 'bg-green-500 text-white'
                      : 'bg-neutral-300 dark:bg-neutral-600'
                  )}>
                    {index < currentStepIndex ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  <span className="font-medium">{step.title}</span>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <Card variant="outlined" padding="md">
              <h3 className="font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>$25.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%):</span>
                  <span>${(subtotal * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t border-neutral-200 dark:border-neutral-700 pt-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span className="text-red-600">${(subtotal + 25 + subtotal * 0.1).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Panel - Step Content */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-700">
              <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                Checkout
              </h1>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-700"
              >
                ×
              </button>
            </div>

            {/* Step Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <FormProvider {...form}>
                <AnimatePresence mode="wait" custom={currentStepIndex}>
                  <motion.div
                    key={currentStepIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {currentStep.component}
                  </motion.div>
                </AnimatePresence>
              </FormProvider>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-neutral-200 dark:border-neutral-700">
              <Button
                variant="outline"
                onClick={handlePrevStep}
                disabled={isFirstStep}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                Back
              </Button>

              <div className="flex space-x-3">
                {isLastStep ? (
                  <FormSubmitButton
                    variant="primary"
                    leftIcon={<Check className="w-4 h-4" />}
                    className="bg-green-600 hover:bg-green-700"
                    loading={isPending}
                  >
                    Complete Order
                  </FormSubmitButton>
                ) : (
                  <Button
                    variant="primary"
                    onClick={handleNextStep}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Continue
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CheckoutFlow;