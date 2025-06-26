import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Building, MapPin, MessageSquare, Upload, CreditCard } from 'lucide-react';
import FormField from '../molecules/FormField';
import MultiStepForm, { FormStep } from '../molecules/MultiStepForm';
import FormValidation, { ValidationRule, FieldValidation } from '../molecules/FormValidation';
import Button from '../atoms/Button';
import Card from '../atoms/Card';
import TextArea from '../atoms/TextArea';
import { clsx } from 'clsx';

interface FormDemoProps {
  className?: string;
}

const FormDemo: React.FC<FormDemoProps> = ({ className }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    address: '',
    city: '',
    zipCode: '',
    message: '',
    newsletter: false,
    terms: false,
    accountType: '',
    paymentMethod: ''
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});

  // Validation rules
  const validationRules: Record<string, ValidationRule[]> = {
    email: [
      {
        test: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: 'Please enter a valid email address'
      }
    ],
    phone: [
      {
        test: (value: string) => /^\+?[\d\s\-\(\)]{10,}$/.test(value),
        message: 'Please enter a valid phone number'
      }
    ],
    firstName: [
      {
        test: (value: string) => value.length >= 2,
        message: 'First name must be at least 2 characters'
      }
    ],
    lastName: [
      {
        test: (value: string) => value.length >= 2,
        message: 'Last name must be at least 2 characters'
      }
    ]
  };

  // Form fields for validation
  const formFields: Record<string, FieldValidation> = {
    firstName: {
      value: formData.firstName,
      rules: validationRules.firstName || [],
      required: true
    },
    lastName: {
      value: formData.lastName,
      rules: validationRules.lastName || [],
      required: true
    },
    email: {
      value: formData.email,
      rules: validationRules.email || [],
      required: true
    },
    phone: {
      value: formData.phone,
      rules: validationRules.phone || [],
      required: true
    }
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const countryOptions = [
    { value: 'ng', label: 'Nigeria', icon: '🇳🇬' },
    { value: 'gh', label: 'Ghana', icon: '🇬🇭' },
    { value: 'ke', label: 'Kenya', icon: '🇰🇪' },
    { value: 'za', label: 'South Africa', icon: '🇿🇦' },
    { value: 'eg', label: 'Egypt', icon: '🇪🇬' },
    { value: 'ma', label: 'Morocco', icon: '🇲🇦' },
    { value: 'tr', label: 'Turkey', icon: '🇹🇷' },
  ];

  const accountTypeOptions = [
    { value: 'buyer', label: 'Buyer', description: 'I want to purchase products' },
    { value: 'supplier', label: 'Supplier', description: 'I want to sell products' },
    { value: 'both', label: 'Both', description: 'I want to buy and sell' },
  ];

  const paymentOptions = [
    { value: 'credit-card', label: 'Credit Card' },
    { value: 'bank-transfer', label: 'Bank Transfer' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'crypto', label: 'Cryptocurrency' },
  ];

  // Multi-step form steps
  const formSteps: FormStep[] = [
    {
      id: 'personal',
      title: 'Personal Information',
      description: 'Tell us about yourself',
      component: (
        <Card variant="default" padding="lg" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              type="text"
              name="firstName"
              label="First Name"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={(value) => updateField('firstName', value)}
              required
              error={formErrors.firstName?.[0]}
              leftIcon={<User className="w-4 h-4" />}
            />
            
            <FormField
              type="text"
              name="lastName"
              label="Last Name"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={(value) => updateField('lastName', value)}
              required
              error={formErrors.lastName?.[0]}
              leftIcon={<User className="w-4 h-4" />}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              type="email"
              name="email"
              label="Email Address"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(value) => updateField('email', value)}
              required
              error={formErrors.email?.[0]}
              leftIcon={<Mail className="w-4 h-4" />}
            />
            
            <FormField
              type="text"
              name="phone"
              label="Phone Number"
              placeholder="+1 (555) 123-4567"
              value={formData.phone}
              onChange={(value) => updateField('phone', value)}
              required
              error={formErrors.phone?.[0]}
              leftIcon={<Phone className="w-4 h-4" />}
            />
          </div>

          <FormField
            type="radio"
            name="accountType"
            label="Account Type"
            value={formData.accountType}
            onChange={(value) => updateField('accountType', value)}
            options={accountTypeOptions}
            required
          />
        </Card>
      ),
      validation: () => {
        return formData.firstName && formData.lastName && formData.email && formData.phone && formData.accountType;
      }
    },
    {
      id: 'business',
      title: 'Business Information',
      description: 'Tell us about your business',
      component: (
        <Card variant="default" padding="lg" className="space-y-6">
          <FormField
            type="text"
            name="company"
            label="Company Name"
            placeholder="Your company name"
            value={formData.company}
            onChange={(value) => updateField('company', value)}
            leftIcon={<Building className="w-4 h-4" />}
          />

          <FormField
            type="select"
            name="country"
            label="Country"
            placeholder="Select your country"
            value={formData.country}
            onChange={(value) => updateField('country', value)}
            options={countryOptions}
            searchable
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              type="text"
              name="city"
              label="City"
              placeholder="Your city"
              value={formData.city}
              onChange={(value) => updateField('city', value)}
              leftIcon={<MapPin className="w-4 h-4" />}
            />
            
            <FormField
              type="text"
              name="zipCode"
              label="ZIP Code"
              placeholder="12345"
              value={formData.zipCode}
              onChange={(value) => updateField('zipCode', value)}
            />
          </div>

          <TextArea
            label="Business Address"
            placeholder="Enter your full business address"
            value={formData.address}
            onChange={(value) => updateField('address', value)}
            rows={3}
          />
        </Card>
      ),
      optional: true
    },
    {
      id: 'preferences',
      title: 'Preferences & Payment',
      description: 'Set up your account preferences',
      component: (
        <Card variant="default" padding="lg" className="space-y-6">
          <FormField
            type="select"
            name="paymentMethod"
            label="Preferred Payment Method"
            placeholder="Select payment method"
            value={formData.paymentMethod}
            onChange={(value) => updateField('paymentMethod', value)}
            options={paymentOptions}
            required
          />

          <TextArea
            label="Additional Message"
            placeholder="Tell us more about your business needs or any special requirements..."
            value={formData.message}
            onChange={(value) => updateField('message', value)}
            rows={4}
            maxLength={500}
          />

          <div className="space-y-4">
            <FormField
              type="checkbox"
              name="newsletter"
              label="Subscribe to our newsletter for exclusive deals and updates"
              checked={formData.newsletter}
              onChange={(checked) => updateField('newsletter', checked)}
            />
            
            <FormField
              type="checkbox"
              name="terms"
              label="I agree to the Terms of Service and Privacy Policy"
              checked={formData.terms}
              onChange={(checked) => updateField('terms', checked)}
              required
            />
          </div>

          <FormField
            type="file"
            name="documents"
            label="Business Documents (Optional)"
            accept=".pdf,.doc,.docx"
            multiple
            maxSize={5}
            maxFiles={3}
          />
        </Card>
      ),
      validation: () => {
        return formData.paymentMethod && formData.terms;
      }
    }
  ];

  const handleFormComplete = (data: any) => {
    console.log('Form completed:', { ...formData, ...data });
    alert('Form submitted successfully!');
  };

  return (
    <div className={clsx('max-w-6xl mx-auto p-6', className)}>
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
          Complete Form System Demo
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          Showcasing advanced form components with validation, multi-step flow, and mobile optimization
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Multi-Step Form */}
        <div className="lg:col-span-2">
          <MultiStepForm
            steps={formSteps}
            onComplete={handleFormComplete}
            onStepChange={(step, direction) => console.log('Step changed:', step, direction)}
            showProgress={true}
            allowSkip={true}
          />
        </div>

        {/* Validation Panel */}
        <div className="space-y-6">
          <Card variant="default" padding="lg">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              Form Validation
            </h3>
            <FormValidation
              fields={formFields}
              onValidationChange={(valid, errors) => {
                setIsFormValid(valid);
                setFormErrors(errors);
              }}
              showSummary={true}
            />
          </Card>

          {/* Form Status */}
          <Card variant="default" padding="md">
            <h4 className="font-medium text-neutral-900 dark:text-neutral-100 mb-3">
              Form Status
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Valid:</span>
                <span className={isFormValid ? 'text-green-600' : 'text-red-600'}>
                  {isFormValid ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Errors:</span>
                <span className="text-red-600">
                  {Object.keys(formErrors).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Completion:</span>
                <span className="text-blue-600">
                  {Math.round((Object.values(formData).filter(v => v).length / Object.keys(formData).length) * 100)}%
                </span>
              </div>
            </div>
          </Card>

          {/* Features List */}
          <Card variant="default" padding="md">
            <h4 className="font-medium text-neutral-900 dark:text-neutral-100 mb-3">
              Features Included
            </h4>
            <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              <li>✅ Real-time validation</li>
              <li>✅ Multi-step form flow</li>
              <li>✅ File upload with drag-drop</li>
              <li>✅ Searchable select dropdowns</li>
              <li>✅ Mobile-optimized inputs</li>
              <li>✅ Error state handling</li>
              <li>✅ Success/warning states</li>
              <li>✅ Progress tracking</li>
              <li>✅ Auto-complete support</li>
              <li>✅ Accessibility features</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FormDemo;